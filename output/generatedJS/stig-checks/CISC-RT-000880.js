var metadata = {
    ruleId: "RULE ID: SV-216631r856199",
    severity: "SEVERITY: CAT I",
    audit: "Review the DR configuration to verify that it is limiting the number of mroute states via  IGMP or MLD.  Verify IGMP limits have been configured globally or on each host-facing interface via  the ip igmp limit command as shown in the example.  interface GigabitEthernet0/0  ip address 10.3.3.3 255.255.255.0  …  …  …  ip igmp limit nn  If the DR is not limiting multicast join requests via IGMP or MLD on a global or  interfaces basis, this is a finding."
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

        if (line.indexOf("ip igmp".toLowerCase()) !== -1) {

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
