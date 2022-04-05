import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import orderAPI from '../../api/order'
import './index.scss'

export default class OrderMain extends Component {
	render() {
		return (
			<View className='index'>
				<AtList>
					<AtListItem title='订单管理' disabled />
					<AtListItem
						title='创建订单'
						arrow='right'
						thumb={require('../../resource/create_order.png')}
						onClick={orderAPI.pageNavigate(0)}
					/>
					<AtListItem
						title='待处理'
						arrow='right'
						thumb={require('../../resource/pending_order.png')}
						onClick={orderAPI.pageNavigate(1)}
					/>
					<AtListItem
						title='进行中'
						arrow='right'
						thumb={require('../../resource/underway_order.png')}
						onClick={orderAPI.pageNavigate(2)}
					/>
					<AtListItem
						title='已完成'
						arrow='right'
						thumb={require('../../resource/finished_order.png')}
						onClick={orderAPI.pageNavigate(3)}
					/>
					<AtListItem
						title='已评价'
						arrow='right'
						thumb={require('../../resource/commented_order.png')}
						onClick={orderAPI.pageNavigate(4)}
					/>
				</AtList>
			</View>
		)
	}
}
