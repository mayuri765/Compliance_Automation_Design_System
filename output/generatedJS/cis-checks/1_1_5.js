var metadata = {
    ruleNumber: "1.1.5",
    title: "Set 'login authentication for 'ip http' (Automated)",
    profile: "•  Level 1",
    description: "If account management functions are not automatically enforced, an attacker could gain  privileged access to a vital element of the network security architecture",
    rationale: "Using AAA authentication for interactive management access to the device provides  consistent, centralized control of your network. The default under AAA (local or network)  is to require users to log in using a valid user name and password. This rule applies for  both local and network AAA.",
    impact: "Enabling Cisco AAA 'line login' is significantly disruptive as former access methods are  immediately disabled. Therefore, before enabling Cisco AAA 'line login', the  organization should plan and implement authentication logins and passwords,  challenges and responses, and token technologies.",
    audit: "Perform the following to determine if AAA authentication for line login is enabled:  If the command does not return a result for each management access method, the  feature is not enabled  hostname#show running-config | inc ip http authentication",
    remediation: "Configure management lines to require login using the default or a named AAA  authentication list. This configuration must be set individually for all line types.  hostname#(config)ip http secure-server  hostname#(config)ip http authentication {default | _aaa\_list\_name_}",
    defaultValue: "Login authentication is not enabled.  Uses the default set with aaa authentication login."
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

        if (line.indexOf("ip http") !== -1) {

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
