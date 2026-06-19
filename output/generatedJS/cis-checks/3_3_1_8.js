var metadata = {
    ruleNumber: "3.3.1.8",
    title: "Set 'ip authentication key-chain eigrp' (Automated)",
    profile: "•  Level 2",
    description: "Specify the type of authentication used in Enhanced Interior Gateway Routing Protocol  (EIGRP) packets per interface.",
    rationale: "Configuring EIGRP authentication key-chain number and name to restrict packet  exchanges between network devices.",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Configuring the interface with 'ip  authentication key chain' for EIGRP by name and number enforces these policies by  restricting the exchanges between network devices.",
    audit: "Verify the appropriate key chain is set on the appropriate interface(s)  hostname#sh ip eigrp int  hostname#sh run int {<em>interface_name</em>} | incl key-chain",
    remediation: "Configure the interface with the EIGRP key chain.    hostname(config)#interface {<em>interface_name</em>}  hostname(config-if)#ip authentication key-chain eigrp {<em>eigrp_as- number</em>} {<em>eigrp_key-chain_name</em>}",
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

        if (line.indexOf("ip eigrp") !== -1) {

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
