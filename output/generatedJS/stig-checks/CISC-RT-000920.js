var metadata = {
    ruleId: "RULE ID: SV-216635r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration to determine if there is import policy to block source- active multicast advertisements for any undesirable multicast groups, as well as any (S,  G) states with undesirable source addresses.  Step 1: Verify that an inbound source-active filter is bound to each MSDP peer.  ip msdp peer x.1.28.2 remote-as 2  ip msdp sa-filter in x.1.28.2 list INBOUND_MSDP_SA_FILTER  Step 2: Review the access lists referenced by the source-active filter to verify that  undesirable multicast groups, auto-RP, single source multicast (SSM) groups, and  advertisements from undesirable sources are blocked.  ip access-list extended INBOUND_MSDP_SA_FILTER  deny ip any host 224.0.1.3  deny ip any host 224.0.1.24  deny ip any host 224.0.1.22  deny ip any host 224.0.1.2  deny ip any host 224.0.1.35  deny ip any host 224.0.1.60  deny ip any host 224.0.1.39  deny ip any host 224.0.1.40  deny ip any 232.0.0.0 0.255.255.255  deny ip any 239.0.0.0 0.255.255.255  deny ip 10.0.0.0 0.255.255.255 any  deny ip 127.0.0.0 0.255.255.255 any  deny ip 172.16.0.0 0.15.255.255 any  deny ip 192.168.0.0 0.0.255.255 any  permit ip any any  If the router is not configured with an import policy to filter undesirable SA multicast  advertisements, this is a finding.  Internal Only - General"
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
