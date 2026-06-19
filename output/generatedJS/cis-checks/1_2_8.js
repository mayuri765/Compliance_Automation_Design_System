var metadata = {
    ruleNumber: "1.2.8",
    title: "Set 'exec-timeout' to less than or equal to 10 minutes 'line",
    profile: "•  Level 1",
    description: "If no input is detected during the interval, the EXEC facility resumes the current  connection. If no connections exist, the EXEC facility returns the terminal to the idle  state and disconnects the incoming session.",
    rationale: "This prevents unauthorized users from misusing abandoned sessions. For example, if  the network administrator leaves for the day and leaves a computer open with an  enabled login session accessible. There is a trade-off here between security (shorter  timeouts) and usability (longer timeouts). Review your local policies and operational  needs to determine the best timeout value. In most cases, this should be no more than  10 minutes.",
    impact: "Organizations should prevent unauthorized use of unattended or abandoned sessions  by an automated control. Enabling 'exec-timeout' with an appropriate length of minutes  or seconds prevents unauthorized access of abandoned sessions.",
    audit: "Perform the following to determine if the timeout is configured:  Verify you return a result NOTE: If you set an exec-timeout of 10 minutes, this will not  show up in the configuration  hostname#sh line vty <tty_line_number> | begin Timeout",
    remediation: "Configure device timeout (10 minutes or less) to disconnect sessions after a fixed idle  time.  hostname(config)#line vty {line_number} [ending_line_number]  hostname(config-line)#exec-timeout <<span>timeout_in_minutes>  <timeout_in_seconds</span>>",
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
