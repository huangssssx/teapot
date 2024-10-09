const baseURL = 'https://www.xiangwutang.com:8080'; // 基础URL
import { queryParamsFromObject } from "@/utils/queryParams.js"
import { getToken } from "@/utils/storage.js"

let token = "";
const httpRequest = (options) => {
  // 请求拦截器
  const requestInterceptor = (opts) => {
    // 获取token
    if(token === ""){
      token = getToken();
    }
    // 在这里可以添加请求头、参数等
    opts.header = {
      ...opts.header,
      'Authorization': token
    };
    console.log('Request Intercepted:', opts);
    return opts;
  };

  // 响应拦截器
  const responseInterceptor = (response) => {
    // 在这里可以处理响应，例如错误处理、数据转换等
    if (response.statusCode === 200) {
      console.log('Response Intercepted:', response);
      return response.data;
    } else {
      // 处理错误
      uni.showToast({
        title: `Error: ${response.statusCode}`,
        icon: 'none'
      });
      return Promise.reject(response);
    }
  };

  // 发送请求
  return new Promise((resolve, reject) => {
    const interceptedOptions = requestInterceptor(options);
    const paramsString = queryParamsFromObject(interceptedOptions.params);
    uni.request({
      ...interceptedOptions,
      url: baseURL + interceptedOptions.url + `${paramsString ? '?' + paramsString : ''}`,
      success: (response) => {
        const interceptedResponse = responseInterceptor(response);
        resolve(interceptedResponse);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};

module.exports = {
  httpRequest
};