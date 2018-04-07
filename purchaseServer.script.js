i=1;
while(getServerMoneyAvailable("home")>55000*Math.pow(2,i))
{
    i++;
}
i--;
if (prompt("Do you want to buy "+args[0]+" with "+Math.pow(2,i)+" GB ram for "+55000*Math.pow(2,i))){
purchaseServer(args[0],Math.pow(2,i));
}