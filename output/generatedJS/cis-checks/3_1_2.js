var metadata = {
    ruleNumber: "3.1.2",
    title: "Set 'no ip proxy-arp' (Automated)",
    profile: "•  Level 2",
    description: "Disable proxy ARP on all interfaces.",
    rationale: "Address Resolution Protocol (ARP) provides resolution between IP and MAC  Addresses (or other Network and Link Layer addresses on none IP networks) within a  Layer 2 network.  Proxy ARP is a service where a device connected to one network (in this case the Cisco  router) answers ARP Requests which are addressed to a host on another network,  replying with its own MAC Address and forwarding the traffic on to the intended host.  Sometimes used for extending broadcast domains across WAN links, in most cases  Proxy ARP on enterprise networks is used to enable communication for hosts with mis- configured subnet masks, a situation which should no longer be a common problem.  Proxy ARP effectively breaks the LAN Security Perimeter, extending a network across  multiple Layer 2 segments. Using Proxy ARP can also allow other security controls such  as PVLAN to be bypassed.",
    impact: "Organizations should plan and implement network policies to ensure unnecessary  services are explicitly disabled. The 'ip proxy-arp' feature effectively breaks the LAN  security perimeter and should be disabled.",
    audit: "Verify the proxy ARP status    hostname#sh ip int {<em>interface</em>} | incl proxy-arp",
    remediation: "Disable proxy ARP on all interfaces.    hostname(config)#interface {interface}  hostname(config-if)#no ip proxy-arp",
    defaultValue: "Enabled  Page 173"
};

function check(config) {

    if (!config) {
        return { status: "ERROR", line: 0 };
    }

    var lines = config.split("\n");
    var matched = false;
    var foundLine = 0;
    var pass = true;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if (line.indexOf("ip int") !== -1) {

            matched = true;
            foundLine = i + 1;

            var numberMatch = line.match(/\d+/);
            var actual = numberMatch ? parseInt(numberMatch[0]) : null;

            pass = true;
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
