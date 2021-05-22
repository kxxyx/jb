var fsmessage = 10;
var adtitle = "www.badsfsd。com";
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
        for (i = 0; i < random(5, 15); i++) {
            scrollDown();
            sleep(6000);
        }
        toast("开始发送广告");

        var fsl = 0;
        var zzb = 0;

        while (1) {

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
                        if (desc('Thread details').exists() && desc("Back").exists()) {

                            sleep(random(3000, 4500));
                            desc("Choose photo").findOne().click();
                            sleep(1200);
                            if (text("ALLOW").exists()) {
                                click("ALLOW");
                            }
                            sleep(random(800, 2500));
                            var sraaarb = classNameContains("widget.FrameLayout").depth(13).find();
                            if (sraaarb.length > 1) {
                                b = sraaarb.get(0).bounds();
                                var w = boundsContains(b.left, b.top, b.right, b.bottom).clickable().findOne();
                                w.click();
                                sleep(random(6000, 9500));
                                if (desc("SEND").exists()) {
                                    classNameContains("widget.Button").desc("SEND").click();
                                } else {
                                    if (desc("Open more actions").exists()) {
                                        desc("Open more actions").findOne().click();
                                    }
                                    desc("Take photo").findOne().click()
                                    sleep(3200);
                                    if (text("ALLOW").exists()) {
                                        click("ALLOW");
                                    }
                                }

                            }
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
            scrollDown();
            sleep(15000);
            if (fsl > fsmessage) {
                toast("本号发送广告" + fsl + "次完毕");
                break;
            }
        }

        break;
    } else {
        back();
    }
}




function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}

exit();



    
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
                //zp[0].click();
                desctextall("Photo", 0);
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