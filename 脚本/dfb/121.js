

if (textContains("看视频领取").exists() && text("可提现").exists()) {
    var zxzb = textContains("看视频领取").findOne().bounds();
    if (zxzb != null) {
        click(zxzb.left + 50, zxzb.top + 150);
    }
}










exit()



app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$TetherSettingsActivity"
});

if (currentActivity() != 'com.tencent.mm.ui.LauncherUI') {
    //不在聊天Activity
    if (currentActivity().search('com.tencent.mm') == -1) {
        //当前 APP 不是微信
        app.launch("com.tencent.mm");
    }
}
