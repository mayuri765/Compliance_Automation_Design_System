package org.example.comparator;

import org.example.model.ExpectedResult;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

public class ExpectedResultLoader {

    public static Map<String, ExpectedResult> load(String filePath) throws Exception {

        Map<String, ExpectedResult> expectedMap = new HashMap<>();

        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        String line;

        while ((line = reader.readLine()) != null) {

            line = line.trim();

            if (!line.startsWith("|")) continue;
            if (line.contains("Check_ID")) continue;

            String[] parts = line.split("\\|");

            if (parts.length < 6) continue;

            String ruleId = parts[2].trim();

            // Convert CIS rule format 1.1.1 -> 1_1_1
            if (ruleId.contains(".")) {
                ruleId = ruleId.replace(".", "_");
            }

            int devicesFailed = Integer.parseInt(parts[4].trim());

            String expectedStatus = devicesFailed > 0 ? "FAIL" : "PASS";

            ExpectedResult result = new ExpectedResult();
            result.setRuleId(ruleId);
            result.setExpectedStatus(expectedStatus);
            result.setExpectedLine(0);

            expectedMap.put(ruleId, result);
        }

        reader.close();
        return expectedMap;
    }
}