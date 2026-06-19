var metadata = {
    ruleNumber: "3.3.1.5",
    title: "Set 'af-interface default' (Automated)",
    profile: "•  Level 2",
    description: "Defines user defaults to apply to EIGRP interfaces that belong to an address-family.",
    rationale: "Part of the EIGRP address-family setup",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using 'af-interface default' for  EIGRP interfaces enforces these policies by restricting the exchanges between  predefined network devices.",
    audit: "Verify the setting    hostname#sh run | sec router eigrp",
    remediation: "Configure the EIGRP address family.    hostname(config)#router eigrp <<em>virtual-instance-name</em>>  hostname(config-router)#address-family ipv4 autonomous-system {<em>eigrp_as- number</em>}  hostname(config-router-af)#af-interface default",
    defaultValue: "Not set"
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
