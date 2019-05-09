/**
 * 使用方法:
 * 1) WXHTML要缩放的图片 必须 传入 src 以及绑定 bindtap事件,
 *    e.g:     
 *    <image bindtap="toggleDtl" data-src="{{item}}" wx:for="{{productCard.arrImg}}" wx:key="*this" src="{{item}}" style="width:100%" mode="widthFix"></image>
 * 2) WXHTML 要引入Modal模板(isCheckDtl无需再定义):
 *      <view wx:if="{{isCheckDtl}}">
 *        <import src="/components/resizePicModal/resizePicModal.wxml"/>
 *        <template is="resizePic" data="{{img}}"></template>
 *      </view>
 * 3) JS页面要引入JS文件,覆盖当前页面的事件:
 *    var resizePicModalService =  require ('../../components/resizePicModal/resizePicModal.js')
 *    var resizePicModal = {}
 * 4) 在onLoad事件中,实例化ResizePicModal
 *        resizePicModal = new resizePicModalService.ResizePicModal()
 */
var app = getApp()
let modalEvent = {
  distanceList: [0, 0],//存储缩放时,双指距离.只有两个数据.第一项为old distance.最后一项为new distance
  disPoint: { x: 0, y: 0 },//手指touch图片时,在图片上的位置
  imgIdList:{},
  
  /**
   * 打开弹窗
   */
  showResizeModal: function (e) {
    var src = e.currentTarget.dataset.src;
    var x = 0
    var y =0
    try {
      var width = this.imgIdList[e.currentTarget.id].width; //图片原宽
      var height = this.imgIdList[e.currentTarget.id].height; //图片原高
     
      //小程序固定宽320px
      height = height * (320 / width);
      width = 320;

      x = (app.windowWidth - width) / 2 //> 0 ? (app.windowWidth - width) / 2 : 0;
      y = (app.windowHeight - height) / 2// > 0 ? (app.windowHeight - height) / 2 : 0;

    } catch (e) { }
    var img = {
      top: y,
      left: x,
      x: x, y: y,
      width: '100%',
      baseScale: 1,
      currentSrc: src,
    };
    this.setData({ img: img, isCheckDtl: true });
    
  },
  /**
   * 关闭弹窗
   */
  closeResizeModal:function(){
    this.setData({  isCheckDtl: false })
  },
  /**
   * 加载图片
   */
  imageOnload:function(e){
    var id = e.currentTarget.id
    this.imgIdList[id] = {
      width:e.detail.width,
      height:e.detail.height
    }
    
  },
  /**
   * bindtouchmove
   */
  bindTouchMove: function (e) {
    if (e.touches.length == 1) {//一指移动当前图片
      this.data.img.left = e.touches[0].clientX - this.disPoint.x
      this.data.img.top = e.touches[0].clientY - this.disPoint.y

      this.setData({ img: this.data.img })
    }
  
    if (e.touches.length == 2) {//二指缩放
      var xMove = e.touches[1].clientX - e.touches[0].clientX
      var yMove = e.touches[1].clientY - e.touches[0].clientY
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//开根号
      this.distanceList.shift()
      this.distanceList.push(distance)
      if (this.distanceList[0] == 0) { return }
      var distanceDiff = this.distanceList[1] - this.distanceList[0]//两次touch之间, distance的变化. >0,放大图片.<0 缩小图片
      // 假设缩放scale基数为1:  newScale = oldScale + 0.005 * distanceDiff
      var baseScale = this.data.img.baseScale + 0.005 * distanceDiff
      if(baseScale>0){
        this.data.img.baseScale = baseScale
        var imgWidth = baseScale * parseInt(this.data.img.imgWidth) 
        var imgHeight = baseScale * parseInt(this.data.img.imgHeight)
        this.setData({ img: this.data.img })
      }else{
        this.data.img.baseScale = 0
        this.setData({ img: this.data.img })
      }
      
    }

  },
  /**
   * bindtouchend
   */
  bindTouchEnd: function (e) {
    if (e.touches.length == 2) {//二指缩放
      this.setData({ isCheckDtl: true })
    }
  },
  /**
   * bindtouchstart
   */
  bindTouchStart: function (e) {
    this.distanceList = [0, 0]//回复初始值
    this.disPoint = { x: 0, y: 0 }
    if (e.touches.length == 1) {
      this.disPoint.x = e.touches[0].clientX - this.data.img.left
      this.disPoint.y = e.touches[0].clientY - this.data.img.top
    }

  }
}

function ResizePicModal(){
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  Object.assign(curPage, modalEvent)//覆盖原生页面事件
  this.page = curPage
  curPage.resizePicModal = this
  return this
}
module.exports = {
  ResizePicModal
}