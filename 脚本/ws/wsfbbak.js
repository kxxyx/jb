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
var fsmessage, isdanf, adcontent, adtype, adid, adtitle, adnumber, addfnumber, qrfriendnum, jtjcount, clearvpn, jz, country, xcbh, isnormal, __id;
var ar = files.isDir("/sdcard/Download/Browser/");
if (ar == false) { files.ensureDir("/sdcard/Download/Browser/"); }
var ppcity
var storage = storages.create("ABC");

function mainfb() {

    openclosewang("k");

    var yxkg = netget("http://" + __SERVER + "/lua/kg.html");

    var rw = storage.get("app");

    if (yxkg == "fb") {
        storage.put("app", "fb");
        rw = "fb"
    }
    if (yxkg == "line") {
        storage.put("app", "line");
        rw = "line"
    }
    if (yxkg == "sj") {
        if (rw) {
            rw = "fb";
            toastLog("自动选择运行app")
        } else {
            toastLog("第一次使用没有找到值,默认运行fb")
            rw = "fb";
        }
    }

    sq();

    if (rw == "fb") {
        toastLog("运行fb")
        while (1) {

            openclosewang("k");

            var taskurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=task&imei=" + __IMEI;
            var __TASK = aip("[TASK]", taskurl, 20);
            var addfriend = __TASK.addfriend;
            var profile = __TASK.profile;
            var ad = __TASK.ad;
            __id = __TASK.id;
            xcbh = __TASK.xcbh;
            country = __TASK.country;
            jz = __TASK.jznumber;
            var sjid = __TASK.sjid;
            clearvpn = __TASK.clearvpn;
            qunnmu = __TASK.qunnmu;
            jtjcount = __TASK.jtjcount;
            qrfriendnum = __TASK.qrfriendnum;
            delfriend = __TASK.delfriend;
            ffristfriend = __TASK.fristfriend;
            var birthday = __TASK.birthday;
            fsmessage = __TASK.fsmessage;

            toastLog("[getAccount]FB帐号ID: " + sjid);
            toastLog("[getAccount]FB架子编号: " + jz);
            toastLog("[getAccount]FB帐号: " + __TASK.zh);
            toastLog("[getAccount]FB生日: " + birthday);
            toastLog("[getAccount]FB邮箱密码: " + __TASK.emailmm);

            if (ad == 1) {

                var adurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getad&country=" + country;
                var __myad = aip("[getad]", adurl, 10);
                adid = __myad.id;
                adtype = __myad.type;
                adcontent = __myad.content;
                adtitle = __myad.title;
                isdanf = __myad.isdanf;
                toastLog("有广告id" + adid);

                if (adid > 0) {
                    if (adtype == 2) {

                        if (adcontent.length > 1) {
                            toastLog(adcontent)
                            var str = adcontent.split('+');
                            toastLog("广告图片需要下载" + str.length + "张");
                            if (str.length > 0) {
                                for (i = 0; i < str.length; i++) {
                                    toastLog("正下载图片" + str[i] + "第" + i + "张...");
                                    var img = images.load(str[i]);
                                    if (img != null) {
                                        _toast_("网络请求成功");
                                        images.save(img, "/sdcard/Download/Browser/" + i + ".jpg", "jpg", 100);
                                        _toast_("该图片保存在" + "/sdcard/Download/Browser/" + i + ".jpg");
                                        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/Download/Browser/" + i + ".jpg"))));
                                    } else {
                                        _toast_("网络请求失败!");
                                    };
                                }
                                sdf5rasd = str.length;
                            }
                        }
                        else {
                            var txsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=1&xcbh=" + xcbh;
                            var tx = aip("[广告图获取]", txsurl, 10);
                            toastLog("下载头像" + tx)
                            var img = images.load(tx);
                            if (img != null) {
                                _toast_("网络请求成功");
                                images.save(img, "/sdcard/Download/Browser/" + 0 + ".jpg", "jpg", 100);
                                _toast_("该图片保存在" + "/sdcard/Download/Browser/" + 0 + ".jpg");
                                app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/Download/Browser/" + 0 + ".jpg"))));
                                images.save(img, "/sdcard/Download/Browser/" + 1 + ".jpg", "jpg", 100);
                                _toast_("该图片保存在" + "/sdcard/Download/Browser/" + 1 + ".jpg");
                                app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/Download/Browser/" + 1 + ".jpg"))));
                            } else {
                                _toast_("网络请求失败!");
                            };
                            sdf5rasd = 1;
                        }
                        sleep(5000)
                    }
                    if (adtype == 3) {
                        toastLog("先下载视频" + adcontent);
                        downloadappinstall(adcontent, "/sdcard/Download/Browser/0.mp4");
                    }
                }

            }
            openvpn();
            stopapp("com.facebook.katana");
            sleep(2000);
            var t = mmlauncherui();
            if (t != true) {
                toastLog("FB未登录");
                while (1) {
                    toastLog("FB第一次登录,导入通讯录");
                    drvcf();
                    var z = login();
                    if (z != true) {
                        toastLog("FB登录失败");
                        claerapp("com.facebook.katana");
                        sleep(2200);
                        claerapp("com.v2ray.ang");
                        sleep(5000);
                    } else {
                        toastLog("FB登录成功");
                        if (birthday == 1) {
                            savefriends();
                        }
                        break;
                    }
                }

            } else {

                startyh();

                if (delfriend == 1) {
                    delefriends();
                }
                if (birthday == 1) {
                    savefriends();
                }
                if (ad == 1) {
                    toastLog("[任务]FB广告");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        ads();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 30 * 60) {
                            toastLog("[任务]FB广告时间到了！必须结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]FB广告已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
                if (profile == 1) {
                    toastLog("[任务]FB修改资料");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        profiles();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 20 * 60) {
                            toastLog("[任务]FB修改资料时间到了！必须结束");
                            http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]FB修改资料已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
                if (addfriend == 1) {

                    if (country == 5) {

                        toastLog("[任务]FB添加范好友");
                        var vsum = 0;
                        var thread = threads.start(function () {
                            toaddfriend();
                        });
                        while (true) {
                            sleep(1000);
                            vsum = vsum + 1;
                            if (vsum > 60 * 60) {
                                toastLog("[任务]FB添加好友时间到了！必须结束");
                                netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=3&id=" + __id);
                                thread.interrupt();
                                threads.shutDownAll();
                                break;
                            }
                            var dfd = thread.isAlive();
                            if (dfd == false) {
                                toastLog("[任务]FB添加好友已经完成！自动结束");
                                thread.interrupt();
                                threads.shutDownAll();
                                break;
                            }
                        }

                    } else {

                        var bjsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getcity&c=" + country;
                        var bjimage = aip("[城市FB获取]", bjsurl, 10);
                        ppcity = bjimage.ppcity

                        if (ffristfriend > 30) {
                            toastLog("[任务]FB添加精准好友");
                            var vsum = 0;
                            var thread = threads.start(function () {
                                toaddfriend();
                            });
                            while (true) {
                                sleep(1000);
                                vsum = vsum + 1;
                                if (vsum > 60 * 60) {
                                    toastLog("[任务]FB添加好友时间到了！必须结束");
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=3&id=" + __id);
                                    thread.interrupt();
                                    threads.shutDownAll();
                                    break;
                                }
                                var dfd = thread.isAlive();
                                if (dfd == false) {
                                    toastLog("[任务]FB添加好友已经完成！自动结束");
                                    thread.interrupt();
                                    threads.shutDownAll();
                                    break;
                                }
                            }
                        }
                        if (ffristfriend <= 30) {
                            var vsum = 0;
                            var thread = threads.start(function () {
                                fristfriend();
                                netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=7&id=" + __id);
                            });
                            while (true) {
                                sleep(1000);
                                vsum = vsum + 1;
                                if (vsum > 60 * 60) {
                                    toastLog("[任务]FB搜索加精准本国好友时间到了！必须结束");
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=7&id=" + __id);
                                    thread.interrupt();
                                    threads.shutDownAll();
                                    break;
                                }
                                var dfd = thread.isAlive();
                                if (dfd == false) {
                                    toastLog("[任务]FB搜索加精准本国好友已经完成！自动结束");
                                    thread.interrupt();
                                    threads.shutDownAll();
                                    break;
                                }
                            }
                        }
                    }
                }
                if (profile == 3) {
                    toastLog("[任务]FB养号");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        Maintenancenumber();
                        http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 15 * 60) {
                            toastLog("[任务]FB养号时间到了！必须结束");
                            http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]FB养号已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
                if (ad == 3) {
                    Statisticalfriends();
                }
            }
            break;

        }
        if (yxkg == "sj") {
            storage.put("app", "line");
        }
    }
    var rw = storage.get("app");

    if (rw == "line") {

        toastLog("运行line")

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
            addfnumber = __TASK.addfnumber;


            toastLog("[getAccount]Line ID: " + sjid);
            toastLog("[getAccount]架子编号" + __TASK.jznumber);
            toastLog("[getAccount]Line 粉丝国家: " + country);

            openvpn();
            sleep(2000);
            var t = Linelauncherui();
            if (t != true) {

                toastLog("LINE未登录");

                while (1) {
                    var z = Linelogin();
                    if (z != true) {
                        toastLog("LINE登录失败");
                        claerapp("jp.naver.line.android");
                        sleep(2200);
                        claerapp("com.v2ray.ang");
                        sleep(5000);
                    } else {
                        toastLog("LINE登录成功");
                        break;
                    }
                }
            } else {

                toastLog("LINE登录成功");

                if (LINEprofile == 1) {
                    toastLog("[任务]LINE修改资料");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        Lineprofiles();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 20 * 60) {
                            toastLog("[任务]LINE修改资料时间到了！必须结束");
                            http.get("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=9&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]LINE修改资料已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
                if (LINEaddfriend == 1) {
                    toastLog("[任务]LINE添加好友");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        Linetoaddfriend();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 60 * 60) {
                            toastLog("[任务]LINE添加好友时间到了！必须结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=2&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]LINE添加好友已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
                if (LINEad == 1) {
                    toastLog("[任务]LINE发送广告");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        linead();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 60 * 60) {
                            toastLog("[任务]LINE发送广告时间到了！必须结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=3&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]LINE发送广告已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
            }
            sleep(6000);
            break;

        }
        if (yxkg == "sj") {
            storage.put("app", "fb");
        }
    }
    openclosewang("g");
    device.cancelKeepingAwake();
}
function toaddfriend() {

    var tag = "[添加朋友]";

    while (1) {

        sleep(900);
        var t = mmlauncherui();
        if (t != true) {
            toastLog("未登录");
            while (1) {
                var z = login();
                if (z != true) {
                    toastLog("登录失败");
                } else {
                    toastLog("登录成功");
                    break;
                }
            }
        }

        gotofriend();

        if (text('All Friends').exists()) {

            toast("在好友列表页面");
            sleep(4000);

            if (text('Upload Your Contacts').exists()) {
                click("UPLOAD CONTACTS");
                sleep(4000);
                click("Get Started");
                drvcf();
            }

            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=1&id=" + __id);

            if (text('Try It').exists()) {

                toast("没有一个好友，去上传通讯录");
                click("Try It");
                sleep(4000);
                click("Get Started");
                sleep(8000);
                back();
                sleep(200);
                back();
                stopapp("com.facebook.katana");
                drvcf();
            }
            var c = drfriend();
            if (c == "t") {
                toastLog("本号粉丝达到5000，不再加好友了");
                break;
            }
            if (c >= 20) {
                toastLog("确认好友超过20，不加好友了");
                break;
            }
            tjfriend();
            break;

        }
    }
}
function ads() {

    toastLog("广告id" + adid);

    if (adid > 0) {

        mmlauncherui();
        sleep(3000);
        if (descContains('点击即可关闭对话框').exists()) {
            descContains("点击即可关闭对话框").findOne().click();
        }
        while (1) {
            sleep(1200);
            if (descContains('Make a post on').exists()) {
                click("Make a post on Facebook");
                sleep(6000);
                if (text('Create Post').exists()) {

                    if (adtype == 1) {
                        //发文本
                        classnamedepth("FrameLayout", 1, 9);
                        setText(adtitle);
                        sleep(8000);
                        classnamedepth("LinearLayout", 0, 9);
                        //提交发的次数
                        sleep(18000);
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=6&id=" + adid);
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=2&id=" + __id);
                        toastLog("[任务]本次广西广告完成");
                    }
                    if (adtype == 2) {
                        //发图片
                        sleep(2000);
                        click("Photo/Video");
                        sleep(3000);
                        while (1) {
                            if (desc('Camera').exists()) {
                                sleep(4000);
                                toast("在图库了");
                                var dcg = "f";
                                if (sdf5rasd > 1) {
                                    for (i = 0; i < sdf5rasd; i++) {
                                        desctextall("Photo", i);
                                        sleep(1200);
                                    }
                                    dcg = "t";
                                } else {
                                    dcg = desctextall("Photo", 0);
                                }
                                sleep(5000);
                                if (dcg == "t") {
                                    toast("下一步");
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
                                    sleep(35000);
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=6&id=" + adid);
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=2&id=" + __id);
                                    toastLog("[任务]本次图片广告完成");
                                    break;
                                } else {
                                    toast("图片没找到！！！");
                                }
                            }
                        }
                    }
                    if (adtype == 3) {
                        //发视频
                        sleep(2000);
                        click("Photo/Video");
                        sleep(3000);
                        while (1) {
                            if (desc('Camera').exists()) {
                                sleep(4000);
                                if (text('OK').exists()) {
                                    click('OK');
                                }
                                var dcg = desctextall("Video", 0);
                                sleep(5000);
                                if (dcg == "t") {
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
                                    sleep(58000);
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=6&id=" + adid);
                                    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=2&id=" + __id);
                                    toastLog("[任务]本次视频广告完成");
                                    break;
                                } else {
                                    toast("视频没找到！！！");
                                }
                            }
                        }

                    }
                    if (adtype == 4) {

                        //分享链接
                        classnamedepth("FrameLayout", 1, 9);
                        setText(adtitle);
                        sleep(2000)
                        if (anzres != "7.0") {
                            KeyCode("KEYCODE_ENTER");
                        } else {
                            //点击键盘回车坐标
                        }
                        sleep(38000);
                        classnamedepth("LinearLayout", 0, 9);
                        //提交发的次数
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=6&id=" + adid);
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=2&id=" + __id);
                        toastLog("[任务]本次链接广告完成");
                        sleep(38000);

                    }
                    break;
                }
            } else {
                toastLog("找发贴按钮");
            }
        }
        if (isdanf == 1) {
            toastLog("去mseeage发送广告");
            while (1) {
                sleep(2000);
                launch("com.facebook.orca");
                sleep(7000);
                if (textContains("CONTINUE AS").exists() && text("THIS ISN'T ME").exists()) {
                    toast("未登录,去登录");
                    var b = textContains("CONTINUE AS").findOne().bounds();
                    var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                    w.click();
                    sleep(7000);
                }
                if (text("Find your phone contacts on Messenger").exists() && text("TURN ON").exists()) {
                    toast("去授权通讯录");
                    click("TURN ON");
                    sleep(1000);
                    if (text("ALLOW").exists()) {
                        click("ALLOW");
                        sleep(1000);
                        click("NOT NOW");
                    }
                    sleep(7000);
                }
                if (text("Chats").exists() && desc("New Message").exists()) {
                    sleep(7000);
                    toast("进了首页,随机下滑");
                    for (i = 0; i < random(5, 25); i++) {
                        scrollUp(1);
                        sleep(1200);
                        scrollDown();
                        sleep(1200);
                        scrollDown();
                        sleep(6000);
                    }

                    toast("开始发送广告");

                    var fsl = 0;
                    var zzb = 0;

                    while (1) {
                        if (textContains("ok").exists() && text("OK").exists()) {
                            click("ok")
                            click("OK")
                        }
                        var a = classNameContains("view.View").depth(15).find();
                        for (i = 0; i < a.length; i++) {
                            var tc = a.get(i).text();
                            if (tc.length > 6 && !myIsNaN(tc) && tc != "NEW" && tc.indexOf(":") == -1 && tc.indexOf("You") == -1) {
                                var b = a.get(i).bounds();
                                if (zzb == 0) {
                                    zzb = b.left;
                                }
                                if (b.left == zzb) {
                                    var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                                    w.click();
                                    toast("查找是否在" + tc + "聊天页面");
                                    sleep(2000)
                                    if (desc('Thread details').exists() && desc("Back").exists() && text("Aa").exists()) {

                                        sleep(random(3000, 4500));
                                        desc("Choose photo").findOne().click();
                                        sleep(1200);
                                        if (text("ALLOW").exists()) {
                                            click("ALLOW");
                                        }
                                        sleep(random(800, 2500));
                                        var sraaarb = classNameContains("widget.FrameLayout").depth(13).find();
                                        if (sraaarb.length > 1) {

                                            toast("选择广告图片")
                                            b = sraaarb.get(0).bounds();
                                            var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                                            w.click();
                                            sleep(random(6000, 9500));

                                            if (desc("SEND").exists()) {

                                                desc("SEND").findOne().click()
                                                toast("发送图片")

                                            } else {

                                                toast("没发送图片")
                                                if (desc("Open more actions").exists()) {
                                                    desc("Open more actions").findOne().click();
                                                }
                                                if (desc("Take photo").exists()) {
                                                    desc("Take photo").findOne().click();
                                                    sleep(3200);
                                                    if (text("ALLOW").exists()) {
                                                        click("ALLOW");
                                                    }
                                                    back()
                                                }
                                            }
                                        }
                                        toast("发送第" + fsl + "个好友共需要" + fsmessage + "全");

                                        sleep(random(3000, 4500));
                                        if (text("Aa").exists()) {
                                            text("Aa").findOne().click();
                                            setText(adtitle);
                                            sleep(random(3000, 4500));
                                            if (desc("Send").exists()) {
                                                desc("Send").findOne().click();
                                                sleep(random(3000, 4500));
                                                fsl = fsl + 1;
                                            }
                                        } else {
                                            toast("没发送文字")
                                        }

                                    }
                                    while (1) {
                                        sleep(1200);
                                        toast("返回首页")
                                        if (text("Chats").exists() && desc("New Message").exists()) {
                                            break;
                                        } else {
                                            back();
                                            sleep(800)
                                        }
                                    }
                                }
                            }
                        }
                        toast("下滑查找好友列表")
                        scrollDown();
                        sleep(15000);
                        if (fsl > fsmessage) {
                            toast("本号发送广告" + fsl + "次完毕");
                            break;
                        }
                        if (textContains("ok").exists() && text("OK").exists()) {
                            click("ok")
                            click("OK")
                        }
                    }
                    break;
                } else {
                    back();
                }
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
    var ar = files.isDir("/sdcard/Download/Browser/");
    if (ar == false) {
        files.ensureDir("/sdcard/Download/Browser/");
    }
    var txsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=1&xcbh=" + xcbh;
    var tx = aip("[头像获取]", txsurl, 10);
    downloadappinstall(tx, "/sdcard/Download/Browser/0.jpg");
    var bjsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=2";
    var bjimage = aip("[背景获取]", bjsurl, 10);
    downloadappinstall(bjimage, "/sdcard/Download/Browser/1.jpg");

    mmlauncherui();
    sleep(3000);
    desc("Go to profile").findOne().click();
    sleep(3000);

    while (1) {
        sleep(3000);
        if (text('Current City').exists()) {
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
        sleep(5000);

    }
    sleep(5000);
    while (1) {

        sleep(3000);
        if (desc('Profile picture').exists()) {
            toastLog("Profile picture");
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
                    toastLog("没有找到图片");
                    back();
                } else {
                    //g[0].click();
                    desctextall("Photo", 1);
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

    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=3&id=" + __id);



}
function drfriend() {

    toast("开始加确认好友");
    sleep(3000);
    gotofriend();
    if (text('Friend Requests').exists() && text('See All').exists()) {
        var qdhysf = 0;
        while (1) {
            sleep(1000);
            click("See All");
            sleep(8000);
            if (text('Friend Requests').exists()) {
                var sdf = jiawmfriend();
                return sdf;
            } else {
                toastLog("没有确认好友,网络不好.....");
                sleep(600);
                back();
                sleep(2600);
            }
            qdhysf = qdhysf + 1;
            if (qdhysf > 10) {
                toastLog("没有确定好友...");
                break;
            }
        }

    } else {
        sleep(600);
        toastLog("不存在全部确认好友,去添加好友");
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
            classNameContains("view.View").descContains("Tab 2 of").longClickable().findOne().click();
            sleep(200);
            classNameContains("view.View").descContains("Tab 2 of").longClickable().findOne().click();
            sleep(8000);
            if (text('All Friends').exists()) {
                toast("找到好友界面了");
                break;
            } else {
                var dc = descContains("Tab").find();
                if (dc.length > 0) {
                    var dvname = "Tab " + dc.length + " of";
                    classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
                    toast("菜单栏，去找好友界面");
                    sleep(6000);
                    if (desc('Find Friends').exists()) {
                        desctextall("Find Friends", 0);
                        //click("Find Friends", 0);
                    }
                    if (desc('Friends').exists()) {
                        desctextall("Friends", 0);
                        //click("Friends", 0);
                    }
                    sleep(8000);
                    if (text('All Friends').exists()) {
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
function tjfriend() {

    while (1) {
        toastLog("开始加推荐好友")
        stopapp("com.facebook.katana");
        sleep(2000);
        gotofriend();
        if (text('All Friends').exists()) {
            var sdf = jiawmfriend();
            if (sdf == "t") {
                toastLog("本号粉丝达到5000，不再加好友了");
                break;
            }
            if (sdf >= 30) {
                toastLog("确认好友超过30，本号不加好友了");
                break;
            }
            sleep(2000);
            jia();
            break;
        }

    }

}
function jiawmfriend() {
    var dtdrs = 0;
    var cg = 0;
    if (text('Confirm').exists()) {

        while (1) {

            sleep(800);
            //var b1 = desc('Confirm').findOne().bounds();
            //Tap(b1.left, b1.top - 111);
            var a = classNameContains("view.View").depth(14).find();
            for (i = 0; i < a.length; i++) {
                var tc = a.get(i).text();
                if (tc.length > 6 && !myIsNaN(tc) && tc != "Friend Requests" && tc != "People You May Know" && tc != "Suggestions" && tc.indexOf("mutual") == -1) {
                    toast(tc);
                    var b = a.get(i).bounds();
                    var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                    w.click();
                    sleep(1000)
                    var txf = 0;
                    while (1) {
                        if (text('Message').exists()) {
                            toast("查询国家")
                            scrollDown();
                            sleep(1000);
                            var sra = ppaddfriend();
                            if (sra == true) {
                                back();
                                sleep(800);
                                click('Confirm', 0);
                                dtdrs = dtdrs + 1;
                                toastLog("添加第" + dtdrs + "个");
                                sleep(800);
                            } else {
                                back();
                                sleep(800);
                                toast("非需要国家不能加")
                                sleep(800);
                                click("Delete", 0);
                                sleep(800);
                            }
                            break;
                        } else {
                            if (text('Reload Page').exists()) {
                                click('Reload Page');
                                sleep(1000);
                            }
                            if (text('Retry').exists()) {
                                click("Retry");
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
                    break;
                }
            }
            sleep(800);
            if (dtdrs > Number(qrfriendnum)) {
                return dtdrs;
            }
            if (!text('Confirm').exists()) {

                sleep(800);
                if (textContains('need to remove someone').exists()) {
                    click("Not Now");
                    sleep(600);
                    toastLog("粉丝上限了")
                    return "t";
                }
                if (descContains('friend limit').exists()) {
                    click("OK");
                    sleep(600);
                    click("Delete", 0);
                    sleep(600);
                }
                if (textContains('Send Request').exists()) {
                    click("OK");
                    sleep(600);
                    click("Delete", 0);
                    sleep(600);
                }
                if (textContains('Start a Conversation').exists()) {
                    back();
                    sleep(600);
                }
                if (text('Close').exists()) {
                    click("Close");
                }
                if (text('Not Now').exists()) {
                    click("Not Now");
                }
                if (text('OK').exists()) {
                    click("OK");
                }
                if (text('Message').exists() && text('More').exists()) {
                    back();
                    sleep(600);
                }
                sleep(800);
                if (!text('Confirm').exists()) {

                    sleep(600);
                    if (!text('Search').exists()) {

                    } else {
                        back();
                        sleep(2200);
                    }
                    if (!text('Confirm').exists()) {
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
function fristfriend() {

    var dcr = 0;
    var jgsj = 12000;
    var fy = 0;
    toast("搜索加本国好友");
    isseeliveinfriend();
    while (1) {

        sleep(1600);
        var spe = descContains("Add friend request").find();

        if (spe.length > 0) {
            toast("找到了朋友");
            sleep(600);
            for (i = 0; i < spe.length; i++) {

                toast("点击" + i + "找到了朋友");
                sleep(600);
                var b = spe.get(i).bounds();
                var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                w.click();
                sleep(6600);
                var sdcs = 0;
                var qqrrr = 0;

                while (1) {

                    toast("循环查看个人页面");
                    if (text('Message').exists()) {
                        while (1) {
                            toast("查询当前粉丝的好友下滑" + sdcs + "次");
                            sleep(2600);
                            scrollDown();
                            sleep(1600);
                            sdcs = sdcs + 1;
                            if (sdcs > 2) {
                                toast("本号没有好友");
                                back();
                                sleep(1600);
                                if (text('Search').exists()) {
                                    back();
                                }
                                break;
                            }
                            if (text('See All Friends').exists()) {

                                toast("进好友的好友列表");
                                sleep(600);
                                click('See All Friends');
                                sleep(5200);
                                var drrrr = 0;

                                while (1) {

                                    if (text('Retry').exists()) {
                                        click("Retry");
                                    }
                                    if (text('Reload Page').exists()) {
                                        click('Reload Page');
                                    }
                                    toast("好友的好友列表按顺序匹配添加");
                                    sleep(6000);
                                    if (text('Add Friend').exists()) {
                                        click("Add Friend", 0);
                                        dcr = dcr + 1;
                                        toastLog("添加第" + dcr + "个");
                                        sleep(jgsj);
                                    }

                                    if (dcr > 5 || dcr > 8) {
                                        scrollDown();
                                        scrollDown(1);
                                        sleep(2600);
                                    }
                                    var pq;
                                    var ph;
                                    var uc = classNameContains("view.View").depth(15).find();
                                    for (var i = 1; i < uc.length; i++) {
                                        var tv = uc[i];
                                        if (tv.text() != "") {
                                            pq = tv.text();
                                            break;
                                        }
                                    }
                                    drrrr = drrrr + 1;
                                    scrollDown();
                                    scrollDown(1);
                                    sleep(2600);
                                    var uc1 = classNameContains("view.View").depth(15).find();
                                    for (var i = 1; i < uc1.length; i++) {
                                        var tv1 = uc1[i];
                                        if (tv1.text() != "") {
                                            ph = tv1.text();
                                            break;
                                        }
                                    }
                                    if (pq == ph) {
                                        toastLog("所有好友检测完了");
                                        sleep(800)
                                        back();
                                        sleep(800)
                                        back();
                                        sleep(800)
                                        if (text('See All Friends').exists()) {
                                            back();
                                        }
                                        break;
                                    }
                                    if (drrrr > 20) {
                                        toastLog("所有好友检测完了");
                                        sleep(800)
                                        back();
                                        sleep(800)
                                        back();
                                        sleep(800)
                                        if (text('See All Friends').exists()) {
                                            back();
                                        }
                                        break;
                                    }
                                    if (dcr > Number(jtjcount)) {
                                        toastLog("首次粉" + jtjcount + "数量到了,任务完成");
                                        return true;
                                    }
                                    sleep(2000);
                                    if (text('OK').exists()) {
                                        var okb = classNameContains("Button").text('OK').findOne().bounds();
                                        var w = boundsContains(okb.left, okb.top, okb.right, okb.bottom).clickable().findOne();
                                        w.click();
                                    }
                                    if (descContains('friend limit').exists()) {
                                        click("OK");
                                        sleep(600);
                                    }
                                    if (textContains('Send Request').exists()) {
                                        click("OK");
                                        sleep(600);
                                    }

                                }
                                break;
                            }
                        }
                        break;

                    } else {

                        if (text('Reload Page').exists()) {
                            click('Reload Page');
                            sleep(1000);
                        }
                        if (text('Retry').exists()) {
                            click("Retry");
                        }
                        sleep(4000);
                        qqrrr = qqrrr + 1;
                        if (qqrrr > 6) {
                            sleep(1200);
                            scrollDown(1);
                            sleep(1200);
                        }
                        if (qqrrr > 8) {
                            toast("查询太久了,返回查找下一个");
                            back();
                            break;
                        }
                    }

                }

                if (dcr > Number(jtjcount)) {
                    toastLog("首次粉" + jtjcount + "数量到了,任务完成");
                    return true;
                }
                sleep(2000);
                if (text('OK').exists()) {
                    var okb = classNameContains("Button").text('OK').findOne().bounds();
                    var w = boundsContains(okb.left, okb.top, okb.right, okb.bottom).clickable().findOne();
                    w.click();
                }
                if (descContains('friend limit').exists()) {
                    click("OK");
                    sleep(600);
                }
                if (textContains('Send Request').exists()) {
                    click("OK");
                    sleep(600);
                }
            }

            toast("搜索页当前列表筛选完成，下滑查找新的搜索列表");
            sleep(1200);
            scrollDown(1);
            sleep(1200);
            fy = fy + 1;
            if (fy > 5) {
                isseeliveinfriend();
            }
            if (text('Retry').exists()) {
                click("Retry");
            }
        }
    }
}
function jia() {

    while (1) {

        toastLog("加推荐好友")
        stopapp("com.facebook.katana");
        sleep(2000);
        gotofriend();

        if (text('All Friends').exists()) {

            var cg = 0;
            var dcr = 0;
            var jgsj = 12000;
            var jm = 0;
            if (desc('Search').exists()) {
                jm = 17;
            } else {
                jm = 14;
            }

            while (1) {
                if (text('Add Friend').exists()) {

                    sleep(1200);
                    var a = classNameContains("view.View").depth(jm).find();
                    for (i = 0; i < a.length; i++) {
                        var tc = a.get(i).text();
                        if (tc.length > 6 && !myIsNaN(tc) && tc != "Friend Requests" && tc != "People You May Know" && tc.indexOf("mutual") == -1) {
                            toast(tc);
                            var b = a.get(i).bounds();
                            var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                            w.click();
                            sleep(1000)
                            var txf = 0;
                            while (1) {
                                toast("查询国家")
                                if (text('Message').exists()) {

                                    scrollDown();
                                    sleep(1000);
                                    var sra = ppaddfriend();

                                    if (sra == true) {
                                        back();
                                        sleep(800);
                                        click("Add Friend", 0);
                                        dcr = dcr + 1;
                                        toastLog("添加第" + dcr + "个");
                                        sleep(jgsj);

                                    } else {

                                        back();
                                        sleep(800);
                                        toast("非需要国家不能加")
                                        sleep(800);
                                        click("Remove", 0);
                                        sleep(800);
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
                            break;
                        }
                    }
                }
                sleep(800);
                if (dcr > jtjcount) {
                    toastLog("今天加粉" + jtjcount + "数量到了,任务完成");
                    return true;
                }
                if (text('OK').exists()) {
                    click("OK");
                }
                if (textContains('need to remove someone').exists()) {
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
                if (!text('Add Friend').exists()) {
                    sleep(1200);
                    if (!text('Add Friend').exists()) {

                    } else {
                        back();
                        sleep(2200);
                    }
                    if (!text('Add Friend').exists()) {
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
        }
    }
}
function login() {

    toastLog("登录帐号");

    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getAccount&imei=" + __IMEI;

    var __ACC = aip("[getAccount]", taskurl, 10);

    var zh = __ACC.zh;
    var mm = __ACC.mm;

    toastLog("帐号名" + zh);
    toastLog("密码" + mm);

    sleep(2000);
    launch("com.facebook.katana");
    sleep(5000);
    var yfsy = 0;

    while (1) {
        //未登录帐号
        if (text('Phone or email').exists() && desc('Password').exists() && desc('Log In').exists()) {
            sleep(2000);
            setText(0, zh)
            sleep(1000);
            setText(1, mm)
            sleep(2000);
            click('Log In');
            sleep(6000);
        }
        if (text('Login Failed').exists()) {
            click('OK');
        }
        if (text('Add Your Photo').exists() || text('搜索好友').exists() || text('添加好友').exists()) {

            if (text('Skip').exists()) {
                click('Skip');
            }
            sleep(2000);
            if (text('Skip').exists()) {
                click('Skip');
            }
            sleep(4000);
        }
        if (text('Skip').exists()) {
            click('Skip');
        }
        sleep(2000);
        if (text('Save Your Login Info').exists()) {
            click('Not Now');
            sleep(2000);
            return true;
        }
        if (desc('Go to profile').exists()) {
            toast('登录成功');
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
        if (descContains('Upload A Photo Of').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Send Code').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Has Been Disabled').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (textContains('Older Password').exists() || textContains('Incorrect Password').exists()) {
            toastLog("[登录]密码错误");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Please Confirm Your Identity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Request a Review').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
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
function mmlauncherui() {

    var lc = 0;

    while (1) {
        sleep(2000);
        launch("com.facebook.katana");
        sleep(7000);
        //未登录帐号
        if (text('Phone or email').exists() && desc('Password').exists() && desc('Log In').exists()) {
            sleep(2000);
            toast("需要登录");
            return false;
        }
        if (text('Save Your Login Info').exists()) {
            click('Not Now');
            sleep(2000);
        }
        if (desc('Go to profile').exists()) {
            toast('首页');
            classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
            sleep(200);
            classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
            return true;
        }
        if (descContains('detected suspicious activity on your').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
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
        if (descContains('Upload A Photo Of').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Send Code').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Has Been Disabled').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (textContains('Older Password').exists() || textContains('Incorrect Password').exists()) {
            toastLog("[登录]密码错误");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Please Confirm Your Identity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        if (descContains('Your Account is Temporarily Locked').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
            return false;
        }
        var jsfr = app.getAppName("com.facebook.katana");
        if (jsfr == null) {
            toastLog("fb因封号已卸载，请重新安装");
            sleep(2500);
            apk路径 = "/sdcard/Download/Facebook_v_258_199294483.apk";
            app.startActivity({
                data: "file://" + apk路径,
                type: "application/vnd.android.package-archive",
                action: "VIEW",
                flags: ["grant_read_uri_permission", "grant_write_uri_permission"]
            })
            sleep(3000);
            if (text('install').exists()) {
                click("install");
                sleep(4500)
            }
            if (text('Install').exists()) {
                click("Install");
                sleep(4500)
            }
            if (text('INSTALL').exists()) {
                click("INSTALL");
                sleep(4500)
            }
        }
        back();
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

            toast("go to networking");

            importClass(android.net.ConnectivityManager);
            var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
            var net = cm.getActiveNetworkInfo();
            if (net == null || !net.isAvailable()) {
                toastLog("网络不可用!等待连接...");
                var intent = new Intent();
                intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
                app.startActivity(intent);
                sleep(5000);

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
        importClass(android.net.ConnectivityManager);
        var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
        var net = cm.getActiveNetworkInfo();
        if (net == null || !net.isAvailable()) {
            toastLog("网络不可用!本VPN有故障重新获取新的...");
            jscl = 1;
        } else {
            break
        }
    }
}
function Statisticalfriends() {

    while (1) {
        toastLog("统计好友强行停止");
        stopapp("com.facebook.katana");
        sleep(2900);
        launch("com.facebook.katana");
        gotofriend();
        sleep(8000);
        var hyss = 0;
        while (1) {
            if (text('All Friends').exists()) {
                click("All Friends", 0);
                sleep(8000);
                if (textContains('Friends').exists()) {
                    var ss = classNameContains("android.view.View").textContains("Friends").findOne();
                    if (ss) {
                        var friendnumber = ss.text();
                        toastLog(friendnumber);
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=4&id=" + __id + "&friendnumber=" + friendnumber);
                        sleep(1000);
                        toastLog("统计好友完成");
                        break;
                    }
                } else {
                    toastLog("好友少于20,可能没网,刷新");
                    back();
                    sleep(3000);
                }
                hyss = hyss + 1;
                if (hyss > 15) {
                    toastLog("本好友少于20,不统计");
                    break;
                }
            }
        }
        break;
    }
}
function clssnameall(cname, n) {
    while (1) {
        var a = classNameContains(cname).find();
        if (a.length > 0) {
            var b = a.get(n).bounds();
            var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
            w.click();
            sleep(1500);
            break;
        } else {
            toast("没找到" + cname);
            sleep(2500);
        }
    }
}
function desctextall(cname, n) {

    var a = desc(cname).find();
    if (a.length > n - 1) {
        var b = a.get(n).bounds();
        var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
        w.click();
        sleep(1500);
        return "t";
    } else {
        toastLog("没找到" + cname);
        return "f";
    }

}
function revisedata(name1, name2, svalue) {

    sleep(4000);
    while (1) {
        if (desc(name1).exists()) {
            toastLog(name1);
            sleep(4000)
            click(name1);
            if (name1 == "School") {
                sleep(4000)
                if (text(name2).exists()) {
                    click(name2);
                }
            }
            sleep(12000)
            if (text(name2).exists()) {

                clssnameall("Button", 1);
                sleep(3000);
                classNameContains("EditText").findOne().setText(svalue);
                sleep(12000);
                var a = classNameContains("TextView").depth(13).find();
                if (a.length > 0) {
                    var b = a.get(1).bounds();
                    toast(a.get(1).text())
                    var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                    w.click();
                    sleep(1500);
                }
                while (1) {

                    if (text("SAVE").exists()) {
                        click("SAVE");
                        sleep(5000);
                    }
                    sleep(1000);
                    if (text('OK').exists()) {
                        click("OK");
                    }
                    if (desc("Dismiss").exists()) {
                        desc("Dismiss").findOne().click();
                        sleep(2000);
                        break;
                    }
                }
                break;
            }
        }
        toast("找" + name1 + "请滑出" + name1);
        sleep(3000);
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
function classnamedepth(cname, n, g) {

    var gdr = className(cname).depth(g).find();
    if (gdr.length > 0) {
        var b = gdr.get(n).bounds();
        var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
        w.click();
    }
}
function Maintenancenumber() {

    sleep(900);
    mmlauncherui();
    var vcs = 0;

    while (1) {
        vcs = vcs + 1;
        classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
        sleep(200);
        classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
        sleep(8000);
        if (vcs > 3) {
            break;
        }
    }

    var dc = descContains("Tab").find();
    if (dc.length > 0) {
        var dvname = "Tab " + dc.length + " of";
        classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
        sleep(6000);
        if (text('Groups').exists()) {
            click("Groups");
        }
        sleep(6000);
    }


}
function drvcf() {

    var vcfurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getvcf&country=" + country;
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
    if (text('OK').exists()) {
        click("OK");
    }
    sleep(4000);
    if (text('Import').exists()) {
        click("Import");
    }
    sleep(4000);
}
function delefriends() {

    while (1) {

        back();
        sleep(900);
        back();
        sleep(900);
        launch("com.facebook.katana");
        gotofriend();
        sleep(4000);
        if (text('All Friends').exists()) {
            click("All Friends", 0);
            sleep(8000);
            if (textContains('Friends').exists()) {
                toast("开始删除");
                var dfr = 0;
                while (1) {
                    sleep(1000);
                    if (desc("More options").exists) {
                        sleep(1000);
                        desc("More options").findOne().click();
                        sleep(1500);
                        var a = descContains("Unfriend").find();
                        if (a.length > 0) {
                            var b = a.get(a.length - 1).bounds();
                            var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                            w.click();
                            dfr = dfr + 1;
                            sleep(1200);
                            click("Confirm");
                            sleep(600);
                            var a = descContains("Unfriend").find();
                            if (a.length > 0) {
                                back();
                            }
                        }
                        if (textContains("OK").exists) {
                            click("OK");
                        }
                        if (dfr == 6) {
                            if (textContains("OK").exists) {
                                click("OK");
                            }
                            dfr = 0;
                            toast("下滑");
                            sleep(2600);
                            scrollDown();
                            sleep(600);
                            scrollDown(1);
                            sleep(600);
                            scrollDown(2);
                            sleep(1000)
                        }
                    }
                    sleep(1000);
                    if (!desc("More options").exists) {

                        toast("返回一下");
                        back();
                        sleep(1000);
                        back();
                        launch("com.facebook.katana");
                        gotofriend();
                        sleep(4000);
                        sleep(4000);
                        click("All Friends", 0);
                        sleep(4000);
                        toast("下滑");
                        sleep(1600);
                        scrollDown();
                        sleep(600);
                        scrollDown(1);
                        sleep(600);
                        scrollDown(2);
                        sleep(1000)

                    }

                }
            }

        }
    }

}
function ppaddfriend() {
    var isccc = false;
    for (i = 0; i < ppcity.length; i++) {
        if (textContains(ppcity[i]).exists()) {
            toastLog("成功找到" + ppcity[i] + ",可以添加");
            sleep(1200);
            isccc = true;
            return isccc;
        }
    }
    return isccc;
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
function startyh() {

    var vcs = 0;

    while (1) {
        vcs = vcs + 1;
        classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
        sleep(200);
        classNameContains("view.View").descContains("Tab 1 of").longClickable().findOne().click();
        sleep(8000);
        if (vcs > 2) {
            break;
        }
    }
    var dc = descContains("Tab").find();
    if (dc.length > 0) {
        var dvname = "Tab " + dc.length + " of";
        classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
        sleep(6000);
        if (text('Groups').exists()) {
            click("Groups");
        }
        sleep(6000);
    }
}
function isseeliveinfriend() {

    while (1) {

        stopapp("com.facebook.katana");
        sleep(2000);
        mmlauncherui();

        if (desc("Search Facebook").exists()) {

            sleep(3000);
            desc("Search Facebook").findOne().click();

            var da = netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=getsearchname&c=" + country);
            sleep(1200);
            setText(da);
            sleep(3000);
            if (device.release > 7) {
                click(990, 1688)
            } else {
                toast("安卓版本过低请手动搜索");
            }
            sleep(15000)

            while (1) {

                sleep(3200);
                if (desc('POSTS').exists() && desc('PEOPLE').exists()) {

                    classNameContains("widget.Button").descContains("PEOPLE").findOne().click();
                    sleep(8000);
                    var spe = descContains("Add friend request").find();
                    if (spe.length > 0) {
                        toast("找到了朋友");
                        break;
                    }

                } else {

                    if (text('Retry').exists()) {
                        click("Retry");
                    }
                    if (text('Reload Page').exists()) {
                        click('Reload Page');
                    }

                    if (text('EDIT').exists() || text('edit').exists() || text('Edit').exists()) {


                    } else {

                        if (device.release > 7) {

                            if (desc("Search Facebook").exists()) {

                                desc("Search Facebook").findOne().click();
                                sleep(2000);
                                var da = netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=getsearchname&c=" + country);
                                sleep(1200);
                                setText(da);
                                click(990, 1688)
                                sleep(7000)
                            } else {
                                toastLog("返回首页重新搜索")
                                back();
                                sleep(1000);
                            }

                        } else {
                            toast("安卓版本过低请手动搜索");
                        }

                    }
                }
            }




            break;
        }
    }
}
function comejoingroup() {

    while (1) {
        sleep(900);
        var z = mmlauncherui();
        if (z != true) {
            toast("登录失败");
            return false;
        }
        var dc = descContains("Tab").find();
        if (dc.length > 0) {
            var dvname = "Tab " + dc.length + " of";
            classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
            toast("菜单栏，去找小组界面");
            sleep(6000);
            if (text('Groups').exists()) {
                click("Groups");
            }
            if (text('Groups').exists()) {
                toast("找到groups");
                let rradrr = text('Groups').findOne().bounds();
                Tap(rradrr.centerX(), rradrr.centerY());
            }
            sleep(4000);
        }
        toast("搜索群");

        if (desc("Search Groups").exists()) {
            click("Search Groups");
            sleep(1000);
            if (desc("Search Groups").exists()) {
                desc("Search Groups").findOne().click();
            }
            sleep(3000);
            var da = netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=getgroupsearchcity&c=" + country);
            setText(da);
            sleep(4000);
            KeyCode("KEYCODE_ENTER");
            sleep(5000)
            toast("查找是否搜索到了群");

            if (descContains("GROUPS").exists()) {
                classNameContains("widget.Button").descContains("GROUPS").findOne().click();
                sleep(8000);
            }
            sleep(2200);
            if (descContains("Join group").exists() || descContains("Join").exists() || descContains("Pending").exists()) {

                toast("找到群了");
                var sdf = 1;
                var xf = 0;
                while (1) {
                    toast("第" + sdf);
                    sleep(2000);
                    var zbr = 0;
                    if (text("Join").exists()) {
                        toast("Join");
                        zbr = text("Join").findOne().bounds();
                    }
                    if (descContains("Join group").exists()) {
                        toast("+号")
                        zbr = classNameContains("widget.Button").descContains("Join group request button").findOne().bounds();
                    }
                    if (zbr != 0) {

                        Tap(zbr.centerX(), zbr.centerY());
                        sleep(8000);
                        sdf = sdf + 1;
                        sleep(10000);

                        if (desc("Answer Questions").exists()) {

                            if (classNameContains("EditText").exists()) {
                                classNameContains("EditText").setText("Hi");
                            }
                            if (classNameContains("RadioButton").exists()) {
                                classNameContains("RadioButton").findOne().click();
                            }
                            if (classNameContains("CompoundButton").exists()) {
                                classNameContains("CompoundButton").findOne().click();
                            }
                            click("Submit");
                            sleep(4000);
                        }
                        if (desc("Answer Questions").exists()) {
                            back();
                            sleep(1200);
                            click("Exit");
                        }
                        if (text('About').exists()) {
                            back();
                            sleep(4000);
                        }
                        while (1) {
                            if (text("Exit").exists()) {
                                click("Exit");
                            }
                            sleep(1000);
                            if (desc('GROUPS').exists() && desc('Filters').exists()) {
                                break;
                            } else {
                                back();
                                sleep(1200);
                            }
                        }
                    }
                    if (sdf > Number(qunnmu)) {
                        return true;
                    }
                    if (zbr == 0) {
                        toast("下滑找新的");
                        scrollDown();
                        sleep(1200);
                        scrollDown(1);
                        xf = xf + 1;
                        sleep(2000);
                        if (xf > 4) {
                            toast("下滑太多次了,可能网不好，或者是没有群了");
                            return true;
                        }
                    }
                }
                break;
            }

        }
    }
}
function savefriends() {

    toastLog("去保存生日");
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
        sleep(1000);
        if (text("Edit Your About Info").exists()) {
            sleep(3000);
            click('Edit Your About Info');
            sleep(8000);
            if (text("About").exists()) {
                sleep(5000);
                scrollDown();
                sleep(2000);
                var a = classNameContains("TextView").depth(18).find();
                var rrrrr = "";
                for (i = 0; i < a.length; i++) {
                    var tc = a.get(i).text();
                    if (tc.length > 1) {
                        rrrrr = rrrrr + "-" + tc;
                    }
                }
                if (rrrrr.length > 20) {
                    toastLog(rrrrr);
                    http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=15&id=" + __id + "&birthday=" + rrrrr);
                }
            }
            break;

        } else {
            sleep(1000);
            if (text('Edit Profile').exists()) {
                click('Edit Profile');
                sleep(8000);
                if (text('Edit Profile').exists()) {
                    scrollDown();
                    sleep(2000);
                    scrollDown();
                    sleep(2000);
                    scrollDown();
                    sleep(2000);
                    scrollDown();
                    sleep(2000);
                    scrollDown();
                    sleep(2000);
                }
            }
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

    var adurl = "http://" + __SERVER + "/index.php?g=api&m=ws&a=getad&country=" + country;
    var __myad = aip("[getad]", adurl, 10);
    var adid = __myad.id;
    var adcontent = __myad.content;
    if (adid > 0) {

        while (1) {

            sleep(900);
            stopapp("jp.naver.line.android");
            sleep(2000);
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
                                if (device.release > 7) {
                                    click(b.left, b.top)
                                } else {
                                    boundsContains(b.left, b.top, b.right, b.bottom).click()
                                }
                            }
                            break
                        }

                    }
                }

                if (device.release > 7) {
                    sleep(2000)
                    swipe(400, 1600, 400, 300, 500);
                    sleep(2000)
                    swipe(400, 1600, 400, 300, 500);
                    sleep(3000)

                } else {
                    sleep(2000)
                    scrollDown(0)
                    sleep(2000)
                }

                while (1) {

                    sleep(5000)

                    toastLog("发现可用好友列表")

                    sleep(2000)

                    var sr = classNameContains("mageView").find();

                    for (i = 0; i < sr.length; i++) {

                        var b = sr.get(i).bounds()

                        if (b.left == 48 && b.top > 348) {

                            toast("去发送" + i)
                            if (device.release > 7) {
                                click(b.left, b.top)
                            } else {
                                boundsContains(b.left, b.top, b.right, b.bottom).click()
                            }

                            sleep(5500)
                            if (text('Chat').exists()) {
                                click('Chat')
                            }
                            if (text('Chat').exists()) {
                                var b = text('Chat').findOne().bounds()
                                if (device.release > 7) {
                                    click(b.left, b.top)
                                } else {
                                    click('Chat')
                                    //boundsContains(b.left, b.top, b.right, b.bottom).click()
                                }
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
                                        if (device.release > 7) {
                                            click(b.left, b.top)
                                        } else {
                                            boundsContains(b.left, b.top, b.right, b.bottom).click()
                                        }
                                        sleep(3000)
                                        fsn = fsn + 1;
                                        netget("http://" + __SERVER + "/index.php?g=api&m=ws&a=postask&t=6&id=" + adid);
                                        toastLog("已总发送" + fsn + "个消息,本次任务共发总需要" + adnumber)
                                    }
                                }
                                sleep(2000)
                                if (desc('Back').exists()) {
                                    var b = desc('Back').findOne().bounds()
                                    if (device.release > 7) {
                                        click(b.left, b.top)
                                    } else {
                                        boundsContains(b.left, b.top, b.right, b.bottom).click()
                                    }
                                }
                                sleep(3000)
                                if (text('Friends').exists()) {
                                    toastLog("去Friends首页")
                                    var b = text('Friends').depth(2).findOne().bounds()
                                    if (device.release > 7) {
                                        click(b.left, b.top)
                                    } else {
                                        boundsContains(b.left, b.top, b.right, b.bottom).click()
                                    }
                                }
                                sleep(2000)
                                if (text('Home').exists()) {
                                    toastLog("去Home首页")
                                    var b = text('Home').depth(9).findOne().bounds()
                                    if (device.release > 7) {
                                        click(b.left, b.top)
                                    } else {
                                        boundsContains(b.left, b.top, b.right, b.bottom).click()
                                    }
                                }
                            }
                            sleep(5200);

                        }
                    }

                    toastLog("当列完成下滑")

                    if (device.release > 7) {
                        sleep(2200);
                        swipe(400, 1600, 400, 100, 500);
                        sleep(3200);

                    } else {
                        sleep(2000)
                        scrollDown(0)
                        sleep(2000)
                    }

                    toast("检查任务情况")
                    sleep(3200);
                    if (fsn >= num - 10) {
                        toastLog("到底了，本次任务结束")
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

    toastLog("登录帐号");

    toastLog("先去清空通讯录")
    //clearcontacts()
    toastLog("导入指定号码进通讯录")
    drvcf()
    drvcf()
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

mainfb();