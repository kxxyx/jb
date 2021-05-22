(function () {
    let request = http.request;
    http.request = function () {
        try {
            return request.apply(http, arguments);
        } catch (e) {
            return true;
        }
    }
    var list = engines.all();
    for (var i = 0; i < list.length; i++) {
        for (var j = i + 1; j < list.length; j++) { if (list[i].getSource().toString() == list[j].getSource().toString()) { list[j].forceStop(); }; };
    };
})();
http.__okhttp__.setTimeout(95000);
auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();
device.setBrightnessMode(0);
device.setBrightness(40);
device.setMusicVolume(1);
device.setNotificationVolume(1);
device.setAlarmVolume(1)
sleep(1000)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
var __MODEL = device.model
if (__IMEI == null) { while (1) { toastLog("本机设备信息错误,请重新刷机或更换手机"); sleep(4000); } }
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(2000); }
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }

if (!getMissingPermission()) {
    auto.waitFor();
    toast("已获得无障碍授权");
} else {
    getPermission(getMissingPermission());
}
var path = "/sdcard/script/zdyd.js";
var __SERVER = "47.111.31.150:8000";
updates();
//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件

    this.Click = function () { };

    this.LongClick = function () { };

    //可修改点击长按事件
    this.setClick = function (fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };

    this.setLongClick = function (fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
            //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                    //移动状态清除定时器
                    if (this.Timeout) {
                        //定时器存在则清除定时器。
                        clearTimeout(this.Timeout);
                        this.Timeout = 0;
                    };
                    //移动手指时调整悬浮窗位置
                    window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                };
                return true;
            //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};
//创建并生成一个悬浮窗。
var window = floaty.window(
    //创建一个按钮，并设置其id宽高文字等属性。
    <frame gravity="center">
        <text id="but" bg="#ff0000" textColor="#ffffff" padding="2 0 2 0">开</text>
    </frame>
);
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => { }, 500);
//声明一个变量用来控制线程。
var thread = null;
var execution = null;

if (execution) {
    execution.getEngine().forceStop();
}
window.but.setText("关");
execution = engines.execScriptFile(path);


window.setPosition(0, 0)
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.but);
//设置长按事件。
ad.setLongClick(function () {
    toast("脚本已关闭");
    exit();
});
//设置点击事件。
ad.setClick(function () {

    var lx = window.but.text();

    if (lx == "关") {
        toastLog("停止运行")
        execution.getEngine().forceStop();
        threads.shutDownAll()
        window.but.setText("开");
        execution == null;
    } else {
        toastLog("更新并开始运行")
        threads.start(function () {
            updates();
        });
        window.but.setText("关");
        execution = engines.execScriptFile(path);
    }
});
function downjs() {

    var xzfh = http.get("http://47.111.31.150:8000/lua/zdyd.js");
    if (xzfh.statusCode != 200) {
        toast("请求失败");
    } else {
        files.ensureDir("/sdcard/script/");
        files.writeBytes("/sdcard/script/zdyd.js", xzfh.body.bytes());
        toastLog("更新成功");
        return "t"
    }
}
function updates() {
    while (1) {
        importClass(android.net.ConnectivityManager);
        var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
        var net = cm.getActiveNetworkInfo();
        log(net);
        if (net == null || !net.isAvailable()) {
            toast("网络不可用!等待连接...");
            var intent = new Intent();
            intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
            app.startActivity(intent);
            sleep(5000);
            var a5rad = classNameContains("widget.Switch").depth(14).find();
            if (a5rad.length > 0) {
                toast(a5rad.length);
                var is54wlan = classNameContains("widget.Switch").depth(14).findOne().checked();
                if (is54wlan == false) {
                    var b = classNameContains("widget.Switch").depth(14).findOne().bounds();
                    click(b.centerX(), b.centerY());
                }
            }
            sleep(6000);
        } else {
            log("网络连接可用!");
            var sdvvvr = downjs();
            if (sdvvvr == "t") {
                break;
            }
        }
    }
}
function getMissingPermission() {//获取缺失权限列表
    var result = [];
    if (auto.service == null) result.push("accessibility");//检查无障碍服务
    return result.length > 0 ? result : null;
}
function getPermission(permission) {//根据缺失权限列表，申请授权，每次只进行一种权限的申请

    if (permission.indexOf("accessibility") > -1) {

        try {
            var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
            var Services = enabledServices + ":com.tt.xyr/com.stardust.autojs.core.accessibility.AccessibilityService";
            Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
            Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
            toastLog("成功开启辅助服务");
            auto.waitFor();

        } catch (error) {
            //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant com.tt.xyr android.permission.WRITE_SECURE_SETTING
            //toastLog("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
            //setClip("adb shell pm grant com.tt.xyr android.permission.WRITE_SECURE_SETTINGS");
            auto.waitFor();
        }

        return;
    }
    toast("未知权限，请自行授权\n" + permission);
}
function aip(tag, url, slp) {
    while (1) {
        var res = http.get(url);
        if (res.statusCode != 200) {
            toast("网络请求失败: " + res.statusCode + " " + res.statusMessage);
            openclosewang();
            sleep(slp * 1000);
        } else {
            var getjson = res.body.json();
            if (getjson.status == 0) {
                device.wakeUp();
                device.keepScreenOn();
                device.keepScreenDim();
                toastLog(tag + getjson.info);
                sleep(slp * 1000);
            }
            if (getjson.status == 1) {
                return getjson.info;
            }
        }
    }
}
function openclosewang() {
    while (1) {
        importClass(android.net.ConnectivityManager);
        var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
        var net = cm.getActiveNetworkInfo();
        if (net == null || !net.isAvailable()) {
            toast("当前网络不可用!等待连接...");
            var intent = new Intent();
            intent.setAction("android.settings.WIFI_SETTINGS");
            app.startActivity(intent);
            sleep(5000);
            var a5rad = classNameContains("widget.Switch").depth(14).find();
            if (a5rad.length > 0) {
                var is54wlan = classNameContains("widget.Switch").depth(14).findOne().checked();
                if (is54wlan == false) {
                    var b = classNameContains("widget.Switch").depth(14).findOne().bounds();
                    click(b.centerX(), b.centerY());
                }
            }
            sleep(5000);
        } else {
            toast("网络连接可用!!!");
            break;
        }
    }
}
function rebootkey() {

    powerDialog();
    sleep(3000);
    click("重新启动");
    sleep(3000);
    click(260, 557)
    sleep(2000);
    click(359, 546)

}
function 线程判断是否引擎失效() {
    threads.start(function () {
        var vsum = 0;
        while (true) {
            sleep(1000);
            vsum = vsum + 1;
            if (Number(vsum) % 600 === 0) {
                toastLog("定时检查引擎情况")
                var taskurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getrebootyxtime&imei=" + __IMEI;
                var __TASK = aip("[TASK]", taskurl, 20);
                var isroot = __TASK.isroot;
                if (isroot == 1) {
                    toastLog("子线程断了,或者是引擎坏了")
                    rebootkey()
                    rebootkey()
                    break;
                }
            }
        }
    });
}

