var metadata = {
    ruleId: "RULE ID: SV-216575r863237",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify that an ingress Access Control List (ACL)  applied to all external interfaces is blocking packets with Bogon source addresses.  Step 1: Verify an ACL has been configured containing the current Bogon prefixes as  shown in the example below.  ip access-list extended FILTER_PERIMETER  deny ip 0.0.0.0 0.255.255.255 any log-input  deny ip 10.0.0.0 0.255.255.255 any log-input  deny ip 100.64.0.0 0.63.255.255 any log-input  deny ip 127.0.0.0 0.255.255.255 any log-input  deny ip 169.254.0.0 0.0.255.255 any log-input  deny ip 172.16.0.0 0.15.255.255 any log-input  deny ip 192.0.0.0 0.0.0.255 any log-input  deny ip 192.0.2.0 0.0.0.255 any log-input  deny ip 192.168.0.0 0.0.255.255 any log-input  deny ip 198.18.0.0 0.1.255.255 any log-input  deny ip 198.51.100.0 0.0.0.255 any log-input  deny ip 203.0.113.0 0.0.0.255 any log-input  deny ip 224.0.0.0 31.255.255.255 any log-input  deny ip 240.0.0.0 15.255.255.255 any log-input  permit tcp any any established  permit tcp host x.12.1.9 host x.12.1.10 eq bgp  permit tcp host x.12.1.9 eq bgp host x.12.1.10  permit icmp host x.12.1.9 host x.12.1.10 echo  permit icmp host x.12.1.9 host x.12.1.10 echo-reply  …  …  …  deny ip any any log-input  Step 2: Verify that the inbound ACL applied to all external interfaces will block all traffic  from Bogon source addresses.  interface GigabitEthernet0/1  description Link to DISN  ip address x.12.1.10 255.255.255.254  ip access-group FILTER_PERIMETER in  If the router is not configured to block inbound packets with source Bogon IP address  prefixes, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip access-list".toLowerCase()) !== -1) {

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
