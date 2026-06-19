var metadata = {
    ruleId: "RULE ID: SV-230155r856673",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration and determine if filters are bound to the applicable  interfaces to drop IPv6 packets containing a Destination Option header with option type  value of 0xC3 (NSAP address).  Step 1: Verify that an inbound IPv6 ACL has been configured on the external interface.  interface gigabitethernet1/0  ipv6 address 2001::1:0:22/64  ipv6 traffic-filter FILTER_IPV6 in  Step 2: Verify that the ACL drops IPv6 packets containing the NSAP address option  within Destination Option header as shown in the example below.  ipv6 access-list FILTER_IPV6  deny 60 any any dest-option-type 195 log  permit ipv6 …  …  …  …  deny ipv6 any any log  If the router is not configured to drop IPv6 packets containing the NSAP address option  within Destination Option header, this is a finding.  Internal Only - General"
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
