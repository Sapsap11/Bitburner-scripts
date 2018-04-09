servers=read("validatedList.txt").split(",");
host=args[0];
serverRam=getServerRam(host)[0]/servers.length;

i=0;
while(true)
{
    if (i===servers.length){i=0}
    if (!(isRunning("weaker.script",host,servers[i])
    ||isRunning("grower.script",host,servers[i])
    ||isRunning("hacker.script",host,servers[i])))
    {
        if (getServerSecurityLevel(servers[i]) > getServerMinSecurityLevel(servers[i])+5)
        {
            exec("weaker.script", host, Math.floor(serverRam/getScriptRam("weaker.script", host)), servers[i]);
        }
        else if (getServerMoneyAvailable(servers[i])<getServerMaxMoney(servers[i])*0.99)
        {
            exec("grower.script", host, Math.floor(serverRam/getScriptRam("grower.script", host)), servers[i]);
        
        }
        else
        {
            exec("hacker.script", host, Math.floor(serverRam/getScriptRam("hacker.script", host)), servers[i]);
        
        }
    }
    i++;
}
