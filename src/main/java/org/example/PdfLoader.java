package org.example;

import java.io.File;

public class PdfLoader {

    public static File getPdfFileIfExists(String folderPath) {

        File folder = new File(folderPath);

        if (!folder.exists() || !folder.isDirectory()) {
            System.out.println("Folder not found: " + folderPath);
            return null;
        }

        File[] pdfFiles = folder.listFiles((dir, name) ->
                name.toLowerCase().endsWith(".pdf"));

        if (pdfFiles == null || pdfFiles.length == 0) {
            System.out.println("No PDF found in: " + folderPath);
            return null;
        }

        return pdfFiles[0];
    }

}

