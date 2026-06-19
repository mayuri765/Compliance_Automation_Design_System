var metadata = {
    ruleNumber: "1.1.2",
    title: "Enable 'aaa authentication login' (Automated)",
    profile: "•  Level 1",
    description: "Sets authentication, authorization and accounting (AAA) authentication at login.",
    rationale: "Using AAA authentication for interactive management access to the device provides  consistent, centralized control of your network. The default under AAA (local or network)  is to require users to log in using a valid user name and password. This rule applies for  both local and network AAA. Fallback mode should also be enabled to allow emergency  access to the router or switch in the event that the AAA server was unreachable, by  utilizing the LOCAL keyword after the AAA server-tag.",
    impact: "Implementing Cisco AAA is significantly disruptive as former access methods are  immediately disabled. Therefore, before implementing Cisco AAA, the organization  should carefully review and plan their authentication methods such as logins and  passwords, challenges and responses, and which token technologies will be used.",
    audit: "Perform the following to determine if AAA authentication for login is enabled:  hostname#show running-config | incl aaa authentication login  If a result does not return, the feature is not enabled.",
    remediation: "Configure AAA authentication method(s) for login authentication.  hostname(config)#aaa authentication login {default | aaa_list_name} [passwd- expiry]  [method1] [method2]",
    defaultValue: "AAA authentication at login is disabled."
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
