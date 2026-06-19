var metadata = {
    ruleNumber: "3.3.1.1",
    title: "Set 'key chain' (Automated)",
    profile: "•  Level 2",
    description: "Define an authentication key chain to enable authentication for routing protocols. A key  chain must have at least one key and can have up to 2,147,483,647 keys.  NOTE: Only DRP Agent, EIGRP, and RIPv2 use key chains.",
    rationale: "Routing protocols such as DRP Agent, EIGRP, and RIPv2 use key chains for  authentication.",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using 'key chains' for routing  protocols enforces these policies.",
    audit: "Verify the appropriate key chain is defined    hostname#sh run | sec key chain",
    remediation: "Establish the key chain.    hostname(config)#key chain {<em>key-chain_name</em>}",
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
