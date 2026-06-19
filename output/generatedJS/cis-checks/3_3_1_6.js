var metadata = {
    ruleNumber: "3.3.1.6",
    title: "Set 'authentication key-chain' (Automated)",
    profile: "•  Level 2",
    description: "Configure the EIGRP address family key chain.",
    rationale: "This is part of the EIGRP authentication configuration",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using the address-family 'key  chain' for EIGRP enforces these policies by restricting the exchanges between  predefined network devices.",
    audit: "Verify the appropriate key chain is set    hostname#sh run | sec router eigrp",
    remediation: "Configure the EIGRP address family key chain.    hostname(config)#router eigrp <virtual-instance-name>  hostname(config-router)#address-family ipv4 autonomous-system {eigrp_as- number}  hostname(config-router-af)#af-interface {interface-name}  hostname(config-router-af-interface)#authentication key-chain {eigrp_key- chain_name}",
    defaultValue: "No key chains are specified for EIGRP"
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
