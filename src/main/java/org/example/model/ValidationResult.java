package org.example.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ValidationResult {

    // =========================
    // Rule Level Fields
    // =========================
    private String ruleId;
    private String status;
    private Integer line;
    private Integer failureInstances;

    // =========================
    // Device Level Summary Fields
    // =========================
    private String deviceName;
    private Integer totalRules;
    private Integer totalPassed;
    private Integer totalFailed;
    private Double compliancePercentage;
    private String overallStatus;

    private List<ValidationResult> results;

    // =========================
    // Constructors
    // =========================

    public ValidationResult() {}

    // Rule constructor
    public ValidationResult(String ruleId, String status, int line) {
        this.ruleId = ruleId;
        this.status = status;
        this.line = line;
    }

    public ValidationResult(String ruleId, String status, int line, int failureInstances) {
        this.ruleId = ruleId;
        this.status = status;
        this.line = line;
        this.failureInstances = failureInstances;
    }

    // =========================
    // Getters & Setters
    // =========================

    public String getRuleId() { return ruleId; }
    public void setRuleId(String ruleId) { this.ruleId = ruleId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getLine() { return line; }
    public void setLine(Integer line) { this.line = line; }

    public Integer getFailureInstances() { return failureInstances; }
    public void setFailureInstances(Integer failureInstances) { this.failureInstances = failureInstances; }

    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }

    public Integer getTotalRules() { return totalRules; }
    public void setTotalRules(Integer totalRules) { this.totalRules = totalRules; }

    public Integer getTotalPassed() { return totalPassed; }
    public void setTotalPassed(Integer totalPassed) { this.totalPassed = totalPassed; }

    public Integer getTotalFailed() { return totalFailed; }
    public void setTotalFailed(Integer totalFailed) { this.totalFailed = totalFailed; }

    public Double getCompliancePercentage() { return compliancePercentage; }
    public void setCompliancePercentage(Double compliancePercentage) { this.compliancePercentage = compliancePercentage; }

    public String getOverallStatus() { return overallStatus; }
    public void setOverallStatus(String overallStatus) { this.overallStatus = overallStatus; }

    public List<ValidationResult> getResults() { return results; }
    public void setResults(List<ValidationResult> results) { this.results = results; }
}