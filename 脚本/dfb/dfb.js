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
device.keepScreenOn();
device.keepScreenDim();
device.setBrightnessMode(0);
device.setBrightness(40);
device.setMusicVolume(3);
device.setNotificationVolume(3);
var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
var __MODEL = device.model
if (__IMEI == null) { while (1) { toastLog("本机设备信息错误,请重新刷机或更换手机"); sleep(4000); } }
var _toast_ = toast;
toast = function (message) { _toast_(message); sleep(2000); }
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }
var __id, zh, mm, fzyx, fzyxmm, sjid, country
initDirectory();

function mainfb() {

    while (1) {

        var taskurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getfb&imei=" + __IMEI;
        var __TASK = aip("[TASK]", taskurl, 45);
        __id = __TASK.id
        zh = __TASK.zh
        mm = __TASK.mm
        fzyx = __TASK.fzyx
        fzyxmm = __TASK.fzyxmm
        sjid = __TASK.sjid
        country = __TASK.country
        var profile = __TASK.profile;
        var ad = __TASK.ad;

        toastLog("[getAccount]别名: " + __TASK["name"]);
        toastLog("[getAccount]运行编号: " + __TASK["id"]);

        if (Number(__TASK.force_reboot) == 1) {
            toastLog("reboot")
            shell('reboot', true);
            return false
        }
        shell("am force-stop com.google.android.youtube", true);
        shell("pm clear com.android.providers.contacts", true);
        var ar = files.isDir("/sdcard/json/");
        if (ar == false) {
            files.ensureDir("/sdcard/json/systeminfo");
        }
        files.write("/sdcard/json/systeminfo", __TASK.dat_systeminfo);
        sleep(3000);
        onenewphone();
        openvpn();
        sleep(4000);
        var z = Login();
        if (z != true) {
            toast("登录失败");
            shell("am force-stop com.google.android.youtube", true);
            sleep(2000);
            shell("pm clear com.google.android.youtube", true);
        } else {
            if (profile == 1) {
                toastLog("[任务]修改资料");
                var vsum = 0;
                var thread = threads.start(function () {
                    profiles();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 15 * 60) {
                        toastLog("[任务]修改资料时间到了！必须结束");
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
            if (ad == 1) {
                toastLog("[任务]广告");
                var vsum = 0;
                var thread = threads.start(function () {
                    ads();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 10 * 60) {
                        toastLog("[任务]广告时间到了！必须结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]广告已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
            if (ad == 3) {
                toastLog("[任务]养号");
                var vsum = 0;
                var thread = threads.start(function () {
                    Maintenancenumber();
                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=9&id=" + __id);
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 15 * 60) {
                        toastLog("[任务]养号时间到了！必须结束");
                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=9&id=" + __id);
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                    var dfd = thread.isAlive();
                    if (dfd == false) {
                        toastLog("[任务]养号已经完成！自动结束");
                        thread.interrupt();
                        threads.shutDownAll();
                        break;
                    }
                }
            }
            LogOut();
        }
        device.wakeUp();
        device.keepScreenOn();
        device.keepScreenDim();
        sleep(18000);
    }
}
function ads() {

    var adurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getad&xb=" + xb + "&id=" + __id;
    var __myad = aip("[getad]", adurl, 10);
    var adid = __myad.id;
    var adtype = __myad.type;
    var adcontent = __myad.content;
    var adtitle = __myad.title;

    toastLog("广告id" + adid);
    var sdf5rasd = 1;
    if (adid > 0) {
        var z = mmlauncherui();
        if (z != true) {
            toast("登录失败");
            return false;
        }
        sleep(3000);
        while (1) {
            sleep(1200);
            if (descContains('Make a post on').exists()) {
                click("Make a post on Facebook");
                sleep(6000);
                if (text('Create Post').exists()) {
                    if (adtype == 1) {
                        //发文本
                        classnamedepth("FrameLayout", 1, 9);
                        setText(adcontent);
                        sleep(8000);
                        classnamedepth("LinearLayout", 0, 9);
                        //提交发的次数
                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=2&id=" + __id);
                        toastLog("[任务]本次广西广告完成");
                    }
                    if (adtype == 2) {
                        //发图片
                        sleep(2000);
                        click("Photo/Video");
                        sleep(3000);
                        if (desc('Camera').exists()) {
                            sleep(4000);
                            toast("在图库了");
                            if (sdf5rasd > 1) {

                                desctextall("Photo", 0);
                                sleep(1000);
                                desctextall("Photo", 0);
                                sleep(1000);
                                desctextall("Photo", 0);
                                sleep(1000);
                            } else {
                                desctextall("Photo", 0);
                            }
                            sleep(5000);
                            if (text('NEXT').exists()) {
                                click('NEXT');
                            }
                            if (text('DONE').exists()) {
                                click('DONE');
                            }
                            sleep(8000);
                            classnamedepth("FrameLayout", 1, 9);
                            setText(adtitle);
                            classnamedepth("LinearLayout", 0, 9);
                            //提交发的次数
                            http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                            http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=2&id=" + __id);
                            toastLog("[任务]本次图片广告完成");
                        }
                    }
                    if (adtype == 3) {

                        sleep(2000);
                        click("Photo/Video");
                        sleep(3000);
                        if (desc('Camera').exists()) {
                            sleep(4000);
                            toast("在图库了");
                            desctextall("Video", 0);
                            sleep(5000);
                            if (text('NEXT').exists()) {
                                click('NEXT');
                            }
                            if (text('DONE').exists()) {
                                click('DONE');
                            }
                            sleep(8000);
                            classnamedepth("FrameLayout", 1, 9);
                            setText(adtitle);
                            classnamedepth("LinearLayout", 0, 9);
                            //提交发的次数
                            http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                            http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=2&id=" + __id);
                            toastLog("[任务]本次视频广告完成");
                        }

                        //发视频
                    }
                    if (adtype == 4) {

                        //分享链接
                        classnamedepth("FrameLayout", 1, 9);
                        setText(adcontent);
                        //需要用输入法的换行键
                        KeyCode("KEYCODE_ENTER");
                        sleep(12000);
                        classnamedepth("LinearLayout", 0, 9);
                        //提交发的次数
                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=2&id=" + __id);
                        toastLog("[任务]本次链接广告完成");

                    }
                    break;
                }
            } else {
                toastLog("找发贴按钮");
            }
        }
    } else {
        toastLog("本号没有广告任务");
    }
}
function profiles() {

    files.removeDir("/sdcard/DCIM/");
    files.removeDir("/sdcard/Pictures/");
    files.removeDir("/sdcard/wdddd/");
    shell("rm -rf /sdcard/DCIM/Camera/", true);
    sleep(1 * 1000)
    var ar = files.isDir("/sdcard/DCIM/Camera/");
    if (ar == false) {
        files.ensureDir("/sdcard/DCIM/Camera/");
    }
    var txsurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getProfile&country=" + country;
    var tx = aip("[资料获取]", txsurl, 10);

    var img = images.load(tx.avatar);
    if (img != null) {
        _toast_("网络请求成功");
        images.save(img, "/sdcard/DCIM/Camera/1.jpg", "jpg", 100);
        _toast_("该图片保存在" + "/sdcard/DCIM/Camera/1.jpg");
        var file_name = "/sdcard/DCIM/Camera/1.jpg";
        shell("am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file://" + file_name)
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/Camera/1.jpg"))));
    } else {
        _toast_("网络请求失败!");
    };

    var z = mmlauncherui();
    if (z != true) {
        toast("登录失败");
        return false;
    }
    sleep(3000);
    desc("Go to profile").findOne().click();
    sleep(3000);

    while (1) {
        sleep(3000);
        if (text('Edit Profile').exists()) {
            break;
        } else if (desc('Profile picture').exists()) {
            sleep(3000);
            break;
        } else {
            if (text('Update Your Profile').exists()) {

                desc('Cancel').findOne().click();
                sleep(1200);
                click("Stop");
                sleep(2200);
                click("CLOSE");
            }
            toast("请查看是否有东西档住,或者网络不好,我需要在个人资料页面");
        }
    }
    while (1) {
        sleep(3000);
        if (desc('Profile picture').exists()) {
            sleep(4000);
            desc("Profile picture").findOne().click();
            sleep(3000);
            click("Select Profile Picture");
            sleep(4000);
            if (text('OK').exists()) {
                click("OK");
            }
            sleep(2000);
            if (text('Select Photo').exists()) {
                if (text('OK').exists()) {
                    click("OK");
                }
                sleep(4000);
                var g = desc("Photo").find();
                if (g.length == 0) {
                    toast("没有找到图片");
                    back();
                } else {
                    g[1].click();
                    sleep(5000);
                    click('SAVE');
                    sleep(8000);
                    break;
                }
            } else {
                back();
            }
        } else {
            toast("请查看是否有东西档住,或者网络不好,我需要在头像页面");
        }

    }
    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=3&id=" + __id);

}
function Login() {

    toastLog("帐号名" + zh);
    toastLog("密码" + mm);
    sleep(2000);
    launch("com.facebook.katana");
    sleep(12000);
    var yfsy = 0;
    while (1) {
        if (text('Phone or email').exists() && desc('Password').exists() && desc('Log In').exists()) {
            sleep(2000);
            setText(0, zh)
            sleep(1000);
            setText(1, mm)
            sleep(2000);
            click('Log In');
            sleep(6000);
        }
        if (textContains('Log In').exists()) {
            while (1) {
                sleep(5000);
                if (text('Log In').exists()) {
                    sleep(5000);
                } else {
                    break;
                }
            }
        }
        if (text('Login Failed').exists()) {
            click('OK');
            openvpn();
        }
        if (text('Add Your Photo').exists()) {
            Tap(904, 150);
            sleep(1200);
        }
        if (text('Find Friends').exists()) {
            sleep(1200);
            if (text('Get Started').exists()) {
                click('Get Started');
                sleep(6200);
            }
        }
        if (text('Add Friends').exists()) {
            Tap(904, 150);
            sleep(1200);
            click('Skip');
        }
        sleep(1000);
        if (text('Skip').exists()) {
            click('Skip');
        }
        sleep(2000);
        if (text('Save Your Login Info').exists()) {
            click('Not Now');
            sleep(2000);
            toast('不保存信息登录成功');
            return true;
        }
        if (desc('Go to profile').exists()) {
            toast('登录成功');
            return true;
        }
        if (descContains('Confirm Your Account').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('Upload A Photo Of').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('Send Code').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('We noticed suspicious activity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('Has Been Disabled').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (textContains('Older Password').exists() || textContains('Incorrect Password').exists()) {
            toastLog("[登录]密码错误");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('Please Confirm Your Identity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (descContains('Request a Review').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        yfsy = yfsy + 1;
        if (yfsy > 20) {
            yfsy = 0;
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana");
            sleep(10000);
        }
    }
}
function mmlauncherui() {
    var lc = 0;
    while (1) {
        sleep(2000);
        launch("com.facebook.katana");
        sleep(7000);
        if (text('Phone or email').exists() && desc('Password').exists() && desc('Log In').exists()) {
            sleep(2000);
            toast("需要登录");
            return false;
        }
        if (descContains('Confirm Your Account').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        sleep(1000);
        if (text('Skip').exists()) {
            click('Skip');
        }

        sleep(2000);
        if (text('Save Your Login Info').exists()) {
            click('Not Now');
            sleep(2000);
            toast('不保存信息登录成功');
        }
        if (descContains('We noticed suspicious activity').exists()) {
            toastLog("[登录]帐户中有可疑活动" + __id);
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }
        if (desc('Go to profile').exists()) {
            toast('首页');
            classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
            sleep(200);
            classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
            return true;
        }
        var jsfr = app.getAppName("com.facebook.katana");
        if (jsfr == null) {
            toast("fb因封号已卸载，请重新安装");
            sleep(3000);
        }
        back();
        lc = lc + 1;
        if (lc > 9) {
            lc = 0;
            toast('时间太久,重启应用');
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana");
            sleep(8000);
        }
    }
}
function onenewphone() {
    while (1) {
        sleep(500)
        launch("com.crf.xposedhookdebug");
        sleep(3000)
        if (text("手机型号").exists()) {
            text("一键新机").findOne().click();
            sleep(4500)
            shell("pm clear com.google.android.youtube", true);
            break;
        }
    }
}
function aip(tag, url, slp) {
    while (1) {
        var res = http.get(url);
        if (res.statusCode >= 200 && res.statusCode < 300) {
            toast(tag + "获取成功!");
            var getjson = res.body.json();
            var slp = Number(slp);
            if (getjson.status == 1) {
                return getjson.info;
            } else if (getjson.status == 0) {
                toast(tag + getjson.info);
                sleep(slp * 1000);
            }

        } else if (res.statusCode == 404) {
            toast(tag + "页面没找到哦...");
            sleep(9 * 1000);
        } else {
            toast(tag + "错误: " + res.statusCode + " " + res.statusMessage);
            openclosewang("k");
            sleep(9 * 1000);
        }
    }

}
function initDirectory() {

    shell("settings get system screen_brightness_mode 0;settings put system screen_brightness 50", true);
    shell("svc power stayon true", true);
    shell("svc wifi enable", true);
    var ar = files.isDir("/sdcard/Download/Browser/");
    if (ar == false) {
        files.ensureDir("/sdcard/Download/Browser/");
    }
}
function openvpn() {

    claerapp("com.v2ray.ang");
    sleep(2000);
    launch("com.v2ray.ang");
    sleep(4000);
    var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getvpn&t=2";
    var __VPN = aip("[VPN]", vpnurl, 10);
    var vpnzh = __VPN.zh;
    setClip(vpnzh);
    sleep(1200);
    desc("Add config").findOne().click();
    sleep(1200);
    classNameContains("LinearLayout").depth(2).column(1).findOne().click();

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
function clearfiel(sdname, hzm) {

    var dir = sdname;
    var jsFiles = files.listDir(dir, function (name) {
        return name.endsWith(hzm) && files.isFile(files.join(dir, name));
    });
    if (jsFiles.length > 0) {
        for (i = 0; i < jsFiles.length; i++) {
            files.remove(dir + jsFiles[i]);
            sleep(300);
        }
    }

}
function LogOut() {

    while (1) {

        sleep(900);
        var z = mmlauncherui();
        if (z != true) {
            toast("登录失败");
            return false;
        }
        toast("菜单栏，去找Log Out界面");
        var dc = descContains("Tab").find();
        if (dc.length > 0) {
            var dvname = "Tab " + dc.length + " of";
            classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
            sleep(6000);

            toast("退出登录");

            Swipe(100, 800, 100, 100, 500);
            sleep(800);
            Swipe(100, 800, 100, 100, 500);
            sleep(800);
            Swipe(100, 800, 100, 100, 500);
            sleep(800);
            Swipe(100, 800, 100, 100, 500);
            sleep(1200);
            scrollDown(1);
            sleep(1200);
            scrollDown(1);
            sleep(1200);

            if (text('Log Out').exists()) {

                click("Log Out");
                sleep(1800);
                if (text('Log OUT').exists()) {
                    click("Log OUT");
                }
                sleep(1800);
                if (text('Log Out').exists()) {
                    click("Log Out");
                }
                sleep(1800);
                if (text('Save and log out').exists()) {
                    click("Save and log out");
                }
                break;
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
mainfb();