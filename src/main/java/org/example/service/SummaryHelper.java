package org.example.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.example.model.ValidationResult;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class SummaryHelper {

    private static final ObjectMapper mapper =
            new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    // Build summary data
    public static Map<String, Object> buildSummaryData(
            String deviceName,
            ValidationResult validationResult,
            List<ValidationResult> ruleResults
    ) {

        Map<String, Object> summaryData = new LinkedHashMap<>();

        summaryData.put("deviceName", deviceName);
        summaryData.put("totalRules", validationResult.getTotalRules());
        summaryData.put("totalPassed", validationResult.getTotalPassed());
        summaryData.put("totalFailed", validationResult.getTotalFailed());
        summaryData.put("compliancePercentage", validationResult.getCompliancePercentage());
        summaryData.put("overallStatus", validationResult.getOverallStatus());

        // 🔹 Create clean rule list
        List<Map<String, Object>> cleanRules = new ArrayList<>();

        for (ValidationResult r : ruleResults) {

            Map<String, Object> rule = new LinkedHashMap<>();
            rule.put("ruleId", r.getRuleId());
            rule.put("status", r.getStatus());
            rule.put("line", r.getLine());

            cleanRules.add(rule);
        }

        summaryData.put("rules", cleanRules);

        return summaryData;
    }


    // Save summary JSON
    public static void saveValidationSummary(
            String deviceName,
            String type,
            ValidationResult validationResult,
            List<ValidationResult> ruleResults,
            String rootOutput
    ) {

        try {

            String folderPath = type.equalsIgnoreCase("cis")
                    ? Paths.get(rootOutput, "summery/cis_summery").toString()
                    : Paths.get(rootOutput, "summery/stig_summery").toString();

            Path path = Paths.get(folderPath, deviceName + "_" + type + "_summery.json");

            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            Map<String, Object> summaryData =
                    buildSummaryData(deviceName, validationResult, ruleResults);

            mapper.writeValue(path.toFile(), summaryData);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}