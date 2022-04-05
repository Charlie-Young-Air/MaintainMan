import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import PubSub from 'pubsub-js'
import service from '../../services'
import './index.scss'

export default class Index extends Component {

  state = {
    nickName: '',           //用户昵称
    role: '游客模式',        //用户角色
    isLogin: false          //是否登录成功
  }

  componentDidMount() {
    const token = Taro.getStorageSync('token')
    //若token存在，说明用户已经登录，则向后端请求用户信息
    if (token) {
      service.getUserInfo().then(userInfo => {
        if (userInfo.code === 200) {
          this.setState({
            nickName: userInfo.data.display_name,
            role: userInfo.data.role.display_name,
            isLogin: true,
          })
        }
      })
    } else {
      //若tokne不存在，则开启消息订阅（此处的设计以后可能会删除，不必过多在意）
      //由于目前可以隐藏tabbar，所以该处设计并非必要，但不建议删除，可能会有手速过快的bug
      this.receiver = PubSub.subscribe('Login', (_, stateObj) => {
        this.setState(stateObj)
        service.getUserInfo().then(userInfo => {
          if (userInfo.code === 200) {
            this.setState({
              nickName: userInfo.data.display_name,
              role: userInfo.data.role.display_name,
            })
          }
        })
      })
    }
  }

  componentWillUnmount() {
    if (this.receiver)
      PubSub.unsubscribe(this.receiver)
  }

  //让用户可以在user界面实现登录，原理和/pages/order相似
  wxLogin = () => {
    Taro.login({
      success: (res) => {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          service.wxLogin(res.code).then(loginRes => {
            if (loginRes.code === 200) {
              Taro.setStorageSync('token', loginRes.data)
              //请求用户信息
              service.getUserInfo().then(userInfo => {
                if (userInfo.code === 200) {
                  this.setState({
                    nickName: userInfo.data.display_name,
                    role: userInfo.data.role.display_name,
                    isLogin: true
                  })
                  Taro.showTabBar({ animation: true })
                  PubSub.publish('Login', { isLogin: true })
                }
              })
            }
          })
        }
      }
    })

  }

  //退出登录
  handleExit = () => {
    const token = Taro.getStorageSync('token')
    //如果当前为登录状态，则执行退出登录
    if (token) {
      //关闭更新token的定时器
      const timer = Taro.getStorageSync('timer')
      clearInterval(timer)
      //清除所有数据缓存
      Taro.clearStorageSync()
      this.setState({ nickName: '', role: '游客模式', isLogin: false })
      //通知主界面，当前已经处于退出状态
      PubSub.publish('Login', { isLogin: false})
      //隐藏tabbar
      Taro.hideTabBar()
    }
  }

  render() {
    const { nickName, role, isLogin } = this.state
    return (
      <View className='index' >
        {
          isLogin ?
            <View>
              <View className='at-row'>
                <View className='at-col at-col-4'>
                  <AtAvatar circle text={nickName} />
                </View>
                <View className='at-row at-row__align--center'>{nickName}</View>
                <View className='at-row at-row__align--center'>{role}</View>
              </View>
              <AtButton onClick={this.handleExit}>退出登录</AtButton>
            </View>
            :
            <View>
              <View className='at-row'>
                <View className='at-col at-col-3'>
                  <AtAvatar circle text='游客' />
                </View>
                <View className='at-row at-row__align--center'>{role}</View>
              </View>
              <AtButton onClick={this.wxLogin}>点击登录</AtButton>
            </View>
        }
      </View>
    )
  }
}