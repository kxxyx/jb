(function () {
    let request = http.request;
    http.request = function () {
        try {
            return request.apply(http, arguments);
        } catch (e) {
            //console.error(e);
            return null;
        }
    }
})();
http.__okhttp__.setTimeout(35000);
var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
manager.cancelAll();
let c = engines.all().length;
if (c > 2) {
    toastLog("脚本引擎：发现多个脚本同时运行，即将杀死所有脚本，请重新运行本脚本！");
    engines.stopAll();
}
auto.waitFor();
device.wakeUp();
device.keepScreenOn();
device.keepScreenDim();
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
toast = function (message) {
    _toast_(message);
    sleep(600);
}
var __id
var isnormal
var xcbh
var country
var jz
var clearvpn
var xb
var qunnmu = 8;
var jtjcount
var qrfriendnum
var ar = files.isDir("/sdcard/Download/Browser/");
if (ar == false) {
    files.ensureDir("/sdcard/Download/Browser/");
}
var ppcity = ["United States", "Ukraine", "Switzerland", "Saudi Arabia", "Portugal", "Norway", "Malaysia", "Israel", "Bhutan", "Philippines", "Korea", "Singapore", "Thailand", "Japan,Denmark", "Malaysia", "Turkey", "France", "Paris", "Marseille", "Lyon", "Montpellier", "Bordeaux", "Paris", "Germany", "Berlin", "Hamburg", "Munich", "Kingdom", "London", "Manchester", "Canada", "Ottawa", "Toronto", "Montreal", "Vancouver", "America", "Washington", "New York", "Los Angeles", "Chicago", "Illinois", "Philadelphia", "Houston Texas", "Miami", "Atlanta", "Boston", "Phoenix", "San Antonio", "San Diego", "california", "Dallas Texas", "Italy", "Rome", "Milan", "Turin", "Australia", "Canberra", "Sydney", "Melbourne", "Brisbane", "Russia", "Moscow", "Saint Petersburg", "Volgograd", "Brazil", "Brasilia", "Sao Paulo", "Rio de", "Manaus", "Mexico", "Veracruz", "onterrey", "Chihuahua", "UNAM", "Spain", "Madrid", "Barcelona", "Valencia", "Sevilla", "Colombia", "Bogota", "Cali", "Medellin", "Arauca", "Barranquilla"];

function mainfb() {

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
        xb = __TASK.xb;
        qunnmu = __TASK.qunnmu;
        jtjcount = __TASK.jtjcount;
        qrfriendnum = __TASK.qrfriendnum;
        delfriend = __TASK.delfriend;
        ffristfriend = __TASK.fristfriend;
        var vpntype = __TASK.vpntype;

        toastLog("[getAccount]手机编号: " + sjid);
        toastLog("[getAccount]架子编号: " + jz);

        openvpn(vpntype);

        stopapp("com.facebook.katana");
        sleep(2000);
        var t = mmlauncherui();
        if (t != true) {
            toastLog("未登录");
            while (1) {
                toastLog("第一次登录,导入通讯录");
                drvcf();
                var z = Login();
                if (z != true) {
                    toastLog("登录失败");
                } else {
                    toastLog("登录成功");
                    break;
                }
            }

        } else {
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

            if (delfriend == 1) {
                delefriends();
            }
            if (profile == 1) {
                toastLog("[任务]修改资料");

                var vsum = 0;
                var thread = threads.start(function () {
                    profiles();
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 1200) {
                        toastLog("[任务]修改资料时间到了！必须结束");
                        http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
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
                    if (vsum > 300) {
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
            if (addfriend == 1) {
                if (ffristfriend == 1) {
                    toastLog("[任务]添加好友");
                    var vsum = 0;
                    var thread = threads.start(function () {
                        toaddfriend();
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 1200) {
                            toastLog("[任务]添加好友时间到了！必须结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=3&id=" + __id);
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
                if (ffristfriend == 3) {
                    var vsum = 0;
                    var thread = threads.start(function () {
                        fristfriend();
                        netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=7&id=" + __id);
                    });
                    while (true) {
                        sleep(1000);
                        vsum = vsum + 1;
                        if (vsum > 1200) {
                            toastLog("[任务]搜索加精准本国好友时间到了！必须结束");
                            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=7&id=" + __id);
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                        var dfd = thread.isAlive();
                        if (dfd == false) {
                            toastLog("[任务]搜索加精准本国好友已经完成！自动结束");
                            thread.interrupt();
                            threads.shutDownAll();
                            break;
                        }
                    }
                }
            }
            if (profile == 3 && ffristfriend == 3) {
                toastLog("[任务]养号");
                var vsum = 0;
                var thread = threads.start(function () {
                    Maintenancenumber();
                    http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
                });
                while (true) {
                    sleep(1000);
                    vsum = vsum + 1;
                    if (vsum > 1200) {
                        toastLog("[任务]养号时间到了！必须结束");
                        http.get("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=9&id=" + __id);
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
            if (ad == 3) {
                if (ffristfriend == 1) {
                    Statisticalfriends();
                }
            }
        }

        sleep(5000);
        openclosewang("g");

        device.wakeUp();
        device.keepScreenOn();
        device.keepScreenDim();
        break;

    }
}
function toaddfriend() {

    var tag = "[添加朋友]";

    while (1) {

        sleep(900);
        var t = mmlauncherui();
        if (t != true) {
            toastLog("未登录");
            while (1) {
                var z = toastLogin();
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

    var adurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getad&xb=" + xb + "&id=" + __id;
    var __myad = aip("[getad]", adurl, 10);
    var adid = __myad.id;
    var adtype = __myad.type;
    var adcontent = __myad.content;
    var adtitle = __myad.title;
    toastLog("广告id" + adid);
    if (adid > 0) {

        if (adtype == 2) {
            toastLog("先下载图片" + xcbh);
            var txsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=1&xcbh=" + xcbh;
            var tx = aip("[广告图获取]", txsurl, 10);
            downloadappinstall(tx, "/sdcard/Download/Browser/2.jpg");
        }
        if (adtype == 3) {
            toastLog("先下载视频" + adcontent);
            downloadappinstall(adcontent, "/sdcard/Download/Browser/1.mp4");
        }
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
                        setText(adcontent);
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
                                var dcg = desctextall("Photo", 0);
                                sleep(5000);
                                if (dcg == "t") {
                                    if (text('NEXT').exists()) {
                                        click('NEXT');
                                    }
                                    if (text('完成').exists()) {
                                        click('完成');
                                    }
                                    sleep(8000);
                                    classnamedepth("FrameLayout", 1, 9);
                                    setText(adtitle);
                                    classnamedepth("LinearLayout", 0, 9);
                                    //提交发的次数
                                    sleep(18000);
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
                                    if (text('完成').exists()) {
                                        click('完成');
                                    }
                                    sleep(8000);
                                    classnamedepth("FrameLayout", 1, 9);
                                    setText(adtitle);
                                    classnamedepth("LinearLayout", 0, 9);
                                    //提交发的次数
                                    sleep(38000);
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
                        setText(adcontent);
                        //需要用输入法的换行键
                        sleep(8000);
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
    clearfiel("/sdcard/Download/Browser/", ".jpg");

    var txsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=1&xcbh=" + xcbh;
    var tx = aip("[头像获取]", txsurl, 10);
    downloadappinstall(tx, "/sdcard/Download/Browser/1.jpg");
    var bjsurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getProfile&t=2";
    var bjimage = aip("[背景获取]", bjsurl, 10);
    downloadappinstall(bjimage, "/sdcard/Download/Browser/2.jpg");

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
            toastLog("请查看是否有东西档住,或者网络不好,我需要在个人资料页面");
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
            toastLog("请查看是否有东西档住,或者网络不好,我需要在头像页面");
        }

    }
    while (1) {

        toastLog("修改背景");
        sleep(3000);
        if (text('Add Cover Photo').exists()) {
            sleep(4000);
            if (text('Add Cover Photo').exists()) {
                click("Add Cover Photo");
            }
            if (descContains('Add Cover Photo').exists()) {
                descContains("Add Cover Photo").findOne().click();
            }
            sleep(3000);
            click("Upload Photo");
            sleep(4000);
            if (text('OK').exists()) {
                click("OK");
            }
            if (text('Gallery').exists()) {
                sleep(4000);
                var zp = desc("Photo").find();
                if (zp.length == 0) {
                    toastLog("没有找到图片");
                    back();
                } else {
                    zp[0].click();
                    sleep(5000);
                    click('SAVE');
                    sleep(8000);
                    break;
                }
            }
        } else {
            break;
        }
    }
    netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=3&id=" + __id);
    var pfurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getpf&cid=" + country;
    var __pf = aip("[getpf]", pfurl, 10);
    var city = __pf.city;
    var szd = __pf.szd;
    var officed = __pf.officed;
    var ust = __pf.ust;

    sleep(4000);
    while (1) {

        if (desc("Hometown").exists()) {
            toastLog("家乡");
            sleep(2000)
            revisedata("Hometown", "Add Hometown", city);
            revisedata("Current City", "Add Current City", szd);
            revisedata("School", "Add High School", ust);
            revisedata("Workplace", "Add Workplace", officed);
            break
        }
        toastLog("请滑出家乡添加资料");
        sleep(3000);
    }
    back();

}
function drfriend() {

    toast("开始加确认好友");
    sleep(3000);
    gotofriend();
    if (text('Friend Requests').exists() && text('See All').exists()) {
        sleep(2000);
        click("See All");
        sleep(4000);
        if (text('Friend Requests').exists() && desc('back').exists()) {
            var sdf = jiawmfriend();
            return sdf;
        } else {
            sleep(600);
            toastLog("没有全部确认好友");
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
            toastLog("菜单栏，去找好友界面");
            var dc = descContains("Tab").find();
            if (dc.length > 0) {
                var dvname = "Tab " + dc.length + " of";
                classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
                sleep(6000);
                if (text('Find Friends').exists()) {
                    click("Find Friends");
                }
                if (text('Friends').exists()) {
                    click("Friends", 0);
                }
                sleep(8000);
                if (text('All Friends').exists()) {
                    toastLog("找到好友界面了");
                    break;
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

        toast("开始加推荐好友");
        stopapp("com.facebook.katana");
        sleep(2000);
        gotofriend();
        if (text('All Friends').exists()) {
            var sdf = jiawmfriend();
            if (sdf == "t") {
                toastLog("本号粉丝达到5000，不再加好友了");
                break;
            }
            if (sdf >= 20) {
                toastLog("确认好友超过20，本号不加好友了");
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
            if (textContains('mutual friend').exists()) {
                var errrpr = 14;
                var ew = classNameContains("View").textContains('mutual friend').depth(14).find();
                if (ew.length > 0) {
                    var de = classNameContains("View").textContains('mutual friend').depth(14).findOne().bounds();
                    var b1 = classNameContains("View").desc('Confirm').depth(15).findOne().bounds();
                } else {
                    errrpr = 17;
                    var de = classNameContains("View").textContains('mutual friend').depth(17).findOne().bounds();
                    var b1 = classNameContains("View").desc('Confirm').depth(18).findOne().bounds();
                }
                sleep(800);
                if ((b1.top - de.top) < 0) {
                    toast("不是共同好友不能加");
                    sleep(800);
                    click("Delete", 0);
                    sleep(800);
                } else {
                    sleep(800);
                    classNameContains("View").textContains('mutual friend').depth(errrpr).findOne().click()
                    var w = boundsContains(de.left, de.top, de.right, de.bottom).clickable().findOne();
                    w.click();
                    while (1) {
                        if (text('Message').exists()) {
                            break;
                        } else {
                            if (text('Reload Page').exists()) {
                                click('Reload Page');
                                sleep(2000);
                            }
                            scrollDown();
                            sleep(4000);
                        }
                    }
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
                        toast("是共同好友但非需要国家不能加")
                        sleep(800);
                        click("Delete", 0);
                        sleep(800);
                    }

                }
            } else {
                toast("没找到有共同好友,找...")
                sleep(800);
                click("Delete", 0);
                sleep(1000);
            }
            sleep(800);
            if (dtdrs > Number(qrfriendnum)) {
                return dtdrs;
            }
            if (!text('Confirm').exists()) {

                if (descContains('need to remove someone').exists()) {
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
                sleep(600);
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
    while (1) {

        toast("搜索加本国好友");
        stopapp("com.facebook.katana");
        sleep(2000);
        mmlauncherui();
        if (desc("Search Facebook").exists()) {
            isseeliveinfriend();

            sleep(1200);
            if (text('Retry').exists()) {
                click("Retry");
            }
            sleep(1600);
            var spe = classNameContains("view.View").depth(11).clickable().find();
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

                                        var gdr = classNameContains("view.View").depth(14).clickable().find();
                                        if (gdr.length > 0) {
                                            for (v = 0; v < gdr.length; v++) {
                                                toast("好友的好友列表" + v + "个");
                                                sleep(600);
                                                var gdr = classNameContains("view.View").depth(14).clickable().find();
                                                //gdr.get(v).click();
                                                var b = gdr.get(v).bounds();
                                                var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                                                w.click();

                                                sleep(4500);
                                                var xfrrrrr = 0;
                                                while (1) {
                                                    toast("循环查看个人页面");
                                                    if (text('Message').exists()) {

                                                        toast("匹配好友是否合格");
                                                        sleep(600);
                                                        scrollDown();
                                                        sleep(1200);
                                                        var sra = ppaddfriend();
                                                        if (sra == true) {
                                                            toast("本好友合格");
                                                            sleep(600);
                                                            while (1) {
                                                                sleep(1200);
                                                                scrollUp();
                                                                scrollUp(1);
                                                                sleep(1200);
                                                                if (text('Add Friend').exists()) {
                                                                    click("Add Friend", 0);
                                                                    dcr = dcr + 1;
                                                                    toastLog("添加第" + dcr + "个");
                                                                    sleep(jgsj);

                                                                }
                                                                break;
                                                            }
                                                            if (dcr > Number(jtjcount)) {
                                                                toastLog("首次粉" + jtjcount + "数量到了,任务完成");
                                                                return true;
                                                            }
                                                            if (text('OK').exists()) {
                                                                click("OK");
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
                                                    } else {
                                                        if (text('Reload Page').exists()) {
                                                            click('Reload Page');
                                                            sleep(2000);
                                                        }
                                                        sleep(4000);
                                                        xfrrrrr = xfrrrrr + 1;
                                                        if (xfrrrrr > 8) {
                                                            toast("查询太久了,返回查找下一个");
                                                            break;
                                                        }
                                                    }
                                                }
                                                while (1) {
                                                    if (text('Search Friends').exists()) {
                                                        break;
                                                    } else {
                                                        if (descContains('Back').exists()) {
                                                            desc("Back").findOne().click();
                                                            sleep(800);
                                                        }
                                                        if (text('Find More Friends').exists()) {
                                                            desc("Close").findOne().click();
                                                            sleep(800);
                                                        }
                                                    }
                                                }
                                                sleep(1200);
                                            }
                                        }
                                        var pq;
                                        var ph;
                                        var uc = classNameContains("view.View").find();
                                        for (var i = 0; i < uc.length; i++) {
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
                                        var uc1 = classNameContains("view.View").find();
                                        for (var i = 0; i < uc1.length; i++) {
                                            var tv1 = uc1[i];
                                            if (tv1.text() != "") {
                                                ph = tv1.text();
                                                break;
                                            }
                                        }
                                        if (pq == ph) {
                                            toastLog("所有好友检测完了");
                                            break;
                                        }
                                        if (drrrr > 12) {
                                            toastLog("所有好友检测完了");
                                            break;
                                        }

                                    }
                                    if (descContains('Back').exists()) {
                                        desc("Back").findOne().click();
                                        sleep(800);
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
                            sleep(4000);
                            qqrrr = qqrrr + 1;
                            if (qqrrr > 6) {
                                sleep(1200);
                                scrollDown(1);
                                sleep(1200);
                            }
                            if (qqrrr > 8) {
                                toast("查询太久了,返回查找下一个");
                                break;
                            }
                        }

                    }
                    if (descContains('Back').exists()) {
                        desc("Back").findOne().click();
                        sleep(800);
                    }
                }
                toast("搜索页当前列表筛选完成，下滑查找新的搜索列表");
                sleep(1200);
                scrollDown(1);
                sleep(1200);

            }
        }
    }
}
function jia() {

    while (1) {
        toast("加好友")
        stopapp("com.facebook.katana");
        sleep(2000);
        gotofriend();
        if (text('All Friends').exists()) {
            var cg = 0;
            var dcr = 0;
            var jgsj = 12000;
            while (1) {
                sleep(1600);
                if (textContains('mutual friend').exists()) {
                    var de = classNameContains("View").textContains('mutual friend').depth(14).findOne().bounds();
                    var b1 = classNameContains("View").desc('Add Friend').depth(15).findOne().bounds();
                    sleep(800);
                    if ((b1.top - de.top) < 0) {
                        sleep(1000);
                        toast("不是共同好友不能加")
                        click("Remove", 0);
                        sleep(1000);
                    } else {
                        toast("查询国家")
                        sleep(800);
                        classNameContains("View").textContains('mutual friend').depth(14).findOne().click()
                        var w = boundsContains(de.left, de.top, de.right, de.bottom).clickable().findOne();
                        w.click();
                        while (1) {
                            if (text('Message').exists()) {
                                break;
                            } else {
                                if (text('Reload Page').exists()) {
                                    click('Reload Page');
                                    sleep(2000);
                                }
                                sleep(4000);
                            }
                        }
                        scrollDown();
                        sleep(1200);
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
                            toast("是共同好友但非需要国家不能加")
                            sleep(800);
                            click("Remove", 0);
                            sleep(1000);
                        }
                    }

                } else {
                    toast("没找到有共同好友,找...")
                    sleep(800);
                    click("Remove", 0);
                    sleep(1000);
                }
                if (text('OK').exists()) {
                    click("OK");
                }
                if (textContains('无法添加更多好友').exists()) {
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
                    stopapp("com.facebook.katana");
                    sleep(2000);
                    gotofriend();
                }
                if (dcr > jtjcount) {
                    toastLog("今天加粉" + jtjcount + "数量到了,任务完成");
                    return true;
                }
            }
        }
    }
}
function Login() {

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
        if (descContains('We noticed suspicious activity').exists()) {
            toastLog("[登录]帐户中有可疑活动");
            netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=postask&t=5&id=" + __id);
            claerapp("com.facebook.katana");
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
        var jsfr = app.getAppName("com.facebook.katana");
        if (jsfr == null) {
            toastLog("fb因封号已卸载，请重新安装");
            sleep(3000);
        }
        back();
        lc = lc + 1;
        if (lc > 9) {

            lc = 0;
            toast('重新启动');
            stopapp("com.facebook.katana");
            sleep(2000);
            launch("com.facebook.katana");
            sleep(8000);

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
    if (text('Force stop').exists()) {
        click("Force stop");
    }
    sleep(2000);
    click("OK");
    sleep(4000);
}
function claerapp(sappname) {

    sleep(1000);
    app.openAppSetting(sappname);
    sleep(4000);
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
function downloadappinstall(url, appanme) {

    while (1) {
        var res = http.get(url);
        if (res.statusCode >= 200 && res.statusCode < 300) {

            files.writeBytes(appanme, res.body.bytes());
            sleep(4000);
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

    var intent = new Intent();
    intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
    app.startActivity(intent);
    sleep(5000);

    if (t == "k") {

        if (text('Off').exists()) {
            click('OFF');
        }
        if (text('OFF').exists()) {
            click('OFF');
        }
        if (text('WLAN OFF').exists()) {
            click('WLAN OFF');
        }
        sleep(9000);
    }
    if (t == "g") {

        launch("com.v2ray.ang");
        sleep(4000);
        toast("close vpn");
        sleep(1200);
        classNameContains("mageB").depth(10).findOne().click();
        sleep(2000);

        var intent = new Intent();
        intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI
        app.startActivity(intent);
        sleep(5000);

        if (text('On').exists()) {
            click('ON');
        }
        if (text('WLAN ON').exists()) {
            click('WLAN ON');
        }
        if (text('ON').exists()) {
            click('ON');
        }

    }

}
function openvpn(t) {

    launch("com.v2ray.ang");
    sleep(4000);
    if (clearvpn == 1 || !textContains("m").exists()) {
        toast("获取新VPN");
        if (clearvpn == 1) {
            sleep(1200);
            claerapp("com.v2ray.ang");
            sleep(2000);
            launch("com.v2ray.ang");
            sleep(4000);
        }
        var vpnurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getvpn&t=2";
        var __VPN = aip("[VPN]", vpnurl, 10);
        var vpnzh = __VPN.zh;
        setClip(vpnzh);
        sleep(1200);
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
                if (hyss > 10) {
                    toastLog("本好友少于20,不统计");
                    fristfriend();
                    break;
                }
            }
        }
        break;
    }
}
function clssnameall(cname, n) {

    var a = classNameContains(cname).find();
    if (a.length > 0) {
        var b = a.get(n).bounds();
        var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
        w.click();
        sleep(1500);

    } else {
        toastLog("没找到" + cname);
    }

}
function desctextall(cname, n) {

    var a = desc(cname).find();
    if (a.length > 0) {
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
function tydr() {

    sleep(5000);
    clssnameall("TextView", 1);
    sleep(2000);
    click("SAVE");
    sleep(5000);
    while (1) {
        if (desc("Dismiss").exists()) {
            desc("Dismiss").findOne().click();
            sleep(2000);
            break;
        } else {
            toast("网络不好, 继续点保存")
            if (text("SAVE").exists()) {
                click("SAVE");
                sleep(5000);
            }
        }
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
            sleep(6000)
            if (text(name2).exists()) {
                clssnameall("Button", 1);
                sleep(6000);
                classNameContains("EditText").findOne().setText(svalue);
                tydr();
                break;
            }
        }
        toastLog("找" + name1 + "请滑出" + name1);
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

    while (1) {

        back();
        sleep(1200)
        var dc = descContains("Tab").find();
        if (dc.length > 0) {
            toast("去游戏");
            var dvname = "Tab " + dc.length + " of";
            classNameContains("view.View").descContains(dvname).longClickable().findOne().click();
            sleep(6000);
            scrollDown(1);
            sleep(1200);
            scrollDown(1);
            sleep(1200);
            if (text('Gaming').exists()) {
                click("Gaming");
            }
            sleep(10000);
            scrollDown(1);
            sleep(1200);
            scrollDown(1);
            sleep(1200);
            click("8 Ball Pool");
            sleep(30000);
            back();
            click("Quit Game");
            back();
            break;
        }
    }

}
function drvcf() {

    var vcfurl = "http://" + __SERVER + "/index.php?g=api&m=sj&a=getvcf&country=" + country;
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
function isseeliveinfriend() {

    desc("Search Facebook").findOne().click();
    sleep(2000);
    while (1) {
        sleep(3000);
        var da = netget("http://" + __SERVER + "/index.php?g=api&m=sj&a=getsearchname&c=" + country);
        if (da.length > 1) {
            da = da + " | " + ppcity[Math.floor((Math.random() * ppcity.length))];
        } else {
            da = "aba" + " | " + ppcity[Math.floor((Math.random() * ppcity.length))];
        }
        setText(da);
        sleep(2000);
        toast("查找是否搜索到了好友");
        sleep(2200);
        if (desc('POSTS').exists() && desc('PEOPLE').exists()) {

            classNameContains("widget.Button").descContains("PEOPLE").findOne().click();
            toast("搜索成功");
            sleep(8000);
            if (text('Retry').exists()) {
                click("Retry");
            }
            break;
        } else {
            toast("请手动搜索");
            sleep(1000);
            if (text('Retry').exists()) {
                click("Retry");
            }
        }
    }
}
function sq() {

    var intent = new Intent();
    intent.setAction("android.settings.DATE_SETTINGS"); //日期和时间设置
    app.startActivity(intent);
    sleep(4000);
    if (text('Select time zone').exists()) {
        click("Select time zone");
    }
    if (text('Time zone').exists()) {
        click("Time zone");
    }
    sleep(4000);
    setText("New York");
    sleep(4000);

    if (textContains('New York').exists()) {

        var s = classNameContains("Layout").depth(11).clickable().findOne();
        if (s) {
            classNameContains("Layout").depth(11).clickable().findOne().click();
        }
        if (text('Eastern Time (New York)').exists()) {
            click("Eastern Time (New York)");

        }
    }
    toast("时区设置完成");
    back();
    back();
    back();
}

mainfb();