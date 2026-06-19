var metadata = {
    ruleNumber: "1.5.1",
    title: "Set 'no snmp-server' to disable SNMP when unused",
    profile: "•  Level 1",
    description: "If not in use, disable simple network management protocol (SNMP), read and write  access.",
    rationale: "SNMP read access allows remote monitoring and management of the device.",
    impact: "Organizations not using SNMP should require all SNMP services to be disabled by  running the 'no snmp-server' command.",
    audit: "Verify the result reads \"SNMP agent not enabled\"  hostname#show snmp community",
    remediation: "Disable SNMP read and write access if not in used to monitor and/or manage device.  hostname(config)#no snmp-server",
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
