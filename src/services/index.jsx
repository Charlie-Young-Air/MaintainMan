import httpService from './httpService'
import apiConfig from './apiConfig'

const service = {
	//微信快捷登录
	wxLogin(code) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/wxlogin`,
			data: {
				code
			}
		})
	},

	//验证token
	ticket() {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/renew`,
		})
	},

	//普通注册
	register(info) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/register`,
			data: JSON.stringify(info)
		})
	},

	//wx注册
	wxRegister(info) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/wxregister`,
			data: JSON.stringify(info)
		})
	},

	//普通登录
	login(info) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/login`,
			data: JSON.stringify(info)
		})
	},

	//获取当前用户信息
	getUserInfo() {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/user`
		})
	},

	//创建订单
	createOrder(info) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/order`,
			data: JSON.stringify(info)
		})
	},

	//获取用户当前订单
	getCurUserOrder(info) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/order/user`,
			// data: JSON.stringify(info)
			data: info
		})
	},

	//获取维修工的订单
	getCurMTOrder(info) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/order/repairer`,
			data: info
		})
	},

	//获取指定类型的TAG
	getTAG(category) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/tag/sort/${category}`
		})
	},

	//获取图片
	getImage(id) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/image/${id}`
		})
	},

	//取消订单
	cancelOrder(id) {
		return httpService.post({
			url: `${apiConfig.baseUrl}/v1/order/${id}/cancel`
		})
	},

}

export default service