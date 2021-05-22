auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();





while(1){

    var  t = mmlauncherui();

    if (t != true) {
        
        toastLog("登录失败");

    }else{
    
        toastLog("[任务]添加好友");
        
        addfriend();
        toastLog("[任务]本次添加好友完成");
        break;
    }

    device.wakeUp();
    device.keepScreenOn();
    device.keepScreenDim();

}


function addfriend(){

	var tag = "[添加朋友]";

    sleep(900);
    var  t = mmlauncherui();
    bounds(216, 222, 432, 366).clickable().click()
    sleep(2000);

    if(text('推荐用户').exists()&& text('全部好友').exists()&& text('好友').exists()){

        toastLog("在好友列表页面");    
   
        sleep(2000);
        toast("加确认好友")
        if(text('加好友请求').exists()&& text('全部').exists()){
            
            sleep(2000);
            click("全部");
            sleep(4000);

            if(text('加好友请求').exists() && desc('返回').exists()){ 
                
                while(1){    
                    
                    sleep(600);
                    click("确认");  
                    sleep(1200);
            
                    if(text('开始对话').exists() && text('发送').exists()){ 
            
                        bounds(36,1116,96,1176).clickable().click()
            
                    } 
                    
                    if(!text('确认').exists()){ 
            
                        toastLog("全部确认完成")
                        back();  
                        break;
            
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

        sleep(2000);
        toast("加推荐好友")


        sleep(900);
        var  t = mmlauncherui();
        bounds(216, 222, 432, 366).clickable().click()
        sleep(2000);

        if(text('推荐用户').exists()&& text('全部好友').exists()&& text('好友').exists()){
            
            sleep(2000);
            click("推荐好友");
            sleep(4000);
            
            if(text('推荐用户').exists() && desc('可能认识').exists()){ 
                var dcr=0;

                while(1){    
                    
                    sleep(600);
                    click("加为好友");  
                    dcr=dcr+1;
                    sleep(3200);
                    
                    if(text('你目前无法发送加好友请求').exists()){ 
            
                        click("确定");  
            
                    } 
                    if(text('无法发送请求').exists()){ 
            
                        click("以后再说");  
                        break;    
                    } 
                    if(!text('加为好友').exists()){ 
                        
                        back();  
                        sleep(2000);
                        click("推荐好友");
                        sleep(4000);

                        if(!text('加为好友').exists()){ 
                            toastLog("全部加为好友完成")
                            back();  
                            break;
                        }
            
                    } 

                    if(dcr>150){ 
            
                        toastLog("全部加为好友完成")
                        back();  
                        break;
            
                    } 
                } 
                 
            }else{
                sleep(600);
                toastLog("不在推荐用户页面");  			   
              
            }

         }else{
            sleep(600);
            toastLog("不在好友界面");  			   
            back();    
        }        
       
    }

 }



















function mmlauncherui(){

    launch("com.facebook.katana");

    sleep(2000);

    var lc=0;

    while(1){

        sleep(5000);
        toast('查找是否在首页');
        sleep(2000);

        if(desc('前往个人主页').exists()&&desc('发消息').exists()&&text('照片').exists()){

            toast('首页');
            return true;
            break;

        }else{

            if(text('人脸识别').exists()&&text('请检查人脸识别设置').exists()){
                desc('"关闭"按钮').findOne().click();
                toast("人脸识别");
                sleep(2000);
            }

            back();
            
            lc=lc+1;

            if (lc > 5){

                //启动
                toast('重新启动');
                launch("com.facebook.katana"); 
                sleep(8000)

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

