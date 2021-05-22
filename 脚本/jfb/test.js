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
    <button id="but" w="60dp" h="40dp" text="开始" />
);
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => { }, 500);
//声明一个变量用来控制线程。
var thread = null;
var execution = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.but);
//设置长按事件。
ad.setLongClick(function () {
    //输出气泡信息。
    toast("脚本已关闭");
    //脚本停止代码。
    exit();
});
//设置点击事件。
ad.setClick(function () {
    //输出气泡信息。
    toast("点击");
    //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function () {
            try {
                Main();
            } catch (e) {
                toastLog(e);
            };
            //运行完毕修改按钮文字
            ui.run(() => {
                //在ui线程中修改按钮的文字
                window.but.setText("开始");
            });
        });
    } else {
        thread.interrupt();
        //中断线程;
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("开始");
        });
    };
});


function Main() {

    if (!getMissingPermission()) {
        auto.waitFor();
        toast("已获得无障碍授权");
    } else {
        getPermission(getMissingPermission());
    }
    var path = "/sdcard/script/zdyd.js";
    updates();
    if (execution) {
        execution.getEngine().forceStop();
    }
    execution = engines.execScriptFile(path);

};


function downjs() {
    toastLog("需要更新");
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
            log("网络不可用!等待连接...");
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

