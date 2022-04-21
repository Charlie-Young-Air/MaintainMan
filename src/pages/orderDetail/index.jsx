import { Component } from 'react'
import { View, Text, Picker, Button, Image } from '@tarojs/components'
import { AtInput, AtForm, AtImagePicker, AtList, AtListItem, AtCard } from 'taro-ui'
import Taro, { Current } from '@tarojs/taro'
import service from '../../services/index'
import apiConfig from '../../services/apiConfig'

export default class Index extends Component {
	state = {
		title: '',
		address: '',
		contact_name: '',
		contact_phone: '',
		content: '',
		imageID: [],
		images: []
	}
	componentDidMount() {
		const { imageID } = this.state
		let images = []
		for (let i = 0; i < imageID.length; i++)
			service.getImage(imageID[i]).then(res => {
				images.push(res)
			})
		this.setState({ images: images })
		if (Current.router.params) {
			// console.log(Current.router.params)
			const params = Current.router.params
			this.setState({
				title: params.title,
				address: params.address,
				contact_name: params.contact_name,
				contact_phone: params.contact_phone,
				content: params.content
			})
		}
	}


	render() {
		const { title, address, contact_name, contact_phone, content, images } = this.state
		return (
			<View className='index'>
				<AtList>
					<AtListItem title='报修信息' extraText={title} />
					<AtListItem title='地址' extraText={address} />
					<AtListItem title='联系方式' extraText={contact_phone} />
					<AtListItem title='报修人' extraText={contact_name} />
					<AtCard
						title='详细内容'
						isFull={true}
					>
						<Text>{content}</Text>
						{
							images.length === 0 ? <View></View> :
								<View>{images[0]}</View>
						}
					</AtCard>
				</AtList>

			</View>
		)
	}
}