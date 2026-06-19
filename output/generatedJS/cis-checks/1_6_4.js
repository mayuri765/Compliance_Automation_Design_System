var metadata = {
    ruleNumber: "1.6.4",
    title: "Configure Web interface (Automated)",
    profile: "•  Level 2",
    description: "Web-based authentication is an ingress-only feature.  You can configure web-based authentication only on access ports. Web-based  authentication is not supported on trunk ports, EtherChannel member ports, or dynamic  trunk ports.  External web authentication, where the switch redirects a client to a particular host or  web server for displaying login message, is not supported.  You cannot authenticate hosts on Layer 2 interfaces with static ARP cache assignment.  These hosts are not detected by the web-based authentication feature because they do  not send ARP messages.  You must enable SISF-Based device tracking to use web-based authentication. By  default, SISF-Based device tracking is disabled on a switch.  You must configure at least one IP address to run the switch HTTP server. You must  also configure routes to reach each host IP address. The HTTP server sends the HTTP  login page to the host.  Hosts that are more than one hop away might experience traffic disruption if an STP  topology change results in the host traffic arriving on a different port. This occurs  because the ARP and DHCP updates might not be sent after a Layer 2 (STP) topology  change.  Web-based authentication does not support VLAN assignment as a downloadable-host  policy.  Web-based authentication and Network Edge Access Topology (NEAT) are mutually  exclusive. You cannot use web-based authentication when NEAT is enabled on an  interface, and you cannot use NEAT when web-based authentication is running on an  interface.  Identify the following RADIUS security server settings that will be used while configuring  switch-to-RADIUS-server communication:  Host name  Host IP address  Host name and specific UDP port numbers  IP address and specific UDP port numbers  Page 105",
    rationale: "",
    impact: "",
    audit: "Hostname#show ip admission",
    remediation: "Configuring the Authentication Rule and Interfaces  Hostname#(config)ip admission name {Name} proxy http  Hostname#(config)interface {type slot/port}  Hostname#(config)ip access-group {Name}  Hostname#(config)ip admission name  Hostname#(config)ip admission max-login-attempts {number}  2 Control Plane  The control plane covers monitoring, route table updates, and generally the dynamic  operation of the router. Services, settings, and data streams that support and document  the operation, traffic handling, and dynamic status of the router. Examples of control  plane services include: logging (e.g. Syslog), routing protocols, status protocols like  CDP and HSRP, network topology protocols like STP, and traffic security control  protocols like IKE. Network control protocols like ICMP, NTP, ARP, and IGMP directed  to or sent by the router itself also fall into this area.",
    defaultValue: ""
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

        if (line.indexOf("ip admission") !== -1) {

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
