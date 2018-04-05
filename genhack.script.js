name= getHostname();
while(true)
{
    if (isRunning('terminate.script', 'home'))
    {
        exit();
    }
    if (getServerSecurityLevel(name) > getServerMinSecurityLevel(name)*3/2)
    {
        weaken(name);
    }
    else if (getServerMoneyAvailable(name)<getServerMaxMoney(name)*0.9)
    {
        grow(name);
    }
    else
    {
        hack(name);
    }
}