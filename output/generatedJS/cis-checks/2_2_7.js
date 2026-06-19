var metadata = {
    ruleNumber: "2.2.7",
    title: "Set 'logging source interface' (Automated)",
    profile: "•  Level 1",
    description: "Specify the source IPv4 or IPv6 address of system logging packets",
    rationale: "This is required so that the router sends log messages to the logging server from a  consistent IP address.",
    impact: "Logging is an important process for an organization managing technology risk and  establishing a consistent source of messages for the logging host is critical. The 'logging  source interface loopback' command sets a consistent IP address to send messages to  the logging host and enforces the logging process.",
    audit: "Perform the following to determine if logging services are bound to a source interface:  Verify a command string result returns    hostname#sh run | incl logging source",
    remediation: "Bind logging to the loopback interface.    hostname(config)#logging source-interface loopback  {<em>loopback_interface_number</em>}",
    defaultValue: "The wildcard interface address is used."
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

        if (line.indexOf("logging services") !== -1) {

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
