var metadata = {
    ruleId: "RULE ID: SV-216601r531085",
    severity: "SEVERITY: CAT I",
    audit: "Step 1: Verify that a prefix list has been configured containing prefixes belonging to the  IP core.  ip prefix-list FILTER_CORE_PREFIXES seq 5 deny x.1.1.0/24 le 32  ip prefix-list FILTER _CORE_PREFIXES seq 10 deny x.1.2.0/24 le 32  ip prefix-list FILTER _CORE_PREFIXES seq 15 permit 0.0.0.0/0 ge 8  Step 2: Verify that the prefix lists has been applied to all external BGP peers as shown  in the example below.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.1.4.12 remote-as yy  neighbor x.1.4.12 prefix-list FILTER _CORE_PREFIXES out  If the router is not configured to reject outbound route advertisements for prefixes  belonging to the IP core, this is a finding."
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

        if (line.indexOf("IP core.".toLowerCase()) !== -1) {

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
