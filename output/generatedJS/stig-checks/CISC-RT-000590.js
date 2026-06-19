var metadata = {
    ruleId: "RULE ID: SV-216607r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to determine if it is compliant with this requirement.  Verify that a loopback address has been configured as shown in the following example:  interface Loopback0  ip address 10.1.1.1 255.255.255.255  By default, routers will use its loopback address for LDP peering. If an address has not  be configured on the loopback interface, it will use its physical interface connecting to  the LDP peer. If the router-id command is specified that overrides this default behavior,  verify that it is a loopback interface as shown in the example below.  mpls ldp router-id Loopback0  If the router is not configured do use its loopback address for LDP peering, this is a  finding."
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
