var metadata = {
    ruleNumber: "2.2.6",
    title: "Set 'service timestamps debug datetime' (Automated)",
    profile: "•  Level 1",
    description: "Configure the system to apply a time stamp to debugging messages or system logging  messages",
    rationale: "Including timestamps in log messages allows correlating events and tracing network  attacks across multiple devices. Enabling service timestamp to mark the time log  messages were generated simplifies obtaining a holistic view of events enabling faster  troubleshooting of issues or attacks.",
    impact: "Logging is an important process for an organization managing technology risk and  establishing a timeline of events is critical. The 'service timestamps' command sets the  date and time on entries sent to the logging host and enforces the logging process.",
    audit: "Perform the following to determine if the additional detail is enabled:  Verify a command string result returns    hostname#sh run | incl service timestamps",
    remediation: "Configure debug messages to include timestamps.    hostname(config)#service timestamps debug datetime {<em>msec</em>} show- timezone",
    defaultValue: "Time stamps are applied to debug and logging messages."
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

        if (line.indexOf("service timestamps") !== -1) {

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
