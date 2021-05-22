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
var __id, zh, mm, fzyx, fzyxmm, sjid, country, clearvpn

initDirectory();

function mainfb() {

    while (1) {
        openvpn();
    }
    
    exit();
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
        var yh = __TASK.yh;

        toastLog("[getAccount]别名: " + __TASK["name"]);
        toastLog("[getAccount]运行编号: " + __TASK["id"]);

        // if (Number(__TASK.force_reboot) == 1) {
        //     toastLog("reboot")
        //     shell('reboot', true);
        //     return false
        // }

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
        toastLog("帐号名" + zh);
        toastLog("密码" + mm);
        var z = Login();
        if (z != true) {
            toast("登录失败");
            shell("am force-stop com.google.android.youtube", true);
            sleep(2000);
            shell("pm clear com.google.android.youtube", true);
            device.wakeUp();
            device.cancelKeepingAwake();
            sleep(8000);
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
                    if (vsum > 20 * 60) {
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
            if (yh == 1) {

                toastLog("[任务]养号");
                var vsum = 0;
                var thread = threads.start(function () {
                    Maintenancenumber();
                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=9&id=" + __id);
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 20 * 60) {
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
            sleep(800);
            device.wakeUp();
            device.cancelKeepingAwake();
            sleep(18000);
        }
    }
    device.cancelKeepingAwake();
}
function ads() {

    var adurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getad&country=" + country;
    var __myad = aip("[getad]", adurl, 20);

    for (i = 0; i < __myad.length; i++) {

        var adid = __myad[i].id;
        var adtitle = __myad[i].title;
        var type = __myad[i].type;
        var py = __myad[i].py;
        var neednum = __myad[i].neednum;
        var orderno = __myad[i].orderno;
        var startnumber = __myad[i].startnumber;
        var score = __myad[i].score;

        var zj = Number(neednum) + (Number(neednum) * 5 / 100);

        if (adid > 0) {
            toastLog("当前任务广告id" + adid);
            while (1) {
                sleep(2000);
                launch("com.google.android.youtube");
                sleep(6000);
                if (desc('Account').exists()) {
                    var uuua = desc('Account').findOne().bounds()
                    if (uuua != null) {
                        Tap(uuua.left - 180, uuua.top)
                    }
                }
                sleep(3000);
                if (text('Search YouTube').exists()) {
                    setText(adtitle)
                    sleep(1200)
                    KeyCode("KEYCODE_ENTER")
                    sleep(8000)
                    if (textContains('Search instead for').exists()) {
                        var uuua = textContains('Search instead for').findOne().bounds()
                        if (uuua != null) {
                            Tap(388, uuua.top)
                            sleep(8000)
                        }
                    }
                    if (desc('Go to channel').exists()) {
                        var uuua = desc('Go to channel').findOne().bounds()
                        if (uuua != null) {
                            Tap(uuua.left + 180, uuua.top)
                        }
                        sleep(8000)

                        if (textContains("Share").exists()) {

                            var athreads = threads.start(function () {
                                while (1) {
                                    if (type == Number(107)) {

                                        toastLog("ad:订阅")
                                        var uuua = descContains('like this video').findOne().bounds()
                                        if (uuua != null) {
                                            if (uuua.top > 1500) {
                                                Swipe(493, 1704, 493, 1351)
                                                sleep(3800)
                                            }
                                        }
                                        if (score > zj) {
                                            toastLog("获取当前总订阅数")
                                            var zdys = textContains("subscriber").findOne().text();
                                            if (zdys != null) {
                                                var zdys = zdys.replace(/subscriber/g, "")
                                                if (Number(zdys) > (Number(zj) + Number(startnumber))) {
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=4&id=" + adid + "&stopnumber=" + Number(zdys));
                                                    toastLog("[订阅任务]" + adid + "全部完成,上传数据" + zdys);
                                                }
                                            }
                                        }
                                        if (text('SUBSCRIBE').exists()) {
                                            click("SUBSCRIBE")
                                            sleep(2000)
                                            http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                                            toastLog("[任务]本次关注广告完成");
                                        } else {
                                            toastLog("没有找到订阅按钮")
                                        }


                                    }
                                    if (type == Number(60)) {
                                        toastLog("ad:喜欢")
                                        sleep(2200)

                                        if (score > zj) {
                                            toastLog("获取当前喜欢阅数")
                                            var zdys = descContains("like this video").findOne().desc();
                                            if (zdys != null) {
                                                zdys = zdys.replace(/like this video along with/, "")
                                                zdys = zdys.replace(/other people/, "")
                                                if (Number(zdys) > (Number(zj) + Number(startnumber))) {
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=4&id=" + adid + "&stopnumber=" + Number(zdys));
                                                    toastLog("[喜欢任务]" + adid + "全部完成,上传数据" + zdys);
                                                }
                                            }
                                        }

                                        if (descContains('like this video').exists()) {
                                            var uuua = descContains('like this video').findOne().bounds()
                                            if (uuua != null) {
                                                Tap(uuua.left, uuua.top)
                                                //提交发的次数
                                                http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                                                toastLog("[任务]本次喜欢广告完成");
                                            }
                                        } else {
                                            toastLog("没找到喜欢按钮")
                                        }

                                    }
                                    if (type == Number(61)) {

                                        toastLog("ad:不喜欢")
                                        sleep(1200)

                                        if (score > zj) {
                                            toastLog("获取当前不喜欢阅数")
                                            var zdys = descContains("dislike this video").findOne().desc();
                                            if (zdys != null) {
                                                zdys = zdys.replace(/dislike this video along with/, "")
                                                zdys = zdys.replace(/other people/, "")
                                                if (Number(zdys) > (Number(zj) + Number(startnumber))) {
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=4&id=" + adid + "&stopnumber=" + Number(zdys));
                                                    toastLog("[不喜欢任务]" + adid + "全部完成,上传数据" + zdys);
                                                }
                                            }
                                        }
                                        if (descContains('dislike this video').exists()) {
                                            var uuua = descContains('dislike this video').findOne().bounds()
                                            if (uuua != null) {
                                                Tap(uuua.left, uuua.top)

                                                //提交发的次数
                                                http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                                                toastLog("[任务]本次不喜欢广告完成");
                                            }
                                        }
                                    }
                                    if (type == Number(108)) {
                                        toastLog("ad:评论")
                                        sleep(1200)
                                        var uuua = descContains('like this video').findOne().bounds()
                                        if (uuua != null) {
                                            if (uuua.top > 1500) {
                                                Swipe(493, 1704, 493, 1351)
                                                sleep(3800)
                                            }
                                        }

                                        if (score > zj) {
                                            toastLog("获取当前评论总数")

                                            sleep(800)
                                            if (descContains('Add a public comment').exists()) {
                                                var uuua = descContains('Add a public comment').findOne().bounds()
                                                if (uuua != null) {
                                                    Tap(uuua.left, uuua.top - 20)
                                                    sleep(2000)
                                                }
                                            }
                                            var zdys = descContains("Comments.").findOne().desc();
                                            if (zdys != null) {
                                                zdys = zdys.replace(/Comments./, "")
                                                if (Number(zdys) > (Number(zj) + Number(startnumber))) {
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=4&id=" + adid + "&stopnumber=" + Number(zdys));
                                                    toastLog("[评论任务]" + adid + "全部完成,上传数据" + zdys);
                                                }
                                            }
                                        }
                                        if (descContains('Add a public comment').exists()) {
                                            var uuua = descContains('Add a public comment').findOne().bounds()
                                            if (uuua != null) {
                                                Tap(uuua.left, uuua.top)
                                                sleep(5000)
                                                var pys = py.split("+")
                                                setText(pys[Math.floor((Math.random() * pys.length))]);
                                                sleep(2000)
                                                var uuua = descContains('Send comment').findOne().bounds()
                                                if (uuua != null) {
                                                    Tap(uuua.left, uuua.top)
                                                    sleep(7000)
                                                    //提交发的次数
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                                                    toastLog("[任务]本次评论广告完成");
                                                }

                                            }
                                        }
                                    }
                                    if (type == Number(109)) {

                                        toastLog("ad:播放")

                                        if (score > zj) {
                                            toastLog("获取当前播放数")
                                            sleep(800)
                                            var zdys = textContains("ago").findOne().text();
                                            if (zdys != null) {
                                                zdys = zdys.split("views")
                                                zdys = zdys[0];
                                                if (Number(zdys) > (Number(zj) + Number(startnumber))) {
                                                    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=4&id=" + adid + "&stopnumber=" + Number(zdys));
                                                    toastLog("[播放任务]" + adid + "全部完成,上传数据" + zdys);
                                                }
                                            }
                                        }
                                        sleep(random(35000, 50000))
                                        //提交发的次数
                                        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=6&id=" + adid);
                                        toastLog("[任务]本次播放广告完成");

                                    }
                                    back()
                                    sleep(800)
                                    back()
                                    break
                                }
                            });
                            while (true) {

                                sleep(800)
                                if (descContains("Auto-play is on").exists()) {
                                    descContains("Auto-play is on").findOne().click();
                                }
                                var dfd = athreads.isAlive();
                                if (dfd == false) {
                                    athreads.interrupt();
                                    break;
                                }
                            }
                            break;

                        } else {
                            toastLog("搜索的视频不准确")
                            back()
                        }
                    } else {
                        toastLog("没有搜索到视频")
                        back()
                    }
                } else {
                    toast("去发广告的路上,没有找到首页搜索按钮！")
                    back()
                    sleep(3000)
                }
            }
        } else {
            toastLog("本号没有广告任务");
        }
    }
    if (__myad.length > 0) {
        http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=2&id=" + __id);
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
    var FN = tx.First_name;
    var lN = tx.Last_name;
    var XB = tx.lx;
    var img = images.load(tx.avatar);
    if (img != null) {
        _toast_("图片网络请求成功");
        images.save(img, "/sdcard/DCIM/Camera/1.jpg", "jpg", 100);
        _toast_("该图片保存在" + "/sdcard/DCIM/Camera/1.jpg");
        var file_name = "/sdcard/DCIM/Camera/1.jpg";
        shell("am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file://" + file_name)
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/Camera/1.jpg"))));
    } else {
        _toast_("网络请求失败!");
    };
    while (1) {
        sleep(2000);
        launch("com.google.android.youtube");
        sleep(7000);
        if (text('Pick topics you like').exists()) {
            Tap(24, 1638)
            sleep(3000)
        }
        if (desc('Account').exists()) {
            var uuua = desc('Account').findOne().bounds()
            Tap(uuua.left, uuua.top)
            sleep(2000)
        }
        if (text('Manage your Google Account').exists()) {
            click('Manage your Google Account')
            sleep(8000)
        }
        sleep(3000);
        if (textContains('you can see and manage your info').exists()) {
            toast('Get started')
            click('Get started')
        }
        sleep(3000);
        if (desc('Security Checkup').exists()) {
            toast("安全确认")
            var uuua = desc('Navigate up').findOne().bounds()
            Tap(uuua.left, uuua.top)
            sleep(2000)
        }
        sleep(3000);
        if (text('Home').exists() && text('Personal info').exists()) {
            toast("去个人中心")
            click('Personal info')
            sleep(6000)
            break;
        }

    }
    //修改头像
    while (1) {
        toastLog("修改头像")
        sleep(3000);
        if (text('Profile').exists()) {
            toast('Photo')
            var uuua = text('Photo').findOne().bounds()
            Tap(uuua.left, uuua.top)
            sleep(3000);
        }
        sleep(3000);
        if (text('Set profile photo').exists()) {
            toast("Set profile photo")
            var uuua = text('Set profile photo').findOne().bounds()
            Tap(uuua.left + 20, uuua.top + 20)
            sleep(3000);
        }
        if (text('Set Profile Photo').exists()) {
            toast("Set Profile Photo")
            var uuua = text('Set Profile Photo').findOne().bounds()
            Tap(uuua.left + 20, uuua.top + 20)
            sleep(3000);
        }
        sleep(2000);
        if (text('Choose photo').exists()) {
            toast("Choose photo")
            click("Choose photo");
            sleep(8000);
        }
        sleep(2000);
        if (text('Camera').exists()) {
            var uuua = text('Camera').findOne().bounds()
            Tap(uuua.left, uuua.top)
            sleep(8000);
            var p = descContains("Photo").findOne().bounds();
            if (p != null) {
                Tap(p.left + 15, p.top + 10);
            }
            sleep(8000);
            if (text('Accept').exists()) {
                click("Accept");
                sleep(5000);
                break;
            }
        }
    }
    //修改姓名 
    // while (1) {
    //     sleep(2000);
    //     var uuua = text('Name').findOne().bounds()
    //     Tap(uuua.left, uuua.top)
    //     sleep(6000);
    //     if (desc('First name').exists()) {
    //         setText(0, FN)
    //         sleep(2000);
    //     }
    //     if (desc('Last name').exists()) {
    //         setText(1, LN)
    //         sleep(2000);
    //     }
    //     sleep(2000);
    //     if (desc('Save').exists()) {
    //         var uuua = desc('Save').findOne().bounds()
    //         Tap(uuua.left, uuua.top)
    //         sleep(5000);
    //         break;
    //     }
    // }
    //修改姓别 
    while (1) {
        toastLog("修改姓别")
        sleep(2000);
        var uuua = text('Gender').findOne().bounds()
        if (uuua != null) {
            Tap(uuua.left + 50, uuua.top)
        }
        sleep(6000);
        if (Number(XB) == 1) {
            toastLog("女")
            Tap(80, 790)
            sleep(3000)
            Tap(80, 790)
        }
        if (Number(XB) == 2) {
            toastLog("男")
            Tap(80, 930)
            sleep(3000)
            Tap(80, 930)
        }
        sleep(1800)
        break;
    }
    back()
    sleep(800)
    back()
    sleep(800)

    if (desc('Done').exists()) {
        var uuua = desc('Done').findOne().bounds()
        Tap(uuua.left, uuua.top)
        sleep(2000)
    }
    toastLog("资料修改完成")
    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=3&id=" + __id);

}
function Login() {
    sleep(2000);
    launch("com.google.android.youtube");
    sleep(12000);
    var yfsy = 0;
    while (1) {
        sleep(1200)
        if (text('Gaming').exists() && text('NBA').exists()) {
            toastLog("选择爱好频道")
            sleep(2000);
            var a5rad = id("content_view").find();
            if (a5rad.length > 0) {
                for (i = 0; i < 3; i++) {
                    var sts = Math.floor(Math.random() * 10);
                    var sewe = a5rad.get(sts).bounds();
                    Tap(sewe.left, sewe.top)
                    sleep(2000)
                }
                var uuua = text('Continue').findOne().bounds()
                if (uuua != null) {
                    Tap(uuua.left, uuua.top)
                } else {
                    Tap(312, 1638)
                }
            }
            sleep(3000)
        }
        if (desc('Account').exists()) {
            var uuua = desc('Account').findOne().bounds()
            if (uuua != null) {
                Tap(uuua.left, uuua.top)
            }
            sleep(2000)
        }
        if (text('Sign in').exists() && text('Account').exists() && text('Settings').exists()) {
            if (text('Sign in').exists()) {
                var uuua = text('Sign in').findOne().bounds()
                if (uuua != null) {
                    Tap(uuua.left, uuua.top)
                }
                sleep(3000)
            }
        }
        sleep(2000)
        if (text('Add account').exists()) {
            var uuua = desc('Add account').findOne().bounds()
            if (uuua != null) {
                Tap(uuua.left, uuua.top)
            }
            sleep(8000)
        }
        if (text('Manage your Google Account').exists()) {
            toast("登录成功")
            back()
            return true;
        }
        while (1) {
            sleep(1200)
            if (textContains('Checking info').exists()) {
                toast("等待确认登录")
                sleep(3000)
            } else {
                break
            }
        }
        while (1) {
            sleep(1200)
            if (textContains('Couldn').exists() && textContains('sign in').exists()) {
                toast("网络掉了,请查询wifi连接")
                click("Next")
                sleep(3000)
            } else {
                break
            }
        }
        if (desc('Sign in').exists() || text('Sign in').exists()) {
            toast("输入帐号")
            var rrr = classNameContains("EditText").findOne().bounds()
            if (rrr != null) {
                Tap(rrr.left + 22, rrr.top + 10)
            }
            setClip(zh)
            var ra = new RootAutomator();
            ra.longPress(rrr.left + 40, rrr.top)
            ra.longPress(rrr.left + 40, rrr.top)
            Tap(rrr.left + 22, rrr.top + 10)
            ra.exit();
            sleep(1000);
            back()
            sleep(1000);
            Tap(883, 1478)
            sleep(6000)
        }
        sleep(1200)
        if (desc('Show password').exists() || text('Show password').exists()) {
            toast("输入密码")
            var rrr = classNameContains("EditText").findOne().bounds()
            if (rrr != null) { Tap(rrr.left + 22, rrr.top + 10) }
            setClip(mm)
            var ra = new RootAutomator();
            ra.longPress(rrr.left + 40, rrr.top)
            ra.longPress(rrr.left + 40, rrr.top)
            Tap(rrr.left + 22, rrr.top + 10)
            ra.exit();
            sleep(1000);
            back()
            sleep(1000);
            Tap(745, 1414)
            sleep(6000)
        }
        if (text('Retry').exists()) {
            toastLog("网络有问题，重新开VPN")
            openvpn();
        }
        if (text('Sign in').exists() && !text('Account').exists() && !textContains('Use your Google').exists() && !textContains('with your Google').exists() && !textContains('Forgot').exists()) {
            toastLog("上一个号数据有问题，去清除数据")
            LogOut()
            shell("am force-stop com.google.android.youtube", true);
            sleep(2000);
            launch("com.google.android.youtube");
            sleep(10000);
            openvpn();
        }
        if (text('Try again').exists()) {
            toastLog("网络有问题，重新开VPN")
            text('Try again')
            openvpn();
        }
        sleep(1200)
        if (descContains('Add phone number').exists() || textContains('Add phone number').exists()) {
            toast('Add phone number')
            sleep(3000)
            Swipe(100, 1400, 100, 100, 500);
            sleep(800);
            Swipe(100, 1400, 100, 100, 500);
            sleep(2800);
            Tap(120, 1489)
        }
        sleep(1200)
        if (textContains('We publish').exists() || descContains('We publish').exists()) {
            toast('i agere')
            Tap(873, 1671)
            sleep(5200);
        }

        sleep(1200)
        if (textContains('Confirm your recovery email').exists() || textContains('recovery email').exists()) {
            toast('Confirm your recovery email')
            var rrr = textContains("Confirm your recovery email").findOne().bounds()
            if (rrr != null) { Tap(rrr.left, rrr.top) }
            sleep(5200);
            var rrr = classNameContains("EditText").findOne().bounds()
            if (rrr != null) { Tap(rrr.left + 22, rrr.top + 10) }
            setClip(fzyx)
            var ra = new RootAutomator();
            ra.longPress(rrr.left + 40, rrr.top)
            ra.longPress(rrr.left + 40, rrr.top)
            Tap(rrr.left + 22, rrr.top + 10)
            ra.exit();
            sleep(1000);
            setText(fzyx)
            sleep(1000);
            back()
            sleep(1000);
            Tap(745, 1414)
            sleep(6000)

        }
        while (1) {
            sleep(1200)
            if (textContains('Getting account info').exists()) {
                toast("等待确认登录")
                sleep(3000)
            } else {
                break
            }
        }
        sleep(2000);
        if (text('Google Services').exists() && textContains('Backup').exists()) {
            var rrr = text("ON").findOne().bounds()
            Tap(rrr.left + 10, rrr.top + 5)
            sleep(1200)
            desc('More').findOne().click()
            sleep(2200)
            click("Accept")
            sleep(6200)
            toast('不保存信息登录成功');
            return true;
        }
        if (descContains('Account disabled').exists() || text('Account disabled').exists()) {
            toastLog("[登录]帐户被禁用");
            netget("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=5&id=" + __id);
            return false;
        }

        yfsy = yfsy + 1;
        toast("循环登录" + yfsy + "次")
        if (yfsy > 15) {
            yfsy = 0;
            shell("am force-stop com.google.android.youtube", true);
            sleep(2000);
            launch("com.google.android.youtube");
            sleep(10000);
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
            openclosewang();
            sleep(9 * 1000);
        }
    }

}
function initDirectory() {

    shell("settings get system screen_brightness_mode 0;settings put system screen_brightness 50", true);
    shell("svc power stayon true", true);
    shell("svc wifi enable", true);
    var ar = files.isDir("/sdcard/DCIM/Camera/");
    if (ar == false) {
        files.ensureDir("/sdcard/DCIM/Camera/");
    }
}
function openvpn() {
    var vpnid;
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

                shell("am force-stop com.v2ray.ang", true);
                sleep(800);
                shell("pm clear com.v2ray.ang", true);
                sleep(2000);
                launch("com.v2ray.ang");
                sleep(4000);
            }

            var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getvpn&t=2";
            var __VPN = aip("[VPN]", vpnurl, 10);
            var vpnzh = __VPN.zh;
            vpnid = __VPN.id;
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
            desc('More options').findOne().click()
            sleep(1500)
            click("Service restart")
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
        var res = http.get("https://www.baidu.com/");
        if (res.statusCode >= 200 && res.statusCode < 300) {
            break
        } else if (res.statusCode == 404) {
            toast("页面没找到哦...");
        } else {
            toast("下载错误: " + res.statusCode + " " + res.statusMessage);
            toastLog("网络不可用!本VPN有故障重新获取新的...");
            http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=16&id=" + vpnid);
            jscl = 1;
            clearvpn = 1;
        }
    }
}
function openvpn111() {

    shell("am force-stop com.v2ray.ang", true);
    sleep(800);
    shell("pm clear com.v2ray.ang", true);
    sleep(2000);
    launch("com.v2ray.ang");
    sleep(4000);
    var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=fb&a=getvpn&t=2";
    var __VPN = aip("[VPN]", vpnurl, 5);
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
        desc('More options').findOne().click()
        sleep(1500)
        click("Service restart")
        sleep(2000);
        if (text('Connection request').exists()) {
            sleep(2000);
            click("OK");
        }
        if (text('I trust this application.').exists()) {
            sleep(2000);
            click("OK");
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
function LogOut() {

    while (1) {
        shell("am force-stop com.v2ray.ang", true);
        sleep(1000)
        shell("am force-stop com.android.settings", true);
        sleep(3000)
        files.removeDir("/sdcard/Android/");
        sleep(3000)
        launch("com.android.settings");
        sleep(5000)
        Swipe(300, 1200, 300, 100, 500);
        sleep(800);
        Swipe(300, 1000, 300, 100, 500);
        sleep(1800);
        var ta = text("Personal").findOne().bounds()
        Tap(ta.left + 300, ta.top + 580)
        sleep(1800);
        if (text("Accounts").exists()) {
            sleep(1800);
            if (text("Google").exists()) {

                click("Google")
                sleep(1800);
                Tap(217, 398)
                sleep(1800);
                if (descContains("More options").exists()) {
                    descContains("More options").findOne().click()
                }
                sleep(1800);
                Tap(528, 270)
                sleep(1800);
                if (text("Remove account").exists()) {
                    click("Remove account")
                    break
                }
            } else {
                toastLog("误判")
                break
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
function lineDown(randomMin, randomMax) {
    var ctim = random(600, 900);
    var x2 = random(300, 500);
    var gdz = device.height - 320;
    var y2 = random(gdz - 300, gdz);
    var y1 = random(80, 110);
    Swipe(x2, y2, x2, y1, ctim);
    let delayTime = random(randomMin, randomMax);
    sleep(delayTime);
}
function Maintenancenumber() {

    launch("com.google.android.youtube");
    sleep(5000);
    var jdsl = 0;
    var yhcs = random(10, 18)
    while (1) {

        lineDown(1500, 3000);
        sleep(1000);
        toast(jdsl + "个视频")
        Tap(random(200, 400), random(600, 900))
        var asd = 1;
        while (1) {
            asd = asd + 1;
            toast("看了" + asd + "秒")
            if (asd > random(200, 400)) {
                back()
                break
            }
        }
        jdsl = jdsl + 1;
        if (jdsl > yhcs) {
            postlog("养号看视频" + yhcs + "个完成");
            break;
        }
        launch("com.google.android.youtube");
        sleep(4000);
        lineDown(1500, 3000);

    }
    http.get("http://" + __SERVER + "/index.php?g=api&m=fb&a=postask&t=9&id=" + __id);
}

mainfb();