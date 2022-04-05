import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro'
import { AtForm, AtInput, AtMessage, AtToast } from 'taro-ui'
import PubSub from 'pubsub-js'
import service from '../../services/index'
import './index.scss'

export default class Index extends Component {

	state = {
		account: '',
		password: '',
		nickName: '',
		email: '',
		phone: '',
		password2: '',
		wxCode: '',
		openToast: false              //判断Taro的Toast组件是否显示
	}

	componentDidMount() {
		//用户首次使用该小程序时，从主界面接收微信登录的code
		if (Current.router.params.wxCode) {
			const wxCode = Current.router.params.wxCode
			this.setState({ wxCode })
		}
	}

	handleSubmit = () => {
		const { account, password, nickName, password2, phone, email, wxCode } = this.state

		//处理正则匹配(未完成)
		if (!account || !password || !nickName || !password2) {
			Taro.atMessage({
				'message': '请填写所有的必填项',
				'type': 'error',
			})
		} else if (password !== password2) {
			Taro.atMessage({
				'message': '两次输入的密码不一致',
				'type': 'error',
			})
		} else if (password.length <= 7) {
			Taro.atMessage({
				'message': '密码不符合规范',
				'type': 'error',
			})
		} else {
			let data = {
				'name': account,
				'password': password,
				'display_name': nickName,
				'phone': phone,
				'email': email,
				'code': wxCode
			}

			//请求注册用户
			service.wxRegister(data).then(registerRes => {
				switch (registerRes.code) {
					//若注册成功
					case 200:
						//通知/pages/user
						PubSub.publish('Login', { isLogin: true })
						this.setState({ openToast: true })
						//存储token
						Taro.setStorageSync('token', registerRes.data)
						//页面跳转
						setTimeout(() => {
							Taro.switchTab({ url: `/pages/order/index` })
							Taro.showTabBar({ animation: true })
						}, 500)
						break
					//若注册失败(暂时没遇到其他错误码)
					case 422:
						Taro.atMessage({
							'message': registerRes.data,
							'type': 'error',
						})
						break
				}
			})
		}
	}

	//表单的onChange()方法
	saveFormData = (dataType) => {
		return (event) => {
			this.setState({ [dataType]: event })
		}
	}


	render() {
		const { account, nickName, password, password2, phone, email, openToast } = this.state
		return (
			<View className='index'>
				<AtMessage />
				<AtToast isOpened={openToast} text="注册成功" />
				<AtForm onSubmit={this.handleSubmit}>
					<AtInput
						required
						name='account'
						title='账号'
						type='text'
						value={account}
						onChange={this.saveFormData('account')}
					/>
					<AtInput
						required
						name='nickName'
						title='昵称'
						type='text'
						value={nickName}
						onChange={this.saveFormData('nickName')}
					/>
					<AtInput
						required
						name='password'
						title='密码'
						type='password'
						value={password}
						onChange={this.saveFormData('password')}
					/>
					<AtInput
						required
						name='password'
						title='确认密码'
						type='password'
						value={password2}
						onChange={this.saveFormData('password2')}
					/>
					<AtInput
						name='phone'
						title='手机号'
						type='phone'
						value={phone}
						onChange={this.saveFormData('phone')}
					/>
					<AtInput
						name='email'
						title='邮箱'
						type='email'
						value={email}
						onChange={this.saveFormData('email')}
					/>
					<Button formType='submit'>注册</Button>
				</AtForm>
			</View>
		)
	}
}
