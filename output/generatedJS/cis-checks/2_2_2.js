var metadata = {
    ruleNumber: "2.2.2",
    title: "Set 'buffer size' for 'logging buffered' (Automated)",
    profile: "•  Level 1",
    description: "Enable system message logging to a local buffer.",
    rationale: "The device can copy and store log messages to an internal memory buffer. The  buffered data is available only from a router exec or enabled exec session. This form of  logging is useful for debugging and monitoring when logged in to a router.",
    impact: "Data forensics is effective for managing technology risks and an organization can  enforce such policies by enabling the 'logging buffered' command.",
    audit: "Perform the following to determine if the feature is enabled:  Verify a command string result returns    hostname#show run | incl logging buffered",
    remediation: "Configure buffered logging (with minimum size). Recommended size is 64000.    hostname(config)#logging buffered [<em>log_buffer_size</em>]",
    defaultValue: "No logging buffer is set by default"
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

        if (line.indexOf("logging buffered") !== -1) {

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
