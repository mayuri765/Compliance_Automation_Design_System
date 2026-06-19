package org.example.Extractor;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.example.model.CIS_Benchmark;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CISMetadataExtractor {

    public List<CIS_Benchmark> extract(File pdfFile) throws Exception {

        List<CIS_Benchmark> result = new ArrayList<>();

        try (PDDocument document = PDDocument.load(pdfFile)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            // Normalize whitespace
            text = text.replaceAll("\\r", "");

            // Strict rule heading pattern:
            Pattern rulePattern = Pattern.compile(
                    "^\\d+(?:\\.\\d+)+\\s+.*?(?=^\\d+(?:\\.\\d+)+\\s+|\\Z)"
                    ,
                    Pattern.MULTILINE | Pattern.DOTALL
            );

            Matcher matcher = rulePattern.matcher(text);

            while (matcher.find()) {

                String block = matcher.group().trim();

                // Must contain Description to be valid rule
                if (!block.contains("Description:")) continue;

                CIS_Benchmark meta = new CIS_Benchmark();

                meta.setRuleNumber(extractRuleNumber(block));
                meta.setTitle(extractTitle(block));
                meta.setProfile(extractSection(block,"Profile Applicability:","Description:"));
                meta.setDescription(extractSection(block,"Description:","Rationale:"));
                meta.setRationale(extractSection(block,"Rationale:","Impact:"));
                meta.setImpact(extractSection(block,"Impact:","Audit:"));
                meta.setAudit(extractSection(block,"Audit:","Remediation:"));
                meta.setRemediation(extractRemediation(block));
                meta.setDefaultValue(extractSection(block,"Default Value:","References:"));

                result.add(meta);
            }
        }

        return result;
    }


    private String extractRuleNumber(String text) {
        Matcher m = Pattern.compile("^\\d+(?:\\.\\d+)+", Pattern.MULTILINE).matcher(text);
        return m.find() ? m.group().trim() : null;
    }

    private String extractTitle(String block) {
        String firstLine = block.split("\\n")[0];
        return firstLine.replaceFirst("^\\d+(?:\\.\\d+)+\\s*", "").trim();

    }


    private String extractSection(String text, String start, String end) {

        Pattern p = Pattern.compile(
                Pattern.quote(start) + "(.*?)" + Pattern.quote(end),
                Pattern.DOTALL
        );

        Matcher m = p.matcher(text);
        return m.find() ? m.group(1).trim() : null;
    }

    private String extractRemediation(String text) {

        int start = text.indexOf("Remediation:");
        if (start == -1) return null;

        int endDefault = text.indexOf("Default Value:", start);
        int endReference = text.indexOf("References:", start);

        int end;

        if (endDefault != -1) {
            end = endDefault;
        } else if (endReference != -1) {
            end = endReference;
        } else {
            end = text.length();
        }

        return text.substring(start + "Remediation:".length(), end).trim();
    }

}

