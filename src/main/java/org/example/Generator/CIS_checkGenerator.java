package org.example.Generator;

import org.example.model.CIS_Benchmark;

import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CIS_checkGenerator {

    public static void generateChecks(List<CIS_Benchmark> rules) throws Exception {

        File folder = new File("output/generatedJS/cis-checks");
        if (!folder.exists()) {
            folder.mkdirs();
        }

        int generatedCount = 0;

        for (CIS_Benchmark rule : rules) {

            if (rule.getRuleNumber() == null || rule.getRuleNumber().isBlank()) {
                continue;
            }

            String fileName = "output/generatedJS/cis-checks/"
                    + safeFileName(rule.getRuleNumber()) + ".js";

            try (FileWriter writer = new FileWriter(fileName)) {
                writer.write(generateJsContent(rule));
                generatedCount++;
            }
        }

        System.out.println("Total JS files generated: " + generatedCount);


    }

    private static String generateJsContent(CIS_Benchmark rule) {

        String audit = rule.getAudit() == null ? "" : rule.getAudit();

        String operator = detectOperator(audit);
        String expectedValue = extractNumber(audit);

        return """
            var metadata = {
                ruleNumber: "%s",
                title: "%s",
                profile: "%s",
                description: "%s",
                rationale: "%s",
                impact: "%s",
                audit: "%s",
                remediation: "%s",
                defaultValue: "%s"
            };

            function check(config) {

                if (!config) {
                    return { status: "ERROR", line: 0 };
                }

                var lines = config.split("\\n");
                var matched = false;
                var foundLine = 0;
                var pass = true;

                for (var i = 0; i < lines.length; i++) {

                    var line = lines[i];

                    if (line.indexOf("%s") !== -1) {

                        matched = true;
                        foundLine = i + 1;

                        var numberMatch = line.match(/\\d+/);
                        var actual = numberMatch ? parseInt(numberMatch[0]) : null;

                        %s
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
                safe(rule.getRuleNumber()),
                safe(rule.getTitle()),
                safe(rule.getProfile()),
                safe(rule.getDescription()),
                safe(rule.getRationale()),
                safe(rule.getImpact()),
                safe(rule.getAudit()),
                safe(rule.getRemediation()),
                safe(rule.getDefaultValue()),
                safe(extractKeyPhrase(audit)),
                generateComparisonLogic(operator, expectedValue)
        );
    }


    // -----------------------------
    // Intent Detection Methods
    // -----------------------------

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

        return "exists";
    }

    private static String extractNumber(String text) {

        if (text == null) return "";

        Matcher m = Pattern.compile("(\\d+)").matcher(text);

        if (m.find()) {
            return m.group(1);
        }

        return "";
    }

    private static String extractKeyPhrase(String text) {

        if (text == null) return "";

        // 1. Extract text inside quotes (best case)
        Matcher quoted = Pattern.compile("'([^']+)'").matcher(text);
        if (quoted.find()) {
            return quoted.group(1).trim();
        }

        // 2. Extract CLI-like commands (contains space and no punctuation)
        Matcher command = Pattern.compile("(service\\s+\\S+|ip\\s+\\S+|logging\\s+\\S+|no\\s+\\S+)")
                .matcher(text.toLowerCase());

        if (command.find()) {
            return command.group(1).trim();
        }

        return "";
    }


    private static String generateComparisonLogic(String operator, String value) {

        if (operator.equals(">=") && !value.isEmpty())
            return "pass = actual !== null && actual >= " + value + ";";

        if (operator.equals(">") && !value.isEmpty())
            return "pass = actual !== null && actual > " + value + ";";

        if (operator.equals("<") && !value.isEmpty())
            return "pass = actual !== null && actual < " + value + ";";

        if (operator.equals("<=") && !value.isEmpty())
            return "pass = actual !== null && actual <= " + value + ";";

        if (operator.equals("equals:true"))
            return "pass = line.toLowerCase().includes('true');";

        if (operator.equals("equals:false"))
            return "pass = line.toLowerCase().includes('false');";

        return "pass = true;";
    }

    // -----------------------------
    // Utility Methods
    // -----------------------------

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
