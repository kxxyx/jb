device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();
device.setBrightnessMode(0);
device.setBrightness(60);
if (!getMissingPermission()) {
    auto.waitFor();
    toast("已获得无障碍授权");
} else {
    getPermission(getMissingPermission());
}
var path = "/sdcard/script/yfb.js";
if (!files.exists(path)) {
    toast("第一次使用,更新到最新");
    updates();
}

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
    <linear layout_width="match_parent" layout_height="wrap_content" background='#ff000000'  >
        <button id="but" background='#ffff0000' layout_width="0pt" layout_height="match_parent" layout_weight='1' gravity="center" textSize="18dp" textColor="white" style="Widget/AppCompat.Button.Borderless" text='开始'
        />
        <button id="up" background='#ff0000ff' layout_width="0pt" layout_height="wrap_content" layout_weight='1' gravity="center" textSize="18dp" textColor="white" style="Widget/AppCompat.Button.Borderless" text='更新'
        />
    </linear>
);
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
w = Math.floor(device.width / 3);
h = Math.floor(device.height / 4);
window.setSize(w, h);
var execution = null;
setInterval(() => { }, 500);
var ad = new 悬块(window, window.but);
ad.setLongClick(function () {
    engines.stopAll();
});
ad.setClick(function () {
    if (window.but.getText() == '开始') {
        execution = engines.execScriptFile(path);
        window.but.setText('结束');
    } else {
        if (execution) {
            execution.getEngine().forceStop();
        }
        window.but.setText('开始');
    }
});
var up = new 悬块(window, window.up);
up.setClick(function () {
    window.but.setText('开始');
    var thread = threads.start(function () {
        updates();
    });
});

function downjs() {
    var fwqbb
    var res = http.get("http://47.111.31.150:8000/lua/fbupdate.htm");
    if (res.statusCode >= 200 && res.statusCode < 300) {
        fwqbb = res.body.string();
        if (fwqbb == "1") {
            toastLog("需要更新");
            var xzfh = http.get("http://47.111.31.150:8000/lua/yfb.js");
            if (xzfh.statusCode != 200) {
                toast("请求失败");
            }
            files.ensureDir("/sdcard/script/");
            files.writeBytes("/sdcard/script/yfb.js", xzfh.body.bytes());
            toastLog("更新成功");
            return "t"

        } else if (fwqbb == "2") {
            toastLog("不需要更新");
            return "t"
        }
    } else if (res.statusCode == 404) {
        toast("页面没找到哦...");
        return "f"
    } else {
        toast("错误: " + res.statusCode + " " + res.statusMessage);
        sleep(9 * 1000);
        return "f"
    }
}
function updates() {
    while (1) {
        importClass(android.net.ConnectivityManager);
        var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
        var net = cm.getActiveNetworkInfo();
        log(net);
        if (net == null || !net.isAvailable()) {
            toastLog("网络不可用!等待连接...");
            var intent = new Intent();
            intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
            app.startActivity(intent);
            sleep(5000);
            if (text('Off').exists()) {
                click('OFF');
            }
            if (text('OFF').exists()) {
                click('OFF');
            }
            if (text('WLAN OFF').exists()) {
                click('WLAN OFF');
            }
            var a5rad = classNameContains("widget.Switch").depth(12).find();
            if (a5rad.length > 0) {
                var is54wlan = classNameContains("widget.Switch").depth(12).findOne().checked();
                if (is54wlan == false) {
                    var b = classNameContains("widget.Switch").depth(12).findOne().bounds();
                    Tap(b.centerX(), b.centerY());
                }
            }
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
            toastLog("网络连接可用!");
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
            var pref = android.preference.PreferenceManager.getDefaultSharedPreferences(context);
            pref.edit().putBoolean("key_enable_accessibility_service_by_root", true).commit();
            toast("启用无障碍服务,已root会自动开启无障碍服务");
            auto.waitFor();
        } catch (e) { };
        return;
    }
    toast("未知权限，请自行授权\n" + permission);
}