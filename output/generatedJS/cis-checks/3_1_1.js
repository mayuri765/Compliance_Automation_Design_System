var metadata = {
    ruleNumber: "3.1.1",
    title: "Set 'no ip source-route' (Automated)",
    profile: "•  Level 1",
    description: "Disable the handling of IP datagrams with source routing header options.",
    rationale: "Source routing is a feature of IP whereby individual packets can specify routes. This  feature is used in several kinds of attacks. Cisco routers normally accept and process  source routes. Unless a network depends on source routing, it should be disabled.",
    impact: "Organizations should plan and implement network policies to ensure unnecessary  services are explicitly disabled. The 'ip source-route' feature has been used in several  attacks and should be disabled.",
    audit: "Verify the command string result returns    hostname#sh run | incl ip source-route",
    remediation: "Disable source routing.    hostname(config)#no ip source-route",
    defaultValue: "Enabled by default"
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

        if (line.indexOf("ip source-route") !== -1) {

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
