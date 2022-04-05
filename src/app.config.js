export default defineAppConfig({
  pages: [
    'pages/order/index',
    'pages/user/index',
    'pages/order_create/index',
    'pages/order_pending/index',
    'pages/order_underway/index',
    'pages/order_finish/index',
    'pages/order_commented/index',
    'pages/generalLogin/index',
    'pages/generalRegister/index',
    'pages/wxRegister/index'
  ],
  tabBar: {
    list: [{
      selectedIconPath: 'resource/order_cur.png',
      iconPath: 'resource/order_pre.png',
      pagePath: 'pages/order/index',
      text: '订单',
    },
    {
      selectedIconPath: 'resource/user_cur.png',
      iconPath: "resource/user_pre.png",
      pagePath: 'pages/user/index',
      text: '用户'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
