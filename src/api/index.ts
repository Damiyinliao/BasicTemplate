import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import { useUserStore } from '@/store/modules/user';
import { ResultEnum } from './httpEnum';
import { checkStatus } from './helper/checkStatus';
import { router } from '@/router';
import { ResultData } from './interface';

const config = {
  // 默认请求地址，可在.env.** 文件中修改
  baseURL: import.meta.env.Vite_API_URL,
  // 设置超时时间
  timeout: 10000,
  // 跨域请求时是否需要使用凭证
  withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // instance
    this.service = axios.create(config);
    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * TOKEN校验（JWT） 接收服务器返回的token，存储到vuex/pinia/本地存储中
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const userStore = useUserStore();
        if (config.headers && typeof config.headers.set === 'function') {
          // config.headers.set('Authorization', userStore.getToken);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     * 服务器返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          // ElMessage.error(data.msg);
          return Promise.reject(new Error(data.msg || 'Error'));
        }
        // 成功请求（在页面上除非特殊请求，否则不需要单独处理）
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        // 请求超时 && 网络错误单独判断，没有 response 的情况
        // if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时，请稍后重试');
        // if (error.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误，请稍后重试');
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理：可以跳转到断网页面
        // window.navigator.onLine 为 DHML navigator 对象的一个属性，意思是：获取表明系统是否处于全局脱机模式的值。
        if (!window.navigator.onLine) {
          // ElMessage.error('网络已断开，请检查您的网络连接');
          router.replace('/500');
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, data?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, data, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
  upload(url: string, data: FormData, _object = {}): Promise<ResultData> {
    return this.service.post(url, data, { ..._object, headers: { 'Content-Type': 'multipart/form-data' } });
  }
}

export default new RequestHttp(config);
