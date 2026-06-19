var metadata = {
    ruleId: "RULE ID: SV-216991r856208",
    severity: "SEVERITY: CAT I",
    audit: "Review the BGP configuration to verify that TTL security has been configured for each  external neighbor as shown in the example below.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 password xxxxxxxx  neighbor x.1.1.9 ttl-security hops 1  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 password xxxxxxxx  neighbor x.2.1.7 ttl-security hops 1  If the router is not configured to use GTSM for all Exterior Border Gateway Protocol  peering sessions, this is a finding."
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

        if (line.indexOf("no synchronization".toLowerCase()) !== -1) {

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
