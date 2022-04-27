import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import OrderItem from './OrderItem'
import './index.scss'

/**
 *  各种订单列表内容模板，目前在 /pages/order_pending/index 中被使用
 */

export default class OrderList extends Component {
	render() {
		const { orderArr } = this.props
		return (
			<View className='index'>
				{
					orderArr === null || orderArr.length === 0 ?
						<View>
							<AtDivider content='没有更多了' fontColor='#ed3f14' lineColor='#ed3f14' />
						</View>
						:
						<View>
							{
								orderArr.map((order) => {
									if (order.id)
										return <OrderItem key={order.id} {...order} />
								})
							}
						</View>

				}
			</View>
		)
	}
}
