var metadata = {
    ruleNumber: "1.6.1",
    title: "Configure Login Block (Automated)",
    profile: "•  Level 2",
    description: "All login parameters are disabled by default. You must issue the login block-for  command, which enables default login functionality, before using any other login  commands. After the login block-for command is enabled, the following defaults are  enforced:  A default login delay of one second  All login attempts made via Telnet or SSH are denied during the quiet period; that is, no  ACLs are exempt from the login period until the login quiet-mode access-class  command is issued.",
    rationale: "",
    impact: "",
    audit: "Configures your Cisco IOS XE device for login parameters that help provide DoS  detection.  hostname#show running-config | inc login block",
    remediation: "To enable the feature enter the commands  Hostname#(config)login block-for {**seconds**} attempts {**tries**} within  {**seconds**  All login attempts made via Telnet or SSH are denied during the quiet period; that is, no  ACLs are exempt from the login period until the login quiet-mode access-class  command is issued  Page 98  Hostname#(config)login quiet-mode access class {**acl-name | acl-number**}  Hostname#(config)login delay {**seconds**}",
    defaultValue: "no login-block enabled"
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
