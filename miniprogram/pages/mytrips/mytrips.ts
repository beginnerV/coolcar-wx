import { routing } from "../../utils/routing"
interface Trip {
  id: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
}

interface MainItem {
  id: string
  navId: string
  navScrollId:string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}
interface MainItemQueryResult{
   id:string
   top:number
   dataset:{
     navId:string,
     navScrollId:string
   }
}
// pages/mytrips/mytrips.ts
Page({

  /**
   * 页面的初始数据
   */
  scrollStates:{
     mainItems:[] as MainItemQueryResult[]
  },
  data: {
    indicatorDots: true,
    autoPlay: true,
    interval: 3000,
    duration: 5000,
    circular: true,
    multiItemCount: 1,
    prevMargin: "",
    nextMargin: "",
    vertical: false,
    current: 0,
    promotionItems: [
      {
        img: 'https://pic8.58cdn.com.cn/mobile/big/n_v27bc3f9a2ba7e4fadae2cf0602a865769.jpg',
        promotionID: 1
      },
      {
        img: 'https://pic8.58cdn.com.cn/mobile/big/n_v2735f5c375c8b4b7fb0ebc099d52b09db.jpg',
        promotionID: 2
      },
      {
        img: 'https://pic8.58cdn.com.cn/mobile/big/n_v2340499db091c4afabc7910f7a9b8a98a.jpg',
        promotionID: 3
      },
      {
        img: 'https://pic8.58cdn.com.cn/mobile/big/n_v2d8e45561ee9041af88ce36b481564168.jpg',
        promotionID: 4
      }
    ],
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    avatarURL: "",
    trips: [] as Trip[],
    tripsHeight: 0,
    mainItems: [] as MainItem[],
    navItems: [] as NavItem[],
    scrollTop: 0,
    mainScroll: '',
    navCount:0,
    navSel:'',
    navScroll:''
  },
  onSwiperChange(e: any) {
    console.log(e)
    if (!e.detail.source) {
      console.log(e.detail.source)

    }
  },
  onRegisterTap() {
    wx.navigateTo({
      url: routing.register()
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarURL: res.userInfo.avatarUrl,
        })
      }
    })
  },
  onSwiperTap(e: any) {
    console.log(e)
    const promotionID = e.currentTarget.dataset.promotionId
    if (promotionID) {
      
    }
  },
  populateTrips() {
    const mainItems: MainItem[] = []
    const navItems: NavItem[] = []
    let navSel = ''
    let prevNav = ''
    for (let i = 0; i < 100; i++) {
      const mainId = 'main-' + i
      const navId = 'nav-' + i
      const tripId = (10001 + i).toString()
      if(!prevNav){
        prevNav = navId
      }
      mainItems.push({
        id: mainId,
        navId: navId,
        navScrollId:prevNav,
        data: {
          id: tripId,
          start: '东方明珠',
          end: '迪士尼',
          distance: '27.0公里',
          duration: '0时44分',
          fee: '¥128.00元',
          status: '已完成'
        }
      })
      navItems.push({
        id:navId,
        mainId:mainId,
        label:tripId,
      })
      if(i===0){
        navSel = navId
      }
      prevNav = navId
    }
    this.setData({
      mainItems,
      navItems,
      navSel
    },()=>{
     this.prepareScrollStates()
    })
  },
  prepareScrollStates(){
    wx.createSelectorQuery().selectAll('.main-item')
    .fields({
      id:true,
      dataset:true,
      rect:true,
    }).exec(res=>{
      this.scrollStates.mainItems = res[0]
      console.log(res)
    })
  },
  onNavItemTap(e:any){
    const mainId : string = e.currentTarget?.dataset?.mainId
    const navId : string = e.currentTarget?.id

    if(mainId && navId){
      this.setData({
        mainScroll:mainId,
        navSel:navId
      })
    }
  },
  onMainScroll(e:any){
  const top:number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if(top === undefined){
    return
    } 
    const selItem = this.scrollStates.mainItems.find(v=>v.top>=top)
   if(!selItem){
     return
   }

   this.setData({
     navSel:selItem.dataset.navId,
     navScroll:selItem.dataset.navScrollId
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.populateTrips()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery().select('#heading')
      .boundingClientRect(rect => {
      const height =  wx.getSystemInfoSync().windowHeight - rect.height
        this.setData({
          tripsHeight: height,
          navCount:Math.floor(height/50)
        })
      }).exec()
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