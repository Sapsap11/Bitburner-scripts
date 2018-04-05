target= args[0];
programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe",
            "HTTPWorm.exe", "SQLInject.exe"];
for (i = 0; i < programs.length; ++i) {
    if (fileExists(programs[i], "home")) {
        if (i === 0) {brutessh(target);}
        if (i === 1) {ftpcrack(target);}
        if (i === 2) {relaysmtp(target);}
        if (i === 3) {httpworm(target);}
        if (i === 4) {sqlinject(target);}}}
nuke(target);
tprint("hacked "+target);
