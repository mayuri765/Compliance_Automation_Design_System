var metadata = {
    ruleNumber: "1.1.9",
    title: "Set 'aaa accounting network' (Automated)",
    profile: "•  Level 2",
    description: "Runs accounting for all network-related service requests.",
    rationale: "Authentication, authorization and accounting (AAA) systems provide an authoritative  source for managing and monitoring access for devices. Centralizing control improves  consistency of access control, the services that may be accessed once authenticated  and accountability by tracking services accessed. Additionally, centralizing access  control simplifies and reduces administrative costs of account provisioning and de- provisioning, especially when managing a large number of devices. AAA Accounting  provides a management and audit trail for user and administrative sessions through  RADIUS and TACACS+.",
    impact: "Implementing aaa accounting network creates accounting records for a method list  including ARA, PPP, SLIP, and NCPs sessions. Organizations should regular monitor  these records for exceptions, remediate issues, and report findings.",
    audit: "Perform the following to determine if aaa accounting for connection is required:  Verify a command string result returns  hostname#show running-config | incl aaa accounting network",
    remediation: "Configure AAA accounting for connections.  hostname(config)#aaa accounting network {default | list-name | guarantee- first}   {start-stop | stop-only | none} {radius | group group-name}",
    defaultValue: "AAA accounting is not enabled."
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
