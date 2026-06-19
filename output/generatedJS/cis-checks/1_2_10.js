var metadata = {
    ruleNumber: "1.2.10",
    title: "Set 'http Secure-server' limit (Automated)",
    profile: "•  Level 1",
    description: "Device management includes the ability to control the number of administrators and  management sessions that manage a device. Limiting the number of allowed  administrators and sessions per administrator based on account type, role, or access  type is helpful in limiting risks related to denial-of-service (DoS) attacks.",
    rationale: "",
    impact: "",
    audit: "The result should show ip http secure-server with max connections on following line  hostname#show run | inc ip http secure-server",
    remediation: "hostname(config)#ip http max-connections 2",
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

        if (line.indexOf("ip http") !== -1) {

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
