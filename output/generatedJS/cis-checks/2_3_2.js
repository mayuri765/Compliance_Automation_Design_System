var metadata = {
    ruleNumber: "2.3.2",
    title: "Set 'ip address' for 'ntp server' (Automated)",
    profile: "•  Level 1",
    description: "Use this command if you want to allow the system to synchronize the system software  clock with the specified NTP server.",
    rationale: "To ensure that the time on your Cisco router is consistent with other devices in your  network, at least two (and preferably at least three) NTP Server/s external to the router  should be configured.  Ensure you also configure consistent timezone and daylight savings time setting for all  devices. For simplicity, the default of Coordinated Universal Time (UTC).",
    impact: "Organizations should establish multiple Network Time Protocol (NTP) hosts to set  consistent time across the enterprise. Enabling the 'ntp server ip address' enforces  encrypted authentication between NTP hosts.",
    audit: "From the command prompt, execute the following commands:    hostname#sh ntp associations",
    remediation: "Configure at least one external NTP Server using the following commands    hostname(config)#ntp server {ntp-server_ip_address}  or   hostname(config)#ntp server {ntp server vrf [vrf name] ip address}",
    defaultValue: "No servers are configured by default."
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
