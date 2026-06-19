var metadata = {
    ruleId: "RULE ID: SV-216606r531085",
    severity: "SEVERITY: CAT I",
    audit: "Step 1: Review the router configuration to verify that a loopback address has been  configured.  interface Loopback0  ip address 10.1.1.1 255.255.255.255  Step 2: Verify that the loopback interface is used as the source address for all iBGP  sessions.  router bgp xx  no synchronization  no bgp enforce-first-as  bgp log-neighbor-changes  redistribute static  neighbor 10.1.1.1 remote-as xx  neighbor 10.1.1.1 password xxxxxxxx  neighbor 10.1.1.1 update-source Loopback0  If the router does not use its loopback address as the source address for all iBGP  sessions, this is a finding."
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
