var metadata = {
    ruleNumber: "1.2.9",
    title: "Set 'transport input none' for 'line aux 0' (Automated)",
    profile: "•  Level 1",
    description: "When you want to allow only an outgoing connection on a line, use the no exec  command.",
    rationale: "Unused ports should be disabled, if not required, since they provide a potential access  path for attackers. Some devices include both an auxiliary and console port that can be  used to locally connect to and configure the device. The console port is normally the  primary port used to configure the device; even when remote, backup administration is  required via console server or Keyboard, Video, Mouse (KVM) hardware. The auxiliary  port is primarily used for dial-up administration via an external modem; instead, use  other available methods.",
    impact: "Organizations should prevent all unauthorized access of auxiliary ports by disabling all  protocols using the 'transport input none' command.",
    audit: "Perform the following to determine if inbound connections for the aux port are disabled:  Verify you see the following \"Allowed input transports are none  hostname#sh line aux 0 | incl input transports",
    remediation: "Disable the inbound connections on the auxiliary port.  hostname(config)#line aux 0  hostname(config-line)#transport input none",
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
