import Taro from '@tarojs/taro'
import service from '../../services/index'

const userAPI = {


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
