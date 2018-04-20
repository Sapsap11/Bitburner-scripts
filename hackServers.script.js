servers=read("altScan").split(",");

//calculates how many ports you can open
attacks=0;
attackFiles=["BruteSSH.exe","FTPCrack.exe","relaySMTP.exe","HTTPWorm.exe","SQLInject.exe"];
hacklevel=getHackingLevel();
for (i=0;i<attackFiles.length;i++)
{
    if (fileExists(attackFiles[i],"home"))
    {
        attacks++;
        
    }
    
}

for (i=0;i<servers.length;i++)
{
    root=hasRootAccess(servers[i]);
    if (attacks>=getServerNumPortsRequired(servers[i]) && !root){run("attack.script",1,servers[i])}
    if (root)
    {
        //kills all running scripts on the server,
        //waits until the server has stopped running scripts and then copies genhack over
        killall(servers[i]);
        scp("genhack.script",servers[i]);
        while(getServerRam(servers[i])[1]!==0){}
        
        //checks how much ram it can use and then runs as many genhacks as it can
        avalibleRam=getServerRam(servers[i])[0];
        scriptSize=getScriptRam("genhack.script",servers[i]);
    
    
        if ( (avalibleRam>scriptSize) && (hacklevel>=getServerRequiredHackingLevel(servers[i])) && (getServerMaxMoney(servers[i])!==0))
        {
            threads=Math.floor(avalibleRam/scriptSize);
            exec("genhack.script",servers[i],threads,servers[i]);
        }
    }
}
