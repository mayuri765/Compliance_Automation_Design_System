package org.example;

import java.io.File;
import java.util.List;

import org.example.model.CIS_Benchmark;
import org.example.model.STIG_Benchmark;

import org.example.Extractor.CISMetadataExtractor;
import org.example.Extractor.STIGMetadataExtractor;

import org.example.Generator.CIS_checkGenerator;
import org.example.Generator.STIG_checkGenerator;
import org.example.Generator.JsonFileGenerator;

import org.example.service.MultiDeviceValidationService;

public class Main {

    public static void main(String[] args) {

        try {
        // 🔹 Step 1: Load PDFs
            File cisFile = PdfLoader.getPdfFileIfExists("input/cis");
            File stigFile = PdfLoader.getPdfFileIfExists("input/stig");

            // 🔹 Step 2: Process CIS PDF
            if (cisFile != null) {

                System.out.println("\nProcessing CIS PDF: " + cisFile.getName());

                CISMetadataExtractor cisExtractor = new CISMetadataExtractor();
                List<CIS_Benchmark> cisList = cisExtractor.extract(cisFile);

                System.out.println("Total CIS Rules Extracted: " + cisList.size());

                // Generate metadata JSON
                JsonFileGenerator.generateJson(cisList, "cis_metadata.json");

                // Generate JS checks
                CIS_checkGenerator.generateChecks(cisList);

                System.out.println("CIS JS Checks Generated Successfully.");
            }

            // 🔹 Step 3: Process STIG PDF
            if (stigFile != null) {

                System.out.println("\nProcessing STIG PDF: " + stigFile.getName());

                STIGMetadataExtractor stigExtractor = new STIGMetadataExtractor();
                List<STIG_Benchmark> stigList = stigExtractor.extract(stigFile);

                System.out.println("Total STIG Rules Extracted: " + stigList.size());

                // Generate metadata JSON
                JsonFileGenerator.generateJson(stigList, "stig_metadata.json");

                // Generate JS checks
                STIG_checkGenerator.generateChecks(stigList);

                System.out.println("STIG JS Checks Generated Successfully.");
            }

            if (cisFile == null && stigFile == null) {
                System.out.println("\nNo CIS or STIG PDFs found in input folder.");
            }

            // 🔹 Step 4: Multi-Device Validation
            System.out.println("\nStarting Multi-Device Validation...");

            MultiDeviceValidationService.validateAllDevices();

            System.out.println("\nAll Devices Validated Successfully!");

        } catch (Exception e) {
            System.out.println("Error occurred during execution:");
            e.printStackTrace();
        }
    }
}