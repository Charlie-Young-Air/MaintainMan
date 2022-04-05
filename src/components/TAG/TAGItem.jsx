import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.scss'

export default class TAGItem extends Component {
	state = {
		isActive: false
	}

	clickTAG = (event) => {
		const isActive = event.active
		this.setState({ isActive: !isActive })
	}


	render() {
		const { name } = this.props
		const { isActive } = this.state
		return (
			<View style='margin:2px' className='at-col at-col-1 at-col--auto'>
				<AtTag 
					name={name}
					type='primary'
					size='normal'
					circle
					active={isActive}
					onClick={this.clickTAG}
				>
					{name}
				</AtTag>
			</View>
		)
	}
}
