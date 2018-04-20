servers=read("validatedList.txt").split(",");
host=args[0];
i=0;
serverRam=(getServerRam(host)[0]-getServerRam(host)[1])/servers.length;
minSec=[];
maxMoney=[];
for (i=0;i<servers.length;i++){
    maxMoney.push(getServerMaxMoney(servers[i]));
    minSec.push(getServerMinSecurityLevel(servers[i]));
}
while(true)
{
    if (i===servers.length){i=0}
    if (!(isRunning("weaker.script",host,servers[i])
    ||isRunning("grower.script",host,servers[i])
    ||isRunning("hacker.script",host,servers[i])))
    {
        if (getServerSecurityLevel(servers[i])>minSec[i]+5)
        {
            exec("weaker.script", host, Math.floor(serverRam/getScriptRam("weaker.script", host)), servers[i]);
        }
        else if (getServerMoneyAvailable(servers[i])<maxMoney[i]*0.9)
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
