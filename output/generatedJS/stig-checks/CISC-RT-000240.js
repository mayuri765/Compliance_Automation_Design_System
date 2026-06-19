var metadata = {
    ruleId: "RULE ID: SV-216572r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify that the inbound ACL applied to all external  interfaces is configured to allow specific ports and protocols and deny all other traffic.  Step 1: Verify that an inbound ACL is applied to all external interfaces as shown in the  example below.  interface GigabitEthernet0/2  ip address x.11.1.2 255.255.255.254  ip access-group EXTERNAL_ACL in  Step 2: Review inbound ACL to verify that it is configured to deny all other traffic that is  not explicitly allowed.  ip access-list extended EXTERNAL_ACL  permit tcp any any established  permit tcp host x.11.1.1 eq bgp host x.11.1.2  permit tcp host x.11.1.1 host x.11.1.2 eq bgp  permit icmp host x.11.1.1 host x.11.1.2 echo  permit icmp host x.11.1.1 host x.11.1.2 echo-reply  …  …  …  deny ip any any log-input  If the ACL is not configured to allow specific ports and protocols and deny all other  traffic, this is a finding. If the ACL is not configured inbound on all external interfaces,  this is a finding."
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
