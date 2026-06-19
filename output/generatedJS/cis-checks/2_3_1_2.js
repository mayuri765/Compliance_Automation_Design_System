var metadata = {
    ruleNumber: "2.3.1.2",
    title: "Set 'ntp authentication-key' (Automated)",
    profile: "•  Level 2",
    description: "Define an authentication key for Network Time Protocol (NTP).",
    rationale: "Using an authentication key provides a higher degree of security as only authenticated  NTP servers will be able to update time for the Cisco device.",
    impact: "Organizations should establish three Network Time Protocol (NTP) hosts to set  consistent time across the enterprise. Enabling the 'ntp authentication-key' command  enforces encrypted authentication between NTP hosts.",
    audit: "From the command prompt, execute the following commands:    hostname#show run | include ntp authentication-key",
    remediation: "Configure at the NTP key ring and encryption key using the following command    hostname(config)#ntp authentication-key {ntp_key_id} md5 {ntp_key_hash}",
    defaultValue: "No authentication key is defined for NTP."
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
