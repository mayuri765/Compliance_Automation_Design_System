var metadata = {
    ruleNumber: "2.1.1.1.2",
    title: "Set the 'ip domain-name' (Automated)",
    profile: "•  Level 1",
    description: "Define a default domain name that the Cisco IOS software uses to complete unqualified  hostnames",
    rationale: "The domain name is a prerequisite for setting up SSH.",
    impact: "Organizations should plan the enterprise network and identify an appropriate domain  name for the router.",
    audit: "Perform the following to determine if the domain name is configured:  Verify the domain name is configured properly.    hostname#sh run | incl domain-name",
    remediation: "Configure an appropriate domain name for the router.    hostname (config)#ip domain-name {<em>domain-name</em>}",
    defaultValue: "No domain is set."
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
