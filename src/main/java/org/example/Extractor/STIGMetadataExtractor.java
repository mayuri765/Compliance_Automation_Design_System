package org.example.Extractor;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.example.model.STIG_Benchmark;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class STIGMetadataExtractor {

    public List<STIG_Benchmark> extract(File pdfFile) throws Exception {

        List<STIG_Benchmark> result = new ArrayList<>();

        try (PDDocument document = PDDocument.load(pdfFile)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            // Normalize
            text = text.replaceAll("\\r", "");

            // Remove headers/footers if needed
            text = text.replaceAll("Page \\d+\\s*", "");

            // Strict rule block pattern (captures 1.1, 2.3, 4.5 etc.)
            Pattern rulePattern = Pattern.compile(
                    "^\\d+\\.\\d+\\s+.*?(?=^\\d+\\.\\d+\\s+|\\Z)",
                    Pattern.MULTILINE | Pattern.DOTALL
            );

            Matcher matcher = rulePattern.matcher(text);

            while (matcher.find()) {

                String block = matcher.group().trim();

                if (!block.contains("GROUP ID:")) continue;

                STIG_Benchmark meta = new STIG_Benchmark();

                meta.setGroupIdNumber(extract(block, "^\\d+\\.\\d+"));
                meta.setStigId(extract(block, "CISC-RT-\\d+"));
                meta.setGroupId(extract(block, "GROUP ID:\\s*(V-\\d+)"));
                meta.setRuleId(extract(block, "RULE ID:\\s*(SV-\\d+r\\d+)"));

                // Correct severity extraction
                meta.setSeverity(extract(block, "SEVERITY:\\s*(CAT\\s+(?:I|II|III))"));

                meta.setCci(extractAll(block, "CCI-\\d+"));

                meta.setDescription(extractSection(block, "Description:", "Rationale:"));
                meta.setRationale(extractSection(block, "Rationale:", "Audit:"));
                meta.setAudit(extractSection(block, "Audit:", "Remediation:"));
                meta.setRemediation(extractSection(block, "Remediation:", "Additional Information:"));

                result.add(meta);
            }
        }

        return result;
    }

    private String extract(String text, String regex) {
        Matcher m = Pattern.compile(regex, Pattern.MULTILINE | Pattern.CASE_INSENSITIVE)
                .matcher(text);
        return m.find() ? m.group().trim() : null;
    }

    // For multiple CCI values
    private String extractAll(String text, String regex) {

        Matcher m = Pattern.compile(regex).matcher(text);
        StringBuilder sb = new StringBuilder();

        while (m.find()) {
            sb.append(m.group()).append(", ");
        }

        return sb.length() > 0
                ? sb.substring(0, sb.length() - 2)
                : null;
    }

    private String extractSection(String text, String start, String end) {

        Pattern p = Pattern.compile(
                Pattern.quote(start) + "(.*?)" + Pattern.quote(end),
                Pattern.DOTALL | Pattern.CASE_INSENSITIVE
        );

        Matcher m = p.matcher(text);

        return m.find() ? m.group(1).trim() : null;
    }

}
