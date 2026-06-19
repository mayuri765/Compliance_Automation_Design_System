# Compliance_Automation_Design_System


## Overview

Automation Design System is a Java-based Security Compliance Validation Framework designed to automate the assessment of Cisco network device configurations against industry-standard security benchmarks.

The system extracts compliance rules from CIS and STIG benchmark PDFs, automatically generates validation scripts, validates multiple device configuration files, compares results with expected outputs, calculates accuracy metrics, and generates structured reports.

---

## Features

✔ Extract CIS benchmark rules from PDF documents

✔ Extract STIG benchmark rules from PDF documents

✔ Automatically generate JavaScript validation checks

✔ Validate multiple Cisco device configuration files

✔ Compare actual and expected compliance results

✔ Generate JSON-based compliance reports

✔ Calculate validation accuracy

✔ Generate compliance summaries

✔ Support batch validation of multiple devices

---

## Project Architecture

```text
Input Files
│
├── CIS Benchmark PDF
├── STIG Benchmark PDF
├── Device Configurations (.cfg)
└── Expected Results
        │
        ▼
Metadata Extraction
        │
        ▼
JS Check Generation
        │
        ▼
Device Validation
        │
        ▼
Result Comparison
        │
        ▼
Accuracy Calculation
        │
        ▼
JSON Reports & Summary
Technologies Used
Java
Maven
Apache PDFBox
Jackson Databind
Nashorn JavaScript Engine
Project Structure
src/
 ├── Extractor/
 │    ├── CISMetadataExtractor
 │    └── STIGMetadataExtractor
 │
 ├── Generator/
 │    ├── CIS_checkGenerator
 │    ├── STIG_checkGenerator
 │    └── JsonFileGenerator
 │
 ├── comparator/
 │    ├── ExpectedResultLoader
 │    └── ResultComparator
 │
 ├── runner/
 │    └── JSValidationRunner
 │
 ├── service/
 │    ├── MultiDeviceValidationService
 │    ├── AccuracyCalculator
 │    └── SummaryHelper
 │
 └── model/
Input Directory Structure
input/
├── cis/
│    └── CIS Benchmark PDF
│
├── stig/
│    └── STIG Benchmark PDF
│
├── device-config/
│    └── Cisco Configuration Files (.cfg)
│
└── Expected/
     ├── cis_cisco_ios_checks.txt
     └── stig_cisco_ios_checks.txt
Output Directory Structure
output/
├── generatedJS/
├── actual/
├── cis/
├── stig/
├── accuracy/
└── summary/
How It Works
Step 1: Load Security Benchmarks

The application loads:

CIS Benchmark PDF
STIG Benchmark PDF

and extracts compliance metadata.

Step 2: Generate Validation Checks

Security rules are converted into executable JavaScript validation checks.

Step 3: Validate Device Configurations

Each Cisco configuration file is validated against the generated security checks.

Step 4: Compare Results

Generated results are compared with predefined expected outputs.

Step 5: Calculate Accuracy

The system computes compliance validation accuracy.

Step 6: Generate Reports

Reports are generated in JSON format for:

Validation Results
Compliance Status
Accuracy Metrics
Summary Reports
Installation
Clone Repository
git clone https://github.com/yourusername/Automation-Design-System.git
Navigate to Project
cd Automation-Design-System
Build Project
mvn clean install
Run Application
mvn exec:java

or

java -jar target/Automation_Design_System.jar
Dependencies
Apache PDFBox 2.0.29
Jackson Databind 2.16.0
Jackson Core 2.16.0
Jackson Annotations 2.16.0
Nashorn Core 15.4
Sample Use Cases
Network Security Compliance Auditing
Cisco Configuration Validation
CIS Benchmark Assessment
STIG Compliance Verification
Automated Security Report Generation
Enterprise Network Security Monitoring
Future Enhancements
Support for additional vendors
Web Dashboard
PDF Report Generation
Database Integration
REST API Support
Real-Time Compliance Monitoring
Author

Mayuri Gopal Dhabade

B.Tech Computer Science & Engineering
