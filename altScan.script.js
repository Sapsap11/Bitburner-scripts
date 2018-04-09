host=getHostname();
forbidden=["home","darkweb"].concat(getPurchasedServers());
scanned=[];
next=scan(host);
i=0;
while (i<next.length)
{
    if (!forbidden.includes(next[i]))
    {
    temp=[].concat(scan(next[i]));
    scanned.push(next[i]);
    for (j=0;j<temp.length;j++)
    {
        if (!scanned.includes(temp[j]))
        {
            next.push(temp[j]);
            
        }
    }
    }
    i++;
}
write("altScan",scanned,"w");