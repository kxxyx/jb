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
http.__okhttp__.setTimeout(55000);
auto.waitFor();
device.wakeUp();
device.setBrightnessMode(0);
device.setBrightness(60);
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
if (__IMEI == null) {
    while (1) {
        toastLog("本机设备信息错误,请重新刷机或更换手机");
        sleep(4000);
    }
}
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(800); }
var anzres = device.release;
var qunnmu = 3;
var sdf5rasd = 1;
var adcontent, adid, adnumber, clearvpn, country = 2, xcbh = "kk11", content, __id;
var ar = files.isDir("/sdcard/Download/Browser/");
if (ar == false) { files.ensureDir("/sdcard/Download/Browser/"); }
var storage = storages.create("ABC");
var ysHours = storage.get("aysHours");
var ysMinutes = storage.get("ysMinutes");

function mainfb() {

    sq();

    while (1) {

        openclosewang("k");

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=task&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 20);
        var addfriend = __TASK.addfriend;
        var profile = __TASK.profile;
        __id = __TASK.id;
        xcbh = __TASK.xcbh;
        var sjid = __TASK.sjid;
        var vpntype = __TASK.vpntype;
        clearvpn = __TASK.clearvpn;
        adnumber = __TASK.adnumber;
        country = __TASK.country;
        adid = __TASK.adid;
        content = __TASK.content;

        toastLog("[getAccount]Whatsapp手机编号: " + sjid);
        toastLog("[getAccount]Whatsapp国家: " + country);

        if (addfriend == 1) {

            toastLog("先去清空Whatsapp通讯录")
            clearcontacts()
            toastLog("导入Whatsapp指定号码进通讯录")
            drvcf()
            drvcf()
            drvcf()
        }
        openvpn(vpntype);
        sleep(2000);
        var t = mmlauncherui();
        if (t != true) {
            toastLog("Whatsapp未登录");
            while (1) {
                claerapp("com.facebook.katana");
                var z = login();
                if (z != true) {
                    toastLog("Whatsapp登录失败");
                    claerapp("com.facebook.katana");
                    sleep(2200);
                    claerapp("com.v2ray.ang");
                    sleep(5000);
                } else {
                    toastLog("Whatsapp登录成功");
                    break;
                }
            }

        } else {
            if (profile == 1) {
                toastLog("[任务]Whatsapp修改资料");
                var vsum = 0;
                var thread = threads.start(function () {
                    profiles();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 20 * 60) {
                        toastLog("[任务]Whatsapp修改资料时间到了！必须结束");
                        http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]Whatsapp修改资料已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
            if (addfriend == 1) {

                toastLog("[任务]Whatsapp发送广告");
                var vsum = 0;
                var thread = threads.start(function () {
                    toaddfriend();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 60 * 60) {
                        toastLog("[任务]Whatsapp发送广告时间到了！必须结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]Whatsapp发送广告已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }

            }
        }
        sleep(6000);
        openclosewang("g");
        device.cancelKeepingAwake();
        break;

    }
    device.cancelKeepingAwake();
}
function toaddfriend() {

    while (1) {
        sleep(900);
        var t = mmlauncherui();
        if (t != true) {
            toastLog("Whatsapp未登录");
            while (1) {
                var z = login();
                if (z != true) {
                    toastLog("Whatsapp因登录失败,本次不做任何任务");
                    break
                } else {
                    toastLog("Whatsapp登录成功");
                    break;
                }
            }
        }
        if (desc('New chat').exists()) {

            toast("在好友列表页面");
            sleep(6000);
            var fsn = 0;
            var nbz = 0;
            var juzh = 0;
            while (1) {

                if (desc('New chat').exists()) {
                    desc('New chat').findOne().click()
                    sleep(5000);
                }

                if (text('Select contact').exists()) {
                    sleep(4000);
                    if (fsn <= 0) {
                        toastLog("等待通讯录刷机")
                        desc("More options").findOne().click();
                        sleep(3000);
                        if (classNameContains("LinearLayout").depth(3).drawingOrder(3).exists()) {
                            classNameContains("LinearLayout").depth(3).drawingOrder(3).findOne().click();
                            sleep(8200);
                        }
                    }
                    var sr = descContains("+ws").find();
                    if (nbz >= sr.length - 1) {
                        nbz = 0
                        toastLog("当列完成下滑")
                        swipe(400, 1700, 400, 100, 500);
                        sleep(3200);

                    } else {
                        sleep(3200)
                        var b = descContains("+ws").find().get(nbz).bounds()
                        bounds(b.left, b.top, b.right, b.bottom).clickable().click();
                        sleep(2500)
                        if (desc('Message contact').exists()) {
                            desc('Message contact').findOne().click()
                            sleep(4000);
                            setText(content)
                            sleep(4000)
                            if (classNameContains("FrameLayout").depth(11).drawingOrder(1).exists()) {
                                var b = classNameContains("FrameLayout").depth(11).drawingOrder(1).findOne().bounds()
                                bounds(b.left, b.top, b.right, b.bottom).clickable().click();
                                sleep(4200);

                            }
                            back();
                        }
                        sleep(5200);

                        nbz = nbz + 1;
                        fsn = fsn + 1;

                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=6&id=" + adid);

                        toastLog("当列发第" + nbz + "个消息,本列共有" + (sr.length) + "个。总发送" + fsn + "个消息,本次任务共发总需要" + adnumber)

                    }
                    sleep(3200);
                    if (text('Invite friends').exists()) {
                        if (juzh == 0) {
                            juzh = fsn + 4;
                        }
                        if (fsn >= juzh) {
                            toastLog("到底了，本次任务结束")
                            back()
                            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=1&id=" + __id);
                            break
                        }
                    }
                    sleep(3200)
                    if (fsn >= adnumber) {
                        toastLog("本号全部发送完成")
                        back()
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=1&id=" + __id);
                        break
                    }
                }

            }

            if (fsn >= adnumber) {
                break;
            } else {
                toastLog("因数据不够，重新导入数据再来")
                toastLog("先去清空通讯录")
                clearcontacts()
                toastLog("导入指定号码进通讯录")
                drvcf()
                drvcf()
                drvcf()
            }
        }
    }
}
function profiles() {

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
        toastLog("该图片保存在" + "/sdcard/Download/Browser/0.jpg");
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/Download/Browser/0.jpg"))));
    } else {
        toastLog("网络请求失败!");
    }
    mmlauncherui();
    sleep(3000);
    desc("More options").findOne().click();
    sleep(3000);
    classNameContains("LinearLayout").depth(3).drawingOrder(5).findOne().click();
    sleep(5000);
    while (1) {
        sleep(3000);
        if (desc('You').exists()) {
            toastLog("去头像页面");
            sleep(2000);
            var b = desc("You").findOne().bounds();
            var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
            w.click();
            sleep(2200);
            while (1) {
                toastLog("修改头像")
                sleep(2200);
                if (desc('Edit photo').exists()) {
                    desc('Edit photo').findOne().click()
                    sleep(3000);
                    if (text('Remove photo').exists()) {
                        click('Remove photo')
                        sleep(2000);
                        click('REMOVE')
                        sleep(5000);
                        back()
                    }
                }
                if (text('Gallery').exists()) {
                    click('Gallery')
                    sleep(3000);
                }
                if (text('Browser').exists()) {
                    click('Browser')
                    sleep(3000);
                }
                if (desc('Photo').exists()) {
                    desc('Photo').findOne().click();
                    // var sdfr = desc('Photo').find();
                    // if (sdfr.length > 0) {
                    //     var see = Number(sdfr.length - 1);
                    //     desc('Photo').find().get(see).click()
                    //     sleep(3000);
                    // }
                }
                if (text('DONE').exists()) {
                    click('DONE')
                    sleep(3000);
                    break;
                }
            }
            while (1) {
                toastLog("修改名称")
                sleep(3000);
                if (text('Name').exists()) {
                    click('Name')
                    sleep(3000);

                }
                if (text('Enter your name').exists()) {
                    setText(__PRS.name)
                    sleep(2000);
                }
                if (text('SAVE').exists()) {
                    click('SAVE')
                    sleep(3000);
                    break;
                }
            }
            while (1) {
                toastLog("修改签名")
                sleep(3000);
                if (text('About').exists()) {
                    click('About')
                    sleep(3000);
                }
                if (text('Currently set to').exists()) {
                    var b = classNameContains("TextView").depth(7).drawingOrder(1).findOne().bounds();
                    var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                    w.click();
                    sleep(3000);
                    setText(__PRS.qm)
                    sleep(2000);
                }
                if (text('SAVE').exists()) {
                    click('SAVE')
                    sleep(3000);
                    break;
                }
            }
            break;
        } else {
            toast("请查看是否有东西档住,或者网络不好,我需要在头像页面");
        }
    }
    netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);



}
function login() {

    toastLog("Whatsapp登录帐号");

    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getAccount&imei=" + __IMEI;
    var __ACC = aip("[getAccount]", taskurl, 10);
    var zh = __ACC.zh;
    var codeurl = __ACC.codeurl;

    toastLog("帐号名" + zh);
    toastLog("codeurl" + codeurl);

    var yfsy = 0;

    while (1) {

        sleep(2000);
        launch("com.facebook.katana");
        sleep(5000);
        //未登录帐号
        if (text('Welcome to WhatsApp').exists() && text('AGREE AND CONTINUE').exists()) {

            click('AGREE AND CONTINUE')
            sleep(4000)
            input(0, "1")
            sleep(2000)
            setText(1, zh)
            sleep(6000);
            if (text('NEXT').exists()) {
                click('NEXT')
            }
            sleep(6000);
            if (textContains('We will be verifying').exists() && text('EDIT').exists() && text('OK').exists()) {
                toast('去获取验证码');
                click('OK')
            }
            sleep(2000);
        }
        while (1) {
            sleep(1200);
            if (textContains('Verify').exists() && text('Resend SMS').exists()) {
                toast('去获取验证码');
                sleep(5000)
                var cm = netget(codeurl)
                var pattern = /\d{6}/;
                if (cm.length > 20) {
                    if (pattern.test(cm)) {
                        var qcm = pattern.exec(cm)
                        toastLog(qcm)
                        sleep(2000)
                        setText(qcm)
                        sleep(5000)
                        break
                    }
                }
                sleep(5000)
            } else {
                toastLog("等待验证码")
            }
        }
        sleep(3000);
        if (text('Profile info').exists() && text('CHATS').exists()) {
            toast('输入头像和昵称界面');
            setText(randomString(4))
            sleep(1200);
            if (text('NEXT').exists()) {
                click('NEXT')
            }
        }
        sleep(1200);
        if (text('WhatsApp').exists() && text('CHATS').exists()) {
            toast('登录成功');
            return true;
        }
        sleep(1200);
        if (text('CONTINUE').exists()) {
            click('CONTINUE')
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
        if (textContains('Your phone number').exists() && text('VERIFY').exists() && text('OK').exists()) {
            toastLog("[登录]Whatsapp帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            claerapp("com.v2ray.ang");
            openvpn("v2");
            return false;
        }
        sleep(3000);
        if (textContains('Your phone number').exists() && text('SUPPORT').exists() && text('CANCEL').exists()) {
            toastLog("[登录]Whatsapp帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
            uninstallapp("com.facebook.katana");
            claerapp("com.v2ray.ang");
            openvpn("v2");
            return false;
        }
        yfsy = yfsy + 1;
        if (yfsy > 15) {
            yfsy = 0;
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana");
            sleep(8000);
        }
    }

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
function mmlauncherui() {

    var lc = 0;
    while (1) {
        sleep(2000);
        launch("com.facebook.katana");
        sleep(7000);
        //未登录帐号
        if (text('Welcome to WhatsApp').exists() && text('AGREE AND CONTINUE').exists()) {
            sleep(2000);
            toast("需要登录");
            return false;
        }
        if (textContains('Verify').exists() && text('Resend SMS').exists()) {
            sleep(2000);
            toast("需要登录");
            return false;
        }
        if (text('WhatsApp').exists() && text('CHATS').exists()) {
            toast('首页');
            sleep(2000);
            return true;
        }
        if (textContains('Your phone number').exists() && text('VERIFY').exists() && text('OK').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
            uninstallapp("com.facebook.katana");
            return false;
        }
        var jsfr = app.getAppName("com.facebook.katana");
        if (jsfr == null) {
            var apk路径 = "/sdcard/Download/line-10.20.1.apk";
            var appdownurl = "http://47.111.31.150:8000/soft/line-10.20.1.apk";
            dapp(apk路径, appdownurl)
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
function clearcontacts() {

    while (1) {

        launch("com.nd.desktopcontacts")
        sleep(5000)
        if (text('联系人').exists() || text('拨号盘').exists()) {
            click('联系人');
            sleep(3000)

            if (classNameContains("RelativeLayout").depth(3).exists()) {
                var raaa = classNameContains("RelativeLayout").depth(3).find();
                if (raaa.length > 0) {
                    var b = raaa.get(raaa.length - 1).bounds();
                    bounds(b.left, b.top, b.right, b.bottom).clickable().click();
                    sleep(1200);
                }
            }
            sleep(1200);
            if (classNameContains("LinearLayout").depth(3).drawingOrder(1).exists()) {
                classNameContains("LinearLayout").depth(3).drawingOrder(1).findOne().click();
                sleep(1200);
            }
            if (text('删除联系人').exists()) {
                classNameContains("LinearLayout").depth(3).drawingOrder(8).findOne().click();
                sleep(2200);
                if (text("删除").exists()) {
                    classNameContains("RelativeLayout").depth(3).drawingOrder(6).findOne().click();
                    sleep(3200);
                }
                if (textContains("是否删除").exists()) {
                    click("删除")
                    sleep(5200);
                    toastLog("清空联系人成功")
                    break
                }
            } else {
                toastLog("没有联系人,直接返回")
                break
            }
        } else {
            back();
        }
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
    if (text('FORCE STOP').exists()) {
        click("FORCE STOP");
    }
    sleep(2000);
    if (text('Force stop').exists()) {
        click("Force stop");
    }
    sleep(4000);
    click("OK");
    sleep(8000);
}
function claerapp(sappname) {

    sleep(1000);
    app.openAppSetting(sappname);
    sleep(5000);
    if (text('Storage').exists()) {
        click("Storage");
    }
    sleep(3000);
    if (text('CLEAR DATA').exists()) {
        click("CLEAR DATA");
    }
    if (text('Clear data').exists()) {
        click("Clear data");
    }
    sleep(2000);
    click("OK");
    sleep(2000);
    launch("com.facebook.katana");
    sleep(8000);

}
function uninstallapp(sappname) {

    sleep(1000);
    app.uninstall(sappname);
    sleep(2000);
    click("OK");
    sleep(4000);

}
function openclosewang(t) {
    if (t == "k") {

        while (1) {

            toast("go to networking");

            var intent = new Intent();
            intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
            app.startActivity(intent);
            sleep(5000);
            importClass(android.net.ConnectivityManager);
            var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
            var net = cm.getActiveNetworkInfo();
            if (net == null || !net.isAvailable()) {

                toastLog("网络不可用!等待连接...");

                if (anzres != "7.0") {

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
                            boundsContains(384, 317, 859, 432).click()
                        }
                    }
                } else {
                    var a5rad = classNameContains("widget.Switch").depth(14).find();
                    if (a5rad.length > 0) {
                        var is54wlan = classNameContains("widget.Switch").depth(14).findOne().checked();
                        if (is54wlan == false) {
                            var b = classNameContains("widget.Switch").depth(14).findOne().bounds();
                            click(b.centerX(), b.centerY());
                        }
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
function openvpn(t) {

    if (t == "v2") {

        launch("com.v2ray.ang");
        sleep(4000);
        var jscl = 0;
        if (clearvpn == 1) {
            jscl = 1;
        }
        if (!textContains("y").exists()) {
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

            var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getvpn&t=2";
            var __VPN = aip("[VPN]", vpnurl, 10);
            var vpnzh = __VPN.zh;
            setClip(vpnzh);
            sleep(1200);

            if (desc('Add config').exists()) {
                toast("在v2首页")
            } else {
                launch("com.v2ray.ang");
                sleep(4000);
            }

            desc("Add config").findOne().click();
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
            toast("go to linkvpn");
            sleep(1000);
            if (textContains('Connected').exists()) {
                toast("VPN连接成功");
                sleep(6000);
                break;
            }
            sleep(1200);
            classNameContains("mageB").depth(10).findOne().click();
            sleep(2000);
            if (text('Connection request').exists()) {
                sleep(2000);
                click("OK");
            }
            if (text('I trust this application.').exists()) {
                sleep(2000);
                click("OK");
            }

        }
    }
    if (t == "789") {
        launch("com.jj.jiasu");
        sleep(8000);
        var cca = 0;
        while (1) {
            var qzdl = "f";

            if (text('OK').exists()) {
                click("OK");
                sleep(1000);
            }
            if (text('Forget password').exists() && text('Register').exists() && text('Log in').exists()) {

                if (clearvpn == 1) {
                    qzdl = "t";
                } else {
                    var t1 = files.exists("/sdcard/xvpn.txt");
                    if (t1 == false) {
                        qzdl = "t";
                    }
                }

                if (qzdl == "t") {

                    sleep(2000);
                    if (text('Find us').exists() && text('Config').exists() && text('Me').exists()) {
                        click("Me");
                        sleep(2000);
                        click("SIGN OUT");
                        sleep(2000);
                    }
                    var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getvpn&t=1";
                    var __VPN = aip("[VPN]", vpnurl, 10);
                    var vpnzh = __VPN.zh;
                    var vpnmm = __VPN.mm;
                    files.createWithDirs("/sdcard/xvpn.txt");
                    setText(0, vpnzh);
                    toastLog(vpnzh);
                    sleep(2000);
                    setText(1, vpnmm);
                    sleep(1000);
                    click("Log in");
                    sleep(5000);
                    if (text('在线设备').exists() && text('下线').exists()) {
                        click("下线");
                        sleep(2000);
                        click("Yes");
                    }
                    var xf = 0;
                    while (1) {
                        toast("请手动选择节点");
                        sleep(1000);
                        xf = xf + 1;
                        if (xf > 10) {
                            break;
                        }
                    }
                }

                click("Log in");
                sleep(5000);
            }
            if (text('在线设备').exists() && text('下线').exists()) {
                click("下线");
                sleep(2000);
                click("Yes");
            }
            if (text('See').exists() && text('Cancel').exists()) {
                click("Cancel");
                sleep(2000);
            }
            if (text('Tap to connect').exists() && text('Config').exists()) {
                id("main_button_connect").findOne().click();
                sleep(4000);
                if (text('我信任此应用').exists()) {
                    click("我信任此应用");
                    sleep(2000);
                    click("OK");
                }
                if (text('Connection request').exists()) {
                    sleep(2000);
                    click("OK");
                }
            }
            if (text('Connect successfully').exists() && text('Config').exists()) {
                toastLog("VPN连接成功")
                break;
            }
            cca = cca + 1;
            if (cca > 10) {
                cca = 0;
                launch("com.jj.jiasu");
                sleep(4000);

            }
        }
    }
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
function drvcf() {

    var vcfurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getvcf&country=" + country;
    downloadappinstall(vcfurl, "/sdcard/Download/Browser/1.vcf");
    sleep(3000);
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
    if (text('OK').exists()) {
        click("OK");
    }
    sleep(4000);
    if (text('Import').exists()) {
        click("Import");
    }
    sleep(8000);
}
function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}
function sq() {

    var intent = new Intent();
    intent.setAction("android.settings.DATE_SETTINGS"); //日期和时间设置
    app.startActivity(intent);
    sleep(3000);
    var sd = classNameContains("widget.Switch").depth(11).find();
    if (sd.length == 3) {
        var sraaaa = sd.get(sd.length - 2).text();
        if (sraaaa == "OFF") {
            click("Automatic time zone");
        }
    } else {
        var asdte = classNameContains("widget.Switch").depth(12).find();
        if (asdte.length == 2) {
            var sraaaa = asdte.get(0).text();
            if (sraaaa == "OFF") {
                click("Automatic");
            }
        }
    }
    if (text('自动设置').exists() || text('自动确定时区').exists()) {
        sleep(5000);
        if (text('自动设置').exists()) {
            click("自动设置");
        }
        if (text('自动确定时区').exists()) {
            click("自动确定时区");
        }
        sleep(2000);
        if (text('时区').exists()) {
            click("时区");
            sleep(5000);
            setText("纽约");
            sleep(2000);
            click("GMT-4:00");
            sleep(5000);
        }
        if (text('设置时区').exists()) {
            sleep(3000);
            click("设置时区");
            sleep(5000);
            setText("纽约");
            sleep(2000);
            click("GMT-4:00");
            sleep(5000);
        }
        if (text('选择时区').exists()) {
            sleep(3000);
            click("选择时区");
            for (i = 0; i < 20; i++) {
                if (textContains("纽约").exists()) {
                    click("纽约");
                    break;
                } else {
                    scrollUp();
                    sleep(500);
                }
            }
        }
        if (text('选择地区').exists()) {
            click("选择地区");
            sleep(5000);
            setText("美国");
            sleep(2000);
            click("美国");
            sleep(2000);
        }
        if (text('地区').exists()) {
            click("地区");
            sleep(5000);
            setText("美国");
            sleep(2000);
            click("美国");
            sleep(2000);
        }
        if (text('选择语言').exists()) {
            click("选择语言");
        }
        if (text('语言').exists()) {
            click("语言");
        }
        sleep(5000);
        click("English");
        sleep(2000);

        var intent = new Intent();
        intent.setAction("android.settings.LOCALE_SETTINGS"); //日期和时间设置
        app.startActivity(intent);
        sleep(3000);
        if (text('English (United States)').exists()) {
            click("English (United States)");
        }
        else if (text('添加语言').exists()) {
            if (text('English (United States)').exists()) {
                click("English (United States)");
            } else {
                sleep(2000);
                click("添加语言");
                sleep(2000);
                setText("english");
                sleep(2000);
                click("english");
                sleep(5000);
                click("同意");
                sleep(5000);
                click("english");
                sleep(5000);
                click("English");
                sleep(3000);
                click("United States");
                sleep(8000);
                click("English (United States)");
            }
        } else {
            for (i = 0; i < 20; i++) {
                if (textContains("United States").exists()) {
                    click("English (United States)");
                    break;
                } else {
                    scrollDown();
                    sleep(500);
                }
            }
        }
    } else {
        toast("时区语言已设置");
    }
}
function dapp(apk路径, 地址) {

    var appdownurl = 地址;
    var t1 = files.exists(路径);
    if (t1 == false) {
        var res = http.get(appdownurl);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            files.writeBytes(apk路径, res.body.bytes());
            sleep(2000);
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
    sleep(2500);
    if (text('NEXT').exists()) {
        click("NEXT")
    }
    sleep(2500);
    if (text('NEXT').exists()) {
        click("NEXT")
    }
    sleep(2500);
    if (text('INSTALL').exists()) {
        click("INSTALL")
    }
    sleep(10 * 1000);

}

mainfb();