package org.example.Generator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JsonFileGenerator {

    public static void generateJson(Object data, String fileName) throws Exception {

        // Base folder: output/result
        Path basePath = Paths.get("output", "result");

        if (!Files.exists(basePath)) {
            Files.createDirectories(basePath);
        }

        // Support nested folders like cis/ or stig/
        Path fullPath = basePath.resolve(fileName);

        Path parentDir = fullPath.getParent();
        if (parentDir != null && !Files.exists(parentDir)) {
            Files.createDirectories(parentDir);
        }

        File outputFile = fullPath.toFile();

        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        mapper.writeValue(outputFile, data);
    }
}