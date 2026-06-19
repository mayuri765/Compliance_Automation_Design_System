var metadata = {
    ruleNumber: "3.3.3.4",
    title: "Set 'ip rip authentication key-chain' (Automated)",
    profile: "•  Level 2",
    description: "Enable authentication for Routing Information Protocol (RIP) Version 2 packets and to  specify the set of keys that can be used on an interface.",
    rationale: "This is part of the RIPv2 authentication setup",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Configuring the interface with 'ip  rip authentication key-chain' by name enforces these policies by restricting the  exchanges between network devices.",
    audit: "Verify the appropriate key chain and mode are set on the appropriate interface(s)    hostname#sh run int {<em>interface_name</em>}",
    remediation: "Configure the Interface with the RIPv2 key chain.    hostname(config)#interface {<em>interface_name</em>}  hostname(config-if)#ip rip authentication key-chain {<em>rip_key- chain_name</em>}",
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
