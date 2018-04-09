servers=read("altScan").split(",");

//calculates how many ports you can open
attacks=0;
attackFiles=["BruteSSH.exe","FTPCrack.exe","relaySMTP.exe","HTTPWorm.exe","SQLInject.exe"];
for (i=0;i<attackFiles.length;i++)
{
    if (fileExists(attackFiles[i],"home"))
    {
        attacks++;
        
    }
    
}

for (i=0;i<servers.length;i++)
{
    if (attacks>=getServerNumPortsRequired(servers[i]) && !hasRootAccess(servers[i])){run("attack.script",1,servers[i])}
    if (hasRootAccess(servers[i]))
    {
        //kills all running scripts on the server,
        //waits until the server has stopped running scripts and then copies genhack over
        killall(servers[i]);
        while(getServerRam(servers[i])[1]!==0){}
        scp("genhack.script",servers[i]);
    
        //checks how much ram it can use and then runs as many genhacks as it can
        avalibleRam=getServerRam(servers[i])[0];
        scriptSize=getScriptRam("genhack.script",servers[i]);
    
    
        if ( (avalibleRam>scriptSize) && (getHackingLevel()>=getServerRequiredHackingLevel(servers[i])) && (getServerMaxMoney(servers[i])!==0))
        {
            threads=Math.floor(avalibleRam/scriptSize);
            exec("genhack.script",servers[i],threads,servers[i]);
        }
    }
}