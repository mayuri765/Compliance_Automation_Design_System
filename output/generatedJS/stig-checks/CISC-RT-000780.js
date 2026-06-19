var metadata = {
    ruleId: "RULE ID: SV-216621r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to determine if it is configured to enforce a QoS policy to  limit the effects of packet flooding DoS attacks.  Step 1: Verify that a class map has been configured for the Scavenger class as shown  in the example below.  class-map match-all SCAVENGER  match ip dscp cs1  Step 2: Verify that the policy map includes the SCAVENGER class with low priority as  shown in the following example below.  policy-map QOS_POLICY  class CONTROL_PLANE  priority percent 10  class C2_VOICE  priority percent 10  class VOICE  priority percent 15  class VIDEO  bandwidth percent 25  class PREFERRED_DATA  bandwidth percent 25  class SCAVENGER  bandwidth percent 5  class class-default  bandwidth percent 10  Note: Traffic out of profile must be marked at the customer access layer or CE egress  edge.  If the router is not configured to enforce a QoS policy to limit the effects of packet  flooding DoS attacks, this is a finding."
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

        if (line.indexOf("ip dscp".toLowerCase()) !== -1) {

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
