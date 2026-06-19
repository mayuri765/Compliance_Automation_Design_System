var metadata = {
    ruleNumber: "1.6.3",
    title: "Configuring Kerberos (Automated)",
    profile: "•  Level 2",
    description: "Kerberos is a secret-key network authentication protocol, developed at the  Massachusetts Institute of Technology (MIT), that uses the Data Encryption Standard  (DES) cryptographic algorithm for encryption and authentication. Kerberos was  designed to authenticate requests for network resources. Kerberos, like other secret- key systems, is based on the concept of a trusted third party that performs secure  verification of users and services. In the Kerberos protocol, this trusted third party is  called the key distribution center (KDC).  The primary use of Kerberos is to verify that users and the network services they use  are really who and what they claim to be. To accomplish this, a trusted Kerberos server  issues tickets to users. These tickets, which have a limited lifespan, are stored in a  user’s credential cache and can be used in place of the standard username-and- password authentication mechanism.  The Kerberos credential scheme embodies a concept called “single logon.” This  process requires authenticating a user once, and then allows secure authentication  (without encrypting another password) wherever that user’s credential is accepted.  Cisco IOS XE software includes Kerberos 5 support, which allows organizations already  deploying Kerberos 5 to use the same Kerberos authentication database on their  routers that they are already using on their other network hosts (such as UNIX servers  and PCs).  The following network services are supported by the Kerberos authentication  capabilities in Cisco IOS XE software:  Telnet  rlogin  rsh  rcp",
    rationale: "Authenticating to the Boundary Router This section describes the first layer of security  that remote users must pass through when they attempt to access a network. The first  step in the Kerberos authentication process is for users to authenticate themselves to  the boundary router. The following process describes how users authenticate to a  boundary router:  Page 103",
    impact: "A remote user who successfully initiates a PPP session and authenticates to the  boundary router is inside the firewall but still must authenticate to the KDC directly  before being allowed to access network services. This is because the TGT issued by  the KDC is stored on the router and is not useful for additional authentication unless the  user physically logs on to the router.",
    audit: "Hostname#show kerberos cred",
    remediation: "Adding Users to the KDC Database  Hostname# ank {username@REALM}  Hostname# ank {username/instance@REALM  Creating SRVTABs on the KDC  Hostname# ark {SERVICE/HOSTNAME@REALM}  Make entries for all network services on all Kerberized hosts that use this KDC for  authentication.  Defining a Kerberos Realm  Hostname#(config)kerberos local-realm {kerberos-realm}  Hostname#(config)kerberos server {kerberos-realm {hostname | ip-address}}  {port-number}  Hostname#(config)kerberos realm {dns-domain | host} {kerberos-realm}",
    defaultValue: "no kerberos enabled"
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
