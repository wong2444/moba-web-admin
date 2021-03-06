import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    baseURL: 'http://localhost:3001/admin/api'
})


http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }

    return config
})


http.interceptors.response.use(res => {
    return res
}, err => {//狀態碼400或以上的會走錯誤路由
    Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
    })
    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})


export default http
