import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtMessage, AtList, AtListItem, AtCard, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import Taro from '@tarojs/taro'
import service from '../../services/index'
import './index.scss'

export default class OrderItem extends Component {
	state = {
		openModel: false
	}

	detailClick = () => {
		console.log(this.props)
		const { address, contact_name, contact_phone, content, title } = this.props
		Taro.navigateTo({ url: `/pages/orderDetail/index?address=${address}&contact_name=${contact_name}&contact_phone=${contact_phone}&content=${content}&title=${title}` })
	}

	cancelOrder = () => {
		this.setState({ openModel: true })
	}

	handleClose = () => {
		this.setState({ openModel: false })
	}

	handleConfirm = () => {
		const { id } = this.props
		service.cancelOrder(id).then(res => {
			const statusCode = Taro.getStorageSync('statusCode')
			if (statusCode === 204) {
				if (getCurrentPages().length != 0) {
					//刷新当前页面的数据
					setTimeout(() => {
						getCurrentPages()[getCurrentPages().length - 1].onLoad()
					}, 500)
					this.setState({ openModel: false })
					Taro.atMessage({
						'message': '取消成功',
						'type': 'success',
					})
				}
			}
		})
	}

	render() {
		const { title, address } = this.props
		const { openModel } = this.state
		return (
			<View className='index'>
				<AtMessage />
				<AtModal
					isOpened={openModel}
					title='确认框'
					cancelText='取消'
					confirmText='确认'
					onCancel={this.handleClose}
					onClose={this.handleClose}
					onConfirm={this.handleConfirm}
					content='确定取消该订单吗？'
				/>
				<AtList hasBorder={false}>
					<AtCard
						isFull={true}
						title={address}
					>
						<AtListItem
							hasBorder={false}
							title={title}
						/>
						<View className='at-row'>
							<View className='at-col at-col-6'></View>
							<View className='at-col at-col-3'>
								<AtButton onClick={this.detailClick}>订单详情</AtButton>
							</View>
							<View className='at-col at-col-3'>
								<AtButton onClick={this.cancelOrder}>取消订单</AtButton>
							</View>
						</View>
					</AtCard>
				</AtList>
			</View>
		)
	}
}
