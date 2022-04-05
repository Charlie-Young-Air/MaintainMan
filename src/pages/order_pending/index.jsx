import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTag } from 'taro-ui'
import OrderList from '../../components/order/OrderList'
import TAGList from '../../components/TAG/TAGList'
import service from '../../services/index'

export default class Index extends Component {
  state = {
    orderArr: [],
    tagArr: [
      { id: 1, name: '教学楼A' },
      { id: 2, name: '教学楼B' },
      { id: 3, name: '教学楼C' },
      { id: 4, name: '1舍' },
      { id: 5, name: '2舍' },
      { id: 6, name: '3舍' },
    ],
  }

  componentDidShow() {
    let data = {
      status: 0
    }
    service.getCurOrder(data).then(res => {
      if (res.code === 200 && res.data) {
        this.setState({ orderArr: res.data })
      }
    })
    service.getTAG().then(res => {
      console.log(res)
      if (res.code === 200 && res.data) {
        this.setState({ TAG: res.data })
      }
    })
  }

  render() {
    const { orderArr, tagArr } = this.state
    return (
      <View className='index'>
        <TAGList className='at-row' tagArr={tagArr} />
        <OrderList orderArr={orderArr} />
      </View>
    )
  }
}