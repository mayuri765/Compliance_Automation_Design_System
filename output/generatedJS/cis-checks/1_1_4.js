var metadata = {
    ruleNumber: "1.1.4",
    title: "Set 'login authentication for 'line vty' (Automated)",
    profile: "•  Level 1",
    description: "Authenticates users who access the router or switch remotely through the VTY port.",
    rationale: "Using AAA authentication for interactive management access to the device provides  consistent, centralized control of your network. The default under AAA (local or network)  is to require users to log in using a valid user name and password. This rule applies for  both local and network AAA.",
    impact: "Enabling Cisco AAA 'login authentication for line VTY' is significantly disruptive as  former access methods are immediately disabled. Therefore, before enabling Cisco  AAA 'login authentication for line VTY', the organization should plan and implement  authentication logins and passwords, challenges and responses, and token  technologies.",
    audit: "Perform the following to determine if AAA authentication for line login is enabled:  If the command does not return a result for each management access method, the  feature is not enabled  hostname#show running-config | sec line | incl login authentication",
    remediation: "Configure management lines to require login using the default or a named AAA  authentication list. This configuration must be set individually for all line types.  hostname(config)#line vty {line-number} [<em>ending-line-number]  hostname(config-line)#login authentication {default | aaa_list_name}",
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
