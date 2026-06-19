package org.example.model;
public class ExpectedResult {

    private String ruleId;
    private String expectedStatus;
    private int expectedLine;
    private String type; // CIS or STIG

    public String getRuleId() { return ruleId; }
    public void setRuleId(String ruleId) { this.ruleId = ruleId; }

    public String getExpectedStatus() { return expectedStatus; }
    public void setExpectedStatus(String expectedStatus) { this.expectedStatus = expectedStatus; }

    public int getExpectedLine() { return expectedLine; }
    public void setExpectedLine(int expectedLine) { this.expectedLine = expectedLine; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
