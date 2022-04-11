import { Component } from 'react'
import { View, Text, Picker, Button } from '@tarojs/components'
import { AtInput, AtForm, AtImagePicker, AtList, AtListItem, AtMessage } from 'taro-ui'
import Taro from '@tarojs/taro'
import service from '../../services/index'
import tagAPI from '../../api/TAG/index'
import apiConfig from '../../services/apiConfig'

export default class Index extends Component {

  state = {
    contact_name: '',
    contact_phone: '',
    title: '',                  //订单简述
    detailedAddress: '',        //详细地址
    TAGs: [],                   //向后端发送的tags
    content: '',                //额外内容
    addressArr: [],             //展示给用户的所有地址
    tagArr: [],                 //后端返回的所有tags
    addressChecked: '',         //用户选中的地址tag， 【向后端传参的形式是 'address': addressChecked + detailedAddress】
    images: []
  }

  //请求后端，获取TAGs，此处获取的是 ‘楼名’
  componentDidMount() {
    const { addressArr } = this.state
    let newAddArr = addressArr
    service.getTAG('楼名').then(res => {
      console.log(res)
      if (res.status && res.data) {
        res.data.sort(tagAPI.sortBy('id', 1)).map((tag) => {
          newAddArr = [...newAddArr, tag.name]
        })
        this.setState({
          addressArr: newAddArr,
          tagArr: res.data,
          addressChecked: res.data.sort(tagAPI.sortBy('id', 1))[0].name,
          TAGs: [1]
        })
      }
    })
  }

  handleSubmit = () => {
    const { contact_name, contact_phone, title, addressChecked, content, detailedAddress, TAGs, images } = this.state
    if (!contact_name || !contact_phone || !title) {
      Taro.atMessage({
        'message': '请填写所有的必填项',
        'type': 'error',
      })
    } else {
      //data是向后端发送的所有参数
      let data = {
        'title': title,
        'contact_name': contact_name,
        'contact_phone': contact_phone,
        'address': addressChecked + detailedAddress,
        'tags': TAGs,
        'content': content,
      }
      service.createOrder(data).then(res => {
        console.log(res)
        if (res.code === 201) {
          console.log('创建订单成功')
          Taro.switchTab({ url: `/pages/order/index` })
        }
      })
    }
  }

  //供表单的onChange方法调用，更新state中对应表单项的信息
  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event })
    }
  }

  //用户选择地址相关的tags
  chooseAddress = (e) => {
    this.setState({ addressChecked: this.state.addressArr[e.detail.value], TAGs: [Number(e.detail.value) + 1] })
  }

  //选择图片
  imageChange = (image) => {
    console.log(image)
    // this.setState({ images: image })
    Taro.uploadFile({
      url: `${apiConfig.baseUrl}/image`, //仅为示例，非真实的接口地址
      filePath: image[0].url,
      name: 'image',
      success (res){
        // const data = res.data
        console.log(res)
      }
    })
  }

  //点击图片展示高清大图（未完成）
  imageClick = (e) => {
    const {images} = this.state
    console.log(images[e].url)
  }

  render() {
    const { addressArr, contact_name, contact_phone, content, addressChecked, title, detailedAddress, images } = this.state
    return (
      <View className='index'>
        <AtMessage />
        <AtForm onSubmit={this.handleSubmit}>
          <AtInput
            required
            name='title'
            title='报修信息'
            type='text'
            placeholder='请输入报修信息'
            value={title}
            onChange={this.saveFormData('title')}
          />
          <AtInput
            required
            name='contact_phone'
            title='联系电话'
            type='phone'
            placeholder='电话号码'
            value={contact_phone}
            onChange={this.saveFormData('contact_phone')}
          />
          <AtInput
            required
            name='contact_name'
            title='联系人'
            type='text'
            placeholder='联系电话的所有者'
            value={contact_name}
            onChange={this.saveFormData('contact_name')}
          />
          <View className='at-row at-row__align--end'>
            <View className='at-col at-col-5'>
              <Picker mode='selector' range={addressArr} onChange={this.chooseAddress}>
                <AtList>
                  <AtListItem
                    title='地址'
                    extraText={addressChecked}
                  />
                </AtList>
              </Picker>
            </View>
            <View className='at-col at-col-7'>
              <AtInput
                required
                name='detailedAddress'
                title='详细地址'
                placeholder='如：427'
                value={detailedAddress}
                onChange={this.saveFormData('detailedAddress')}
              />
            </View>
          </View>
          <AtInput
            name='content'
            title='详细内容'
            type='text'
            value={content}
            onChange={this.saveFormData('content')}
          />
          <AtImagePicker
            multiple
            files={images}
            onChange={this.imageChange}
            onImageClick={this.imageClick}
          />
          <Button formType='submit'>提交</Button>
        </AtForm>
      </View>
    )
  }
}