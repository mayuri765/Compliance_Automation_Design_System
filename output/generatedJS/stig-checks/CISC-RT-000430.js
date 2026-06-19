var metadata = {
    ruleId: "RULE ID: SV-216591r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Verify the Interior Gateway Protocol (IGP) instance used for the managed network does  not redistribute routes into the IGP instance used for the management network, and vice  versa. The example below imports OSPF routes from the production route table (VRF  PROD) into the management route table (VRF MGMT) using BGP.  ip vrf MGMT  rd 4:4  route-target export 4:4  route-target import 4:4  route-target import 8:8  !  ip vrf PROD  rd 8:8  route-target import 8:8  route-target export 8:8  …  …  …  router ospf 1 vrf MGMT  log-adjacency-changes  redistribute bgp 64512 subnets  network 0.0.0.0 255.255.255.255 area 0  !  router ospf 2 vrf PROD  log-adjacency-changes  network 0.0.0.0 255.255.255.255 area 0  !  router bgp 64512  no synchronization  bgp log-neighbor-changes  no auto-summary  !  address-family ipv4 vrf MGMT  no synchronization  redistribute ospf 1 vrf MGMT  exit-address-family  !  address-family ipv4 vrf PROD  no synchronization  redistribute ospf 2 vrf PROD  exit-address-family  If the IGP instance used for the managed network redistributes routes into the IGP  instance used for the management network, or vice versa, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip vrf".toLowerCase()) !== -1) {

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
