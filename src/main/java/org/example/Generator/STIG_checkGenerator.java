package org.example.Generator;

import org.example.model.STIG_Benchmark;

import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class STIG_checkGenerator {

    public static void generateChecks(List<STIG_Benchmark> rules) throws Exception {

        File folder = new File("output/generatedJS/stig-checks");
        if (!folder.exists()) {
            folder.mkdirs();
        }

        for (STIG_Benchmark rule : rules) {

            String fileName = "output/generatedJS/stig-checks/"
                    + safeFileName(rule.getStigId()) + ".js";

            try (FileWriter writer = new FileWriter(fileName)) {
                writer.write(generateJsContent(rule));
            }
        }
    }

    private static String generateJsContent(STIG_Benchmark rule) {

        String audit = rule.getAudit() == null ? "" : rule.getAudit();

        String operator = detectOperator(audit);
        String expectedValue = extractNumber(audit);
        String keyPhrase = extractKeyPhrase(audit);

        return """
            var metadata = {
                ruleId: "%s",
                severity: "%s",
                audit: "%s"
            };

            function check(config) {

                if (config == null) {
                    return { status: "FAIL", line: 0 };
                }

                var lines = String(config).split("\\n");
                var matched = false;
                var foundLine = 0;
                var pass = true;

                for (var i = 0; i < lines.length; i++) {

                    var raw = lines[i];
                    var line = String(raw).toLowerCase();

                    if (line.indexOf("%s".toLowerCase()) !== -1) {

                        matched = true;
                        foundLine = i + 1;

                        var numberMatch = line.match(/\\d+/);
                        var actual = numberMatch ? parseInt(numberMatch[0]) : null;

                        %s
                    }
                }

                // Handle NOT EXISTS logic
                if ("%s" === "not_exists") {

                    if (matched) {
                        return { status: "FAIL", line: foundLine };
                    } else {
                        return { status: "PASS", line: 0 };
                    }
                }

                if (!matched) {
                    return { status: "FAIL", line: 0 };
                }

                if (pass) {
                    return { status: "PASS", line: foundLine };
                }

                return { status: "FAIL", line: foundLine };
            }

            check(config);
            """.formatted(
                safe(rule.getRuleId()),
                safe(rule.getSeverity()),
                safe(audit),
                safe(keyPhrase),
                generateComparisonLogic(operator, expectedValue),
                operator
        );
    }

    // -------------------------------------------------
    // INTENT DETECTION
    // -------------------------------------------------

    private static String detectOperator(String text) {

        if (text == null) return "exists";

        text = text.toLowerCase();

        if (text.contains("or more") || text.contains("at least"))
            return ">=";

        if (text.contains("greater than"))
            return ">";

        if (text.contains("less than"))
            return "<";

        if (text.contains("or less"))
            return "<=";

        if (text.contains("must be disabled"))
            return "equals:false";

        if (text.contains("must be enabled"))
            return "equals:true";

        if (text.contains("not be present") || text.contains("must not exist"))
            return "not_exists";

        return "exists";
    }

    private static String extractNumber(String text) {

        if (text == null) return "";

        Matcher m = Pattern.compile("(\\d+)").matcher(text);

        return m.find() ? m.group(1) : "";
    }

    /**
     * Extracts CLI-like keyword from audit text
     */
    private static String extractKeyPhrase(String text) {

        if (text == null) return "";

        // 1️⃣ Try quoted CLI command
        Matcher quoted = Pattern.compile("'([^']+)'").matcher(text);
        if (quoted.find()) {
            return quoted.group(1).trim();
        }

        // 2️⃣ Try common Cisco CLI patterns
        Matcher cli = Pattern.compile(
                "(service\\s+\\S+|ip\\s+\\S+|logging\\s+\\S+|snmp-server\\s+\\S+|no\\s+\\S+)",
                Pattern.CASE_INSENSITIVE
        ).matcher(text);

        if (cli.find()) {
            return cli.group(1).trim();
        }

        return "";
    }

    // -------------------------------------------------
    // SAFE COMPARISON LOGIC (NASHORN SAFE)
    // -------------------------------------------------

    private static String generateComparisonLogic(String operator, String value) {

        if (operator.equals(">=") && !value.isEmpty())
            return "pass = (actual != null && actual >= " + value + ");";

        if (operator.equals(">") && !value.isEmpty())
            return "pass = (actual != null && actual > " + value + ");";

        if (operator.equals("<") && !value.isEmpty())
            return "pass = (actual != null && actual < " + value + ");";

        if (operator.equals("<=") && !value.isEmpty())
            return "pass = (actual != null && actual <= " + value + ");";

        if (operator.equals("equals:true"))
            return "pass = (line.indexOf('no ') !== 0);";

        if (operator.equals("equals:false"))
            return "pass = (line.indexOf('no ') === 0);";

        return "pass = true;";
    }

    // -------------------------------------------------
    // UTILITIES
    // -------------------------------------------------

    private static String safe(String value) {
        if (value == null) return "";
        return value.replace("\"", "\\\"")
                .replace("\n", " ")
                .replace("\r", " ");
    }

    private static String safeFileName(String value) {
        if (value == null) return "unknown_rule";
        return value.replace(".", "_")
                .replace("/", "_")
                .replace(" ", "_");
    }
}
