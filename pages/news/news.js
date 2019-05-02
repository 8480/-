// var pages = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",              // 接收搜索的内容
    wxSearchData: '',       // 输入的值
    pages: 1,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载__wxAppData pages/news/news pages
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://route.showapi.com/109-35",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        showapi_appid: "78249",
        showapi_sign: "92e48c17d899404294dce9c7bb8f7514",
        title: "电商",
        needContent: 1,
        maxResult: 20,
        page: 1
      },
      success: function (res) {
        that.setData({
          news: res.data.showapi_res_body.pagebean.contentlist,
        })
      },
    });
  },
  //页面跳转
  onNewsTap: function (event) {
    //设置缓存
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
      url: "news-content/news-content",
    })
  },
  //输入查询内容
  onBindSearch: function(e) {
    var value = e.detail.value;
    this.setData({
      inputValue: value,
    })
  },
  //搜索框查询
  onFinishTap: function(event) {
    var inputValues = this.data.inputValue;
    wx.navigateTo({
      url: "news-search/news-search?inputValues=" + inputValues,
    });
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.clearStorage()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: "https://route.showapi.com/109-35",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        showapi_appid: "78249",
        showapi_sign: "92e48c17d899404294dce9c7bb8f7514",
        title: "电商",
        needContent: 1
      },
      //下拉成功调用函数
      success: function (res) {
        wx.showToast({
          title: '成功',
          // icon: 'success',
          image: '../../images/icon/succeed.png',
          duration: 1000
        }),
        that.setData({
          news: res.data.showapi_res_body.pagebean.contentlist,
        }),
        wx.stopPullDownRefresh()
      },
      //下拉失败调用函数
      fail: function (res) {
        wx.showToast({
          title: '失败',
          // icon: 'loading',
          image: '../../images/icon/fail.png',
          duration: 1000,
        });
        setTimeout(function() {
          wx.stopPullDownRefresh()
        },1000)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log(this);
    this.setData({
      pages: this.data.pages + 1,
      page: this.data.page + 1
    });
    var that = this;
    var pages = that.data.page + 1;
    // wx.showLoading({
    //   title: '玩命加载中',
    // });
    wx.request({
      url: "https://route.showapi.com/109-35",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        showapi_appid: "78249",
        showapi_sign: "92e48c17d899404294dce9c7bb8f7514",
        title: "电商",
        needContent: 1,
        maxResult: 20,
        page: pages
      },
      success: function (res) {
        that.setData({
          news: that.data.news.concat(res.data.showapi_res_body.pagebean.contentlist)
        })
      },
    });
    console.log(that);
    // wx.hideLoading();
  }

})