var metadata = {
    ruleNumber: "1.5.9",
    title: "Set 'priv' for each 'snmp-server group' using SNMPv3",
    profile: "•  Level 2",
    description: "Specifies authentication of a packet with encryption when using SNMPv3",
    rationale: "SNMPv3 provides much improved security over previous versions by offering options  for Authentication and Encryption of messages. When configuring a user for SNMPv3  you have the option of using a range of encryption schemes, or no encryption at all, to  protect messages in transit. AES128 is the minimum strength encryption method that  should be deployed.",
    impact: "Organizations using SNMP can significantly reduce the risks of unauthorized access by  using the 'snmp-server group v3 priv' setting to encrypt messages in transit.",
    audit: "Verify the result show the appropriate group name and security model    hostname#show snmp group",
    remediation: "For each SNMPv3 group created on your router add privacy options by issuing the  following command...    hostname(config)#snmp-server group {<em>group_name</em>} v3 priv",
    defaultValue: "No SNMP server groups are configured."
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
