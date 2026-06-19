var metadata = {
    ruleNumber: "2.3.1.3",
    title: "Set the 'ntp trusted-key' (Automated)",
    profile: "•  Level 2",
    description: "Ensure you authenticate the identity of a system to which Network Time Protocol (NTP)  will synchronize",
    rationale: "This authentication function provides protection against accidentally synchronizing the  system to another system that is not trusted, because the other system must know the  correct authentication key.",
    impact: "Organizations should establish three Network Time Protocol (NTP) hosts to set  consistent time across the enterprise. Enabling the 'ntp trusted-key' command enforces  encrypted authentication between NTP hosts.",
    audit: "From the command prompt, execute the following commands:    hostname#show run | include ntp trusted-key   The above command should return any NTP server(s) configured with encryption keys.  This value should be the same as the total number of servers configured as tested in.",
    remediation: "Configure the NTP trusted key using the following command    hostname(config)#ntp trusted-key {ntp_key_id}",
    defaultValue: "Authentication of the identity of the system is disabled."
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
