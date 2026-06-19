var metadata = {
    ruleId: "RULE ID: SV-216989r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify uRPF or an egress ACL has been configured  on all internal interfaces to restrict the router from accepting outbound IP packets that  contain an illegitimate address in the source address field.  uRPF example  interface GigabitEthernet0/1  description downstream link to LAN  ip address 10.1.25.5 255.255.255.0  ip verify unicast source reachable-via rx  Egress ACL example  interface GigabitEthernet0/1  description downstream link to LAN  ip address 10.1.25.5 255.255.255.0  ip access-group EGRESS_FILTER in  …  …  …  ip access-list extended EGRESS_FILTER  permit udp 10.1.15.0 0.0.0.255 any eq domain  permit tcp 10.1.15.0 0.0.0.255 any eq ftp  permit tcp 10.1.15.0 0.0.0.255 any eq ftp-data  permit tcp 10.1.15.0 0.0.0.255 any eq www  permit icmp 10.1.15.0 0.0.0.255 any  permit icmp 10.1.15.0 0.0.0.255 any echo  deny ip any any  If uRPF or an egress ACL to restrict the router from accepting outbound IP packets that  contain an illegitimate address in the source address field has not been configured on  all internal interfaces in an enclave, this is a finding."
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

        if (line.indexOf("IP packets".toLowerCase()) !== -1) {

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
