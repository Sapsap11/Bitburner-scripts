serverList=read("altScan").split(",");
validated=[];
for (i=0;i<serverList.length;i++){
    if (getHackingLevel()>=getServerRequiredHackingLevel(serverList[i]) && getServerMaxMoney(serverList[i])!==0)
    {
        validated.push(serverList[i]);
    }
}
write("validatedList",validated,"w");