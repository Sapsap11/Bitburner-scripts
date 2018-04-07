//sets up the needed variables
host=getHostname();
servers=scan(host);
//servers you don't want to hack
forbiddenServers=["home","darkweb"];
//amount of attacking exes you have other than NUKE
attackPossible=4;
for (i=0;i<servers.length;i++)
{
    //this checks that we can actually hack the server, and prevents it from trying to hit a server we already have
    if (!(isRunning("copycat.script",servers[i])||forbiddenServers.includes(servers[i])))
    {
    //sets up the files for the worm to keep going
    killall(servers[i]);
    scp("copycat.script","home",servers[i]);
    scp("getName.script","home",servers[i]);
    //gives us root if we don't already have it
    if (!hasRootAccess(servers[i]) && getServerNumPortsRequired(servers[i])<attackPossible)
    {
    exec("attack.script","home",1, servers[i]);
    }
    
    //starts copycat on the next node
    exec("copycat.script",servers[i]);
    }
}
sleep(10000);
if (!(forbiddenServers.includes(host))){spawn("getName.script",1,host)}
