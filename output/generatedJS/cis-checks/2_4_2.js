var metadata = {
    ruleNumber: "2.4.2",
    title: "Set AAA 'source-interface' (Automated)",
    profile: "•  Level 2",
    description: "Force AAA to use the IP address of a specified interface for all outgoing AAA packets",
    rationale: "This is required so that the AAA server (RADIUS or TACACS+) can easily identify  routers and authenticate requests by their IP address.",
    impact: "Organizations should design and implement authentication, authorization, and  accounting (AAA) services for effective monitoring of enterprise network devices.  Binding AAA services to the source-interface loopback enables these services.",
    audit: "Perform the following to determine if AAA services are bound to a source interface:  Verify a command string result returns    hostname#sh run | incl tacacs source | radius source",
    remediation: "Bind AAA services to the loopback interface.    Hostname(config)#ip radius source-interface loopback  {loopback_interface_number}  or  Hostname(config)#aaa group server tacacs+ {group_name} hostname(config-sg- tacacs+)#ip tacacs source-interface {loopback_interface_number}",
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
