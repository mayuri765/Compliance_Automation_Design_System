var metadata = {
    ruleId: "RULE ID: SV-216584r856189",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Verify LLDP is not enabled globally via the command  lldp run  By default LLDP is not enabled globally. If LLDP is enabled, proceed to step 2.  Step 2: Verify LLDP is not enabled on any external interface as shown in the example  below.  interface GigabitEthernet0/1  ip address x.1.12.1 255.255.255.252  no lldp transmit  Note: LLDP is enabled by default on all interfaces once it is enabled globally; hence the  command lldp transmit will not be visible on the interface configuration.  If LLDP transmit is enabled on any external interface, this is a finding."
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
