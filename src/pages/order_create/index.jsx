import { Component } from 'react'
import { View, Text, Picker, Button } from '@tarojs/components'
import { AtInput, AtForm, AtImagePicker, AtList, AtListItem, AtMessage } from 'taro-ui'
import Taro from '@tarojs/taro'
import service from '../../services/index'

export default class Index extends Component {

  state = {
    contact_name: '',
    contact_phone: '',
    title: '',
    content: '',
    addressArr: ['教学楼A', '教学楼B', '教学楼C'],
    addressChecked: ''
  }

  handleSubmit = () => {
    const { contact_name, contact_phone, title, addressChecked, content } = this.state
    if (!contact_name || !contact_phone || !title || !addressChecked) {
      Taro.atMessage({
        'message': '请填写所有的必填项',
        'type': 'error',
      })
    } else {
      let data = {
        'title': title,
        'contact_name': contact_name,
        'contact_phone': contact_phone,
        'address': addressChecked,
        'content': content
      }
      service.createOrder(data).then(res => {
        console.log(res)
        if (res.code === 201) {
          console.log('创建订单成功')
          Taro.navigateTo({ url: `/pages/order_pending/index` })
        }
      })
    }
  }

  handleTAG = () => {

  }

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event })
    }
  }

  chooseAddress = (e) => {
    this.setState({ addressChecked: this.state.addressArr[e.detail.value] })
  }

  render() {
    const { addressArr, contact_name, contact_phone, content, addressChecked, title } = this.state
    return (
      <View className='index'>
        <AtMessage />
        <AtForm onSubmit={this.handleSubmit}>
          <AtInput
            required={true}
            name='title'
            title='报修信息'
            type='text'
            placeholder='请输入报修信息'
            value={title}
            onChange={this.saveFormData('title')}
          />
          <AtInput
            required={true}
            name='contact_phone'
            title='联系电话'
            type='phone'
            placeholder='电话号码'
            value={contact_phone}
            onChange={this.saveFormData('contact_phone')}
          />
          <AtInput
            required={true}
            name='contact_name'
            title='联系人'
            type='text'
            placeholder='联系电话的所有者'
            value={contact_name}
            onChange={this.saveFormData('contact_name')}
          />
          <Picker mode='selector' range={addressArr} onChange={this.chooseAddress} onClick={this.handleTAG}>
            <AtList>
              <AtListItem
                title='报修地址'
                extraText={addressChecked}
              />
            </AtList>
          </Picker>
          <AtInput
            name='content'
            title='详细信息'
            value={content}
            onChange={this.saveFormData('content')}
          />
          <AtImagePicker
            multiple
          />
          <Button formType='submit'>提交</Button>
        </AtForm>
      </View>
    )
  }
}