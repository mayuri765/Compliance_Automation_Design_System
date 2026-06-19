var metadata = {
    ruleId: "RULE ID: SV-216560r929043",
    severity: "SEVERITY: CAT I",
    audit: "Review the Cisco router configuration to verify that it is compliant with this requirement.  Step 1: Verify traffic types have been classified based on importance levels. The  following is an example configuration:  class-map match-all CoPP_CRITICAL  match access-group name CoPP_CRITICAL  class-map match-any CoPP_IMPORTANT  match access-group name CoPP_IMPORTANT  match protocol arp  class-map match-all CoPP_NORMAL  match access-group name CoPP_NORMAL  class-map match-any CoPP_UNDESIRABLE  match access-group name CoPP_UNDESIRABLE  class-map match-all CoPP_DEFAULT  match access-group name CoPP_DEFAULT  Step 2: Review the Access Control Lists (ACLs) referenced by the class maps to  determine if the traffic is being classified appropriately. The following is an example  configuration:  ip access-list extended CoPP_CRITICAL  remark our control plane adjacencies are critical  permit ospf host [OSPF neighbor A] any  permit ospf host [OSPF neighbor B] any  permit pim host [PIM neighbor A] any  permit pim host [PIM neighbor B] any  permit pim host [RP addr] any  permit igmp any 224.0.0.0 15.255.255.255  permit tcp host [BGP neighbor] eq bgp host [local BGP addr]  permit tcp host [BGP neighbor] host [local BGP addr] eq bgp  deny ip any any  ip access-list extended CoPP_IMPORTANT  permit tcp host [TACACS server] eq tacacs any  permit tcp [management subnet] 0.0.0.255 any eq 22  permit udp host [SNMP manager] any eq snmp  permit udp host [NTP server] eq ntp any  deny ip any any  ip access-list extended CoPP_NORMAL       Internal Only - General  remark we will want to rate limit ICMP traffic  deny icmp any host x.x.x.x fragments  permit icmp any any echo  permit icmp any any echo-reply  permit icmp any any time-exceeded  permit icmp any any unreachable  deny ip any any  ip access-list extended CoPP_UNDESIRABLE  remark other management plane traffic that should not be received  permit udp any any eq ntp  permit udp any any eq snmp  permit tcp any any eq 22  permit tcp any any eq 23  remark other control plane traffic not configured on router  permit eigrp any any  permit udp any any eq rip  deny ip any any  ip access-list extended CoPP_DEFAULT  permit ip any any  Note: Explicitly defining undesirable traffic with ACL entries enables the network  operator to collect statistics. Excessive ARP packets can potentially monopolize Route  Processor resources, starving other important processes. Currently, ARP is the only  Layer 2 protocol that can be specifically classified using the match protocol command.  Step 3: Review the policy-map to determine if the traffic is being policed appropriately  for each classification. The following is an example configuration:  policy-map CONTROL_PLANE_POLICY  class CoPP_CRITICAL  police 512000 8000 conform-action transmit exceed-action transmit  class CoPP_IMPORTANT  police 256000 4000 conform-action transmit exceed-action drop  class CoPP_NORMAL  police 128000 2000 conform-action transmit exceed-action drop  class CoPP_UNDESIRABLE  police 8000 1000 conform-action drop exceed-action drop  class CoPP_DEFAULT  police 64000 1000 conform-action transmit exceed-action drop  Step 4: Verify that the CoPP policy is enabled. The following is an example  configuration:  control-plane  service-policy input CONTROL_PLANE_POLICY  Note: Control Plane Protection (CPPr) can be used to filter as well as police control  plane traffic destined to the RP. CPPr is very similar to CoPP and has the ability to filter  and police traffic using finer granularity by dividing the aggregate control plane into  three separate categories: (1) host, (2) transit, and (3) CEF-exception. Hence, a  separate policy-map could be configured for each traffic category.  Internal Only - General  If the Cisco router is not configured to protect against known types of DoS attacks by  employing organization-defined security safeguards, this is a finding."
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

        if (line.indexOf("ip access-list".toLowerCase()) !== -1) {

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
