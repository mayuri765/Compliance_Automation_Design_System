var metadata = {
    ruleId: "RULE ID: SV-216615r531085",
    severity: "SEVERITY: CAT I",
    audit: "Verify that the correct and unique VCID has been configured for the appropriate  attachment circuit. In the example below GigabitEthernet0/1 is the CE-facing interface  that is configured for VPWS with the VCID of 55.  interface GigabitEthernet0/1  xconnect x.2.2.12 55 encapsulation mpls  If the correct VC ID has not been configured on both routers, this is a finding."
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
