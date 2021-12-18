import { routing } from "../../utils/routing"

// pages/lock/lock.ts
const shareLocationKey = "share_location"

Page({

    /**
     * 页面的初始数据
     */
    data: {
      avatarURL:"",
      shareLocation:false,
      canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') 
    },
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
    onShareLocation(e:any){
      const shareLocation:boolean = e.detail.value
      this.setData({
        shareLocation:shareLocation
      })
      wx.setStorageSync(shareLocationKey,shareLocation)
    },
    onSetAvatarURL(){
      if(this.data.shareLocation){
        wx.getUserProfile({
          desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.setData({
              avatarURL: res.userInfo.avatarUrl,
            })
            this.onUnlockTap()
          }
        })
      }else{
       this.onUnlockTap()
      }
    },
    onUnlockTap(){
      wx.getLocation({
        type:'gcj02',
        success:loc=>{
          console.log('starting a trip',{
            location:{
              latitude:loc.latitude,
              longitude:loc.longitude
            },
            avatarURL:this.data.shareLocation ? this.data.avatarURL : '',
          })
        const tripID = 'trip456'
        wx.showLoading({
            title:'开锁中',
            mask:true
        })
        setTimeout(()=>{
          wx.redirectTo({
            url:routing.drving({trip_id:tripID}),
              complete:()=>{
                  wx.hideLoading()
              }
          })
        },2000)

        },
        fail:()=>{
          wx.showToast({
            icon:'none',
            title:'请前往设置页授权位置信息'
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(opt:Record<'car_id',string>) {
      const o:routing.LockOpts = opt
      console.log('unlockint car',o.car_id)
    // @ts-ignore
        if (wx.getUserProfile) {
            this.setData({
              shareLocation:wx.getStorageSync(shareLocationKey) || false
            })
          }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})