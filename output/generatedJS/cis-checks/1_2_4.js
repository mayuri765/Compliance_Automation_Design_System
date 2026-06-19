var metadata = {
    ruleNumber: "1.2.4",
    title: "Create 'access-list' for use with 'line vty' (Automated)",
    profile: "•  Level 1",
    description: "Access lists control the transmission of packets on an interface, control Virtual Terminal  Line (VTY) access, and restrict the contents of routing updates. The Cisco IOS software  stops checking the extended access list after a match occurs.",
    rationale: "VTY ACLs control what addresses may attempt to log in to the router. Configuring VTY  lines to use an ACL, restricts the sources where a user can manage the device. You  should limit the specific host(s) and or network(s) authorized to connect to and configure  the device, via an approved protocol, to those individuals or systems authorized to  administer the device. For example, you could limit access to specific hosts, so that only  network managers can configure the devices only by using specific network  management workstations. Make sure you configure all VTY lines to use the same ACL.",
    impact: "Organizations can reduce the risk of unauthorized access by implementing access-lists  for all VTY lines. Conversely, using VTY lines without access-lists increases the risk of  unauthorized access.",
    audit: "Perform the following to determine if the ACL is created:  Verify the appropriate access-list definitions  hostname#sh ip access-list <vty_acl_number>",
    remediation: "Configure the VTY ACL that will be used to restrict management access to the device.  hostname(config)#access-list <vty_acl_number> permit tcp  <vty_acl_block_with_mask> any  hostname(config)#access-list <vty_acl_number> permit tcp host <vty_acl_host>  any  hostname(config)#deny ip any any log",
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
