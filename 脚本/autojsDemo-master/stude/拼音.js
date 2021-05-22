(function InitScript() {
    // 监控多脚本运行情况，防干扰
    let c = engines.all().length;
    if (c > 2) {
        toastLog("脚本引擎：发现多个脚本同时运行，即将杀死所有脚本，请重新运行本脚本！");
        engines.stopAll();
    } else {
        const StartToast = "抖音私信脚本已开始,首次运行需要授权截屏权限";
        device.keepScreenOn();
        images.requestScreenCapture(false);
        toast(StartToast);
    }
})();

// *********初始化全局变量************
TAG = "DYSX-> ";
SAVED = storages.create("dyzs");
COUNT = 0;

// 半通用代码 错误打印与退出脚本
function ErrorHandle(Msg, suicide) {
    console.setSize(device.width / 2, device.height);
    console.show();
    console.error(Msg);
    if (suicide) {
        threads.shutDownAll();
        engines.stopAll();
    }
    runtime.sleep(5000);
    console.hide();
};

function clickItem(item) {
    if (!item) {
        return false
    }
    item.click();
    let area = item.bounds();
    let x = area.centerX();
    let y = area.centerY();
    try {
        // Android 7.0  以上的点击
        click(x, y);
    } catch (e) {
        // Root 点击
        try {
            // 容易出毛病，toomanyevenliserException
            Tap(x, y);
            runtime.sleep(1000);
        } catch (e) {
            try {
                var ra = new RootAutomator();
                // 保险点击
                ra.tap(x, y, 1);
                runtime.sleep(800);
                ra.press(x, y, 10, 1);
                ra.exit();
            } catch (e) {
                ErrorHandle("在此设备上需要Root权限才能运行本脚本！", true);
            }

        }
    }
}

function clickHelper(item, is_auto, is_root, is_ge_sdk23) {
    if (!item) {
        return false
    }
    if (is_auto) {
        item.click();
        return
    }

    let area = item.bounds();
    let x = area.centerX();
    let y = area.centerY();

    if (is_ge_sdk23) {
        // Android 7.0  以上的点击
        click(x, y);
    }

    if (is_root) {
        try {
            // 容易出毛病，toomanyevenliserException
            Tap(x, y);
            runtime.sleep(1000);
        } catch (e) {
            try {
                var ra = new RootAutomator();
                // 保险点击
                ra.tap(x, y, 1);
                runtime.sleep(800);
                ra.press(x, y, 10, 1);
                ra.exit();
            } catch (e) {
                ErrorHandle("在此设备上需要Root权限才能运行本脚本！", true);
            }

        }
    }

}


function getGender() {
    function genderRecog(text_) {
        // 预备性别校验(根据文本)
        let gender = "未知";
        const p1 = new RegExp("男");
        const p2 = new RegExp("女");
        if (p1.test(text_)) {
            gender = "男";
        } else if (p2.test(text_)) {
            gender = "女";
        } else {
            function warpGenderRec() {
                let W_gender = null;
                if (textEndsWith("岁").findOne(2000)) {
                    Z = textEndsWith("岁").findOne().bounds();
                    console.hide();
                    ox = Z.left + device.width / 1080 * 23;
                    oy = Z.top + device.height / 1920 * 32;
                    console.log(TAG + "定位颜色点坐标X Y为:", ox, oy);
                    colorValue = images.pixel(images.captureScreen(), ox, oy);
                    console.info(TAG + "colorValueAbs: " + colorValue);
                    if (colorValue + 16211275 < 2000000) {
                        W_gender = "男";
                    } else if (colorValue + 2537115 < 2000000) {
                        W_gender = "女";
                    }
                }
                return W_gender
            }
            // 执行函数
            gender = warpGenderRec();
        }
        return gender
    }
    try {
        msgUi = id("d4z").findOne(4000).children();
    } catch (e) {
        if (text("男").findOne(3000)) { return "男" } else return genderRecog("");
    }
    // toastLog(msgUi);
    runtime.sleep(3000);
    let msgUiSize = msgUi.size();
    msg_ = "";
    for (let i = 0; i < msgUiSize; i++) {
        let text_ = msgUi.get(i).text();
        msg_ += " | " + text_;

    }
    console.verbose(msg_);
    gender = genderRecog(msg_);
    return gender
}

function SendMsg() {
    if (id("abe").findOne(1000)) {
        toastLog(TAG + "企业用户，返回继续下一个");
        return false
    }
    // 进行性别识别
    if (getGender() != "男") {
        toastLog(TAG + "不符合性别条件，返回继续");
        return false
    } else {
        toastLog(TAG + "符合性别条件,开始进行消息发送")
    };

    if (text("关注").findOne(4000)) {
        if (!text("关注").findOne(2000).click()) {
            b = id("cac").findOne(2000);
            // console.log(a.bounds().top, a.bounds().left);
            // console.log(b.bounds().top, b.bounds().left);
            //670,466
            if (b) {
                click(b.bounds().left - 260, b.bounds().top + 46);
            }
        }
        toastLog(TAG + "点击关注");
        runtime.sleep(1500);
        if (!id("cst").findOne(2000)) {
            console.show();
            console.error(TAG + "关注失败1:");
            // console.log(id("cac").findOne(1000));
            runtime.sleep(2000);
            console.hide();

            click(597, 475);
            runtime.sleep(1000);
            click(597, 475);
        }

        if (dealFlashWin(5)){
            return false
        }
        if (text("已请求").findOne(100)){
            return false
        }
    } else {
        toastLog(TAG + "关注失败");
        return false
    };

    toastLog(TAG + "开始发送私信消息");
    // 点击私信
    try {
        id("cst").findOne(3000).click();
    } catch (e) {
        click(850, 472);
        click(850, 472);
    }

    dealFlashWin(1);
    runtime.sleep(500);
    ready_send_msgs = SAVED.get("dy_sx_zh", "").split("\n");
    if (ready_send_msgs.length < 1) {
        ErrorHandle("招呼设置错误", true);
    }

    for (let i = 0; i < ready_send_msgs.length; i++) {
        a = className("android.widget.EditText").findOne(1000);
        a.click();
        let t = ready_send_msgs[i];
        console.verbose(TAG + "设置消息：[" + i + "] " + t);
        className("android.widget.EditText").findOne(2000).setText(t);
        runtime.sleep(1000);
        className("android.widget.EditText").findOne(2000).setText(t);
        className("android.widget.EditText").findOne(2000).setText(t);
        runtime.sleep(500);
        desc("发送").findOne(6000).click();
        // runtime.sleep(i * 1500);
        runtime.sleep((3 - i) * 2000);
    }
    COUNT++;
    toastLog(TAG + "三条消息发送完毕");
    toastLog(TAG + "当前执行成功数 " + COUNT);
}


function returnListPage() {
    while (!textEndsWith("条评论").findOne(2000)) {
        if (id("j4").findOne(2000)) {
            clickHelper(id("j4").findOne(), false, false, true);
        } else {
            desc("返回").findOne(2000).click();
        }
        toastLog("点击返回");
    }
    return true
}

function Start() {

    // 判断是否在评论界面
    toastLog(TAG + "等待打开抖音界面");
    runtime.sleep(3000);
    let tc = 0;
    while (!textEndsWith("条评论").findOne(1500)) {
        tc++;
        if (tc > 30) {
            toastLog(TAG + "三秒内未发现抖音界面，脚本退出");
            ErrorHandle("未发现评论页面，脚本退出", true);
        }
    }
    do {
        // 当前页面处理逻辑
        // try {
        returnListPage();
        runtime.sleep(5000);
        CARD_LIST = className("android.support.v7.widget.RecyclerView").findOne().children();
        SIZE = CARD_LIST.size();
        toastLog(TAG + "发现当前页面存在评论人数： " + SIZE);
        CARD_LIST.each(
            function (CARD_UI) {
                // 解开包装
                returnListPage();
                CARD_UI_INNER = CARD_UI.children().get(0);
                // 点进个人页面
                console.hide();
                runtime.sleep(2000);
                if (!CARD_UI_INNER) {
                    // console.log(CARD_UI_INNER.size());
                    // console.log(CARD_UI_INNER);
                    console.error(currentActivity());
                    console.error(TAG + "元素定位错误！");
                    return
                }

                // 不要去点击回复
                if (CARD_UI_INNER.children().size() <= 3) {
                    return
                }
                clickHelper(CARD_UI_INNER.children().get(0), false, false, true);
                runtime.sleep(2000);
                toastLog(TAG + "即将进入消息发送函数");
                SendMsg();
                return

            }
        )
        console.log(TAG + "当前页面扫描完毕，自动下拉一页");
        // } catch (e) {
        // console.error(e.message + "\n" + e.stack);
        // ErrorHandle(e.message + "\n\n" + e.stack, false);
        // continue
        // }
    } while (returnListPage() && className("android.support.v7.widget.RecyclerView").findOne().scrollForward());
    console.warn(TAG + "当前评论页面扫描发送完毕，请检查!")
}

# 处理突然闪出来的窗口
function dealFlashWin(WIN_TYPE) {
    switch (WIN_TYPE) {
        case 1:
            ui = text("确认").findOne(500);
            if (ui){
                ui.click();
                return true
            }
        case 2:
            ui = text("我知道了").findOne(500);
            if (ui){
                ui.click();
                return true
            }
        case 3:
            ui = text("好的").findOne(500);
            if (ui){
                ui.click();
                return true
            }
        case 4:
            ui = text("以后再说").findOne(500);
            if (ui){
                ui.click();
                return true
            }
        case 5:
            ui = text("取消").findOne(500);
            if (ui){
                ui.click();
                return true
            }
        default:
            return false
    }
    
}

// 172.16.6.114
// console.show();
// console.info("调试-》设备像素:", device.width, device.height);
// console.info("注意-》必须给予截图权限并记住");
// console.setSize(device.width / 2, device.height / 2);
// console.setPosition(0, device.height / 2);


// work_thread = threads.start(function () {
//     Start();
// });



threads.start(function(){
    setInterval(function(){
        console.verbose("监控弹窗ing.....");
        dealFlashWin(2);
        dealFlashWin(3);
        dealFlashWin(4);
    },500);
    
})

Start();

// SendMsg();
// returnListPage();
// className("android.support.v7.widget.RecyclerView").findOne().scrollForward();
// SAVED.put("dy_sx_zh","咦\n好像在哪里见过你来着，眼熟\n我想想。。。");
// console.info(device.width,device.height);
// engines.stopAll();