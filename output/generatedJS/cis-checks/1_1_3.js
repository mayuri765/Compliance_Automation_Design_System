var metadata = {
    ruleNumber: "1.1.3",
    title: "Enable 'aaa authentication enable default' (Automated)",
    profile: "•  Level 1",
    description: "Authenticates users who access privileged EXEC mode when they use the enable  command.",
    rationale: "Using AAA authentication for interactive management access to the device provides  consistent, centralized control of your network. The default under AAA (local or network)  is to require users to log in using a valid user name and password. This rule applies for  both local and network AAA.",
    impact: "Enabling Cisco AAA 'authentication enable' mode is significantly disruptive as former  access methods are immediately disabled. Therefore, before enabling 'aaa  authentication enable default' mode, the organization should plan and implement  authentication logins and passwords, challenges and responses, and token  technologies.",
    audit: "Perform the following to determine if AAA authentication enable mode is enabled:  hostname#show running-config | incl aaa authentication enable  If a result does not return, the feature is not enabled",
    remediation: "Configure AAA authentication method(s) for enable authentication.  hostname(config)#aaa authentication enable default {method1} enable",
    defaultValue: "By default, fallback to the local database is disabled."
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
