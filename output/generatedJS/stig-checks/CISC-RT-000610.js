var metadata = {
    ruleId: "RULE ID: SV-216609r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to determine RSVP messages are rate limited.  Step 1: Determine if MPLS TE is enabled globally and at least one interface as shown in  the example below.  mpls traffic-eng tunnels  …  …  …  interface GigabitEthernet0/2  ip address x.x.x.x 255.255.255.0  mpls traffic-eng tunnels  mpls ip  Step 2: If MPLS TE is enabled, verify that message pacing is enabled.  ip rsvp signaling rate-limit period 30 burst 9 maxsize 2100 limit 50  Note: The command ip rsvp msg-pacing has been deprecated by the command ip rsvp  signaling rate-limit.  If the router with RSVP-TE enabled does not rate limit RSVP messages based on the  link speed and input queue size of adjacent core routers, this is a finding."
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

            pass = (actual != null && actual >= 1);
        }
    }

    // Handle NOT EXISTS logic
    if (">=" === "not_exists") {

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
