var metadata = {
    ruleNumber: "2.2.4",
    title: "Set IP address for 'logging host' (Automated)",
    profile: "•  Level 1",
    description: "Log system messages and debug output to a remote host.",
    rationale: "Cisco routers can send their log messages to a Unix-style Syslog service. A syslog  service simply accepts messages and stores them in files or prints them according to a  simple configuration file. This form of logging is best because it can provide protected  long-term storage for logs (the devices internal logging buffer has limited capacity to  store events.) In addition, logging to an external system is highly recommended or  required by most security standards. If desired or required by policy, law and/or  regulation, enable a second syslog server for redundancy.",
    impact: "Logging is an important process for an organization managing technology risk. The  'logging host' command sets the IP address of the logging host and enforces the logging  process.",
    audit: "Perform the following to determine if a syslog server is enabled:  Verify one or more IP address(es) returns    hostname#sh log | incl logging host",
    remediation: "Designate one or more syslog servers by IP address.    hostname(config)#logging host {syslog_server}",
    defaultValue: "System logging messages are not sent to any remote host."
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

        if (line.indexOf("ip address(es)") !== -1) {

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
