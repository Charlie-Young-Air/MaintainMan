import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class OrderItem extends Component {
	state = {
		isOpen: false,                    //taro ui 组件 “手风琴” 列表是否展开
		note: '点击展开',
	}

	handleClick = () => {
		const { isOpen } = this.state
		if (!isOpen)
			this.setState({ note: '点击关闭', isOpen: !isOpen })
		else
			this.setState({ note: '点击展开', isOpen: !isOpen })
	}

	render() {
		const { title, address, contact_name, contact_phone, content } = this.props
		const { isOpen, note } = this.state
		return (
			<View className='index'>
				<AtAccordion
					isAnimation={true}
					open={isOpen}
					note={note}
					onClick={this.handleClick}
					title={title}
				>
					<AtList hasBorder={false}>
						<AtListItem
							title={'地址：' + address}
							thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
						/>
						<AtListItem
							title={'联系人：' + contact_name}
							thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
						/>
						<AtListItem
							title={'联系电话：' + contact_phone}
							thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
						/>
						<AtListItem
							title={'详细信息：' + content}
							thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
						/>
					</AtList>
				</AtAccordion>
			</View>
		)
	}
}
