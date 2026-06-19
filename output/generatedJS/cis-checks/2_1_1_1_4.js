var metadata = {
    ruleNumber: "2.1.1.1.4",
    title: "Set 'seconds' for 'ip ssh timeout' for 60 seconds or less",
    profile: "•  Level 1",
    description: "The time interval that the router waits for the SSH client to respond before  disconnecting an uncompleted login attempt.",
    rationale: "This reduces the risk of an administrator leaving an authenticated session logged in for  an extended period of time.",
    impact: "Organizations should implement a security policy requiring minimum timeout settings for  all network administrators and enforce the policy through the 'ip ssh timeout' command.",
    audit: "Perform the following to determine if the SSH timeout is configured:  Verify the timeout is configured properly.    hostname#sh ip ssh",
    remediation: "Configure the SSH timeout    hostname(config)#ip ssh time-out [<em>60</em>]",
    defaultValue: "SSH in not enabled by default."
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

        if (line.indexOf("ip ssh") !== -1) {

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
