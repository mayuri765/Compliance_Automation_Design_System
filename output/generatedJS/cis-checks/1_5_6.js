var metadata = {
    ruleNumber: "1.5.6",
    title: "Create an 'access-list' for use with SNMP (Automated)",
    profile: "•  Level 1",
    description: "You can use access lists to control the transmission of packets on an interface, control  Simple Network Management Protocol (SNMP) access, and restrict the contents of  routing updates. The Cisco IOS software stops checking the extended access list after a  match occurs.",
    rationale: "",
    impact: "",
    audit: "Perform the following to determine if the ACL is created:  Verify you the appropriate access-list definitions    hostname#sh ip access-list <<em>snmp_acl_number</em>>",
    remediation: "Configure SNMP ACL for restricting access to the device from authorized management  stations segmented in a trusted management zone.    hostname(config)#access-list <<em>snmp_acl_number</em>> permit  <<em>snmp_access-list</em>>  hostname(config)#access-list deny any log",
    defaultValue: "SNMP does not use an access list."
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

        if (line.indexOf("ip access-list") !== -1) {

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
