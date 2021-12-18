import { routing } from "../../utils/routing"

// pages/register/register.ts
Page({

    /**
     * 页面的初始数据
     */
    redirectURL:'',
    data: {
    genders:['未知','男','女','其他'],
    genderIndex:0,
    birthDate:'1990-01-01',
    licImgURL: '', 
    licNo:'',
    name:'',
    state:'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED'
    },
    onUploadlic(){
        console.log("1111")
        wx.chooseImage({
            count: 1,
            success :(res)=>{
                if(res.tempFilePaths.length > 0){
                    this.setData({
                        licImgURL:res.tempFilePaths[0]
                      }) 
                      setTimeout(()=>{
                      this.setData({
                          licNo:"321432955",
                          name:"张三",
                          genderIndex:1,
                          birthDate:"1989-12-02"
                      })
                      },1000)
                }
         
                console.log("res",res)
            },
            fail(res){
                console.log("上传失败",res)
               
            }
          })
    },
    onSubmit(){
      this.setData({
          state:'PENDING',
      })
      setTimeout(()=>{
       this.onLicVerified()
      },3000)
    },
    onLicVerified(){
        this.setData({
            state:'VERIFIED',
        })
        console.log("onLicVerified==========>",this.redirectURL)
        if (this.redirectURL) {
        wx.redirectTo({
            url:this.redirectURL
        })
    }
    },
    onResubmit(){
        this.setData({
            state:'UNSUBMITTED',
            licImgURL:''
        })
    },
    onGenderChange(e:any){
     this.setData({
         genderIndex:e.detail.value
     })
    },
    onBirthDateChange(e:any){
     this.setData({
         birthDate:e.detail.value
     })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(opt:Record<'redirect',string>) {
        const o : routing.RegisterOpts = opt
        console.log(opt)
      if(o.redirect){
          this.redirectURL = decodeURIComponent(o.redirect)
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