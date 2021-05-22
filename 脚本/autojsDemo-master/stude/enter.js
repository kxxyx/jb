"ui";
ui.statusBarColor("#036289");
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="FB助手 V1.1.1" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <ScrollView>
                        <vertical margin="8 8 8 8">
                            <horizontal marginTop="10"><View margin="10 0 12 0" w="5" h="20" bg="#F75000"></View><text textSize="15" textColor="#F75000">养号操作</text></horizontal>
                            <horizontal layout="center" >
								<vertical h="100dp">
									<text layout_weight="1" textSize="16sp" textColor="black" text="请输入姓名"/>:<input id="name" text="小明"/>
								</vertical>
                                <button id="dy_yh_1" text="登号" w="auto" style="Widget.AppCompat.Button.Colored" />
                                <button id="dy_yh_2" text="加粉" w="auto" style="Widget.AppCompat.Button.Colored" />
                                <button id="dy_yh_3" text="修改资料" w="auto" style="Widget.AppCompat.Button.Colored" />
                                <button id="dy_yh_4" text="发广告" w="auto" style="Widget.AppCompat.Button.Colored" />
                                <button id="exit" text="退出" w="auto" style="Widget.AppCompat.Button.Colored" />
                            </horizontal>
                            
                        </vertical>
                    </ScrollView>
                </frame>
            </viewpager>
        </vertical>

    </drawer>
);

var name = ui.name.getText();

ui.exit.click(() => {
    toast("成功退出");
    engines.stopAll();
})
ui.dy_yh_1.click(() => {
    saved.put("dy_mode", "yh_1");
    engines.execScriptFile("抖音.js");
})
ui.dy_yh_2.click(() => {
    saved.put("dy_mode", "yh_2");
    engines.execScriptFile("抖音.js");
})

var intent = new Intent();
// vpnIntent.setAction("android.net.vpn.SETTINGS");
intent.setAction("android.settings.ACCESSIBILITY_SETTINGS"); //辅助功能
intent.setAction("android.settings.ADD_ACCOUNT_SETTINGS"); //添加账户
intent.setAction("android.settings.AIRPLANE_MODE_SETTINGS"); //系统设置首页
intent.setAction("android.settings.APN_SETTINGS"); //APN设置
intent.setAction("android.settings.APPLICATION_SETTINGS"); //应用管理
intent.setAction("android.settings.BATTERY_SAVER_SETTINGS"); //节电助手
intent.setAction("android.settings.BLUETOOTH_SETTINGS"); //蓝牙
intent.setAction("android.settings.CAPTIONING_SETTINGS"); //字幕
intent.setAction("android.settings.CAST_SETTINGS"); //无线显示
intent.setAction("android.settings.DATA_ROAMING_SETTINGS"); //移动网络
intent.setAction("android.settings.DATE_SETTINGS"); //日期和时间设置
intent.setAction("android.settings.DEVICE_INFO_SETTINGS"); //关于手机
intent.setAction("android.settings.DISPLAY_SETTINGS"); //显示设置
intent.setAction("android.settings.DREAM_SETTINGS"); //互动屏保设置
intent.setAction("android.settings.HARD_KEYBOARD_SETTINGS"); //实体键盘
intent.setAction("android.settings.HOME_SETTINGS"); //应用权限,默认应用设置,特殊权限
intent.setAction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS"); //忽略电池优化设置
intent.setAction("android.settings.INPUT_METHOD_SETTINGS"); //可用虚拟键盘设置
intent.setAction("android.settings.INPUT_METHOD_SUBTYPE_SETTINGS"); //安卓键盘语言设置(AOSP)
intent.setAction("android.settings.INTERNAL_STORAGE_SETTINGS"); //内存和存储
intent.setAction("android.settings.LOCALE_SETTINGS"); //语言偏好设置
intent.setAction("android.settings.LOCATION_SOURCE_SETTINGS"); //定位服务设置
intent.setAction("android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS"); //所有应用
intent.setAction("android.settings.MANAGE_APPLICATIONS_SETTINGS"); //应用管理
intent.setAction("android.settings.MANAGE_DEFAULT_APPS_SETTINGS"); //与ACTION_HOME_SETTINGS相同
intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION"); //在其他应用上层显示,悬浮窗
intent.setAction("android.settings.MANAGE_UNKNOWN_APP_SOURCES"); //安装未知应用 安卓8.0
intent.setAction("android.settings.action.MANAGE_WRITE_SETTINGS"); //可修改系统设置 权限
intent.setAction("android.settings.MEMORY_CARD_SETTINGS"); //内存与存储
intent.setAction("android.settings.NETWORK_OPERATOR_SETTINGS"); //可用网络选择
intent.setAction("android.settings.NFCSHARING_SETTINGS"); //NFC设置
intent.setAction("android.settings.NFC_SETTINGS"); //网络中的 更多设置
intent.setAction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"); //通知权限设置
intent.setAction("android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS"); //勿扰权限设置
intent.setAction("android.settings.ACTION_PRINT_SETTINGS"); //打印服务设置
intent.setAction("android.settings.PRIVACY_SETTINGS"); //备份和重置
intent.setAction("android.settings.SECURITY_SETTINGS"); //安全设置
intent.setAction("android.settings.SHOW_REGULATORY_INFO"); //监管信息
intent.setAction("android.settings.SOUND_SETTINGS"); //声音设置
intent.setAction("android.settings.SYNC_SETTINGS"); //添加账户设置
intent.setAction("android.settings.USAGE_ACCESS_SETTINGS"); //有权查看使用情况的应用
intent.setAction("android.settings.USER_DICTIONARY_SETTINGS"); //个人词典
intent.setAction("android.settings.VOICE_INPUT_SETTINGS"); //辅助应用和语音输入
intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
intent.setAction("android.settings.VR_LISTENER_SETTINGS"); //VR助手
intent.setAction("android.settings.WEBVIEW_SETTINGS"); //选择webview
intent.setAction("android.settings.WIFI_IP_SETTINGS"); //高级WLAN设置
intent.setAction("android.settings.WIFI_SETTINGS"); //选择WIFI,连接WIFI


app.startActivity(intent);

var f = '/sdcard/img/1.png';
app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,android.net.Uri.fromFile(java.io.File(f))));
这样再从APP中 就看不到刚才删除那张图片的缓存了.
