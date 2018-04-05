//sets up the needed variables
host=getHostname();
servers=scan(host);
forbiddenServers=["home","darkweb"];
i=0;

while (i<servers.length)
{
    //this should terminate the script if needed
    if (isRunning('terminate.script', 'home'))
    {
        exit();
    }
    
    //this checks that we can actually hack the server, and prevents it from trying to hit a server we already have
    unhackable=getHackingLevel()<getServerRequiredHackingLevel(servers[i])
    if (!(unhackable || isRunning("copycat.script",servers[i]) || servers[i] in forbiddenServers))
    {
    
        //sets up the files for the worm to keep going
        scp("genhack.script", servers[i]);
        scp("attack.script", servers[i]);
        scp("copycat.script",servers[i]);
    
        //gives us root if we don't already have it
        if (!hasRootAccess(servers[i]) && getServerNumPortsRequired(servers[i])<3)
        {
        run("attack.script",1, servers[i]);
        }
    
        //starts copycat on the next node and waits a bit until it starts genhack with as many threads as it can
        exec("copycat.script",servers[i]);
    
    }
    i++;
}
//checks how much ram it can use, kills the script and then runs as many genhacks as it can
avalibleRam=getServerRam(host)[0];
scriptSize=getScriptRam("genhack.script",host);
spawn("genhack.script", Math.floor(avalibleRam/scriptSize), host);
