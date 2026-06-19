var metadata = {
    ruleNumber: "3.3.2.1",
    title: "Set 'authentication message-digest' for OSPF area",
    profile: "•  Level 2",
    description: "Enable MD5 authentication for OSPF.",
    rationale: "This is part of the OSPF authentication setup.",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Configuring the area  'authentication message-digest' for OSPF enforces these policies by restricting  exchanges between network devices.",
    audit: "Verify message digest for OSPF is defined  hostname#sh run | sec router ospf",
    remediation: "Configure the Message Digest option for OSPF.    hostname(config)#router ospf <<em>ospf_process-id</em>>  hostname(config-router)#area <<em>ospf_area-id</em>> authentication message- digest",
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
