var metadata = {
    ruleNumber: "2.1.1.1.1",
    title: "Set the 'hostname' (Automated)",
    profile: "•  Level 1",
    description: "The hostname is used in prompts and default configuration filenames.",
    rationale: "The domain name is prerequisite for setting up SSH.",
    impact: "Organizations should plan the enterprise network and identify an appropriate host name  for each router.",
    audit: "Perform the following to determine if the local time zone is configured:  Verify the result shows the summer-time recurrence is configured properly.    hostname#sh run | incl hostname",
    remediation: "Configure an appropriate host name for the router.    hostname(config)#hostname {<em>router_name</em>}",
    defaultValue: "The default hostname is Router."
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
