package org.example.service;

import org.example.runner.JSValidationRunner;
import org.example.model.ValidationResult;
import org.example.comparator.ExpectedResultLoader;
import org.example.comparator.ResultComparator;
import org.example.Generator.JsonFileGenerator;
import org.example.model.ExpectedResult;

import java.io.File;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class MultiDeviceValidationService {

    private static final String ROOT_OUTPUT = "output"; // single output folder

    public static void validateAllDevices() throws Exception {

        File folder = new File("input/device-config/");
        File[] devices = folder.listFiles((d, name) -> name.endsWith(".cfg"));

        if (devices == null) return;

        for (File device : devices) {

            String deviceName = device.getName().replace(".cfg", "");

            // ================= STIG VALIDATION =================
            List<ValidationResult> stigResults =
                    JSValidationRunner.runChecks(
                            Paths.get(ROOT_OUTPUT, "generatedJS/stig-checks").toString(),
                            device.getPath()
                    );

            // 🔹 SAVE ACTUAL STIG RESULT
            JSValidationRunner.generateActualJson(
                    deviceName,
                    stigResults,
                    Paths.get("actual/stig_actual", deviceName + "_stig_actual.json").toString()
            );

            Map<String, ExpectedResult> stigExpected =
                    ExpectedResultLoader.load(
                            "input/Expected/stig_cisco_ios_checks.txt"
                    );

            // 🔹 Compare with expected
            ValidationResult finalStig =
                    ResultComparator.compare(
                            deviceName,
                            stigResults,
                            stigExpected
                    );

            // 🔹 SAVE COMPARISON RESULT
            JsonFileGenerator.generateJson(
                    finalStig,
                    Paths.get( "stig", deviceName + "_stig.json").toString()
            );

            // 🔹 Accuracy
            AccuracyCalculator.saveAccuracyJson(
                    deviceName,
                    "stig",
                    stigResults,
                    stigExpected,
                    ROOT_OUTPUT
            );

            // 🔹 Summary
            SummaryHelper.saveValidationSummary(
                    deviceName,
                    "stig",
                    finalStig,
                    stigResults,
                    ROOT_OUTPUT
            );

            // ================= CIS VALIDATION =================
            List<ValidationResult> cisResults =
                    JSValidationRunner.runChecks(
                            Paths.get(ROOT_OUTPUT, "generatedJS/cis-checks").toString(),
                            device.getPath()
                    );

            // 🔹 SAVE ACTUAL CIS RESULT
            JSValidationRunner.generateActualJson(
                    deviceName,
                    cisResults,
                    Paths.get("actual/cis_actual", deviceName + "_cis_actual.json").toString()
            );

            Map<String, ExpectedResult> cisExpected =
                    ExpectedResultLoader.load(
                            "input/Expected/cis_cisco_ios_checks.txt"
                    );

            // 🔹 Compare with expected
            ValidationResult finalCis =
                    ResultComparator.compare(
                            deviceName,
                            cisResults,
                            cisExpected
                    );

            // 🔹 SAVE COMPARISON RESULT
            JsonFileGenerator.generateJson(
                    finalCis,
                    Paths.get("cis", deviceName + "_cis.json").toString()
            );

            // 🔹 Accuracy
            AccuracyCalculator.saveAccuracyJson(
                    deviceName,
                    "cis",
                    cisResults,
                    cisExpected,
                    ROOT_OUTPUT
            );

            // 🔹 Summary
            SummaryHelper.saveValidationSummary(
                    deviceName,
                    "cis",
                    finalCis,
                    cisResults,
                    ROOT_OUTPUT
            );
        }
    }
}