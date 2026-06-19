# 🔐 Compliance Automation Design System


## 📖 Overview

Automation Design System is a Java-based Security Compliance Validation Framework designed to automate the assessment of Cisco network device configurations against industry-standard security benchmarks.

The system extracts compliance rules from CIS and STIG benchmark PDFs, automatically generates validation scripts, validates multiple device configuration files, compares results with expected outputs, calculates accuracy metrics, and generates structured reports.

---

## ✨ Features

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

## 🏗️ Project Architecture

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
```

---

## 🛠️ Technologies Used

| Technology                | Purpose                       |
| ------------------------- | ----------------------------- |
| Java                      | Core Development              |
| Maven                     | Build & Dependency Management |
| Apache PDFBox             | PDF Processing                |
| Jackson Databind          | JSON Processing               |
| Nashorn JavaScript Engine | Validation Execution          |

---

## 📂 Project Structure

```text
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
```

---

## 📥 Input Directory Structure

```text
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
```

---

## 📤 Output Directory Structure

```text
output/
├── generatedJS/
├── actual/
├── cis/
├── stig/
├── accuracy/
└── summary/
```

---

## ⚙️ How It Works

### Step 1: Load Security Benchmarks

The application loads:

* CIS Benchmark PDF
* STIG Benchmark PDF

and extracts compliance metadata.

### Step 2: Generate Validation Checks

Security rules are converted into executable JavaScript validation checks.

### Step 3: Validate Device Configurations

Each Cisco configuration file is validated against the generated security checks.

### Step 4: Compare Results

Generated results are compared with predefined expected outputs.

### Step 5: Calculate Accuracy

The system computes compliance validation accuracy.

### Step 6: Generate Reports

Reports are generated in JSON format for:

* Validation Results
* Compliance Status
* Accuracy Metrics
* Summary Reports

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/mayuri765/Compliance_Automation_Design_System.git
```

### Navigate to Project

```bash
cd Compliance_Automation_Design_System
```

### Build Project

```bash
mvn clean install
```

### Run Application

```bash
mvn exec:java
```

or

```bash
java -jar target/Automation_Design_System.jar
```

---

## 📦 Dependencies

* Apache PDFBox 2.0.29
* Jackson Databind 2.16.0
* Jackson Core 2.16.0
* Jackson Annotations 2.16.0
* Nashorn Core 15.4

---

## 🎯 Sample Use Cases

* Network Security Compliance Auditing
* Cisco Configuration Validation
* CIS Benchmark Assessment
* STIG Compliance Verification
* Automated Security Report Generation
* Enterprise Network Security Monitoring

---

## 🔮 Future Enhancements

* Support for Additional Vendors
* Web Dashboard
* PDF Report Generation
* Database Integration
* REST API Support
* Real-Time Compliance Monitoring




