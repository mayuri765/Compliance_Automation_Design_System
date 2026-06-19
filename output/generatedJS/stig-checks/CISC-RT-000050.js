var metadata = {
    ruleId: "RULE ID: SV-216555r929040",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration using the configuration examples below for BGP and  OSPF.  EIGRP, RIP, and IS-IS only support MD5 and will incur a permanent finding for those  protocols.  Note: The 180-day key lifetime is Not Applicable for the DODIN Backbone. The  remainder of the requirement still applies.  Verify that neighbor router authentication is enabled for all routing protocols. If neighbor  authentication is not enabled this is a finding.  Verify that authentication is configured to use FIPS 198-1 message authentication  algorithms. If the routing protocol authentication is not configured to use FIPS 198-1  algorithms this is a finding.  Verify that the protocol key lifetime is configured to not exceed 180 days. If any protocol  key lifetime is configured to exceed 180 days this is a finding.  BGP Example:  key chain <KEY-CHAIN-NAME> tcp  key <KEY-ID>  send-id <ID>  recv-id <ID>  cryptographic-algorithm hmac-sha256  key-string <KEY>  accept-lifetime 00:00:00 Jan 1 2022 duration 180  send-lifetime 00:00:00 Jan 1 2022 duration 180  !  !  router bgp <ASN>  no synchronization  bgp log-neighbor-changes  neighbor x.x.x.x remote-as <ASN>  neighbor x.x.x.x ao <KEY-CHAIN-NAME>  Note: TCP-AO is used to replace MD5 in BGP authentication.  OSPF Example:  key chain OSPF_KEY_CHAIN  key 1  key-string xxxxxxx  send-lifetime 00:00:00 Jan 1 2018 23:59:59 Mar 31 2018  accept-lifetime 00:00:00 Jan 1 2018 01:05:00 Apr 1 2018  cryptographic-algorithm hmac-sha-256  key 2       Internal Only - General  key-string yyyyyyy  send-lifetime 00:00:00 Apr 1 2018 23:59:59 Jun 30 2018  accept-lifetime 23:55:00 Mar 31 2018 01:05:00 Jul 1 2018  cryptographic-algorithm hmac-sha-256  …  …  …  interface GigabitEthernet0/1  ip address x.x.x.x 255.255.255.0  ip ospf authentication key-chain OSPF_KEY_CHAIN  Internal Only - General"
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

        if (line.indexOf("no synchronization".toLowerCase()) !== -1) {

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
