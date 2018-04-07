readString="";
write("serverList","","w");
while(readString!="NULL PORT DATA")
{
    readString=read(1);
    if(readString!="NULL PORT DATA")
    {
        write("serverList",readString+"&","a");
    }
    else{clear(1)}
}