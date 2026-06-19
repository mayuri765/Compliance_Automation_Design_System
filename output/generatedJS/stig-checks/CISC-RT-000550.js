var metadata = {
    ruleId: "RULE ID: SV-216603r531085",
    severity: "SEVERITY: CAT I",
    audit: "This requirement is not applicable for the DODIN Backbone.  Review the router configuration to verify the router is configured to deny updates  received from CE routers with an originating AS in the AS_PATH attribute that does not  belong to that customer.  Step 1: Review router configuration and verify that there is an as-path access-list  statement defined to only accept routes from a CE router whose AS did not originate the  route. The configuration should look similar to the following:  ip as-path access-list 10 permit ^yy$  ip as-path access-list 10 deny .*  Note: the characters “^” and “$” representing the beginning and the end of the  expression respectively are optional and are implicitly defined if omitted.  Step 2: Verify that the as-path access-list is referenced by the filter-list inbound for the  appropriate BGP neighbors as shown in the example below:  router bgp xx  neighbor x.1.4.12 remote-as yy  neighbor x.1.4.12 filter-list 10 in  If the router is not configured to reject updates from CE routers with an originating AS in  the AS_PATH attribute that does not belong to that customer, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip as-path".toLowerCase()) !== -1) {

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
