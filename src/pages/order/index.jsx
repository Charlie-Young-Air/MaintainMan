import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { AtButton, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'
import PubSub from 'pubsub-js'
import service from '../../services/index'
import OrderMain from '../../components/order/OrderMain'
import './index.scss'

export default class Index extends Component {

  state = {
    isLogin: false,
    openToast: false,
    toastInfo: ''
  }

  componentDidMount() {
    Taro.hideTabBar()
    this.receiver = PubSub.subscribe('Login', (_, stateObj) => {
      this.setState(stateObj)
    })
    Taro.login({
      success: (res) => {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          service.wxLogin(res.code).then(loginRes => {
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

                service.getUserInfo().then(userInfo => {
                  if (userInfo.code === 200)
                    Taro.setStorageSync('role', userInfo.data.user_role)
                })
                break;
              //若用户第一次登录该小程序，则跳转到注册界面
              case 403:
                Taro.login({
                  success: (res) => {
                    this.setState({ openToast: true, toastInfo: loginRes.data })
                    setTimeout(() => {
                      Taro.navigateTo({ url: `/pages/wxRegister/index?wxCode=${res.code}` })
                    }, 500)
                  }
                })
            }
          })
        }
      }
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.receiver)
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
