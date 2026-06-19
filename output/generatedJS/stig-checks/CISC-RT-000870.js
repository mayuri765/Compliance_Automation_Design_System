var metadata = {
    ruleId: "RULE ID: SV-216630r864158",
    severity: "SEVERITY: CAT I",
    audit: "Review the configuration of the DR to verify that it is filtering IGMP or MLD report  messages, allowing hosts to only join multicast groups from sources that have been  approved.  Step 1: Verify that all host-facing interfaces are configured to filter IGMP Membership  Report messages (IGMP joins) as shown in the example below.  interface GigabitEthernet0/0  ip address 10.3.3.3 255.255.255.0  ip pim sparse-mode  ip igmp access-group IGMP_JOIN_FILTER  ip igmp version 3  Step 2: Verify that the Access Control List (ACL) denies unauthorized sources or allows  only authorized sources. The example below denies all groups from 232.8.0.0/16 range  and permits sources only from the x.0.0.0/8 network.  ip access-list extended IGMP_JOIN_FILTER  deny ip any 232.8.0.0 0.0.255.255  permit ip x.0.0.0 0.255.255.255 any  deny ip any any  Note: This requirement is only applicable to Source Specific Multicast (SSM)  implementation.  If the DR is not filtering IGMP or MLD report messages, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip  Report".toLowerCase()) !== -1) {

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
