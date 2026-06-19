var metadata = {
    ruleNumber: "2.1.1",
    title: ".2 Set version 2 for 'ip ssh version' (Automated)",
    profile: "•  Level 1",
    description: "Specify the version of Secure Shell (SSH) to be run on a router",
    rationale: "SSH Version 1 has been subject to a number of serious vulnerabilities and is no longer  considered to be a secure protocol, resulting in the adoption of SSH Version 2 as an  Internet Standard in 2006.  Cisco routers support both versions, but due to the weakness of SSH Version 1 only the  later standard should be used.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy to review their current protocols to ensure the most secure protocol versions are  in use.",
    audit: "Perform the following to determine if SSH version 2 is configured:  Verify that SSH version 2 is configured properly.    hostname#sh ip ssh",
    remediation: "Configure the router to use SSH version 2    hostname(config)#ip ssh version 2",
    defaultValue: "SSH is not enabled by default. When enabled, SSH operates in compatibility mode  (versions 1 and 2 supported)."
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

        if (line.indexOf("ip ssh") !== -1) {

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
