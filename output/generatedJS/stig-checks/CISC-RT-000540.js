var metadata = {
    ruleId: "RULE ID: SV-216602r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to verify the router is configured to deny updates  received from eBGP peers that do not list their AS number as the first AS in the  AS_PATH attribute.  By default Cisco IOS enforces the first AS in the AS_PATH attribute for all route  advertisements. Review the router configuration to verify that the command no bgp  enforce-first-as is not configured.  router bgp xx  no synchronization  no bgp enforce-first-as  If the router is not configured to reject updates from peers that do not list their AS  number as the first AS in the AS_PATH attribute, this is a finding."
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

        if (line.indexOf("no bgp".toLowerCase()) !== -1) {

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
