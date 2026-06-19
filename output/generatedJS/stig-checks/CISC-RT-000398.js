var metadata = {
    ruleId: "RULE ID: SV-230158r856675",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration and determine if filters are bound to the applicable  interfaces to drop all inbound IPv6 packets containing an undefined option type value  regardless of whether they appear in a Hop-by-Hop or Destination Option header.  Undefined values are 0x02, 0x03, 0x06, 0x9 – 0xE, 0x10 – 0x22, 0x24, 0x25, 0x27 –  0x2F, and 0x31 – 0xFF.  Step 1: Verify that an inbound IPv6 ACL has been configured on the external interface.  interface gigabitethernet1/0  ipv6 address 2001::1:0:22/64  ipv6 traffic-filter FILTER_IPV6 in  Step 2: Verify that the ACL drops IPv6 packets containing a Hop-by-Hop or Destination  Option extension header with an undefined option type as shown in the example below.  ipv6 access-list FILTER_IPV6  deny any any dest-option-type 2  deny any any dest-option-type 3  deny any any dest-option-type 6  deny any any dest-option-type 9  deny any any dest-option-type 10  deny any any dest-option-type 11  deny any any dest-option-type 12  deny any any dest-option-type 13  deny any any dest-option-type 14  deny any any dest-option-type 16  …  deny any any dest-option-type 34  deny any any dest-option-type 36  deny any any dest-option-type 37  deny any any dest-option-type 39  …  deny any any dest-option-type 47  deny any any dest-option-type 49  …  deny any any dest-option-type 255  permit …  …  …  …  deny ipv6 any any log  Note: Because hop-by-hop and destination options have the same exact header format,  they can be combined under the dest-option-type keyword. Since Hop-by-Hop and  Destination Option headers have non-overlapping types, you can use dest-option-type  to match either.  If the router is not configured to drop IPv6 packets containing a Hop-by-Hop or  Destination Option extension header with an undefined option type, this is a finding.  Internal Only - General"
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
