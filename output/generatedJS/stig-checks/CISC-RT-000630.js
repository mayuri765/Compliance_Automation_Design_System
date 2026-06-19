var metadata = {
    ruleId: "RULE ID: SV-216611r531085",
    severity: "SEVERITY: CAT I",
    audit: "Step 1: Review the design plan for deploying MPLS/L3VPN.  Step 2: Review all CE-facing interfaces and verify that the proper VRF is defined via the  \"ip vrf forwarding\" command. In the example below, COI1 is bound to interface  GigabitEthernet0/1, while COI2 is bound to GigabitEthernet0/2.  interface GigabitEthernet0/1  description link to COI1  ip vrf forwarding COI1  ip address x.1.0.1 255.255.255.0  !  interface GigabitEthernet0/2  description link to COI2  ip vrf forwarding COI2  ip address x.2.0.2 255.255.255.0  If any VRFs are not bound to the appropriate physical or logical interface, this is a  finding."
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

        if (line.indexOf("ip vrf".toLowerCase()) !== -1) {

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
