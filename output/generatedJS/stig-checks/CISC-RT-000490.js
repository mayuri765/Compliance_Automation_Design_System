var metadata = {
    ruleId: "RULE ID: SV-216597r877976",
    severity: "SEVERITY: CAT I",
    audit: "This check is Not Applicable for JRSS internal EBGP use.  Review the router configuration to verify that it will reject BGP routes for any Bogon  prefixes.  Step 1: Verify a prefix list has been configured containing the current Bogon prefixes as  shown in the example below.  ip prefix-list PREFIX_FILTER seq 5 deny 0.0.0.0/8 le 32  ip prefix-list PREFIX_FILTER seq 10 deny 10.0.0.0/8 le 32  ip prefix-list PREFIX_FILTER seq 15 deny 100.64.0.0/10 le 32  ip prefix-list PREFIX_FILTER seq 20 deny 127.0.0.0/8 le 32  ip prefix-list PREFIX_FILTER seq 25 deny 169.254.0.0/16 le 32  ip prefix-list PREFIX_FILTER seq 30 deny 172.16.0.0/12 le 32  ip prefix-list PREFIX_FILTER seq 35 deny 192.0.2.0/24 le 32  ip prefix-list PREFIX_FILTER seq 40 deny 192.88.99.0/24 le 32  ip prefix-list PREFIX_FILTER seq 45 deny 192.168.0.0/16 le 32  ip prefix-list PREFIX_FILTER seq 50 deny 198.18.0.0/15 le 32  ip prefix-list PREFIX_FILTER seq 55 deny 198.51.100.0/24 le 32  ip prefix-list PREFIX_FILTER seq 60 deny 203.0.113.0/24 le 32  ip prefix-list PREFIX_FILTER seq 65 deny 224.0.0.0/4 le 32  ip prefix-list PREFIX_FILTER seq 70 deny 240.0.0.0/4 le 32  ip prefix-list PREFIX_FILTER seq 75 permit 0.0.0.0/0 ge 8  Step 2: Verify that the prefix list has been applied to all external BGP peers as shown in  the example below.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 prefix-list PREFIX_FILTER in  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 prefix-list PREFIX_FILTER in  Route Map Alternative  Verify that the route map applied to the external neighbors references the configured  Bogon prefix list shown above.  router bgp xx  no synchronization  bgp log-neighbor-changes  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 route-map FILTER_PREFIX_MAP  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 route-map FILTER_PREFIX_MAP  …  route-map FILTER_PREFIX_MAP permit 10  match ip address prefix-list PREFIX_FILTER  If the router is not configured to reject inbound route advertisements for any Bogon  prefixes, this is a finding.  Internal Only - General"
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
