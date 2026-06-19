var metadata = {
    ruleNumber: "2.4.3",
    title: "Set 'ntp source' to Loopback Interface (Automated)",
    profile: "•  Level 2",
    description: "Use a particular source address in Network Time Protocol (NTP) packets.",
    rationale: "Set the source address to be used when sending NTP traffic. This may be required if  the NTP servers you peer with filter based on IP address.",
    impact: "Organizations should plan and implement network time protocol (NTP) services to  establish official time for all enterprise network devices. Setting 'ntp source loopback'  enforces the proper IP address for NTP services.",
    audit: "Perform the following to determine if NTP services are bound to a source interface:  Verify a command string result returns    hostname#sh run | incl ntp source",
    remediation: "Bind the NTP service to the loopback interface.    hostname(config)#ntp source loopback {<em>loopback_interface_number}</em>",
    defaultValue: "Source address is determined by the outgoing interface."
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
