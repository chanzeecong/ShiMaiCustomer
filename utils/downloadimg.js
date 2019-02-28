function downloadImages(imageUrl) {
  // 下载文件  
  wx.downloadFile({
    url: imageUrl,
    success: function (res) {
      console.log("下载文件：success");
      console.log(res);

      // 保存图片到系统相册  
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log("保存图片：success");
          wx.showToast({
            title: '保存成功',
          });
        },
        fail(res) {
          console.log("保存图片：fail");
          console.log(res);
        }
      })
    },
    fail: function (res) {
      console.log("下载文件：fail");
      console.log(res);
    }
  })
}

function downloadVideo(videoPath) {
  // 下载文件  
  wx.downloadFile({
    url: videoPath,
    success: function (res) {
      console.log("下载文件：success");
      console.log(res);

      // 保存图片到系统相册  
      wx.saveVideoToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log("保存视频：success");
          wx.showToast({
            title: '保存视频成功',
          });
        },
        fail(res) {
          console.log("保存视频失败");
          console.log(res);
        }
      })
    },
    fail: function (res) {
      console.log("下载文件：fail");
      console.log(res);
    }
  })
}

module.exports = {
  downloadImages: downloadImages,
  downloadVideo: downloadVideo
}