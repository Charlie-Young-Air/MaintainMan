import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default class OrderMain extends Component {

	state = {
		openToast: false,
		toastInfo: ''
	}

	pageNavigate(pageSeq) {
		const token = Taro.getStorageSync('token')
		if (token)
			return () => {
				switch (pageSeq) {
					case 0:
						Taro.navigateTo({
							url: `/pages/order_create/index`
						})
						break
					case 1:
						Taro.navigateTo({
							url: `/pages/order_pending/index`
						})
						break
					case 2:
						Taro.navigateTo({
							url: `/pages/order_underway/index`
						})
						break
					case 3:
						Taro.navigateTo({
							url: `/pages/order_finish/index`
						})
						break
					case 4:
						Taro.navigateTo({
							url: `/pages/order_commented/index`
						})
						break
				}
			}
		else 
			this.setState({openToast:true,toastInfo:'登录过期，请重新登录'})
	}

	render() {
		const { openToast, toastInfo } = this.state
		return (
			<View className='index'>
				<AtToast isOpened={openToast} text={toastInfo}></AtToast>
				<AtList>
					<AtListItem title='订单管理' disabled />
					<AtListItem
						title='创建订单'
						arrow='right'
						thumb={require('../../resource/create_order.png')}
						onClick={this.pageNavigate(0)}
					/>
					<AtListItem
						title='待处理'
						arrow='right'
						thumb={require('../../resource/pending_order.png')}
						onClick={this.pageNavigate(1)}
					/>
					<AtListItem
						title='进行中'
						arrow='right'
						thumb={require('../../resource/underway_order.png')}
						onClick={this.pageNavigate(2)}
					/>
					<AtListItem
						title='已完成'
						arrow='right'
						thumb={require('../../resource/finished_order.png')}
						onClick={this.pageNavigate(3)}
					/>
					<AtListItem
						title='已评价'
						arrow='right'
						thumb={require('../../resource/commented_order.png')}
						onClick={this.pageNavigate(4)}
					/>
				</AtList>
			</View>
		)
	}
}
