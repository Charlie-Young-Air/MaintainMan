import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { AtButton, AtToast, AtTabBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import PubSub from 'pubsub-js'
import userAPI from '../../api/user'
import './index.scss'

/**
 * 原定小程序主界面，现暂时弃用
 * */ 

export default class Index extends Component {

	render() {
		return (
			<View className='index'>
				<View>
					<AtButton onClick={this.wxLogin}>微信一键登录</AtButton>
					<AtButton onClick={userAPI.pageNavigate(0)}>普通登录</AtButton>
					<AtButton onClick={userAPI.pageNavigate(1)}>普通注册</AtButton>
				</View>
			</View>
		)
	}
}
