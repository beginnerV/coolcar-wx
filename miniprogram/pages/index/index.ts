// index.ts
import { routing } from "../../utils/routing";
import { raceData } from "./raceData";
// 获取应用实例
const app = getApp<IAppOption>();

Page({
    data: {
        setting : {
          skew: 0,
          rotate: 0,
          showLocation: false,
          showScale: false,
          subKey: '',
          layerStyle: 1,
          enableZoom: true,
          enableScroll: true,
          enableRotate: false,
          showCompass: false,
          enable3D: false,
          enableOverlooking: false,
          enableSatellite: false,
          enableTraffic: false,
        },
        location:{
          latitude:29.756825521115363,
          longitude:121.87222114786053,
        },
        scale:10,
        markers:[
          {
            iconPath:"/resources/car.png",
            id:0,
            latitude:29.756825521115363,
            longitude:121.87222114786053,
            width:50,
            height:50
          },
          {
            iconPath:"/resources/car.png",
            id:1,
            latitude:23.099994,
            longitude:113.324520,
            width:50,
            height:50
          }
        ],
        is3D:false,
        isOverLooking:false,
        isPageShowing:true,
        avatarURL:"",
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') 
      },
      pathIndex:0,
      getUserProfile(){
        wx.getUserProfile({
            desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              this.setData({
                avatarURL: res.userInfo.avatarUrl,
              })
            }
          })
    },
  translateMarker(ctx:any){
   this.pathIndex++
   if (this.pathIndex >= raceData.path.length){
     return
   }
   ctx.translateMarker({
     markerId:0,
     destination:{
       latitude:raceData.path[this.pathIndex].lat,
       longitude:raceData.path[this.pathIndex].lng,
     },
     duration:100,
     success:()=>this.translateMarker(ctx),
   })
  },
  onReady(){
    console.log("lifecycle:index onReady")
    const ctx = wx.createMapContext('map',this)
    this.translateMarker(ctx)
  },
  async onLoad() {
       // @ts-ignore
       if (wx.getUserProfile) {
        this.setData({
          // shareLocation:wx.getStorageSync(shareLocationKey) || false
        })
      }
    },
  onMyLocationTap(){
  wx.getLocation({
    type:'gcj02',
    success:res=>{
      this.setData({
        location:{
          latitude:res.latitude,
          longitude:res.longitude
        }
      })
    },fail:()=>{
      wx.showToast({
        icon:"none",
        title:"请前往设置页授权"});
    }
  })
  },
  onMyTripsTap(){
    console.log(1111111)
    wx.navigateTo({
      url:routing.mytrips()
    })
  },
  moveCars(){
     const map = wx.createMapContext("map");
     const dest = {
         latitude:23.099994,
         longitude:113.324520,
     }
     const moveCar = ()=>{
       dest.latitude += 0.1
       dest.longitude += 0.1
      map.translateMarker({
        destination:{
            latitude:dest.latitude,
            longitude:dest.longitude,
        },
        markerId:1,
        autoRotate:false,
        rotate:0,
        duration:5000,
        animationEnd:()=>{
          if(this.data.isPageShowing){
            console.log(2222222222)
            moveCar()
          }
        },
    })
     }
     moveCar()
  },
  onScanClicked(){
      wx.scanCode({
          success:(res)=>{
              console.log(res)
              const carID = 'car132'
              const redirectURL = routing.lock({car_id:carID})
              wx.navigateTo({
                url: routing.register({
                  redirectURL:redirectURL
                })
              })
          },
          fail:console.log
      })
  },
  onShow(){
    console.log("show")
    this.setData({
      isPageShowing : true
    })
  },
  onHide(){
    console.log("hide")
    this.setData({
      isPageShowing : false
    })
  }
})
