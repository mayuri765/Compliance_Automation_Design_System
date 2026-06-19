var metadata = {
    ruleNumber: "1.3.1",
    title: "Set the 'banner-text' for 'banner exec' (Automated)",
    profile: "•  Level 1",
    description: "This command specifies a message to be displayed when an EXEC process is created  (a line is activated, or an incoming connection is made to a vty). Follow this command  with one or more blank spaces and a delimiting character of your choice. Then enter  one or more lines of text, terminating the message with the second occurrence of the  delimiting character.  When a user connects to a router, the message-of-the-day (MOTD) banner appears  first, followed by the login banner and prompts. After the user logs in to the router, the  EXEC banner or incoming banner will be displayed, depending on the type of  connection. For a reverse Telnet login, the incoming banner will be displayed. For all  other connections, the router will display the EXEC banner.",
    rationale: "\"Network banners are electronic messages that provide notice of legal rights to users of  computer networks. From a legal standpoint, banners have four primary functions.  • First, banners may be used to generate consent to real-time monitoring under  Title III.  • Second, banners may be used to generate consent to the retrieval of stored files  and records pursuant to ECPA.  • Third, in the case of government networks, banners may eliminate any Fourth  Amendment \"reasonable expectation of privacy\" that government employees or  other users might otherwise retain in their use of the government's network under  O'Connor v. Ortega, 480 U.S. 709 (1987).  • Fourth, in the case of a non-government network, banners may establish a  system administrator's \"common authority\" to consent to a law enforcement  search pursuant to United States v. Matlock, 415 U.S. 164 (1974).\" (US  Department of Justice APPENDIX A: Sample Network Banner Language)",
    impact: "Organizations provide appropriate legal notice(s) and warning(s) to persons accessing  their networks by using a 'banner-text' for the banner exec command.",
    audit: "Perform the following to determine if the exec banner is set:  Page 59    hostname#sh running-config | beg banner exec  If the command does not return a result, the banner is not enabled",
    remediation: "Configure the EXEC banner presented to a user when accessing the devices enable  prompt.    hostname(config)#banner exec c  Enter TEXT message. End with the character 'c'.  <banner-text>  c",
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
