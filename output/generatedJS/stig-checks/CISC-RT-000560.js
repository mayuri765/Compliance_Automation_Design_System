var metadata = {
    ruleId: "RULE ID: SV-216604r856192",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to verify that the number of received prefixes from each  eBGP neighbor is controlled.  router bgp xx  neighbor x.1.1.9 remote-as yy  neighbor x.1.1.9 maximum-prefix nnnnnnn  neighbor x.2.1.7 remote-as zz  neighbor x.2.1.7 maximum-prefix nnnnnnn  If the router is not configured to control the number of prefixes received from each peer  to protect against route table flooding and prefix de-aggregation attacks, this is a  finding."
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
