name= args[0];
while(true)
{
    if (isRunning('terminate.script', 'home'))
    {
        exit();
    }
    if (getServerSecurityLevel(name) > getServerMinSecurityLevel(name)*5/2)
    {
        weaken(name);
    }
    else if (getServerMoneyAvailable(name)<getServerMaxMoney(name)*0.7)
    {
        grow(name);
    }
    else
    {
        hack(name);
    }
}
