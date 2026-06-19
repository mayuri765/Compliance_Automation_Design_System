var metadata = {
    ruleNumber: "3.3.1.3",
    title: "Set 'key-string' (Automated)",
    profile: "•  Level 2",
    description: "Configure the authentication string for a key.",
    rationale: "This is part of the routing authentication setup",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using 'key strings' for key chains  for routing protocols enforces these policies.",
    audit: "Verify the appropriate key chain is defined    hostname#sh run | sec key chain",
    remediation: "Configure the key string.    hostname(config-keychain-key)#key-string <<em>key-string</em>>",
    defaultValue: "Not set"
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
