var metadata = {
    ruleId: "RULE ID: SV-216599r917412",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to verify that there are ACLs defined to only accept  routes for prefixes that belong to specific customers.  Step 1: Verify prefix list has been configured for each customer containing prefixes  belonging to each customer as shown in the example below.  ip prefix-list PREFIX_FILTER_CUST1 seq 5 permit x.13.1.0/24 le 32  ip prefix-list PREFIX_FILTER_CUST1 seq 10 deny 0.0.0.0/0 ge 8  ip prefix-list PREFIX_FILTER_CUST2 seq 5 permit x.13.2.0/24 le 32  ip prefix-list PREFIX_FILTER_CUST2 seq 10 deny 0.0.0.0/0 ge 8  Step 2: Verify that the prefix lists has been applied to all to the applicable CE peers as  shown in the example below.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.12.4.14 remote-as 64514  neighbor x.12.4.14 prefix-list FILTER_PREFIXES_CUST1 in  neighbor x.12.4.16 remote-as 64516  neighbor x.12.4.16 prefix-list FILTER_PREFIXES_CUST2 in  Note: Routes to PE-CE links within a VPN are needed for troubleshooting end-to-end  connectivity across the MPLS/IP backbone. Hence, these prefixes are an exception to  this requirement.  NOTE: This check is NA for JRSS systems.  If the router is not configured to reject inbound route advertisements from each CE  router for prefixes that are not allocated to that customer, this is a finding.  Internal Only - General"
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
