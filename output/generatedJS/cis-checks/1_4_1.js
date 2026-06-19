var metadata = {
    ruleNumber: "1.4.1",
    title: "Set 'password' for 'enable secret' (Automated)",
    profile: "•  Level 1",
    description: "Enable secret password type 5 and enable secret password type 5 must be migrated to  the stronger password type 8 or 9. IF a device is upgraded from IOS XE 16.9 or later  the type 5 is auto converted to type 9.  Use the enable secret command to provide an additional layer of security over the  enable password. The enable secret command provides better security by storing the  enable secret password using a nonreversible cryptographic function. The added layer  of security encryption provides is useful in environments where the password crosses  the network or is stored on a TFTP server.",
    rationale: "Requiring the enable secret setting protects privileged EXEC mode. By default, a strong  password is not required, a user can just press the Enter key at the Password prompt to  start privileged mode. The enable password command causes the device to enforce use  of a password to access privileged mode. Enable secrets use a one-way cryptographic  hash (MD5). This is preferred to Level 7 enable passwords that use a weak, well- known, and easily reversible encryption algorithm.",
    impact: "Default device configuration does not require strong user authentication potentially  enabling unfettered access to an attacker that is able to reach the device. Creating a  local account with an encrypted password enforces login authentication and provides a  fallback authentication mechanism for configuration in a named method list in a situation  where centralized authentication, authorization, and accounting services are  unavailable. The following is the type of encryption the device will allow as of 15.3: Type  0 this mean the password will not be encrypted when router store it in Run/Start Files  command: enable password cisco123  Type 4 this mean the password will be encrypted when router store it in Run/Start Files  using SHA-256 which apps like Cain can crack but will take long time command :  enable secret 4 Rv4kArhts7yA2xd8BD2YTVbts (notice above is not the password string  it self but the hash of the password)  this type is deprecated starting from IOS 15.3(3)  Type 5 this mean the password will be encrypted when router store it in Run/Start Files  using MD5 which apps like Cain can crack but will take long time command: enable  secret 5 00271A5307542A02D22842 (notice above is not the password string it self but  the hash of the password) or enable secret cisco123 (notice above is the password  string it self)  Page 68  Type 7 this mean the password will be encrypted when router store it in Run/Start Files  using Vigenere cipher which any website with type7 reverser can crack it in less than  one second command : ena password cisco123 service password-encryption  Type 8  this mean the password will be encrypted when router store it in Run/Start Files using  PBKDF2-SHA-256  starting from IOS 15.3(3).  Password-Based Key Derivation Function 2 (PBKDF2) with Secure Hash Algorithm, 26- bits (SHA-256) as the hashing algorithm  Example : R1(config)#enable algorithm-type sha256 secret cisco  R1(config)#do sh run | i enable  enable secret 8  $8$mTj4RZG8N9ZDOk$elY/asfm8kD3iDmkBe3hD2r4xcA/0oWS5V3os.O91u.  Example : R1(config)# username yasser algorithm-type sha256 secret cisco  R1# show running-config | inc username  username yasser secret 8  $8$dsYGNam3K1SIJO$7nv/35M/qr6t.dVc7UY9zrJDWRVqncHub1PE9UlMQFs  Type 9  this means the password will be encrypted when router store it in Run/Start Files using  scrypt as the hashing algorithm.  starting from IOS 15.3(3)  Example : R1(config)#ena algorithm-type scrypt secret cisco  R1(config)#do sh run | i enable  enable secret 9  $9$WnArItcQHW/uuE$x5WTLbu7PbzGDuv0fSwGKS/KURsy5a3WCQckmJp0MbE  Example : R1(config)# username demo9 algorithm-type scrypt secret cisco  R1# show running-config | inc username  username demo9 secret 9  $9$nhEmQVczB7dqsO$X.HsgL6x1il0RxkOSSvyQYwucySCt7qFm4v7pqCxkKM  Important Notes:  1-If you configure type 8 or type 9 passwords and then downgrade to a release that  does not support type 8 and type 9 passwords, you must configure the type 5  passwords before downgrading. If not, you are locked out of the device and a password  recovery is required.  Page 69  2-Starting from IOS 15.3(3)The 4 keyword was deprecated and support for type 8 and  type 9 algorithms were added and The warning message for removal of support for the  type 4 algorithm was added tect privileged EXEC mode through policies requiring the  'enabling secret' setting, which enforces a one-way cryptographic hash (MD5).",
    audit: "Perform the following to determine enable secret is set:  If the command does not return a result, the enable password is not set.  hostname#sh run | incl enable secret",
    remediation: "Configure a strong, enable secret password.  hostname(config)#enable secret 9 {ENABLE_SECRET_PASSWORD}",
    defaultValue: "No enable secret password setup by default"
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
