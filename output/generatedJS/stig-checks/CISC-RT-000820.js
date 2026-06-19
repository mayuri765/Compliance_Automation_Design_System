var metadata = {
    ruleId: "RULE ID: SV-216625r864156",
    severity: "SEVERITY: CAT I",
    audit: "The Cisco router does not have a mechanism to limit the multicast forwarding cache.  However, the risk associated with this requirement can be fully mitigated by configuring  the router to:  1. Filter PIM register messages.  2. Rate limiting the number of PIM register messages.  3. Accept MSDP packets only from known MSDP peers.  Internal Only - General  Step 1: Verify that the RP router is configured to filter PIM register messages for any  undesirable multicast groups and sources. The example below will deny any multicast  streams for groups 239.5.0.0/16 and allow from only sources 10.1.2.6 and 10.1.2.7.  ip pim rp-address 10.1.12.3  ip pim accept-register list PIM_REGISTER_FILTER  …  …  …  ip access-list extended PIM_REGISTER_FILTER  deny ip any 239.5.0.0 0.0.255.255  permit ip host 10.1.2.6 any  permit ip host 10.1.2.7 any  deny ip any any  Step 2: Verify that the router is configured to rate limiting the number of PIM register  messages as shown in the example below.  ip pim rp-address 10.2.2.2  ip pim register-rate-limit nn  Step 3: Review the router configuration to determine if there is a receive path or  interface filter to only accept MSDP packets from known MSDP peers as shown in the  example below.  Step 3a: Verify that interfaces used for MSDP peering have an inbound ACL as shown  in the example.  interface GigabitEthernet1/1  ip address x.1.28.8 255.255.255.0  ip access-group EXTERNAL_ACL_INBOUND in  ip pim sparse-mode  Step 3b: Verify that the ACL restricts MSDP peering to only known sources.  ip access-list extended EXTERNAL_ACL_INBOUND  permit tcp any any established  permit tcp host x.1.28.2 host x.1.28.8 eq 639  deny tcp any host x.1.28.8 eq 639 log  permit tcp host x.1.28.2 host 10.1.28.8 eq bgp  permit tcp host x.1.28.2 eq bgp host x.1.28.8  permit pim host x.1.28.2 pim host x.1.28.8  …  …  …  deny ip any any log  Note: MSDP connections is via TCP port 639  If the RP router is not configured to filter PIM register messages, rate limiting the  number of PIM register messages, and accept MSDP packets only from known MSDP  peers, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip pim".toLowerCase()) !== -1) {

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
