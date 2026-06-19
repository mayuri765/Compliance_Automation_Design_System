var metadata = {
    ruleNumber: "1.5.4",
    title: "Do not set 'RW' for any 'snmp-server community'",
    profile: "•  Level 1",
    description: "Specifies read-write access. Authorized management stations can both retrieve and  modify MIB objects.",
    rationale: "Enabling SNMP read-write enables remote management of the device. Unless  absolutely necessary, do not allow simple network management protocol (SNMP) write  access.",
    impact: "To reduce the risk of unauthorized access, Organizations should disable the SNMP  'write' access for snmp-server community.",
    audit: "Perform the following to determine if a read/write community string is enabled:  Verify the result does not show a community string with a \"RW\"    hostname#show run | incl snmp-server community",
    remediation: "Disable SNMP write access.    hostname(config)#no snmp-server community {<em>write_community_string</em>}",
    defaultValue: ""
};

function check(config) {

    if (!config) {
        return { status: "ERROR", line: 0 };
    }

    var lines = config.split("\n");
    var matched = false;
    var foundLine = 0;
    var pass = true;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if (line.indexOf("") !== -1) {

            matched = true;
            foundLine = i + 1;

            var numberMatch = line.match(/\d+/);
            var actual = numberMatch ? parseInt(numberMatch[0]) : null;

            pass = true;
        }
    }

    if (!matched) {
        return { status: "FAIL", line: 0 };
    }

    if (pass) {
        return { status: "PASS", line: foundLine };
    }

    return { status: "FAIL", line: foundLine };
}

check(config);
