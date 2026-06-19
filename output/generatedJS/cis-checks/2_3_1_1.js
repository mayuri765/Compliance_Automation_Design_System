var metadata = {
    ruleNumber: "2.3.1.1",
    title: "Set 'ntp authenticate' (Automated)",
    profile: "•  Level 2",
    description: "Enable NTP authentication.",
    rationale: "Using authenticated NTP ensures the Cisco device only permits time updates from  authorized NTP servers.",
    impact: "Organizations should establish three Network Time Protocol (NTP) hosts to set  consistent time across the enterprise. Enabling the 'ntp authenticate' command enforces  authentication between NTP hosts.",
    audit: "From the command prompt, execute the following commands:    hostname#show run | include ntp",
    remediation: "Configure NTP authentication:    hostname(config)#ntp authenticate",
    defaultValue: "NTP authentication is not enabled."
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
