import { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTag, AtList, AtListItem } from 'taro-ui'
import OrderList from '../../components/order/OrderList'
import service from '../../services/index'
import tagAPI from '../../api/TAG/index'

export default class Index extends Component {
  state = {
    orderArr: [],
    tagAll: [],             //从后端获取的所有TAGs
    pickArr: ['全部'],      //Picker中向用户展示的TAGs
    tagChecked: '全部',
    role: ''
  }

  componentDidShow() {
    this.setState({ role: Taro.getStorageSync('role') })
    const { role } = this.state
    if (role === 'user') {
      let data = {
        'status': '1'
      }
      //获取当前用户的所有待处理订单
      service.getCurUserOrder(data).then(res => {
        if (res.code === 200 && res.data) {
          this.setState({ orderArr: res.data })
        }
      })
    } else if (role === 'maintainer') {
      let data = {
        'status': '1',
        'current': true
      }
      //获取当前维修工的所有待处理订单
      service.getCurMTOrder(data).then(res => {
        if (res.code === 200 && res.data) {
          this.setState({ orderArr: res.data })
        }
      })
    }

    service.getTAG('楼名').then(res => {
      if (res.status && res.data) {
        let nameArr = this.state.pickArr
        const sortArr = res.data.sort(tagAPI.sortBy('id', 1))
        sortArr.map((obj) => {
          nameArr = [...nameArr, obj.name]
        })
        this.setState({ tagAll: sortArr, pickArr: nameArr })
      }
    })
  }

  chooseTag = (e) => {
    let data = {
      'current': true,
      'status': '1',
      'tags': [Number(e.detail.value)],
      'conjunctve': true
    }
    service.getCurMTOrder(data).then(res => {
      this.setState({
        tagChecked: this.state.pickArr[e.detail.value],
        orderArr: res.data
      })
    })
  }

  render() {
    const { orderArr, pickArr, tagChecked, role } = this.state
    return (
      <View className='index'>
        {
          role === 'maintainer' ?
            <Picker mode='selector' range={pickArr} onChange={this.chooseTag}>
              <AtList>
                <AtListItem
                  title='点击筛选'
                  extraText={tagChecked}
                />
              </AtList>
            </Picker> :
            <View></View>
        }
        <OrderList orderArr={orderArr} role={role} />
      </View>
    )
  }
}