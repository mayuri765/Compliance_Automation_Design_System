var metadata = {
    ruleNumber: "1.2.1",
    title: "Set 'privilege 1' for local users (Automated)",
    profile: "•  Level 1",
    description: "Sets the privilege level for the user.",
    rationale: "Default device configuration does not require strong user authentication potentially  enabling unfettered access to an attacker that is able to reach the device. Creating a  local account with privilege level 1 permissions only allows the local user to access the  device with EXEC-level permissions and will be unable to modify the device without  using the enable password. In addition, require the use of an encrypted password as  well (see Section 1.1.4.4 - Require Encrypted User Passwords).",
    impact: "Organizations should create policies requiring all local accounts with 'privilege level 1'  with encrypted passwords to reduce the risk of unauthorized access. Default  configuration settings do not provide strong user authentication to the device.",
    audit: "Perform the following to determine if a user with an encrypted password is enabled:  Verify all username results return \"privilege 1\"  hostname#show running-config | incl privilege",
    remediation: "Set the local user to privilege level 1.  hostname(config)#username <LOCAL_USERNAME> privilege 1",
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
