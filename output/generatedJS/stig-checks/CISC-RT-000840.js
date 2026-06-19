var metadata = {
    ruleId: "RULE ID: SV-216627r531085",
    severity: "SEVERITY: CAT I",
    audit: "Verify that the RP router is configured to filter PIM join messages for any undesirable  multicast groups. In the example below, groups from 239.8.0.0/16 are not allowed.  ip pim rp-address 10.2.2.2  ip pim accept-rp 10.2.2.2 FILTER_PIM_JOINS  …  …  …  ip access-list standard FILTER_PIM_JOINS  deny 239.8.0.0 0.0.255.255  permit any  !  If the RP is not configured to filter join messages received from the DR for any  undesirable multicast groups, this is a finding."
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

        if (line.indexOf("ip pim".toLowerCase()) !== -1) {

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
