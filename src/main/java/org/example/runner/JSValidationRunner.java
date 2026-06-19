package org.example.runner;

import org.example.model.ValidationResult;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.File;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class JSValidationRunner {

    private static final String ROOT_OUTPUT = "output"; // single root output folder

    // Wrapper method (supports old 2-parameter call)
    public static List<ValidationResult> runChecks(
            String jsFolderPath,
            String configFilePath
    ) throws Exception {

        String deviceName = new File(configFilePath)
                .getName()
                .replace(".cfg", "");

        String type = "general";

        if (jsFolderPath.toLowerCase().contains("stig")) {
            type = "stig";
        }
        else if (jsFolderPath.toLowerCase().contains("cis")) {
            type = "cis";
        }

        return runChecks(jsFolderPath, configFilePath, deviceName, type);
    }

    // Main method
    public static List<ValidationResult> runChecks(
            String jsFolderPath,
            String configFilePath,
            String deviceName,
            String type
    ) throws Exception {

        List<ValidationResult> results = new ArrayList<>();

        File jsFolder = new File(jsFolderPath);

        if (!jsFolder.exists() || !jsFolder.isDirectory()) {
            return results;
        }

        File[] jsFiles = jsFolder.listFiles((dir, name) -> name.endsWith(".js"));
        if (jsFiles == null) return results;

        String configContent = Files.readString(Paths.get(configFilePath));
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");

        for (File jsFile : jsFiles) {
            String ruleId = jsFile.getName().replace(".js", "");

            try (FileReader reader = new FileReader(jsFile)) {
                engine.put("config", configContent);
                Object output = engine.eval(reader);
                results.add(parseJSOutput(ruleId, output));
            } catch (Exception e) {
                results.add(new ValidationResult(ruleId, "ERROR", 0));
            }
        }

        return results;
    }

    // Retry method
    public static ValidationResult runSingleRule(
            String jsFolderPath,
            String configFilePath,
            String ruleId
    ) throws Exception {

        File jsFile = new File(jsFolderPath + "/" + ruleId + ".js");

        if (!jsFile.exists()) {
            return new ValidationResult(ruleId, "ERROR", 0);
        }

        String configContent = Files.readString(Paths.get(configFilePath));
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");

        try (FileReader reader = new FileReader(jsFile)) {
            engine.put("config", configContent);
            Object output = engine.eval(reader);
            return parseJSOutput(ruleId, output);
        } catch (Exception e) {
            return new ValidationResult(ruleId, "ERROR", 0);
        }
    }

    private static ValidationResult parseJSOutput(
            String ruleId,
            Object output
    ) {

        if (output instanceof Map<?, ?> map) {
            String status = map.get("status") != null ? map.get("status").toString() : "UNKNOWN";
            int line = 0;
            if (map.get("line") != null) {
                try {
                    line = Integer.parseInt(map.get("line").toString());
                } catch (NumberFormatException ignored) {}
            }
            return new ValidationResult(ruleId, status, line);
        }

        return new ValidationResult(ruleId, "INVALID_JS_OUTPUT", 0);
    }

    // 🔹 NEW METHOD: generateActualJson
    public static void generateActualJson(String deviceName, List<ValidationResult> results, String relativePath) {
        try {
            // Calculate summary
            int totalRules = results.size();
            int totalPassed = 0;
            int totalFailed = 0;

            for (ValidationResult r : results) {
                if ("PASS".equalsIgnoreCase(r.getStatus())) totalPassed++;
                else if ("FAIL".equalsIgnoreCase(r.getStatus())) totalFailed++;
            }

            // Build JSON map
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("deviceName", deviceName);
            data.put("totalRules", totalRules);
            data.put("totalPassed", totalPassed);
            data.put("totalFailed", totalFailed);
            data.put("results", results);

            // Use ROOT_OUTPUT as base folder
            Path path = Paths.get(ROOT_OUTPUT, relativePath);
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            // Write JSON
            ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(path.toFile(), data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}