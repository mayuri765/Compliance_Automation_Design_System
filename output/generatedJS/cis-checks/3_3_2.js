var metadata = {
    ruleNumber: "3.3.2",
    title: ".2 Set 'ip ospf message-digest-key md5' (Automated)",
    profile: "•  Level 2",
    description: "Enable Open Shortest Path First (OSPF) Message Digest 5 (MD5) authentication.",
    rationale: "This is part of the OSPF authentication setup",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Configuring the proper  interface(s) for 'ip ospf message-digest-key md5' enforces these policies by restricting  exchanges between network devices.",
    audit: "Verify the appropriate md5 key is defined on the appropriate interface(s)    hostname#sh run int {<em>interface</em>}",
    remediation: "Configure the appropriate interface(s) for Message Digest authentication    hostname(config)#interface {<em>interface_name</em>}  hostname(config-if)#ip ospf message-digest-key {<em>ospf_md5_key-id</em>} md5  {<em>ospf_md5_key</em>}",
    defaultValue: "Not set"
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
