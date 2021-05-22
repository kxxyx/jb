auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim(); 
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();


while(1){

    var taskurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getAccount&imei="+__IMEI;

    var __TASK = aip("[TASK]",taskurl,60);

    var bhid =__TASK.id;
    var uid=__TASK.uid;
    var jg =__TASK.jg;
    var sjid=__TASK.sjid;
    
    toastLog("[TASK]使用人: "+__TASK.remark);
    toastLog("[TASK]微信号: "+__TASK.account);
    toastLog("[TASK]ID: "+bhid);

    toastLog("[任务]添加好友");

    http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&id=" +bhid +"&sjid="+sjid);

     for (i  = 1; i < 3; i++) {
        addfriend(i);
        toastLog("[任务]本次添加好友完成");
        tjphonezt(i);    
    }
    

}


function addfriend(t){

	var tag = "[添加朋友]";
    var conturl="http://"+__SERVER+"/index.php?g=api&m=sj&a=jzwphone&id="+bhid+"&uid="+uid+"&snum="+t;
    var __CONT=aip("['CONTACT']",conturl,10);
    var kywordurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=kyword&id="+uid;
    var kyword=aip("['kyword']",kywordurl,10);
    
    toast("本次添加"+__CONT.length+"个好友"); 

    sleep(900);

	for (i  = 0; i < __CONT.length; i++) {

		str = kyword;
        var n = str.replace("name", __CONT[i]["name"]);
		var bz=getNowFormatDate()+__CONT[i]["name"]+__CONT[i]["number"];

        mmlauncherui(t);

        toast("开始搜索");  
        sleep(900);
        desc("搜索").findOne().click();
        sleep(2600);
        setText(__CONT[i]["number"]);
        sleep(3600);
        className("RelativeLayout").click();
        sleep(4600);
        
        if(currentActivity() == "com.tencent.mm.plugin.profile.ui.ContactInfoUI" && text('添加到通讯录').exists()){

            click("添加到通讯录");
            sleep(2600);
            setText(0,n)  //插入话术
            sleep(600);
            setText(1,bz) //插入备注
            sleep(600);
            click("发送");  
            sleep(2600);
            toastLog("已搜索添加号："+bz);    
            sleep(600);
            //files.append("/sdcard/phone.txt", "已搜索添加号："+bz+"\n"); 
            sleep(600);
            back();
            sleep(600);
            back();

        }else{
            
            sleep(600);
            toastLog("添加号异常或不存在"+bz);    
            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postphonezt&zt=1&number=" +__CONT[i]["number"]);
            sleep(600);
            files.append("/sdcard/phone.txt", "搜索异常或不存在号："+bz+"\n"); 	
            sleep(600);			   
            back();    
        }

        toastLog("等待"+jg+"秒后添加下一个"); 

        var sdr=parseInt(jg);

        while(1){
            
            toast("倒计时"+sdr);
            device.wakeUp();
            device.keepScreenOn();
            device.keepScreenDim(); 
            sleep(2000);
            sdr=sdr-2;
            if(sdr<1){
               break;
            }
            
        }


    }

















}

function mmlauncherui(t){

    launch("com.tencent.mm");

    sleep(4000);

    if(text('微信').exists()&&text('请选择要使用的应用').exists() ){
        click("微信",i-1); 
        sleep(2000);
    }
    var lc=0;

    while(1){

        sleep(2000);
        toast('查找是否在微信首页');
        sleep(1000);

        if(text('微信').exists()&&text('通讯录').exists()&&text('发现').exists()&&text('我').exists()&&desc("更多功能按钮").exists()){

            toast('微信首页');
            return true;
            break;

        }else{

            back();
            
            lc=lc+1;

            if (lc > 5){

                //启动微信
                toast('重新启动微信');
                launch("com.tencent.mm"); 
                sleep(4000);
                if(text('微信').exists()&&text('请选择要使用的应用').exists() ){
                    click("微信",i-1); 
                    sleep(2000);
                }
                sleep(12000)

            }

        }
           
    }





}

function aip(tag,url,slp){

    while(1){

        var res = http.get(url,{
            headers: {
                'Accept-Language': 'zh-cn,zh;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11',
                'contentType':'application/json'}
            });

        if(res.statusCode != 200){
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        }else{
            var getjson = res.body.json();
            if (getjson.status == 0) {

                device.wakeUp();
                device.keepScreenOn();
                device.keepScreenDim(); 

                toast(tag+getjson.info);
                sleep(slp*1000);    
            } 
            if (getjson.status == 1) {
                
                return getjson.info;
                break;

            }
        }
    }

	  



}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function tjphonezt(t){

    var conturl="http://"+__SERVER+"/index.php?g=api&m=sj&a=allphone&id="+bhid+"&uid="+uid+"&snum="+t;

    var __CONT=aip("['ALLPHONE']",conturl,20);
    
    if(__CONT=="sj"){
        return false;
    }

    toastLog("[任务]匹配好友");

    toast("本次匹配"+__CONT.length+"个号码"); 

    sleep(900);

	for (i  = 0; i < __CONT.length; i++) {

        mmlauncherui(t);

        var hm=__CONT[i]["number"];
        var name=__CONT[i]["name"];

        toast("开始搜索");  
        sleep(900);
        desc("搜索").findOne().click();
        sleep(2600);
        setText(hm);
        sleep(4600);

        if(text('联系人').exists()){

            toastLog("已添加成功："+hm); 
            sleep(600);
            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postphonezt&zt=3&number=" +__CONT[i]["number"]);
            sleep(600);

        }else{
            
            sleep(600);
            toastLog("当天未添加成功"+getNowFormatDate()+hm);    
            sleep(600);
            files.append("/sdcard/phone.txt", "未添加成功："+getNowFormatDate()+name+hm+"\n"); 	
            sleep(600);
            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postphonezt&zt=2&number=" +__CONT[i]["number"]);
            sleep(600);			   
        }

        sleep(600);
        back();
        sleep(600);
        back();

    }

    if(t==2){

        http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postusercount&id=" +bhid+"&uid="+uid);
    }
}