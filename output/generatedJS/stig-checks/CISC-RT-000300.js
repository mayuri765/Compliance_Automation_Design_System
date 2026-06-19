var metadata = {
    ruleId: "RULE ID: SV-216578r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Review the IGP and BGP configurations. If there are redistribute static  statements configured as shown in examples below proceed to step 2.  OSPF Example  router ospf 1  log-adjacency-changes  redistribute static subnets  network 0.0.0.0 255.255.255.255 area 0  EIGRP example  router eigrp 1  network 10.1.15.0 0.0.0.255  redistribute static  RIP example  router rip  version 2  redistribute static  network 10.0.0.0  BGP example  router bgp nn  no synchronization  bgp log-neighbor-changes  redistribute static  neighbor x.11.1.7 remote-as nn  neighbor x.11.1.7 password xxxxxxx  no auto-summary  Step 2: Review the static routes that have been configured to determine if any contain  the next hop address of the alternate gateway.  If the static routes to the alternate gateway are being redistributed into BGP or any IGP  peering to a NIPRNet gateway or any other autonomous system, this is a finding.  Internal Only - General"
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

        if (line.indexOf("IP example".toLowerCase()) !== -1) {

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
