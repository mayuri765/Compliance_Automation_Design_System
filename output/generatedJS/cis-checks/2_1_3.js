var metadata = {
    ruleNumber: "2.1.3",
    title: "Set 'no ip bootp server' (Automated)",
    profile: "•  Level 1",
    description: "Disable the Bootstrap Protocol (BOOTP) service on your routing device.",
    rationale: "BootP allows a router to issue IP addresses. This should be disabled unless there is a  specific requirement.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting network protocols and explicitly require disabling all insecure or  unnecessary protocols such as 'ip bootp server'.",
    audit: "Perform the following to determine if bootp is enabled:  Verify a \"no ip bootp server\" result returns    hostname#show run | incl bootp",
    remediation: "Disable the bootp server.    hostname(config)#ip dhcp bootp ignore",
    defaultValue: "Enabled"
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

        if (line.indexOf("no ip") !== -1) {

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
