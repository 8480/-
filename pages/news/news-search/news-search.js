// pages/news/news-search/news-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inputValues = options.inputValues;
    var that = this;
    wx.request({
      url: "https://route.showapi.com/109-35",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        showapi_appid: "78249",
        showapi_sign: "92e48c17d899404294dce9c7bb8f7514",
        title: inputValues,
        needContent: 1
      },
      success: function (res) {
        that.setData({
          news: res.data.showapi_res_body.pagebean.contentlist,
        })
        console.log(that);
      },
    })
  },
  
  onNewsTap: function (event) {
    wx.setStorage({
      key: 'parameter',
      data: event.currentTarget.dataset,
    });
    //dataset的内容必须全为小写,数据量太大不能采用navigateTo.url传递数据
    // var id = event.currentTarget.dataset.newsid;
    // var title = event.currentTarget.dataset.newstitle;
    // var imageurls = event.currentTarget.dataset.newsimageurls;
    // var pubDate = event.currentTarget.dataset.newspubdate;
    // var source = event.currentTarget.dataset.newssource;
    // var content = event.currentTarget.dataset.newscontent;
    // var havePic = event.currentTarget.dataset.newshavepic;
    wx.navigateTo({
      url: "../news-content/news-content"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.clearStorage();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})