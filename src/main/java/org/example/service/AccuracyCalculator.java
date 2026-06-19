package org.example.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.example.model.ValidationResult;
import org.example.model.ExpectedResult;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class AccuracyCalculator {

    private static final ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    public static void saveAccuracyJson(String deviceName, String type,
                                        List<ValidationResult> actualResults,
                                        Map<String, ExpectedResult> expectedMap,
                                        String rootOutput) {
        try {
            if (actualResults == null || actualResults.isEmpty() || expectedMap == null) return;

            int totalRules = actualResults.size();
            int matchedRules = 0;

            for (ValidationResult actual : actualResults) {
                ExpectedResult expected = expectedMap.get(actual.getRuleId());
                if (expected != null && actual.getStatus().equalsIgnoreCase(expected.getExpectedStatus())) {
                    matchedRules++;
                }
            }

            double accuracy = totalRules == 0 ? 0.0 : ((double) matchedRules / totalRules) * 100;

            Map<String, Object> data = new LinkedHashMap<>();
            data.put("deviceName", deviceName);
            data.put("totalRules", totalRules);
            data.put("matchedRules", matchedRules);
            data.put("accuracyPercentage", Math.round(accuracy * 100.0) / 100.0);

            // Use rootOutput
            String folderPath = type.equalsIgnoreCase("cis")
                    ? Paths.get(rootOutput, "accuracy/cis_accuracy").toString()
                    : Paths.get(rootOutput, "accuracy/stig_accuracy").toString();

            Path path = Paths.get(folderPath, deviceName + "_" + type + "_accuracy.json");

            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            mapper.writeValue(path.toFile(), data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}