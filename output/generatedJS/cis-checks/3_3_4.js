var metadata = {
    ruleNumber: "3.3.4",
    title: ".1 Set 'neighbor password' (Automated)",
    profile: "•  Level 2",
    description: "Enable message digest5 (MD5) authentication on a TCP connection between two BGP  peers",
    rationale: "Enforcing routing authentication reduces the likelihood of routing poisoning and  unauthorized routers from joining BGP routing.",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using the 'neighbor password' for  BGP enforces these policies by restricting the type of authentication between network  devices.",
    audit: "Verify you see the appropriate neighbor password is defined:    hostname#sh run | sec router bgp",
    remediation: "Configure BGP neighbor authentication where feasible.    hostname(config)#router bgp <<em>bgp_as-number</em>>  hostname(config-router)#neighbor <<em>bgp_neighbor-ip</em> | <em>peer-group- name</em>> password <<em>password</em>>",
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
