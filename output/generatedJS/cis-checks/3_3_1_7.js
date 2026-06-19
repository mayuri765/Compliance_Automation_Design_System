var metadata = {
    ruleNumber: "3.3.1.7",
    title: "Set 'authentication mode md5' (Automated)",
    profile: "•  Level 1",
    description: "Configure authentication to prevent unapproved sources from introducing unauthorized  or false service messages.",
    rationale: "This is part of the EIGRP authentication configuration",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using the 'authentication mode'  for EIGRP address-family or service-family packets enforces these policies by  restricting the type of authentication between network devices.",
    audit: "Verify the appropriate address family authentication mode is set    hostname#sh run | sec router eigrp",
    remediation: "Configure the EIGRP address family authentication mode.    hostname(config)#router eigrp <virtual-instance-name>  hostname(config-router)#address-family ipv4 autonomous-system {eigrp_as- number}  hostname(config-router-af)#af-interface {interface-name}  hostname(config-router-af-interface)#authentication mode md5",
    defaultValue: "Not defined"
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
