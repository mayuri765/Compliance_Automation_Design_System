var metadata = {
    ruleNumber: "1.5.3",
    title: "Unset 'public' for 'snmp-server community' (Automated)",
    profile: "•  Level 1",
    description: "An SNMP community string permits read-only access to all objects.",
    rationale: "The default community string \"public\" is well known. Using easy to guess, well known  community string poses a threat that an attacker can effortlessly gain unauthorized  access to the device.",
    impact: "To reduce the risk of unauthorized access, Organizations should disable default, easy  to guess, settings such as the 'public' setting for snmp-server community.",
    audit: "Perform the following to determine if the public community string is enabled: Ensure  public does not show as a result    hostname# show snmp community",
    remediation: "Disable the default SNMP community string \"public\"    hostname(config)#no snmp-server community {public}",
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
