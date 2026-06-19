var metadata = {
    ruleNumber: "3.3.1",
    title: ".9 Set 'ip authentication mode eigrp' (Automated)",
    profile: "•  Level 2",
    description: "Configure authentication to prevent unapproved sources from introducing unauthorized  or false routing messages.",
    rationale: "This is part of the EIGRP authentication configuration",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Configuring the interface with 'ip  authentication mode' for EIGRP by number and mode enforces these policies by  restricting the exchanges between network devices.",
    audit: "Verify the appropriate authentication mode is set on the appropriate interface(s)  hostname#sh ip eigrp int  hostname#sh run int {<em>interface_name</em>} | incl authentication mode",
    remediation: "Configure the interface with the EIGRP authentication mode.    hostname(config)#interface {<em>interface_name</em>}  hostname(config-if)#ip authentication mode eigrp {<em><span>eigrp_as- number</span></em><span>}</span> md5",
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

        if (line.indexOf("ip eigrp") !== -1) {

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
