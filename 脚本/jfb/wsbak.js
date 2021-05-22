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


function mainfb() {

    sq();

    while (1) {

        openclosewang("k");

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=task&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 20);
        var LINEaddfriend = __TASK.addfriend;
        var LINEprofile = __TASK.profile;
        var LINEad = __TASK.ad;
        __id = __TASK.id;
        xcbh = __TASK.xcbh;
        var sjid = __TASK.sjid;
        clearvpn = __TASK.clearvpn;
        adnumber = __TASK.adnumber;
        country = __TASK.fscountry;

        toastLog("[getAccount]Line ID: " + sjid);
        toastLog("[getAccount]架子编号" + __TASK.jznumber);
        toastLog("[getAccount]Line 粉丝国家: " + country);

        openvpn();
        sleep(2000);
        var t = Linelauncherui();
        if (t != true) {
            toastLog("未登录");
            while (1) {
                var z = Linelogin();
                if (z != true) {
                    toastLog("登录失败");
                    claerapp("jp.naver.line.android");
                    sleep(2200);
                    claerapp("com.v2ray.ang");
                    sleep(5000);
                } else {
                    toastLog("登录成功");
                    break;
                }
            }
        } else {

            if (LINEprofile == 1) {
                toastLog("[任务]修改资料");
                var vsum = 0;
                var thread = threads.start(function () {
                    Lineprofiles();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 20 * 60) {
                        toastLog("[任务]修改资料时间到了！必须结束");
                        http.get("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=9&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]修改资料已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
            if (LINEaddfriend == 1) {
                toastLog("[任务]添加好友");
                var vsum = 0;
                var thread = threads.start(function () {
                    Linetoaddfriend();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 60 * 60) {
                        toastLog("[任务]添加好友时间到了！必须结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=2&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]添加好友已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
            if (LINEad == 1) {
                toastLog("[任务]发送广告");
                var vsum = 0;
                var thread = threads.start(function () {
                    linead();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 60 * 60) {
                        toastLog("[任务]发送广告时间到了！必须结束");
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]发送广告已经完成！自动结束");
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


function Linetoaddfriend() {





}
function linead() {

    var adurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getad&country=" + country;
    var __myad = aip("[getad]", adurl, 10);
    var adid = __myad.id;
    var adcontent = __myad.content;
    if (adid > 0) {
        while (1) {
            sleep(900);
            Linelauncherui();

            toastLog("去好友列表页面");
            sleep(3900);

            if (text('Keep').exists() && text('Chats').exists()) {

                toastLog("查找可发送数量");
                var fsn = 0;
                var s = textContains("Friends").find()
                var num = 0;

                if (s.length > 0) {
                    for (i = 0; i < s.length; i++) {
                        var dqhy = s.get(i).text();
                        var snum = dqhy.replace(/[^0-9]/ig, "");
                        if (Number(snum) > 0) {
                            num = snum;
                            toastLog("当前好友数量" + snum)
                            if (!text('Official accounts').exists()) {
                                var b = s.get(i).bounds();
                                click(b.left, b.top)
                            }
                            break
                        }

                    }
                }
                sleep(2000)
                swipe(400, 1600, 400, 300, 500);
                sleep(2000)
                swipe(400, 1600, 400, 300, 500);
                sleep(3000)
                while (1) {

                    sleep(5000)

                    toastLog("发现可用好友列表")

                    sleep(2000)

                    var sr = classNameContains("mageView").find();

                    for (i = 0; i < sr.length; i++) {

                        var b = sr.get(i).bounds()

                        if (b.left == 48 && b.top > 348) {

                            toast("去发送" + i)

                            click(b.left + 100, b.top + 5)

                            sleep(5500)
                            sleep(3200)
                            if (text('Chat').exists()) {
                                var b = text('Chat').findOne().bounds()
                                click(b.left, b.top)
                            }
                            sleep(6500)
                            if (desc('Attachment menu').exists()) {

                                toastLog("进入聊天界面")
                                sleep(4000);

                                var disLength = adcontent.length;
                                var shortName = adcontent.substring(disLength - 5, disLength);
                                if (textContains(shortName).exists()) {
                                    toastLog("本好友已发送过" + shortName + ",返回下一个")
                                } else {
                                    sleep(1200);
                                    setText(adcontent)
                                    sleep(4000)
                                    if (desc('Send').exists()) {
                                        var b = desc('Send').findOne().bounds()
                                        click(b.left, b.top)
                                        sleep(3000)
                                        fsn = fsn + 1;
                                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=6&id=" + adid);
                                        toastLog("已总发送" + fsn + "个消息,本次任务共发总需要" + adnumber)
                                    }
                                }
                                sleep(2000)
                                if (desc('Back').exists()) {
                                    var b = desc('Back').findOne().bounds()
                                    click(b.left, b.top)
                                }
                                sleep(3000)
                                if (text('Friends').exists()) {
                                    toastLog("去Friends首页")
                                    var b = text('Friends').depth(2).findOne().bounds()
                                    click(b.left, b.top)
                                }
                                sleep(2000)
                                if (text('Home').exists()) {
                                    toastLog("去Home首页")
                                    var b = text('Home').depth(9).findOne().bounds()
                                    click(b.left, b.top)
                                }
                            }
                            sleep(5200);

                        }
                    }

                    toastLog("当列完成下滑")
                    sleep(2200);
                    swipe(400, 1600, 400, 100, 500);
                    sleep(3200);

                    toast("检查任务情况")
                    sleep(3200);
                    if (fsn >= num - 10) {
                        toastLog("到底了，本次任务结束")
                        back()
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        break
                    }
                    sleep(3200)
                    if (fsn >= adnumber) {
                        toastLog("本号全部发送完成")
                        back()
                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                        break
                    }
                }
                break;
            }
        }
    } else {
        toastLog("没有广告")
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
                                var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                                w.click();
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

    toastLog("登录帐号");

    toastLog("先去清空通讯录")
    clearcontacts()
    toastLog("导入指定号码进通讯录")
    drvcf()
    drvcf()

    stopapp("jp.naver.line.android");
    sleep(2000);

    // var taskurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getAccount&imei=" + __IMEI;
    // var __ACC = aip("[getAccount]", taskurl, 10);
    // var zh = __ACC.zh;
    // var codeurl = __ACC.codeurl;

    // toastLog("帐号名" + zh);
    // toastLog("codeurl" + codeurl);

    var yfsy = 0;

    while (1) {

        sleep(2000);
        launch("jp.naver.line.android");
        sleep(5000);
        //未登录帐号
        if (text('Welcome to LINE').exists() && text('Log in').exists()) {
            sleep(2000);
            click('Log in')
            sleep(8000)

            while (1) {
                sleep(2000);
                toastLog("等待出现LOG IN TO LINE")
                if (text('Log in to LINE').exists() && text('Log in with phone number').exists()) {
                    click('Log in with phone number')
                    sleep(8000)
                    break
                }
            }
            sleep(3000)
            if (text('Continue').exists()) {
                click('Continue')
            }
            sleep(2000);
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
        toast('手工登录帐号并返回到首页');
        if (text('Friends').exists() && text('Chats').exists()) {
            toast('登录成功');
            return true;
        }
        sleep(3000)
        if (text('Continue').exists()) {
            click('Continue')
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
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
            uninstallapp("jp.naver.line.android");
            claerapp("com.v2ray.ang");
            openvpn("v2");
            return false;
        }
        // yfsy = yfsy + 1;
        // if (yfsy > 15) {
        //     yfsy = 0;
        //     stopapp("jp.naver.line.android");
        //     sleep(2000);
        //     launch("jp.naver.line.android");
        //     sleep(8000);
        // }
    }

}
function Linelauncherui() {

    var lc = 0;
    while (1) {
        sleep(2000);
        launch("jp.naver.line.android");
        sleep(10000);
        if (text('Chats').exists()) {
            toastLog('首页');
            sleep(2000);
            return true;
        }
        //未登录帐号
        if (text('Welcome to LINE').exists() && text('Log in').exists()) {
            sleep(2000);
            toastLog("需要登录");
            return false;
        }
        if (textContains('Your phone number').exists() && text('VERIFY').exists() && text('OK').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=5&id=" + __id);
            uninstallapp("jp.naver.line.android");
            return false;
        }
        lc = lc + 1;
        if (lc > 9) {
            lc = 0;
            toast('重新启动');
            stopapp("jp.naver.line.android");
            sleep(2000);
            launch("jp.naver.line.android");
            sleep(12000);
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
    launch("jp.naver.line.android");
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
function openvpn() {

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
function clearcontacts() {

    sleep(3000)
    launch("com.google.android.contacts")
    sleep(5000)
    toastLog("去删除通讯录")

    if (text("Skip").exists()) {
        click("Skip")
    }

    sleep(5000)
    if (textContains("+ws").exists()) {
        var ss = textContains("+ws").findOne().bounds()
        press(ss.left + 50, ss.top, 2200)
        sleep(3200);
        if (desc("Delete").exists()) {
            desc("More options").findOne().click()
        }
        sleep(2200);
        if (text("Select all").exists()) {
            var ss = text("Select all").findOne().bounds()
            click(ss.left, ss.top)
        }
        sleep(2200);
        if (desc("Delete").exists()) {
            desc("Delete").findOne().click()
        }
        sleep(2200);
        if (text("Delete").exists()) {
            click("Delete")
        }
    }
    sleep(2200);
    while (1) {
        sleep(3200);
        if (text("Deleting contacts").exists()) {
            sleep(5200);
            toastLog("清空联系人......")
        } else {
            toastLog("清空联系人成功")
            break
        }
    }
}

mainfb();