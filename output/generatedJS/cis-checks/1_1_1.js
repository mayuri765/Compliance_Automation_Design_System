var metadata = {
    ruleNumber: "1.1.1",
    title: "Enable 'aaa new-model' (Automated)",
    profile: "•  Level 1",
    description: "This command enables the AAA access control system.",
    rationale: "Authentication, authorization and accounting (AAA) services provide an authoritative  source for managing and monitoring access for devices. Centralizing control improves  consistency of access control, the services that may be accessed once authenticated  and accountability by tracking services accessed. Additionally, centralizing access  control simplifies and reduces administrative costs of account provisioning and de- provisioning, especially when managing a large number of devices.",
    impact: "Implementing Cisco AAA is significantly disruptive as former access methods are  immediately disabled. Therefore, before implementing Cisco AAA, the organization  should carefully review and plan their authentication criteria (logins & passwords,  challenges & responses, and token technologies), authorization methods, and  accounting requirements.",
    audit: "Perform the following to determine if AAA services are enabled:   hostname#show running-config | inc aaa new-model  If the result includes a \"no\", the feature is not enabled.",
    remediation: "Globally enable authentication, authorization and accounting (AAA) using the new- model command.  hostname(config)#aaa new-model",
    defaultValue: "AAA is not enabled."
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
