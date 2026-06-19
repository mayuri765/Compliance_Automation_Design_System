var metadata = {
    ruleNumber: "1.1.10",
    title: "Set 'aaa accounting system' (Automated)",
    profile: "•  Level 2",
    description: "Performs accounting for all system-level events not associated with users, such as  reloads.",
    rationale: "Authentication, authorization and accounting (AAA) systems provide an authoritative  source for managing and monitoring access for devices. Centralizing control improves  consistency of access control, the services that may be accessed once authenticated  and accountability by tracking services accessed. Additionally, centralizing access  control simplifies and reduces administrative costs of account provisioning and de- provisioning, especially when managing a large number of devices. AAA Accounting  provides a management and audit trail for user and administrative sessions through  RADIUS and TACACS+.",
    impact: "Enabling aaa accounting system creates accounting records for all system-level events.  Organizations should regular monitor these records for exceptions, remediate issues,  and report findings regularly.",
    audit: "Perform the following to determine if aaa accounting system is required:  Verify a command string result returns  hostname#show running-config | incl aaa accounting system",
    remediation: "Configure AAA accounting system.  hostname(config)#aaa accounting system {default | list-name | guarantee- first}   {start-stop | stop-only | none} {radius | group group-name}",
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
