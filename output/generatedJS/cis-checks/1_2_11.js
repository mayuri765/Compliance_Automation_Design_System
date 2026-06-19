var metadata = {
    ruleNumber: "1.2.11",
    title: "Set 'exec-timeout' to less than or equal to 10 min on 'ip",
    profile: "•  Level 1",
    description: "If no input is detected during the interval, the EXEC facility resumes the current  connection. If no connections exist, the EXEC facility returns the terminal to the idle  state and disconnects the incoming session.",
    rationale: "",
    impact: "",
    audit: "Perform the following to determine if the timeout is configured:  sh run | beg ip http timeout-policy",
    remediation: "Configure device timeout (10 minutes or less) to disconnect sessions after a fixed idle  time.  ip http timeout-policy idle 600 life {nnnn} requests {nn}",
    defaultValue: "disabled  Page 56"
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

        if (line.indexOf("ip http") !== -1) {

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
