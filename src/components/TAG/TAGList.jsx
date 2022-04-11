import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import TAGItem from './TAGItem'
import './index.scss'

/**
 * tags列表，暂时弃用
 */

export default class TAGList extends Component {

	render() {
		const { tagArr } = this.props
		return (
			<View style='margin-bottom:15px' className='at-row at-row--wrap at-row__align--center'>
				{
					tagArr.map(tag => {
						if (tag.id) {
							return (
								<TAGItem key={tag.id} {...tag} />
							)
						}
					})
				}
			</View>
		)
	}
}
