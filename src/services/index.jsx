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
	getCurOrder(info) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/order/user`,
			data: JSON.stringify(info)
		})
	},

	//获取所有的TAG(测试使用)
	getAllTAG() {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/tag/sort`
		})
	},

	//获取指定类型的TAG
	getTAG(category) {
		return httpService.get({
			url: `${apiConfig.baseUrl}/v1/tag/sort/${category}`
		})
	}

}

export default service