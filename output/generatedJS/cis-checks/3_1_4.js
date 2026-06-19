var metadata = {
    ruleNumber: "3.1.4",
    title: "Set 'ip verify unicast source reachable-via' (Automated)",
    profile: "•  Level 1",
    description: "Examines incoming packets to determine whether the source address is in the  Forwarding Information Base (FIB) and permits the packet only if the source is  reachable through the interface on which the packet was received (sometimes referred  to as strict mode).",
    rationale: "Enabled uRPF helps mitigate IP spoofing by ensuring only packet source IP addresses  only originate from expected interfaces. Configure unicast reverse-path forwarding  (uRPF) on all external or high risk interfaces.",
    impact: "Organizations should plan and implement enterprise security policies that protect the  confidentiality, integrity, and availability of network devices. The 'unicast Reverse-Path  Forwarding' (uRPF) feature dynamically uses the router table to either accept or drop  packets when arriving on an interface.",
    audit: "Verify uRPF is running on the appropriate interface(s)    hostname#sh ip int {<em>interface</em>} | incl verify source",
    remediation: "Configure uRPF.    hostname(config)#interface {<em>interface_name</em>}  hostname(config-if)#ip verify unicast source reachable-via rx allow-default",
    defaultValue: "Unicast RPF is disabled."
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

        if (line.indexOf("ip int") !== -1) {

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
