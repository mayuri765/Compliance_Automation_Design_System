var metadata = {
    ruleId: "RULE ID: SV-216612r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the design plan for MPLS/L3VPN to determine what RTs have been assigned  for each VRF. Review the router configuration and verify that the correct RT is  configured for each VRF. In the example below, route target 13:13 has been configured  for customer 1.  ip vrf CUST1  rd 13:13  route-target export 13:13  route-target import 13:13  If there are VRFs configured with the wrong RT, this is a finding."
};

function check(config) {

    if (config == null) {
        return { status: "FAIL", line: 0 };
    }

    var lines = String(config).split("\n");
    var matched = false;
    var foundLine = 0;
    var pass = true;

    for (var i = 0; i < lines.length; i++) {

        var raw = lines[i];
        var line = String(raw).toLowerCase();

        if (line.indexOf("ip vrf".toLowerCase()) !== -1) {

            matched = true;
            foundLine = i + 1;

            var numberMatch = line.match(/\d+/);
            var actual = numberMatch ? parseInt(numberMatch[0]) : null;

            pass = true;
        }
    }

    // Handle NOT EXISTS logic
    if ("exists" === "not_exists") {

        if (matched) {
            return { status: "FAIL", line: foundLine };
        } else {
            return { status: "PASS", line: 0 };
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
