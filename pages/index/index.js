//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movieInfo: [],
    city: "宁波",
    buyTickets: "购票",
    preSale: "预售",
    mode: 'aspectFit',
    ip: 'http://192.168.43.164:6979/',
    navbar: ['热映', '待映'],
    currentTab: 0
  },
  onLoad: function(options) {
    wx.request({
      url: this.data.ip + 'getMovieData',
      method: "POST",
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let movieData = res.data;
        for (let item of movieData) {
          // 当前时间
          let newTime = new Date();
          // 上映时间
          let activeTime = new Date(item.show.slice(0, 10));
          // 当前时间和上映时间差
          let ctime = activeTime.getTime() - newTime.getTime();
          // 判断购票和预售状态   ctime <= 0 表示已上映
          if (ctime <= 0) {
            item.state = 'true';

          } else {
            item.state = 'false';
          }
          // 获取当前时间和电影上映时间的年月日
          let year = activeTime.getFullYear() - newTime.getFullYear();
          let month = activeTime.getMonth() - newTime.getMonth();
          let date = activeTime.getDate() - newTime.getDate();
          if (year === 0 && month === 0 && date <= 7) {
            switch (date) {
              case 1:
                item.activeText = "明天上映"
                break;
              case 2:
                item.activeText = "后天上映"
                break;
              default:
                item.activeText = date + 1 + "天后上映"
            }
          } else {
            item.activeText = item.show;
          }

        }
        this.setData({
          movieInfo: [...movieData]
        })
      }
    })
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
  },
  // 点击首页电影图片时跳转到电影详情
  turnTo: function(e) {
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.idx
    })
  }

})