var metadata = {
    ruleNumber: "2.1.7",
    title: "Set 'service tcp-keepalives-out' (Automated)",
    profile: "•  Level 1",
    description: "Generate keepalive packets on idle outgoing network connections.",
    rationale: "Stale connections use resources and could potentially be hijacked to gain illegitimate  access. The TCP keepalives-in service generates keepalive packets on idle incoming  network connections (initiated by remote host). This service allows the device to detect  when the remote host fails and drop the session. If enabled, keepalives are sent once  per minute on idle connections. The closes connection is closed within five minutes if no  keepalives are received or immediately if the host replies with a reset packet.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting how long to allow terminated sessions and enforce this policy through  the use of 'tcp-keepalives-out' command.",
    audit: "Perform the following to determine if the feature is enabled:  Verify a command string result returns    hostname#show run | incl service tcp",
    remediation: "Enable TCP keepalives-out service:    hostname(config)#service tcp-keepalives-out",
    defaultValue: "Disabled by default."
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

        if (line.indexOf("service tcp") !== -1) {

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
