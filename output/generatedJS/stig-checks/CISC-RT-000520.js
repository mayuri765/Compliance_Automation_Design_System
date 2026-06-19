var metadata = {
    ruleId: "RULE ID: SV-216600r917414",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Verify that a prefix list has been configured containing prefixes belonging to  customers as well as the local AS as shown in the example below.  ip prefix-list CE_PREFIX_ADVERTISEMENTS seq 5 permit x.13.1.0/24 le 32  ip prefix-list CE_PREFIX_ADVERTISEMENTS seq 10 permit x.13.2.0/24 le 32  ip prefix-list CE_PREFIX_ADVERTISEMENTS seq 15 permit x.13.3.0/24 le 32  ip prefix-list CE_PREFIX_ADVERTISEMENTS seq 20 permit x.13.4.0/24 le 32  …  …  …  ip prefix-list CE_PREFIX_ADVERTISEMENTS seq 80 deny 0.0.0.0/0 ge 8  Step 2: Verify that the prefix lists has been applied to all CE peers as shown in the  example below.  router bgp 64512  no synchronization  bgp log-neighbor-changes  neighbor x.12.4.14 remote-as 64514  neighbor x.12.4.14 prefix-list CE_PREFIX_ADVERTISEMENTS out  neighbor x.12.4.16 remote-as 64516  neighbor x.12.4.16 prefix-list CE_PREFIX_ADVERTISEMENTS out  If the router is not configured to reject outbound route advertisements that do not belong  to any customers or the local AS, this is a finding.  Note: This check is NA for JRSS systems.  Internal Only - General"
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
