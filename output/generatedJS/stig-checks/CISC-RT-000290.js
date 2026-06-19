var metadata = {
    ruleId: "RULE ID: SV-216577r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration and verify that it is not BGP peering with an alternate  gateway service provider.  Step 1: Determine the ip address of the ISP router  interface GigabitEthernet0/2  description Link to ISP  ip address x.22.1.15 255.255.255.240  Step 2: Verify that the router is not BGP peering with this router.  router bgp nn  no synchronization  bgp log-neighbor-changes  neighbor x.11.1.7 remote-as nn  neighbor x.11.1.7 password xxxxxxx  no auto-summary  In the example above, the router is not peering with the ISP.  If the router is BGP peering with an alternate gateway service provider, this is a finding."
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

        if (line.indexOf("service provider.".toLowerCase()) !== -1) {

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
