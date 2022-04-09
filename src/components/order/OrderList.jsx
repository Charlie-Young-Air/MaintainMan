import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import OrderItem from './OrderItem'
import './index.scss'

export default class OrderList extends Component {

	render() {
		const { orderArr, role } = this.props
		return (
			<View className='index'>
				{
					orderArr.length === 0 ?
						<View>
							<Text>当前无待处理订单</Text>
						</View>
						:
						orderArr.map((order) => {
							if (order.id)
								return <OrderItem key={order.id} {...order} role={role} />
						})
				}
			</View>
		)
	}
}
