import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default class OrderItem extends Component {

	handleClick = () => {
		// console.log(this.props)
		const { address, contact_name, contact_phone, content, title } = this.props
		Taro.navigateTo({ url: `/pages/orderDetail/index?address=${address}&contact_name=${contact_name}&contact_phone=${contact_phone}&content=${content}&title=${title}` })
	}
	render() {
		const { title, address } = this.props
		return (
			<View className='index'>
				<AtList hasBorder={false}>
					<AtListItem
						onClick={this.handleClick}
						title={title}
						extraText={address}
						arrow='right'
					/>
				</AtList>
			</View>
		)
	}
}
