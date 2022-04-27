import Taro from '@tarojs/taro'
import qs from 'qs'

//网络请求拦截器
const interceptor = (chain) => {
	const requestParams = chain.requestParams
	const { method, data, url } = requestParams

	//GET请求传参（字符串拼接。。。）
	// console.log(`http ${method || 'GET'} --> ${url} data: `, data)
	if (method === 'GET') {
		if (data) {
			requestParams.url = requestParams.url + '?' + qs.stringify(requestParams.data, { indices: false });
			console.log(requestParams.url)
			requestParams.data = undefined;
		}
	}

	//添加token
	try {
		const token = Taro.getStorageSync('token')
		// console.log(token)
		if (token) {
			requestParams.header = {
				...requestParams.header,
				Authorization: 'Bearer ' + token
			}
		}
	} catch (e) {
		// Do something when catch error
	}

	return chain.proceed(requestParams)
		.then(res => {
			// console.log(`http <-- ${url} result:`, res)
			return res.data
		})
}
Taro.addInterceptor(interceptor)


// options object
// {
// 	url:string
// 	data:json
// 	header:json
// }

export default {
	request(options, method) {
		return Taro.request({
			...options,
			method,
			header: {
				'content-type': 'application/json',
				...options.header
			},
			success: function (res) {
				Taro.setStorageSync('statusCode', res.statusCode)
				// console.log(res.statusCode)
			}
		})
	},
	get(options) {
		return this.request(options, 'GET')
	},
	post(options) {
		return this.request(options, 'POST')
	}
}