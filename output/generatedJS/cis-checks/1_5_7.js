var metadata = {
    ruleNumber: "1.5.7",
    title: "Set 'snmp-server host' when using SNMP (Automated)",
    profile: "•  Level 1",
    description: "SNMP notifications can be sent as traps to authorized management systems.",
    rationale: "If SNMP is enabled for device management and device alerts are required, then ensure  the device is configured to submit traps only to authorize management systems.",
    impact: "Organizations using SNMP should restrict sending SNMP messages only to explicitly  named systems to reduce unauthorized access.",
    audit: "Perform the following to determine if SNMP traps are enabled:  If the command returns configuration values, then SNMP is enabled.    hostname#show run | incl snmp-server",
    remediation: "Configure authorized SNMP trap community string and restrict sending messages to  authorized management systems.    hostname(config)#snmp-server host {ip_address} {trap_community_string}  {notification-type}",
    defaultValue: "A recipient is not specified to receive notifications."
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
