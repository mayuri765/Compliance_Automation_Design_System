var metadata = {
    ruleNumber: "2.1.4",
    title: "Set 'no service dhcp' (Automated)",
    profile: "•  Level 1",
    description: "Disable the Dynamic Host Configuration Protocol (DHCP) server and relay agent  features on your router.",
    rationale: "The DHCP server supplies automatic configuration parameters, such as dynamic IP  address, to requesting systems. A dedicated server located in a secured management  zone should be used to provide DHCP services instead. Attackers can potentially be  used for denial-of-service (DoS) attacks.",
    impact: "To reduce the risk of unauthorized access, organizations should implement a security  policy restricting network protocols and explicitly require disabling all insecure or  unnecessary protocols such as the Dynamic Host Configuration Protocol (DHCP).",
    audit: "Perform the following to determine if the DHCP service is enabled:  Verify no result returns    hostname#show run | incl dhcp",
    remediation: "Disable the DHCP server.    hostname(config)#<strong>no service dhcp</strong>",
    defaultValue: "Enabled by default, but also requires a DHCP pool to be set to activate the DHCP  server."
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

        if (line.indexOf("service is") !== -1) {

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
