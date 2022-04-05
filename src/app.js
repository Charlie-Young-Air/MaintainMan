import { View } from '@tarojs/components'
import { Component } from 'react'
import { AtTabBar } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
