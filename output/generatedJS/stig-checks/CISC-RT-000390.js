var metadata = {
    ruleId: "RULE ID: SV-216587r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  The perimeter router of the managed network must be configured with an outbound  ACL on the egress interface to block all management traffic as shown in the example  below.  Step 1: Verify that all external interfaces have been configured with an outbound ACL  as shown in the example below.  interface GigabitEthernet0/2  description link to DISN  ip address x.11.1.2 255.255.255.254  ip access-group EXTERNAL_ACL_OUTBOUND out  Step 2: Verify that the outbound ACL discards management traffic as shown in the  example below.  ip access-list extended EXTERNAL_ACL_OUTBOUND  deny tcp any any eq tacacs log-input  deny tcp any any eq 22 log-input  deny udp any any eq snmp log-input  deny udp any any eq snmptrap log-input  deny udp any any eq syslog log-input  permit tcp any any eq www log-input  deny ip any any log-input  If management traffic is not blocked at the perimeter, this is a finding.  Internal Only - General"
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
