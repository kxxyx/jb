
function 番茄畅听登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        tdclick("t", "我是女生")
        tdclick("t", "以后再说")
        sleep(1000);
        if (text("我的").exists() || text("福利").exists()) {
            sleep(1000);
            if (text('登录领取').exists()) {
                tdclick("t", "登录领取")
                sleep(2500)
                var phoneurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getphone&imei=" + __IMEI;
                var __sfz = aip("[TASK]", phoneurl, 10);
                setText(0, __sfz.smname);
                sleep(2000)
                tdclick("t", "获取验证码")

                for (i = 0; i < 6; i++) {
                    sleep(8000);
                    if (text('输入验证码').exists()) {
                        toastLog("检查验证码并自动输入")
                        sleep(5000);
                        var assd = getsiss()
                        if (assd) {
                            assd = assd + "";
                            input(assd.substring(0, 1))
                            input(assd.substring(1, 2))
                            input(assd.substring(2, 3))
                            input(assd.substring(3, 4))
                        }
                    }
                }
                tdclick("t", "去听书")
                back()
            }
            sleep(1000);
            tdclick("t", "首页")
            break
        }
    }
}
function 番茄畅听() {

    loginapp(番茄畅听登录);
    while (1) {
        tdclick("t", "首页")
        sleep(2000)
        tdclick("t", "女生")
        sleep(2000)
        tdclick("t", random(1, 8))
        sleep(5000)
        if (text('全部播放').exists() || text('续播').exists()) {
            tdclick("t", "全部播放")
            tdclick("t", "续播")
            sleep(6800)
            tdclick("t", "订阅")
            break
        } else {
            loginapp(番茄畅听登录);
        }
    }

    sleep(1200);
    back()
    sleep(1200);
    back()
    sleep(1200);
    back()
    sleep(1200);

    tdclick("t", "福利")
    sleep(6000);
    if (textContains('看视频再领').exists()) {
        tdclick("tc", "看视频再领")
        cloasad()
    }
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);

    toast("去看视频广告")

    if (textContains('看视频赚金币').exists() && !textContains('已完成10/10').exists()) {

        var ttt = 1;

        while (1) {

            sleep(2000);
            if (textContains('已完成10/10').exists()) {
                break
            }
            if (textContains('看视频赚海量金币').exists()) {

                if (textContains('已完成10/10').exists()) {
                    break
                }
                tdclick("tc", "看视频赚海量金币")
                cloasad()
            }
            ttt = ttt + 1;
            if (ttt > 10) {
                break
            }
            sleep(2000);
            tdclick("t", "福利")
        }
    }

    sleep(2200);
    if (textContains('开宝箱').exists()) {
        tdclick("tc", "开宝箱")
        sleep(2000);
        tdclick("tc", "看视频")
        cloasad()
    }

    sleep(2000);
    back()
    sleep(2000);
    back()
    sleep(2000);
    back()
    tdclick("t", "我的")
    sleep(2000);

    if (text('提现').exists()) {

        var je = id("apg").findOne().text();
        if (je > 0) {
            ydmoneylog("现金金额:" + je)
        }
        tdclick("t", "提现")
        sleep(5000);
        tdclick("t", "1.00")
        tdclick("t", "15.00")
        sleep(8000);
        tdclick("t", "同意")
        sleep(2000);
        back()
        sleep(2000);
        back()
    }

    tdclick("t", "首页")
    sleep(2000);
    tdclick("id", "anc")


    while (1) {
        lineDown(10000, 20000)
        if (text('立即领取').exists() || text('领红包').exists()) {
            tdclick("t", "立即领取")
            sleep(1500)
            tdclick("t", "领红包")
            sleep(1500)
            if (textContains('看视频再领').exists()) {
                tdclick("tc", "看视频再领")
                sleep(1500)
                cloasad()
            }
        }
        if (text('免广告').exists()) {
            tdclick("t", "免广告")
            sleep(1500)
            cloasad()
        }
    }
}
function 七猫免费小说登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        tdclick("t", "继续")
        sleep(1000);
        tdclick("t", "随便看看")
        tdclick("id", "img_close_dialog")
        sleep(1000);
        if (text("我的").exists() || text("分类").exists()) {
            sleep(1000);
            tdclick("t", "我的")
            sleep(3000);
            if (text('点击登录').exists()) {

                tdclick("t", "点击登录")
                sleep(2500)
                tdclick("id", "iv_app_phone_user_police_select")
                sleep(1500)
                tdclick("t", "微信登录")
                sleep(10000)
                tdclick("t", "同意")
            }
            tdclick("t", "书城")
            break
        }
    }
}
function 七猫免费小说() {

    loginapp(七猫免费小说登录);
    tdclick("t", "我的")
    sleep(2000);
    if (text('金币提现').exists()) {
        var je = id("tv_coin_to_money").findOne().text()
        if (je) {
            ydmoneylog("当前号金额:" + je)
        }
        tdclick("t", "金币提现")
        sleep(6000);
        tdclick("tc", "提现1元")
        tdclick("tc", "提现10元")
        sleep(2000);
        back()
        sleep(200);
        back()
    }

    loginapp(七猫免费小说登录);
    tdclick("t", "我的")
    sleep(2000);
    tdclick("t", "福利中心")
    sleep(5000)
    if (textContains('看视频').exists()) {
        tdclick("tc", "看视频")
        cloasad()
    }
    sleep(2000);
    tdclick("t", "福利中心")
    sleep(2000);
    tdclick("t", "领红包")
    sleep(2000);
    tdclick("t", "明日再来")
    sleep(2000);
    tdclick("t", "福利中心")
    sleep(2000);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    if (text('去观看').exists()) {
        tdclick("t", "去观看")
        cloasad()
        tdclick("t", "可领取")
    }
    sleep(2000);
    tdclick("t", "福利中心")
    sleep(2000);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    tdclick("t", "去抽奖")
    sleep(5200);
    if (text('幸运大转盘').exists()) {
        for (i = 0; i < 5; i++) {
            sleep(2000);
            if (text('今日剩余抽奖次数：0').exists()) {
                break
            } else {
                click(Number(device.width / 2), Number(device.height / 2))
                sleep(8000);
                if (text('好的').exists()) {
                    tdclick("t", "好的")
                } else {
                    cloasad()
                    sleep(8000);
                    tdclick("t", "好的")
                }
            }
        }
    }


    while (1) {

        loginapp(七猫免费小说登录);
        toastLog("找书")
        tdclick("t", "分类")
        sleep(2000)
        tdclick("t", "女生")
        sleep(2000)
        tdclick("t", "推荐榜")
        sleep(2000)
        tdclick("t", random(4, 7))
        sleep(5000)
        if (text('立即免费阅读').exists()) {
            tdclick("t", "立即免费阅读")
            break
        }
    }

    while (1) {

        tdclick("t", "立即免费阅读")
        tdclick("t", "我知道了")
        tdclick("t", "点击/滑动可继续阅读")
        tdclick("id", "tv_description")
        lineDown(10000, 20000, "x")



    }
}
function 酷狗大字版登录() {

    while (1) {

        sleep(800);
        if (text('同意').exists()) {
            click('同意')
        }
        if (text('同意').exists()) {
            click('同意')
        }
        if (text('确定').exists()) {
            click('确定')
        }
        if (text('恭喜你').exists()) {
            back()
        }
        if (textContains('倒计时').exists()) {
            back()
        }
        if (text('我的').exists() && text('看点').exists()) {
            toastLog("进了首页,随机听歌");
            break;
        }
        sleep(800);
        tdclick("id", "f6z")
        sleep(800);
        tdclick("id", "eqy")
        sleep(800);
        tdclick("id", "eyq")
        sleep(800);
        tdclick("id", "ezx")
        sleep(800);
        if (textContains('求赞').exists()) {
            tdclick("id", "ezx")
        }
        sleep(800);
        if (textContains('开通会员').exists()) {
            tdclick("id", "gh0")
        }
        tdclick("t", "以后推荐")
    }
}
function 酷狗大字版() {

    loginapp(酷狗大字版登录);

    toastLog("去提现签到");

    tdclick("d", "我的")

    sleep(3200);
    if (text('提现').exists()) {
        click("提现");
    }
    sleep(5500);
    if (text('0.3元').exists()) {
        var sd = text('0.3元').findOne().bounds()
        click(sd.left, sd.top);
    }
    sleep(3000)
    if (text('确认提现').exists()) {
        click("确认提现");
        sleep(3000)
    }
    sleep(3000)
    if (text('去设置').exists()) {
        click("去设置");
    }
    if (text('2元').exists()) {
        var sd = text('2元').findOne().bounds()
        click(sd.left, sd.top);
    }
    sleep(3000)
    if (text('确认提现').exists()) {
        click("确认提现");
        back()
    }
    if (textContains('余额不足').exists()) {
        back()
    }
    loginapp(酷狗大字版登录);
    tdclick("d", "我的")

    sleep(1200);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);

    if (text('去签到').exists()) {
        click("去签到");
        sleep(2500);
        tdclick("t", "立即签到")
        sleep(2500);
        if (text('签到成功').exists()) {
            sleep(5000);
            back()
            sleep(1200);
            back()
            postlog("签到成功")
        }
    }

    for (i = 0; i < 5; i++) {

        loginapp(酷狗大字版登录);

        tdclick("d", "我的")
        sleep(1200);
        swipe(200, 1000, 200, 200, 800);
        sleep(2200);

        if (text('去赚钱').exists()) {

            for (dr = 0; dr < 3; dr++) {

                if (text('去赚钱').exists()) {

                    click("去赚钱");

                    cloasad()

                    sleep(5000)

                    back()

                    sleep(2000)
                    if (textContains("看完1个创意视频").exists()) {
                        back()
                    }
                    if (textContains("看视频再得").exists()) {
                        textContains("看视频再得").findOne().click()
                        cloasad()
                        sleep(5000);
                        back()
                    }
                }
                if (textContains("看完1个创意视频").exists()) {
                    back()
                }
                if (textContains("看视频再得").exists()) {
                    textContains("看视频再得").findOne().click()
                    cloasad()
                    sleep(5000);
                    back()
                }
            }
        }
        sleep(2000);
        if (textContains("看视频再得").exists()) {

            textContains("看视频再得").findOne().click()
            cloasad()
            sleep(5000)
            back()
        }
        sleep(2000);
        if (text('看点').exists()) {
            click("看点");
            sleep(4800);
            click("短视频");
            sleep(2000);
            for (is = 0; is < 30; is++) {
                lineDown(25000, 40000);
            }
        }
        sleep(2000);
        if (textContains('15/15').exists()) {
            postlog("看15个广告完成")
            break;
        }
    }

}
function 铃声汇登录() {

    while (1) {
        sleep(1000);

        tdclick("id", "close_img")

        if (text('同意并继续').exists()) {
            click("同意并继续");
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
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(600)
        if (textContains('点击就送').exists() || textContains('发红包').exists()) {
            tdclick("id", "go_now_text")
            sleep(3000);
            cloasad()
            sleep(3000);
            if (classNameContains("webkit.WebView").depth(6).exists()) {
                if (classNameContains("mageView").depth(4).drawingOrder(2).exists()) {
                    var srf = classNameContains("mageView").depth(4).drawingOrder(2).indexInParent(1).findOne().bounds();
                    if (srf) {
                        click(srf.left, srf.top)
                    }
                }
            }
            if (text('金币翻倍').exists()) {
                click("金币翻倍");
                cloasad()
            }
            sleep(2000);
            if (classNameContains("webkit.WebView").depth(6).exists()) {
                if (classNameContains("mageView").depth(4).drawingOrder(2).exists()) {
                    var srf = classNameContains("mageView").depth(4).drawingOrder(2).indexInParent(1).findOne().bounds();
                    if (srf) {
                        click(srf.left, srf.top)
                    }
                }
            }
            sleep(5000);
            if (textContains('恭喜获得').exists()) {
                tdclick("id", "bottom_fl_layout")
            }
        }
        tdclick("id", "iv_close")
        sleep(1000);

        if (text("铃声").exists()) {
            break
        }

    }
}
function 铃声汇() {

    loginapp(铃声汇登录);

    tdclick("t", "视频铃声")

    for (i = 0; i < 40; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频");
        sleep(600)
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(600)
        if (textContains('点击就送').exists() || textContains('发红包').exists() || id("go_now_text").exists()) {

            tdclick("id", "go_now_text")
            sleep(3000);
            cloasad()
            sleep(3000);
            if (classNameContains("webkit.WebView").depth(6).exists()) {
                if (classNameContains("mageView").depth(4).drawingOrder(2).exists()) {
                    var srf = classNameContains("mageView").depth(4).drawingOrder(2).indexInParent(1).findOne().bounds();
                    if (srf) {
                        click(srf.left, srf.top)
                    }
                }
            }
            if (text('金币翻倍').exists()) {
                click("金币翻倍");
                cloasad()
            }
            sleep(2000);
            if (classNameContains("webkit.WebView").depth(6).exists()) {
                if (classNameContains("mageView").depth(4).drawingOrder(2).exists()) {
                    var srf = classNameContains("mageView").depth(4).drawingOrder(2).indexInParent(1).findOne().bounds();
                    if (srf) {
                        click(srf.left, srf.top)
                    }
                }
            }
            sleep(5000);
            if (textContains('恭喜获得').exists()) {
                tdclick("id", "bottom_fl_layout")
            }
        }
        tdclick("id", "iv_close")
        back()
        sleep(2000)
        if (textContains("确认退出")) {
            sleep(2000)
            back()
        }
        if (i % 30 === 0) {
            loginapp(铃声汇登录);
            tdclick("t", "视频铃声")
        }

    }
    postlog("看视频60个完成")

    loginapp(铃声汇登录);
    sleep(2000)
    tdclick("id", "navigation_mine")
    tdclick("d", "我的")
    back()
    if (textContains("确认退出")) {
        sleep(2000)
        back()
    }
    sleep(1600)
    tdclick("t", "提现")
    sleep(3600)
    if (textContains('去绑定').exists()) {
        tdclick("t", "去绑定")
        sleep(10000)
        tdclick("t", "同意")
        sleep(5600)
    }
    tdclick("t", "每日可提")
    sleep(3600)

    tdclick("id", "read")
    sleep(1600)
    tdclick("t", "立刻提现")
    sleep(3000);
    cloasad()
    sleep(3000);
    tdclick("t", "提现秒到账")

}
function 铃声秀秀极速版() {
    铃声汇()
}
function 趣看天下登录() {

    while (1) {
        sleep(1000);
        if (text('同意').exists()) {
            click("同意");
        }
        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (text('始终允许').exists()) {
            click("始终允许");
        }
        if (text('允许').exists()) {
            click("允许");
        }
        if (id('image_svg_home_read_package').exists()) {
            tdclick("id", "image_svg_home_read_package")
            sleep(3500)
            tdclick("id", "login_wechat_login_bt")
            sleep(8500)
            if (text('同意').exists()) {
                click("同意");
            }
        }
        tdclick("id", "img_close")
        tdclick("id", "dialog_close_img")
        tdclick("id", "iv_cash_out")
        sleep(5000);
        tdclick("tc", "到微信")
        tdclick("tc", "忽略")
        if (text("我的").exists() || text("视频").exists()) {
            tdclick("t", "首页")
            sleep(1800)
            break
        }

    }
}
function 趣看天下() {

    loginapp(趣看天下登录)

    for (i = 0; i < 100; i++) {

        sleep(1800)
        var zxidl = id("title").find();
        if (zxidl.length > 0) {
            var zxzb = id("title").find().get(0).bounds();
            if (zxzb) {
                click(Number(zxzb.left + random(150, 200)), Number(zxzb.top));
                sleep(4000);
                if (textContains("评论").exists()) {

                    toastLog("第" + i + "个文章")

                    var zxxhl = 0;
                    while (1) {
                        sleep(1200);
                        lineDown(3500, 6000);
                        zxxhl = zxxhl + 1;
                        sleep(800);
                        if (id("iv_unfold_reading").exists()) {
                            var zxzb = id("iv_unfold_reading").findOne().bounds();
                            click(Number(zxzb.left + 300), Number(zxzb.top));
                            sleep(800);
                        }
                        tdclick("id", "img_close")
                        sleep(1500)
                        if (id("img_close_see_ad").exists()) {
                            var sfdf = id("img_close_see_ad").findOne().bounds();
                            if (sfdf) {
                                click(sfdf.left + 5, sfdf.top + 5)
                            }
                        }
                        if (zxxhl > 9) {
                            tdclick("id", "img_close")
                            back();
                            break;
                        }
                        sleep(1500)
                        if (text("发送").exists()) {
                            back()
                            lineDown(1500, 3000);
                        }
                    }

                } else {
                    tdclick("id", "img_close")
                    back()
                }
            }
        }
        while (1) {
            toast("Back to home page")
            sleep(1200);
            if (text("我的").exists() || text("视频").exists()) {
                sleep(1000)
                tdclick("t", "首页")
                break;
            } else {
                back();
                sleep(1000);
                lineDown(1500, 3000);
                sleep(2000);
                if (text("允许").exists()) {
                    click("允许")
                }
                sleep(600)
                if (text('以后再说').exists()) {
                    click("以后再说");
                    sleep(1500)
                }
            }
        }

        lineDown(1500, 3000);
        sleep(2000);

        if (i > 10) {
            if (text("领取").exists()) {
                tdclick("t", "领取")
                sleep(3000)
            }
        }
        sleep(1000)
        if (text("领金币").exists()) {
            tdclick("t", "领金币")
            sleep(3000)
        }
        sleep(1000)
        if (text("金币翻倍").exists()) {
            tdclick("t", "金币翻倍")
            sleep(3000)
            cloasad()
            sleep(4000)
        }
        tdclick("id", "img_close")

        if (i % 40 === 0) {
            loginapp(趣看天下登录);
            sleep(1200);
        }
    }

    postlog("资讯100个");

    loginapp(趣看天下登录)

    tdclick("t", "赚金币")
    sleep(2500)
    tdclick("t", "立即签到")
    sleep(2500)
    classNameContains("view.View").depth(9).drawingOrder(0).indexInParent(0).findOne().click();
    sleep(1500)

    tdclick("t", "提现0.3元")
    sleep(1500)
    if (text('去完成').exists()) {
        tdclick("t", "去完成")
        sleep(1500)
        cloasad()
    }


    loginapp(趣看天下登录)

    toastLog("去提现")

    if (text('我的').exists()) {
        tdclick("t", "我的")
        sleep(1500)
    }
    sleep(3000)
    if (text('提现兑换').exists()) {
        tdclick("t", "提现兑换")
        sleep(1500)
    }
    sleep(3500)
    if (text('去分享领取').exists()) {
        tdclick("t", "去分享领取")
        sleep(1500)
    }
    sleep(5000)
    tdclick("t", "立即提现")
    sleep(3000)
    tdclick("t", "确认提现")
    sleep(3000)
    postlog("提现成功");


    loginapp(趣看天下登录)

    tdclick("t", "视频")

    for (i = 0; i < 80; i++) {

        var sfdf = id("tv_author").findOne().bounds();
        if (sfdf) {
            click(sfdf.left + 250, sfdf.top)
            toastLog("第" + i + "个视频")
        }
        sleep(3000)
        var zxxhl = 0;
        while (1) {
            lineDown(35000, 50000);
            zxxhl = zxxhl + 1;
            if (zxxhl > 5) {
                back();
                break;
            }
            if (text("重播").exists()) {
                back();
                break;
            }
        }

        if (textContains("恭喜您获得").exists()) {
            sleep(1500)
            var sfdf = id("img_close_see_ad").findOne().bounds();
            if (sfdf) {
                click(sfdf.left + 5, sfdf.top + 5)
            }
            sleep(1500)
            tdclick("id", "img_close")
        }

    }
    postlog("视频80个");


}
function 爆米花视频登录() {
    while (1) {
        sleep(1000);
        if (text("同意并继续").exists()) {
            click("同意并继续");
        }
        if (text("立即更新").exists()) {
            click("立即更新");
        }
        if (text("拆红包").exists()) {
            var p = classNameContains("mageView").depth(5).drawingOrder(1).findOne().bounds();
            if (p) {
                click(p.centerX(), p.centerY());
            }
        }
        if (text("推荐").exists() && text("影视").exists()) {
            break;
        }
    }
}
function 爆米花视频() {

    loginapp(爆米花视频登录);

    if (text("拆红包").exists()) {
        var p = classNameContains("mageView").depth(5).drawingOrder(1).findOne().bounds();
        if (p) {
            click(p.centerX(), p.centerY());
        }
    }
    //进赚钱页面，自动弹出签到并看广告
    if (id("makeCoinTab").exists()) {
        var st = id("makeCoinTab").findOne().bounds();
        click(st.centerX(), st.centerY());
        sleep(5000);
    }
    if (textContains("已连续签到").exists()) {
        sleep(800);
        if (textContains("看视频").exists()) {
            var p = textContains("看视频").findOne().bounds();
            click(p.centerX(), p.centerY());
            cloasad()
        }
    }
    sleep(5000);
    if (text("开箱领金币").exists()) {
        var p = textContains("开箱领金币").findOne().bounds();
        click(p.centerX(), p.centerY());
        sleep(3000);
        if (text("恭喜获得").exists()) {
            if (textContains("看视频再领").exists()) {
                var p = textContains("看视频再领").findOne().bounds();
                click(p.centerX(), p.centerY());
                cloasad()
            }
        }
    }
    postlog("签到并开箱看视频")
    sleep(3000)
    while (1) {
        log("领金币")
        sleep(1200)
        if (text("领金币").exists()) {
            var p = textContains("领金币").findOne().bounds();
            click(p.centerX(), p.centerY());
            cloasad();
            sleep(3000);
            if (text("恭喜获得").exists()) {
                if (textContains("看视频").exists()) {
                    var p = textContains("看视频").findOne().bounds();
                    click(p.centerX(), p.centerY());
                    cloasad()
                }
            }
        } else {
            postlog("领取4个50的金币")
            break;
        }
    }

    while (1) {

        loginapp(爆米花视频登录);

        if (id("makeCoinTab").exists()) {
            var st = id("makeCoinTab").findOne().bounds();
            click(st.centerX(), st.centerY());
            sleep(5000);
        }

        if (text("全民偷金币").exists()) {
            click("全民偷金币");
        }
        sleep(4200);
        if (text("全民偷金币").exists() && textContains("位用户参与了偷金币").exists()) {
            sleep(2200);
            for (i = 0; i < 6; i++) {
                click("偷Ta", i);
                sleep(2900);
                if (text("观看视频").exists()) { click("观看视频"); cloasad(); }
            }
            sleep(2200);
            back();
            postlog("全民偷金币6次")
            break;
        }
    }

    while (1) {

        if (id("toutiaoTab").exists()) {

            var st = id("toutiaoTab").findOne().bounds();
            click(st.centerX(), st.centerY());
            sleep(5000);

            for (i = 0; i < 80; i++) {

                lineDown(15000, 30000);

                toastLog("第" + i + "个小视频");

                if (text("金蛋大奖").exists()) {

                }
                else {
                    if (id("ling_geted_num_tv").exists()) {

                    } else {
                        toast("有金蛋")
                        if (id("main_bottom_ling_view_fl").exists()) {
                            var p = id("main_bottom_ling_view_fl").findOne().bounds();
                            click(p.centerX(), p.centerY());
                            sleep(2000);
                            if (textContains("看视频再领").exists()) {
                                var p = textContains("看视频再领").findOne().bounds();
                                click(p.centerX(), p.centerY());
                                cloasad()
                            }
                        }
                    }
                }

                if (textContains("离开").exists()) {
                    back()
                }

                if (i % 40 === 0) {

                    loginapp(爆米花视频登录);
                    var p = id("icon").find();
                    var st = p[1].bounds();
                    click(st.centerX(), st.centerY());
                    sleep(5000);
                }
            }

            postlog("看视频80个完成")
            break;
        } else {
            loginapp(爆米花视频登录);
        }
    }

    while (1) {


        if (id("homeTab").exists()) {

            var st = id("homeTab").findOne().bounds();
            click(st.centerX(), st.centerY());
            sleep(5000);

            for (i = 0; i < 80; i++) {

                lineDown(15000, 30000);

                toastLog("第" + i + "个大视频");

                if (i % 40 === 0) {
                    loginapp(爆米花视频登录);
                }
            }
            postlog("看大视频80个完成")

            break;
        } else {

            loginapp(爆米花视频登录);
        }
    }



}
function 点点新闻登录() {
    while (1) {
        sleep(1000);
        if (text("同意").exists()) {
            click("同意");
        }
        sleep(1000);
        if (textContains("未登录").exists()) {
            textContains("未登录").findOne().click();
            sleep(1000);
            if (id("iv_login_wx").exists()) {
                var p = id("iv_login_wx").findOne().bounds();
                click(p.centerX(), p.centerY());
            }
            sleep(1000);
            if (text("微信一键登录").exists()) {
                click("微信一键登录");
            }
        }
        if (text("我的").exists()) {
            break;
        }
    }
}
function 点点新闻() {

    loginapp(点点新闻登录);


    for (i = 0; i < 70; i++) {

        var zxidl = id("tv_title").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            var dst = zxidl.get(0).text();
            if (dst.length > 10) {
                click(Number(zxzb.left + random(50, 100)), Number(zxzb.top));
                sleep(4000);
                if (id("tv_share").exists()) {
                    toast("第" + i + "个文章")

                    var zxxhl = 0;
                    while (1) {
                        sleep(1200);
                        if (textContains('来源').exists()) {
                            lineDown(1500, 3000);
                            zxxhl = zxxhl + 1;
                            sleep(800);
                            if (text("点击阅读全文").exists()) {
                                var zxzb = text("点击阅读全文").findOne().bounds();
                                click(Number(zxzb.left), Number(zxzb.top));
                                sleep(800);
                            }
                            if (zxxhl > 9) {
                                back();
                                break;
                            }
                        } else {
                            toast("是视频,观看30秒")
                            sleep(random(25000, 40000))
                            break
                        }
                    }
                } else {
                    toast("可能进了视频,直接返回")
                    while (1) {
                        sleep(1200);
                        if (text("资讯").exists() && text("我的").exists()) {
                            break;
                        } else {
                            back();
                            if (text('去领取').exists()) {
                                click("去领取");
                            }
                            sleep(1200);
                        }
                    }
                }
            } else {
                toast("是广告页面")
            }
        } else {
            while (1) {
                toast("没找到下滑")
                sleep(1200);
                if (text("资讯").exists() && text("我的").exists()) {
                    break;
                } else {
                    back();
                    if (text('去领取').exists()) {
                        click("去领取");
                    }

                }
            }
        }

        lineDown(1500, 3000);
        sleep(2000);

        tdclick("t", "去领取")

        if (i % 35 === 0) {
            loginapp(点点新闻登录);
            sleep(1200);
        }
    }
    postlog("看资讯70个完成")
    loginapp(点点新闻登录);
    //签到
    tdclick("t", "任务")
    sleep(5800);

    if (text('金币翻倍').exists()) {
        click("金币翻倍");
        cloasad()
        postlog("签到")
    }


    sleep(3800);
    loginapp(点点新闻登录);
    tdclick("t", "任务")
    toastLog("领取今日红包")
    var tssd = 0;
    while (1) {

        sleep(1800);
        if (text('领取今日红包').exists()) {
            toastLog("领取今日红包")
            click("领取今日红包");
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
            sleep(800);
            cloasad()
            sleep(1200);
        }
        sleep(1800);
        if (text('预约明日红包').exists()) {
            toastLog("预约明日红包")
            click("预约明日红包");
            cloasad()
            sleep(1200);
        }
        if (text('恭喜你获得福袋').exists()) {
            toastLog("获得福袋")
            click("恭喜你获得福袋");
            sleep(1200);
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
        if (textContains('福袋已拆完').exists()) {
            toast("福袋已拆完")
            break
        }
        if (text('明日领红包').exists()) {
            toast("福袋已拆完")
            break
        }
        toast(tssd)
        tssd = tssd + 1;
        if (tssd > 7) {
            break
        }
    }

    postlog("领取7个今日红包")

}
function 趣看点登录() {

    while (1) {
        sleep(1000);

        tdclick("id", "iv_close")
        sleep(1000);
        tdclick("id", "dialog_recommend_daily_dismiss")
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
        if (text("我的").exists() || text("首页").exists()) {

            tdclick("t", "我的")
            sleep(2000);
            if (text('立即登录').exists()) {
                sleep(1500)
                tdclick("d", "微信一键登录")
                sleep(10000)
                if (text('同意').exists()) {
                    click("同意");
                }
            }
            tdclick("t", "首页")
            break
        }

    }
}
function 趣看点() {

    loginapp(趣看点登录);

    tdclick("t", "首页")
    sleep(2000);

    for (i = 0; i < 80; i++) {

        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

        var zxidl = id("item_information_adapter_three_pic_title").find();
        if (zxidl.nonEmpty()) {

            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(100, 200)), Number(zxzb.top));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (textContains("关闭").exists()) {
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (id("header_information_read_all_btn").exists()) {
                        var ta = id("header_information_read_all_btn").findOne().bounds()
                        if (ta) {
                            click(ta.left + 200, ta.top)
                        }
                    }
                    tdclick("t", "继续阅读")
                    if (zxxhl > 9) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了视频,直接返回")
            }
        } else {
            loginapp(趣看点登录);
            tdclick("t", "首页")
        }
        tdclick("t", "继续阅读")
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

    }
    postlog("看资讯80个完成")

    loginapp(趣看点登录);

    tdclick("id", "activity_main_tab_video")
    sleep(2000);
    for (i = 0; i < 80; i++) {

        sleep(2000);
        var zxidl = id("item_video_fragment_adapter_view_number").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left), Number(zxzb.top - 100));
            sleep(4000);
            if (textContains("不喜欢").exists()) {
                var zxxhl = 0;
                while (1) {
                    sleep(800);
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    toast("第" + i + "个视频")
                    tdclick("t", "继续阅读")
                    if (zxxhl > 25) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        } else {
            loginapp(趣看点登录);
            tdclick("id", "tv_finactivity_main_tab_videod_tab")
        }
        tdclick("t", "继续阅读")
        sleep(2000);
        lineDown(1500, 3000);

    }
    postlog("看视频80个完成")

    loginapp(趣看点登录);

    tdclick("t", "任务")
    sleep(2000);
    tdclick("t", "立即签到签到")
    sleep(2000);
}
function 看玩登录() {

    while (1) {

        sleep(1000);
        if (text("首页").exists() || text("我的").exists()) {
            tdclick("t", "我的")
            sleep(3600)
            if (text("微信登录").exists()) {
                tdclick("id", "checkBox")
                sleep(1200)
                tdclick("t", "微信登录")
                sleep(7200)
                tdclick("t", "同意")
                sleep(3200)
            }
            tdclick("t", "首页")
            sleep(1600)
            break;
        }
    }
}
function 看玩() {

    loginapp(看玩登录);

    click("我的")
    sleep(5000)
    tdclick("id", "main_starlert_close")
    sleep(2000)
    tdclick("t", "钱包/提现")
    sleep(3000)
    tdclick("t", "提现")
    sleep(3000)
    click(500, device.height - 50)

    loginapp(看玩登录);

    for (i = 0; i < 80; i++) {
        var zxidl = id("item_artical_three_title_tv").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(150, 300)), Number(zxzb.top));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (text("返回").exists()) {
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    tdclick("t", "查看全文，奖励更多")
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
                if (text("推荐").exists() && text("我的").exists()) {
                    break;
                } else {
                    back();
                    sleep(1200);
                    tdclick("t", "忽略")
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (i % 40 === 0) {
            loginapp(聚看点登录);
        }
        tdclick("t", "忽略")

    }
    postlog("看资讯80个完成")

    loginapp(看玩登录);

    tdclick("id", "main_center_")

    for (i = 0; i < 80; i++) {

        lineDown(15000, 30000);
        toast("第" + i + "个视频");
        if (i % 40 === 0) {
            loginapp(看玩登录);
            tdclick("id", "main_center_")
        }
        tdclick("t", "忽略")
    }
    postlog("看视频80个完成")

    loginapp(看玩登录);
    //签到
    click("任务中心")
    sleep(1800);
    if (text('立 即 签 到').exists()) {
        var p = classNameContains("view.View").depth(4).text('立 即 签 到').findOne().bounds();
        click(p.left, p.top);
        sleep(1800);
    }
    click("任务中心")
    sleep(1800);
    if (textContains('已连续签到').exists()) {
        var p = classNameContains("view.View").textContains('已连续签到').findOne().text();
        if (p) {
            postlog(p)
        } else {
            postlog("签到成功")
        }
    }

}
function 如意天气登录() {

    while (1) {
        sleep(1000);

        tdclick("id", "iv_close")

        if (text('同意并继续').exists()) {
            click("同意并继续");
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
        if (text('微信登录').exists()) {
            sleep(1500)
            tdclick("t", "微信登录")
            sleep(10000)
            if (text('同意').exists()) {
                click("同意");
            }
        }
        if (text("首页").exists() || text("我的").exists()) {

            break
        }

    }
}
function 如意天气() {

    loginapp(看多多登录);

    sleep(2000);
    for (i = 0; i < 80; i++) {
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);
        var zxidl = id("aby").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(150, 300)), Number(zxzb.top));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (textContains("关注").exists()) {

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
            loginapp(看多多登录);
        }

        sleep(2000);
        lineDown(1500, 3000);


    }
    postlog("看资讯80个完成")

    loginapp(看多多登录);

    tdclick("t", "视频")
    sleep(2000);
    for (i = 0; i < 80; i++) {
        lineDown(1500, 3000);
        sleep(2000);
        var ta = text("关注").findOne().bounds()
        if (ta) {
            click(ta.left, ta.top - 100)
        }
        let delayTime = random(35000, 50000);
        sleep(delayTime);
        lineDown(1500, 3000);
        toastLog("第" + i + "个视频")
    }
    postlog("看视频80个完成")

}
function 淘点空间登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        sleep(1000);
        if (text('点击领取').exists()) {
            tdclick("t", "点击领取")
            sleep(3500)
            tdclick("t", "微信登录")
            sleep(6000)
            if (text('同意').exists()) {
                click("同意");
            }
        }
        if (text("个人中心").exists() || text("首页").exists()) {
            break
        }
    }
}
function 淘点空间() {

    loginapp(淘点空间登录);
    tdclick("t", "个人中心")
    sleep(2000);

    if (textContains('签到奖励').exists()) {
        tdclick("tc", "金币奖励")
        cloasad()
        sleep(2000);
        tdclick("id", "ivAwardBack")
    }

    if (text('个人中心').exists()) {
        sleep(2000);
        var xj = id("item_title_gold_about").findOne().text();
        ydmoneylog("金币:" + xj);
        tdclick("t", "提现")
        sleep(3000);
        tdclick("t", "立即提现")

        if (text("0.3元").exists()) {
            tdclick("t", "10元")
        } else if (text("10元").exists()) {
            tdclick("t", "10元")
        }
        sleep(1000);
        tdclick("t", "立即提现")

    }

    loginapp(抖米快讯登录);

    tdclick("t", "任务")
    sleep(2000);
    tdclick("t", "立即签到")
    if (textContains("视频").exists()) {
        tdclick("tc", "视频")
        cloasad()
        tdclick("id", "iv_close")
    }
    sleep(2000);


    loginapp(抖米快讯登录);
    sleep(2000);
    for (i = 0; i < 100; i++) {

        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

        var zxidl = id("item_basic_style_button_menu_discuss").find();

        if (zxidl.nonEmpty()) {

            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(200, 300)), Number(zxzb.top - 150));
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
            sleep(1000);
            if (text("我的").exists() || text("任务").exists()) {
                break
            } else {
                back()
                tdclick("t", "继续阅读")
                tdclick("id", "iv_close")
            }
        }

        tdclick("t", "继续阅读")
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);

    }

    postlog("看资讯100个完成")

    loginapp(抖米快讯登录);

    tdclick("t", "视频")

    sleep(2000);

    for (i = 0; i < 50; i++) {

        var zxidl = id("ic_like").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.findOne().bounds();
            click(Number(zxzb.left), Number(zxzb.top - 80));
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
        } else {
            loginapp(抖米快讯登录);
            tdclick("t", "视频")
        }
        sleep(2000);
        lineDown(1500, 3000);

    }
    postlog("看视频50个完成")


}
function 闪电盒子登录() {

    while (1) {

        sleep(800);
        if (text("头条资讯").exists() && text("首页").exists() && text("我的").exists()) {
            break;
        }
        if (textContains("查看更多可领取红包").exists()) {
            textContains("查看更多可领取红包").findOne().click()
        }
        if (text("我知道了").exists()) {
            click("我知道了");
        }
        tdclick("t", "首页")
        sleep(1200)
        tdclick("t", "登录已有账号")
        sleep(1200)
        tdclick("t", "微信一键登录")
        sleep(1200)
        tdclick("t", "继续观看")
        sleep(600)
        if (textContains("有效阅读").exists() || descContains("有效阅读").exists()) {
            sleep(800);
            back()
        }
        sleep(800);
        if (text("确定").exists() && textContains("看视频辛苦了").exists()) {
            tdclick("t", "确定")
        }
    }
}
function 闪电盒子() {

    loginapp(闪电盒子登录);

    tdclick("t", "提现")
    sleep(5000)
    tdclick("t", "兑换现金")
    sleep(3000)
    tdclick("t", "确定")
    sleep(3000)
    tdclick("t", "提现")
    sleep(5000)
    tdclick("t", "1元")
    sleep(4000);
    tdclick("t", "立即提现")
    sleep(4000)
    tdclick("t", "提现到微信")
    sleep(4000)
    setText("涂国伟")
    back();
    sleep(800)
    tdclick("t", "确认提现")
    sleep(4000)

    loginapp(闪电盒子登录);

    if (text("头条资讯").exists() && text("玩一玩").exists()) {
        var sds = text("头条资讯").find()
        if (sds.length > 1) {
            click("头条资讯", sds.length - 1)
        } else {
            click("头条资讯")
        }
    }
    var kldstdzx = 1;

    while (1) {

        sleep(800);

        var zxidl = classNameContains("TextView").depth(14).drawingOrder(2).find();

        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            toast("找到资讯")
            click(Number(zxzb.left + random(260, 330)), Number(zxzb.top));
            sleep(4000);

            if (text("提现").exists()) {

                kldstdzx = kldstdzx + 1;
                toastLog("已看" + kldstdzx + "条资讯");
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (zxxhl > 15) {
                        while (1) {
                            toast("返回返回头条资讯栏目")
                            sleep(1600);
                            if (text("头条资讯").exists() && text("提现").exists() && textContains("元").exists()) {
                                toast("返回头条资讯栏目成功")
                                break;
                            } else {
                                back();
                                sleep(1200);
                            }
                        }
                        break;
                    }
                }

            } else {

                while (1) {
                    toast("返回返回头条资讯栏目")
                    sleep(1600);
                    if (text("头条资讯").exists() && text("提现").exists() && textContains("元").exists()) {
                        toast("返回头条资讯栏目成功")
                        break;
                    } else {
                        back();
                        sleep(1200);
                    }
                }
            }
        }

        lineDown(1500, 3000);

        if (text("继续观看").exists()) {
            click("继续观看");
        }
        sleep(600)
        if (textContains("有效阅读").exists() || descContains("有效阅读").exists()) {
            sleep(800);
            back()
        }
        sleep(800);
        if (text("确定").exists() && textContains("看视频辛苦了").exists()) {
            click("确定");
        }

        if (Number(kldstdzx) % 15 === 0) {
            back()
            toast("重新登录")
            loginapp(闪电盒子登录);

            if (text("头条资讯").exists() && text("玩一玩").exists()) {
                var sds = text("头条资讯").find()
                if (sds.length > 1) {
                    click("头条资讯", sds.length - 1)
                } else {
                    click("头条资讯")
                }
            }
        }
        if (kldstdzx > 70) {
            postlog("看头条资讯70个完成超级红包120个");
            break
        }
    }

    log("看小视频大红包");

    loginapp(闪电盒子登录);

    while (1) {
        sleep(1200);
        if (text("头条资讯").exists() && text("玩一玩").exists() && text("提现").exists()) {

            click("小视频");
            sleep(5000);

            if (desc("推荐").exists() && desc("关注").exists()) {

                sleep(2000);
                for (i = 0; i < 70; i++) {

                    lineDown(15000, 30000);

                    if (text("继续观看").exists()) {
                        click("继续观看");
                    }
                    sleep(600)
                    if (textContains("有效阅读").exists() || descContains("有效阅读").exists()) {
                        sleep(800);
                        back()
                    }
                    sleep(800);
                    if (text("确定").exists() && textContains("看视频辛苦了").exists()) {
                        click("确定");
                    }
                }
                postlog("看了半小时小视频70次");
                break;
            } else {
                back();
            }
        }
    }


}
function 全民喝水登录() {
    while (1) {
        sleep(1000);
        if (text("全民喝水").exists() || text("提现").exists()) {
            break;
        }
        if (text("同意并继续").exists()) {
            click("同意并继续")
        }
        if (text("否").exists()) {
            tdclick("t", "否")
        }
        if (text("新人红包").exists()) {
            click("直接领取")
            sleep(2000)
            if (text("开始赚金币").exists()) {
                click("开始赚金币")
                sleep(2000)
            }
        }
        if (textContains("领取").exists()) {

            tdclick("tc", "领取")
            cloasad();
            sleep(5000);
            tdclick("tc", "领取")

        }
    }
}
function 全民喝水() {

    loginapp(全民喝水登录);
    sleep(2000)
    if (text('提现').exists()) {
        var xj = id("aku").findOne().text();
        ydmoneylog("金币:" + xj + "除10000实际金额");
    }
    tdclick("tc", "提现")
    sleep(6000)
    tdclick("t", "0.3元")
    sleep(2000)
    tdclick("t", "立即提现")
    sleep(2000)
    tdclick("t", "确认并提交")
    sleep(2000)
    tdclick("tc", "提交")

    loginapp(全民喝水登录);

    for (i = 0; i < 10; i++) {
        sleep(2000)
        if (text("喝水领红包").exists()) {
            var p = text("喝水领红包").findOne().bounds();
            click(p.left + 250, p.top + 50);
        }
        if (text("喝水领金币").exists()) {
            var p = text("喝水领金币").findOne().bounds();
            click(p.left + 250, p.top + 50);
        }
        sleep(6900);
        if (text("看视频领双倍金币").exists()) {
            click("看视频领双倍金币");
            cloasad();
        }
        if (textContains("看视频领取").exists()) {
            var zxzb = textContains("看视频领取").findOne().bounds();
            click(zxzb.centerX(), zxzb.centerY() + 100);
            cloasad();
            sleep(2900);
            if (text("继续赚钱").exists()) {
                click("继续赚钱")
            }
        }
        if (text("看视频领红包").exists()) {
            click("看视频领红包");
            cloasad();
        }
        if (text("领取红包").exists()) {
            tdclick("t", "领取红包")
            cloasad();
        }
        if (text("去抽奖").exists()) {
            back()
        }
        sleep(2000)
        if (text("金币翻倍").exists()) {
            click("金币翻倍");
            cloasad();
            sleep(5000);
            tdclick("t", "继续领金币")
        }
        sleep(2000)
        if (textContains("翻倍").exists()) {
            var zxzb = textContains("翻倍").findOne().bounds();
            click(zxzb.left + 100, zxzb.top + 10);
            cloasad();
        }
        if (text("明天再来").exists()) {
            break;
        }
        if (text("今天喝够啦").exists()) {
            break;
        }
        sleep(4900);
        if (text("继续赚钱").exists()) {
            click("继续赚钱")
        }
        toastLog("去喝" + i + "次水")
    }

    postlog("喝水10次完成");

    loginapp(全民喝水登录);

    sleep(2000)

    tdclick("t", "攒金币")
    tdclick("t", "签到")

    sleep(6000)
    if (text("立即领取").exists()) {
        click("立即领取");
        sleep(2000)
        if (text("领红包").exists()) {
            back()
        } else {
            cloasad();
            sleep(5000);
            tdclick("t", "继续领金币")
        }
    }
    sleep(5000);
    if (text("金币翻倍").exists()) {
        click("金币翻倍");
        cloasad();
        sleep(5000);
        tdclick("t", "继续领金币")
    }
    sleep(5000);
    tdclick("t", "继续领金币")

    for (i = 0; i < 3; i++) {

        toastLog("领取")
        tdclick("t", "攒金币")
        tdclick("t", "签到")
        sleep(6000)
        if (text("领取").exists()) {

            tdclick("t", "领取")
            cloasad();
            sleep(5000);
            tdclick("t", "继续领金币")
            tdclick("t", "收下金币")
            tdclick("t", "继续加油")

        } else {
            break
        }

    }

    sleep(8000);
    swipe(400, 1000, 400, 300, 800);
    sleep(2000);

    for (i = 0; i < 10; i++) {

        tdclick("t", "攒金币")
        tdclick("t", "签到")
        sleep(4000);
        toastLog("600欢乐金币包" + i + "次")

        var sdfr = desc("立即领取").find()
        if (sdfr.length > 1) {
            var zxzb = desc("立即领取").find().get(sdfr.length - 1).bounds();
            if (zxzb != null) {
                click(zxzb.centerX(), zxzb.centerY());
            }
        }
        var sdfr = text("立即领取").find()
        if (sdfr.length > 1) {
            var zxzb = text("立即领取").find().get(sdfr.length - 1).bounds();
            if (zxzb != null) {
                click(zxzb.centerX(), zxzb.centerY());
            }
        }
        sleep(800);
        cloasad();
        sleep(5000);
        tdclick("t", "继续领金币")
        sleep(800)
        tdclick("t", "收下金币")
        sleep(800)
        tdclick("t", "继续加油")

        isapplunch()

    }
    postlog("600+欢乐金币包完成");

    toastLog("小额提现券")

    for (i = 0; i < 3; i++) {

        tdclick("t", "攒金币")
        tdclick("t", "签到")
        sleep(4000);
        toastLog("小额提现券")

        var sdfr = desc("立即领取").find()
        if (sdfr.length > 1) {
            var zxzb = desc("立即领取").find().get(1).bounds();
            if (zxzb != null) {
                click(zxzb.centerX(), zxzb.centerY());
            }
        }
        var sdfr = text("立即领取").find()
        if (sdfr.length > 1) {
            var zxzb = text("立即领取").find().get(1).bounds();
            if (zxzb != null) {
                click(zxzb.centerX(), zxzb.centerY());
            }
        }
        sleep(800);
        cloasad();
        sleep(5000);

        tdclick("t", "继续领金币")
        tdclick("t", "收下金币")
        tdclick("t", "继续加油")

    }
    postlog("领取3次提现卷");


    loginapp(全民喝水登录);
    sleep(4000);
    if (text("大转盘").exists()) {

        sleep(4000);
        tdclick("t", "大转盘")
        sleep(4000);

        var dq = 1;

        while (1) {

            sleep(2200)
            if (text("30/30").exists()) {
                toastLog("30个红包转盘已完成");
                break
            }
            sleep(2200)
            if (text('领红包').exists()) {
                var zxzb = text("领红包").findOne().bounds();
                if (zxzb != null) {
                    click(zxzb.left + 20, zxzb.top + 10);
                    toastLog("领取第" + dq + "个红包转盘");
                    dq = dq + 1;
                }
            }
            sleep(8000)

            if (textContains("看视频领取").exists() && text("可提现").exists()) {
                while (1) {
                    sleep(2200)
                    if (textContains("看视频领取").exists() && text("可提现").exists()) {
                        var zxzb = textContains("看视频领取").findOne().bounds();
                        if (zxzb != null) {
                            click(zxzb.left + 50, zxzb.top + 150);
                            cloasad()
                        }
                    } else {
                        break
                    }
                }

            }
            sleep(2200)
            if (textContains("看视频领取").exists()) {
                while (1) {
                    sleep(2200)
                    if (textContains("看视频领取").exists()) {
                        var zxzb = textContains("看视频领取").findOne().bounds();
                        if (zxzb != null) {
                            click(zxzb.left + 100, zxzb.top - 200);
                            cloasad()
                        }
                    } else {
                        break
                    }
                }
            }
            sleep(2200)
            if (textContains("看视频").exists()) {
                var zxzb = textContains("看视频").findOne().bounds();
                if (zxzb != null) {
                    click(zxzb.left, zxzb.top);
                    cloasad()
                }
            }
            sleep(5000);
            if (!text('领红包').exists()) {
                back()
            }
            tdclick("t", "继续领金币")
            tdclick("t", "收下金币")
            tdclick("t", "继续加油")
            tdclick("t", "继续赚钱")

            if (text("30/30").exists()) {
                toastLog("30个红包转盘完成");
                break
            }

        }

        sleep(3000);
        swipe(400, 1000, 400, 300, 800);

        while (1) {

            sleep(3000);
            if (text("待领取").exists()) {

                var zxzb = text("待领取").findOne().bounds();
                if (zxzb != null) {
                    click(zxzb.left + 30, zxzb.top - 35);
                    toastLog("待领取");
                }
                sleep(7000)

                if (textContains("看视频领取").exists() && text("可提现").exists()) {
                    while (1) {
                        sleep(2200)
                        if (textContains("看视频领取").exists() && text("可提现").exists()) {
                            var zxzb = textContains("看视频领取").findOne().bounds();
                            if (zxzb != null) {
                                click(zxzb.left + 50, zxzb.top + 150);
                                cloasad()
                            }
                        } else {
                            break
                        }
                    }

                }
                sleep(2200)
                if (textContains("看视频领取").exists()) {
                    while (1) {
                        sleep(2200)
                        if (textContains("看视频领取").exists()) {
                            var zxzb = textContains("看视频领取").findOne().bounds();
                            if (zxzb != null) {
                                click(zxzb.left + 100, zxzb.top - 200);
                                cloasad()
                            }
                        } else {
                            break
                        }
                    }
                }
                sleep(2200)
                if (textContains("看视频").exists()) {
                    var zxzb = textContains("看视频").findOne().bounds();
                    if (zxzb != null) {
                        click(zxzb.left, zxzb.top);
                        cloasad()
                    }
                }
                sleep(5000);
                tdclick("t", "继续领金币")
                tdclick("t", "收下金币")
                tdclick("t", "继续加油")
                tdclick("t", "继续赚钱")

            } else {
                break
            }
        }
        postlog("领取30转盘加红包");

        back();
    }



}
function 快手极速版登录() {

    while (1) {

        sleep(800);
        if (text('我知道了').exists()) {
            click("我知道了");
        }
        if (textContains('同意并继续').exists()) {
            var p = textContains('同意并继续').findOne().bounds();
            click(p.centerX(), p.centerY());
        }
        if (textContains('同意').exists()) {
            var p = textContains('同意').findOne().bounds();
            click(p.centerX(), p.centerY());
        }
        if (text('以后再说').exists()) {
            click("以后再说");
        }
        if (text("分享").exists()) {

            if (id("login_text").exists()) {
                var p = id("login_text").findOne().bounds();
                click(p.centerX(), p.centerY());
                sleep(2000)
                if (text('微信登录').exists()) {
                    click("微信登录");
                    sleep(6000)
                }
                if (text('一键登录').exists()) {
                    click("一键登录");
                    sleep(6000)
                }
            }
            break;
        }
    }
}
function 快手极速版() {

    loginapp(快手极速版登录);
    sleep(2000)
    tdclick("id", "left_btn")
    sleep(2000)
    tdclick("id", "setting_tv")
    sleep(2000)
    tdclick("t", "清除缓存")
    sleep(4000)

    loginapp(快手极速版登录);

    if (id("redFloat").exists()) {

        var p = id("redFloat").findOne().bounds();
        click(p.centerX(), p.centerY());
        sleep(4000);
        if (textContains('邀请更多好友').exists()) {
            var sd = textContains('邀请更多好友').findOne().bounds()
            click(sd.left + 120, sd.top);
            sleep(4000);
            back();
        }

        sleep(1000);
        if (text('立即签到').exists()) {
            tdclick("t", "立即签到")
            sleep(2000);
            tdclick("t", "打开签到提醒")
            sleep(3000);
            tdclick("t", "允许")
            tdclick("t", "始终允许")
        }
        tdclick("t", "我的收益")
        sleep(3000);

        var p = classNameContains("view.View").find()
        for (i = 0; i < p.length; i++) {
            var s = p.get(i).text()
            if (s) {
                if (s == "金币收益") {
                    var je = Number(p.get(i + 2).text());
                    if (je > 0) {
                        ydmoneylog("当前号金额:" + je)
                        break
                    }
                }
            }
        }
        sleep(2000);
        tdclick("t", "金币收益")
        sleep(5000);
        tdclick("t", "领现金")
        sleep(8000);

        if (text('0.30').exists()) {
            var sd = text('0.30').findOne().bounds()
            click(sd.left, sd.top);
            sleep(3000)
        } else {
            tdclick("t", "3元")
        }
        sleep(2000)
        if (text('立即领取').exists()) {
            click('立即领取')
        }
        if (text('确认提现').exists()) {
            click('确认提现')
        }
        sleep(2000)
        tdclick("t", "立即提现")
        sleep(5000)
        tdclick("t", "提取")
        sleep(2000)
        if (textContains("余额不足").exists()) {
            if (text('知道了').exists()) {
                var sd = text('知道了').findOne().bounds()
                click(sd.left, sd.top);
            }
        }
        if (textContains("明天再来").exists()) {
            back()
        }
        back()
        back()
    }

    loginapp(快手极速版登录);

    var jdsl = 0;

    while (true) {

        sleep(1000);
        tdclick("id", "general_list_close")

        lineDown(15000, 30000);

        toastLog("看第" + jdsl + "个视频")

        jdsl = jdsl + 1;

        if (jdsl % 40 === 0) {

            if (id("redFloat").exists()) {

                var p = id("redFloat").findOne().bounds();
                click(p.centerX(), p.centerY());
                sleep(8000)

                if (text("签到成功").exists()) {
                    tdclick("t", "立即签到")
                    postlog("签到成功");
                    sleep(5000)
                    if (textContains("看广告").exists()) {
                        var zxzb = textContains("看广告").findOne().bounds();
                        click(Number(zxzb.left), Number(zxzb.top));
                        cloasad()
                    }
                }

                var p = null;
                if (device.height == 1280) {
                    p = images.findMultiColors(captureScreen(), "#FEAF6B", [[-30, 56, "#FB4586"], [-9, 64, "#FFFFFF"]], {
                    });
                }
                if (device.height == 1920) {
                    p = images.findMultiColors(captureScreen(), "#FFB876", [[-47, 86, "#FB4484"], [123, 104, "#FFFBFF"]], {
                    });
                }
                if (p) {
                    toast("找到宝箱，坐标为(" + p.x + ", " + p.y + ")");
                    click(p.x, p.y);
                    sleep(4000)
                    if (textContains("看精彩视频").exists()) {
                        tdclick("tc", "看精彩视频")
                        cloasad()
                        sleep(2000)
                    }
                }
                sleep(1000);
                swipe(200, device.height - 500, 200, 200, 800);
                sleep(2200);
                if (text('福利').exists()) {
                    var ppp = 1
                    while (1) {
                        if (ppp > 10) {
                            break
                        }
                        if (text('福利').exists()) {
                            ppp = ppp + 1
                            tdclick("tc", "金币悬赏任务")
                            cloasad()
                            sleep(2000)
                        } else {
                            break;
                        }
                    }
                }
                back()

                loginapp(快手极速版登录);
            }
        }
        if (text('继续看视频').exists()) {
            click("继续看视频");
        }
        if (jdsl > 200) {
            postlog("看视频200个完成");
            break;
        }
    }

}
function 趣头条登录() {

    while (1) {

        sleep(1000);
        if (text("同意").exists()) {
            click("同意")
        }
        if (text("暂不更新").exists()) {
            click("暂不更新")
        }
        if (text("同意去开启").exists()) {
            click("同意去开启")
        }

        tdclick("id", "p")

        tdclick("id", "afq")

        if (text("我的").exists() && text("任务").exists()) {

            if (text("头条").exists()) {
                click("我的")
                sleep(1000);
                if (text("微信一键登录").exists()) {
                    var p = textContains("阅读并同意").find();
                    p = p[1].bounds();
                    click(p.left, p.top);
                    click("微信一键登录")
                    sleep(1000);
                }
            }
            break;
        } else {
            if (classNameContains("mageView").depth(1).drawingOrder(3).exists()) {
                var p = classNameContains("mageView").depth(1).drawingOrder(3).findOne().bounds();
                click(p.left, p.top);
                sleep(2000)
            }
            if (classNameContains("mageView").depth(4).drawingOrder(3).exists()) {
                var p = classNameContains("mageView").depth(4).drawingOrder(3).findOne().bounds();
                click(p.left, p.top);
                sleep(2000)
            }

        }
    }
}
function 趣头条() {

    loginapp(趣头条登录);
    sleep(1000);
    click("我的")
    sleep(4800);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    tdclick("t", "设置")
    sleep(2200);
    tdclick("t", "清除缓存")
    sleep(2200);
    back()
    sleep(1200);
    back()
    sleep(1200);

    //签到
    tdclick("t", "任务")
    sleep(4800);
    tdclick("t", "我知道了")
    sleep(4800);
    if (text('广告').exists()) {
        var p = classNameContains("mageView").id('afs').findOne().bounds();
        if (p) {
            click(p.centerX(), p.centerY());
        }
        back()
    }
    sleep(4800);
    if (text('签到成功').exists()) {
        tdclick("id", "wl")
        cloasad()
    }

    sleep(2000);
    loginapp(趣头条登录);

    sleep(1000);
    click("我的")
    sleep(4800);
    tdclick("id", "afq")
    sleep(2800);
    if (text('提现兑换').exists()) {
        var sd = text('提现兑换').findOne().bounds()
        click(sd.left, sd.top);
    }
    sleep(8000);
    if (text('提现兑换').exists()) {
        var xj = id("price_number").findOne().text();
        ydmoneylog("金币:" + xj + "除10000实际金额");
    }
    if (text('微信').exists()) {
        var sd = text('微信').findOne().bounds()
        click(sd.left, sd.top);
    }
    sleep(2000);
    if (text('1元').exists()) {
        var sd = text('1元').findOne().bounds()
        click(sd.left, sd.top);
        sleep(3000)
    }
    if (text('立即提现').exists()) {
        var sd = text('立即提现').findOne().bounds()
        click(sd.left + 100, sd.top + 5);
    }

    sleep(2000);
    loginapp(趣头条登录);

    tdclick("t", "头条")

    tdclick("t", "刷新")

    for (i = 0; i < 50; i++) {

        var zxidl = textContains("评论").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            if (zxzb) {
                click(Number(zxzb.left), Number(zxzb.top - 100));
                sleep(6000);
                toastLog("第" + i + "个文章")
                var zxxhl = 0;
                while (1) {

                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    if (zxxhl > 9) {
                        back();
                        break;
                    }
                    if (classNameContains("view.View").depth(5).exists()) {
                        var iiis = classNameContains("view.View").depth(5).find().length
                        if (iiis > 1) {
                            var p = classNameContains("view.View").depth(5).find().get(1).bounds();
                            click(p.centerX(), p.centerY());
                            sleep(3600)
                            back()
                        }
                    }
                }
            }
        } else {
            while (1) {
                sleep(1200);
                if (text("刷新").exists() && text("我的").exists()) {
                    break;
                } else {
                    back();
                    sleep(1000);
                    tdclick("t", "头条")
                    tdclick("t", "刷新")
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (text("领取").exists()) {
            click("领取")
        }

    }
    postlog("看资讯50个完成")

    loginapp(趣头条登录);

    toastLog("看小视频")

    if (text("小视频").exists()) {
        var sdf = text("小视频").find();
        if (sdf.length > 0) {
            click("小视频", sdf.length - 1)
        }
    }
    for (i = 0; i < 40; i++) {

        lineDown(15000, 30000);

        if (classNameContains("view.View").depth(4).exists()) {
            var iiis = classNameContains("view.View").depth(4).find().length
            if (iiis > 1) {
                var p = classNameContains("view.View").depth(4).find().get(1).bounds();
                click(p.centerX(), p.centerY());
                sleep(3600)
                back()
            }
        }
        toastLog("第" + i + "个视频");

    }

    stopapp(packagename);

    loginapp(趣头条登录);

    click("任务")
    sleep(4800);
    if (text('最高').exists()) {
        var p = text('最高').findOne().bounds();
        click(p.left, p.top);
        cloasad()
    }
    if (textContains('看视频').exists()) {
        var p = textContains('看视频').findOne().bounds();
        click(p.left, p.top);
        cloasad()
    }
    if (id('bee').exists()) {
        var p = id('bee').findOne().bounds();
        click(p.left, p.top);
        sleep(3800);
    }
    if (text('金币领取成功').exists()) {
        var p = text('金币领取成功').findOne().bounds();
        click(p.left, 840);
        click(p.left, 840);
        cloasad()
    }
    while (1) {
        sleep(1800);
        if (textContains('看视频').exists()) {
            var p = textContains('看视频').findOne().bounds();
            click(p.left, p.top);
            cloasad()
        } else {
            break
        }
    }




}
function 映客极速版登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        tdclick("id", "close_view")
        tdclick("id", "iv_delete")
        sleep(1000);
        if (text('微信登录').exists()) {
            tdclick("t", "微信登录")
            sleep(3000)
            if (text('同意').exists()) {
                click("同意");
            }
        }
        tdclick("t", "我知道了")
        sleep(2000)
        if (id('cm0').exists()) {
            tdclick("id", "cm0")
            sleep(5000)
            if (text('立即签到领现金').exists()) {
                tdclick("t", "立即签到领现金")
                cloasad()
                tdclick("t", "取消")
                sleep(2000)
                if (textContains('完成观看').exists()) {
                    back();
                }
                sleep(4000)
                if (text('看视频金币翻倍').exists()) {
                    tdclick("t", "看视频金币翻倍")
                    cloasad()
                    tdclick("id", "brj")
                }
            }
            if (text('签到领520').exists()) {
                back();
            }
        }
        sleep(2000)
        if (id('cps').exists()) {

            tdclick("id", "cps")
            var sff = 0;
            while (1) {

                sleep(5000)

                if (text('天天领红包').exists()) {

                    tdclick("t", "看视频解冻红包")
                    sff = sff + 1;
                    cloasad()
                    sleep(2000)
                    if (textContains('完成').exists()) {
                        back();
                    }
                    sleep(2000)
                    if (textContains('继续解冻').exists()) {
                        back();
                    }

                } else {

                    back()
                }

                if (sff > 6) {

                    back();

                    break;
                }
            }
        }
        if (text("更多频道").exists() || text("音乐").exists()) {
            break
        }
    }
}
function 映客极速版() {

    loginapp(映客极速版登录);

    click(Number(device.width / 2), device.height - 50)
    sleep(6000);
    tdclick("id", "ar3")
    sleep(2000);
    click(Number(device.width / 2), device.height - 50)
    sleep(6000);
    if (id('lite-task-activity').exists()) {
        tdclick("id", "lite-task-activity")
        back();
        sleep(2000);
        back();
        sleep(2000);
    }
    sleep(2000);
    click(Number(device.width / 2), device.height - 50)
    if (text('提现').exists()) {

        sleep(2000);
        if (text('领金币').exists()) {

            tdclick("t", "领金币")
            cloasad()
            sleep(2000)
            if (textContains('完成').exists()) {
                back();
            }
            sleep(4000)
            if (text('看视频金币翻倍').exists()) {
                tdclick("t", "看视频金币翻倍")
                cloasad()
                tdclick("id", "brj")
            }
        }

        if (text('提现').exists()) {

        } else {
            click(Number(device.width / 2), device.height - 50)
        }
        tdclick("t", "提现")
        sleep(6000);
        tdclick("id", "tt_insert_dislike_icon_img")
        sleep(1000);
        tdclick("t", "立即提现")
        sleep(4000);
        if (text('账户确认').exists()) {
            var sr = text('账户确认').findOne().bounds()
            if (sr) {
                click(sr.centerX(), sr.centerY() + 150)
                cloasad()
            }
        }
    }

    while (1) {

        loginapp(映客极速版登录);
        toast("去直播间")
        sleep(2000);
        tdclick("t", "直播")
        sleep(2000);
        tdclick("tc", "人在看")
        sleep(8000);
        if (text('关注').exists()) {
            break
        }
        sleep(2000);
        if (textContains('您的账号可能存在风险').exists()) {
            tdclick("t", "确定")

        }
    }

    for (i = 0; i < 60; i++) {

        lineDown(15000, 30000);

        var z = 互动("关注")
        if (z) {
            tdclick("t", "关注")
        }

        tdclick("t", "小帅哥")
        tdclick("t", "太美啦")
        tdclick("t", "好漂亮")
        tdclick("id", "b2j")

        sleep(2000)
        if (id('cps').exists()) {
            click(18, device.height - 20)
        }
        sleep(2000)
        if (text('直播已结束').exists()) {
            lineDown(1500, 3000);
        }
        tdclick("t", "关注并回戳")

        sleep(2000);
        if (textContains('您的账号可能存在风险').exists()) {
            tdclick("t", "确定")
            toastLog("您的账号可能存在风险，不玩这个app了")
            break
        }
    }

    postlog("看视频60个完成")


}
function 红云视频极速版登录() {

    while (1) {
        tdclick("t", "同意")
        sleep(800);
        if (textContains('读取手机识别码').exists()) {
            var ttt = textContains('读取手机识别码').findOne().bounds()
            click(ttt.left, ttt.top + 100)
            sleep(600)
            if (text('允许').exists()) {
                click("允许");
            }
            if (text('始终允许').exists()) {
                click("始终允许");
            }
        }
        if (textContains('判别用户身份').exists()) {
            var ttt = textContains('判别用户身份').findOne().bounds()
            click(ttt.left, ttt.top + 150)
            sleep(600)
            if (text('允许').exists()) {
                click("允许");
            }
            if (text('始终允许').exists()) {
                click("始终允许");
            }
        }
        sleep(2500)
        tdclick("t", "微信一键登录")
        sleep(10000)
        if (text('同意').exists()) {
            tdclick("t", "同意")
        }
        if (text("福利").exists() || text("首页").exists()) {
            sleep(1000);
            tdclick("t", "福利")
            sleep(3000);
            if (textContains('登录领取').exists()) {
                tdclick("tc", "登录领取")
                sleep(2500)
                tdclick("t", "微信一键登录")
                sleep(10000)
                if (text('同意').exists()) {
                    tdclick("t", "同意")
                }
            }
            break
        }
    }
}
function 红云视频极速版() {

    loginapp(红云视频极速版登录);


    if (text('金币翻倍').exists()) {
        tdclick("t", "金币翻倍")
        cloasad()
        sleep(4000)
        tdclick("id", "hk")
        tdclick("id", "me")
    }

    tdclick("t", "福利")
    sleep(5000);
    tdclick("t", "取消")
    sleep(2000);
    if (text('金币翻倍').exists()) {
        tdclick("t", "金币翻倍")
        cloasad()
        sleep(4000)
        tdclick("id", "hk")
        tdclick("id", "me")
    }
    if (text('立即提现').exists()) {

        var je = id("afo").findOne().text();
        if (je) {
            ydmoneylog("当前号金额:" + je)
        }
        tdclick("t", "立即提现")
        sleep(6000);
        tdclick("t", "天天提")
        sleep(2000);
        sleep(2000)
        click(500, device.height - 100)
        sleep(5000)
        if (text("绑定手机号").exists()) {

            sleep(2500)

            var phoneurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getphone&imei=" + __IMEI;
            var __sfz = aip("[TASK]", phoneurl, 10);
            setText(0, __sfz.smname);
            sleep(2000)
            tdclick("t", "发送验证码")

            for (i = 0; i < 6; i++) {
                sleep(8000);
                if (text('验证码').exists()) {
                    toastLog("检查验证码并自动输入")
                    sleep(5000);
                    var assd = getsiss()
                    if (assd) {
                        setText(0, assd);
                        tdclick("t", "立即绑定")
                    }
                }
            }
        }
        sleep(6000);
        back()
        sleep(200);
        back()
    }

    loginapp(红云视频极速版登录);

    tdclick("t", "首页")
    sleep(6000);
    for (i = 0; i < 150; i++) {

        lineDown(1500, 3000);

        var zxidl = text("评论").find();
        if (zxidl.nonEmpty()) {
            for (e = 0; e < zxidl.length; e++) {
                var zxzb = text("评论").find().get(e).bounds();
                if (zxzb.left > 300) {
                    click(Number(zxzb.left - random(150, 300)), Number(zxzb.top - random(100, 200)));
                    break
                }
            }
        }
        let delayTime = random(35000, 50000);
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
        toastLog("第" + i + "个视频")

        if (textContains('金蛋大奖').exists()) {

            tdclick("t", "金蛋大奖")
            sleep(5000)
        }
        if (textContains('赚钱小技巧').exists() || textContains('殿堂').exists()) {
            back()
        }
        if (textContains('恭喜获得').exists() || textContains('金币翻倍').exists() || textContains('看视频再送').exists()) {
            tdclick("t", "看视频再送")
            tdclick("t", "金币翻倍")
            cloasad()
            sleep(4000)
            if (textContains('又赚了').exists()) {
                tdclick("id", "hk")
                tdclick("id", "me")
            }
        }
        sleep(2000);
        tdclick("id", "hk")
        tdclick("id", "me")
    }

    loginapp(红云视频极速版登录);
    tdclick("t", "小视频")
    sleep(2000);
    for (i = 0; i < 150; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频")

        if (textContains('金蛋大奖').exists()) {

            tdclick("t", "金蛋大奖")
            sleep(5000)
        }
        if (textContains('恭喜获得').exists() || textContains('金币翻倍').exists() || textContains('看视频再送').exists()) {
            tdclick("t", "看视频再送")
            tdclick("t", "金币翻倍")
            cloasad()
            sleep(4000)
            if (textContains('又赚了').exists()) {
                tdclick("id", "hk")
                tdclick("id", "me")
            }
        }
        sleep(2000);
        if (textContains('赚钱小技巧').exists() || textContains('殿堂').exists()) {
            back()
        }
        sleep(2000);
        tdclick("id", "hk")
        tdclick("id", "me")
    }

}
function 抖音火山版登录() {

    while (1) {

        tdclick("t", "同意")
        tdclick("t", "我知道了")
        if (text('登录极速提现').exists()) {
            tdclick("id", "r6")
        }

        if (text("登录").exists()) {

            tdclick("t", "登录")

            sleep(2500)

            var phoneurl = "http://" + __SERVER + "/index.php?g=api&m=yd&a=getphone&imei=" + __IMEI;
            var __sfz = aip("[TASK]", phoneurl, 10);
            setText(0, __sfz.smname);
            sleep(2000)
            tdclick("t", "下一步")

            for (i = 0; i < 6; i++) {
                sleep(8000);
                if (text('输入验证码').exists()) {
                    toastLog("检查验证码并自动输入")
                    sleep(5000);
                    var assd = getsiss()
                    if (assd) {
                        setText(0, assd);
                        tdclick("t", "登录")
                    }
                }
            }

        }
        if (desc("搜索").exists() && !text("登录").exists()) {
            break
        }
    }
}
function 抖音火山版() {

    loginapp(抖音火山版登录);
    sleep(2000);
    tdclick("id", "bsj")
    sleep(8000)
    if (textContains("签到成功").exists()) {
        tdclick("tc", "看广告视频")
        cloasad()
    }
    sleep(2000);
    back()
    sleep(2000);
    loginapp(抖音火山版登录);
    sleep(2000);

    if (text("精选")) {
        tdclick("t", "精选")
    } else {
        if (text("视频")) {
            tdclick("t", "视频")
            sleep(4000)
            click(200, 400)
        }
    }

    for (i = 0; i < 180; i++) {

        lineDown(15000, 30000);
        toastLog("第" + i + "个视频");
        sleep(1200);
        tdclick("t", "知道了")
        var z = 互动("点赞")
        if (z) {
            if (descContains("喜欢按钮").exists()) {
                for (i = 0; i < descContains("喜欢按钮").find().length; i++) {
                    var zxzb = descContains("喜欢按钮").find().get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        click(Number(zxzb.left), Number(zxzb.top))
                        break
                    }
                }
            }
        }
        var z = 互动("关注")
        if (z) {
            if (text("关注").exists()) {
                for (i = 0; i < text("关注").find().length; i++) {
                    var zxzb = text("关注").find().get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        click(Number(zxzb.left), Number(zxzb.top))
                        sleep(100)
                        break
                    }

                }
                sleep(100)
            }
        }
    }

    postlog("看视频180个完成")


}
function 抖音极速版登录() {
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
        tdclick("id", "bad")

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
        if (text("关注").exists() || text("推荐").exists() || textContains("金币").exists()) {
            break;
        }
    }
}
function 抖音极速版() {

    loginapp(抖音极速版登录);

    for (i = 0; i < 100; i++) {

        lineDown(15000, 30000);

        tdclick("id", "bad")
        toastLog("第" + i + "个视频");
        tdclick("tc", "激活")
        sleep(1200);
        if (text('我知道了').exists()) {
            click('我知道了')
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
        if (text('开心收下').exists()) {
            click('开心收下')
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
                for (i = 0; i < descContains("未选中，喜欢").find().length; i++) {
                    var zxzb = descContains("未选中，喜欢").find().get(i).bounds();
                    if (Number(zxzb.top) > 0) {
                        press(Number(zxzb.left), Number(zxzb.top), 100)
                        sleep(100)
                        press(Number(zxzb.left), Number(zxzb.top), 100)
                        break
                    }
                }
            }
        }
        // var z = 互动("关注")
        // if (z) {
        //     if (desc("关注").exists()) {
        //         for (i = 0; i < desc("关注").find().length; i++) {
        //             var zxzb = desc("关注").find().get(i).bounds();
        //             if (Number(zxzb.top) > 0) {
        //                 press(Number(zxzb.left), Number(zxzb.top), 100)
        //                 sleep(100)
        //                 press(Number(zxzb.left), Number(zxzb.top), 100)
        //                 break
        //             }

        //         }
        //         sleep(100)
        //     }
        // }

        if (i % 50 === 0) {

            if (textContains("金币").exists() || textContains("开宝箱").exists()) {

                if (textContains("金币").exists()) {
                    tdclick("tc", "金币")
                } else if (textContains("开宝箱").exists()) {
                    tdclick("t", "开宝箱")
                } else {
                    click(device.width / 2 + 50, device.height - 150)
                }
                sleep(8000)


                if (textContains('立即签到').exists()) {
                    var sd = textContains("立即签到").findOne().bounds()
                    click(sd.left + 100, sd.top + 20);
                    sleep(5000)
                }
                if (textContains("看广告").exists()) {
                    var sd = textContains("看广告").findOne().bounds()
                    click(sd.left, sd.top);
                    cloasad()
                }
                sleep(2000)
                if (text('开宝箱得金币').exists()) {
                    click("开宝箱得金币");
                    sleep(5000)
                    if (textContains("看广告").exists()) {
                        var sd = textContains("看广告").findOne().bounds()
                        click(sd.left, sd.top);
                        cloasad()
                    }
                }
                if (text('去领取').exists()) {
                    click("去领取");
                    cloasad()
                }
                if (text('查看收益').exists()) {
                    click("查看收益");
                    sleep(1500)
                    back()
                    sleep(500)
                }
                if (textContains("邀请好友").exists()) {
                    tdclick("tc", "邀请好友")
                    sleep(3000)
                    back();
                }
            }



            loginapp(抖音极速版登录);

            toastLog("去提现一次")
            sleep(1200)
            if (textContains("金币").exists()) {
                tdclick("tc", "金币")
            } else if (textContains("开宝箱").exists()) {
                tdclick("t", "开宝箱")
            } else {
                click(device.width / 2 + 50, device.height - 50)
            }
            sleep(6000)
            if (text("现金收益").exists()) {
                var sd = text("现金收益").findOne().bounds()
                click(sd.left, sd.top + 50);
            }
            sleep(5000)
            if (text("去提现").exists()) {
                var sd = text("去提现").findOne().bounds()
                click(sd.left + 10, sd.top + 10);
            }
            sleep(5000)
            if (text("支付宝提现").exists()) {
                tdclick("t", "0.30元")
            }
            sleep(5000)
            if (text("立即提现").exists()) {
                var sd = text("立即提现").findOne().bounds()
                click(sd.left + 10, sd.top + 10);
            }
            sleep(5000)
            if (text("提现至其他账户").exists()) {
                var sd = text("提现至其他账户").findOne().bounds()
                click(sd.left + 10, sd.top + 10);
            }
            sleep(3000)
            输入支付宝帐号和密码()
            sleep(2000)
            if (text("确认提现").exists()) {
                var sd = text("确认提现").findOne().bounds()
                click(sd.left + 10, sd.top + 10);
            }

            今日头条大字版()
            loginapp(抖音极速版登录);
        }
    }

    postlog("看视频180个完成")

}
function 蚂蚁看点登录() {

    while (1) {
        sleep(1000);

        tdclick("id", "iv_close")

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

        if (text("精选").exists() || textContains("搜索").exists()) {

            tdclick("id", "tv_user_tab")

            if (text('微信一键登录').exists()) {
                tdclick("id", "agreementCheckView")
                sleep(1500)
                tdclick("t", "微信一键登录")
                sleep(10000)
            }
            if (text('同意').exists()) {
                click("同意");
            }
            tdclick("id", "tv_home_tab")

            break
        }

    }
}
function 蚂蚁看点() {

    loginapp(蚂蚁看点登录);

    tdclick("id", "tv_user_tab")
    sleep(2000);
    if (text('金币余额').exists()) {
        var xj = id("score_money_1_text").findOne().text();
        ydmoneylog("金币:" + xj);
    }
    tdclick("t", "提现兑换")
    sleep(8000);
    tdclick("t", "立即提现")
    sleep(2000);

    loginapp(蚂蚁看点登录);

    tdclick("id", "tv_home_tab")
    sleep(2000);
    for (i = 0; i < 80; i++) {
        sleep(2000);
        lineDown(1500, 3000);
        sleep(2000);
        var zxidl = id("tv_article_title").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(150, 300)), Number(zxzb.top));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (textContains("评论").exists()) {

                if (id("coin_front_text_image").exists()) {

                } else {

                    if (id("news_income_container").exists()) {
                        tdclick("id", "news_income_container")
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
            loginapp(蚂蚁看点登录);
        }

        sleep(2000);
        lineDown(1500, 3000);

        tdclick("t", "忽略")

        if (id("ll_article_list_video").exists()) {
            tdclick("id", "ll_article_list_video")
            cloasad();
            sleep(4000)
            tdclick("id", "iv_close")
        }


    }
    postlog("看资讯80个完成")

    loginapp(蚂蚁看点登录);

    tdclick("id", "tv_find_tab")
    sleep(2000);
    for (i = 0; i < 80; i++) {
        sleep(2000);
        var zxidl = id("tv_play_times").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + 200), Number(zxzb.top));
            sleep(4000);
            if (textContains("说两句").exists()) {
                var zxxhl = 0;
                while (1) {
                    sleep(800);
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    toast("第" + i + "个视频")
                    if (zxxhl > 25) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        } else {
            loginapp(蚂蚁看点登录);
            tdclick("id", "tv_find_tab")
        }
        sleep(2000);
        lineDown(1500, 3000);

    }
    postlog("看视频80个完成")

}
function 番茄免费小说登录() {

    while (1) {
        sleep(1000);
        tdclick("t", "同意")
        tdclick("t", "跳过")
        sleep(1000);
        if (text("我的").exists() || text("福利").exists()) {
            sleep(1000);
            tdclick("t", "我的")
            sleep(3000);
            if (text('马上登录').exists()) {
                tdclick("t", "马上登录")
                sleep(2500)
                tdclick("t", "抖音一键登录")
                tdclick("tc", "抖音")
                sleep(10000)
                if (textContains('同意授权').exists()) {
                    tdclick("tc", "同意授权")
                }
            }
            break
        }
    }
}
function 番茄免费小说() {

    loginapp(番茄免费小说登录);

    tdclick("t", "我的")
    sleep(2000);
    if (text('提现').exists()) {
        var p = classNameContains("TextView").find()
        for (i = 0; i < p.length; i++) {
            var s = p.get(i).text()
            if (s) {
                if (s == "现金余额(元)") {
                    var je = Number(p.get(i - 1).text());
                    if (je > 0) {
                        ydmoneylog("当前号金额:" + je)
                        break
                    }
                }
            }
        }
        tdclick("t", "提现")
        sleep(6000);
        tdclick("tc", "提现1")
        tdclick("t", "提现15.00元")
        sleep(2000);
        back()
        sleep(200);
        back()
    }

    loginapp(番茄免费小说登录);

    tdclick("t", "福利")
    sleep(6000);
    tdclick("tc", "立即领取")
    sleep(1000);

    if (textContains('看视频最高').exists()) {
        tdclick("tc", "看视频最高")
        cloasad()
    }
    sleep(6000);
    swipe(200, 1000, 200, 200, 800);
    sleep(2200);
    toastLog("去看视频广告")

    if (textContains('看视频赚海量金币').exists() && !textContains('已完成10/10').exists()) {
        var ttt = 1;
        while (1) {

            sleep(2000);
            if (textContains('已完成10/10').exists()) {
                break
            }
            if (textContains('看视频赚海量金币').exists()) {

                var tarr = textContains('看视频赚海量金币').findOne().bounds()
                if (tarr.top < 500) {
                    sleep(1000);
                    swipe(200, 1000, 200, 200, 800);
                    sleep(2200);
                }
                if (textContains('已完成10/10').exists()) {
                    break
                }
                toastLog("看视频" + ttt)
                tdclick("tc", "看视频赚海量金币")
                cloasad()
            }
            ttt = ttt + 1;
            if (ttt > 10) {
                break
            }
            sleep(2000);

            tdclick("t", "福利")
        }
    }
    sleep(2200);
    toastLog("开宝箱得金币")
    if (textContains('开宝箱得金币').exists()) {
        tdclick("tc", "开宝箱得金币")
        sleep(2000);
        tdclick("tc", "看视频最高")
        cloasad()
    }

    去番茄书页面()

    var zs33 = 1;

    while (1) {

        tdclick("t", "我知道了")

        lineDown(10000, 20000, "x")

        toast(zs33 + "页")

        zs33 = zs33 + 1;

        if (textContains('不再提示').exists()) {
            back()
        }
        if (textContains('看视频').exists() && textContains('广告').exists()) {
            tdclick("tc", "看视频")
            sleep(1500)
            cloasad()
            tdclick("id", "mp")
            tdclick("t", "我知道了")
        }
    }
}
function 去番茄书页面() {

    while (1) {
        sleep(2000);
        tdclick("t", "书城")
        sleep(2000)
        tdclick("t", "推荐")
        sleep(7000)
        tdclick("t", "完整榜单")
        sleep(6000)
        sleep(2000)
        if (text("1").exists() && text("5").exists()) {
            var tt = random(1, 5);
            toastLog("打开排名第" + tt + "的书")
            var qr = text(tt).findOne().bounds()
            if (qr) {
                click(qr.left + 200, qr.top)
            }
            sleep(4000)
            break
        } else {
            loginapp(番茄免费小说登录);
        }
    }
}
function 忆头条登录() {

    while (1) {
        sleep(1000);
        if (text('任务').exists()) {
            click("任务");
            sleep(1000);
            if (id("wx_login").exists()) {
                var p = id("wx_login").findOne().bounds();
                click(p.centerX(), p.centerY());
            }
        }
        tdclick("id", "dialog_action_close")
        sleep(1000);
        if (text('同意').exists()) {
            click("同意");
        }
        sleep(1000);
        if (text('运营规则').exists()) {
            var p = classNameContains("mageView").depth(6).drawingOrder(1).findOne().bounds();
            if (p) {
                click(p.centerX(), p.centerY());
            }
        }
        sleep(1000);
        if (text("视频").exists() && text("我的").exists() && text("任务").exists()) {
            tdclick("t", "资讯")
            break;
        }

    }
}
function 忆头条() {

    loginapp(忆头条登录);

    tdclick("t", "资讯")

    for (i = 0; i < 70; i++) {

        var zxidl = id("inew_text_title").find();
        if (zxidl.nonEmpty()) {

            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(60, 120)), Number(zxzb.top));
            sleep(4000);
            if (textContains("展开全文").exists()) {

                toast("第" + i + "个资讯")
                var zxxhl = 0;
                while (1) {
                    sleep(800);
                    if (textContains("展开全文").exists()) {
                        textContains("展开全文").findOne().click()
                    }
                    lineDown(1500, 3000);

                    zxxhl = zxxhl + 1;
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
                if (text("任务").exists() && text("我的").exists()) {
                    click("资讯")
                    break;
                } else {
                    back();
                    if (text("广告").exists()) {
                        var p = classNameContains("mageView").depth(4).drawingOrder(3).findOne().bounds();
                        click(p.left, p.top);
                        sleep(2000)
                    }
                    tdclick("tc", "退出")
                    sleep(1200);
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (text('运营规则').exists()) {
            var p = classNameContains("mageView").depth(6).drawingOrder(1).findOne().bounds();
            if (p) {
                click(p.centerX(), p.centerY());
            }
        }
        if (i % 35 === 0) {
            loginapp(忆头条登录);
        }


    }
    postlog("看资讯70个完成")

    loginapp(忆头条登录);

    tdclick("t", "视频")

    for (i = 0; i < 60; i++) {

        var zxidl = textContains("分钟前").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left), Number(zxzb.top));
            sleep(4000);
            if (textContains("评论得金币").exists()) {
                var zxxhl = 0;
                while (1) {
                    sleep(800);
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    toast("第" + i + "个视频")
                    if (zxxhl > 25) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        } else {
            while (1) {
                sleep(1200);
                if (text("任务").exists() && text("我的").exists()) {
                    tdclick("t", "视频")
                    break;
                } else {
                    back();
                    sleep(1200);
                    tdclick("tc", "退出")
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (i % 40 === 0) {
            loginapp(忆头条登录);
            tdclick("t", "视频")
        }
    }
    postlog("看视频60个完成")

    tdclick("t", "任务")
    sleep(800);
    tdclick("t", "点击签到")

    postlog("点击签到个完成")

    loginapp(忆头条登录);
    tdclick("t", "我的")
    sleep(2800);
    tdclick("t", "兑换现金")
    sleep(2800);
    tdclick("t", "立即兑换")
    sleep(2800);

}
function 惠头条登录() {

    while (1) {
        tdclick("t", "同意并继续")
        sleep(1000);
        if (text("我的").exists() || text("任务中心").exists()) {
            break;
        }
        tdclick("t", "忽略")
        sleep(600)
        if (text('微信一键登录').exists()) {
            tdclick("t", "微信一键登录")
            sleep(5000)
            tdclick("t", "同意")
        }
        tdclick("id", "img_close")
    }
}
function 惠头条() {

    loginapp(惠头条登录);

    click("我的")
    sleep(5000)
    tdclick("id", "img_close")
    sleep(2000)
    tdclick("t", "兑换提现")
    sleep(3000)
    tdclick("t", "立即提现")
    sleep(3000)

    loginapp(惠头条登录);

    for (i = 0; i < 80; i++) {
        var zxidl = id("tv_news_timeline").find();
        if (zxidl.nonEmpty()) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + random(150, 300)), Number(zxzb.top - random(50, 100)));
            sleep(4000);
            toastLog("第" + i + "个文章")
            if (text("评论").exists()) {
                var zxxhl = 0;
                while (1) {
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    sleep(800);
                    tdclick("tc", "展开全文")
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
                if (text("任务中心").exists() && text("我的").exists()) {
                    break;
                } else {
                    back();
                    sleep(1200);
                    tdclick("t", "忽略")
                    tdclick("tc", "退出")
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);

        if (i % 40 === 0) {
            loginapp(惠头条登录);
        }
        tdclick("t", "忽略")

    }
    postlog("看资讯80个完成")

    loginapp(惠头条登录);
    sleep(2000)
    tdclick("t", "任务中心")
    sleep(2000)
    tdclick("id", "sign_btn_container")

    loginapp(惠头条登录);

    tdclick("t", "视频")

    for (i = 0; i < 60; i++) {

        var zxidl = id("src").find();
        if (zxidl.length > 0) {
            var zxzb = zxidl.get(0).bounds();
            click(Number(zxzb.left + 250), Number(zxzb.top - 100));
            sleep(4000);
            if (textContains("评论").exists()) {
                var zxxhl = 0;
                while (1) {
                    sleep(800);
                    lineDown(1500, 3000);
                    zxxhl = zxxhl + 1;
                    toast("第" + i + "个视频")
                    if (zxxhl > 20) {
                        back();
                        break;
                    }
                }
            } else {
                toast("可能进了广告,直接返回")
                back()
            }
        } else {
            while (1) {
                sleep(1200);
                if (text("任务中心").exists() && text("我的").exists()) {
                    tdclick("t", "视频")
                    break;
                } else {
                    back();
                    sleep(1200);
                }
            }
        }
        sleep(2000);
        lineDown(1500, 3000);
    }
    postlog("看视频60个完成")

}
function 红包视频登录() {

    while (1) {
        sleep(1000);
        if (text('同意并使用服务').exists()) {
            click("同意并使用服务");
        }
        if (text('跳过').exists()) {
            click("跳过");
        }
        sleep(600)
        if (text('仅限新用户领取').exists()) {
            var zxzb = text('仅限新用户领取').findOne().bounds();
            click(zxzb.centerX(), zxzb.centerY() - 100);
            sleep(4000);
        }
        sleep(400);
        if (id('tv_login_confirm').exists()) {
            tdclick("id", "tv_login_confirm")
            sleep(8000)
            tdclick("t", "同意")
        }
        if (text('确定').exists()) {
            click("确定");
        }
        sleep(1000)
        if (text("首页").exists() || text("我").exists()) {
            sleep(4000);
            tdclick("t", "我")
            sleep(4000);
            if (id('tv_login_confirm').exists()) {
                tdclick("id", "tv_login_confirm")
                sleep(8000)
                tdclick("t", "同意")
            }
            break;
        }
    }
}
function 红包视频() {

    loginapp(红包视频登录);
    sleep(2000)
    tdclick("t", "我")
    sleep(2000)
    var je = id("tv_mine_balance").findOne().text()
    if (je) {
        ydmoneylog("当前号金额:" + je)
    }
    sleep(5000)
    tdclick("t", "提现")
    sleep(3000)
    tdclick("t", "立即提现")
    sleep(3000)

    loginapp(红包视频登录);
    sleep(2000)
    tdclick("t", "任务")
    sleep(5000)
    if (textContains('立即签到').exists()) {
        tdclick("tc", "立即签到")
        cloasad()
        sleep(5000)
        back()
    }
    if (textContains('开启宝箱').exists()) {
        tdclick("tc", "开启宝箱")
        cloasad()
        sleep(5000)
        tdclick("t", "确定")
        back()
    }

    loginapp(红包视频登录);

    tdclick("t", "首页")

    for (i = 0; i < 80; i++) {

        lineDown(15000, 30000);

        toastLog("第" + i + "个视频");

        if (text('我知道了').exists()) {
            click('我知道了')
        }
        sleep(600)
        if (text('以后再说').exists()) {
            click("以后再说");
            sleep(1500)
        }
        if (i % 20 === 0) {
            loginapp(红包视频登录);
            tdclick("t", "首页")
        }
    }
    postlog("看视频养号关注80个完成")
}
function 赚钱小视频登录() {
    while (1) {
        sleep(1000);
        tdclick("t", "同意并继续")
        sleep(1000);
        tdclick("id", "img_dialog_first")
        sleep(1000);
        if (textContains("一键登录").exists()) {
            tdclick("id", "money_activity_login_weixin")
            sleep(10000);
            tdclick("t", "同意")
        }
        sleep(1000);
        tdclick("id", "imagview_red_packet_close_first")
        sleep(1000);
        if (text("我的").exists() || text("任务").exists()) {
            break
        }
    }
}
function 赚钱小视频() {

    loginapp(赚钱小视频登录);
    sleep(2000);
    tdclick("t", "我的")
    sleep(4000);
    tdclick("id", "money_mine_popups_bt_close")
    sleep(2000);
    if (text('提现').exists()) {
        tdclick("t", "提现")
        sleep(8000);
        if (text('零钱提现').exists()) {
            //tdclick("t", "0.5元")
            sleep(2000)
            tdclick("t", "立即提现")
            sleep(2000)
        }
    }

    loginapp(赚钱小视频登录);
    sleep(2000);
    tdclick("t", "小视频")
    for (i = 1; i < 50; i++) {

        sleep(2000);
        lineDown(10000, 20000);
        sleep(2000);

        var fra = "rl_newgetgold_anima_tx"

        for (r = 0; r < 5; r++) {

            if (r > 0) {
                var x = fra + r;
            } else {
                var x = fra
            }
            if (id(x).exists()) {
                tdclick("id", x)
                sleep(7000)
                tdclick("id", "gold_dialog_tx1")
                cloasad()
                sleep(7000);
                tdclick("id", "money_dialog_getcash_new2_close")
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
            loginapp(赚钱小视频登录);
            sleep(2000);
            tdclick("t", "小视频")
        }
    }

    postlog("看小视频50个完成")


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
function PersonalMessage() {

    loginapp();

    toastLog("私信前看几个视频")
    var gzqsp = random(5, 9)
    for (h = 1; h < gzqsp; h++) {
        lineDown(10000, 20000);
    }

    loginapp();
    sleep(5000)
    if (text("我").exists()) {
        click("我")
    } else {
        click(948, 1673)
    }
    sleep(3000)
    tdclick("t", "粉丝")

    var taskurl = "http://" + __SERVER + "/index.php?g=api&m=nf&a=getsearchkyword&t=1&gid=" + gid
    var __SKW = aip("[pmword]", taskurl, 20);

    var one = __SKW.one;
    var two = __SKW.two;
    var three = __SKW.three;
    var four = __SKW.four;
    let imgurl = "http://" + __SERVER + "/data/upload/" + four;
    var img = images.load(imgurl);
    if (img != null) {
        images.save(img, "/sdcard/DCIM/0.jpg", "jpg", 100);
        toastLog("微信号专用图片下载完成")
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File("/sdcard/DCIM/0.jpg"))));
    }
    //var five = __SKW.five;
    //var six = __SKW.six;

    sleep(2200)
    var sln = 0
    if (text("互相关注").exists()) {
        sleep(3000)
        if (text("回关").exists()) {
            toastLog("有回关的");
            var hg = text("回关").find()
            for (iv = 0; iv < hg.length; iv++) {
                var fbid = hg.get(iv).bounds()
                click(fbid.left, fbid.top)
                sleep(3000)
                tdclick("t", "取消")
            }
        }
        sleep(5000)
        if (text("互相关注").exists()) {

            var friendslist = text("互相关注").find()
            if (friendslist.length > 5) {
                sln = 5
            } else {
                sln = friendslist.length
            }

            for (i = 0; i < sln; i++) {

                toastLog("招呼当前第" + (i + 1) + "个第")
                sleep(1200)
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
                    var point = images.findMultiColors(img, "#FF5372", [[-1, 20, "#FD5474"], [10, 13, "#242630"]], {
                        region: [0, 400, 1080, 960]
                    });
                    var point1 = images.findMultiColors(img, "#fe538f", [[8, -8, "#fb548f"]], {
                        region: [0, 400, 1080, 960]
                    });
                    if (point || point1) {

                        click("私信")

                        sleep(3000)

                        xiarr1 = [one, two, three, four]

                        xiarr = [one, two, "方便", "抖音"]

                        var dqi = -1;

                        for (m = 0; m < xiarr.length; m++) {
                            sleep(1200)
                            if (textContains(xiarr[m]).exists()) {
                                dqi = m
                            }
                        }

                        if (dqi < 1) {

                            sleep(1200)
                            setText(xiarr1[dqi + 1])
                            sleep(2000)
                            tdclick("id", "ic_")
                            sleep(2000)
                            if (descContains("发送").exists()) {
                                p = descContains("发送").findOne().bounds();
                                if (p) {
                                    click(p.centerX(), p.centerY())
                                }
                            }
                            sleep(2000)
                            tdclick("t", "发送")
                            sleep(2000)

                        } else {
                            toastLog("本号已招呼过")
                        }


                    }
                }

                var fb = random(3, 6)
                for (hh = 0; hh < fb; hh++) {
                    toastLog("共" + (fb * 5) + "秒已等待" + (hh * 5) + "秒去下一个招呼")
                    sleep(5 * 1000);
                    device.wakeUp();
                }

                var iip = 1
                while (1) {
                    toast("返回粉丝页面")
                    sleep(2000)
                    if (!text("私信").exists() && !textContains("获赞").exists() && textContains("关注").exists() && textContains("粉丝").exists()) {
                        break
                    }
                    else {
                        back()
                        sleep(1200)
                        iip = iip + 1
                        if (iip > 8) {
                            break
                        }
                    }
                }

            }
        }

    } else {
        toastLog("没有粉丝或到底了")
    }

    loginapp();

    sleep(5000)
    if (text("消息").exists()) {
        click("消息")
    }
    sleep(3000)
    var ddcs = 0

    tdclick("t", "我知道了")
    sleep(2000)
    tdclick("t", "好的")
    sleep(2000)

    while (1) {

        toastLog("等待消息回复...")

        sleep(5000)

        var point = images.findMultiColors(captureScreen(), "#face15", [[-13, 20, "#face15"], [1, 40, "#face15"], [19, 17, "#face15"]], {
            region: [0, 0, device.width, (device.height - 300)]
        });

        var point1 = images.findMultiColors(captureScreen(), "#FE2C55", [[-13, 20, "#FE2C55"], [1, 40, "#FE2C55"], [19, 17, "#FE2C55"]], {
            region: [0, 0, device.width, (device.height - 300)]
        });
        if (point || point1) {
            toastLog("发现新消息")
            sleep(800)
            if (point) { click(point.x, point.y) }
            if (point1) { click(point1.x, point1.y) }
            sleep(3000)

            xiarr1 = [one, two, three, four]

            xiarr = [one, two, "方便", "抖音"]

            if (textContains("发送消息").exists() || desc("视频通话").exists() || desc("语音通话").exists()) {

                if (textContains("抖音").exists()) {
                    toastLog("已发送了最后一句")
                } else {
                    if (textContains("方便").exists()) {
                        sleep(1200)
                        setText(xiarr1[3])
                    } else {
                        sleep(1200)
                        setText(xiarr1[2])
                    }
                    sleep(2000)
                    tdclick("id", "ic_")
                    sleep(2000)
                    if (descContains("发送").exists()) {
                        p = descContains("发送").findOne().bounds();
                        if (p) {
                            click(p.centerX(), p.centerY())
                        }
                    }
                    sleep(2000)
                    tdclick("t", "发送")
                    sleep(2000)

                }
            }


        } else {

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

        var fb = random(5, 9)
        for (hh = 0; hh < fb; hh++) {
            toastLog("共" + (fb * 5) + "秒已等待" + (hh * 5) + "秒去下一个招呼")
            sleep(5 * 1000);
            device.wakeUp();
        }

        ddcs = ddcs + 1
        if (ddcs > 30) {
            toastLog("循环等待新消息30次花费时间23分钟结束")
            break
        }
    }
}



alert("333")
toastLog("查询是否有回复")
sleep(3000)



exit()
var lbds = 0
for (i = 1; i < 10; i++) {

    sleep(3000)
    if (text("回关").exists()) {
        toastLog("有回关的");
        var hg = text("回关").find()
        for (iv = 0; iv < hg.length; iv++) {
            var fbid = hg.get(iv).bounds()
            click(fbid.left, fbid.top)
            sleep(3000)
            tdclick("t", "取消")
        }
    }

    sleep(5000)
    if (text("互相关注").exists()) {

        var friendslist = text("互相关注").find()
        for (i = 0; i < friendslist.length; i++) {
            toastLog("本怘总共" + friendslist.length + "当前第" + i + "个")
            sleep(1200)
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
                var point = images.findMultiColors(img, "#FF5372", [[-1, 20, "#FD5474"], [10, 13, "#242630"]], {
                    region: [0, 400, 1080, 960]
                });
                var point1 = images.findMultiColors(img, "#fe538f", [[8, -8, "#fb548f"]], {
                    region: [0, 400, 1080, 960]
                });
                if (point || point1) {
                    click("私信")
                    sleep(3000)
                    if (text(one).exists()) {

                        toastLog("本号已打过招呼")
                        setText(two)
                        sleep(2000)
                        tdclick("id", "ic_")
                        sleep(2000)
                        if (descContains("发送").exists()) {
                            p = descContains("发送").findOne().bounds();
                            if (p) {
                                click(p.centerX(), p.centerY())
                            }
                        }
                        sleep(2000)
                        tdclick("t", "发送")
                        sleep(random(3000, 8000))

                    } else {

                        setText(one)
                        sleep(2000)
                        tdclick("id", "ic_")
                        sleep(2000)
                        if (descContains("发送").exists()) {
                            p = descContains("发送").findOne().bounds();
                            if (p) {
                                click(p.centerX(), p.centerY())
                            }
                        }
                        sleep(2000)
                        tdclick("t", "发送")
                        sleep(random(3000, 8000))
                    }
                    lbds = lbds + 1;
                }
            }
            var iip = 1
            while (1) {
                toast("返回粉丝页面")
                sleep(2000)
                if (!text("私信").exists() && !textContains("获赞").exists() && textContains("关注").exists() && textContains("粉丝").exists()) {
                    break
                }
                else {
                    back()
                    sleep(1200)
                    iip = iip + 1
                    if (iip > 8) {
                        break
                    }
                }
            }
        }
    } else {
        toastLog("没有粉丝或到底了")
        break
    }
    sleep(1000)
    var ar = random(400, 700)
    swipe(ar, device.height - 150, ar, 250, 800);
    sleep(2000)
    sleep(2000)
    if (lbds > 9) {
        toastLog("聊了10个好友")
        break
    }
    sleep(2000)
    if (text("你还没有粉丝").exists() || text("发现好友").exists() || textContains("暂时没有更多了").exists()) {
        toastLog("没有粉丝或到底了")
        break
    }
}
toastLog("招呼10个好友完成")