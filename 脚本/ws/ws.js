(function () {
    let request = http.request;
    http.request = function () {
        try {
            return request.apply(http, arguments);
        } catch (e) {
            //console.error(e);
            return true;
        }
    }
    let c = engines.all().length;
    if (c > 2) {
        toastLog("脚本引擎：发现多个脚本同时运行，即将杀死所有脚本，请重新运行本脚本！");
        engines.stopAllAndToast();
    }
})();
http.__okhttp__.setTimeout(95000);
auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();

var __SERVER = "8.136.110.118";
var __IMEI = device.getIMEI();
if (__IMEI == null) {
    while (1) {
        toastLog("本机设备信息错误,请重新刷机或更换手机");
        sleep(4000);
    }
}
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(800); }
var anzres = device.release;
var bjphone, isdanf, adcontent, adtype, adid, adtitle, adnumber, addfnumber, qrfriendnum, jtjcount, clearvpn, jz, country, xcbh, isnormal, __id, __jznumber, ppcity, FBaddnumber;
var ar = files.isDir("/sdcard/Download/Browser/");
if (ar == false) { files.ensureDir("/sdcard/Download/Browser/"); }
function mainwsline() {

    openclosewang("k");

    while (1) {

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=task&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 20);

        var LINEtask_login = __TASK.task_login;
        var LINEad = __TASK.ad;
        __id = __TASK.id;
        __jznumber = __TASK.jznumber;
        bjphone = __TASK.phone;
        clearvpn = __TASK.clearvpn;


        ppcity = __TASK.ppcity;
        var FBaddfriends = __TASK.fbaddfriends;
        FBaddnumber = __TASK.addnumber;
        var FBaddconfim = __TASK.fbaddconfim;
        var FBchat = __TASK.chat;

        toastLog("[getAccount]Line ID: " + __id);
        toastLog("[getAccount]分组名称" + __TASK.name);

        var thread1 = threads.start(function () {
            //每五分钟更新运行时间，用于判断本机软件或手机是否正常
            var tsj = 1;
            while (true) {
                sleep(1000);
                tsj = tsj + 1;
                if (tsj % 300 === 0) {
                    netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
                }
            }

        });
        if (LINEad == 1) {

            toastLog("有拉群, 导入指定号码进通讯录")
            drvcf()
            drvcf()
            drvcf()
            drvcf()
        }
        openvpn();
        sleep(2000);
        if (LINEtask_login == 1) {

            toastLog("[任务]LINE登录");
            var vsum = 0;
            var thread = threads.start(function () {
                上号();
            });
            while (true) {
                sleep(1000);
                vsum = vsum + 1;
                if (vsum > 120 * 60) {
                    toastLog("[任务]LINE登录时间到了！必须结束");
                    netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=2&id=" + __id);
                    thread.interrupt();
                    threads.shutDownAll();
                    break;
                }
                var dfd = thread.isAlive();
                if (dfd == false) {
                    toastLog("[任务]LINE登录已经完成！自动结束");
                    netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=2&id=" + __id);
                    thread.interrupt();
                    threads.shutDownAll();
                    break;
                }
            }
        }
        if (LINEad == 1) {

            toastLog("[任务]LINE拉群");

            var t = Linelauncherui();
            if (t != true) {
                if (LINEad == 1) {
                    toastLog("LINE未登录成功不执行拉群任务");
                }
            } else {
                toastLog("LINE登录成功");
                if (LINEad == 1) {

                    toastLog("[任务]LINE拉群");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        linead();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 180 * 60) {
                            toastLog("[任务]LINE拉群时间到了！必须结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=1&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]LINE拉群已经完成！自动结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=1&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
            }
        }
        if (FBaddfriends == 1) {

            stopapp("com.facebook.katana");
            sleep(2000);
            var t = mmlauncherui();
            if (t != true) {
                toastLog("FB未登录成功不执行FB加推荐粉丝");
            } else {
                toastLog("[任务]FB加推荐粉丝");
                var vsum = 0;
                var thread = threads.start(function () {
                    FBjia();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 60 * 60) {
                        toastLog("[任务]FB加推荐粉丝时间到了！必须结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]FB加推荐粉丝已经完成！自动结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
        }
        if (FBaddconfim == 1) {
            stopapp("com.facebook.katana");
            sleep(2000);
            var t = mmlauncherui();
            if (t != true) {
                toastLog("FB未登录成功不执行FB加推荐粉丝");
            } else {
                toastLog("[任务]FB加推荐粉丝");
                var vsum = 0;
                var thread = threads.start(function () {
                    FBjiawmfriend();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 60 * 60) {
                        toastLog("[任务]FB加推荐粉丝时间到了！必须结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]FB加推荐粉丝已经完成！自动结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
        }
        if (FBchat == 1) {
            FBads()
        }

        //关闭vp()

        for (i = 0; i < 10; i++) {
            toastLog("当前任务完成,等待100秒下一个任务......已等待" + (i * 10) + "秒")
            sleep(10 * 1000);
            device.wakeUp();
            device.keepScreenOn();
            device.keepScreenDim();
        }
    }
}
function 上号() {

    claerapp("jp.naver.line.android");
    sleep(2200);
    var z = Linelogin();
    if (z != true) {
        toastLog("LINE登录失败");
    } else {
        toastLog("LINE登录成功");
    }
}
function aip(tag, url, slp) {

    toast(tag);
    while (1) {
        var res = http.get(url);
        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            openclosewang("k");
            sleep(slp * 1000);

        } else {

            var getjson = res.body.json();

            if (getjson.status == 0) {

                device.wakeUp();
                device.keepScreenOn();
                device.keepScreenDim();
                toast(tag + getjson.info);
                sleep(slp * 1000);

            }
            if (getjson.status == 1) {
                return getjson.info;
            }
        }
    }
}
function netget(url) {
    while (1) {
        var res = http.get(url);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            return res.body.string();
        } else if (res.statusCode == 404) {
            toast("页面没找到哦...");
        } else {
            toast("下载错误: " + res.statusCode + " " + res.statusMessage);
        }
    }
}
function stopapp(sappname) {
    sleep(1000);
    app.openAppSetting(sappname);
    sleep(3000);
    if (text('强行停止').exists()) {
        click("强行停止");
    }
    sleep(4000);
    if (text('确定').exists()) {
        click("确定");
    }
    sleep(8000);
}
function claerapp(sappname) {

    sleep(1000);
    app.openAppSetting(sappname);
    sleep(5000);
    if (text('存储').exists()) {
        click("存储");
    }
    sleep(3000);
    if (text('清除数据').exists()) {
        click("清除数据");
    }
    sleep(2000);
    if (text('确定').exists()) {
        click("确定");
    }
    sleep(2000);

}
function uninstallapp(sappname) {

    sleep(1000);
    app.uninstall(sappname);
    sleep(2000);
    click("确定");
    sleep(4000);

}
function downloadappinstall(url, appanme) {

    while (1) {
        var res = http.get(url);
        if (res.statusCode >= 200 && res.statusCode < 300) {

            files.writeBytes(appanme, res.body.bytes());
            sleep(2000);
            toastLog(appanme + "下载成功");
            app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(appanme))));
            break;

        } else if (res.statusCode == 404) {
            toast("页面没找到哦...");
        } else {
            toast("下载错误: " + res.statusCode + " " + res.statusMessage);
        }


    }
}
function openclosewang(t) {

    if (t == "k") {

        while (1) {

            toast("去连接wifi");

            importClass(android.net.ConnectivityManager);
            var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
            var net = cm.getActiveNetworkInfo();
            if (net == null || !net.isAvailable()) {
                toastLog("网络不可用!等待连接...");
                var intent = new Intent();
                intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
                app.startActivity(intent);
                sleep(5000);
                if (text('关闭').exists()) {
                    var is54wlan = id("switch_widget").findOne().checked();
                    if (is54wlan == false) {
                        var b = id("switch_widget").findOne().bounds();
                        click(b.centerX(), b.centerY());
                    }
                }
                sleep(5000);
            } else {
                toastLog("网络连接可用!");
                break;
            }
        }
    }
    if (t == "g") {

        launch("com.v2ray.ang");
        sleep(4000);
        toast("close vpn");
        launch("com.v2ray.ang");
        sleep(1200);
        classNameContains("mageB").depth(10).findOne().click();
        sleep(2000);

        while (1) {

            var intent = new Intent();
            intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
            app.startActivity(intent);
            sleep(5000);
            if (anzres != "7.0") {

                if (text('On').exists()) {
                    click('ON');
                }
                if (text('WLAN ON').exists()) {
                    click('WLAN ON');
                }
                if (text('ON').exists()) {
                    click('ON');
                }
                var a5rad = classNameContains("widget.Switch").depth(12).find();
                if (a5rad.length > 0) {
                    var is54wlan = classNameContains("widget.Switch").depth(12).findOne().checked();
                    if (is54wlan == true) {
                        boundsContains(384, 317, 859, 432).click()
                    }
                }
            } else {
                var a5rad = classNameContains("widget.Switch").depth(14).find();
                if (a5rad.length > 0) {
                    var is54wlan = classNameContains("widget.Switch").depth(14).findOne().checked();
                    if (is54wlan == true) {
                        var b = classNameContains("widget.Switch").depth(14).findOne().bounds();
                        click(b.centerX(), b.centerY());
                    }
                }
            }
            importClass(android.net.ConnectivityManager);
            var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
            var net = cm.getActiveNetworkInfo();
            if (net == null || !net.isAvailable()) {
                break;
            }


        }


    }

}
function 关闭vp() {
    launch("com.v2ray.ang");
    sleep(4000);
    toast("关闭vpn");
    launch("com.v2ray.ang");
    sleep(1200);
    if (id("fab").exists()) {
        var b = id("fab").findOne().bounds();
        click(b.centerX(), b.centerY());
    }
    sleep(2000);
}
function openvpn() {

    toast("连接VPN");

    var jscl = 0;

    while (1) {

        launch("com.v2ray.ang");
        sleep(4000);
        if (clearvpn == 1) {
            jscl = 1;
        }
        if (!textContains("vmess").exists()) {
            jscl = 1;
        }
        if (jscl == 1) {

            toast("获取新VPN");

            if (clearvpn == 1) {
                sleep(2200);
                claerapp("com.v2ray.ang");
                sleep(5000);
                launch("com.v2ray.ang");
                sleep(4000);
            }

            var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getvpn&t=2";
            var __VPN = aip("[VPN]", vpnurl, 10);
            var vpnzh = __VPN.zh;
            setClip(vpnzh);
            sleep(1200);

            if (desc('添加配置').exists()) {
                toast("在v2首页")
            } else {
                launch("com.v2ray.ang");
                sleep(4000);
            }

            desc("添加配置").findOne().click();
            sleep(1200);
            var ew = classNameContains("LinearLayout").depth(2).column(1).find();
            if (ew.length > 0) {
                classNameContains("LinearLayout").depth(2).column(1).findOne().click();
            } else {
                var raaa = classNameContains("Linear").depth(3).find();
                if (raaa.length > 0) {
                    var b = raaa.get(1).bounds();
                    bounds(b.left, b.top, b.right, b.bottom).clickable().click();
                    sleep(1200);
                }
            }

        }
        while (1) {

            launch("com.v2ray.ang");
            sleep(4000);
            toast("连接vpn");
            sleep(1000);
            if (textContains('已连接').exists()) {
                toast("VPN连接成功");
                sleep(6000);
                break;
            }
            sleep(1200);
            if (id("fab").exists()) {
                var b = id("fab").findOne().bounds();
                click(b.centerX(), b.centerY());
            }
            sleep(2000);
            if (textContains('确定').exists()) {
                click("确定");
            }
            sleep(2000);
            if (textContains('确定').exists()) {
                click("确定");
            }

        }
        var res = http.get("https://www.baidu.com/");
        if (res.statusCode >= 200 && res.statusCode < 300) {
            break
        } else if (res.statusCode == 404) {
            toast("页面没找到哦...");
        } else {
            toast("下载错误: " + res.statusCode + " " + res.statusMessage);
            toastLog("网络不可用!本VPN有故障重新获取新的...");
            jscl = 1;
            clearvpn = 1;
        }
    }
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

        if (cm.length > 20 && s1 > (dqsj - 280)) {

            toastLog("找到短信")

            if (pattern.test(cm)) {
                var qcm = pattern.exec(cm)
                toastLog(qcm)
                sleep(2000)
                return qcm

            } else {
                if (pattern1.test(cm)) {
                    var qcm = pattern1.exec(cm)
                    toastLog(qcm)
                    sleep(2000)
                    return qcm
                }
            }
        }

        i = i + 1;
        if (i > 5) {
            break
        }

    }

}
function drvcf() {

    var vcfurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getvcf&country=" + __jznumber + "&did=" + __id;
    downloadappinstall(vcfurl, "/sdcard/Download/Browser/1.vcf");
    sleep(2000);
    app.viewFile("/sdcard/Download/Browser/1.vcf");
    sleep(2000);

    if (text('Use as default').exists()) {
        click("默认使用该应用打开");
    }
    if (text('View electronic business cards').exists()) {
        click("View electronic business cards");
    }
    sleep(4000);
    if (text('Import').exists()) {
        click("Import");
    }
    sleep(4000);
    if (text('确定').exists()) {
        click("确定");
    }
    sleep(4000);
    if (text('导入').exists()) {
        click("导入");
    }

    for (i = 0; i < 6; i++) {
        sleep(5000);
        toastLog("等待导入完成......")
    }

}
function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function Linetoaddfriend() {

    Linelauncherui();

    toastLog("去添加好友");

    sleep(3900);
    if (classNameContains("LinearLayout").depth(11).indexInParent(2).exists()) {
        var b = classNameContains("LinearLayout").depth(11).indexInParent(2).findOne().bounds()
        if (b) {
            boundsContains(b.left, b.top, b.right, b.bottom).click()
            // var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
            // w.click();
        }
    }
    sleep(2000)
    if (text('Search').exists()) {
        var b = text('Search').depth(8).findOne().bounds()
        boundsContains(b.left, b.top, b.right, b.bottom).click()
        // var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
        // w.click();
    }

    sleep(3000)

    if (text('Friend search').exists() && text('Phone number').exists()) {

        while (1) {

            toastLog("到了搜索页面，选择国家区号")
            sleep(2000)
            click('Phone number')
            sleep(2000)
            descContains("Select country").findOne().click()
            sleep(2000)
            scrollUp()
            sleep(1000)
            scrollUp()

            if (country == 1) {

                toastLog("选择台湾区号")
                sleep(1000)
                scrollDown()
                sleep(2000)

                if (device.release > "7.0") {

                    if (device.release == "7.1.2") {
                        var b = classNameContains('LinearLayout').depth(3).drawingOrder(4).findOne().bounds()
                        boundsContains(b.left, b.top, b.right, b.bottom).click()
                    } else {
                        var b = classNameContains('LinearLayout').depth(3).drawingOrder(5).findOne().bounds()
                        boundsContains(b.left, b.top, b.right, b.bottom).click()
                    }
                } else {
                    var b = classNameContains('LinearLayout').depth(2).column(11).findOne().bounds()
                    boundsContains(b.left, b.top, b.right, b.bottom).click()
                }

                sleep(2000)
                if (text('+886').exists()) {

                    toastLog("区号选择正确")

                    break

                }

            }
            if (country == 2) {

                toastLog("选择日本区号")
                if (device.release > "7.0") {
                    var b = classNameContains('LinearLayout').depth(3).drawingOrder(2).findOne().bounds()
                    boundsContains(b.left, b.top, b.right, b.bottom).click()
                } else {
                    var b = classNameContains('LinearLayout').depth(2).column(1).findOne().bounds()
                    boundsContains(b.left, b.top, b.right, b.bottom).click()
                    // var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                    // w.click();
                    sleep(2000)
                }

                if (text('+81').exists()) {

                    toastLog("区号选择正确")

                    break
                }
            }
        }
    }
    if (text('Friend search').exists() && text('Phone number').exists()) {

        toastLog("获取号码")

        adn = 0;

        while (1) {

            var bjsurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getphone&c=" + country;

            var addphone = aip("[获取添加号码源]", bjsurl, 10);

            for (i = 0; i < addphone.length; i++) {

                toastLog("成功找到" + addphone[i] + ",去添加");
                aph = addphone[i].replace(/\s+/g, "");
                setText(aph)
                sleep(1200)
                desc("Search button").findOne().click()
                sleep(12000)
                if (text('Add').exists()) {
                    click('Add')
                    adn = adn + 1
                    toastLog(aph + "添加成功")
                    for (aa = 0; aa < 6; aa++) {
                        sleep(3000)
                        toastLog("等待" + aa * 3 + "秒")
                    }
                }
                if (text('Chat').exists()) {
                    toastLog("本号" + aph + "已经是好友")
                }
                if (adn >= adnumber) {
                    break
                }
                while (1) {
                    sleep(1200)
                    if (text('Friend search').exists() && text('Phone number').exists()) {
                        break
                    } else {
                        toastLog("超时或本号不能添加好友")
                        back();
                    }
                }
            }
            if (adn >= addfnumber) {
                toastLog("本次添加好友完成共添加" + addfnumber + "次")
                break
            }
        }
    }
}
function linead() {

    while (1) {

        sleep(900);
        stopapp("jp.naver.line.android");
        sleep(2000);
        Linelauncherui();
        sleep(3900);
        if (text('Keep').exists() && text('群').exists()) {

            toastLog("获取好友数量");
            var num = 0;
            var dqhy = textContains("好友").findOne().text();
            var snum = dqhy.replace(/[^0-9]/ig, "");

            if (Number(snum) > 1) {
                num = snum;

                toastLog("当前好友数量" + snum)
                var sc = Math.ceil(num / 99);
                toastLog("可以拉" + sc + "个群")

                var myzhname

                for (i = 0; i < sc; i++) {

                    if (i > 0) {
                        sleep(900);
                        stopapp("jp.naver.line.android");
                        sleep(2000);
                        Linelauncherui();
                        sleep(3900);
                    }
                    toastLog("打开好友列表")
                    sleep(1900);
                    if (id('home_tab_title_arrow').exists()) {
                        var sdfsdf = id('home_tab_title_arrow').find().length;
                        var b = id('home_tab_title_arrow').find().get(sdfsdf - 1).bounds();
                        if (b) {
                            click(b.left, b.top)
                        }
                    }
                    sleep(3000);
                    var sr = id("name").depth(13).drawingOrder(5).find();
                    if (sr) {
                        var b = sr.get(i).bounds()
                        if (b) {
                            click(b.left, b.top)
                        }
                    }
                    sleep(5500)
                    if (text('聊天').exists()) {
                        var b = text('聊天').findOne().bounds()
                        if (b) {
                            click(b.left, b.top)
                        }
                    }
                    sleep(5500)
                    if (id('right_header_button').exists()) {
                        var sdfsdf = id('right_header_button').find().length;
                        var b = id('right_header_button').find().get(sdfsdf - 1).bounds();
                        if (b) {
                            click(b.left, b.top)
                        }
                    }
                    sleep(5000)
                    if (text('邀请').exists()) {
                        var b = text('邀请').findOne().bounds()
                        if (b) {
                            click(b.left, b.top)
                        }
                    }
                    sleep(5000)

                    if (text('选择好友').exists()) {

                        var hzname = 1, hzname1 = 2

                        if (i > 0) {
                            toastLog("先查到上次拉群的最后一个好友");
                            while (1) {
                                sleep(2000)
                                swipe(400, 1490, 400, 235, 500);
                                sleep(2000)
                                if (textContains(myzhname = hzname1).exists()) {
                                    break;
                                }
                            }
                        }

                        while (1) {

                            toastLog("选择好友中...");

                            if (hzname === hzname1) {

                                toastLog("到底了")

                            } else {
                                var sr = id("select_invitee_info_row_name").find();
                                if (sr) {
                                    for (i = 0; i < sr.length - 2; i++) {
                                        var bt = sr.get(i).text()
                                        if (bt == "LINE EVENT" || bt == "LINE INDONESIA" || bt == "LINE TODAY") {
                                            toastLog("官方帐号不使用")
                                        } else {
                                            var b = sr.get(i).bounds()
                                            click(b.left + 500, b.top)
                                            sleep(200)
                                        }
                                    }
                                }
                            }
                            var sr = id("select_invitee_info_row_name").find();
                            if (sr) {
                                hzname = sr.get(sr.length - 1).text()
                                toastLog("1:" + hzname + "2:" + hzname1)
                            }
                            sleep(2000)
                            swipe(400, 1490, 400, 235, 500);
                            sleep(2000)
                            swipe(400, 1490, 400, 1335, 500);

                            var sr = id("select_invitee_info_row_name").find();
                            if (sr) {
                                hzname1 = sr.get(sr.length - 1).text()
                            }
                            var ssssdww = textContains("已选择").find()
                            var snum = 0
                            if (ssssdww) {
                                var dqhy = textContains("已选择").findOne().text();
                                var snum = dqhy.replace(/[^0-9]/ig, "");
                                toastLog("当前已选择好友" + snum + "个")
                                sleep(1000)
                            }

                            if (Number(snum) > 95) {

                                myzhname = hzname1

                                if (id('right_header_button').exists()) {
                                    var b = id('right_header_button').findOne().bounds();
                                    if (b) {
                                        click(b.left, b.top)
                                        sleep(8000)
                                    }
                                }
                                bcimage(i, snum);
                                break
                            }

                            if (hzname == hzname1) {

                                toastLog("好友到底了!...任务完成")

                                if (id('right_header_button').exists()) {
                                    var b = id('right_header_button').findOne().bounds();
                                    if (b) {
                                        click(b.left, b.top)
                                        sleep(8000)
                                    }
                                }
                                bcimage(i, snum);
                                break
                            }

                            if (id('common_dialog_horizontal_buttons').exists()) {
                                var sdfsdf = id('common_dialog_horizontal_buttons').find().length;
                                var b = id('common_dialog_horizontal_buttons').find().get(sdfsdf - 1).bounds();
                                if (b) {
                                    click(b.left, b.top)
                                    myzhname = hzname1
                                    if (id('right_header_button').exists()) {
                                        var b = id('right_header_button').findOne().bounds();
                                        if (b) {
                                            click(b.left, b.top)
                                            sleep(8000)
                                        }
                                    }
                                    bcimage(i, snum);
                                    break
                                }
                            }



                        }
                    }

                }
                break;
            } else {
                toastLog("本号好友数量太少,直接完成任务")
                break;
            }

        }
    }

}
function Lineprofiles() {

    files.removeDir("/sdcard/DCIM/");
    files.removeDir("/sdcard/Pictures/");
    files.removeDir("/sdcard/wdddd/");
    var ar = files.isDir("/sdcard/Download/Browser/");
    if (ar == false) {
        files.ensureDir("/sdcard/Download/Browser/");
    }
    var txsurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getProfile&xcbh=" + xcbh;
    var __PRS = aip("[资料获取]", txsurl, 10);
    var img = images.load(__PRS.image);
    if (img != null) {
        toastLog("网络请求成功");
        images.save(img, "/sdcard/Download/Browser/0.jpg", "jpg", 100);
        images.save(img, "/sdcard/Download/Browser/1.jpg", "jpg", 100);
        toastLog("该图片保存在" + "/sdcard/Download/Browser/0.jpg");
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/Download/Browser/0.jpg"))));
    } else {
        toastLog("网络请求失败!");
    }
    Linelauncherui();
    sleep(3000);
    desc("Settings button").findOne().click();
    sleep(3000);
    if (text('Edit profile').exists()) {
        click('Edit profile')
        if (classNameContains("LinearLayout").depth(2).drawingOrder(2).exists()) {
            var b = classNameContains("LinearLayout").depth(2).drawingOrder(2).findOne().bounds();
            if (b) {
                var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                w.click();
            }
        }
    }
    sleep(5000);

    while (1) {
        sleep(3000);
        if (text('Edit profile').exists()) {
            sleep(2200);
            while (1) {

                toastLog("修改头像")
                sleep(2200);
                if (desc('Profile icon').exists()) {
                    desc('Profile icon').findOne().click()
                    sleep(3000);
                }
                sleep(2000);
                if (text('Select photo or video').exists()) {
                    click('Select photo or video')
                }
                sleep(3000);
                if (text('All').exists()) {
                    toastLog("选择相片")
                    var a5rad = classNameContains("widget.RelativeLayout").depth(12).column(1).find();
                    if (a5rad.length > 0) {
                        var b = a5rad.get(0).bounds();
                        if (b) {
                            if (device.release > 7) {
                                click(b.left, b.top)
                            } else {
                                boundsContains(b.left, b.top, b.right, b.bottom).click()
                            }
                        }
                    }
                }
                sleep(1200);
                if (text('Allow').exists()) {
                    click('Allow')
                }
                sleep(1200);
                if (text('Allow').exists()) {
                    click('Allow')
                }
                sleep(3000);
                if (text('Next').exists()) {
                    click('Next')
                    sleep(6000);
                }
                sleep(3000);
                if (text('Done').exists()) {
                    click('Done')
                    sleep(6000);
                    break;
                }
            }
            while (1) {
                toastLog("修改名称")
                sleep(3000);
                if (text('Display name').exists()) {
                    click('Display name')
                    sleep(3000);
                }
                if (text('Save').exists()) {
                    setText(__PRS.name)
                    sleep(2000);
                    click('Save')
                    sleep(3000);
                    break;
                }
            }
            break;
        } else {
            toast("请查看是否有东西档住,或者网络不好,我需要在头像页面");
        }
    }
    back()
    sleep(3000);
    back()
    netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);

}
function Linelogin() {

    //toastLog("登录帐号先去清空通讯录")
    clearcontacts()
    // toastLog("导入指定号码进通讯录")
    // drvcf()
    // drvcf()
    // drvcf()
    // drvcf()
    stopapp("jp.naver.line.android");
    sleep(2000);

    var yfsy = 0;

    while (1) {

        sleep(2000);
        launch("jp.naver.line.android");
        sleep(5000);
        //未登录帐号
        if (text('欢迎使用LINE').exists() && text('登录').exists()) {
            sleep(2000);
            click('注册')
            sleep(8000)
        }
        sleep(3000)
        if (text('继续').exists()) {
            click('继续')
        }
        sleep(2000);
        if (text('允许').exists()) {
            click('允许')
        }
        while (1) {
            sleep(2000);
            if (text('输入此设备的电话号码').exists()) {
                if (bjphone != null) {
                    if (bjphone.length > 8) {
                        setText(bjphone)
                        sleep(2000)
                    }
                } else {
                    for (i = 0; i < 6; i++) {
                        sleep(5000);
                        toastLog("请手动输入手机号码")
                    }
                }
                sleep(2000);
                if (desc('下一步').exists()) {
                    var sd = desc('下一步').findOne().bounds();
                    click(sd.left, sd.top)
                    sleep(3000);
                }
                sleep(2000)
                if (text('确认').exists()) {
                    click('确认')
                    break
                }
            } else {
                break
            }
        }
        while (1) {
            sleep(8000);
            if (text('输入验证码').exists()) {
                toastLog("请手动输入验证码")
                sleep(5000);
                var assd = getsiss()
                if (assd) {
                    setText(assd)
                }
            } else {
                break
            }
        }
        sleep(1200);
        if (textContains('这不是我的帐号').exists()) {
            var sd = textContains('这不是我的帐号').findOne().bounds();
            click(sd.left, sd.top)
            sleep(3000);
        }
        sleep(1200);
        if (textContains('暂时跳过此步骤').exists()) {
            var sd = textContains('暂时跳过此步骤').findOne().bounds();
            click(sd.left, sd.top)
            sleep(3000);
        }
        sleep(1200);
        if (textContains('创建新帐号').exists()) {
            var sd = textContains('创建新帐号').findOne().bounds();
            click(sd.left, sd.top)
            sleep(3000);
        }
        sleep(1200);
        if (textContains('名字').exists() && textContains('头像').exists()) {
            toast('输入头像和昵称界面');
            setText(randomString(4))
            sleep(1200);
            if (desc('下一步').exists()) {
                var sd = desc('下一步').findOne().bounds();
                click(sd.left, sd.top)
                sleep(3000);
            }
        }
        sleep(1200);
        if (textContains('创建密码').exists()) {
            toast('输入密码');
            setText("cc2018")
            sleep(1200);
            if (desc('下一步').exists()) {
                var sd = desc('下一步').findOne().bounds();
                click(sd.left, sd.top)
                sleep(3000);
            }
        }
        sleep(1200);
        if (textContains('好友添加').exists()) {
            toast('好友添加');
            sleep(1200);
            if (desc('下一步').exists()) {
                var sd = desc('下一步').findOne().bounds();
                click(sd.left, sd.top)
                sleep(3000);
            }
            sleep(3000)
            if (text('继续').exists()) {
                click('继续')
            }
            sleep(2000);
            if (text('允许').exists()) {
                click('允许')
            }
        }
        sleep(1200);
        while (1) {
            sleep(2000);
            if (text('隐私权').exists()) {
                toastLog("请手动操作人机验证")
                sleep(3000);
            } else {
                break
            }
        }
        sleep(1200);
        if (textContains('Regarding Usage of Your').exists()) {
            sleep(1200);
            swipe(200, 1000, 200, 200, 800);
            sleep(2200);
        }
        sleep(1200);
        if (text('Agree').exists()) {
            sleep(1200);
            swipe(200, 1000, 200, 200, 800);
            sleep(2200);
            var sd = text('Agree').findOne().bounds();
            click(sd.left, sd.top)
            sleep(2300);
        }
        if (textContains('OK').exists()) {
            var sd = textContains('OK').findOne().bounds();
            click(sd.left, sd.top)
            sleep(2300);
        }
        sleep(1200);
        if (textContains('允许').exists()) {
            var sd = textContains('允许').findOne().bounds();
            click(sd.left, sd.top)
            sleep(1300);
        }
        sleep(1200);
        while (1) {
            sleep(2000);
            if (textContains('正在同步资料').exists()) {
                toastLog("正在同步资料...")
                sleep(3000);
            } else {
                break
            }
        }
        sleep(1200);
        if (text('聊天').exists() && text('主页').exists() || text('官方帐号').exists()) {
            toastLog('首页');
            toastLog('注册成功');
            return true;
        }

    }

}
function Linelauncherui() {

    var lc = 0;

    while (1) {

        toastLog("去首页")

        sleep(2000);
        launch("jp.naver.line.android");
        sleep(10000);
        if (text('聊天').exists() || text('主页').exists() || text('官方帐号').exists()) {
            toastLog('首页');
            sleep(2000);
            return true;
        }
        if (text('欢迎使用LINE').exists() && text('登录').exists()) {
            sleep(2000);
            toastLog("需要登录");
            return false;
        }
        lc = lc + 1;
        if (lc > 20) {
            toastLog("去首页失败，查询太久了,不知道原因...");
            return false;
        }
    }

}
function clearcontacts() {

    while (1) {
        var lsname = getAppName("com.google.android.contacts");
        if (lsname != null) {
            launch("com.google.android.contacts")
            sleep(5000)
            if (textContains('跳过').exists()) {
                click("跳过")
                sleep(4000)
            }
            if (textContains('联系人').exists()) {
                sleep(1200);
                if (textContains("尚无联系人").exists()) {
                    toastLog("清空联系人成功")
                    break
                }
                sleep(1200);
                if (id("more_options").exists()) {
                    var b = id("more_options").findOne().bounds();
                    click(b.left, b.top)
                    sleep(1200);
                }
                sleep(1200);
                if (classNameContains("LinearLayout").depth(3).drawingOrder(2).exists()) {
                    classNameContains("LinearLayout").depth(3).drawingOrder(2).findOne().click();
                    sleep(2200);
                }
                if (desc('删除').exists() || id("menu_delete").exists()) {
                    desc('删除').findOne().click();
                    sleep(2200);
                    if (textContains("要删除").exists()) {
                        click("删除")
                        sleep(5200);
                        while (1) {

                            sleep(2200);
                            if (textContains("正在删除").exists()) {
                                toastLog("正在删除联系人...")
                                sleep(2200);
                            } else {
                                toastLog("清空联系人成功")
                                break
                            }
                            if (textContains("尚无联系人").exists()) {
                                toastLog("清空联系人成功")
                                break
                            }
                        }

                        break
                    }
                } else {
                    toastLog("没有联系人,直接返回")
                    break
                }
            } else {
                back();
            }
        } else {
            toastLog("清空功能有问题")
            break
        }
    }
}
function bcimage(i, snum) {

    captureScreen("/sdcard/screencapture" + i + ".png");
    sleep(1000);
    var img = images.read("/sdcard/screencapture" + i + ".png");
    var myimag = images.toBase64(img);
    var res = http.post("http://" + __SERVER + "/index.php?g=api&m=ws&a=getad", {
        "imgurl": myimag,
        "id": __id,
        "sl": snum
    });
    var html = res.body.string();
    if (html == __id) {
        toastLog("图片上传成功")
        sleep(3000);
    }
}
function FBads() {

    while (1) {
        sleep(1800)
        if (text("Aa").exists()) {

            var lsjqb = getClip();
            if (lsjqb.length > 3) {
                var url = "http://" + __SERVER + "/baidu_transapi.php?query=" + lsjqb;
                var res = http.get(url);
                if (res.statusCode != 200) {
                    toast("请求失败: " + res.statusCode + " " + res.statusMessage);
                } else {
                    var weather = res.body.string();
                    toastLog(weather);
                    toast(weather);
                    toast(weather);
                }
                sleep(8800)
                setClip("");
            }
        }
    }

}
function gotofriend() {

    sleep(3000);
    while (1) {
        sleep(900);
        var t = mmlauncherui();
        if (t == true) {
            toast("先点第2好友界面");
            sleep(2000);
            var s = classNameContains("FrameLayout").depth(9).drawingOrder(2).indexInParent(1).findOne().bounds();
            if (s) {
                click(s.left, s.top)
                sleep(100)
            }
            sleep(8000);
            if (text('好友').exists()) {
                toast("找到好友界面了");
                break;
            } else {
                var l = classNameContains("FrameLayout").depth(9).find();
                var s = classNameContains("FrameLayout").depth(9).drawingOrder(l.length).find();
                if (s) {
                    sv = s.bounds()
                    click(sv.left, sv.top)
                    sleep(6000);
                    if (desc('搜索好友').exists()) {
                        var s = desc('搜索好友').findOne().bounds();
                        if (s) {
                            click(s.left, s.top)
                            sleep(100)
                        }
                    }
                    sleep(8000);
                    if (text('好友').exists()) {
                        toast("找到好友界面了");
                        break;
                    }
                }
            }
        }
        toastLog("强行停止");
        stopapp("com.facebook.katana");
        sleep(2900);
    }
}
function FBjiawmfriend() {

    gotofriend()
    var dtdrs = 0;
    var cg = 0;
    if (text('确认').exists()) {

        while (1) {

            sleep(800);
            var b1 = desc('确认').findOne().bounds();
            click(b1.left, b1.top - 111);
            sleep(5000)
            var txf = 0;
            while (1) {

                if (text('发消息').exists()) {

                    toast("查询国家")
                    scrollDown();
                    sleep(1000);
                    var sra = ppaddfriend();
                    if (sra == true) {
                        back();
                        sleep(800);
                        click('确认', 0);
                        dtdrs = dtdrs + 1;
                        toastLog("添加第" + dtdrs + "个");
                        sleep(800);
                    } else {
                        back();
                        sleep(800);
                        toast("非需要国家不能加")
                        sleep(800);
                        //click("删除", 0);
                        var b1 = desc('删除').findOne().bounds();
                        click(b1.left, b1.top);
                        sleep(1800);
                    }
                    break;

                } else {

                    if (text('Reload Page').exists()) {
                        click('Reload Page');
                        sleep(1000);
                    }
                    if (text('重试').exists()) {
                        click("重试");
                    }
                    sleep(4000);
                    txf = txf + 1;
                    if (txf > 4) {
                        sleep(1200);
                        scrollDown(1);
                        sleep(1200);
                    }
                    if (txf > 6) {
                        toast("查询太久了,返回查找下一个");
                        break;
                    }
                }
            }
            if (!text('确认').exists()) {
                sleep(800);
                if (textContains('需要移除').exists()) {
                    sleep(600);
                    toastLog("粉丝上限了")
                    break
                }
                if (descContains('friend limit').exists()) {
                    click("OK");
                    sleep(600);
                    click("Delete", 0);
                    sleep(600);
                }
                if (textContains('开始对话').exists()) {
                    back();
                    sleep(600);
                }
                if (text('关闭').exists()) {
                    click("关闭");
                }
                if (text('Not Now').exists()) {
                    click("Not Now");
                }
                if (text('OK').exists()) {
                    var b1 = text('OK').findOne().bounds();
                    click(b1.left, b1.top);
                }
                if (text('发消息').exists() && text('更多').exists()) {
                    back();
                    sleep(600);
                }
                sleep(800);
                if (!text('确认').exists()) {

                    sleep(600);
                    if (!text('搜索').exists()) {

                    } else {
                        back();
                        sleep(2200);
                    }
                    if (!text('确认').exists()) {
                        if (cg == 0) {
                            cg = cg + 1;
                            stopapp("com.facebook.katana");
                            sleep(2000);
                            gotofriend();
                        } else {
                            toastLog("在外面的全部确认完成");
                            return dtdrs;
                        }

                    }
                }

            }
        }
    } else {
        sleep(600);
        toastLog("没有确认好友");
    }
}
function FBjia() {

    toastLog("加推荐好友")
    gotofriend();
    if (text('加为好友').exists()) {
        var cg = 0;
        var dcr = 0;
        var jgsj = 12000;
        while (1) {

            if (text('加为好友').exists()) {

                sleep(1200);
                var b1 = desc('加为好友').findOne().bounds();
                click(b1.left, b1.top - 111);
                sleep(5000)
                var txf = 0;
                while (1) {

                    toast("查询国家")
                    if (text('发消息').exists()) {

                        scrollDown();
                        sleep(1000);
                        var sra = ppaddfriend();

                        if (sra == true) {
                            back();
                            sleep(800);
                            click("加为好友", 0);
                            dcr = dcr + 1;
                            toastLog("添加第" + dcr + "个");
                            sleep(jgsj);

                        } else {

                            back();
                            sleep(800);
                            toast("非需要国家不能加")
                            sleep(800);
                            //click("移除", 0);
                            var b1 = desc('移除').findOne().bounds();
                            click(b1.left, b1.top);
                            sleep(1800);
                        }

                        break;

                    } else {

                        if (text('Reload Page').exists()) {
                            click('Reload Page');
                            sleep(4000);
                        }
                        if (text('Retry').exists()) {
                            click("Retry");
                            sleep(4000);
                        }
                        txf = txf + 1;
                        if (txf > 4) {
                            scrollDown();
                            sleep(1200);
                        }
                        if (txf > 5) {
                            toast("查询太久了,返回查找下一个");
                            back();
                            sleep(800);
                            break;
                        }
                    }
                }

            }
            sleep(800);
            if (dcr > FBaddnumber) {
                toastLog("今天加粉" + FBaddnumber + "数量到了,任务完成");
                return true;
            }
            if (text('OK').exists()) {
                var b1 = text('OK').findOne().bounds();
                click(b1.left, b1.top);
            }
            if (textContains('需要移').exists()) {
                click("以后再说");
                sleep(600);
                toastLog("粉丝上限了")
                break;
            }
            if (descContains('friend limit').exists()) {
                click("OK");
                sleep(600);
                click("Remove");
                sleep(600);
            }
            if (textContains('Send Request').exists()) {
                click("OK");
            }
            if (!text('加为好友').exists()) {
                sleep(1200);
                if (!text('加为好友').exists()) {

                } else {
                    back();
                    sleep(2200);
                }
                if (!text('加为好友').exists()) {
                    if (cg == 0) {
                        cg = cg + 1;
                        stopapp("com.facebook.katana");
                        sleep(2000);
                        gotofriend();
                    } else {
                        toastLog("推荐好友已经空了,任务完成");
                        return true;
                    }
                }
            }
        }
    } else {
        toastLog("本号没有推荐好友")
    }

}
function mmlauncherui() {

    var lc = 0;

    while (1) {
        sleep(2000);
        launch("com.facebook.katana");
        sleep(7000);
        //未登录帐号
        if (textContains('邮箱').exists() && desc('密码').exists() && desc('登录').exists()) {
            sleep(2000);
            toast("需要登录");
            return false;
        }
        if (desc('前往个人主页').exists()) {
            toast('首页');
            return true;
        }
        if (descContains('We noticed suspicious activity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Confirm Your Account').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        lc = lc + 1;
        if (lc > 9) {
            lc = 0;
            toast('重新启动');
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana");
            sleep(12000);
        }
    }

}

mainwsline();


