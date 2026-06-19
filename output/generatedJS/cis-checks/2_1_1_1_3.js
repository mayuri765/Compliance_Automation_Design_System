var metadata = {
    ruleNumber: "2.1.1.1.3",
    title: "Set 'modulus' to greater than or equal to 2048 for 'crypto",
    profile: "•  Level 1",
    description: "Use this command to generate RSA key pairs for your Cisco device.  RSA keys are generated in pairs--one public RSA key and one private RSA key.",
    rationale: "An RSA key pair is a prerequisite for setting up SSH and should be at least 2048 bits.  NOTE: IOS does NOT display the modulus bit value in the Audit Procedure.",
    impact: "Organizations should plan and implement enterprise network cryptography and  generate an appropriate RSA key pairs, such as 'modulus', greater than or equal to  2048.",
    audit: "Perform the following to determine if the RSA key pair is configured:     hostname#sh crypto key mypubkey rsa",
    remediation: "Generate an RSA key pair for the router.    hostname(config)#crypto key generate rsa general-keys modulus <em>2048</em>",
    defaultValue: "RSA key pairs do not exist."
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
