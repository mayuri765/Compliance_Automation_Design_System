var metadata = {
    ruleNumber: "2.2.8",
    title: "Set 'login success/failure logging' (Automated)",
    profile: "•  Level 2",
    description: "Without generating audit records that are specific to the security and mission needs of  the organization, it would be difficult to establish, correlate, and investigate the events  relating to an incident or identify those responsible for one.",
    rationale: "",
    impact: "",
    audit: "hostname(config)#sho running-config | inc login on-",
    remediation: "hostname(config)#login on-failure log  hostname(config)#login on-success log  hostname(config)#end",
    defaultValue: ""
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
