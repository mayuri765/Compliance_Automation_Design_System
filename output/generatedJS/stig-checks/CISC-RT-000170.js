var metadata = {
    ruleId: "RULE ID: SV-216565r856184",
    severity: "SEVERITY: CAT I",
    audit: "Review the configuration to verify the no ip unreachables command has been  configured on all external interfaces as shown in the configuration example below.  interface GigabitEthernet0/1  ip address x.x.x.x 255.255.255.0  no ip unreachables  If ICMP unreachable notifications are sent from any external or null0 interface, this is a  finding.  Alternative – DODIN Backbone  Verify that the PE router is configured to rate limit ICMP unreachable messages as  shown in the example below.  ip icmp rate-limit unreachable 60000  ip icmp rate-limit unreachable DF 1000  Note: In the example above, packet-too-big message (ICMP Type 3 Code 4) can be  sent once every second, while all other destination unreachable messages can be sent  once every minute. This will avoid disrupting Path MTU Discovery for traffic traversing  the backbone while mitigating the risk of an ICMP unreachable DoS attack.  If the PE router is not configured to rate limit ICMP unreachable messages, this is a  finding.  Internal Only - General"
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

        if (line.indexOf("no ip".toLowerCase()) !== -1) {

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
