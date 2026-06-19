var metadata = {
    ruleId: "RULE ID: SV-216573r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to verify that ACLs are configured to allow or deny traffic  for specific source and destination addresses as well as ports and protocols. In the  example below, the router is peering BGP with DISN. ICMP echo and echo-reply  packets are allowed for troubleshooting connectivity. WWW traffic is permitted inbound  to the NIPRNet host-facing web server (x.12.1.22).  interface GigabitEthernet0/1  description Link to DISN  ip address x.12.1.10 255.255.255.0  ip access-group FILTER_PERIMETER in  …  …  …  ip access-list extended FILTER_PERIMETER  permit tcp any any established  permit tcp host x.12.1.9 host x.12.1.10 eq bgp  permit tcp host x.12.1.9 eq bgp host x.12.1.10  permit icmp host x.12.1.9 host x.12.1.10 echo  permit icmp host x.12.1.9 host x.12.1.10 echo-reply  permit tcp any host x.12.1.22 eq www  deny ip any any log-input  If the router is not configured to enforce approved authorizations for controlling the flow  of information between interconnected networks, this is a finding.  Internal Only - General"
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
