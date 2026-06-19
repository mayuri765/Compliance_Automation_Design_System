var metadata = {
    ruleId: "RULE ID: SV-216605r856193",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to determine if it is compliant with this requirement.  Step 1: Verify that a route filter has been configured to reject prefixes longer than /24, or  the least significant prefixes issued to the customers as shown in the example below:  ip prefix-list FILTER_PREFIX_LENGTH seq 5 permit 0.0.0.0/0 ge 8 le 24  ip prefix-list FILTER_PREFIX_LENGTH seq 10 deny 0.0.0.0/0 le 32  Step 2: Verify that prefix filtering has been applied to each eBGP peer as shown in the  example:  router bgp xx  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 prefix-list FILTER_PREFIX_LENGTH in  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 prefix-list FILTER_PREFIX_LENGTH in  If the router is not configured to limit the prefix size on any inbound route advertisement  to /24, or the least significant prefixes issued to the customer, this is a finding.  Internal Only - General"
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
