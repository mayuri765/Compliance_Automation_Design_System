var metadata = {
    ruleId: "RULE ID: SV-216626r531085",
    severity: "SEVERITY: CAT I",
    audit: "Verify that the RP router is configured to filter PIM register messages. The example  below will deny any multicast streams for groups 239.5.0.0/16 and allow from only  sources 10.1.2.6 and 10.1.2.7.  ip pim rp-address 10.1.12.3  ip pim accept-register list PIM_REGISTER_FILTER  …  …  …  ip access-list extended PIM_REGISTER_FILTER  deny ip any 239.5.0.0 0.0.255.255  permit ip host 10.1.2.6 any  permit ip host 10.1.2.7 any  deny ip any any  If the RP router peering with PIM-SM routers is not configured with a policy to block  registration messages for any undesirable multicast groups and sources, this is a  finding.  Internal Only - General"
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
