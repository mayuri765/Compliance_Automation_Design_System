var metadata = {
    ruleId: "RULE ID: SV-216551r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify that Access Control Lists (ACLs) are configured  to allow or deny traffic for specific source and destination addresses as well as ports  and protocols. For example, the configuration below will allow only printer traffic into  subnet 10.1.23.0/24 and SQL traffic into subnet 10.1.24.0/24. ICMP is allowed for  troubleshooting and OSPF is the routing protocol used within the network.  interface GigabitEthernet1/1  description link to core  ip address 10.1.12.2 255.255.255.0  ip access-group FILTER_SERVER_TRAFFIC in  …  …  …  ip access-list extended FILTER_SERVER_TRAFFIC  permit tcp any 10.1.23.0 0.0.0.255 eq lpd 631 9100  permit tcp any 10.1.24.0 0.0.0.255 eq 1433 1434 4022  permit icmp any any  permit ospf any any  deny ip any any  If the router is not configured to enforce approved authorizations for controlling the flow  of information within the network based on organization-defined information flow control  policies, this is a finding."
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
