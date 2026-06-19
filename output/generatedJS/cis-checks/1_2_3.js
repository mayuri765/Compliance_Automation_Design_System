var metadata = {
    ruleNumber: "1.2.3",
    title: "Set 'no exec' for 'line aux 0' (Automated)",
    profile: "•  Level 1",
    description: "The 'no exec' command restricts a line to outgoing connections only.",
    rationale: "Unused ports should be disabled, if not required, since they provide a potential access  path for attackers. Some devices include both an auxiliary and console port that can be  used to locally connect to and configure the device. The console port is normally the  primary port used to configure the device; even when remote, backup administration is  required via console server or Keyboard, Video, Mouse (KVM) hardware. The auxiliary  port is primarily used for dial-up administration via an external modem; instead, use  other available methods.",
    impact: "Organizations can reduce the risk of unauthorized access by disabling the 'aux' port  with the 'no exec' command. Conversely, not restricting access through the 'aux' port  increases the risk of remote unauthorized access.",
    audit: "Perform the following to determine if the EXEC process for the aux port is disabled:  Verify no exec  hostname#show running-config | sec aux  Verify you see the following \"no exec\"  hostname#show line aux 0 | incl exec",
    remediation: "Disable the EXEC process on the auxiliary port.  hostname(config)#line aux 0  hostname(config-line)#no exec",
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

        if (line.indexOf("no exec") !== -1) {

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
