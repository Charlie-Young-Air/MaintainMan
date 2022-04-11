import Taro from '@tarojs/taro'

const userAPI = {

	//暂时废弃
	pageNavigate(pageSeq) {
		return () => {
			switch (pageSeq) {
				case 0:
					Taro.navigateTo({
						url: `/pages/generalLogin/index`
					})
					break
				case 1:
					Taro.navigateTo({
						url: `/pages/generalRegister/index`
					})
					break
			}
		}
	},

}

export default userAPI
