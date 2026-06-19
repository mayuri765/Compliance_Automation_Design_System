var metadata = {
    ruleId: "RULE ID: SV-216589r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the network topology diagram to determine connectivity between the managed  network and the NOC. Review the OOBM gateway router configuration to validate the  path that the management traffic traverses. Verify that only management traffic is  forwarded through the OOBM interface or IPsec tunnel.  If an OOBM link is used, verify that the only authorized management traffic is  transported to the NOC by reviewing the outbound ACL applied to the OOBM interface  as shown in the example below.  Step 1: Note the outbound ACL applied to the OOBM interface.  interface GigabitEthernet0/2  description OOB link to NOC  ip address 10.11.1.8 255.255.255.0  ip access-group MGMT_TRAFFIC_ACL out  Step 2: Review the outbound ACL and verify only management traffic is forwarded to  the NOC.  ip access-list extended MGMT_TRAFFIC_ACL  permit tcp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq tacacs  permit tcp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq 22  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq snmp  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq snmp-trap  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq syslog  permit icmp 10.1.34.0 0.0.0.255 10.22.22.0 0.0.0.255  deny ip any any log-input  If an IPSec tunnel is used, verify that the only authorized management traffic is  transported to the NOC.  Step 1: Note the crypto map applied to the external interface.  interface interface GigabitEthernet0/2  description link to DISN  ip address x.1.24.4 255.255.255.0  crypto map IPSEC_MGMT_MAP  Step 2: Review the crypto map that was bound to the external interface and note the  ACL defined that identifies the interesting traffic for the IPsec tunnel.  crypto map IPSEC_MGMT_MAP 10 ipsec-isakmp  set peer x.1.12.1  set transform-set TRANS_SET  match address MGMT_TRAFFIC_ACL       Internal Only - General  Step 3: Review the ACL defined in the crypto map and verify only management traffic is  forwarded to the NOC.  ip access-list extended MGMT_TRAFFIC_ACL  permit tcp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq tacacs  permit tcp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq 22  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq snmp  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq snmp-trap  permit udp 10.1.34.0 0.0.0.255 10.22.2.0 0.0.0.255 eq syslog  permit icmp 10.1.34.0 0.0.0.255 10.22.22.0 0.0.0.255  Note: ICMP is permitted for troubleshooting purposes. The IPSec SA can only identify  interesting traffic via address, protocol, and port; hence, the ICMP traffic cannot be  qualified via type attribute.  If traffic other than authorized management traffic is permitted through the OOBM  interface or IPsec tunnel, this is a finding."
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
