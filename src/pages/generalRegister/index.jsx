import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtMessage, AtToast } from 'taro-ui'
import service from '../../services/index'
import './index.scss'

/**
 * 普通登录界面，暂时弃用
 */

export default class Index extends Component {

	state = {
		account: '',
		password: '',
		nickName: '',
		email: '',
		phone: '',
		password2: '',
		isOpened: false              //判断Taro的Toast组件是否显示
	}

	handleSubmit = () => {
		const { account, password, nickName, password2, phone, email } = this.state

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
				'email': email
			}
			service.register(data).then(registerRes => {
				// console.log(registerRes)
				switch (registerRes.code) {
					case 201:
						this.setState({ isOpened: true })
						setTimeout(() => {
							Taro.navigateTo({ url: `/pages/generalLogin/index?account=${account}&password=${password}` })
						}, 500)
						break
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

	saveFormData = (dataType) => {
		return (event) => {
			this.setState({ [dataType]: event })
		}
	}


	render() {
		const { account, nickName, password, password2, phone, email, isOpened } = this.state
		return (
			<View className='index'>
				<AtMessage />
				<AtToast isOpened={isOpened} text="注册成功" />
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
