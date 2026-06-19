var metadata = {
    ruleNumber: "2.1.1.1.5",
    title: "Set maximum value for 'ip ssh authentication-retries'",
    profile: "•  Level 1",
    description: "The number of retries before the SSH login session disconnects.",
    rationale: "This limits the number of times an unauthorized user can attempt a password without  having to establish a new SSH login attempt. This reduces the potential for success  during online brute force attacks by limiting the number of login attempts per SSH  connection.",
    impact: "Organizations should implement a security policy limiting the number of authentication  attempts for network administrators and enforce the policy through the 'ip ssh  authentication-retries' command.",
    audit: "Perform the following to determine if SSH authentication retries is configured:  Verify the authentication retries is configured properly.    hostname#sh ip ssh",
    remediation: "Configure the SSH timeout: 3 or less    hostname(config)#ip ssh authentication-retries [<em>3</em>]",
    defaultValue: "SSH is not enabled by default. When set, the default value is 3."
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
