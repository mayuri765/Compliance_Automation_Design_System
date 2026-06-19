var metadata = {
    ruleId: "RULE ID: SV-216598r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to verify that it will reject routes belonging to the local  AS.  Step 1: Verify a prefix list has been configured containing prefixes belonging to the local  AS. In the example below x.13.1.0/24 is the global address space allocated to the local  AS.  ip prefix-list PREFIX_FILTER seq 5 deny 0.0.0.0/8 le 32  …  …  …  ip prefix-list PREFIX_FILTER seq 74 deny x.13.1.0/24 le 32  ip prefix-list PREFIX_FILTER seq 75 permit 0.0.0.0/0 ge 8  Step 2: Verify that the prefix list has been applied to all external BGP peers as shown in  the example below.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 prefix-list PREFIX_FILTER in  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 prefix-list PREFIX_FILTER in  If the router is not configured to reject inbound route advertisements belonging to the  local AS, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip prefix-list".toLowerCase()) !== -1) {

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
