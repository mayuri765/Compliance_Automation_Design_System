var metadata = {
    ruleNumber: "3.2.2",
    title: "Set inbound 'ip access-group' on the External Interface",
    profile: "•  Level 2",
    description: "This command places the router in access-list configuration mode, where you must  define the denied or permitted access conditions by using the deny and permit  commands.",
    rationale: "Configuring access controls can help prevent spoofing attacks. To reduce the  effectiveness of IP spoofing, configure access control to deny any traffic from the  external network that has a source address that should reside on the internal network.  Include local host address or any reserved private addresses (RFC 1918).  Ensure the permit rule(s) above the final deny rule only allow traffic according to your  organization's least privilege policy.",
    impact: "Organizations should plan and implement enterprise security policies explicitly  permitting and denying access based upon access lists. Using the 'ip access-group'  command enforces these policies by explicitly identifying groups permitted access.",
    audit: "Verify the access-group is applied to the appropriate interface    hostname#sh run | sec interface {<em>external_interface</em>}",
    remediation: "Apply the access-group for the external (untrusted) interface    hostname(config)#interface {external_interface}  hostname(config-if)#ip access-group {name | number} in",
    defaultValue: "No access-group defined  Page 182"
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
