var metadata = {
    ruleNumber: "1.4.2",
    title: "Enable 'service password-encryption' (Automated)",
    profile: "•  Level 1",
    description: "When password encryption is enabled, the encrypted form of the passwords is  displayed when a more system:running-config command is entered.",
    rationale: "This requires passwords to be encrypted in the configuration file to prevent  unauthorized users from learning the passwords just by reading the configuration. When  not enabled, many of the device's passwords will be rendered in plain text in the  configuration file. This service ensures passwords are rendered as encrypted strings  preventing an attacker from easily determining the configured value.",
    impact: "Organizations implementing 'service password-encryption' reduce the risk of  unauthorized users learning clear text passwords to Cisco IOS configuration files.  However, the algorithm used is not designed to withstand serious analysis and should  be treated like clear-text.",
    audit: "Perform the following to determine if a user with an encrypted password is enabled:  Ensure a result that matches the command return    hostname#sh run | incl service password-encryption",
    remediation: "Enable password encryption service to protect sensitive access passwords in the device  configuration.    hostname(config)#service password-encryption",
    defaultValue: "Service password encryption is not set by default"
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

        if (line.indexOf("service password-encryption") !== -1) {

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
