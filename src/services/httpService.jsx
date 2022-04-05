import Taro from '@tarojs/taro'

//网络请求拦截器
const interceptor = (chain) => {
	const requestParams = chain.requestParams
	const { method, data, url } = requestParams
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
				// console.log(res.data)
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