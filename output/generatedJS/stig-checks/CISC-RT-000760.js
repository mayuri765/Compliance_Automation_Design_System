var metadata = {
    ruleId: "RULE ID: SV-216619r917417",
    severity: "SEVERITY: CAT I",
    audit: "Review the router configuration and verify that a QoS policy has been configured to  provide preferred treatment for mission-critical applications.  Step 1: Verify that the class-maps are configured to match on DSCP values as shown in  the configuration example below.  class-map match-all C2_VOICE  match ip dscp af47  class-map match-all VOICE  match ip dscp ef  class-map match-all VIDEO  match ip dscp af41  class-map match-all CONTROL_PLANE  match ip dscp cs6  class-map match-all PREFERRED_DATA  match ip dscp af33  Step 2: Verify that the policy map reserves the bandwidth for each traffic type as shown  in the following example:  policy-map QOS_POLICY  class C2_VOICE  priority percent 10  class VOICE  priority percent 15  class VIDEO  bandwidth percent 25  class CONTROL_PLANE  priority percent 10  class PREFERRED_DATA  bandwidth percent 25  class class-default  bandwidth percent 15  Step 3: Verify that an output service policy is bound to all interfaces as shown in the  configuration example below.  interface GigabitEthernet1/1  ip address 10.1.15.1 255.255.255.252  service-policy output QOS_POLICY  !       Internal Only - General  interface GigabitEthernet1/2  ip address 10.1.15.4 255.255.255.252  service-policy output QOS_POLICY  Note: Enclaves must mark or re-mark their traffic to be consistent with the DODIN  backbone admission criteria to gain the appropriate level of service. A general DiffServ  principle is to mark or trust traffic as close to the source as administratively and  technically possible. However, certain traffic types might need to be re-marked before  handoff to the DODIN backbone to gain admission to the correct class. If such re- marking is required, it is recommended that the re-marking be performed at the CE  egress edge.  If the router is not configured to enforce a QoS policy in accordance with the QoS  DODIN Technical Profile, this is a finding.  Internal Only - General"
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

        if (line.indexOf("ip dscp".toLowerCase()) !== -1) {

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
