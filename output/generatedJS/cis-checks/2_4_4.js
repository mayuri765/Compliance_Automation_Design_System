var metadata = {
    ruleNumber: "2.4.4",
    title: "Set 'ip tftp source-interface' to the Loopback Interface",
    profile: "•  Level 2",
    description: "Specify the IP address of an interface as the source address for TFTP connections.",
    rationale: "This is required so that the TFTP servers can easily identify routers and authenticate  requests by their IP address.",
    impact: "Organizations should plan and implement trivial file transfer protocol (TFTP) services in  the enterprise by setting 'tftp source-interface loopback', which enables the TFTP  servers to identify routers and authenticate requests by IP address.",
    audit: "Perform the following to determine if TFTP services are bound to a source interface:  Verify a command string result returns    hostname#sh run | incl tftp source-interface",
    remediation: "Bind the TFTP client to the loopback interface.    hostname(config)#ip tftp source-interface loopback  {<em>loobpback_interface_number</em>}",
    defaultValue: "The address of the closest interface to the destination is selected as the source  address."
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
