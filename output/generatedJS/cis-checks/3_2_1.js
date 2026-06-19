var metadata = {
    ruleNumber: "3.2.1",
    title: "Set 'ip access-list extended' to Forbid Private Source",
    profile: "•  Level 2",
    description: "This command places the router in access-list configuration mode, where you must  define the denied or permitted access conditions by using the deny and permit  commands.",
    rationale: "Configuring access controls can help prevent spoofing attacks. To reduce the  effectiveness of IP spoofing, configure access control to deny any traffic from the  external network that has a source address that should reside on the internal network.  Include local host address or any reserved private addresses (RFC 1918).  Ensure the permit rule(s) above the final deny rule only allow traffic according to your  organization's least privilege policy.",
    impact: "Organizations should plan and implement enterprise security policies that explicitly  separate internal from external networks. Adding 'ip access-list' explicitly permitting and  denying internal and external networks enforces these policies.",
    audit: "Verify you have the appropriate access-list definitions    hostname#sh ip access-list {<em>name | number</em>}",
    remediation: "Configure ACL for private source address restrictions from external networks.  Page 180    hostname(config)#ip access-list extended {<span><em>name | number</em>}   </span><span>hostname(config-nacl)#deny ip  {</span><em>internal_networks</em>} any log  hostname(config<span>-nacl</span>)#deny ip 127.0.0.0 0.255.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 10.0.0.0 0.255.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 0.0.0.0 0.255.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 172.16.0.0 0.15.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 192.168.0.0 0.0.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 192.0.2.0 0.0.0.255 any log  hostname(config<span>-nacl</span>)#deny ip 169.254.0.0 0.0.255.255 any log  hostname(config<span>-nacl</span>)#deny ip 224.0.0.0 31.255.255.255 any log  hostname(config<span>-nacl</span>)#deny ip host 255.255.255.255 any log  hostname(config<span>-nacl</span>)#permit {protocol} {source_ip}  {source_mask} {destination} {destination_mask} log  hostname(config<span>-nacl</span>)#deny any any log  hostname(config)#interface <external_<em>interface</em>>  hostname(config-if)#access-group <<em>access-list</em>> in",
    defaultValue: "No access list defined"
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

        if (line.indexOf("ip access-list") !== -1) {

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
