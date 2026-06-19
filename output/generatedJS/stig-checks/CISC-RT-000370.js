var metadata = {
    ruleId: "RULE ID: SV-216585r856190",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Verify CDP is not enabled globally via the command no cdp run  By default CDP is enabled globally; hence, the command cdp run will not be shown in  the configuration. If CDP is enabled, proceed to step 2.  Step 2: Verify CDP is not enabled on any external interface as shown in the example  below.  interface GigabitEthernet0/1  ip address x.1.23.2 255.255.255.252  no cdp enable  Note: By default CDP is enabled on all interfaces if CDP is enabled globally.  If CDP is enabled on any external interface, this is a finding."
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

        if (line.indexOf("no cdp".toLowerCase()) !== -1) {

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
