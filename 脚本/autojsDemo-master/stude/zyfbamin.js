while(1){  
	 
    var intent = new Intent();
    intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
    app.startActivity(intent);
    sleep(3000);
    if(textContains('Off').exists()){
        sleep(3000);
        if(text('Off').exists()){
            click('Off',1);
        }  
    }
    if(text('WLAN OFF').exists()){
        click('WLAN OFF');
    }
    if(text('OFF').exists()){
        click('OFF');
    }
    sleep(12000);

    if(textContains('On').exists() || text('WLAN ON').exists() || text('ON').exists()){

        toastLog("打开WIFI成功");
        var fwqbb
        var res=http.get("http://47.111.31.150:8000/lua/fbupdate.htm");
        if(res.statusCode >= 200 && res.statusCode < 300){
            
            fwqbb=res.body.string();
            if(fwqbb=="1"){
            
                toastLog("需要更新");
                var xzfh = http.get("http://47.111.31.150:8000/lua/zyfb.js");
                if (xzfh.statusCode != 200) {
                    toast("请求失败");
                }
                files.ensureDir("/sdcard/script/");
                files.writeBytes("/sdcard/script/zyfb.js", xzfh.body.bytes());
                toastLog("fb.js下载成功");
                break;
    
            }else if(fwqbb=="2"){
                
                toastLog("不需要更新");
                break;	
            }
            
        }else if(res.statusCode == 404){
            toast("页面没找到哦...");
        }else{
            toast("错误: " + res.statusCode + " " + res.statusMessage);
            sleep(9*1000); 
        }
        
    }   

}
		
var path = "/sdcard/script/zyfb.js";
if(!files.exists(path)){
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame>
        <button id="action" text="Start" w="90" h="40" bg="#77ffffff"/>
    </frame>
);

setInterval(()=>{}, 1000);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});

function onClick(){
    if(window.action.getText() == 'Start'){
        execution = engines.execScriptFile(path);
        window.action.setText('Stop');
    }else{
        if(execution){
            execution.getEngine().forceStop();
        }
        window.action.setText('Start');
    }
}


