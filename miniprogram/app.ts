import camelcaseKeys from "camelcase-keys"
import { coolcar } from "./service/proto_gen/trip_pb"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    wx.request({
      url:'http://localhost:8080/trip/trip123',
      method:'GET',
      success:res=>{
        const getTripResp = coolcar.GetTripResponse.fromObject(camelcaseKeys(res.data as Object,{
          deep:true,
        }))
        console.log(222, getTripResp.trip)
        console.log(333,coolcar.TripStatus[getTripResp.trip?.status!])
        // const getTripResp = res.data
        // getTripResp
      },
      fail:console.error
    })

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})