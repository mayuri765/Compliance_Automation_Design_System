var metadata = {
    ruleId: "RULE ID: SV-216614r864155",
    severity: "SEVERITY: CAT I",
    audit: "The Cisco router is not compliant with this requirement; hence, it is a finding. However,  the severity level can be mitigated to a category 3 if the router is configured to  authenticate targeted LDP sessions using MD5 as shown in the configuration example  below.  mpls ldp neighbor 10.1.1.2 password xxxxxxx  mpls label protocol ldp  If the router is not configured to authenticate targeted LDP sessions using MD5, the  finding will remain as a category 2."
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
