var metadata = {
    ruleNumber: "2.1.5",
    title: "Set 'no ip identd' (Automated)",
    profile: "•  Level 1",
    description: "Disable the identification (identd) server.",
    rationale: "Identification protocol enables identifying a user's transmission control protocol (TCP)  session. This information disclosure could potentially provide an attacker with  information about users.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting network protocols and explicitly require disabling all insecure or  unnecessary protocols such as the identification protocol (identd).",
    audit: "Perform the following to determine if identd is enabled:  Verify no result returns  hostname#show run | incl identd",
    remediation: "Disable the ident server.  hostname(config)#no ip identd",
    defaultValue: "Disabled by default"
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

        if (line.indexOf("no result") !== -1) {

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
