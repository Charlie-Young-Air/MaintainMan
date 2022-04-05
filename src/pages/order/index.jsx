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
    const token = Taro.getStorageSync('token')
    //若用户已经登录（用于用户退出小程序，之后再次进入）
    if (token) {
      Taro.showTabBar()
      this.setState({ isLogin: true })
    } else {
      //否则，开启消息订阅，接收用户的登录情况
      this.receiver = PubSub.subscribe('Login', (_, stateObj) => {
        this.setState(stateObj)
      })
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.receiver)
  }

  wxLogin = () => {
    Taro.login({
      success: (res) => {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          service.wxLogin(res.code).then(loginRes => {
            switch (loginRes.code) {
              //若登录成功，保存token
              case 200:
                Taro.setStorageSync('token', loginRes.data)
                this.setState({ isLogin: true })
                Taro.showTabBar({ animation: true })
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
              <AtButton onClick={this.wxLogin}>微信一键登录</AtButton>
            </View>
        }
      </View>
    )
  }
}
