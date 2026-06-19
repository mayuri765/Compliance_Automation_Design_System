var metadata = {
    ruleId: "RULE ID: SV-216636r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to determine if there is export policy to block local  source-active multicast advertisements.  Step 1: Verify that an outbound source-active filter is bound to each MSDP peer as  shown in the example below.  ip msdp peer 10.1.28.8 remote-as 8  ip msdp sa-filter out 10.1.28.8 list OUTBOUND_MSDP_SA_FILTER  Step 2: Review the access lists referenced by the source-active filters and verify that  MSDP source-active messages being sent to MSDP peers do not leak advertisements  that are local.  ip access-list extended OUTBOUND_MSDP_SA_FILTER  deny ip 10.0.0.0 0.255.255.255 any  permit ip any any  If the router is not configured with an export policy to filter local source-active multicast  advertisements, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip msdp".toLowerCase()) !== -1) {

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
