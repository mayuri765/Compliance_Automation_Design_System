var metadata = {
    ruleNumber: "1.6.2",
    title: "AutoSecure (Automated)",
    profile: "•  Level 2",
    description: "The AutoSecure feature secures a router by using a single CLI command to disable  common IP services that can be exploited for network attacks, enable IP services and  features that can aid in the defense of a network when under attack, and simplify and  harden the security configuration of the router.",
    rationale: "After enabling this feature (through the auto secure command), the following global  services are disabled on the router without prompting the user:  Finger--Collects information about the system (reconnaissance) before an attack. If  enabled, the information can leave your device vulnerable to attacks.  PAD--Enables all packet assembler and disassembler (PAD) commands and  connections between PAD devices and access servers. If enabled, it can leave your  device vulnerable to attacks.  Small Servers--Causes TCP and User Datagram Protocol (UDP) diagnostic port  attacks: a sender transmits a volume of fake requests for UDP diagnostic services on  the router, consuming all CPU resources.  Bootp Server--Bootp is an insecure protocol that can be exploited for an attack.  HTTP Server--Without secure-http or authentication embedded in the HTTP server with  an associated ACL, the HTTP server is insecure and can be exploited for an attack. (If  you must enable the HTTP server, you are prompted for the proper authentication or  access list.) Identification Service--An insecure protocol, defined in RFC 1413, that  allows one to query a TCP port for identification. An attacker can access private  information about the user from the ID server.  CDP--If a large number of Cisco Discovery Protocol (CDP) packets are sent to the  router, the available memory of the router can be consumed, causing the router to  crash. NTP--Without authentication or access-control, Network Time Protocol (NTP) is  insecure and can be used by an attacker to send NTP packets to crash or overload the  router. (If you want to turn on NTP, you must configure NTP authentication using  Message Digest 5 (MD5) and the ntp access-group command. If NTP is enabled  globally, disable it on all interfaces on which it is not needed.)  Source Routing--Provided only for debugging purposes, so source routing should be  disabled in all other cases. Otherwise, packets may slip away from some of the access  control mechanisms that they should have gone through.  Page 100",
    impact: "After enabling this feature, the following options in which to secure access to the router  are available to the user:  If a text banner does not exist, users are prompted to add a banner. This feature  provides the following sample banner:  Authorized access only This system is the property of ABC Enterprise Disconnect  IMMEDIATELY if you are not an authorized user! Contact abc@xyz.com +99 876  543210 for help. The login and password (preferably a secret password, if supported)  are configured on the console, AUX, vty, and tty lines. The transport input and transport  output commands are also configured on all of these lines. (Telnet and secure shell  (SSH) are the only valid transport methods.) The exec-timeout command is configured  on the console and AUX as 10.  When the image on the device is a crypto image, AutoSecure enables SSH and secure  copy (SCP) for access and file transfer to and from the router. The timeout seconds and  authentication-retries integer options for the ip ssh command are configured to a  minimum number. (Telnet and FTP are not affected by this operation and remain  operational.)  If the AutoSecure user specifies that their device does not use Simple Network  Management Protocol (SNMP), one of the following functions occur: In interactive  mode, the user is asked whether to disable SNMP regardless of the values of the  community strings, which act like passwords to regulate access to the agent on the  router. In non-interact mode, SNMP is disabled if the community string is “public” or  “private.”",
    audit: "Hostname#show auto secure config",
    remediation: "How to Configure AutoSecure  Hostname#(config)auto secure {management | forwarding} {no-interact | full}  {ntp | login | ssh |firewall | tcp-intercept}  Configuring Enhanced Security Access to the Router  Hostname#(config)enable password {password | [encryption-type ] encrypted- password }  Hostname#security authentication failure rate {**threshold-rate**} log",
    defaultValue: "AutoSecure not configured  Page 101"
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

        if (line.indexOf("") !== -1) {

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
