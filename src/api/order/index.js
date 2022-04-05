import Taro from '@tarojs/taro'

const orderAPI = {
	pageNavigate(pageSeq) {
		return () => {
			switch (pageSeq) {
				case 0:
					Taro.navigateTo({
						url: `/pages/order_create/index`
					})
					break
				case 1:
					Taro.navigateTo({
						url: `/pages/order_pending/index`
					})
					break
				case 2:
					Taro.navigateTo({
						url: `/pages/order_underway/index`
					})
					break
				case 3:
					Taro.navigateTo({
						url: `/pages/order_finish/index`
					})
					break
				case 4:
					Taro.navigateTo({
						url: `/pages/order_commented/index`
					})
					break
			}
		}
	}
}


export default orderAPI