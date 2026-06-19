var metadata = {
    ruleId: "RULE ID: SV-216576r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Step 1: Verify the interface connecting to ISP has an inbound ACL as shown in the  example below.  interface GigabitEthernet0/2  description Link to ISP  ip address x.22.1.15 255.255.255.240  ip access-group FILTER_ISP in  Step 2: Verify that the ACL only allows traffic to specific destination addresses (i.e.  enclave’s NIPRNet address space) as shown in the example below.  ip access-list extended FILTER_ISP  permit tcp any any established  permit icmp host x.12.1.16 host x.12.1.17 echo  permit icmp host x.12.1.16 host x.12.1.17 echo-reply  permit tcp any host x.12.1.22 eq www  permit tcp any host x.12.1.23 eq www  permit 50 any host x.12.1.24  permit 51 any host x.12.1.24  deny ip any any log-input  Note: An Approved Gateway (AG) is any external connection from a DoD NIPRNet  enclave to an Internet Service Provider, or network owned by a contractor, or non-DoD  federal agency that has been approved by either the DoD CIO or the DoD Component  CIO. This AG requirement does not apply to commercial cloud connections when the  Cloud Service Provider (CSP) network is connected via the NIPRNet Boundary Cloud  Access Point (BCAP).  If the ingress ACL bound to the interface connecting to an alternate gateway permits  packets with addresses other than those specified, such as destination addresses of the  site's NIPRNet address space or a destination address belonging to the address block  assigned by the alternate gateway network service provider, this is a finding.  Internal Only - General"
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
