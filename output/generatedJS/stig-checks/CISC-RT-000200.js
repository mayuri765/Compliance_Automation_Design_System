var metadata = {
    ruleId: "RULE ID: SV-216568r531085",
    severity: "SEVERITY: CAT I",
    audit: "Review all Access Control Lists(ACLs) used to filter traffic and verify that packets being  dropped are logged as shown in the configuration below.  ip access-list extended INGRESS_FILTER  permit tcp any any established  permit tcp host x.11.1.1 eq bgp host x.11.1.2  permit tcp host x.11.1.1 host x.11.1.2 eq bgp  permit tcp any host x.11.1.5 eq www  permit icmp host x.11.1.1 host x.11.1.2 echo  permit icmp any any echo-reply  …  …  …  deny ip any any log  If packets being dropped at interfaces are not logged, this is a finding."
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

        if (line.indexOf("ip access-list".toLowerCase()) !== -1) {

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
