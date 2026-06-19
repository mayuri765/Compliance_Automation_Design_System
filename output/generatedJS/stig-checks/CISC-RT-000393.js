var metadata = {
    ruleId: "RULE ID: SV-230050r856665",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to determine if it is configured to drop IPv6 packets  containing a Routing Header of type 0, 1, or 3-255.  Step 1: Verify that an inbound IPv6 ACL has been configured on the external interface.  interface gigabitethernet1/0  ipv6 address 2001::1:0:22/64  ipv6 traffic-filter FILTER_IPV6 in  Step 2: Verify that the ACL drops IPv6 packets with a Routing Header type 0, 1, or 3- 255 as shown in the example below.  ipv6 access-list FILTER_IPV6  permit ipv6 any host 2001:DB8::1:1:1234 routing-type 2  deny ipv6 any any log routing  permit ipv6 …  …  …  …  deny ipv6 any any log  Note: The example above allows routing-type 2 in the event Mobility IPv6 is deployed.  If the router is not configured to drop IPv6 packets containing a Routing Header of type  0, 1, or 3-255, this is a finding."
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

        if (line.indexOf("".toLowerCase()) !== -1) {

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
