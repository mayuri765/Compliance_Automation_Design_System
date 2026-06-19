var metadata = {
    ruleNumber: "1.3.3",
    title: "Set the 'banner-text' for 'banner motd' (Automated)",
    profile: "•  Level 1",
    description: "This MOTD banner is displayed to all terminals connected and is useful for sending  messages that affect all users (such as impending system shutdowns). Use the no  exec-banner or no motd-banner command to disable the MOTD banner on a line. The  no exec-banner command also disables the EXEC banner on the line.  When a user connects to the router, the MOTD banner appears before the login prompt.  After the user logs in to the router, the EXEC banner or incoming banner will be  displayed, depending on the type of connection. For a reverse Telnet login, the  incoming banner will be displayed. For all other connections, the router will display the  EXEC banner.",
    rationale: "\"Network banners are electronic messages that provide notice of legal rights to users of  computer networks. From a legal standpoint, banners have four primary functions.  • First, banners may be used to generate consent to real-time monitoring under  Title III.  • Second, banners may be used to generate consent to the retrieval of stored files  and records pursuant to ECPA.  • Third, in the case of government networks, banners may eliminate any Fourth  Amendment \"reasonable expectation of privacy\" that government employees or  other users might otherwise retain in their use of the government's network under  O'Connor v. Ortega, 480 U.S. 709 (1987).  • Fourth, in the case of a non-government network, banners may establish a  system administrator's \"common authority\" to consent to a law enforcement  search pursuant to United States v. Matlock, 415 U.S. 164 (1974).\" (US  Department of Justice APPENDIX A: Sample Network Banner Language)",
    impact: "Organizations provide appropriate legal notice(s) and warning(s) to persons accessing  their networks by using a 'banner-text' for the banner motd command.",
    audit: "Perform the following to determine if the login banner is set:    hostname#sh running-config | beg banner motd  If the command does not return a result, the banner is not enabled.  Page 63",
    remediation: "Configure the message of the day (MOTD) banner presented when a user first connects  to the device.    hostname(config)#banner motd c  Enter TEXT message. End with the character 'c'.  <banner-text>  c",
    defaultValue: "No banner is set by default"
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
