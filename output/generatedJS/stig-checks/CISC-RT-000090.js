var metadata = {
    ruleId: "RULE ID: SV-216559r856180",
    severity: "SEVERITY: CAT I",
    audit: "Review the device configuration to determine if auto-configuration or zero-touch  deployment via Cisco Networking Services (CNS) is enabled.  Auto-configuration example  version 15.0  service config  …  …  …  boot-start-marker  boot network tftp://x.x.x.x/R5-config  boot-end-marker  CNS Zero-Touch Example  cns trusted-server config x.x.x.x  cns trusted-server image x.x.x.x  cns config initial x.x.x.x 80  cns exec 80  cns image  If a configuration auto-loading feature or zero-touch deployment feature is enabled, this  is a finding.  Note: Auto-configuration or zero-touch deployment features can be enabled when the  router is offline for the purpose of image loading or building out the configuration. In  addition, this would not be applicable to the provisioning of virtual routers via a software- defined network (SDN) orchestration system.  Internal Only - General"
};

function check(config) {

    if (config == null) {
        return { status: "FAIL", line: 0 };
    }

    var lines = String(config).split("\n");
    var matched = false;
    var foundLine = 0;
    var pass = true;

    for (var i = 0; i < lines.length; i++) {

        var raw = lines[i];
        var line = String(raw).toLowerCase();

        if (line.indexOf("service config".toLowerCase()) !== -1) {

            matched = true;
            foundLine = i + 1;

            var numberMatch = line.match(/\d+/);
            var actual = numberMatch ? parseInt(numberMatch[0]) : null;

            pass = true;
        }
    }

    // Handle NOT EXISTS logic
    if ("exists" === "not_exists") {

        if (matched) {
            return { status: "FAIL", line: foundLine };
        } else {
            return { status: "PASS", line: 0 };
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
