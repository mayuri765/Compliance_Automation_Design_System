var metadata = {
    ruleId: "RULE ID: SV-216616r531085",
    severity: "SEVERITY: CAT I",
    audit: "Step 1: Review the router configuration to verify that an ingress ACL is applied to all  external or CE-facing interfaces.  interface GigabitEthernet0/2  ip address x.1.12.2 255.255.255.252  ip access-group BLOCK_TO_CORE in  Step 2: Verify that the ingress ACL discards and logs packets destined to the IP core  address space.  ip access-list extended BLOCK_TO_CORE  deny ip any 10.1.x.0 0.0.255.255 log-input  permit ip any any  !  If the PE router is not configured to block any traffic with a destination address assigned  to the IP core infrastructure, this is a finding.  Note: Internet Control Message Protocol (ICMP) echo requests and traceroutes will be  allowed to the edge from external adjacent neighbors.  Internal Only - General"
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

        if (line.indexOf("ip address".toLowerCase()) !== -1) {

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
