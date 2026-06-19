var metadata = {
    ruleNumber: "2.1.8",
    title: "Set 'no service pad' (Automated)",
    profile: "•  Level 1",
    description: "Disable X.25 Packet Assembler/Disassembler (PAD) service.",
    rationale: "If the PAD service is not necessary, disable the service to prevent intruders from  accessing the X.25 PAD command set on the router.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting unnecessary services such as the 'PAD' service.",
    audit: "Perform the following to determine if the feature is disabled:  Verify no result returns    hostname#show run | incl service pad",
    remediation: "Disable the PAD service.    hostname(config)#no service pad",
    defaultValue: "Enabled by default."
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

        if (line.indexOf("no result") !== -1) {

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
