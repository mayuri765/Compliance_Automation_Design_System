var metadata = {
    ruleNumber: "3.3.3",
    title: ".5 Set 'ip rip authentication mode' to 'md5' (Automated)",
    profile: "•  Level 2",
    description: "Configure the Interface with the RIPv2 key chain.",
    rationale: "This is part of the RIPv2 authentication setup",
    impact: "Organizations should plan and implement enterprise security policies that require  rigorous authentication methods for routing protocols. Using the 'ip rip authentication  mode md5' enforces these policies by restricting the type of authentication between  network devices.",
    audit: "Verify the appropriate mode is set on the appropriate interface(s)    hostname#sh run int <<em>interface</em>>",
    remediation: "Configure the RIPv2 authentication mode on the necessary interface(s)    hostname(config)#interface <<em>interface_name</em>>  hostname(config-if)#ip rip authentication mode md5",
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
