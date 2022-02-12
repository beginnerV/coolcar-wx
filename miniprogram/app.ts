import camelcaseKeys from "camelcase-keys"
import { auth } from "./service/proto_gen/auth/auth_pb"
import { rental } from "./service/proto_gen/rental/rental_pb"
import { coolcar } from "./service/proto_gen/trip_pb"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // wx.request({
    //   url:'http://localhost:8080/trip/trip123',
    //   method:'GET',
    //   success:res=>{
    //     const getTripResp = coolcar.GetTripResponse.fromObject(camelcaseKeys(res.data as Object,{
    //       deep:true,
    //     }))
    //     console.log(222, getTripResp.trip)
    //     console.log(333,coolcar.TripStatus[getTripResp.trip?.status!])
    //     // const getTripResp = res.data
    //     // getTripResp
    //   },
    //   fail:console.error
    // })

    // 登录
    wx.login({
      success: res => {
        console.log(1111,res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url:'http://localhost:8080/v1/auth/login',
          method:'POST',
          data:{
            code:res.code,
          } as auth.v1.ILoginRequest,
          success:res =>{
            const loginResp: auth.v1.ILoginResponse = auth.v1.LoginResponse.fromObject(camelcaseKeys(res.data as Object))
            console.log("登陆",loginResp)
            wx.request({
              url:'http://localhost:8080/v1/trip',
              method:'POST',
              data:{
                start:'abc',
              } as rental.v1.ICreateTripRequest,
              header:{
                authorization:"Bearer " + loginResp.accessToken
              }
            })
          },
          fail:console.error
        })
      },
    })
  },
})