towers=getPurchasedServers();
host=getHostname();
scripts=["grower.script","weaker.script","hacker.script"];
for (i=0;i<towers.length;i++)
{
    scp(scripts, "home", towers[i]);
    if (!isRunning("watchTower.script",host,towers[i]))
    {
        run("watchTower.script",1,towers[i]);
        tprint(towers[i]+" is now online");
    }
}
