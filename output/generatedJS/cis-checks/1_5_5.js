var metadata = {
    ruleNumber: "1.5.5",
    title: "Set the ACL for each 'snmp-server community' (Automated)",
    profile: "•  Level 1",
    description: "This feature specifies a list of IP addresses that are allowed to use the community string  to gain access to the SNMP agent.",
    rationale: "If ACLs are not applied, then anyone with a valid SNMP community string can  potentially monitor and manage the router. An ACL should be defined and applied for all  SNMP access to limit access to a small number of authorized management stations  segmented in a trusted management zone. If possible, use SNMPv3 which uses  authentication, authorization, and data privatization (encryption).",
    impact: "To reduce the risk of unauthorized access, Organizations should enable access control  lists for all snmp-server communities and restrict the access to appropriate trusted  management zones. If possible, implement SNMPv3 to apply authentication,  authorization, and data privatization (encryption) for additional benefits to the  organization.",
    audit: "Perform the following to determine if an ACL is enabled:  Verify the result shows a number after the community string    hostname#show run | incl snmp-server community",
    remediation: "Configure authorized SNMP community string and restrict access to authorized  management systems.    hostname(config)#snmp-server community <<em>community_string</em>> ro  {<em>snmp_access-list_number |   <span>snmp_access-list_name</span></em><span>}</span>",
    defaultValue: "No ACL is set for SNMP  Page 85"
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
