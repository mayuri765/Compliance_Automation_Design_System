var metadata = {
    ruleId: "RULE ID: SV-216574r856187",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to determine if the router allows only incoming  communications from authorized sources to be routed to authorized destinations. The  hypothetical example below allows inbound NTP from server x.1.12.9 only to host  x.12.1.21.  ip access-list extended FILTER_PERIMETER  permit tcp any any established  …  …  …  permit udp host x.12.1.9 host x.12.1.21 eq ntp  deny ip any any log-input  If the router does not restrict incoming communications to allow only authorized sources  and destinations, this is a finding."
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

        if (line.indexOf("ip access-list".toLowerCase()) !== -1) {

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
