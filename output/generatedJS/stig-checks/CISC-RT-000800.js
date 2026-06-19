var metadata = {
    ruleId: "RULE ID: SV-216623r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Verify all interfaces enabled for PIM have a neighbor ACL bound to the interface  as shown in the example below.  interface GigabitEthernet1/1  ip address 10.1.2.2 255.255.255.0  ip pim neighbor-filter PIM_NEIGHBORS  ip pim sparse-mode  Step 2: Review the configured ACL for filtering PIM neighbors as shown in the example  below.  ip access-list standard PIM_NEIGHBORS  permit 10.1.2.6  If PIM neighbor ACLs are not bound to all interfaces that have PIM enabled, this is a  finding.  Internal Only - General"
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
