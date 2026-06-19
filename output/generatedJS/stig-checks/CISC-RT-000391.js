var metadata = {
    ruleId: "RULE ID: SV-230044r533005",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify that Router Advertisements are suppressed on  all external IPv6-enabled interfaces as shown in the example below.  interface gigabitethernet1/0  ipv6 address 2001::1:0:22/64  ipv6 nd ra suppress  If the router is not configured to suppress Router Advertisements on all external IPv6- enabled interfaces, this is a finding."
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
