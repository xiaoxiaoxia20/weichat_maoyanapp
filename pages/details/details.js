// pages/details/details.js

Page({
  //  页面的初始数据
  data: {
    ip: 'http://192.168.43.164:6979/',
    details: [],
    localover: 'icon/展开.png',
    hideText: true,
    hideClass: 'up',
    head: 'icon/me.jpg',
    nickName:"夜观天象的猪",
    times:"6天前",
  },
  //  生命周期函数--监听页面加载
  onLoad: function(options) {
    // console.log(options);
    wx.request({
      url: this.data.ip + 'getMovieData',
      method: "POST",
      data: {
        _id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // console.log(res.data);
        this.setData({
          details: [...res.data]
        })
      }
    })
  },
  showall: function() {
    let hide = this.data.hideText;
    let hideClass = this.data.hideClass == 'up' ? 'down' : 'up';
    this.setData({
      hideText: !hide,
      hideClass: hideClass
    })
  }
})