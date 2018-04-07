towers=["MegaBoi","GigaBoi","UltraBoi","Doombot","Sauron","The-eye","Origin","Singularity"];
host=getHostname();
for (i=0;i<towers.length;i++)
{
scp("grower.script",towers[i]);
scp("weaker.script",towers[i]);
scp("hacker.script",towers[i]);
if (!isRunning("watchTower.script",host,towers[i]))
{
    run("watchTower.script",1,towers[i]);
    tprint(towers[i]+" is now online");
}
}