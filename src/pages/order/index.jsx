import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { AtButton, AtToast } from 'taro-ui'
import Taro, { login } from '@tarojs/taro'
import PubSub from 'pubsub-js'
import service from '../../services/index'
import OrderMain from '../../components/order/OrderMain'
import './index.scss'

export default class Index extends Component {

  state = {
    isLogin: false,             //是否已经登录，主要用于页面展示判断
    openToast: false,           //是否显示提示框
    toastInfo: ''               //提示框内容
  }

  componentDidMount() {
    Taro.hideTabBar()        //隐藏底部导航栏，用户登录成功后展示

    //基于PubSub的组件间通信，监听以Login为标题的信息，并setState
    this.receiver = PubSub.subscribe('Login', (_, stateObj) => {
      this.setState(stateObj)
    })
    //如果用户token存在，则直接登录，否则重新向后端发起登录请求(此处还需要完善，解析token来判定过期时间)
    const token = Taro.getStorageSync('token')
    if (!token)
      Taro.login({
        success: (res) => {
          if (res.code) {
            //发起网络请求
            service.wxLogin(res.code).then(loginRes => {
              // console.log(loginRes)
              switch (loginRes.code) {
                //若登录成功，保存token，并设置token请求器(每20s请求刷新一次token)
                case 200:
                  Taro.setStorageSync('token', loginRes.data)
                  this.setState({ isLogin: true })
                  Taro.showTabBar({ animation: true })
                  const timer = setInterval(() => {
                    service.ticket().then(res => {
                      Taro.setStorageSync('token', res.data)
                    })
                  }, 1000000)
                  Taro.setStorageSync('timer', timer)
                  //请求后端，获取用户信息，存储userInfo.data.user_role
                  service.getUserInfo().then(userInfo => {
                    if (userInfo.code === 200)
                      Taro.setStorageSync('role', userInfo.data.user_role)
                  })
                  break;
                //若用户第一次登录该小程序，则跳转到注册界面
                case 403:
                  Taro.login({
                    success: (res) => {
                      this.setState({ openToast: true, toastInfo: "首次使用请先完善个人信息" })
                      setTimeout(() => {
                        Taro.navigateTo({ url: `/pages/wxRegister/index?wxCode=${res.code}` })
                      }, 800)
                    }
                  })
              }
            })
          }
        }
      })
    else {
      this.setState({ isLogin: true })
      Taro.showTabBar({ animation: true })
      service.ticket().then(res => {
        Taro.setStorageSync('token', res.data)
      })
      const timer = setInterval(() => {
        service.ticket().then(res => {
          Taro.setStorageSync('token', res.data)
        })
      }, 1000000)
      Taro.setStorageSync('timer', timer)
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.receiver)
    //关闭更新token的定时器
    const timer = Taro.getStorageSync('timer')
    clearInterval(timer)
    Taro.clearStorageSync()
  }

  render() {
    const { isLogin, openToast, toastInfo } = this.state
    return (
      <View className='index'>
        {
          isLogin ?
            <OrderMain />
            :
            <View>
              <AtToast isOpened={openToast} text={toastInfo} />
            </View>
        }
      </View>
    )
  }
}
