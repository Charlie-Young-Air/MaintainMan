import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { AtForm, AtInput, AtToast } from 'taro-ui'
import Taro, { Current } from '@tarojs/taro'
import PubSub from 'pubsub-js'
import service from '../../services'
import './index.scss'

/**
 * 普通注册界面，暂时启用
 */

export default class Index extends Component {

	state = {
		account: '',
		password: '',
		nickName: '',
		isOpened: false              //判断Taro的Toast组件是否显示
	}

	componentDidMount() {
		//如果用户是从注册界面跳转过来的，那么就需要获取注册界面传递的参数
		if (Current.router.params.account) {
			const account = Current.router.params.account
			const password = Current.router.params.password
			this.setState({ account, password })
		}
	}

	//登录表单提交
	handleSubmit = () => {
		const { account, password } = this.state
		let data = {
			'account': account,
			'password': password
		}
		//将用户的登录信息发送到后端服务器，在成功的回调中获取后端传来的token
		service.login(data).then(loginRes => {
			console.log(loginRes)
			if (loginRes.code === 200) {
				Taro.setStorageSync('token', loginRes.data)
				PubSub.publish('Login', { isLogin: true })
				
				setTimeout(() => {
					Taro.switchTab({ url: '/pages/order/index' })
				}, 500)

				//每 20min 重新获取token
				const timer = setInterval(() => {
					service.ticket().then(res => {
						Taro.setStorageSync('token', loginRes.data)
					})
				}, 1200000)
				Taro.setStorageSync('timer', timer)

				this.setState({ isOpened: true })
			}
		})
	}

	saveFormData = (dataType) => {
		return (event) => {
			this.setState({ [dataType]: event })
		}
	}

	render() {
		const { account, password, isOpened } = this.state
		return (
			<View className='index'>

				<AtToast isOpened={isOpened} text="登录成功" />

				<AtForm onSubmit={this.handleSubmit}>
					<AtInput
						required
						name='account'
						title='账号'
						type='text'
						value={account}
						placeholder='账号/手机号/邮箱'
						onChange={this.saveFormData('account')}
					/>
					<AtInput
						required
						name='password'
						title='密码'
						type='password'
						value={password}
						onChange={this.saveFormData('password')}
					/>

					<Button formType='submit'>登录</Button>
				</AtForm>
			</View>
		)
	}
}
