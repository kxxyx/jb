var __SERVER = "47.111.31.150:8000";
var __IMEI = device.getIMEI();
if (!requestScreenCapture()) { alert("请求截图权限失败！"); exit(); }
function aip(tag, url, slp) {
    while (1) {
        var res = http.get(url);
        if (res.statusCode != 200) {
            toast("网络请求失败: " + res.statusCode + " " + res.statusMessage);
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
            tdclick("id", "ksad_end_close_btn")
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
        toast(p + "点击文字或id：" + code)
        var x, y;
        if (Number(p.centerX()) > 0) {
            x = Number(p.centerX());

        }
        if (Number(p.top) > 0) {
            y = Number(p.top)
        }

        click(x, y);
        sleep(800)
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

}
alert("Ee")
gid = 23
toastLog("查询是否有回复")
sleep(2000)
var img = captureScreen();
var point = images.findMultiColors(img, "#fe2c55",[[30,-1,"#ffffff"],[76,-11,"#ffffff"],[126,-12,"#ffffff"],[155,0,"#fe2c55"]], {
    region: [0, 400, 1080, 960]
});
if(point){
    click(point.x,point.y)
    sleep(1200)
}



