(function InitScript() {
    // 监控多脚本运行情况，防干扰
    let c = engines.all().length;
    if (c > 2) {
        toastLog("脚本引擎：发现多个脚本同时运行，即将杀死所有脚本，请重新运行本脚本！");
        engines.stopAll();
    } else {
        const StartToast = "FB开始运行";
        device.keepScreenOn();
        toast(StartToast);
    }
})();
var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
manager.cancelAll();
auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
if(__IMEI==null){
    while(1){
        toastLog("本机设备信息错误,请重新刷机或更换手机");
        sleep(4000);
    }
}
var __id
var isnormal
var xcbh
var vpnid
var country


     

function mainfb(){

    while(1){ 

    openclosewang("k");

    var taskurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=task&imei="+__IMEI;
    var __TASK = aip("[TASK]",taskurl,20);
    var addfriend=__TASK.addfriend;
    var profile=__TASK.profile;
    var ad=__TASK.ad;
    __id=__TASK.id;
    isnormal=__TASK.isnormal;
    xcbh=__TASK.xcbh;
    vpnid=__TASK.vpnid;
    country=__TASK.country;
    var jz =__TASK.jznumber;
    var sjid=__TASK.sjid;

    toastLog("[getAccount]手机编号: "+sjid);
    toastLog("[getAccount]架子编号: "+jz);
    toastLog("获取任务"+__id);

    if(addfriend==3 && ad==3 && profile==3){
        toastLog("今日任务全部完成");
    }else{
        
        openvpn();

        var  t = mmlauncherui();
        if (t != true) {

            toastLog("未登录");

            var z=login();

            if (z != true) {

                toastLog("登录失败");
                continue; 
            }

        }else{
            

            if(profile==1){
                
                toastLog("[任务]修改资料");
                profiles();
                http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=3&id="+__id);
                toastLog("[任务]修改资料完成");

            }

            if(addfriend==1){

                toastLog("[任务]添加好友");
                toaddfriend();
                http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=1&id="+__id);
                toastLog("[任务]本次添加好友完成");
                
            }

            if(ad==1){
                
                toastLog("[任务]广告");
                ads();
                http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=2&id="+__id);
                toastLog("[任务]本次广告完成");
            }

            Statisticalfriends();
    
        }
        openclosewang("g");
        
    }


    device.wakeUp();
    device.keepScreenOn();
    device.keepScreenDim();
    break;
 
    }
}

function toaddfriend(){

    var tag = "[添加朋友]";
    
    while(1){ 

        sleep(900);
        var  t = mmlauncherui();
        toastLog("点第2好友界面");  
        sleep(2000);  
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(200);  
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(4000);
        if(descContains('一点新捷径').exists()){
            descContains("点击即可关闭对话框").findOne().click();
        }
        if(text('全部好友').exists()){

            toastLog("在好友列表页面"); 

            var m5000="f";   
            drfriend();

            if(m5000=="t"){
                break;
            }
            tjfriend();

            break;

        }else{
            toastLog("右滑到第2好友界面"); 
            scrollDown(1);   
        }
    }
 }


function ads(){ 

    var adurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getad&cid="+country;
    var __myad = aip("[getad]",adurl,10);
    var adid =__myad.id;
    var adtype=__myad.type;
    var adcontent=__myad.content;
    if(adid>0){

        if(adtype==2){
            toastLog("先下载图片");
            downloadappinstall(adcontent,"/sdcard/Download/Browser/1.jpg");  
        }
        if(adtype==3){
            toastLog("先下载视频");
            downloadappinstall(adcontent,"/sdcard/Download/Browser/1.mp4");  
        }

        mmlauncherui();
        sleep(3000);
        if(descContains('点击即可关闭对话框').exists()){
            descContains("点击即可关闭对话框").findOne().click();
        }
        while(1){
            sleep(1200);   
            if(textContains('发贴').exists()){
                textContains('发贴').findOne().click();
                sleep(6000);
                if(text('创建帖子').exists()){

                    if(adtype==1){
                        //发文本
                        var gdr=className("FrameLayout").depth(9).find();
                        if(gdr.length == 0){

                        }else{
                            var b = className("FrameLayout").depth(11).find().get(2).bounds();
                            var w = boundsContains(b.left,b.top,b.right,b.bottom).clickable().findOne();
                            w.click();

                            break;
                        }     
                    }
                    if(adtype==2){
                        //发图片
                    }
                    if(adtype==3){
                        //发视频
                    }
                    if(adtype==4){
                        //分享链接
                    }
                   
                    //提交发的次数
                    http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=6&id="+adid);
                }   
            }else{
                toastLog("找发贴按钮");
            } 



        }


       

    }else{
        toastLog("本号没有广告任务");
    }
}
function profiles(){

    files.removeDir("/sdcard/DCIM/");
    files.removeDir("/sdcard/Pictures/");
    files.removeDir("/sdcard/wdddd/");
    var ar=files.isDir("/sdcard/Download/Browser/");
    if(ar==false){
        files.ensureDir("/sdcard/Download/Browser/");
    }
    clearfiel("/sdcard/Download/Browser/",".jpg");

    var txsurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getProfile&t=1&xcbh="+xcbh;
    var tx = aip("[头像获取]",txsurl,10);
    downloadappinstall(tx,"/sdcard/Download/Browser/1.jpg");
    var bjsurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getProfile&t=2";
    var bjimage = aip("[背景获取]",bjsurl,10);
    downloadappinstall(bjimage,"/sdcard/Download/Browser/2.jpg");

    mmlauncherui();
    sleep(3000);
    if(descContains('点击即可关闭对话框').exists()){
        descContains("点击即可关闭对话框").findOne().click();
    }

    desc("前往个人主页").findOne().click();
    sleep(3000);
    
    while(1){

        if(descContains('点击即可关闭对话框').exists()){
            descContains("点击即可关闭对话框").findOne().click();
        }
        sleep(5000);
        if(descContains('更新个人主页').exists()){
            descContains("关闭").findOne().click();
            sleep(3000);
            click('停止');
        }
        if(textContains('更新个人主页').exists()){
            click('关闭');
            sleep(3000);
            click('停止');
        }
        if(descContains('以后再说').exists()){
            descContains("以后再说").findOne().click();
            sleep(3000);
        }    
        if(descContains('关闭').exists()){
            descContains("关闭").findOne().click();
        }
        if(textContains('方便好友找到你').exists()){
            textContains("方便好友找到你").findOne().click();
        }
        sleep(3000);
        if(text('所在地').exists()){
            break;   
        }else{
            sleep(3000);
            toastLog("请查看是否有东西档住,或者网络不好,我需要在个人资料页面");
        }   
        sleep(5000);    
        
    }

    sleep(5000); 

    while(1){

        sleep(3000);
        if(desc('头像').exists()){
            toastLog("修改头像");
            sleep(4000);
            desc("头像").findOne().click();
            sleep(3000);
            click("选择头像");
            sleep(4000);
            if(text('允许').exists()){  
                click("允许");
            } 
            sleep(2000);
            if(text('选择照片').exists()){

                if(text('允许').exists()){  
                    click("允许");
                } 
                sleep(4000);
                var g=desc("照片").find();
                if(g.length == 0){
                    toastLog("没有找到图片");
                    back();
                }else{
                    g[1].click();
                    sleep(5000);
                    click('保存');
                    sleep(8000);  
                    break; 
                }
                          
            }else{
                back();
            }  
        }else{
            toastLog("请查看是否有东西档住,或者网络不好,我需要在头像页面");
        }
        
    }
    while(1){

        toastLog("修改背景");
        sleep(3000);
        if(text('添加封面照片').exists()){
            sleep(4000);
            if(text('添加封面照片').exists()){
                click("添加封面照片");
            }
            if(descContains('添加封面照片').exists()){
                descContains("添加封面照片").findOne().click();
            }
            sleep(3000);
            click("上传照片");
            sleep(4000);
            if(text('允许').exists()){  
                click("允许");
            } 
            if(text('图库').exists()){
                sleep(4000);
                var zp=desc("照片").find();
                if(zp.length == 0){
                    toastLog("没有找到图片");
                    back();
                }else{
                    zp[0].click();
                    sleep(5000);
                    click('保存');
                    sleep(8000);  
                    break; 
                }
            } 
        }else{
            break;
        }
    }

    var pfurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getpf&cid="+country;
    var __pf = aip("[getpf]",pfurl,10);
    var city =__pf.city;
    var szd=__pf.szd;
    var officed=__pf.officed;
    var ust=__pf.ust;
    

    revisedata("家乡","添加家乡",city);
    revisedata("所在地","添加所在地",szd);
    revisedata("学校","添加大学",ust);
    revisedata("工作地点","添加工作地点",officed);

    back(); 

}
function drfriend(){

    sleep(2000);
    toast("开始加确认好友");
    sleep(3000);

    if(text('加好友请求').exists()&& text('全部').exists()){
        sleep(2000);
        click("全部");
        sleep(4000);
        if(text('加好友请求').exists() && desc('返回').exists()){ 
            
            while(1){

                sleep(600);
                click("确认",0);  
                sleep(400);
                if(text('开始对话').exists()){ 
                    back();  
                    sleep(2200);
                } 
                if(text('无法发送请求').exists()){ 
                    click("确定"); 
                    sleep(600);
                } 
                if(descContains('人上限').exists()){
                    click("确定"); 
                    sleep(600);
                }
                if(textContains('无法添加更多好友').exists()){
                    click("以后再说"); 
                    sleep(600);
                    toastLog("粉丝上限了") 
                    m5000="t"; 
                    break;
                }
                sleep(600);
                if(!text('确认').exists()){ 
                    back();
                    sleep(800);
                    if(!text('确认').exists()){
                        toastLog("全部确认完成")
                        back();  
                        break;
                     }
                   
                }     
            } 
            
        }else{
            sleep(600);
            toastLog("没有确认好友");  			   
        }
    }else{
        sleep(600);
        toastLog("不存在确认好友,去添加好友");  			     
    }



}
function tjfriend(){

    while(1){

        toast("开始加推荐好友")
        sleep(1000);
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(100);
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(5000);

        if(text('全部好友').exists()){ 

            sleep(2000);
            if(text('推荐用户').exists()){
                click("推荐用户");
                sleep(4000); 
                if(text('推荐用户').exists() && desc('可能认识').exists()){ 
                    jia("z");
                }else{
                    back();
                    sleep(600);
                    toastLog("不在推荐用户页面");  			     
                }
            }else{
                jia("y");
            }

            break;

        }else{
            sleep(600);
            toastLog("右滑到第2好友界面"); 
            scrollDown(1);   			     
        } 
    }   

}
function jia(z){


    if(text('确认').exists()){ 
                    
        while(1){  
            sleep(600);
            click("确认",0);  
            sleep(400);
            if(descContains('开始对话').exists()){ 
                back();  
                sleep(1200);
            } 
            if(textContains('开始对话').exists()){ 
                back();  
                sleep(1200);
            } 
            sleep(1200);
            if(text('无法发送请求').exists()){ 
                click("确定"); 
                sleep(600);
            } 
            if(descContains('人上限').exists()){
                click("确定"); 
                sleep(600);
            }
            if(textContains('无法添加更多好友').exists()){
                click("以后再说"); 
                sleep(600);
                toastLog("粉丝上限了") 
                sr="t";
                break;
            }
            if(!text('确认').exists()){ 
                toastLog("在外面的全部确认完成")
                break;
            }    
        }    
    }else{
        sleep(600);
        toastLog("外面没有确认好友");  			   
    }
    var dcr=0;
    var jtjcount=150;
    if(isnormal==1){
        jtjcount=random(40,60);
    }
    var jgsj=4000;
    while(1){    
        
        sleep(600);
        click("加为好友",0);  
        dcr=dcr+1;
        toastLog("添加第"+dcr+"个");
        sleep(jgsj);
        if(text('你目前无法发送加好友请求').exists()){ 
            click("确定");   
        } 
        if(textContains('你暂时无法使用这一功能').exists()){ 
            click("确定");  
            toastLog("当前加粉频率太高修改为5秒");
            jgsj=5000;   
        } 
        if(text('无法发送请求').exists() && text('确定').exists() && text('你似乎不认识这位用户').exists()){ 
            click("确定");  
            break;   
        } 
        if(textContains('无法添加更多好友').exists()){
            click("以后再说"); 
            sleep(600);
            toastLog("粉丝上限了") 
            break;
        }
        if(text('无法发送请求').exists()){ 
            click("以后再说");  
            break;    
        } 
        if(!text('加为好友').exists()){ 
            
            if(z=="z"){
                back();  
                sleep(2000);
                click("推荐好友");
                sleep(4000);
                if(!text('加为好友').exists()){ 
                    toastLog("没有加为好友了,任务完成");
                    back();  
                    break;
                }
            }
            if(!text('加为好友').exists()){ 
                toastLog("没有加为好友了,任务完成"); 
                break;
            }

        } 
 
        if(dcr>jtjcount){ 
            toastLog("今天加粉"+jtjcount+"数量到了,任务完成");
            break;
        } 
    }
}
function login(){

    var taskurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getAccount&imei="+__IMEI;

    var __ACC = aip("[getAccount]",taskurl,10);

    var zh =__ACC.zh;
    var mm=__ACC.mm;

    sleep(2000);
    launch("com.facebook.katana");
    sleep(5000);
    var yfsy=0;
    while(1){
        
        //未登录帐号
        if(text('手机号或邮箱').exists()&&desc('密码').exists()&&desc('登录').exists()){

            sleep(2000);
            setText(0, zh)
            sleep(1000);
            setText(1, mm)
            sleep(2000);
            click('登录');
            sleep(6000);
        }
        if(text('登录失败').exists()){
            
            click('确定');   
        }
         //语言出问题
        if(text('重试').exists()&&text('继续使用美式英语').exists()){

            click("重试");
            sleep(8000);
            continue; 
        }  
        if(text('添加头像').exists()||text('搜索好友').exists()||text('添加好友').exists()){

            if(text('跳过').exists()){
                click('跳过');
            }
            sleep(2000);
            if(text('跳过').exists()){
                click('跳过');
            }
            sleep(4000);

        } 
        if(text('跳过').exists()){
            click('跳过');
        }
        sleep(2000);
        if(text('保存登录信息').exists()){
            
            click('确定');
            sleep(2000);
            return true;
        }
        if(desc('前往个人主页').exists()){
            toast('登录成功');
            return true;
        }
        if(desc('帐户已停用').exists() || textContains('安全验证').exists() || textContains('上传你的照片').exists()){

            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=5&id="+__id);
            toastLog(zh+"[登录]密码错误换新号");
            return false; 
        }
        if(text('密码错误').exists() || text('你输入的是旧密码').exists()){

            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=5&id="+__id);
            toastLog(zh+"[登录]密码错误换新号");
            return false; 
        }

        yfsy=yfsy+1;
        if(yfsy>15){
            yfsy=0;
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana"); 
            sleep(8000);
        }
    } 

}
function mmlauncherui(){

    var lc=0;
    while(1){

        sleep(2000);
        launch("com.facebook.katana");
        sleep(7000);
        toast('打开fb判断状态');
        sleep(1000);
        if(text('允许').exists()){
            click("允许");
        }
        //语言出问题
        if(text('重试').exists()&&text('继续使用美式英语').exists()){
            click("重试");
            sleep(8000);
            continue; 
        }  
        //未登录帐号
        if(text('手机号或邮箱').exists()&&desc('密码').exists()&&desc('登录').exists()){
            sleep(2000);
            toastLog("需要登录");
            return false;
        } 
        if(desc('帐户已停用').exists() || text('安全验证').exists()){
            
            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=5&id="+__id);
            toastLog("[登录]帐户已停用");
            claerapp("com.facebook.katana");
            return false; 

        }
        if(descContains('帐户中有可疑活动').exists()){   

            http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=5&id="+__id);
            toastLog("[登录]帐户中有可疑活动");
            claerapp("com.facebook.katana");
            return false; 
        }
        if(desc('前往个人主页').exists()){

            toast('首页');
            classNameContains("view.View").descContains("第1/").longClickable().findOne().click();
            sleep(200);
            classNameContains("view.View").descContains("第1/").longClickable().findOne().click();
            return true;

        }

        var jsfr=app.getAppName("com.facebook.katana");
         if(jsfr==null){
             toastLog("fb因封号已卸载，请重新安装");
            sleep(3000);
        }

        back();
        lc=lc+1;
        if (lc > 9){

            lc=0;
            toast('重新启动');
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana"); 
            sleep(8000);

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
            openclosewang("k");
            sleep(slp*1000); 
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
            }
        }
    }

	  



}
function stopapp(sappname){
    
    sleep(1000);
    app.openAppSetting(sappname);
    sleep(3000);
    click("强行停止");
    sleep(2000);
    click("确定");
    sleep(4000);

}
function claerapp(sappname){

    sleep(1000);
    app.openAppSetting(sappname);
    sleep(3000);
    click("清除数据");
    sleep(2000);
    click("确定");
    sleep(2000);
    launch("com.facebook.katana"); 
    sleep(8000);

}
function downloadappinstall(url,appanme){

    var xzfh = http.get(url, {
        contentType : "application/vnd.android.package-archive",
        method :"GET", 
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        },
    })

    if (xzfh.statusCode != 200) {
        toast("请求失败");
    }

    files.writeBytes(appanme, xzfh.body.bytes());

    toastLog(appanme+"下载成功");
    
}
function openclosewang(t){

    var intent = new Intent();
    intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
    app.startActivity(intent);
    sleep(5000);

    if(t=="k"){
        if(textContains('关闭').exists()){
            sleep(3000);
            if(text('无线网络').exists()){
                click('无线网络');
            }
            if(text('关闭').exists()){
                click('关闭',0);
            }
            sleep(5000);
            if(text('开启').exists()){
                toastLog("打开WIFI成功");
            }
        }
        if(textContains('开启').exists()){
            toastLog("打开WIFI成功");
        }   
        
    }
    if(t=="g"){

        if(textContains('开启').exists()){
            
            sleep(3000);
            if(text('无线网络').exists()){
                click('无线网络');
            }
            if(text('开启').exists()){
                click('开启',0);
            }
            sleep(5000);
            if(text('关闭').exists()){
                toastLog("关闭WIFI成功");
            }

        } 
        
    }
    
}
function openvpn(){

    launch("com.jj.jiasu");
    sleep(8000);
    var cca=0;
    while(1){  

            if(text('允许').exists()){ 
                click("允许");
                sleep(1000);  
            }
            if(text('忘记密码').exists() && text('注册帐号').exists()　&& text('登录').exists()){ 

                var t1=files.exists("/sdcard/xvpn.txt");

                if(t1==false){

                    toastLog("第一次登录vpn");
                    sleep(2000); 
                    if(text('找到我们').exists() && text('配置').exists()&& text('我的').exists()){ 
            
                        click("我的");
                        sleep(2000); 
                        click("退出此帐号"); 
                        sleep(2000); 
                    }

                    var vpnurl="http://"+__SERVER+"/index.php?g=api&m=sj&a=getvpn&vpnid="+vpnid;
                    var __VPN = aip("[VPN]",vpnurl,10);
                    var vpnzh=__VPN.zh;
                    var vpnmm=__VPN.mm;

                    files.createWithDirs("/sdcard/xvpn.txt");

                    setText(0, vpnzh);
                    toastLog(vpnzh);
                    sleep(2000);
                    setText(1, vpnmm);   
                    sleep(1000); 
                    click("登录");
                    sleep(5000);

                    if(text('在线设备').exists() && text('下线').exists()){ 
                        
                        click("下线"); 
                        sleep(2000);  
                        click("确认"); 
                    }

                    var xf=0;
                    while(1){

                        toastLog("请手动选择高级节点");
                        sleep(1000); 
                        xf=xf+1;
                        if(xf>10){
                            break;
                        }
                    }

                }
                click("登录");
                sleep(5000);
            }    
            if(text('在线设备').exists() && text('下线').exists()){ 
                click("下线"); 
                sleep(2000);  
                click("确认"); 
            }

            if(text('前往查看').exists() && text('取消').exists()){ 
                click("取消"); 
                sleep(2000);  
            }

            if(text('点击连接').exists() && text('配置').exists()){ 
                id("main_button_connect").findOne().click();  
                sleep(4000);  
                if(text('我信任此应用').exists()){
                    click("我信任此应用"); 
                    sleep(2000); 
                    click("确定"); 
                 }
                 if(text('网络连接请求').exists()){
                    sleep(2000); 
                    click("确定"); 
                 }
            }
            if(text('连接成功').exists() && text('配置').exists()){ 
                toastLog("VPN连接成功")
                break; 
            }
            cca=cca+1;
            if (cca > 10){
                cca=0;
                launch("com.jj.jiasu");
                sleep(4000);

            }
    }
}
function Statisticalfriends(){

    while(1){

        back();
        sleep(900);
        back();
        sleep(900);
        launch("com.facebook.katana");
        sleep(2900);
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(200);
        classNameContains("view.View").descContains("第2/").longClickable().findOne().click();
        sleep(4000);
        if(text('全部好友').exists()){
            
            click("全部好友",0);
            sleep(4000);
            if(textContains('位好友').exists()){
                var ss=classNameContains("android.view.View").textContains("位好友").findOne();
                if(ss){
                    var friendnumber=ss.text();
                    toastLog(friendnumber);
                    http.get("http://"+__SERVER+"/index.php?g=api&m=sj&a=postask&t=4&id="+__id+"&friendnumber="+friendnumber);
                    sleep(1000);
                    toastLog("统计好友完成");
                }
            }
        }
        break;
    }


}
function clssnameall(cname,n){
    var b = classNameContains(cname).find().get(n).bounds();
    var w = boundsContains(b.left,b.top,b.right,b.bottom).clickable().findOne();
    w.click();
    sleep(1500);
}
function tydr(){

        sleep(5000);
        clssnameall("TextView",1);
        sleep(2000);
        click("保存");
        sleep(5000);
        desc("关闭").findOne().click();

}
function downloadimages(url){

    app.openUrl(url);
    sleep(8000);
    while(1){

        if(text('我要下载').exists()){ 
            click("我要下载");
        }
        if(desc('我要下载').exists()){ 
            desc("我要下载").findOne().click();
            click("我要下载");
        }
        sleep(6000);
        if(text('下载').exists()){ 
            toastLog("下载图片");
            click("下载");
            break;
        }else{
            var gdr=className("FrameLayout").depth(11).find();
            if(gdr.length == 0){
                toastLog("没有找到下载按钮,网络不太好");
            }else{
                var b = className("FrameLayout").depth(11).find().get(2).bounds();
                var w = boundsContains(b.left,b.top,b.right,b.bottom).clickable().findOne();
                w.click();
                toastLog("下载图片");
                break;
            }  
        }
        sleep(3000);
    }
}
function revisedata(name1,name2,svalue){

    sleep(4000);
    while(1){
        if(desc(name1).exists()){
            toastLog(name1);
            sleep(2000)
            click(name1);
            if(name1=="学校"){
                sleep(2000)
                if(text(name2).exists()){
                    click(name2);
                }
            }
            sleep(6000)
            if(text(name2).exists()){
                clssnameall("Button",1);
                sleep(6000);
                classNameContains("EditText").findOne().setText(svalue);
                tydr();
                break;
            }   
        }
        toastLog("找"+name1+"请滑出"+name1);
        sleep(3000);
    }
}
function clearfiel(sdname,hzm){

	var dir = sdname;
	var jsFiles = files.listDir(dir, function(name){
		return name.endsWith(hzm) && files.isFile(files.join(dir, name));
	});
    if(jsFiles.length > 0){
		for (i = 0; i < jsFiles.length; i++) { 
			files.remove(dir+jsFiles[i]);
			sleep(300);
		}
	}

}
mainfb();