var metadata = {
    ruleId: "RULE ID: SV-216622r531085",
    severity: "SEVERITY: CAT I",
    audit: "Step 1: Review the network's multicast topology diagram.  Step 2: Review the router configuration to verify that only the PIM interfaces as shown  in the multicast topology diagram are enabled for PIM as shown in the example below.  interface GigabitEthernet1/1  ip address 10.1.3.3 255.255.255.0  ip pim sparse-mode  If an interface is not required to support multicast routing and it is enabled, this is a  finding.  Internal Only - General"
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
