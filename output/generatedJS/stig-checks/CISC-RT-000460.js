var metadata = {
    ruleId: "RULE ID: SV-216594r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Verify that all traffic from the managed network to the management network or NOC and  vice-versa is secured via IPsec tunnel.  Step 1: Note the crypto map applied to the external interface.  interface GigabitEthernet0/2  description link to DISN  ip address x.1.24.4 255.255.255.0  crypto map IPSEC_MGMT_MAP  Step 2: Review the ISAKMP policy for Phase 1 negotiations and Phase 2 policy for data  encryption.  crypto isakmp policy 10  authentication pre-share  hash sha256  crypto isakmp key xxxxxx address x.1.12.1  !  !  crypto ipsec transform-set TRANS_SET ah-sha256-hmac esp-aes  Step 3: Review the crypto map that was bound to the external interface and note the  ACL defined that identifies the interesting traffic for the IPsec tunnel.  crypto map IPSEC_MGMT_MAP 10 ipsec-isakmp  set peer x.1.12.1  set transform-set TRANS_SET  match address MGMT_TRAFFIC_ACL  Step 4: Review the ACL defined in the crypto map and verify that the destination is the  management network.  ip access-list extended MGMT_TRAFFIC_ACL  permit ip 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255  Note: The management network is this example is 10.22.2.0/24  If the management traffic is not secured via IPsec tunnel, this is a finding.  Internal Only - General"
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
