var metadata = {
    ruleNumber: "2.4.1",
    title: "Create a single 'interface loopback' (Automated)",
    profile: "•  Level 2",
    description: "Configure a single loopback interface.",
    rationale: "Software-only loopback interface that emulates an interface that is always up. It is a  virtual interface supported on all platforms.  Alternate loopback addresses create a potential for abuse, mis-configuration, and  inconsistencies. Additional loopback interfaces must be documented and approved prior  to use by local security personnel.",
    impact: "Organizations should plan and establish 'loopback interfaces' for the enterprise network.  Loopback interfaces enable critical network information such as OSPF Router IDs and  provide termination points for routing protocol sessions.",
    audit: "Perform the following to determine if a loopback interface is defined:  Verify an IP address returns for the defined loopback interface    hostname#sh ip int brief | incl Loopback",
    remediation: "Define and configure one loopback interface.    hostname(config)#interface loopback <<em>number</em>>  hostname(config-if)#ip address <<em>loopback_ip_address</em>>  <<em>loopback_subnet_mask</em>>",
    defaultValue: "There are no loopback interfaces defined by default."
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

        if (line.indexOf("ip address") !== -1) {

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
