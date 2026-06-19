package org.example.comparator;

import org.example.model.ExpectedResult;
import org.example.model.ValidationResult;

import java.util.List;
import java.util.Map;

public class ResultComparator {

    public static ValidationResult compare(
            String deviceName,
            List<ValidationResult> actualResults,
            Map<String, ExpectedResult> expectedMap
    ) {

        int passed = 0;
        int failed = 0;

        for (ValidationResult actual : actualResults) {

            ExpectedResult expected = expectedMap.get(actual.getRuleId());

            if (expected == null) {
                failed++;
                continue;
            }

            if (actual.getStatus().equalsIgnoreCase(expected.getExpectedStatus())) {
                passed++;
            } else {
                failed++;
            }
        }

        ValidationResult deviceSummary = new ValidationResult();

        deviceSummary.setDeviceName(deviceName);
        deviceSummary.setTotalRules(actualResults.size());
        deviceSummary.setTotalPassed(passed);
        deviceSummary.setTotalFailed(failed);

        double percentage = actualResults.isEmpty()
                ? 0
                : ((double) passed / actualResults.size()) * 100;

        deviceSummary.setCompliancePercentage(
                Math.round(percentage * 100.0) / 100.0
        );

        deviceSummary.setOverallStatus(
                failed == 0 ? "PASS" : "FAIL"
        );

        deviceSummary.setResults(actualResults);

        return deviceSummary;
    }
}