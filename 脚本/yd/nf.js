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
device.setBrightness(30);
device.setMusicVolume(1);
device.setNotificationVolume(1);
device.setAlarmVolume(1)
sleep(1000)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
toastLog("当前版本" + getVerName("com.tt.xf"))
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
var __MODEL = device.model
if (__IMEI == null) { while (1) { toastLog("本机设备信息错误,请重新刷机或更换手机"); sleep(4000); } }
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(2000); }
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }
var sjid, searchnumber, gid, sxswitch
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
    <button id="but" w="60dp" h="40dp" text="开始" />
);
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => { }, 500);
//声明一个变量用来控制线程。
var thread = null;
var execution = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.but);

window.setPosition(0, 0)
//设置长按事件。
ad.setLongClick(function () {
    //输出气泡信息。
    toast("脚本已关闭");
    //脚本停止代码。
    exit();
});
//设置点击事件。
ad.setClick(function () {
    startmain()
});

startmain()

function startmain() {

    var lx = window.but.text();

    if (lx == "停止") {

        thread.interrupt();
        threads.shutDownAll()
        window.but.setText("开始");

    } else {

        window.but.setText("停止");
        thread = threads.start(function () {
            try {
                Main();
            } catch (e) {
            };
        });
    };
}
function Main() {

    var appurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=updateapp";
    var __TASK = aip("[UAPP]", appurl, 20);
    var v = __TASK.v;
    var vurl = __TASK.vurl;
    var mes = __TASK.mes;
    var dsn = getVerName("com.tt.xf")
    if (dsn < v) {
        toastLog("版本更新" + mes)
        downloadappinstall(vurl, v)
    }
    mainfb()
};
function getVerName(package_name) {
    let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
    for (let i in pkgs) {
        if (pkgs[i].packageName.toString() === package_name) return pkgs[i].versionName;
    }
}
function downloadappinstall(appdownurl, v) {

    apk路径 = "/sdcard/Download/xf.apk";

    toastLog("开始下载更新" + v + "版本......");

    while (1) {
        var res = http.get(appdownurl);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            files.writeBytes(apk路径, res.body.bytes());
            sleep(2000);
            toastLog("下载成功开始自动安装");
            //app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(appanme))));
            break;

        } else if (res.statusCode == 404) {
            toast("页面没找到哦...");
        } else {
            toast("下载错误: " + res.statusCode + " " + res.statusMessage);
        }
    }
    sleep(2500);
    app.startActivity({
        data: "file://" + apk路径,
        type: "application/vnd.android.package-archive",
        action: "VIEW",
        flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
    })
    var azcs = 1;
    while (1) {

        sleep(4500)
        tdclick("t", "不再提示")
        sleep(1500)
        tdclick("t", "允许")
        sleep(3500)

        if (text('更新').exists() || desc('更新').exists()) {
            toast("有更新")
            var sbbb = text("更新").findOne().bounds()
            if (sbbb) {
                click(Number(sbbb.left), Number(sbbb.top));
                sleep(5500)
            }
        }
        if (textContains('我已充分').exists()) {
            toast("我已充分了解")
            var sbbb = textContains("我已充分").findOne().bounds()
            if (sbbb) {
                click(Number(sbbb.left), Number(sbbb.top));
            }
            sleep(4500)
        }
        if (text('继续安装').exists()) {
            click("继续安装");
            sleep(1500)
            break
        }
        if (text('安装').exists()) {
            toast("直接安装")
            click("安装");
            sleep(1500)
            break
        }
        azcs = azcs + 1
        if (azcs > 5) {
            sleep(2500);
            app.startActivity({
                data: "file://" + apk路径,
                type: "application/vnd.android.package-archive",
                action: "VIEW",
                flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
            })
        }
        if (azcs > 8) {
            toastLog("安装次数太多, 直接使用当前版本")
            break
        }
    }
    sleep(8000)
    back();
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
function mainfb() {

    while (1) {

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=task&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 20);
        var yh = __TASK.yh;
        var search = __TASK.search;
        var fsp = __TASK.fsp;
        var zl = __TASK.zl;
        var sx = __TASK.sx;
        sjid = __TASK.sjid;
        gid = __TASK.gid;
        searchnumber = __TASK.searchnumber;
        sxswitch = __TASK.sxswitch
        toastLog("[getAccount]手机编号: " + sjid);

        if (yh == 1) {
            home();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=9&id=" + sjid);
            toastLog("[任务]养号");
            startfun(nyh)
            home();
        }
        if (search == 1) {
            home();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=2&id=" + sjid);
            toastLog("[任务]搜索关注");
            startfun(nsearch)
            backindex()
            home();
        }
        if (fsp == 1) {
            home();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=1&id=" + sjid);
            toastLog("[任务]发视频");
            startfun(nfsp)
            backindex()
            home();
        }
        if (zl == 1) {
            home();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=4&id=" + sjid);
            toastLog("[任务]修改资料");
            startfun(xgzl)
            backindex()
            home();
        }
        if (sx == 1) {
            home();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=5&id=" + sjid);
            toastLog("[任务]自动私信");
            startfun(PersonalMessage)
            backindex()
            home();
        }
        for (i = 0; i < 30; i++) {
            toastLog("等待新任务......已等待" + (i * 10) + "秒")
            sleep(10 * 1000);
            device.wakeUp();
            device.keepScreenOn();
            device.keepScreenDim();
        }
    }
}
function backindex() {
    var wc = 1
    stopapp()
    while (true) {
        isapplunch()
        sleep(3000)
        if (desc("搜索").exists() && text("消息").exists()) {
            if (text('首页').exists()) {
                tdclick("t", "首页");
                sleep(1500)
            } else {
                click(60, 1673)
            }
            break;
        } else {
            sleep(1000)
            back()
            sleep(1000)
            back()
            sleep(1000)
        }
        tdclick("t", "首页");
        wc = wc + 1
        if (wc > 10) {
            break;
        }
    }
}
function aip(tag, url, slp, num) {
    var zs = 1;
    while (1) {
        var res = http.get(url);
        if (res.statusCode != 200) {
            toast("网络请求失败: " + res.statusCode + " " + res.statusMessage);
            openclosewang();
            sleep(slp * 1000);
        } else {
            var getjson = res.body.json();
            if (getjson.status == 0) {
                zs = zs + 1
                device.wakeUp();
                device.keepScreenOn();
                device.keepScreenDim();
                toastLog(tag + getjson.info);
                sleep(slp * 1000);
                if (num) {
                    if (zs > num) {
                        return false;
                    }
                }
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
function lineDown(randomMin, randomMax, y) {

    if (y == "x") {

        var ctim = random(600, 900);

        var y2 = random(300, 500);
        var gdz = device.width;
        var x2 = random(gdz - 60, gdz);
        var x1 = random(20, 80);
        swipe(x2, y2, x1, y2, ctim);

    } else {

        var ctim = random(600, 900);
        var x2 = random(300, 500);
        var gdz = device.height - 320;
        var y2 = random(gdz - 300, gdz);
        var y1 = random(80, 110);
        swipe(x2, y2, x2, y1, ctim);

    }
    let delayTime = random(randomMin, randomMax);

    if (delayTime > 15000) {
        var ttt = 0
        while (1) {
            sleep(1000);
            ttt = ttt + 1000;
            if (ttt % 5000 === 0) {
                var lstime = Number(ttt / 1000);
                if (lstime) {
                    toastLog("已等待" + lstime + "秒")
                }
            }
            if (ttt >= delayTime) {
                sleep(1200);
                break;
            }
        }
    } else {
        sleep(delayTime)
    }
    isapplunch()
}
function loginapp() {

    stopapp()
    var lc = 1;
    var loginthread = threads.start(function () {
        while (true) {
            isapplunch()
            sleep(3000)
            if (desc("搜索").exists() && text("消息").exists()) {
                if (text('首页').exists()) {
                    tdclick("t", "首页");
                    sleep(1500)
                } else {
                    click(60, 1673)
                }
                break;
            } else {
                sleep(1000)
                back()
                sleep(2000)
            }
        }
    });
    while (true) {
        sleep(1000)
        tdclick("t", "允许");
        sleep(1000)
        tdclick("t", "稍后");
        sleep(1000)
        tdclick("t", "确定");
        sleep(1000)
        tdclick("t", "首页");
        sleep(1000)
        tdclick("t", "始终允许");
        sleep(1000)
        tdclick("t", "以后再说");
        sleep(1000)
        tdclick("t", "暂时不要");
        sleep(1000)
        if (text("一键同步").exists() || desc("一键同步").exists()) {
            click(899, 471)
        }
        sleep(1000)
        tdclick("t", "留在抖音")
        sleep(1200)

        if (text('朋友推荐').exists()) {
            back()
            sleep(1500)
        }
        sleep(600)
        if (desc('关闭').exists()) {
            tdclick("d", "关闭")
            sleep(1500)
        }
        sleep(1000)
        tdclick("t", "我知道了");
        sleep(1000)
        tdclick("t", "放弃");
        sleep(1000)
        if (textContains('无响应').exists()) {
            if (textContains('确定').exists()) {
                var p = textContains('确定').findOne().bounds();
                click(p.left, p.top);
            }
            if (textContains('关闭应用').exists()) {
                var p = textContains('关闭应用').findOne().bounds();
                click(p.left, p.top);
            }
            app.launch("com.ss.android.ugc.aweme")
            sleep(5000)
        }
        lc = lc + 1;

        toastLog("检查第" + lc + "次登录是否成功")

        if (lc % 8 === 0) {
            stopapp()
            sleep(6000)
            app.launch("com.tt.xf");
            sleep(2000)
            app.launch("com.ss.android.ugc.aweme");
            sleep(5000)
        }
        var adfd = loginthread.isAlive();
        if (adfd == false) {
            toastLog("登录成功")
            loginthread.interrupt();
            break;
        }
    }
}
function isapplunch() {
    packagename = "com.ss.android.ugc.aweme"
    sleep(2000)
    if (currentActivity().search(packagename) == -1) {
        app.launch(packagename);
        sleep(4000);
    }
}
function getVerName(package_name) {
    let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
    for (let i in pkgs) {
        if (pkgs[i].packageName.toString() === package_name) return pkgs[i].versionName;
    }
}
function stopapp(pan) {
    if (pan) {
        var pans = pan;
    } else {
        var pans = "com.ss.android.ugc.aweme"
    }
    sleep(2200);
    app.openAppSetting(pans);
    sleep(4000);
    if (!text("强行停止").exists()) {
        back()
    }
    sleep(1200);
    tdclick("t", "强行停止")
    click("强行停止")
    sleep(1000);
    tdclick("t", "确定")
    click("确定")
    sleep(4000);
}
function 互动(type) {

    if (type == "点赞") {

        var dzl = random(1, 100)
        if (dzl > 90) {
            return true
        }
    }
    if (type == "关注") {
        var gzl = random(1, 100)
        if (gzl > 98) {
            return true
        }
    }
    if (type == "评论") {
        var pll = random(1, 100)
        if (pll > 90) {
            return true
        }

    }

}
function tdclick(t, code) {

    var p = null;

    if (t == "t") {
        if (text(code).exists()) {
            p = text(code).findOne().bounds();
        }
    }
    if (t == "d") {
        if (desc(code).exists()) {
            p = desc(code).findOne().bounds();
        }
    }
    if (t == "tc") {
        if (textContains(code).exists()) {
            p = textContains(code).findOne().bounds();
        }
    }
    if (t == "dc") {
        if (descContains(code).exists()) {
            p = descContains(code).findOne().bounds();
        }
    }
    if (t == "id") {
        if (id(code).exists()) {
            p = id(code).findOne().bounds();
        }
    }

    if (p != null) {
        toast("点击文字或id：" + code)
        var x, y;
        if (Number(p.centerX()) > 0) {
            x = Number(p.centerX());
        } else {
            x = Number(p.left + (p.left * 0.1))
        }
        if (Number(p.centerY()) > 0) {
            y = Number(p.centerY());
        } else {
            y = Number(p.top + (p.top * 0.3))
        }
        click(x, y);
        sleep(800)
    }

}
function nyh() {

    loginapp();

    var dssp = random(40, 60)

    toastLog("本次养号需要看" + dssp + "个视频");

    for (i = 1; i < dssp; i++) {

        lineDown(15000, 20000);

        toastLog("第" + i + "个视频");

        if (i > 33) {
            click("朋友")
        }
        sleep(1200)
        if (text('我知道了').exists()) {
            click('我知道了')
        }
        sleep(1200)
        if (textContains("广告").exists()) {
            lineDown(1500, 2000);
        }
        sleep(1200)
        if (text('去看看').exists()) {
            click('去看看')
            sleep(1500)
            back()
        }
        sleep(1200)
        if (text('开心收下').exists()) {
            click('开心收下')
            sleep(1500)
        }
        sleep(1200)
        if (text('以后再说').exists()) {
            click("以后再说");
            sleep(1500)
        }
        sleep(1200)
        if (desc('关闭').exists()) {
            tdclick("d", "关闭")
            sleep(1500)
            tdclick("t", "退出")
        }
        let diparr = ["人民日报", "四川观察", "央视新闻", "中国消防", "新闻联播", "人民网"]
        let vindex = 0;
        for (ia = 0; ia < diparr.length; ia++) {
            if (textContains(diparr[ia]).exists()) {
                vindex = 1;
                break
            }
        }
        sleep(1200)
        var z = 互动("点赞")
        if (z || vindex == 1) {
            sleep(2000)
            if (desc("关注").exists() && !text("点击进入直播间").exists()) {
                toastLog("点赞")
                sleep(2000)
                var zdx = random(400, 600)
                var zdy = random(600, 800)
                press(zdx, zdy, 100)
                sleep(100)
                press(zdy, zdy, 100)
                sleep(2000)
            }
        }
        var z = 互动("关注")
        if (z || vindex == 1) {
            if (desc("关注").exists()) {
                for (i = 0; i < desc("关注").find().length; i++) {
                    var zxzb = desc("关注").find().get(i).bounds();
                    if (Number(zxzb.top) > 220) {
                        toastLog("关注")
                        click(Number(zxzb.left), Number(zxzb.top))
                        break
                    }
                }
            }
        }

        if (i % 8 === 0) {
            toastLog("单击首页更新")
            if (text("首页").exists()) {
                sleep(1200)
                var zxzb = text("首页").findOne().bounds();
                click(Number(zxzb.left), Number(zxzb.top))
                sleep(4000)
            } else {
                sleep(1200)
                click(160, 1673)
                sleep(4000)
            }
        }
    }

}
function pl() {

    sleep(1200)
    toastLog("找评论按钮")
    sleep(2000)
    if (descContains("评论").exists()) {

        for (i = 0; i < descContains("评论").find().length; i++) {
            var zxzb = descContains("评论").find().get(i).bounds();
            if (Number(zxzb.top) > 220) {
                toastLog("方式1")
                click(Number(zxzb.left), Number(zxzb.top))
                break
            }
        }

    } else if (text("分享").exists()) {
        toast("方式2")
        var spsl = text("分享").find().length
        if (spsl > 2) {
            var tsgb = text("分享").find().get(spsl - 2).bounds()
            if (tsgb) {
                click(tsgb.centerX(), tsgb.centerY() - 150)
                sleep(3000)
            }
        } else {
            if (textContains("合集").exists()) {
                click(930, 830)
            } else {
                click(930, 950)
            }
        }
    } else {
        toast("方式3")
        if (textContains("合集").exists()) {
            click(930, 830)
        } else {
            click(930, 950)
        }
    }
}
function startfun(sfun) {

    var rebootthread = threads.start(function () {
        sfun()
    });

    while (true) {
        sleep(800)
        if (text("填写抖音号").exists()) {
            sleep(800);
            tdclick("t", "完成")
        }
        sleep(800)
        if (text("填写昵称").exists()) {
            back()
        }
        sleep(800)
        tdclick("t", "稍后");
        sleep(800)
        tdclick("t", "暂时不要");
        sleep(800)
        tdclick("t", "确定");
        sleep(800);
        tdclick("t", "以后再说")
        sleep(800);
        tdclick("t", "知道了")
        sleep(800);
        tdclick("t", "始终允许")
        sleep(800);
        tdclick("t", "允许")
        sleep(800);
        tdclick("t", "同意")
        sleep(1000)
        if (text("一键同步").exists() || desc("一键同步").exists()) {
            click(899, 471)
        }
        sleep(1000)
        tdclick("t", "留在抖音")
        sleep(1200)
        if (textContains('无响应').exists()) {
            if (textContains('确定').exists()) {
                var p = textContains('确定').findOne().bounds();
                click(p.left, p.top);
            }
            if (textContains('关闭应用').exists()) {
                var p = textContains('关闭应用').findOne().bounds();
                click(p.left, p.top);
            }
            app.launch("com.ss.android.ugc.aweme")
            sleep(5000)
        }
        sleep(800);
        var tadfd = rebootthread.isAlive();
        if (tadfd == false) {
            rebootthread.interrupt();
            break;
        }

    }

}
function nsearch() {

    loginapp();

    toastLog("关注前看几个视频")

    var gzqsp = random(3, 6)
    for (h = 1; h < gzqsp; h++) {
        lineDown(10000, 20000);
    }

    searchlike()

    likenumber()
}
function nfsp() {

    toastLog("发视频")

    files.removeDir("/sdcard/DCIM/Camera/")
    files.ensureDir("/sdcard/Moives/")
    var apk路径 = "/sdcard/Moives/1.mp4";
    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=gettitle&gid=" + gid;
    var __Getvideo = aip("[Getvideo]", taskurl, 20);
    var title = __Getvideo.title;
    var type = __Getvideo.type;
    var mimg = __Getvideo.imgurl;
    if (title && type) {

        if (type == "video") {
            var videourl = "http://" + __SERVER + "/data/upload/" + __Getvideo.videourl;
            toastLog("开始下载视频......");
            while (1) {
                var res = http.get(videourl);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    files.writeBytes(apk路径, res.body.bytes());
                    sleep(2000);
                    toastLog("视频下载成功");
                    app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(apk路径))));
                    break;
                } else if (res.statusCode == 404) {
                    toast("页面没找到哦...");
                } else {
                    toast("下载错误: " + res.statusCode + " " + res.statusMessage);
                }
            }
        }

        if (type == "img") {

            if (mimg.length > 0) {
                for (i = 0; i < mimg.length; i++) {
                    toastLog("正下载图片" + mimg[i] + "第" + i + "张...");
                    let imgurl = "http://" + __SERVER + "/data/upload/" + mimg[i];
                    var img = images.load(imgurl);
                    if (img != null) {
                        images.save(img, "/sdcard/DCIM/" + i + ".jpg", "jpg", 100);
                        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/" + i + ".jpg"))));
                    }
                }
            }
        }

    }

    while (1) {

        stopapp("com.lemon.lv")
        sleep(2000)
        app.launch("com.tt.xf");
        sleep(2000)
        app.launch("com.lemon.lv");
        sleep(9000);
        tdclick("t", "同意")
        sleep(2000)
        tdclick("t", "完成")
        sleep(2000)
        tdclick("t", "剪辑")
        sleep(2000)
        if (text("开始创作").exists()) {
            tdclick("t", "开始创作")
            sleep(4000)
            sleep(1000)
            tdclick("t", "始终允许")
            sleep(3000)

            if (type == "video") {
                tdclick("t", "视频")
                sleep(3000)
                if (id("iv_local_multi_media_select").exists()) {
                    tdclick('id', "iv_local_multi_media_select")
                }
            }
            if (type == "img") {

                tdclick("t", "照片")
                sleep(3200)
                if (id("iv_local_multi_media_select").exists()) {
                    var ir = id("iv_local_multi_media_select").find()
                    if (ir) {
                        for (ri = 0; ri < 3; ri++) {
                            var pa = ir.get(ri).bounds()
                            if (pa) { click(pa.centerX(), pa.centerY()) }
                            sleep(2000)
                        }
                    }
                }
            }

            sleep(2000)
            tdclick("id", "sb_media_select_done")
            sleep(4000)
            toastLog("开始剪辑")
            sleep(2000)
            tdclick("t", "关闭原声")
            sleep(2000)
            tdclick("t", "音频")
            sleep(4000)
            tdclick("t", "音乐")
            sleep(4000)
            if (textContains("添加音乐").exists()) {
                click(741, 800)
                sleep(4000)
                var eeeer = random(2, 5)
                for (ri = 2; ri < eeeer; ri++) {
                    sleep(1000)
                    var ar = random(400, 700)
                    swipe(ar, device.height - 200, ar, 420, 600);
                    sleep(2000)
                }
                sleep(2200)
                if (textContains(":").exists()) {
                    var sytop = 0;
                    for (i = 0; i < textContains(":").find().length; i++) {
                        var zxzb = textContains(":").find().get(i).bounds();
                        var tl = textContains(":").find().get(i).text();
                        if (Number(zxzb.top) > 220) {
                            click(Number(zxzb.left), Number(zxzb.top))
                            sytop = zxzb.top
                            break
                        }
                    }
                    sleep(9000)
                    if (sytop > 0) {
                        sleep(2200)
                        var img = captureScreen();
                        var point = images.findMultiColors(img, "#fe2c55", [[47, -9, "#fe2c55"], [121, 21, "#fe2c55"], [68, 60, "#fe2c55"]], {
                        });
                        if (point) {
                            click(point.x, point.y)
                        }
                    }
                }
            }
            if (textContains("添加音乐").exists()) {
                back()
                sleep(4000)
            }
            if (textContains("添加音乐").exists()) {
                back()
                sleep(4000)
            }

            sleep(2000)
            tdclick("d", "back_to_level1")
            sleep(2000)

            if (type == "video") {

                sleep(1000)
                swipe(980, 1165, 540, 1165, 600);
                sleep(2000)
                tdclick("t", "剪辑")
                sleep(1000)
                tdclick("t", "分割")
                sleep(1000)
                swipe(530, 1165, 320, 1165, 600);
                sleep(2000)
                tdclick("t", "剪辑")
                sleep(1000)
                tdclick("t", "分割")
                sleep(2000)
                click(483, 1165)
                sleep(1000)
                tdclick("t", "删除")
                sleep(2000)

                sleep(2000)
                tdclick("d", "back_to_level1")
                sleep(3000)
                tdclick("t", "特效")
                sleep(5000)
                var arr = [42, 303, 564, 828]
                var index = Math.floor((Math.random() * arr.length));
                click(arr[index], 1093)
                sleep(4000)
                if (id("btnOk").exists()) {
                    tdclick("id", "btnOk")
                } else {
                    click(954, 940)
                }
                sleep(3000)
                tdclick("d", "back_to_level2")
                sleep(2000)
                tdclick("d", "back_to_level1")
                sleep(2000)


                sleep(2000)
                swipe(980, 1165, 500, 1165, 600);
                sleep(2000)
                click(483, 1165)
                sleep(2000)
                tdclick("t", "分割")
                sleep(2000)
                click(740, 1165)
                sleep(1000)
                tdclick("t", "删除")
                sleep(3000)


                click(483, 1305)
                sleep(2000)
                if (text("分割").exists()) {
                    tdclick("t", "分割")
                } else {
                    sleep(2000)
                    click(740, 1220)
                    sleep(1000)
                    tdclick("t", "分割")
                }
                sleep(2000)
                click(740, 1220)
                sleep(1000)
                tdclick("t", "删除")
                sleep(2000)


                sleep(2000)
                click(400, 1165)
                sleep(2000)

                sleep(2200)
                swipe(1000, 1702, 200, 1702, 600);
                sleep(2000)
                swipe(1000, 1702, 200, 1702, 600);
                sleep(2000)
                swipe(1000, 1702, 200, 1702, 600);
                sleep(2000)
                swipe(1000, 1702, 200, 1702, 600);
                sleep(4000)
                tdclick("t", "倒放")
            }
            if (type == "img") {

                sleep(1000)
                swipe(1000, 1165, 340, 1165, 600);
                sleep(2000)
                sleep(1000)
                tdclick("d", "back_to_level1")
                sleep(3000)
                tdclick("t", "特效")
                sleep(5000)
                var arr = [42, 303, 564, 828]
                var index = Math.floor((Math.random() * arr.length));
                click(arr[index], 1093)
                sleep(4000)
                if (id("btnOk").exists()) {
                    tdclick("id", "btnOk")
                } else {
                    click(954, 940)
                }
                sleep(3000)
                tdclick("d", "back_to_level2")
                sleep(2000)
                tdclick("d", "back_to_level1")
                sleep(2000)
                sleep(2000)
                swipe(1000, 1165, 300, 1165, 600);
                sleep(2000)

                click(483, 1305)
                sleep(2000)
                if (text("分割").exists()) {
                    tdclick("t", "分割")
                } else {
                    sleep(2000)
                    click(740, 1220)
                    sleep(1000)
                    tdclick("t", "分割")
                }
                sleep(2000)
                click(740, 1220)
                sleep(1000)
                tdclick("t", "删除")
                sleep(2000)
            }
            sleep(16000)
            var dnum = 1
            while (1) {
                sleep(3000)
                if (text("完成").exists()) {
                    break
                } else {
                    tdclick("t", "导出")
                    toastLog("等了..." + dnum + "次")
                    dnum = dnum + 1;
                    if (dnum > 15) {
                        toastLog("等了太久，可能软件剪映崩溃,重新剪")
                        break;
                    }

                }
            }
            if (text("完成").exists()) {
                toastLog("剪视频完成去发送到抖音中...")
                tdclick("t", "抖音")
                break
            }
        } else {
            back()
            sleep(2000)
            tdclick("t", "始终允许")
        }
    }
    sleep(2000)
    while (1) {
        sleep(random(5000, 8000))
        if (text("下一步").exists()) {
            var d = text("下一步").findOne().bounds()
            if (d) {
                click(d.left, d.top)
            }
        }
        sleep(random(5000, 8000))
        if (textContains("写标题").exists() && text("发布").exists()) {
            setText(title)
            sleep(random(5000, 9000))
            break
        }
        isapplunch()
    }
    sleep(random(3000, 6000))
    if (text("西瓜视频").exists()) {
        tdclick("t", "西瓜视频")
    } else {
        if (text("今日头条").exists()) {
            tdclick("t", "今日头条")
        }
    }
    sleep(random(3000, 6000))
    if (text("发布").exists()) {
        var d = text("发布").find().get(1).bounds()
        if (d) {
            click(d.left, d.top)
        }
    }
    for (i = 0; i < 5; i++) {
        toastLog("等待上传完成" + (i * 10) + "秒")
        sleep(10 * 1000);
        device.wakeUp();
        device.keepScreenOn();
        device.keepScreenDim();
        sleep(random(3000, 6000))
        if (text("一键同步").exists() || desc("一键同步").exists()) {
            click(899, 471)
        }
        sleep(random(3000, 6000))
        tdclick("t", "留在抖音")
        sleep(1200)
    }
    sleep(random(3000, 6000))
    if (text("一键同步").exists() || desc("一键同步").exists()) {
        click(899, 471)
    }
    sleep(random(3000, 6000))
    tdclick("t", "留在抖音")
    sleep(1200)
}
function xgzl() {

    while (1) {

        loginapp();

        toastLog("修改资料")

        sleep(1200)
        var txsurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=getdyzl&gid=" + gid;
        var __tt = aip("[抖音资料获取]", txsurl, 10);
        var tx = __tt.tx
        var nc = __tt.nc
        var qm = __tt.qm

        var img = images.load(tx);
        if (img != null) {
            images.save(img, "/sdcard/DCIM/0.jpg", "jpg", 100);
            toastLog("头像下载完成")
            app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/0.jpg"))));
        }
        sleep(6200)
        click("我")
        sleep(3000)
        if (text("填写昵称").exists()) {
            back()
        }
        if (text("完成").exists()) {
            click("完成")
            sleep(2000)
        }
        sleep(4000)
        if (textContains("编辑资料").exists()) {
            toastLog("开始编辑资料")
            tdclick("tc", "编辑资料")
            sleep(4000)
            if (text("点击更换头像").exists()) {
                toastLog("点击更换头像")
                var txg = text("点击更换头像").findOne().bounds()
                click(txg.left, txg.top - 150)
                sleep(2000)
            }
            tdclick("t", "从相册选择")
            sleep(3000)
            tdclick("t", "允许")
            tdclick("t", "始终允许")
            sleep(3000)
            if (text("全部").exists()) {
                click(216, 260)
                sleep(2000)
            }
            sleep(2000)
            tdclick("t", "确认")
            sleep(3000)
            tdclick("t", "将新头像发布到日常")
            tdclick("t", "更新后分享到日常")
            sleep(2000)
            tdclick("t", "完成")
            tdclick("t", "更换头像")
            sleep(8000)

            sleep(3000)
            if (text("名字").exists()) {
                toastLog("名字")
                sleep(3000)
                tdclick("t", "名字")
                sleep(3000)
                setText(nc)
                sleep(2000)
                tdclick("t", "保存")
            }
            sleep(3000)
            if (text("简介").exists()) {
                toastLog("简介")
                sleep(3000)
                tdclick("t", "简介")
                sleep(3000)
                setText(qm)
                sleep(2000)
                tdclick("t", "保存")
            }
            sleep(3000)
            if (text("性别").exists()) {
                toastLog("性别")
                var t = text("性别").findOne().bounds()
                click(t.right + 100, t.centerY())
                sleep(3000)
                tdclick("t", "男")
                sleep(2000)
            }
            sleep(3000)
            if (text("不展示").exists()) {
                toastLog("生日已设置")
            } else {

                if (text("生日").exists()) {
                    toastLog("生日设置")
                    var t = text("生日").findOne().bounds()
                    click(t.right + 100, t.centerY())
                    sleep(2000)
                }
                sleep(4000)
                if (textContains("OFF").exists()) {
                    sleep(2200)
                    var t = textContains("OFF").findOne().bounds()
                    if (t) {
                        click(t.left, t.top)
                        sleep(2000)
                    }
                }
                sleep(4000)
                if (text("确定").exists()) {
                    tdclick("t", "确定")
                    sleep(2000)
                }
            }
            sleep(3000)
            back();
            toastLog("资料修改完成")
            break
        }
    }
}
function searchlike() {

    var zgz = 0;
    var yjgy = 0;
    var yjgz = 0;
    var gzzs = searchnumber;
    var zcxcs = 1;
    var iscg = 0;

    while (1) {

        loginapp();

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=getsearchkyword&t=2&imei=" + __IMEI
        var __SKW = aip("[kword]", taskurl, 20, 30);
        if (__SKW != false) {
            var skw = __SKW.skw;
            sleep(5000)
            if (desc("搜索").exists()) {
                sleep(2000)
                tdclick("d", "搜索", "t")
                sleep(6000)
            }
            if (text("取消").exists()) {
                toastLog("输入搜索词")
                setText(skw)
                sleep(4000)
                tdclick("t", "搜索")
                sleep(8000)
            }
            sleep(2000)
            tdclick("t", "用户")
            sleep(6000)
            click(528, 438)
            sleep(3200)
            if (text("获赞").exists() && text("关注").exists() && textContains("抖音号").exists() && desc("更多").exists()) {

                toastLog("进入个人页面去找第四个作品")
                sleep(2800)
                var ar = random(400, 700)
                swipe(ar, device.height - 300, ar, 300, 600);
                sleep(4000)
                if (textContains("作品").exists()) {
                    var sp = textContains("作品").find().length;
                    var pps = textContains("作品").find().get(sp - 1).bounds()
                    if (pps) {
                        click(Number(pps.left), Number(pps.top))
                        sleep(3000)
                        if (descContains("点赞数").exists()) {
                            var spsl = descContains("点赞数").find().length
                            if (spsl > 4) {
                                var tsgb = descContains("点赞数").find().get(3).bounds()
                                if (tsgb) {
                                    click(tsgb.centerX(), tsgb.centerY())
                                    sleep(3000)
                                    iscg = 1;
                                }
                            }
                            break;
                        }
                    }
                }

            }
            zcxcs = zcxcs + 1
            if (zcxcs > 5) {
                toastLog("搜索超时结束")
                break
            }
        } else {
            toastLog("因没有配置抖音号,不执行加粉任务")
            iscg = 0;
            break
        }
    }

    if (iscg == 1) {
        var zcxcsr = 1;
        while (1) {

            pl()
            sleep(2000)
            sleep(3000)

            var btwz = 0
            var zpl = 0
            if (textContains("条评论").exists()) {
                var zpl = textContains("条评论").findOne().text();
                if (zpl) {
                    toastLog("本视频共" + zpl)
                    var tzy = textContains("条评论").findOne().bounds();
                    btwz = tzy.bottom
                    if (zpl.indexOf("w") >= 1) {
                        zpl = parseInt(zpl) * 10000
                    }
                }
            }
            if (textContains("评论").exists() && textContains("赞").exists() && !textContains("条评论").exists()) {
                var sjdd = textContains("评论").find()
                for (i = 0; i < sjdd.length - 1; i++) {
                    var ta = sjdd.get(i).bounds();
                    if (ta.top > 100 && ta.top < 500) {
                        zpl = sjdd.get(i).text()
                        btwz = ta.bottom
                        break;
                    }
                }
                if (zpl) {
                    toastLog("本视频共" + zpl)
                    if (zpl.indexOf("w") >= 1) {
                        zpl = zpl.replace(/评论/i, "");
                        zpl = parseInt(zpl) * 10000
                    } else {
                        zpl = zpl.replace(/评论/i, "");
                    }
                }
            }
            var zfy = parseInt(parseInt(zpl) / 5)
            if (parseInt(zpl) > 20) {
                toastLog("有评论可以去关注")
                sleep(1000)
                var eeeer = random(1, 4)
                for (ri = 1; ri < eeeer; ri++) {
                    sleep(1000)
                    var ar = random(400, 700)
                    swipe(ar, device.height - 400, ar, 620, 600);
                    sleep(2000)
                }

                for (v = 1; v < zfy; v++) {
                    sleep(2000)
                    if (textContains("你的关注").exists()) {
                        toastLog("本页关注过了")
                        var eeeer = random(3, 7)
                        for (ri = 1; ri < eeeer; ri++) {
                            sleep(1000)
                            var ar = random(400, 700)
                            swipe(ar, device.height - 400, ar, 620, 600);
                            sleep(2000)
                        }
                        yjgy = yjgy + 1;
                    } else {
                        var sjdd = descContains("的头像").find()
                        for (i = 0; i < sjdd.length - 1; i++) {
                            var ta = sjdd.get(i + 1).bounds();
                            if (ta.left == 48 && ta.top > btwz) {

                                click(ta.left + 5, ta.top + 5)
                                toastLog("进入个人资料页面...")
                                sleep(5000)
                                if (desc("at").exists()) {
                                    var r = desc("at").findOne().bounds()
                                    if (r.top < 1400) {
                                        sleep(1000)
                                        toastLog("不小心点到回复")
                                        sleep(1000)
                                        back()
                                        sleep(1200)
                                    }
                                }
                                sleep(2000)
                                if (text("获赞").exists() && text("关注").exists() && desc("更多").exists()) {
                                    sleep(800)
                                    var img = captureScreen();
                                    var point = images.findMultiColors(img, "#FF5372", [[-1, 20, "#FD5474"], [10, 13, "#242630"]], {
                                        region: [0, 400, 1080, 960]
                                    });
                                    var point1 = images.findMultiColors(img, "#fe538f", [[8, -8, "#fb548f"]], {
                                        region: [0, 400, 1080, 960]
                                    });
                                    if (point || point1) {

                                        toastLog("女性可以添加")
                                        sleep(1200)
                                        if (text("这是私密帐号").exists()) {
                                            sleep(2200)
                                            toastLog("这是私密帐号")
                                            sleep(1200)
                                        } else {
                                            sleep(2000)
                                            let isgz = images.findMultiColors(captureScreen(), "#fe2c55", [[30, -1, "#ffffff"], [76, -11, "#ffffff"], [126, -12, "#ffffff"], [155, 0, "#fe2c55"]], {
                                                region: [0, 0, 1080, 1900]
                                            });
                                            if (isgz) {
                                                click(isgz.x, isgz.y)
                                                sleep(1200)
                                                toastLog("关注本号")
                                                zgz = zgz + 1
                                                toastLog("当前已关注" + zgz + "个")
                                                sleep(2000)

                                            } else if (text("#  关注").exists()) {
                                                p = text("#  关注").findOne().bounds();
                                                if (p) {
                                                    toastLog("关注本号")
                                                    click(p.left + 100, p.top + 10)
                                                    zgz = zgz + 1
                                                    toastLog("当前已关注" + zgz + "个")
                                                    sleep(2000)
                                                }
                                            } else {
                                                yjgz = yjgz + 1
                                            }
                                        }
                                        if (text("你可能感兴趣").exists() && text("查看更多").exists()) {
                                            toastLog("有推荐的好友可添加")
                                            if (text("可能感兴趣的人").exists()) {
                                                var gxq = text("可能感兴趣的人").find()
                                                for (i = 0; i < gxq.length; i++) {
                                                    var ta = gxq.get(i).bounds();
                                                    if (ta) {
                                                        click(ta.left + 10, ta.top + 10)
                                                        sleep(4000)
                                                        if (text("获赞").exists() && text("关注").exists() && desc("更多").exists()) {
                                                            sleep(800)
                                                            var img = captureScreen();
                                                            var point = images.findMultiColors(img, "#FF5372", [[-1, 20, "#FD5474"], [10, 13, "#242630"]], {
                                                                region: [0, 400, 1080, 960]
                                                            });
                                                            var point1 = images.findMultiColors(img, "#fe538f", [[8, -8, "#fb548f"]], {
                                                                region: [0, 400, 1080, 960]
                                                            });
                                                            if (point || point1) {
                                                                toastLog("女性可以添加")
                                                                sleep(2200)
                                                                if (text("这是私密帐号").exists()) {
                                                                    sleep(2200)
                                                                    toastLog("这是私密帐号")
                                                                    sleep(1200)
                                                                } else {
                                                                    sleep(2000)
                                                                    let isgz = images.findMultiColors(captureScreen(), "#fe2c55", [[30, -1, "#ffffff"], [76, -11, "#ffffff"], [126, -12, "#ffffff"], [155, 0, "#fe2c55"]], {
                                                                        region: [0, 0, 1080, 1900]
                                                                    });
                                                                    if (isgz) {
                                                                        click(isgz.x, isgz.y)
                                                                        sleep(1200)
                                                                        toastLog("关注本号")
                                                                        zgz = zgz + 1
                                                                        toastLog("当前已关注" + zgz + "个")
                                                                        sleep(2000)
                                                                    }
                                                                    else if (text("#  关注").exists()) {
                                                                        p = text("#  关注").findOne().bounds();
                                                                        if (p) {
                                                                            toastLog("关注本号")
                                                                            click(p.left + 100, p.top + 10)
                                                                            zgz = zgz + 1
                                                                            toastLog("当前已关注" + zgz + "个")
                                                                            sleep(2000)
                                                                        }
                                                                    }
                                                                }
                                                                sleep(2200)
                                                                back()
                                                                sleep(1200)
                                                            } else {
                                                                sleep(1200)
                                                                toastLog("男性或者没有添加性别")
                                                                sleep(1200)
                                                                back()
                                                                sleep(2200)
                                                            }
                                                        } else {
                                                            sleep(1000)
                                                            toastLog("可能没有进入好友界面")
                                                            sleep(1000)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        sleep(2200)
                                        back()
                                        sleep(1200)

                                    } else {
                                        sleep(1200)
                                        toastLog("男性或者没有添加性别")
                                        sleep(1200)
                                        back()
                                        sleep(2200)
                                    }
                                } else {
                                    sleep(1000)
                                    toastLog("可能没有进入好友界面")
                                    sleep(1000)
                                }

                            } else {
                                sleep(1000)
                                toastLog("头像被档或其它原因")
                                sleep(1000)
                            }
                            sleep(1200)
                            if (desc("at").exists()) {
                                var r = desc("at").findOne().bounds()
                                if (r.top < 1400) {
                                    sleep(1000)
                                    toastLog("不小心点到回复")
                                    sleep(1000)
                                    back()
                                    sleep(1200)
                                }
                            }
                            sleep(1000)
                            if (zgz > gzzs) {
                                toastLog("关注已超过" + gzzs + "个结束本次任务")
                                break
                            }
                            var iip = 1
                            while (1) {
                                sleep(2000)
                                if (desc("at").exists() && desc("表情").exists()) {
                                    break
                                } else {
                                    toast("返回评论页面")
                                    back()
                                    sleep(1200)
                                    iip = iip + 1
                                    if (iip > 8) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                    sleep(1200)
                    if (textContains("条评论").exists()) {

                    } else if (textContains("评论").exists() && textContains("赞").exists() && !textContains("条评论").exists()) {

                    } else {
                        toastLog("评论页面被关闭了")
                        pl()
                    }
                    toastLog("上滑评论")
                    sleep(1200)
                    if (desc("at").exists()) {
                        var r = desc("at").findOne().bounds()
                        if (r.top < 1400) {
                            sleep(1000)
                            toastLog("不小心点到回复")
                            sleep(1000)
                            back()
                            sleep(1200)
                        }
                    }
                    sleep(1000)
                    var ar = random(400, 700)
                    swipe(ar, device.height - 400, ar, 620, 600);
                    sleep(2000)
                    if (textContains("评论并转发").exists() || textContains("回复 @").exists() && desc("表情").exists()) {
                        sleep(1000)
                        toastLog("不小心点到回复")
                        sleep(1000)
                        back()
                        sleep(1200)
                    }
                    sleep(1200)
                    if (desc("at").exists()) {
                        var r = desc("at").findOne().bounds()
                        if (r.top < 1400) {
                            sleep(1000)
                            toastLog("不小心点到回复")
                            sleep(1000)
                            back()
                            sleep(1200)
                        }
                    }
                    sleep(1200)
                    if (textContains("拍同款").exists()) {
                        sleep(1000)
                        toastLog("不小心点到拍同款")
                        sleep(1000)
                        back()
                        sleep(1200)
                    }
                    if (zgz > gzzs) {
                        toastLog("关注已超过" + gzzs + "个结束本次任务")
                        break
                    }
                    if (yjgz > 9) {
                        yjgz = 0
                        toastLog("本视频已关注太多,切换下一个视频")
                        break
                    }
                    if (yjgy > 9) {
                        yjgy = 0
                        toastLog("本视频已好多页面的人都关注了,切换下一个视频")
                        break
                    }
                }
            }
            if (zgz > gzzs) {
                toastLog("关注已超过" + gzzs + "个结束本次任务")
                break
            } else {
                toastLog("评论不够或已关注过很多,去看下一个作品")
                sleep(1200)
                if (textContains("条评论").exists()) {
                    back()
                    sleep(1200)
                }
                sleep(1000)
                if (textContains("评论").exists() && textContains("赞").exists() && !textContains("条评论").exists()) {
                    back()
                    sleep(1200)
                }
                lineDown(1500, 3000)
                sleep(2000)
            }

            zcxcsr = zcxcsr + 1
            if (zcxcsr > 25) {
                toastLog("超时结束")
                break
            }
        }
    }

}
function likenumber() {

    var tjn = 0;

    while (1) {

        toastLog("统计关注数")
        loginapp()
        sleep(4000)
        if (text("我").exists()) {
            click("我")
        } else {
            click(948, 1673)
        }
        sleep(4000)
        if (textContains("编辑资料").exists()) {
            var sjdd = classNameContains("TextView").find()
            for (i = 0; i < sjdd.length - 1; i++) {
                var ta = sjdd.get(i).text();
                if (ta == "获赞") {
                    var gzbounds = text("获赞").findOne().bounds()
                    if (gzbounds) {
                        if (gzbounds.top > 500) {
                            var ta = sjdd.get(i + 1).text()
                            if (ta) {
                                http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=5&id=" + sjid + "&num=" + ta);
                                toastLog("当前关注数为" + ta + "统计完成")
                                break;
                            }
                        }
                        if (gzbounds.top < 500) {
                            var ta = sjdd.get(i + 5).text()
                            if (ta) {
                                http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=postask&t=5&id=" + sjid + "&num=" + ta);
                                toastLog("新当前关注数为" + ta + "统计完成")
                                break;
                            }
                        }

                    }
                }
            }
            break
        }
        tjn = tjn + 1;
        if (tjn > 10) {
            toastLog("统计关注数超时")
            break
        }
    }
}
function PersonalMessage() {

    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=getsearchkyword&t=1&gid=" + gid
    var __SKW = aip("[pmword]", taskurl, 20);

    var one = __SKW.one;
    var two = __SKW.two;
    var three = __SKW.three;
    var four = __SKW.four;
    let imgurl = "http://" + __SERVER + "/data/upload/" + four;
    var img = images.load(imgurl);
    if (img != null) {
        images.save(img, "/sdcard/DCIM/0.jpg", "jpg", 100);
        toastLog("微信号专用图片下载完成")
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/0.jpg"))));
    }

    //var five = __SKW.five;
    //var six = __SKW.six;

    loginapp();

    sleep(5000)
    if (text("我").exists()) {
        click("我")
    } else {
        click(948, 1673)
    }
    sleep(3000)
    tdclick("t", "粉丝")

    sleep(2200)
    if (text("互相关注").exists()) {
        sleep(3000)
        if (text("回关").exists()) {
            toastLog("有回关的");
            var hg = text("回关").find()
            for (iv = 0; iv < hg.length; iv++) {
                var fbid = hg.get(iv).bounds()
                click(fbid.left, fbid.top)
                sleep(3000)
                tdclick("t", "取消")
            }
        }
        sleep(5000)
        if (text("互相关注").exists()) {
            var friendslist = text("互相关注").find()
            for (i = 0; i < friendslist.length; i++) {

                toastLog("招呼当前第" + (i + 1) + "个第")
                sleep(1200)
                var fbid = friendslist.get(i).bounds()
                if (device.width == 1080) {
                    click(230, fbid.top)
                } else {
                    click(160, fbid.top)
                }
                sleep(5000)
                if (text("获赞").exists() && text("关注").exists() && textContains("抖音号").exists() && desc("更多").exists()) {
                    sleep(800)
                    var img = captureScreen();
                    var point = images.findMultiColors(img, "#FF5372", [[-1, 20, "#FD5474"], [10, 13, "#242630"]], {
                        region: [0, 400, 1080, 960]
                    });
                    var point1 = images.findMultiColors(img, "#fe538f", [[8, -8, "#fb548f"]], {
                        region: [0, 400, 1080, 960]
                    });
                    if (point || point1) {

                        click("私信")

                        sleep(3000)

                        xiarr1 = [one, two, three, four]

                        xiarr = [one, two, "方便", "抖音"]

                        var dqi = -1;

                        for (m = 0; m < xiarr.length; m++) {
                            sleep(1200)
                            if (textContains(xiarr[m]).exists()) {
                                dqi = m
                            }
                        }

                        if (dqi < 1) {

                            sleep(1200)
                            setText(xiarr1[dqi + 1])
                            sleep(2000)
                            tdclick("id", "ic_")
                            sleep(2000)
                            if (descContains("发送").exists()) {
                                p = descContains("发送").findOne().bounds();
                                if (p) {
                                    click(p.centerX(), p.centerY())
                                }
                            }
                            sleep(2000)
                            tdclick("t", "发送")
                            sleep(2000)

                        } else {
                            toastLog("发现本号已招呼过,停止招呼")
                            break;
                        }


                    }
                }

                var fb = random(3, 6)
                for (hh = 0; hh < fb; hh++) {
                    toastLog("共" + (fb * 5) + "秒已等待" + (hh * 5) + "秒去下一个招呼")
                    sleep(5 * 1000);
                    device.wakeUp();
                }

                var iip = 1
                while (1) {
                    toast("返回粉丝页面")
                    sleep(2000)
                    if (!text("私信").exists() && !textContains("获赞").exists() && textContains("关注").exists() && textContains("粉丝").exists()) {
                        break
                    }
                    else {
                        back()
                        sleep(1200)
                        iip = iip + 1
                        if (iip > 8) {
                            break
                        }
                    }
                }

            }
        }
    } else {
        toastLog("没有粉丝或到底了")
    }

    loginapp();

    sleep(5000)
    if (text("消息").exists()) {
        click("消息")
    }
    sleep(3000)
    var ddcs = 0

    tdclick("t", "我知道了")
    sleep(2000)
    tdclick("t", "好的")
    sleep(2000)

    while (1) {

        toastLog("等待消息回复...")

        sleep(5000)

        var point = images.findMultiColors(captureScreen(), "#face15", [[-13, 20, "#face15"], [1, 40, "#face15"], [19, 17, "#face15"]], {
            region: [0, 0, device.width, (device.height - 300)]
        });

        var point1 = images.findMultiColors(captureScreen(), "#FE2C55", [[-13, 20, "#FE2C55"], [1, 40, "#FE2C55"], [19, 17, "#FE2C55"]], {
            region: [0, 0, device.width, (device.height - 300)]
        });

        if (point || point1) {

            toastLog("发现新消息")
            sleep(800)
            if (point) { click(point.x, point.y) }
            if (point1) { click(point1.x, point1.y) }

            sleep(3000)

            if (textContains("发送消息").exists() || desc("视频通话").exists() || desc("语音通话").exists()) {

                if (textContains("抖音").exists()) {

                    toastLog("已发送了")
                    sleep(1200)
                    setText("加了吗?")
                    sleep(2000)
                    tdclick("id", "ic_")
                    sleep(2000)
                    if (descContains("发送").exists()) {
                        p = descContains("发送").findOne().bounds();
                        if (p) {
                            click(p.centerX(), p.centerY())
                        }
                    }
                    sleep(2000)
                    tdclick("t", "发送")
                    sleep(2000)

                } else {

                    sleep(1200)
                    setText(three)
                    sleep(2000)
                    tdclick("id", "ic_")
                    sleep(2000)
                    if (descContains("发送").exists()) {
                        p = descContains("发送").findOne().bounds();
                        if (p) {
                            click(p.centerX(), p.centerY())
                        }
                    }

                    sleep(2000)
                    tdclick("t", "发送")
                    sleep(2000)

                    sleep(3000)
                    var txx = textContains("发送消息").findOne().bounds()
                    if (txx) {
                        click(device.width - 50, txx.centerY())
                    }

                    sleep(3000)
                    tdclick("t", "照片")
                    sleep(3000)
                    click(180, 231)
                    sleep(2000)
                    tdclick("tc", "发送")
                    sleep(2000)

                }
            }


        } else {

            tdclick("t", "我知道了")
            tdclick("t", "好的")
            tdclick("t", "消息")

            sleep(3000);
            var zxidl = text("消息").find();
            if (zxidl.nonEmpty()) {
                for (i = 0; i < zxidl.length; i++) {
                    sleep(1200)
                    var zxzb = zxidl.get(i).bounds();
                    if (zxzb.top > device.height - 400) {
                        press(zxzb.left, zxzb.top, 100)
                        sleep(100)
                        press(zxzb.left, zxzb.top, 100)
                        sleep(4000);
                    }
                }
            }

        }

        while (1) {
            sleep(2000)
            if (text("消息").exists() && text("搜索").exists()) {
                break
            }
            else {
                back()
                sleep(1200)
            }
        }

        var fb = random(5, 9)
        for (hh = 0; hh < fb; hh++) {
            toastLog("共" + (fb * 5) + "秒已等待" + (hh * 5) + "秒去下一个招呼")
            sleep(5 * 1000);
            device.wakeUp();
        }

        ddcs = ddcs + 1
        if (ddcs > 15) {
            toastLog("循环等待新消息15次花费时间11分钟结束")
            break
        }
    }
}

