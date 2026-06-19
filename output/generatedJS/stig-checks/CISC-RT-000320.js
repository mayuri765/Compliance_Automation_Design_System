var metadata = {
    ruleId: "RULE ID: SV-216580r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify that the ingress ACL is in accordance with DoD  8551.1.  Step 1: Verify that an inbound ACL is configured on all external interfaces.  interface GigabitEthernet0/2  ip address x.11.1.2 255.255.255.254  ip access-group EXTERNAL_ACL_INBOUND in  Step 2. Review the inbound ACL to verify that it is filtering traffic in accordance with  DoD 8551.1.  ip access-list extended EXTERNAL_ACL_INBOUND  permit tcp any any established  permit tcp host x.11.1.1 eq bgp host x.11.1.2  permit tcp host x.11.1.1 host x.11.1.2 eq bgp  permit icmp host x.11.1.1 host x.11.1.2 echo  permit icmp host x.11.1.1 host x.11.1.2 echo-reply  …  … < must be in accordance with DoD Instruction 8551.1>  …  deny ip any any log-input  If the router does not filter traffic in accordance with the guidelines contained in DoD  8551.1, this is a finding."
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
