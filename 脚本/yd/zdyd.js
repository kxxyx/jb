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
device.setBrightness(12);
device.setMusicVolume(0);
device.setNotificationVolume(0);
device.setAlarmVolume(0)
sleep(1000)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
swipe(500, device.height - 200, 500, 300, 800)
sleep(600)
toastLog("当前版本6.7.5")
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
var __MODEL = device.model
if (__IMEI == null) { while (1) { toastLog("本机设备信息错误,请重新刷机或更换手机"); sleep(4000); } }
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(2000); }
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }
var sjid, appname, packagename, timeout, appid, vername, durl;
var dyfsp, dyfsx, dyzl, dygz, gzsl, dyqg, zgz = 0

function mainfb() {
    downloadallapp();
    卸载无用app()
    downxyr()
    while (1) {

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=task&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 20);
        var ad = __TASK.ad;
        sjid = __TASK.sjid;
        durl = __TASK.durl;
        appname = __TASK.appname;
        packagename = __TASK.packagename;
        appid = __TASK.appid;
        timeout = __TASK.timeout;
        vername = __TASK.versionnumber;
        var getwxh = __TASK.getwxh;
        appname = __TASK.appname;
        packagename = __TASK.packagename;
        dyfsp = __TASK.dyfsp;
        dyfsx = __TASK.dyfsx;
        dyzl = __TASK.dyzl;
        dygz = __TASK.dygz;
        gzsl = __TASK.gzsl;

        toastLog("[getAccount]手机编号: " + sjid);

        if (getwxh == 1) {
            微信号()
        }
        if (ad == 1) {

            postlog("开始运行");
            var vsum = 0;
            var thread = threads.start(function () {
                home();
                ads();
            });
            while (true) {
                sleep(1000);
                vsum = vsum + 1;
                if (vsum > timeout * 60) {
                    toastLog("[任务app" + appname + "]时间到了！必须结束");
                    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=postask&id=" + sjid + "&appid=" + appid);
                    postlog("全部任务超时完成");
                    thread.interrupt();
                    threads.shutDownAll();
                    stopapp(packagename);
                    NoxCleaner()
                    break;
                }
                var dfd = thread.isAlive();
                if (dfd == false) {
                    toastLog("[任务app" + appname + "]已经完成！自动结束");
                    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=postask&id=" + sjid + "&appid=" + appid);
                    postlog("全部任务自动完成");
                    thread.interrupt();
                    threads.shutDownAll();
                    stopapp(packagename);
                    NoxCleaner()
                    break;
                }
                if (Number(vsum) % 240 === 0) {
                    toastLog("定时检查引擎情况")
                    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getreboottask&imei=" + __IMEI;
                    var __TASK = aip("[TASK]", taskurl, 20);
                    var iscq = __TASK.iscq;
                    if (iscq == 1) {
                        thread.interrupt();
                        threads.shutDownAll();
                        http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=postask&t=3&id=" + __IMEI + "&appid=" + appid);
                        rebootkey()
                        rebootkey()
                        break;
                    }
                }

            }
        } else {
            toastLog("没有找到任务,或本机任务全部完成");
        }
        for (i = 0; i < 60; i++) {
            toastLog("上一个app任务完成,等待50秒下一个开启......已等待" + (i * 10) + "秒")
            sleep(10 * 1000);
            device.wakeUp();
            device.keepScreenOn();
            device.keepScreenDim();
        }
    }
}
function downxyr() {

    var appurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=updateapp";
    var __TASK = aip("[UAPP]", appurl, 20);
    var v = __TASK.v;
    var vurl = __TASK.vurl;
    var dsn = getVerName("com.tt.xyr")
    if (dsn < v) {
        downloadappinstall(vurl, v)
    }
}
function ads() {

    var lsname = getAppName(packagename);
    if (lsname != null) {
        toastLog(appname + "本应用已安装直接运行")
        var dsn = getVerName(packagename)
        if (dsn < vername) {
            toastLog(appname + "当前版本" + dsn + "匹配兼容版本" + vername + "不一致,可能导致不正常操作。自动卸载重新安装")
            var log_text = appname + "当前版本" + dsn + "匹配兼容版本" + vername + "不一致,可能导致不正常操作。自动卸载重新安装";
            http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=tasklog&id=" + sjid + "&appid=" + appid + "&log_text=" + log_text);
            if (durl.length > 10) {
                var appdownurl = durl;
            } else {
                var appdownurl = "http://47.111.31.150:8000/soft/" + packagename + ".apk";
            }
            var appdownanme = packagename + ".apk";
            downloadappinstall(appdownurl, appdownanme);
            sleep(10 * 1000);
        }

    } else {

        toastLog("本机没有安装" + appname)
        if (durl.length > 10) {
            var appdownurl = durl;
        } else {
            var appdownurl = "http://47.111.31.150:8000/soft/" + packagename + ".apk";
        }
        var appdownanme = packagename + ".apk";
        downloadappinstall(appdownurl, appdownanme);
        sleep(15 * 1000);

    }
    switch (packagename) {

        case packagename:

            toastLog("[开始任务app]" + appname);
            var __name = eval("(" + appname + ")");
            startfun(__name)

            // try {
            //     if (typeof (eval(appname)) == "function") {
            //         toastLog("[开始任务app]" + appname);
            //         var __name = eval("(" + appname + ")");
            //         startfun(__name)
            //     }
            // }
            // catch (e) { toastLog("没有找到" + appname + "app相应的功能函数"); }

            break;

        default:
            toastLog("没有找到app相应的功能函数");
    }
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
function downloadappinstall(appdownurl, appdownanme) {

    apk路径 = "/sdcard/Download/" + appdownanme;

    toastLog("开始下载" + appdownanme + "......");

    while (1) {
        var res = http.get(appdownurl);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            files.writeBytes(apk路径, res.body.bytes());
            sleep(2000);
            toastLog(appdownanme + "下载成功开始自动安装");
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
        toastLog("安装应用" + appdownanme)
        sleep(4500)
        if (device.height == 1920) {

            if (text('更新').exists() || desc('更新').exists()) {
                toast("有更新")
                var sbbb = text("更新").findOne().bounds()
                if (sbbb) {
                    click(Number(sbbb.left), Number(sbbb.top));
                    sleep(5500)
                }
                sleep(5500)
                click(890, 1800)
                sleep(2500)
                if (text("继续安装").exists()) {
                    click("继续安装");
                    sleep(1500)
                    break
                }

            } else {
                if (text("完成").exists()) {
                    click("完成");
                    toast("完成安装")
                    sleep(1500)
                    break;
                }
                if (text('接受').exists()) {
                    click("接受");
                    sleep(1500)
                }
                if (text('安装').exists()) {
                    toast("直接安装")
                    click("安装");
                    sleep(3500)
                    break
                }
                sleep(5500)
                click(890, 1800)
                sleep(2500)
                if (text("继续安装").exists()) {
                    click("继续安装");
                    sleep(1500)
                    break
                }
            }

        }
        if (device.height == 1280) {

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
function updateapp() {

    var azcs = 1;
    while (1) {
        toastLog("自动更新应用")
        sleep(4500)
        if (device.height == 1920) {

            if (text('更新').exists() || desc('更新').exists()) {
                toast("有更新")
                var sbbb = text("更新").findOne().bounds()
                if (sbbb) {
                    click(Number(sbbb.left), Number(sbbb.top));
                    sleep(5500)
                }
                sleep(5500)
                click(890, 1800)
                sleep(2500)
                if (text("继续安装").exists()) {
                    click("继续安装");
                    sleep(1500)
                    break
                }

            } else {
                if (text("完成").exists()) {
                    click("完成");
                    toast("完成安装")
                    sleep(1500)
                    break;
                }
                if (text('接受').exists()) {
                    click("接受");
                    sleep(1500)
                }
                if (text('安装').exists()) {
                    toast("直接安装")
                    click("安装");
                    sleep(3500)
                    break
                }
                sleep(5500)
                click(890, 1800)
                sleep(2500)
                if (text("继续安装").exists()) {
                    click("继续安装");
                    sleep(1500)
                    break
                }
            }

        }
        if (device.height == 1280) {

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
        }
        azcs = azcs + 1

        if (azcs > 8) {
            toastLog("安装次数太多, 直接使用当前版本")
            break
        }
    }
    sleep(8000)
    back();

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
function downloadallapp() {

    var t1 = files.exists("/sdcard/down.txt");
    if (t1 == false) {
        home();
        var dowappurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getapplist&id=" + sjid;
        var __Applist = aip("[dowapp]", dowappurl, 20);
        for (i = 0; i < __Applist.length; i++) {

            if (__Applist[i]['durl'].length > 10) {
                var appdownurl = __Applist[i]['durl'];
            } else {
                var appdownurl = "http://47.111.31.150:8000/soft/" + __Applist[i]['packagename'] + ".apk";
            }
            var appdownanme = __Applist[i]['packagename'] + ".apk";

            var lsname = getAppName(__Applist[i]['packagename']);
            if (lsname != null) {

            } else {
                toastLog("下载" + appdownanme);
                downloadappinstall(appdownurl, appdownanme);
                sleep(20 * 1000);
            }
        }
        log("所有APP下载安装完成");
        files.createWithDirs("/sdcard/down.txt");
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

    isapplunch();
}
function stopapp(sappname) {

    sleep(2200);
    app.openAppSetting(sappname);
    sleep(4000);
    if (text('红红火火').exists()) {
        back();
    }
    sleep(1200);
    tdclick("t", "强行停止")
    sleep(3000);
    tdclick("t", "确定")
    sleep(2000);
    if (text('清除缓存').exists()) {
        tdclick("t", "清除缓存")
    } else {
        tdclick("t", "存储")
        sleep(2000);
        tdclick("t", "清空缓存")
        back();
    }
    sleep(2000);
}
function loginapp(logfun) {
    sleep(2000)
    stopapp(packagename);
    sleep(2000);
    var lc = 1;
    var loginthread = threads.start(function () {
        toastLog("打开" + appname + "窗口检查登录情况");
        logfun()
    });
    while (true) {
        sleep(2000);
        launch(packagename);
        sleep(12000);
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (text("申请使用").exists()) {
            click("同意")
            sleep(5000)
        }
        lc = lc + 1;
        toastLog("检查第" + lc + "次登录是否成功")
        if (Number(lc) % 5 === 0) {
            toastLog('没有成功登录,重新启动' + appname);
            stopapp(packagename);
        }
        var adfd = loginthread.isAlive();
        if (adfd == false) {
            toastLog("登录成功")
            loginthread.interrupt();
            break;
        }
        if (Number(lc) > 15) {
            toastLog('登录次数太多,' + appname + '应该是有更新或者特殊界面出现导致识别不到正确登录');
            postlog("应用更新导致不能正常登录或者是本帐号被封禁")
            loginthread.interrupt();
            break;

        }

    }

}
function startfun(sfun) {

    var rebootthread = threads.start(function () {
        sfun()
    });

    while (true) {

        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (text('知道了').exists()) {
            click("知道了");
        }
        if (text('以后再说').exists()) {
            click("以后再说");
        }
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (text("申请使用").exists()) {
            click("同意")
            sleep(5000)
        }
        if (text('同意').exists()) {
            tdclick("t", "同意");
        }
        if (text('去开启').exists()) {
            click("去开启");
            sleep(600)
            if (text('允许').exists()) {
                click("允许");
            }
            if (text('始终允许').exists()) {
                click("始终允许");
            }
        }
        sleep(800);
        if (textContains('无响应').exists()) {
            if (textContains('确定').exists()) {
                var p = textContains('确定').findOne().bounds();
                click(p.left, p.top);
            }
            if (textContains('关闭应用').exists()) {
                var p = textContains('关闭应用').findOne().bounds();
                click(p.left, p.top);
            }
            app.launch(packagename)
            sleep(5000)
        }
        sleep(800);
        tdclick("id", "iv_close")
        sleep(800);
        tdclick("id", "iv_close_top")
        sleep(800);
        tdclick("id", "close_view")
        sleep(800);
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(800);
        var tadfd = rebootthread.isAlive();
        if (tadfd == false) {
            rebootthread.interrupt();
            break;
        }

    }

}
function isapplunch() {
    sleep(1200);
    if (currentActivity().search(packagename) == -1) {
        app.launch(packagename);
        sleep(2200);
    }
}
function getVerName(package_name) {
    let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
    for (let i in pkgs) {
        if (pkgs[i].packageName.toString() === package_name) return pkgs[i].versionName;
    }
}
function postlog(text) {
    var log_text = appname + text;
    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=tasklog&id=" + sjid + "&appid=" + appid + "&log_text=" + log_text);
}
function ydmoneylog(text) {
    var log_money = appname + text;
    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=ydmoneylog&id=" + sjid + "&appid=" + appid + "&log_money=" + log_money);
}
function getsiss() {

    importClass(android.net.Uri);
    SMS_INBOX = Uri.parse("content://sms/");
    var cr = context.getContentResolver();
    var projection = [
        "_id",
        "address",
        "person",
        "body",
        "date",
        "type"
    ];
    var cur = cr.query(SMS_INBOX, projection, null, null, "date desc");//此处报错是因为系统没允许autojs读取短信            
    if (null == cur) {
        log("************cur == null");
    }
    var i = 0;
    while (cur.moveToNext()) {

        var cm = cur.getString(cur.getColumnIndex("body"));
        var cdate = cur.getString(cur.getColumnIndex("date"));
        var s1 = cdate.substring(0, cdate.length - 3);
        var dqsj = Math.round(new Date() / 1000);

        var pattern = /\d{6}/;
        var pattern1 = /\d{4}/;

        if (cm.length > 20 && s1 > (dqsj - 180)) {

            toastLog("找到短信")

            if (pattern.test(cm)) {
                var qcm = pattern.exec(cm)
                toastLog(qcm)
                sleep(2000)
                return qcm

            }
            if (pattern1.test(cm)) {
                var qcm = pattern1.exec(cm)
                toastLog(qcm)
                sleep(2000)
                return qcm
            }
        }

        i = i + 1;
        if (i > 5) {
            break
        }

    }

}
function 卸载无用app() {

    var installdowappurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=installapplist";
    var list = aip("[installdowapp]", installdowappurl, 20);
    for (i = 0; i < list.length; i++) {
        var lsappname = getPackageName(list[i]);
        if (lsappname) {
            app.uninstall(lsappname)
            sleep(3000)
            tdclick("t", "卸载")
            tdclick("t", "确定")
            sleep(3000)
        }
    }
}
function 互动(type) {

    if (type == "点赞") {

        var dzl = random(1, 100)
        if (dzl > 70) {
            return true
        }
    }
    if (type == "关注") {
        var gzl = random(1, 100)
        if (gzl > 90) {
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
function 输入支付宝帐号和密码() {
    setText(0, "涂国伟");
    var zfb = new Array();
    zfb[0] = "15083838521";
    zfb[1] = "soulxyr@163.com";
    zfb[2] = "89801406@qq.com";
    var sj = random(0, 2);
    setText(1, zfb[sj])
}
function cloasad() {

    var srsr = 0;

    while (1) {
        sleep(2000);
        if (id("tt_video_ad_close").exists()) {
            tdclick("id", "tt_video_ad_close")
            break;
        } sleep(400)
        if (id("iv_close").exists()) {
            tdclick("id", "iv_close")
            break;
        } sleep(400)
        if (id("tt_video_ad_close_layout").exists()) {
            tdclick("id", "tt_video_ad_close_layout")
            break;
        } sleep(400)
        if (id("ksad_end_close_btn").exists()) {
            tdclick("id", "ksad_end_close_btn","t")
            break;
        } sleep(400)
        if (id("close").exists()) {
            tdclick("id", "close")
            break;
        }
        sleep(400)
        if (id("login_loading").exists()) {
            tdclick("id", "login_loading")
            break;
        } sleep(400)
        if (id("reward_ad_close").exists()) {
            tdclick("id", "reward_ad_close")
            break;
        }
        sleep(400)
        if (id("iv_act_webClose").exists()) {
            tdclick("id", "iv_act_webClose")
            break;
        }
        sleep(400)
        if (id("klevin_ad_iv_close").exists() && srsr > 40) {
            tdclick("id", "klevin_ad_iv_close")
            break;
        }
        sleep(400)
        if (id("video_close_icon").exists()) {
            tdclick("id", "video_close_icon")
            break;
        }
        sleep(400)
        if (id("tv_ad_close").exists()) {
            tdclick("id", "tv_ad_close")
            break;
        }
        sleep(400)
        if (text("关闭").exists() && text("立即领取").exists()) {
            tdclick("t", "关闭")
        }
        sleep(400)
        if (text("恭喜获得奖励").exists()) {
            if (text("恭喜获得奖励").exists()) {
                var p = text("恭喜获得奖励").findOne().bounds();
                if (p.left < 40) {
                    click(p.left - 50, p.top)
                    sleep(1200)
                    if (text("继续观看").exists()) {
                        tdclick("t", "继续观看")
                        sleep(10000)
                    } else {
                        break;
                    }
                }
            }
        }
        sleep(400)
        if (text("star").exists()) {
            if (classNameContains("mageView").exists()) {
                var rtw = classNameContains("mageView").findOne().bounds()
                if (rtw) {
                    if (rtw.top < 80) {
                        click(rtw.left + 6, rtw.top + 6)
                        break;
                    }
                }
            }
        }
        sleep(400)
        if (text("关闭").exists() || desc("关闭").exists() && srsr > 40) {
            tdclick("t", "关闭")
            tdclick("d", "关闭")
            break;
        }
        sleep(400)
        if (text("关闭广告").exists() || desc("关闭广告").exists() && srsr > 40) {
            tdclick("t", "关闭广告")
            tdclick("d", "关闭广告")
            break;
        }
        sleep(400)
        if (text("继续观看").exists()) {
            tdclick("t", "继续观看")
            sleep(10000)
        }
        tdclick("id", "iv_cancel")
        srsr = srsr + 6;
        toast("广告时间" + srsr + "秒")
        if (Number(srsr) > 65) {
            toast("时间到了退出循环")
            back();
            break;
        }
        lineDown(1500, 3000);
    }
    if (text("继续赚钱").exists()) {
        click("继续赚钱");
    }
    if (text("愉快收下").exists()) {
        click("愉快收下");
    }
    tdclick("t", "放弃奖励")
    sleep(1200)
    if (textContains("点击打开").exists() || text("点击重播").exists() || text("取消").exists() || text("立即下载").exists() || text("安装应用").exists() || text("立即安装").exists() || text("立即打开").exists() || text("点击打开").exists() || text("点击下载").exists() || text("立即领取").exists()) {
        back();
    }
    tdclick("id", "colseAd")
    sleep(1200)
    tdclick("id", "colseDialogAd")

    toast("广告完成")
}
function tdclick(t, code, l) {

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
            var t = parseInt(p.right - p.left)
            var jj = random(1, 100)
            if (jj > 50) {
                x = x - t * parseInt(random(1, 3) / 10)
            } else {
                x = x + t * parseInt(random(1, 3) / 10)
            }

        } else {
            x = Number(p.left)
            var t = parseInt(p.right - p.left)
            var jj = random(1, 100)
            x = x + t * parseInt(random(1, 3) / 10)
        }
        if (l == "t") {
            if (Number(p.top) > 0) {
                y = Number(p.top)
            }
        } else {
            if (Number(p.top) > 0) {
                y = Number(p.top)
                var t = parseInt(p.bottom - p.top)
                var jj = random(1, 100)
                y = y + t * parseInt(random(1, 2) / 10)
            }
        }

        click(x, y);
        sleep(800)
    }

}
function rebootkey() {

    powerDialog();
    sleep(3000);
    tdclick("t", "重新启动")
    sleep(3000);
    click(260, 557)
    sleep(2000);
    click(359, 546)

}
function 火山极速版登录() {

    while (1) {

        sleep(800);
        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (text('同意').exists()) {
            click("同意");
        }
        if (text('以后再说').exists()) {
            click("以后再说");
        }
        sleep(800);
        if (textContains("登录").exists()) {
            tdclick("t", "登录")
            sleep(2000)
            if (text('微信登录').exists()) {
                click("微信登录");
                sleep(8000)
                tdclick("t", "同意")
            }
        }
        sleep(800);
        if (text("首页").exists()) {
            tdclick("t", "首页")
            sleep(2000);
            break;
        }
    }
}
function 火山极速版() {

    loginapp(火山极速版登录);

    if (text('我的').exists()) {
        toastLog("去提现")
        var sd = text('我的').findOne().bounds()
        click(sd.left, sd.top);
        sleep(4000);

        if (text('现金金额').exists()) {
            var xj = id("lu").findOne().text();
            var ye = id("lw").findOne().text();
            ydmoneylog("现金金额:" + xj + "金币金额:" + ye);
        }
        if (text('提现兑换').exists()) {
            var sd = text('提现兑换').findOne().bounds()
            click(sd.left, sd.top);
        }
        sleep(8000);
        if (text('微信提现').exists()) {

            var sd = text('微信提现').findOne().bounds()
            var hqsd = text('元').find()
            if (hqsd.length > 0) {
                for (i = 0; i < hqsd.length; i++) {
                    var zr = hqsd.get(i).bounds()
                    if (zr.top > sd.top) {
                        click(zr.left, zr.top)
                        sleep(2000)
                        break
                    }
                }
            }

        } else {

            if (text('15.00').exists()) {
                var sd = text('15.00').findOne().bounds()
                click(sd.left, sd.top);
            }
            sleep(5000)
            if (text('提现金额').exists()) {
                输入支付宝帐号和密码()
                sleep(2000);
                if (text('确认提现').exists()) {
                    click('确认提现')
                }
                sleep(2000);
            }
            if (text('手动输入账号').exists()) {
                var sd = text('手动输入账号').findOne().bounds()
                click(sd.left, sd.top);
                sleep(8000)
                输入支付宝帐号和密码()
                sleep(2000);
                if (text('确认提现').exists()) {
                    click('确认提现')
                }
                sleep(2000);
            }
            if (textContains("余额不足").exists()) {
                if (text('知道了').exists()) {
                    var sd = text('知道了').findOne().bounds()
                    click(sd.left, sd.top);
                }
            }
            if (textContains("明天再来").exists()) {
                back()
            }

        }

    }

    sleep(2000);
    back()
    sleep(2000);
    back()
    sleep(2000);
    tdclick("t", "首页")
    sleep(2000);

    loginapp(火山极速版登录);
    tdclick("t", "首页")

    var jdsl = 1;

    while (true) {

        sleep(400)

        lineDown(20000, 40000);

        sleep(1000);

        toastLog("看第" + jdsl + "个视频")

        jdsl = jdsl + 1;

        if (textContains("参与").exists()) {
            var zxzb = text("首页").findOne().bounds();
            if (zxzb) {
                click(Number(zxzb.left), Number(zxzb.top))
                sleep(100)
                click(Number(zxzb.left), Number(zxzb.top))
            }
        }
        if (jdsl % 40 === 0 && text("宝箱").exists()) {

            tdclick("t", "宝箱")
            sleep(4000)

            if (device.height == 1280) {
                var p = images.findMultiColors(captureScreen(), "#FFE94D", [[18, 43, "#360100"]], {
                });
                if (p) {
                    click(649, 178)
                }
                sleep(4000)
                var p = images.findMultiColors(captureScreen(), "#E0220F", [[150, 416, "#FFED46"]], {
                });
                if (p) {
                    click(340, 821)
                    sleep(3000)
                    cloasad()
                }
            }
            sleep(2000)
            if (device.height == 1920) {
                var p = images.findMultiColors(captureScreen(), "#ff5757", [[184, 63, "#ffe94d"]], {
                });
                if (p) {
                    click(969, 322)
                }
            }
            sleep(2000)
            if (device.height == 1280) {

                var p = images.findMultiColors(captureScreen(), "#e0220f", [[4, 412, "#ffed46"], [135, 410, "#ffed46"]], {
                });
                if (p) {
                    toastLog("华为看广告")
                    click(343, 830)
                    cloasad()
                }

            }
            sleep(2000)
            if (textContains("看广告").exists()) {
                tdclick("tc", "看广告")
                cloasad()
            }
            sleep(3000)
            if (textContains("开宝箱得金币").exists()) {
                tdclick("tc", "开宝箱得金币")
                sleep(3000)
                tdclick("tc", "金币翻")
                sleep(3000)
                cloasad()
            }
            sleep(3000)
            if (textContains("去赚钱").exists()) {
                tdclick("tc", "去赚钱")
                cloasad()
            }

            loginapp(火山极速版登录);
            tdclick("t", "首页")
        }

        tdclick("t", "以后再说")

        if (jdsl > 105) {
            postlog("看视频105个完成");
            break;
        }

        while (1) {
            sleep(2000);
            if (text("首页").exists()) {
                tdclick("t", "首页")
                var zxzb = text("首页").findOne().bounds();
                if (zxzb) {
                    click(Number(zxzb.left), Number(zxzb.top))
                }
                break
            } else {
                sleep(2000);
                back()
                sleep(2000);
                if (textContains("关闭广告").exists()) {
                    tdclick("tc", "关闭广告")
                }
            }
        }
    }

}
function 快音登录() {
    while (1) {
        sleep(1000);
        if (text("立即提现至微信").exists()) {
            click("立即提现至微信");
        }
        sleep(2000);
        if (text("微信登录").exists()) {
            click("微信登录");
        }
        if (text("我知道了").exists()) {
            click("我知道了");
        }
        if (text("知道了").exists()) {
            click("知道了");
        }
        tdclick("id", "note_sign_close")
        sleep(2200);
        if (text("首页").exists() || text("福利").exists() || text("推荐").exists()) {
            toast('开始阅读视频');
            break;
        }
    }
}
function 快音() {

    loginapp(快音登录);
    sleep(4000);
    tdclick("t", "首页")
    sleep(2000);

    for (i = 1; i < 100; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频");

        tdclick("id", "note_sign_close")

        if (i % 10 === 0) {
            sleep(4000);
            tdclick("t", "首页")
            sleep(2000);
        }
    }

    postlog("看视频100个完成");

    loginapp(快音登录);
    sleep(2000);
    tdclick("t", "福利")
    sleep(8000)

    if (text("看视频再领100金币").exists()) {
        tdclick("t", "看视频再领100金币")
        postlog("签到完成");
        cloasad()
        sleep(2000);
        tdclick("id", "tv_close_bottom")
    }
    sleep(5000)
    if (textContains("去领取翻倍金币").exists()) {
        textContains("去领取翻倍金币").findOne().click();
        sleep(4000)
        back()
    }
    if (text("看视频领取100金币").exists()) {
        click("看视频领取100金币");
        cloasad()
        sleep(5000)
        tdclick("id", "tv_close_bottom")
    }
    if (text("看视频领取100金币").exists()) {
        tdclick("id", "tvLookViedo")
        cloasad()
        sleep(5000)
        tdclick("id", "tv_close_bottom")
    }
    sleep(5000)
    if (textContains("去领取翻倍金币").exists()) {
        textContains("去领取翻倍金币").findOne().click();
        sleep(4000)
        back()
    }
    sleep(2000);
    tdclick("id", "tv_close_bottom")

    loginapp(快音登录);
    sleep(5000)
    tdclick("t", "福利")
    sleep(5000)
    if (text("看视频领取100金币").exists()) {
        click("看视频领取100金币");
        cloasad()
        sleep(5000)
        tdclick("id", "tv_close_bottom")
    }
    sleep(2000);
    toastLog("去提现")

    if (text('提现').exists()) {
        var xj = id("cashEarn").findOne().text();
        ydmoneylog("金币:" + xj);
    }
    tdclick("t", "提现")
    sleep(8000)
    if (textContains("0.3").exists()) {
        tdclick("tc", "0.3")
    } else if (textContains("1元").exists()) {
        tdclick("tc", "1元")
    } else if (textContains("3元").exists()) {
        tdclick("tc", "3元")
    }
    sleep(4000);
    tdclick("t", "去提现")
    sleep(4000)
    tdclick("t", "立即提现")
    sleep(3000)
    tdclick("tc", "提现")
    sleep(4000)

    back()
    sleep(1000)
    back()
    sleep(2200)

    if (text("看视频赚钱").exists()) {
        for (i = 1; i < 4; i++) {
            tdclick("t", "看视频赚钱");
            cloasad()
            sleep(6000)
            tdclick("id", "tv_close_bottom")
        }
    }
    tdclick("id", "tv_close_bottom")

    while (1) {
        sleep(2200)
        if (text("喝水赚钱").exists()) {
            click("喝水赚钱");
            break
        } else {
            loginapp(快音登录);
            sleep(5000)
            tdclick("t", "福利")
        }
    }

    var srsdfsd = 0
    while (1) {
        sleep(5000)
        if (text("看视频再领100金币").exists()) {
            click("看视频再领100金币");
            sleep(1200)
            cloasad()
        }
        sleep(1200)
        if (text("x100").exists()) {
            click("x100", 0);
            sleep(1200)
            if (text("看视频领取100金币").exists()) {
                click("看视频领取100金币");
                sleep(1200)
                cloasad()
            }
            srsdfsd = srsdfsd + 1
            if (srsdfsd > 8) {
                break
            }
        } else {
            break
        }
    }
    postlog("补打卡完成");

}
function 微鲤看看登录() {
    while (1) {

        sleep(800);
        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (text('同意').exists()) {
            tdclick("id", "tv_agree")
        }
        tdclick("t", "再次查看")

        sleep(800);

        if (id("cb_choose").exists()) {
            var p = id("cb_choose").findOne().bounds();
            click(p.centerX(), p.centerY());
            sleep(800);
            if (id("tv_wechat").exists()) {
                var p = id("tv_wechat").findOne().bounds();
                click(p.centerX(), p.centerY());
            }
        }
        tdclick("id", "image_close")
        tdclick("t", "下一步")
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(1000);
        if (textContains("搜").exists()) {
            break;
        }
        sleep(1000);
        if (textContains("分享赚钱").exists()) {
            break;
        }
        sleep(1000);
        if (textContains("时段奖励").exists()) {
            break;
        }
    }
}
function 微鲤看看() {

    loginapp(微鲤看看登录);

    tdclick("id", "iv_tab_4")

    sleep(2800);

    tdclick("id", "image_close")
    tdclick("id", "image_close")

    if (textContains('看视频').exists()) {
        textContains("看视频").findOne().click()
        cloasad()
    }
    if (textContains('昨日数据').exists()) {
        tdclick("id", "iv_close")
    }
    tdclick("id", "image_close")

    tdclick("id", "tt_insert_dislike_icon_img")
    sleep(2800);
    if (text('提现兑换').exists()) {

        tdclick("id", "tv_sign_tips")
        sleep(5000);
        tdclick("id", "img_close")
        sleep(800);
        var xj = id("text_residue_change").findOne().text();
        ydmoneylog("现金:" + xj);
    }
    tdclick("id", "image_close")
    tdclick("t", "提现兑换")
    sleep(2800);
    tdclick("t", "跳过引导")
    sleep(1800);
    tdclick("t", "微信")
    sleep(1800);
    if (textContains('去设置').exists()) {
        tdclick("tc", "去设置")
        sleep(4800);
        var sfzurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getsfz&imei=" + __IMEI;
        var __sfz = aip("[TASK]", sfzurl, 10);
        setText(0, __sfz.smname);
        setText(1, __sfz.sfz)
        tdclick("t", "完成设置")
        sleep(2800);
        back();
    }
    sleep(1800);
    tdclick("t", "立即提现")

    loginapp(微鲤看看登录);

    for (i = 0; i < 80; i++) {

        var zxidl = id("tv_title").find();

        if (zxidl.nonEmpty()) {

            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(100, 200)), Number(zxzb.top));
            sleep(4000);
            if (text("看一看").exists() && text("聊一聊").exists()) {
                var zxxhl = 0;
                log("第" + i + "文章")
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (text("展开查看全文").exists()) {
                        click("展开查看全文")
                    }
                    if (zxxhl > 9) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了视频,直接返回")
                back()
            }
        } else {
            while (1) {
                sleep(1200);
                if (id("rl_bottom_4").exists()) {
                    tdclick("id", "tt_bu_close")
                    break;
                } else {

                    back();
                    tdclick("id", "tt_bu_close")
                    sleep(1200);
                    tdclick("t", "继续观看")
                    tdclick("t", "立即领取")
                    tdclick("t", "收下啦")
                    tdclick("t", "继续阅读")
                    tdclick("tc", "继续")
                    if (textContains("看视频立领").exists()) {
                        tdclick("tc", "看视频立领")
                        cloasad();
                        back();
                    }
                }
            }
        }

        sleep(2000);
        lineDown(1500, 3000);
        sleep(1200);
        tdclick("id", "tt_bu_close")
        tdclick("id", "image_close")
        tdclick("id", "img_close")
        tdclick("id", "tt_insert_dislike_icon_img")

        if (i % 20 === 0) {
            loginapp(微鲤看看登录);
            sleep(2000);
        }

    }
    postlog("看资讯80个完成")

    loginapp(微鲤看看登录);

    tdclick("id", "rl_bottom_1")

    for (i = 0; i < 40; i++) {

        lineDown(15000, 30000);

        sleep(800);
        tdclick("t", "继续观看")
        sleep(800);
        if (textContains('立即领取').exists()) {
            lineDown(15000, 30000);
        }
        sleep(800);
        tdclick("t", "继续阅读")
        toastLog("第" + i + "个视频");
        sleep(1200);
        tdclick("id", "tt_bu_close")
        tdclick("id", "image_close")
        tdclick("id", "tt_insert_dislike_icon_img")



    }
    postlog("看视频40个完成")

    loginapp(微鲤看看登录);

    tdclick("id", "rl_bottom_3")

    sleep(3000)

    var sxhb = 0;

    while (1) {

        sleep(1800);
        if (text('亲情红包').exists()) {
            click("亲情红包", 0);
            sleep(800);
            if (textContains('看视频再领').exists()) {
                var p = textContains('看视频再领').findOne().bounds();
                if (p != null) { click(p.centerX(), p.centerY()); }
                cloasad()
            }
        }
        sleep(1800);
        if (text('听歌赚钱').exists()) {
            click("听歌赚钱", 0);
        }
        sleep(1800);
        if (text('听歌红包').exists()) {
            click("听歌红包", 0);
            sleep(800);
            if (textContains('看视频再领').exists()) {
                var p = textContains('看视频再领').findOne().bounds();
                if (p != null) { click(p.centerX(), p.centerY()); }
                cloasad()
            }
        }
        if (textContains('看视频再领').exists()) {
            var p = textContains('看视频再领').findOne().bounds();
            if (p != null) { click(p.centerX(), p.centerY()); }
            cloasad()
        }
        sleep(25000)
        click("刷新红包")
        sxhb = sxhb + 1;
        if (sxhb > 3) {
            break;
        }

    }
    postlog("红包亲情红包听歌红包")

}
function 今日头条极速版登录() {
    while (1) {
        sleep(1000);
        if (text('红包可立即提现').exists()) {
            var p = classNameContains("mageView").depth(5).findOne().bounds();
            if (p) {
                click(p.left, p.top);
            }
        }
        sleep(600)
        tdclick("t", "同意")
        if (text('以后再说').exists()) {
            click("以后再说");
        }
        if (text('立即预约').exists()) {
            click("立即预约");
        }
        if (text('开始阅读').exists()) {
            click("开始阅读");
        }
        if (text('查看详情').exists()) {
            click("查看详情");
            sleep(2000)
            back()
        }
        sleep(1000)
        if (text("忽略").exists()) {
            click("忽略")
        } sleep(1000)
        if (text("我知道了").exists()) {
            click("我知道了")
        }
        sleep(1000);
        if (text("首页").exists() || text("推荐").exists() || text("发布").exists()) {
            break;
        }
    }
}
function 开宝箱() {

    var p = null;
    if (device.height == 1280) {
        p = images.findMultiColors(captureScreen(), "#E47000", [[-44, 25, "#F50000"]], {
        });
    }
    if (device.height == 1920) {
        p = images.findMultiColors(captureScreen(), "#E86E00", [[-62, 25, "#F50004"]], {
        });
    }
    if (p) {
        toast("找到宝箱，坐标为(" + p.x + ", " + p.y + ")");
        click(p.x, p.y);
        sleep(5000)
        if (textContains("看完视频再领").exists()) {
            var sd = textContains("看完视频再领").findOne().bounds()
            click(sd.left, sd.top);
            var srsr = 0;
            while (1) {
                sleep(5000);
                if (id("tt_video_ad_close").exists()) {
                    var p = id("tt_video_ad_close").findOne().bounds();
                    click(p.centerX(), p.centerY());
                    break;
                }
                if (id("tt_video_ad_close_layout").exists()) {
                    var p = id("tt_video_ad_close_layout").findOne().bounds();
                    click(p.centerX(), p.centerY());
                    break;
                }
                if (desc("关闭").exists() && Number(srsr) > 35) {
                    toast("广告时间" + srsr + "秒并且有关闭按钮")
                    var p = desc("关闭").findOne().bounds();
                    click(p.centerX(), p.centerY());
                    break;
                }
                if (text("继续观看").exists()) {
                    tdclick("t", "继续观看")
                    sleep(10000)
                }
                srsr = srsr + 5;
                toast("广告时间" + srsr + "秒")
                if (Number(srsr) > 60) {
                    toast("时间到了退出循环")
                    back();
                    break;
                }
            }
            if (text("继续观看").exists()) {
                tdclick("t", "继续观看")
                sleep(10000)
            }
        }
        toast("宝箱获取完成")
    }
}
function 今日头条极速版() {

    loginapp(今日头条极速版登录);
    sleep(2000);
    for (i = 0; i < 260; i++) {

        tdclick("tc", "收下红包")
        tdclick("tc", "以后再说")

        sleep(2000);
        if (text('不再提示').exists()) {
            click("不再提示");
        }
        sleep(2000);
        lineDown(1500, 3000);
        sleep(4000);

        if (id("bz").exists()) {
            var zxidl = id("bz").find();
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(100, 200)), Number(zxzb.top));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (textContains("写评论").exists()) {
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (zxxhl > 12) {
                        back();
                        break;
                    }
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

        if (text('任务').exists() && i % 30 === 0) {

            tdclick("t", "任务")
            sleep(5000)

            if (text('查看详情').exists()) {
                click("查看详情");
                sleep(2000)
                back()
            }

            if (textContains("好友也能得").exists()) {
                var p = classNameContains("view.View").depth(17).findOne().bounds();
                if (p) {
                    click(p.left, p.top);
                }
                sleep(1500)
            }
            sleep(1000)
            if (textContains("看视频").exists()) {
                var sd = textContains("看视频").findOne().bounds()
                click(sd.left, sd.top);
                cloasad()
            }
            sleep(1000)
            if (textContains("立即签到").exists()) {
                var sd = textContains("立即签到").findOne().bounds()
                click(sd.left, sd.top);
                sleep(8000)
                if (textContains("看视频").exists()) {
                    var sd = textContains("看视频").findOne().bounds()
                    click(sd.left, sd.top);
                    cloasad()
                }
                postlog("签到")
            }
            sleep(1000)
            if (textContains("看视频再领").exists()) {
                var sd = textContains("看视频再领").findOne().bounds()
                click(sd.left, sd.top);
                cloasad()
            }
            sleep(1000)
            if (text('开始阅读').exists()) {
                click("开始阅读");
            }
            sleep(3000)
            if (text('点击翻倍').exists()) {
                click("点击翻倍");
                sleep(3000)
                if (text('不再提示').exists()) {
                    click("不再提示");
                }
            }
            sleep(3000)
            if (text('不再提示').exists()) {
                click("不再提示");
            }
            sleep(1000)
            if (text('任务中心').exists()) {
                back();
            }
            开宝箱()
            loginapp(今日头条极速版登录);
            tdclick("t", "推荐")
        }
        var zzzz = 1;
        while (1) {
            toast("Back to home page")
            sleep(2200);
            if (text("首页").exists() && text("我的").exists() && text("发布").exists()) {
                sleep(1000)
                break;
            } else {
                zzzz = zzzz + 1;
                back();
                if (zzzz > 5) {
                    loginapp(今日头条极速版登录);
                    tdclick("t", "推荐")
                }
            }
        }
    }
    postlog("看资讯260个完成")
}
function 微信号() {

    var xfn = 1;
    var __PHONE = 1;
    while (1) {

        toastLog("检查微信登录情况" + xfn)
        importClass(android.database.Cursor);
        var cursor = context.getContentResolver().query(android.provider.ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
        while (cursor.moveToNext()) {
            //读取通讯录的姓名
            var name = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
            //读取通讯录的号码
            var number = cursor.getString(cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER));
            if (name != number) {
                if (name == "tt") {
                    toastLog("[名字]：" + name + " [号码]：" + number);
                    if (number.length > 5) {
                        __PHONE = number;
                    }
                    break;
                }
            }
        }
        sleep(1000);
        launch("com.tencent.mm");
        sleep(8000);
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        sleep(1000);
        if (text('登录').exists() && text('注册').exists()) {
            toastLog("本机没有登录微信")
            var log_text = 2;
            http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=poststatus&id=" + sjid + "&log_text=" + log_text + "&model=" + __MODEL + "&phone=" + __PHONE);
            break
        }
        sleep(2000)
        if (device.height == 1280) {
            click(629, 1147)
        }
        if (device.height == 1920) {
            click(943, 1845)
        }
        sleep(4000)
        if (textContains("微信号").exists()) {
            var log_text = textContains("微信号").findOne().text();
            http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=poststatus&id=" + sjid + "&log_text=" + log_text + "&model=" + __MODEL + "&phone=" + __PHONE);
            toastLog("检查完成" + log_text + __MODEL + __PHONE)
            break
        }
        xfn = xfn + 1;
        if (xfn > 5) {
            toastLog("暂时没有找到直接退出！")
            break
        }
    }
}
function 快看点登录() {

    while (1) {

        sleep(1000);
        tdclick("id", "btn_negative")
        sleep(1000);
        tdclick("id", "dialog_negative_buttom")
        sleep(1000);
        if (text('同意').exists()) {
            click("同意");
        }
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (text('去开启').exists()) {
            click("去开启");
            sleep(600)
            if (text('允许').exists()) {
                click("允许");
            }
            if (text('始终允许').exists()) {
                click("始终允许");
            }
        }
        tdclick("t", "立即更新")
        sleep(1000);
        if (text("福利").exists() || text("首页").exists() || id("logo_view").exists()) {
            tdclick("t", "立即更新")
            tdclick("t", "首页")
            break
        }

    }
}
function 快看点() {

    loginapp(快看点登录)
    sleep(3000)
    tdclick("t", "小视频")

    for (i = 1; i < 120; i++) {
        lineDown(15000, 30000);
        toastLog("第" + i + "个小视频")
        if (i % 60 === 0) {
            loginapp(快看点登录)
            sleep(3000)
            tdclick("t", "小视频")
        }
        if (i % 10 === 0) {
            tdclick("t", "小视频")
        }
    }
    postlog("小视频120个");

    loginapp(快看点登录)
    sleep(4000)
    if (text('福利').exists()) {
        tdclick("t", "福利")
        sleep(3500)
    }
    tdclick("id", "btn_close")
    toastLog("去提现")
    sleep(6000)
    if (textContains("已连续签到").exists()) {
        if (device.height == 1280) {
            click(device.width / 2, 896)
            sleep(1200)
        }
        if (device.height == 1920) {
            click(device.width / 2, 1366)
            sleep(1200)
        }
    }
    tdclick("t", "去签到")
    sleep(4000)
    if (textContains('签到成功').exists()) {
        if (device.height == 1280) {
            click(device.width / 2, 896)
            sleep(1200)
        }
        if (device.height == 1920) {
            click(device.width / 2, 1366)
            sleep(1200)
        }
        cloasad()
        sleep(4500)
        tdclick("id", "close")
    }
    tdclick("id", "close")
    sleep(4500)
    if (text('总金币').exists()) {
        var xj = id("gold_total").findOne().text();
        ydmoneylog("金币:" + xj);
        tdclick("t", "总金币")
        sleep(2500)
    }
    if (text("领现金").exists()) {

        if (text('领现金').exists()) {
            tdclick("t", "领现金")
            sleep(3500)
        }
        sleep(3500)
        tdclick("t", "分享好友立即领取")
        sleep(5000)
        if (text('返回快看点').exists()) {
            tdclick("t", "返回快看点")
        } else {
            back()
        }
        sleep(8000)
        tdclick("t", "立即提现")
        sleep(3000)
        tdclick("t", "确认提现")
        sleep(3000)
        if (text('提取').exists()) {
            tdclick("t", "提取")
        }
        sleep(3000)
        tdclick("t", "我知道了")

    }

    loginapp(快看点登录)
    sleep(4000)
    tdclick("t", "视频")
    for (i = 1; i < 40; i++) {
        lineDown(1500, 3000);
        let delayTime = random(25000, 40000);
        sleep(delayTime);
        lineDown(1500, 3000);
        toastLog("第" + i + "个视频")
        if (i % 60 === 0) {
            loginapp(快看点登录)
            sleep(3000)
            tdclick("t", "视频")
        }
        if (i % 10 === 0) {
            tdclick("t", "视频")
        }
    }
    postlog("视频40个");

}
function NoxCleaner() {


    var meizusafe = getAppName("com.meizu.safe");
    var huaweisafe = getAppName("com.huawei.systemmanager");
    if (meizusafe != null) {
        sleep(1200)
        recents()
        sleep(4000)
        click(539, 1710)
        sleep(3000)
        while (1) {
            launch("com.meizu.safe");
            sleep(6000);
            if (text("手机管家").exists()) {
                break
            } else {
                stopapp("com.meizu.safe");
                sleep(3000);
            }
        }
        tdclick("id", "opt_btn")
        var sfd = 0
        while (1) {
            sleep(5000)
            if (text("检测中").exists()) {
                toastLog("等待扫描...")
                sleep(5000)
            } else {
                if (textContains("建议").exists()) {
                    sleep(2000)
                    tdclick("id", "opt_btn")
                    sleep(5000)
                    back()
                    break
                }
            }
            sfd = sfd + 1
            if (sfd > 5) {
                break
            }
        }
    } else if (huaweisafe != null) {
        sleep(1200)
        recents()
        sleep(4000)
        click(358, 1137)
        sleep(3000)

        while (1) {
            launch("com.huawei.systemmanager");
            sleep(6000);
            if (text("清理加速").exists()) {
                break
            } else {
                stopapp("com.huawei.systemmanager");
                sleep(3000);
            }
        }
        tdclick("t", "清理加速")
        var sfd = 0
        while (1) {
            sleep(5000)
            if (textContains("正在扫描").exists()) {
                toastLog("等待扫描...")
                sleep(5000)
            } else {
                if (textContains("一键清理").exists()) {
                    sleep(2000)
                    tdclick("id", "scan")
                    sleep(5000)
                    back()
                    break
                }
            }
            sfd = sfd + 1
            if (sfd > 5) {
                break
            }
        }
    }
}
function 中青看点登录() {

    while (1) {
        sleep(1000);

        tdclick("id", "iv_close")
        tdclick("id", "ql")

        if (text('同意').exists()) {
            click("同意");
        }
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (text('去开启').exists()) {
            click("去开启");
            sleep(600)
            if (text('允许').exists()) {
                click("允许");
            }
            if (text('始终允许').exists()) {
                click("始终允许");
            }
        }
        sleep(1000);

        if (text('微信登录领红包').exists()) {
            tdclick("t", "微信登录领红包")
            sleep(2500)
            tdclick("id", "px")
            sleep(2500)
            tdclick("t", "微信一键登录")
            sleep(10000)
            if (text('同意').exists()) {
                click("同意");
                sleep(1500)
            }
        }
        if (desc("搜索").exists()) {

            if (id('uc').exists()) {
                tdclick("id", "uc")
                sleep(1500)
                if (text('登录领红包').exists()) {
                    tdclick("t", "登录领红包")
                    sleep(1500)
                    tdclick("id", "px")
                    sleep(1500)
                    tdclick("t", "微信一键登录")
                    sleep(10000)
                    if (text('同意').exists()) {
                        click("同意");
                        sleep(1500)
                    }
                }
            }
            tdclick("id", "ub")
            break
        }

    }
}
function 中青看点() {

    loginapp(中青看点登录);
    tdclick("id", "uc")
    sleep(2000)
    if (text('我的青豆').exists()) {
        var xj = id("ajx").findOne().text();
        ydmoneylog("金币:" + xj);
        tdclick("t", "提现兑换")
        sleep(7000)
        tdclick("t", "微信")
        sleep(2000)
        tdclick("t", "立即提现")
        sleep(6000)
    }

    loginapp(中青看点登录);
    sleep(2000)
    tdclick("id", "ub")

    for (i = 0; i < 120; i++) {

        var zxidl = id("xq").find();
        if (zxidl.nonEmpty()) {

            var zxzb = id("xq").findOne().bounds();
            click(Number(zxzb.left + random(150, 300)), Number(zxzb.top));
            sleep(4000);

            toastLog("第" + i + "个文章")

            if (textContains("观点").exists()) {

                if (id("coin_front_text_image").exists()) {

                } else {
                    if (id("new_income_container").exists()) {
                        tdclick("id", "new_income_container")
                        sleep(4000)
                        tdclick("t", "翻倍领取")
                        cloasad();
                        sleep(4000)
                        tdclick("id", "iv_close")
                    }
                }
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    tdclick("tc", "查看全文")
                    tdclick("t", "忽略")
                    if (zxxhl > 9) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了视频,直接返回")
            }
        } else {

            while (1) {
                sleep(1200);
                if (desc("搜索").exists()) {
                    tdclick("t", "推荐")
                    break;
                } else {
                    back();
                    sleep(1200);
                    tdclick("id", "ub")
                    tdclick("t", "忽略")
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (i % 40 === 0) {
            loginapp(中青看点登录);
        }
        tdclick("t", "忽略")

        if (id("ll_article_list_video").exists()) {
            tdclick("id", "ll_article_list_video")
            cloasad();
            sleep(4000)
            tdclick("id", "iv_close")
        }


    }
    postlog("看资讯120个完成")

    loginapp(中青看点登录);
    tdclick("id", "ue")
    for (i = 0; i < 80; i++) {
        sleep(2000);
        var zxidl = textContains("次播放").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + 200), Number(zxzb.top));
            sleep(4000);
            tdclick("id", "ql")
            sleep(3000);
            if (textContains("转发").exists()) {
                toast("第" + i + "个视频")
                lineDown(35000, 50000);
                back();
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

    }
    postlog("看视频80个完成")
}
function 抖音登录() {

    while (1) {
        sleep(1000);
        if (text('同意并使用服务').exists()) {
            click("同意并使用服务");
        }
        if (text('跳过').exists()) {
            click("跳过");
        }
        sleep(600)
        if (text('以后再说').exists()) {
            click("以后再说");
            sleep(1500)
        }
        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (text('去看看').exists()) {
            click('去看看')
            sleep(1500)
            back()
        }
        if (text('立即预约').exists()) {
            click("立即预约");
        }
        if (text('开始阅读').exists()) {
            click("开始阅读");
        }
        if (text('查看详情').exists()) {
            click("查看详情");
            sleep(2000)
            back()
        }
        sleep(600)
        if (textContains('更多主播').exists()) {
            back()
            sleep(1500)
        }
        sleep(600)
        if (textContains('朋友推荐').exists()) {
            back()
            sleep(1500)
        }
        sleep(600)
        if (text('退出').exists()) {
            click("退出");
            sleep(1500)
        }
        sleep(1000)
        if (text("关注").exists() || text("推荐").exists() || textContains("金币").exists() || id("ikk").exists() || text("我").exists()) {
            sleep(3000)
            if (text('我知道了').exists()) {
                click("我知道了");
            }
            break;
        }
    }
}
function 抖音() {

    if (dyzl == 1) {
        抖音修改资料()
    }
    if (dyfsp == 1) {
        发视频()
    }
    loginapp(抖音登录);
    var ttau = random(5, 15)
    for (i = 0; i < ttau; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频");

        if (text('我知道了').exists()) {
            click('我知道了')
        }
        if (text('去看看').exists()) {
            click('去看看')
            sleep(1500)
            back()
        }
        if (text('开心收下').exists()) {
            click('开心收下')
            sleep(1500)
        }
        sleep(600)
        if (textContains('更多主播').exists()) {
            back()
            sleep(1500)
        }
        sleep(600)
        if (text('退出').exists()) {
            click("退出");
            sleep(1500)
        }
        sleep(600)
        if (text('以后再说').exists()) {
            click("以后再说");
            sleep(1500)
        }
        var z = 互动("点赞")
        if (z) {
            if (descContains("未选中，喜欢").exists()) {
                var ts = descContains("未选中，喜欢").find()
                for (i = 0; i < ts.length; i++) {
                    var zxzb = ts.get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        press(500, 700, 100)
                        sleep(100)
                        press(500, 700, 100)
                        break
                    }
                }
            }
        }

    }
    if (dygz == 1 && gzsl < 80) {
        主动关注粉丝()
    }
    if (dyfsx == 1) {
        发信()
    }
    if (dyqg == 1) {
        取关()
    }
    loginapp(抖音登录);
    var ttay = random(10, 25)
    for (i = 0; i < ttay; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频");

        if (text('我知道了').exists()) {
            click('我知道了')
        }
        if (text('去看看').exists()) {
            click('去看看')
            sleep(1500)
            back()
        }
        if (text('开心收下').exists()) {
            click('开心收下')
            sleep(1500)
        }
        sleep(600)
        if (text('更多主播').exists()) {
            tdclick("d", "关闭")
            sleep(2500)
        }
        sleep(600)
        if (text('退出').exists()) {
            click("退出");
            sleep(1500)
        }
        sleep(600)
        if (text('以后再说').exists()) {
            click("以后再说");
            sleep(1500)
        }
        var z = 互动("点赞")
        if (z) {
            if (descContains("未选中，喜欢").exists()) {
                var ts = descContains("未选中，喜欢").find()
                for (i = 0; i < ts.length; i++) {
                    var zxzb = ts.get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        press(500, 700, 100)
                        sleep(100)
                        press(500, 700, 100)
                        break
                    }
                }
            }
        }

    }
    postlog("看视频养完成")
}
function 抖音修改资料() {

    while (1) {
        loginapp(抖音登录);
        toastLog("修改资料")
        sleep(1200)
        var txsurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getdyzl";
        var __tt = aip("[抖音资料获取]", txsurl, 10);
        var tx = __tt.tx
        var nc = __tt.nc
        var qm = __tt.qm

        var img = images.load(tx);
        if (img != null) {
            images.save(img, "/sdcard/DCIM/0.jpg", "jpg", 100);
            app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/0.jpg"))));
        }
        sleep(6200)
        tdclick("t", "我")
        sleep(4000)
        tdclick("tc", "编辑资料")
        sleep(4000)



        if (text("点击更换头像").exists()) {
            var txg = text("点击更换头像").findOne().bounds()
            click(txg.left, txg.top - 150)
            sleep(2000)
        }
        tdclick("t", "从相册选择")
        sleep(3000)
        tdclick("t", "允许")
        tdclick("t", "始终允许")
        sleep(3000)
        tdclick("id", "apk")
        sleep(2000)
        tdclick("t", "确认")
        sleep(3000)
        tdclick("t", "将新头像发布到日常")
        sleep(2000)
        tdclick("t", "完成")

        sleep(3000)
        tdclick("t", "名字")
        sleep(3000)
        setText(nc)
        sleep(2000)
        tdclick("t", "保存")

        sleep(3000)
        tdclick("t", "简介")
        sleep(3000)
        setText(qm)
        sleep(2000)
        tdclick("t", "保存")


        sleep(3000)
        //tdclick("t", "性别")

        if (text("性别").exists()) {
            var t = text("性别").findOne().bounds()
            click(t.right + 100, t.centerY())
            sleep(2000)
        }

        sleep(3000)
        tdclick("t", "男")
        sleep(2000)


        sleep(3000)
        if (text("所在地").exists()) {
            var t = text("所在地").findOne().bounds()
            click(t.right + 100, t.centerY())
            sleep(3000)
            tdclick("t", "中国")
            sleep(2000)
            tdclick("t", "广东")
            sleep(2000)
            tdclick("t", "广州")
            sleep(2000)
        }


        sleep(3000)
        //tdclick("t", "生日")
        if (text("生日").exists()) {
            var t = text("生日").findOne().bounds()
            click(t.right + 100, t.centerY())
            sleep(2000)
        }
        sleep(3000)
        if (descContains("年").exists()) {
            var tar = 1
            while (1) {
                sleep(2000)
                var t = descContains("年").findOne().bounds()
                swipe(t.right - 50, t.top, t.right - 50, t.bottom + 120, 600)
                sleep(2000)
                var n = descContains("年").findOne().desc()
                if (parseInt(n) < 1984) {
                    toastLog("年龄设置成功")
                    break
                }
                tar = tar + 1
                if (tar > 6) {
                    break
                }
            }
        }
        if (descContains("月").exists()) {
            var t = descContains("月").findOne().bounds()
            swipe(t.right - 50, t.bottom - 20, t.right - 50, t.top - 300, 600)
            sleep(2000)
        }
        if (descContains("日").exists()) {
            var t = descContains("日").findOne().bounds()
            swipe(t.right - 50, t.bottom - 10, t.right - 50, t.top - 300, 600)
            sleep(2000)
        }
        if (text("确定").exists()) {
            tdclick("t", "确定")
            sleep(2000)
            back();
            http.get("http://" + __SERVER + "/index.php?g=api&m=nf&a=posvideo&type=9&imei=" + __IMEI);
            break
        }

    }
}
function 主动关注粉丝() {

    zgz = 0

    while (1) {

        toastLog("去关注粉")

        loginapp(抖音登录);

        sleep(6000)
        if (desc("搜索").exists()) {
            tdclick("d", "搜索")
            sleep(8000)
        }
        if (text("取消").exists() && text("猜你想搜").exists()) {
            toastLog("输入搜索词")
            var kci = ["80后大叔", "帅哥", "男神", "行走的荷尔蒙", "行走荷尔蒙", "男人", "好男人", "成熟", "肌肉男", "情感", "情感情感", "情感语录", "情感文字", "情感音乐", "情感修复", "情感共鸣", "扎心情感", "大叔", "抖音大叔", "中年大叔", "沧桑大叔", "大叔小馆", "帅大叔", "成熟大叔", "单身大叔", "油腻大叔", "胡渣大叔", "德鲁大叔", "山师大叔", "呆萌大叔"]
            var index = Math.floor((Math.random() * kci.length));
            setText(kci[index])
            sleep(4000)
            tdclick("t", "搜索")
            sleep(8000)
        }
        sleep(4000)
        tdclick("t", "视频")
        sleep(6000)
        filter()
        var sjdd = random(1, 6)
        for (i = 1; i < sjdd; i++) {
            swipe(400, device.height - 400, 400, 300, 800);
            sleep(2000)
        }
        toastLog("随机在当前页面找一个视频")
        sleep(5000)
        if (textContains("w").exists()) {
            var dz = textContains("w").findOne().bounds()
            if (dz) {
                click(dz.left, dz.top - random(15, 50))
            }
        }
        sleep(4000)
        if (textContains("精彩评论").exists()) {

            toastLog("打开评论")
            sleep(4000)
            sleep(3000)
            if (desc("关注").exists()) {
                var ts = desc("关注").find()
                for (i = 0; i < ts.length; i++) {
                    var zxzb = ts.get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        toastLog(zxzb.top)
                        click(zxzb.left + 40, zxzb.top + 370)
                        break
                    }
                }
            }
            sleep(8000)
            if (textContains("条评论").exists()) {
                评论关注()
            } else {
                toastLog("没有找到评论数量，可能是出错了")
            }
        }
        if (zgz > 20) {
            toastLog("关注已超过20个结束本次任务")
            break
        }
    }
    postlog("本次共关注" + zgz + "个好友")
    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=posvideo&type=6&imei=" + __IMEI + "&num=" + zgz);
}
function 评论关注() {

    var btwz = 0
    var zpl = textContains("条评论").findOne().text();
    if (zpl) {
        toastLog("本视频共" + zpl)
        var tzy = textContains("条评论").findOne().bounds();
        btwz = tzy.bottom
        if (zpl.indexOf("w") >= 1) {
            zpl = parseInt(zpl) * 10000
        }
        if (parseInt(zpl) < 40) {
            toastLog("本视频评语太少")
            return false;
        }
    }
    sleep(1000)
    var sjdd = random(1, 5)
    for (i = 1; i < sjdd; i++) {
        sleep(1000)
        swipe(400, device.height - 500, 400, 300, 600);
        sleep(2000)
    }
    //点击本页某个人去查洵
    //总共多少页
    var zfy = parseInt(parseInt(zpl) / 5)
    for (v = 1; v < zfy; v++) {
        sleep(2000)
        var sjdd = descContains("的头像").find()
        for (i = 0; i < sjdd.length - 1; i++) {
            var ta = sjdd.get(i + 1).bounds();
            if ((ta.left == 48 || ta.left == 32) && ta.top > btwz) {
                click(ta.left + 5, ta.top + 5)
                toastLog("进入个人资料页面...")
                sleep(6000)
                if (textContains("评论并转发").exists()) {
                    sleep(1000)
                    toastLog("不小心点到回复")
                    sleep(1000)
                    back()
                }
                if (text("获赞").exists() && text("关注").exists() && textContains("抖音号").exists() && desc("更多").exists()) {
                    sleep(800)
                    if (text("这是私密帐号").exists() || !text("#  关注").exists()) {
                        sleep(2200)
                        toastLog("这是私密帐号或者本号已关注")
                        sleep(1200)
                        back()
                        sleep(2200)
                    } else {
                        var img = captureScreen();
                        var point = images.findMultiColors(img, "#FD5474", [[0, 8, "#FD5474"], [12, 2, "#242630"]], {
                            region: [0, 384, device.width, (device.height / 2)]
                        });
                        if (point) {
                            toastLog("女性可以添加")
                            sleep(1200)
                            if (text("这是私密帐号").exists()) {
                                sleep(2200)
                                toastLog("这是私密帐号")
                                sleep(1200)
                            } else {
                                //去关注
                                sleep(2000)
                                if (text("#  关注").exists()) {
                                    p = text("#  关注").findOne().bounds();
                                    if (p) {
                                        toastLog("关注本号")
                                        click(p.left + 100, p.top + 10)
                                        zgz = zgz + 1
                                        toastLog("当前已关注" + zgz + "个")
                                        sleep(2000)
                                    }
                                } else {
                                    toastLog("本号已关注或不允许关注")
                                }
                                sleep(2000)
                            }
                            //你可能感兴趣的朋友
                            if (text("你可能感兴趣").exists() && text("查看更多").exists()) {
                                toastLog("有推荐的好友可添加")
                                if (text("可能感兴趣的人").exists()) {
                                    var gxq = text("可能感兴趣的人").find()
                                    for (i = 0; i < gxq.length; i++) {
                                        var ta = gxq.get(i).bounds();
                                        if (ta) {
                                            click(ta.left + 10, ta.top + 10)
                                            sleep(6000)
                                            if (text("获赞").exists() && text("关注").exists() && textContains("抖音号").exists() && desc("更多").exists()) {
                                                sleep(800)
                                                var img = captureScreen();
                                                var point = images.findMultiColors(img, "#FD5474", [[0, 8, "#FD5474"], [12, 2, "#242630"]], {
                                                    region: [0, 384, device.width, (device.height / 2)]
                                                });
                                                if (point) {
                                                    toastLog("女性可以添加")
                                                    sleep(1200)
                                                    if (text("这是私密帐号").exists()) {
                                                        sleep(2200)
                                                        toastLog("这是私密帐号")
                                                        sleep(1200)
                                                    } else {
                                                        //去关注
                                                        sleep(2000)
                                                        if (text("#  关注").exists()) {
                                                            p = text("#  关注").findOne().bounds();
                                                            if (p) {
                                                                toastLog("关注本号")
                                                                click(p.left + 100, p.top + 10)
                                                                zgz = zgz + 1
                                                                toastLog("当前已关注" + zgz + "个")
                                                                sleep(2000)
                                                            }
                                                        } else {
                                                            toastLog("本号已关注或不允许关注")
                                                        }
                                                        sleep(2000)
                                                    }
                                                }
                                            }
                                            back()
                                            sleep(3000)
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
        }
        if (zgz > 20) {
            toastLog("关注已超过20个结束本次任务")
            break
        }
        sleep(1200)
        if (textContains("条评论").exists()) {

        } else {
            toastLog("打开评论")
            sleep(4000)
            if (desc("关注").exists()) {
                var ts = desc("关注").find()
                for (i = 0; i < ts.length; i++) {
                    var zxzb = ts.get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        toastLog(zxzb.top)
                        click(zxzb.left + 40, zxzb.top + 370)
                        break
                    }
                }
            }
        }

        toastLog("上滑评论")
        sleep(2000)
        swipe(400, device.height - 500, 400, 300, 600);
        sleep(2000)

        sleep(1200)
        if (desc("at").exists()) {
            var r = desc("at").findOne().bounds()
            if (r.top < device.height - 500) {
                sleep(1000)
                toastLog("不小心点到回复")
                sleep(1000)
                back()
                sleep(1200)
            }
        }

    }

}
function 发信() {

    toastLog("发信")

    loginapp(抖音登录);

    sleep(5000)

    tdclick("t", "我")
    sleep(2000)
    tdclick("t", "粉丝")
    sleep(6000)

    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getsearchkyword";
    var __SKW = aip("[adword]", taskurl, 20);
    var ho = __SKW.ho;
    var ht = __SKW.ht;
    var hs = __SKW.hs;
    var hf = __SKW.hf;
    var five = __SKW.five;
    var six = __SKW.six;
    var seven = __SKW.seven;
    var rights = __SKW.rights;

    var lbds = 0
    var fslrds = 0
    while (1) {
        // sleep(3000)
        // if (text("回关").exists()) {
        //     var hg = text("回关").find()
        //     for (iv = 0; iv < hg.length; iv++) {
        //         var fbid = hg.get(iv).bounds()
        //         click(fbid.left, fbid.top)
        //         sleep(3000)
        //         tdclick("t", "取消")
        //     }
        // }
        sleep(5000)
        if (text("互相关注").exists()) {

            var friendslist = text("互相关注").find()

            for (i = 0; i < friendslist.length; i++) {

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
                    var point = images.findMultiColors(img, "#FD5474", [[0, 8, "#FD5474"], [12, 2, "#242630"]], {
                        region: [0, 384, device.width, (device.height / 2)]
                    });
                    if (point) {
                        click("私信")
                        sleep(3000)
                        var jsfsg = 0
                        if (textContains(rights).exists()) {
                            toastLog("本号已完成")
                            jsfsg = 1
                        }
                        if (jsfsg == 1) {
                            fslrds = fslrds + 1
                        } else {
                            var ttar = ho
                            if (text(ttar).exists()) {
                                ttar = ht
                            }
                            if (text(ht).exists()) {
                                toastLog("本号已打过招呼")
                                fslrds = fslrds + 1
                            } else {

                                setText(ttar)
                                sleep(2000)
                                tdclick("id", "ic_")
                                sleep(2000)
                                tdclick("d", "发送")
                                sleep(1000)
                                tdclick("t", "发送")
                                sleep(random(15000, 25000))
                                lbds = lbds + 1;

                                if (ttar == ho) {
                                    setText(ht)
                                    sleep(2000)
                                    tdclick("id", "ic_")
                                    sleep(2000)
                                    tdclick("d", "发送")
                                    sleep(1000)
                                    tdclick("t", "发送")
                                    sleep(random(3000, 5000))
                                }
                            }

                        }
                    }
                }
                while (1) {
                    sleep(2000)
                    if (!text("私信").exists() && !textContains("获赞").exists() && textContains("关注").exists() && textContains("粉丝").exists()) {
                        break
                    }
                    else {
                        back()
                        sleep(1200)
                    }
                }
            }
        }
        sleep(1000)
        swipe(400, device.height - 400, 400, 420, 600);
        sleep(2000)
        if (fslrds > 7) {

            toastLog("一路都是发送了的好友,随机下滑找一些")
            for (i = 0; i < random(4, 15); i++) {
                sleep(1000)
                swipe(400, device.height - 400, 400, 420, 600);
                sleep(2000)
            }
        }
        if (fslrds > 10) {
            toastLog("一路都是发送了的好友,可能没有好友了")
            break
        }
        if (lbds > 30) {
            toastLog("今天聊了30个好友")
            break
        }
        if (text("发现好友").exists()) {
            toastLog("到底了")
            break
        }
    }
    postlog("本次发消息" + lbds + "个好友")
    http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=posvideo&type=8&imei=" + __IMEI + "&num=" + lbds);

    toastLog("去等待粉丝消息回信")
    loginapp(抖音登录);
    sleep(5000)
    tdclick("t", "消息")

    var dsc = 0
    while (1) {
        sleep(5000)

        p = images.findMultiColors(captureScreen(), "#FACE15", [[23, -6, "#FACE15"]], {
            region: [0, 0, device.width, (device.height - 300)]
        });
        if (p) {

            toast("坐标为(" + p.x + ", " + p.y + ")");
            click(p.x, p.y);
            toastLog("发现新消息")
            sleep(4000)
            if (textContains("发送消息").exists() || desc("视频通话").exists() || desc("语音通话").exists()) {

                xiarr = [ho, ht, hs, hf, five, six, seven]
                var dqi = 0;
                for (i = 0; i < xiarr.length; i++) {
                    sleep(1200)
                    if (text(xiarr[i]).exists()) {
                        dqi = i
                    }
                }
                if (dqi + 1 < 7) {

                    setText(xiarr[dqi + 1])
                    sleep(2000)
                    tdclick("id", "ic_")
                    sleep(1000)
                    tdclick("d", "发送")
                    sleep(1000)
                    tdclick("t", "发送")
                    sleep(2000)

                    if (dqi + 1 == 2) {
                        sleep(1000)
                        setText(xiarr[3])
                        sleep(2000)
                        tdclick("id", "ic_")
                        sleep(1000)
                        tdclick("d", "发送")
                        sleep(1000)
                        tdclick("t", "发送")
                        sleep(2000)
                    }
                    if (dqi + 1 == 4) {
                        sleep(1000)
                        setText(xiarr[5])
                        sleep(1000)
                        tdclick("id", "ic_")
                        sleep(2000)
                        tdclick("d", "发送")
                        sleep(1000)
                        tdclick("t", "发送")
                        sleep(2000)
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
        } else {

            toastLog("等待消息...")
            sleep(random(5000, 15000))
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
            isapplunch();
            dsc = dsc + 1
            if (dsc > 40) {
                toastLog("等待消息的时间太长了...结束本次发信")
                break
            }

        }
    }
}
function 发视频() {

    toastLog("发视频")

    files.ensureDir("/sdcard/Moives/")
    var apk路径 = "/sdcard/Moives/1.mp4";
    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getvideo&imei=" + __IMEI;
    var __Getvideo = aip("[Getvideo]", taskurl, 20);
    var title = __Getvideo.title;
    var sptype = __Getvideo.type;

    if (title) {

        var videourl = "http://" + __SERVER + "/data/upload/" + __Getvideo.videourl;
        toastLog("开始下载视频......");
        while (1) {
            var res = http.get(videourl);
            if (res.statusCode >= 200 && res.statusCode < 300) {
                files.writeBytes(apk路径, res.body.bytes());
                sleep(2000);
                toastLog("下载成功");
                app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(apk路径))));
                break;
            } else if (res.statusCode == 404) {
                toast("页面没找到哦...");
            } else {
                toast("下载错误: " + res.statusCode + " " + res.statusMessage);
            }
        }
        while (1) {

            loginapp(抖音登录);
            sleep(5000)
            toastLog("发视频按钮")
            if (text("消息").exists()) {
                var d = text("消息").findOne().bounds()
                if (d) {
                    click(d.left - 70, d.top)
                }
            }
            sleep(3000)
            tdclick("t", "允许")
            tdclick("t", "始终允许")
            sleep(3000)
            sleep(9000)
            if (text("相册").exists()) {

                tdclick("t", "相册")
                sleep(6000)
                tdclick("t", "视频")
                sleep(6000)
                if (text("视频").exists()) {
                    var d = descContains("视频").findOne().bounds()
                    if (d) {
                        click(d.left + 3, d.top + 3)
                    }
                }
                sleep(random(5000, 8000))
                if (text("选择").exists()) {
                    var d = text("选择").findOne().bounds()
                    if (d) {
                        click(d.left, d.top)
                    }
                }
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
                }
                sleep(random(3000, 6000))
                if (text("发布").exists()) {
                    var d = text("发布").find().get(1).bounds()
                    if (d) {
                        click(d.left, d.top)
                        http.get("http://" + __SERVER + "/index.php?g=api&m=yd&a=posvideo&imei=" + __IMEI + "&type=" + sptype);
                        break;
                    }
                }

            }
        }
        for (i = 0; i < 8; i++) {
            toastLog("等待上传完成" + (i * 10) + "秒")
            sleep(10 * 1000);
            device.wakeUp();
            device.keepScreenOn();
            device.keepScreenDim();
        }
    } else {
        toastLog("没有找到可用的视频,请在后台添加")
    }


}
function filter() {
    sleep(3000)
    if (text("筛选").exists()) {
        var ts = text("筛选").find()
        for (i = 0; i < ts.length; i++) {
            var zxzb = ts.get(i).bounds();
            if (Number(zxzb.left) > 0) {
                click(zxzb.left, zxzb.top)
                sleep(200)
                break
            }
        }
    }
    sleep(3000)
    var yj = random(1, 3);
    var sj = random(1, 4);

    if (yj == 1) {
        //综合
        if (device.height == 1280) {
            click(113, 465)
        }
        if (device.height == 1920) {
            click(194, 675)
        }
    }
    if (yj == 2) {
        //最新发布
        if (device.height == 1280) {
            click(113, 465)
        }
        if (device.height == 1920) {
            click(442, 690)
        }
    }
    if (yj == 3) {
        //最多点赞
        if (device.height == 1280) {
            click(463, 467)
        }
        if (device.height == 1920) {
            click(691, 683)
        }
    }
    sleep(5000)
    if (sj == 1) {
        //不限
        if (device.height == 1280) {
            click(106, 644)
        }
        if (device.height == 1920) {
            click(170, 955)
        }
    }
    if (sj == 2) {
        //一天内
        if (device.height == 1280) {
            click(286, 645)
        }
        if (device.height == 1920) {
            click(459, 968)
        }
    }
    if (sj == 3) {
        //一周内
        if (device.height == 1280) {
            click(466, 644)
        }
        if (device.height == 1920) {
            click(702, 952)
        }
    }
    if (sj == 4) {
        //半年内
        if (device.height == 1280) {
            click(631, 648)
        }
        if (device.height == 1920) {
            click(925, 962)
        }
    }
    sleep(3000)

    sleep(3000)
    if (text("筛选").exists()) {
        var ts = text("筛选").find()
        for (i = 0; i < ts.length; i++) {
            var zxzb = ts.get(i).bounds();
            if (Number(zxzb.left) > 0) {
                click(zxzb.left, zxzb.top)
                sleep(200)
                break
            }
        }
    }

}
function 取关() {

    toastLog("取关")

    loginapp(抖音登录);

    sleep(5000)

    tdclick("t", "我")
    sleep(2000)
    tdclick("t", "关注")
    sleep(6000)
    sleep(1000)
    var sjdd = random(50, 80)
    for (i = 1; i < sjdd; i++) {
        sleep(1000)
        swipe(400, device.height - 50, 400, 300, 600);
        sleep(5000)
    }
    sleep(2000);
    while (1) {
        sleep(3000)
        if (text("已关注").exists()) {
            var hg = text("已关注").find()
            for (iv = 0; iv < hg.length; iv++) {
                var fbid = hg.get(iv).bounds()
                click(fbid.left, fbid.top)
                sleep(3000)
                tdclick("t", "取消")
            }
        }
        sleep(1000)
        swipe(400, device.height - 50, 400, 300, 600);
        sleep(2000)
        if (!text("互相关注").exists() && !text("已关注").exists()) {
            break
        }
        if (text("发现好友").exists()) {
            toastLog("到底了")
            break
        }
    }
}
function 巨鲸看点登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        sleep(1000);
        if (text("我的").exists() || text("任务").exists()) {

            tdclick("t", "我的")
            sleep(3000);

            if (text('登录/注册').exists()) {
                tdclick("t", "登录/注册")
                sleep(1500)
                tdclick("t", "登录领现金")
                sleep(3000)
                tdclick("t", "登录领现金")
                sleep(6000)
                if (text('同意').exists()) {
                    click("同意");
                }
            }
            tdclick("t", "首页")
            break
        }
    }
}
function 巨鲸看点() {

    loginapp(巨鲸看点登录);
    tdclick("t", "我的")
    sleep(4000);
    if (text('提现申请').exists()) {
        tdclick("t", "提现申请")
        sleep(6000);
        if (text("0.3元").exists()) {
            tdclick("t", "0.3元")
        } else if (text("10元").exists()) {
            tdclick("t", "10元")
        }
        sleep(1000);
        tdclick("t", "立即提现")

    }

    loginapp(巨鲸看点登录);

    tdclick("t", "任务")
    sleep(8000);
    tdclick("t", "立即签到")
    sleep(4000);
    if (textContains("视频").exists()) {
        tdclick("tc", "视频")
        cloasad()
        tdclick("id", "iv_close")
    }
    sleep(4000);
    if (text("领取双倍奖励").exists()) {
        tdclick("id", "gold_videodouble_btn")
        cloasad()
        tdclick("id", "iv_close")
        tdclick("id", "doublegold_close_iv")
    }
    // sleep(2000);
    // swipe(200, device.height - 300, 200, 400, 800);
    // sleep(2000);
    // if (text("去观看").exists()) {
    //     for (i = 0; i < 15; i++) {
    //         sleep(3000);
    //         if (text("去观看").exists()) {
    //             tdclick("t", "去观看")
    //             sleep(5000);
    //             cloasad()
    //             sleep(9000);
    //             if (!text("任务中心").exists()) {
    //                 back()
    //             }
    //             sleep(6000);
    //             tdclick("id", "doublegold_close_iv")
    //             sleep(2000);
    //             loginapp(巨鲸看点登录);
    //             tdclick("t", "任务")
    //             sleep(8000);
    //             swipe(200, device.height - 300, 200, 400, 800);
    //             sleep(7000);
    //         }
    //     }
    // }
    sleep(2000);
    if (text("领取奖励").exists()) {
        tdclick("t", "领取奖励")
        sleep(9000);
        tdclick("id", "doublegold_close_iv")
    }

    loginapp(巨鲸看点登录);
    sleep(2000);
    for (i = 0; i < 80; i++) {

        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);
        var zxidl = textContains("评").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(100, 200)), Number(zxzb.top - 50));
            sleep(4000);
            toastLog("第" + i + "个文章")
            var zxxhl = 0;
            while (1) {
                lineDown(1500, 3000);
                zxxhl = zxxhl + 1;
                sleep(800);
                if (zxxhl > 7) {
                    back();
                    break;
                }
            }
        }

        while (1) {
            sleep(2000);
            if (text("我的").exists() && text("任务").exists()) {
                tdclick("t", "推荐")
                break
            } else {
                sleep(1000);
                back()
                tdclick("t", "继续阅读")
                tdclick("id", "iv_close")
                app.launch(packagename)
                sleep(2200)
            }
        }

        tdclick("t", "继续阅读")
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

    }

    postlog("看资讯80个完成")

    loginapp(巨鲸看点登录);
    sleep(2000);
    tdclick("t", "视频")
    sleep(2000);

    for (i = 0; i < 10; i++) {

        sleep(2000);
        var zxidl = id("iv_media_play").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left), Number(zxzb.top));
            sleep(4000);
            tdclick("id", "ob")
            sleep(3000);
            if (textContains("评论").exists()) {
                toast("第" + i + "个视频")
                lineDown(35000, 50000);
                back();
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        }

        sleep(2000);
        lineDown(1500, 3000);

    }
    postlog("看视频10个完成")


}
function 红包资讯登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        tdclick("id", "login_in")
        sleep(1000);
        tdclick("id", "iv_close")
        sleep(1000);
        if (text("头条").exists() || text("赚钱").exists()) {
            break
        }
    }
}
function 红包资讯() {

    loginapp(红包资讯登录);
    sleep(4000);
    tdclick("t", "赚钱")
    sleep(3000);
    tdclick("id", "iv_close")
    sleep(3000);
    if (textContains("看激励视频").exists()) {
        tdclick("tc", "看激励视频")
        cloasad()
        sleep(3000);
        tdclick("id", "iv_close")
    }
    tdclick("id", "iv_close")
    sleep(4000);
    if (text('去提现').exists()) {
        tdclick("t", "去提现")
        sleep(6000);
        if (text('我的提现').exists()) {
            var tp = id("tv_cash_price").find()
            for (i = 0; i < tp.length; i++) {
                var sr = tp.get(i).bounds()
                if (sr) {
                    click(sr.left, sr.top)
                    sleep(2000)
                    tdclick("t", "立即提现", "t")
                    sleep(2000)
                }
            }
        }
    }

    loginapp(红包资讯登录);
    sleep(2000);
    tdclick("t", "小视频")
    for (i = 0; i < 30; i++) {
        sleep(2000);
        tdclick("id", "iv_close")
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);
        tdclick("t", "点击领红包")
        sleep(2000);
        tdclick("t", "点击重试")
        sleep(2000);
        if (text("观看视频翻倍").exists()) {
            tdclick("t", "观看视频翻倍")
            cloasad()
        }
    }
    postlog("看小视频30个完成")

    for (i = 0; i < 7; i++) {
        loginapp(红包资讯登录);
        sleep(5000);
        tdclick("t", "刮刮乐")
        sleep(3000);
        sleep(4000);
        tdclick("id", "iv_close")
        sleep(2000);
        var zxidl = text("拼手气,").find();
        if (zxidl.length > 0) {
            sleep(2000);
            tdclick("id", "iv_close")
            sleep(2000);
            click(device.width / 2, device.height / 2);
            sleep(4000);
            if (textContains("即可获奖").exists()) {

                toast("第" + i + "个卡")
                sleep(3000);
                if (device.height == 1280) {
                    gesture(1000, [97, 471], [297, 471], [620, 591], [97, 677], [297, 677], [620, 797], [109, 895], [297, 883], [620, 1003])
                }
                if (device.height == 1920) {
                    gesture(1000, [145, 760], [445, 760], [930, 940], [145, 1069], [445, 1069], [912, 1231], [145, 1378], [445, 1378], [930, 1558])
                }
                sleep(4000);
                tdclick("id", "iv_close")
                sleep(4000);
                if (textContains("看视频").exists()) {
                    tdclick("tc", "看视频")
                    cloasad()
                    tdclick("t", "确定")
                    sleep(4000);
                    tdclick("id", "iv_close")
                }

            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        }
    }

    loginapp(红包资讯登录);
    sleep(2000);
    tdclick("t", "头条")
    sleep(2000);
    for (i = 0; i < 50; i++) {
        sleep(2000);
        tdclick("id", "iv_close")
        sleep(2000);
        var zxidl = id("txtText").find();
        if (zxidl.length > 0) {
            var zxzb = id("txtText").findOne().bounds();
            click(Number(zxzb.centerX()), Number(zxzb.centerY()));
            sleep(4000);
            tdclick("id", "ob")
            sleep(3000);
            if (id("btnBack").exists()) {
                toast("第" + i + "个视频")
                var zxxhl = 0;
                while (1) {
                    lineDown(4000, 8000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (zxxhl > 11) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        } else {
            loginapp(红包资讯登录);
            sleep(2000);
            tdclick("t", "头条")
            sleep(2000);
        }
        sleep(2000);
        lineDown(1500, 3000);
    }
    postlog("看资讯50个完成")


}
function 秘乐短视频登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        tdclick("id", "ring")
        sleep(1000);
        tdclick("id", "tv_agree")
        sleep(1000);
        if (text("微信登录").exists()) {
            tdclick("id", "cb_policy")
            sleep(1000);
            tdclick("id", "tv_login_wx")
            sleep(10000);
            tdclick("t", "同意")
        }
        sleep(1000);
        if (textContains("给你发了一个红包").exists()) {
            tdclick("id", "iv_btn_confirm")
            sleep(3000);
            tdclick("t", "立即提现")
            sleep(6000);
            swipe(200, 1000, 200, 200, 800);
            sleep(4000);
            for (i = 0; i < 5; i++) {
                if (text("去观看").exists()) {
                    tdclick("t", "去观看")
                    cloasad()
                    sleep(2000)
                }
            }
            tdclick("t", "立即提现")
            sleep(3000);
            back()
            sleep(3000);
            back()
        }
        sleep(1000);
        tdclick("id", "iv_close")
        sleep(1000);
        if (text("我的").exists() || text("任务").exists()) {
            break
        }
    }
}
function 秘乐短视频() {

    loginapp(秘乐短视频登录);
    sleep(2000);
    tdclick("t", "我的")
    sleep(4000);
    if (text('提现兑换').exists()) {
        sleep(2000);
        swipe(200, 200, 200, 1000, 800);
        sleep(2000);
        var xj = id("tv_gold_money_tip").findOne().text();
        ydmoneylog("金币:" + xj);
        tdclick("t", "提现兑换")
        sleep(8000);
        if (text('提现页面').exists()) {
            tdclick("t", "0.5元")
            sleep(2000);
            swipe(200, 1000, 200, 200, 800);
            sleep(3000);
            for (i = 0; i < 5; i++) {
                if (text("去观看").exists()) {
                    tdclick("t", "去观看")
                    cloasad()
                    sleep(2000)
                }
            }
            sleep(2000)
            tdclick("t", "立即提现")
            sleep(2000)
        }
    }
    loginapp(秘乐短视频登录);

    tdclick("t", "任务")
    sleep(4000);
    if (id("tv_gold").exists() && textContains("恭喜获得").exists()) {
        var ty = textContains("恭喜获得").findOne().bounds()
        click(ty.left, ty.bottom + 70)
    }
    if (id("iv_action_double").exists()) {
        tdclick("id", "iv_action_double")
        cloasad()
        sleep(5000);
        tdclick("id", "iv_dialog_dismiss")
    }

    toastLog("领取今日红包")

    for (c = 1; c < 9; c++) {

        sleep(1800);
        if (text('今日红包').exists() && !textContains('继续领红包').exists()) {
            toastLog("今日红包")
            tdclick("t", "今日红包");
            cloasad()
            sleep(1200);
        }
        sleep(1800);
        if (textContains('继续领红包').exists()) {
            toastLog("继续领取红包")
            var zxzb = textContains("继续领红包").findOne().bounds();
            if (zxzb != null) {
                click(Number(zxzb.left), Number(zxzb.top));
            }
            sleep(5000);
            cloasad()
            sleep(1200);
        }
        sleep(1800);
        if (textContains('预约明日红包').exists()) {
            toastLog("预约明日红包")
            var zxzb = textContains("预约明日红包").findOne().bounds();
            if (zxzb != null) {
                click(Number(zxzb.left), Number(zxzb.top));
            }
            cloasad()
            sleep(5000);
        }
        if (textContains('恭喜你获得福袋').exists()) {
            toastLog("获得福袋")
            var zxzb = textContains("恭喜你获得福袋").findOne().bounds();
            if (zxzb != null) {
                click(Number(zxzb.left), Number(zxzb.top));
            }
            sleep(5000);;
            var zxzb = textContains("收下奖励").findOne().bounds();
            if (zxzb != null) {
                click(Number(zxzb.left), Number(zxzb.top));
                cloasad()
            }
        }
        sleep(1200);
        if (textContains('继续拆福袋').exists()) {
            var zxzb = textContains("收下奖励").findOne().bounds();
            if (zxzb) {
                click(Number(zxzb.left), Number(zxzb.top));
                cloasad()
            }
        }
    }
    postlog("领取7个今日红包")

    loginapp(秘乐短视频登录);
    sleep(2000);
    tdclick("t", "视频")
    for (i = 1; i < 40; i++) {

        sleep(2000);
        lineDown(10000, 20000);
        sleep(2000);

        var fra = "tv_float_icon"

        for (r = 0; r < 5; r++) {

            if (r > 0) {
                var x = fra + "_" + r;
            } else {
                var x = fra
            }

            if (id(x).exists()) {

                tdclick("id", x)
                sleep(7000)
                tdclick("id", "iv_action_double")
                sleep(6000)
                if (id("tv_gold").exists() && textContains("恭喜获得").exists()) {
                    var ty = textContains("恭喜获得").findOne().bounds()
                    click(ty.left, ty.bottom + 70)
                }
                cloasad()
                sleep(7000);
                tdclick("id", "iv_dialog_dismiss")
                break
            }
        }
        sleep(2000);
        if (textContains("/20").exists()) {
            tdclick("tc", "/20")
            cloasad()
            sleep(5000);
            tdclick("id", "iv_dialog_dismiss")
        }
        sleep(1200);
        if (id("iv_action_double").exists()) {
            sleep(2000)
            tdclick("id", "iv_action_double")
            sleep(6000)
            if (id("tv_gold").exists() && textContains("恭喜获得").exists()) {
                var ty = textContains("恭喜获得").findOne().bounds()
                click(ty.left, ty.bottom + 70)
            }
            cloasad()
            sleep(7000);
            tdclick("id", "iv_dialog_dismiss")
        }
        tdclick("id", "iv_dialog_dismiss")
        sleep(2000)

        if (i % 20 === 0) {
            loginapp(秘乐短视频登录);
            sleep(2000);
            tdclick("t", "视频")
        }
    }

    postlog("看小视频40个完成")


}
function 刷宝短视频登录() {

    while (1) {
        sleep(800);
        tdclick("t", "同意并继续")
        sleep(800);
        tdclick("tc", "同意")
        sleep(800);
        tdclick("t", "以后再说")
        tdclick("t", "下次再说")
        tdclick("t", "取消")
        sleep(800);
        if (text('应用').exists() && text("设置").exists()) {
            back()
        }
        sleep(2500)
        if (id("ll_tap").exists()) {
            sleep(1000);
            break
        }
    }
}
function 刷宝短视频() {

    loginapp(刷宝短视频登录);

    var 我 = id("ll_tap").find().get(3).bounds()
    if (我) {
        click(我.left, 我.top)
        sleep(3000)
    }

    tdclick("id", "iv_mine_balance")
    sleep(5000)
    tdclick("t", "立即提现")
    sleep(5000)
    if (text("领取").exists()) {
        tdclick("t", "立即领取")
        sleep(2000)
        back()
    }
    sleep(2000);
    swipe(200, 1200, 200, 400, 800);
    sleep(2000);
    if (textContains("10.00元").exists()) {
        tdclick("tc", "10.00元")
    } else {
        tdclick("tc", "3.00")
    }
    sleep(2000)
    tdclick("t", "立即提现")
    sleep(5000)
    tdclick("t", "确定")
    sleep(3000)
    tdclick("t", "立即提现")
    sleep(3000)

    loginapp(刷宝短视频登录);
    sleep(3000)
    tdclick("t", "首页")
    sleep(3000)
    tdclick("t", "推荐")

    for (i = 1; i < 60; i++) {

        lineDown(10000, 20000);

        toastLog("第" + i + "个视频");

        sleep(600)

        var z = 互动("点赞")
        if (z) {
            tdclick("id", "image_view")
        }
        var z = 互动("关注")
        if (z) {
            tdclick("id", "attention")
        }
        if (text("查看广告").exists()) {
            back()
        }
        sleep(600)
        if (textContains('更多主播').exists() || !text('推荐').exists()) {
            back()
            sleep(1500)
        }
        sleep(600)
        if (text('退出').exists()) {
            click("退出");
            sleep(1500)
        }
        tdclick("tc", "继续")

        tdclick("t", "推荐")

        if (i % 30 === 0) {
            loginapp(刷宝短视频登录);
        }

    }

    postlog("看视频60个完成")

    loginapp(刷宝短视频登录);
    sleep(3000)
    tdclick("t", "任务")
    sleep(5000)
    tdclick("id", "imgClose")
    sleep(5000)
    if (text("立即签到").exists()) {

        tdclick("t", "立即签到", "t")
        sleep(4000)
        if (text("看视频签到").exists()) {
            var tsa = text("看视频签到").findOne().bounds()
            click(tsa.left + 30, tsa.top + 10)
            cloasad()
            sleep(4000)
            tdclick("id", "view_close")
        }
    }
    sleep(2000);
    swipe(200, 1200, 200, 400, 800);
    sleep(2000);
    for (i = 0; i < 3; i++) {
        if (text("领取").exists()) {
            tdclick("t", "领取")
            cloasad()
            sleep(4000)
            tdclick("id", "view_close")
        }
    }

}
function 划宝登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        tdclick("id", "image_close")
        sleep(1000);
        if (text('微信登录').exists()) {
            tdclick("t", "微信登录")
            sleep(1000);
        }
        sleep(1000);
        if (text('立即更新').exists()) {
            tdclick("t", "立即更新")
            sleep(10000)
            updateapp()
        }
        sleep(1000);
        if (text('推荐').exists() && text('提现').exists()) {
            toastLog("登录成功")
            break
        }
    }
}
function 划宝() {

    loginapp(划宝登录);
    sleep(2000)
    if (id("tv_see_ad").exists()) {
        tdclick("id", "tv_see_ad")
        sleep(2000)
        tdclick("id", "tv_see")
        cloasad()
        sleep(2000)
        tdclick("t", "好的")
    }
    sleep(3000)
    for (i = 1; i < 15; i++) {
        sleep(5000)
        var fx = random(1, 100)
        if (fx > 50) {
            swipe(device.width / 2, device.height / 2, 0, device.height / 2, 800);
        } else {
            swipe(device.width / 2, device.height / 2, device.width, device.height / 2, 800);
        }
        tdclick("t", "确定")
        tdclick("t", "好的")
        sleep(8000)
    }

    loginapp(划宝登录);
    sleep(2000)
    tdclick("t", "推荐")
    sleep(3000)
    if (text("每日奖励").exists()) {
        tdclick("t", "每日奖励")
        for (i = 1; i < 10; i++) {
            sleep(1200)
            tdclick("t", "每日奖励")
            if (text("今日剩余:0次").exists()) {
                break
            }
            sleep(2000)
            tdclick("t", "观看视频", "t")
            cloasad()
            sleep(8000)
            tdclick("t", "好的")
            sleep(8000)

        }
        tdclick("id", "image_close")
    }
    loginapp(划宝登录);
    sleep(2000)
    tdclick("t", "推荐")
    sleep(4000)
    if (text("提现").exists()) {
        tdclick("t", "提现")
        for (i = 1; i < 30; i++) {
            sleep(2000)
            tdclick("id", "tv_see_ad", "t")
            sleep(2000)
            tdclick("id", "tv_see_ad", "t")
            sleep(2000)
            tdclick("id", "tv_see_ad", "t")
            sleep(2000)
            tdclick("id", "tv_see")
            sleep(2000)
            tdclick("id", "tv_see")
            sleep(9000)
            if (id("tv_see").exists()) {

            } else {
                cloasad()
                sleep(2000)
            }

            tdclick("t", "好的")
            sleep(2000)

        }
        tdclick("id", "image_close")
    }

    loginapp(划宝登录);
    sleep(2000)
    tdclick("id", "image_close")
    sleep(2000)
    if (text("提现").exists()) {

        tdclick("t", "提现")
        sleep(4000)
        tdclick("t", "提现")
        sleep(4000)
        tdclick("id", "tv_see")
        sleep(2000)
        tdclick("id", "tv_see")
        sleep(2000)
        tdclick("id", "tv_see")
        cloasad()
        sleep(2000)
        tdclick("t", "好的")
        sleep(2000)

    }
}
function 趣键盘极速版登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        sleep(1000);
        tdclick("id", "image_close")
        sleep(1000);
        tdclick("id", "image_close")
        sleep(1000);
        if (id('new_red_open').exists()) {
            tdclick("id", "new_red_open")
            sleep(2000);
            back();
        }
        if (text('赚钱').exists() && text('我').exists()) {
            toastLog("登录成功")
            break
        }
    }
}
function 趣键盘极速版() {

    loginapp(趣键盘极速版登录);
    sleep(2000)
    tdclick("id", "ivReceiveCoin")
    sleep(4000)
    tdclick("t", "我")
    sleep(3000)
    tdclick("t", "提现")
    sleep(3000)
    if (text('0.4元').exists()) {
        tdclick("t", "0.4元")
    }
    tdclick("t", "立即提现")
    sleep(3000)
    tdclick("t", "立即提现")
    sleep(3000)
    tdclick("tc", "提现")
    sleep(3000)

    loginapp(趣键盘极速版登录);
    sleep(2000)
    tdclick("t", "赚钱")
    sleep(3000)
    if (text('立即签到').exists()) {
        tdclick("t", '立即签到')
    }
    sleep(3000)
    if (text('再领一次').exists()) {
        tdclick("t", '再领一次')
        cloasad()
        sleep(2000);
        tdclick("id", "iv_close")
    }
    for (i = 1; i < 4; i++) {
        sleep(2000)
        if (text("立即领取").exists()) {
            tdclick("t", "立即领取")
            cloasad()
            sleep(2000);
            tdclick("id", "iv_close")
        }
    }

    loginapp(趣键盘极速版登录);
    sleep(2000)
    tdclick("t", "短视频")
    sleep(3000)
    for (i = 1; i < 60; i++) {
        lineDown(10000, 20000);
        toastLog("第" + i + "个视频");
        sleep(600)
        if (textContains("广告").exists()) {
            lineDown(3000, 5000);
        }
    }
}
function 天天爱喝水登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1200);
        if (text('给你发了一个新人红包').exists()) {
            tdclick("id", "openButton")
            sleep(3000);
            tdclick("id", "loginButton")
            sleep(3000);
            tdclick("t", "微信一键登录")
            sleep(3000);
        }
        sleep(1200);
        if (text('立即翻倍').exists()) {
            tdclick("t", "立即翻倍")
            cloasad()
            sleep(3000);
            tdclick("t", "关闭")
        }
        sleep(1200);
        if (text('高级签到').exists()) {
            tdclick("t", "高级签到")
            cloasad()
            sleep(3000);
            tdclick("t", "关闭")
            sleep(2000);
            tdclick("id", "btn")
        }
        sleep(1000);
        tdclick("t", "关闭")
        sleep(1200);
        if (text('我的').exists() && text('喝水').exists()) {
            break
        }
    }
}
function 天天爱喝水() {

    loginapp(天天爱喝水登录);
    sleep(2000)
    tdclick("t", "我的")
    sleep(4000)
    if (textContains('登录').exists()) {
        tdclick("tc", "登录")
        sleep(3000);
        tdclick("t", "微信一键登录")
        sleep(3000);
    }
    if (text('提现').exists()) {
        tdclick("id", "myMoneyView")
        sleep(5000)
        if (text('0.3元').exists()) {
            tdclick("t", "0.3元")
        } else if (text('0.5元').exists()) {
            tdclick("t", "0.5元")
        } else if (text('1元').exists()) {
            tdclick("t", "1元")
        } else if (text('2元').exists()) {
            tdclick("t", "2元")
        } else if (text('5元').exists()) {
            tdclick("t", "5元")
        } else if (text('10元').exists()) {
            tdclick("t", "10元")
        } else if (text('20元').exists()) {
            tdclick("t", "20元")
        }
        sleep(3000)
        tdclick("t", "立即提现")
        sleep(3000)
    }

    loginapp(天天爱喝水登录);
    sleep(2000)
    tdclick("t", "喝水")
    sleep(3000)

    for (i = 1; i < 30; i++) {
        sleep(2000);
        if (text('喝水领金币').exists()) {
            tdclick("t", "喝水领金币")
        }
        sleep(1200);
        if (id("bubbleImageView").exists()) {
            tdclick("id", "bubbleImageView")
            sleep(5000);
        }
        if (text('立即翻倍').exists()) {
            tdclick("t", "立即翻倍")
            cloasad()
            sleep(3000);
            tdclick("t", "关闭")
        }
        tdclick("t", "关闭")
        tdclick("t", "稍后再说")
        sleep(4000);
    }
    sleep(2000);
    swipe(200, device.height - 300, 200, 400, 800);
    sleep(2000);
    sleep(2000);
    if (text('去观看').exists()) {
        for (i = 1; i < 10; i++) {
            sleep(2000);
            if (text('去观看').exists()) {
                tdclick("t", "去观看")
                cloasad()
                sleep(3000);
                tdclick("t", "关闭")
            }
            tdclick("t", "稍后再说")
        }
    }

}
function 喝水赚钱宝登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        if (text('给你发了一个新人红包').exists()) {
            tdclick("id", "openButton")
            sleep(3000);
            tdclick("id", "loginButton")
            sleep(3000);
            tdclick("t", "微信一键登录")
            sleep(3000);
        }
        sleep(1000);
        if (text('立即翻倍').exists()) {
            tdclick("t", "立即翻倍")
            cloasad()
            sleep(3000);
            tdclick("t", "关闭")
        }
        sleep(1000);
        if (text('高级签到').exists()) {
            tdclick("t", "高级签到")
            cloasad()
            sleep(3000);
            tdclick("t", "关闭")
            sleep(2000);
            tdclick("id", "btn")
        }
        sleep(1000);
        tdclick("t", "关闭")
        sleep(2000);
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(1000);
        if (text('我的').exists() && text('喝水').exists()) {
            break
        }
    }
}
function 喝水赚钱宝() {

    loginapp(喝水赚钱宝登录);
    sleep(2000)
    tdclick("t", "我的")
    sleep(3000)
    tdclick("id", "tt_insert_dislike_icon_img")
    sleep(1800);
    tdclick("t", "去提现")
    sleep(5000)
    if (text('0.3元').exists()) {
        tdclick("t", "0.3元")
    }
    sleep(3000)
    tdclick("t", "提现")
    sleep(3000)
    if (text('1元').exists()) {
        tdclick("t", "1元")
    }
    sleep(3000)
    tdclick("t", "提现")
    sleep(3000)

    loginapp(喝水赚钱宝登录);
    sleep(2000)
    tdclick("t", "首页")
    sleep(2000);
    tdclick("id", "tt_insert_dislike_icon_img")
    sleep(2000);
    tdclick("id", "tt_bu_close")
    sleep(1200);
    sleep(3000)
    var tw = classNameContains("TextView").find()
    if (tw) {
        for (i = 0; i < tw.length; i++) {
            sleep(1200);
            tdclick("id", "tt_insert_dislike_icon_img")
            sleep(2000);
            tdclick("id", "tt_bu_close")
            sleep(1200);
            var aaar = tw.get(i).text()
            if (Number(aaar)>50) {
                toastLog("点击第" + i + "个能量")
                var paaar = tw.get(i).bounds()
                click(paaar.centerX(), paaar.centerY())
                cloasad()
                sleep(3000);
                if (text('双倍奖励').exists()) {
                    tdclick("t", "双倍奖励")
                    cloasad()
                    sleep(3000);
                    tdclick("id", "iv_delete")
                } else {
                    tdclick("id", "iv_delete")
                }
            }
        }
    }
    sleep(2000);
    if (text('补卡').exists()) {
        for (i = 1; i < 5; i++) {
            tdclick("id", "tt_insert_dislike_icon_img")
            sleep(2000);
            if (text('补卡').exists()) {
                tdclick("t", "补卡")
                sleep(2000);
                tdclick("t", "去补卡")
                tdclick("t", "补打卡")
                sleep(2000);
                tdclick("t", "立即观看")
                cloasad()
                sleep(3000);
                tdclick("id", "iv_delete")
            }
        }
    }

    loginapp(喝水赚钱宝登录);
    sleep(2000)
    tdclick("t", "赚钱")
    sleep(3000)
    if (id("tv_energy1").exists()) {
        var fra = "tv_energy"
        for (r = 1; r < 6; r++) {
            sleep(1200);
            tdclick("id", "tt_insert_dislike_icon_img")
            sleep(2000);
            tdclick("id", "tt_bu_close")
            sleep(1200);
            var x = fra + r;
            if (id(x).findOne().text() > 50) {
                var p = id(x).findOne().bounds()
                click(p.left + 5, p.top + 5)
                cloasad()
                sleep(3000);
                if (text('双倍奖励').exists()) {
                    tdclick("t", "双倍奖励")
                    cloasad()
                    sleep(3000);
                    tdclick("id", "iv_delete")
                } else {
                    tdclick("id", "iv_delete")
                }
            }
        }
    }
}
function 欢乐视频极速版登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        sleep(1000);
        if (text('继续赚钱').exists()) {
            sleep(3000);
            tdclick("t", "微信一键登录")
            sleep(3000);
        }
        sleep(1000);
        if (id("multiply_btn").exists()) {
            tdclick("id", "multiply_btn")
            cloasad()
            sleep(6000);
            tdclick("id", "cancel_action")
        }
        sleep(1000);
        if (text('赚钱').exists() && text('小视频').exists()) {
            break
        }
    }
}
function 欢乐视频极速版() {

    loginapp(欢乐视频极速版登录);
    sleep(2000)
    tdclick("t", "赚钱")
    sleep(3000)
    if (text('金币翻倍').exists()) {
        tdclick("t", "金币翻倍")
        cloasad()
        sleep(6000);
        tdclick("id", "cancel_action")
    }
    sleep(2000)
    tdclick("t", "立即提现")
    sleep(5000)
    if (text('3元').exists()) {
        tdclick("t", "3元")
    }
    sleep(3000)
    click(device.width - 100, device.height - 20)
    sleep(3000)

    loginapp(欢乐视频极速版登录);
    sleep(2000)
    tdclick("t", "小视频")
    sleep(3000)

    for (i = 1; i < 60; i++) {

        lineDown(10000, 20000);
        toastLog("第" + i + "个视频");
        sleep(1200);

        if (id("multiply_btn").exists()) {

            tdclick("id", "multiply_btn")
            cloasad()
            sleep(6000);
            tdclick("id", "cancel_action")
        }
        sleep(2000);
    }

    loginapp(欢乐视频极速版登录);
    sleep(2000)
    tdclick("t", "首页")
    sleep(3000)

    for (i = 1; i < 40; i++) {

        lineDown(1500, 3000);
        sleep(1200);
        tdclick("id", "start_layout")
        let delayTime = random(25000, 40000);
        sleep(delayTime);
        toastLog("第" + i + "个视频");
        sleep(1200);
        if (id("multiply_btn").exists()) {
            tdclick("id", "multiply_btn")
            cloasad()
            sleep(6000);
            tdclick("id", "cancel_action")
        }
        sleep(2000);
    }

}
function 笔芯极速版() {
    欢乐视频极速版()
}
function 吉喵视频登录() {
    while (1) {
        sleep(1200)
        tdclick("t", "同意并继续")
        sleep(1200)
        tdclick("t", "一键开启")
        sleep(1200)
        tdclick("id", "img_close")
        if (id("tv_tip").exists()) {
            tdclick("id", "tv_tip")
            sleep(3200)
            tdclick("t", "使用微信账号登录")
            sleep(10000);
            tdclick("t", "同意")
        }
        sleep(1200)
        if (text("赚钱").exists() && text("我的").exists()) {
            break
        }
    }
}
function 吉喵视频() {

    loginapp(吉喵视频登录);
    sleep(3000)
    tdclick("t", "我的")
    sleep(4000)
    tdclick("id", "tv_money_tip")
    sleep(3000)
    tdclick("t", "立即提现")
    sleep(4000)
    if (text("0.3元").exists()) {
        tdclick("t", "0.3元", "t")
        sleep(3000)
        tdclick("t", "确认提现")
        sleep(3000)
        if (text("观看广告解锁提现").exists()) {
            tdclick("t", "观看广告解锁提现", "t")
            cloasad()
        }
    }

    loginapp(吉喵视频登录);
    sleep(3000)
    tdclick("t", "刷新")
    sleep(3000)
    for (i = 1; i < 60; i++) {

        lineDown(1500, 3000);
        sleep(1200);
        tdclick("id", "start_layout")
        let delayTime = random(25000, 40000);
        sleep(delayTime);

        toastLog("第" + i + "个视频");
        sleep(600)
        if (i < 10) {
            tdclick("id", "iv_praise")
        }
        sleep(1600)
        if (textContains('+').exists()) {
            var 我 = textContains('+').findOne().bounds()
            if (我) {
                click(我.left + 5, 我.top + 3)
                sleep(5000)
                tdclick("t", "翻倍领取", "t")
                cloasad()
                sleep(5500)
            }
        }

        if (i % 20 === 0) {
            loginapp(吉喵视频登录);
        }

    }

    postlog("看视频60个完成")

    loginapp(吉喵视频登录);
    sleep(3800);
    tdclick("t", "我的")
    sleep(4000)
    if (text("填写邀请码").exists()) {
        tdclick("t", "填写邀请码", "t")
        sleep(4000)
        setText("2564111")
        tdclick("t", "绑定邀请码", "t")
    }

}
function 米读极速版登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        tdclick("id", "t")
        sleep(1000);
        tdclick("id", "i0")
        var zx = text("女生频道").findOne().bounds()
        if (zx) {
            click(zx.left + 20, zx.top - 100)
            sleep(800)
        }
        sleep(1800)
        tdclick("t", "进入米读")
        sleep(1000);
        if (text('我的').exists() && text('福利').exists()) {
            toastLog("登录成功")
            break
        }
    }
}
function 米读极速版() {

    loginapp(米读极速版登录);

    tdclick("t", "我的")
    sleep(4000);
    if (text('提现').exists()) {
        tdclick("t", "提现")
        sleep(6000);
        if (text('看视频立即领取').exists()) {
            tdclick("t", "看视频立即领取")
            cloasad()
            sleep(3000);
        }
        if (textContains('看视频最高翻').exists()) {
            tdclick("tc", "看视频最高翻")
            cloasad()
            launch(packagename);
            back();
        }
        tdclick("tc", "新人专")
        tdclick("t", "立即提现")
        sleep(2000);
        tdclick("t", "确认提现")
        sleep(2000);
        tdclick("tc", "阅读进度")
        sleep(2000);
        tdclick("t", "确认提现")
        back()
        sleep(200);
        back()
    }

    back()
    sleep(3000);
    back()
    sleep(3000);
    tdclick("t", "福利")
    sleep(3000);
    tdclick("id", "t")
    sleep(3000);
    if (textContains('看视频').exists()) {
        tdclick("tc", "看视频")
        cloasad()
    }
    sleep(1800)
    if (text('抽手机大奖').exists()) {

    } else {
        var zx = textContains("已签").findOne().bounds()
        if (zx) {
            click(device.width - 80, zx.top)
            sleep(1800)
        }
        if (textContains('看视频').exists()) {
            tdclick("tc", "看视频")
            cloasad()
        }
    }

    loginapp(米读极速版登录);

    tdclick("t", "知道了")
    sleep(2000)
    tdclick("t", "书架")
    sleep(2000)
    tdclick("t", "本周导读")
    sleep(2000)
    tdclick("tc", "免费阅读")
    sleep(2000)
    tdclick("tc", "继续阅读")
    sleep(5000)
    if (textContains('看小视频').exists()) {
        var zx = textContains("看小视频").findOne().bounds()
        if (zx) {
            click(zx.centerX(), zx.top - 80)
            sleep(1800)
        }
        cloasad()
    }
    tdclick("t", "加入书架")

    while (1) {

        sleep(2000)
        tdclick("t", "书架")
        tdclick("t", "本周导读")
        tdclick("t", "我知道了")
        tdclick("t", "放弃本次优惠")
        tdclick("tc", "免费阅读")
        tdclick("tc", "继续阅读")
        lineDown(10000, 20000, "x")
        sleep(1000)
        if (textContains('看小视频').exists()) {
            var zx = textContains("看小视频").findOne().bounds()
            if (zx) {
                click(zx.centerX(), zx.top - 80)
                sleep(1800)
            }
            cloasad()
        }
    }
}
function 欢喜浏览器(){

}
function 玉米粒儿(){
    
}
function 羚萌直播(){
    
}
function 疯读小说(){
    
}
function 快逗短视频(){
    
}


mainfb()

