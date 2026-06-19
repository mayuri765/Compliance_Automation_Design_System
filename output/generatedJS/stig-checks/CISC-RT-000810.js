var metadata = {
    ruleId: "RULE ID: SV-216624r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration and verify that admin-scope multicast traffic is blocked  at the external edge as shown in the example below.  interface GigabitEthernet1/2  ip address x.1.12.2 255.255.255.252  ip pim sparse-mode  ip multicast boundary MULTICAST_SCOPE  …  …  …  ip access-list standard MULTICAST_SCOPE  deny 239.0.0.0 0.255.255.255  permit any  If the router is not configured to establish boundaries for administratively scoped  multicast traffic, this is a finding.  Internal Only - General"
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
