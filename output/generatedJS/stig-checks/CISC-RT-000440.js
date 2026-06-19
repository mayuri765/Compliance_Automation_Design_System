var metadata = {
    ruleId: "RULE ID: SV-216592r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone. It is only applicable if the  OOBM gateway router is not a dedicated device to the OOBM backbone.  Verify that traffic destined to itself is only sourced by the OOBM or the NOC. In the  example below, the OOBM backbone network is 10.11.1.0/24, the NOC address spaces  is 10.12.1.0/24, and the OOBM LAN address space at remote site connecting to the  managed network is 10.13.1.0/24.  Step 1: Note the inbound ACL applied to the OOBM interfaces.  interface GigabitEthernet0/2  description OOB link to NOC  ip address 10.11.1.8 255.255.255.0  ip access-group TRAFFIC_FROM_NOC in  !  interface GigabitEthernet0/3  description link to OOBM LAN access switch  ip address 10.13.1.1 255.255.255.0  ip access-group TRAFFIC_TO_NOC in  Step 2: Review the inbound ACL bound to any OOB interface connecting to the OOBM  backbone and verify traffic destined to itself is only from the OOBM or NOC address  space.  ip access-list extended TRAFFIC_FROM_NOC  permit ip 10.11.1.0 0.255.255.255 host 10.11.1.8  permit ip 10.12.1.0 0.255.255.255 host 10.11.1.8  permit ip 10.11.1.0 0.255.255.255 host 10.13.1.1  permit ip 10.12.1.0 0.255.255.255 host 10.13.1.1  deny ip any host 10.11.1.8 log-input  deny ip any host 10.13.1.1 log-input  permit ip 10.11.1.0 0.0.0.255 10.13.1.0 0.0.0.255  permit ip 10.12.1.0 0.0.0.255 10.13.1.0 0.0.0.255  deny ip any any log-input  Step 3: Review the inbound ACL bound to any OOBM LAN interfaces and verify traffic  destined to itself is from the OOBM LAN address space.  ip access-list extended TRAFFIC_TO_NOC  permit ip 10.13.1.0 0.255.255.255 host 10.13.1.1  permit ip 10.13.1.0 0.255.255.255 host 10.11.1.8  deny ip any host 10.13.1.1 log-input  deny ip any host 10.11.1.8 log-input  permit ip 10.13.1.0 0.255.255.255 10.11.1.0 0.0.0.255  permit ip 10.13.1.0 0.255.255.255 10.12.1.0 0.0.0.255  deny ip any any log-input  If the router does not block any traffic destined to itself that is not sourced from the  OOBM network or the NOC, this is a finding.  Internal Only - General"
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
