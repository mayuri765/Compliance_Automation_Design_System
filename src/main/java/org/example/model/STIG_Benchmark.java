package org.example.model;

public class STIG_Benchmark {

    private String groupIdNumber;

    private String stigId;

    private String ruleId;

    private String groupId;

    private String severity;

    private String description;
    private String rationale;
    private String audit;
    private String remediation;

    private String cci;

    public STIG_Benchmark() {
    }



    public String getGroupIdNumber() {
        return groupIdNumber;
    }

    public void setGroupIdNumber(String groupIdNumber) {
        this.groupIdNumber = groupIdNumber;
    }

    public String getStigId() {
        return stigId;
    }

    public void setStigId(String stigId) {
        this.stigId = stigId;
    }

    public String getRuleId() {
        return ruleId;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRationale() {
        return rationale;
    }

    public void setRationale(String rationale) {
        this.rationale = rationale;
    }

    public String getAudit() {
        return audit;
    }

    public void setAudit(String audit) {
        this.audit = audit;
    }

    public String getRemediation() {
        return remediation;
    }

    public void setRemediation(String remediation) {
        this.remediation = remediation;
    }

    public String getCci() {
        return cci;
    }

    public void setCci(String cci) {
        this.cci = cci;
    }
}
