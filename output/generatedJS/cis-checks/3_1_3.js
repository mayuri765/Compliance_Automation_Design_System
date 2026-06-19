var metadata = {
    ruleNumber: "3.1.3",
    title: "Set 'no interface tunnel' (Automated)",
    profile: "•  Level 1",
    description: "Verify no tunnel interfaces are defined.",
    rationale: "Tunnel interfaces should not exist in general. They can be used for malicious purposes.  If they are necessary, the network admin's should be well aware of them and their  purpose.",
    impact: "Organizations should plan and implement enterprise network security policies that  disable insecure and unnecessary features that increase attack surfaces such as 'tunnel  interfaces'.",
    audit: "Verify no tunnel interfaces are defined    hostname#sh ip int brief | incl tunnel",
    remediation: "Remove any tunnel interfaces.    hostname(config)#no interface tunnel {<em>instance</em>}",
    defaultValue: "No tunnel interfaces are defined"
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

        if (line.indexOf("no tunnel") !== -1) {

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
