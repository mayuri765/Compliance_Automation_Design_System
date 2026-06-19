var metadata = {
    ruleNumber: "2.1.2",
    title: "Set 'no cdp run' (Automated)",
    profile: "•  Level 1",
    description: "Disable Cisco Discovery Protocol (CDP) service at device level.",
    rationale: "The Cisco Discovery Protocol is a proprietary protocol that Cisco devices use to identify  each other on a LAN segment. It is useful only in network monitoring and  troubleshooting situations but is considered a security risk because of the amount of  information provided from queries. In addition, there have been published denial-of- service (DoS) attacks that use CDP. CDP should be completely disabled unless  necessary.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting network protocols and explicitly require disabling all insecure or  unnecessary protocols.",
    audit: "Perform the following to determine if CDP is enabled:  Verify the result shows \"CDP is not enabled\"    hostname#show cdp",
    remediation: "Disable Cisco Discovery Protocol (CDP) service globally.    hostname(config)#no cdp run",
    defaultValue: "Enabled on all platforms except the Cisco 10000 Series Edge Services Router"
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
