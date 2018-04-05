//sets up the needed variables
host=getHostname();
servers=scan(host);
forbiddenServers=["home","darkweb"];
i=0;

while (i<servers.length)
{
    //this should terminate the script if needed
    if (isRunning('terminate.script', 'home')){
        exit();
    }
    
    //this checks that we can actually hack the server, and prevents it from trying to hit a server we already have
    if (!(getHackingLevel()<getServerRequiredHackingLevel(servers[i])
    //||isRunning("genhack.script",servers[i])
    ||isRunning("copycat.script",servers[i])
    ||servers[i] in forbiddenServers))
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
avalibleRam=getServerRam(host)[0]-getServerRam(host)[1];
scriptSize=getScriptRam("genhack.script","home");
threads=(avalibleRam-avalibleRam%scriptSize)/scriptSize;
threads=threads-threads%1;
run("genhack.script", threads);