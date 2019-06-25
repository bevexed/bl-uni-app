<template>
    <view class="fitting">
        <!-- 模特选择轮播 -->
        <view class="model">
            <view :class="['select-model',{open}]">
                <!-- 模特选择标题 -->
                <view class="model-select-title"><text>模特选择</text></view>
              <image class="before" src="../../static/icon/before.svg" mode=""></image>
                <swiper class="swiper" vertical display-multiple-items="5" skip-hidden-item-layout>
                  <swiper-item v-for="(v,index) in defaultModel" :key="index">
                    <view :class="['swiper-item', { selected: v.modelId === currentModel }]"
                          @tap="onModelChange(v.modelId)">
                      <image :src="v.image" mode=""></image>
                    </view>
                  </swiper-item>

                </swiper>
              <image class="next" src="../../static/icon/before.svg" mode=""></image>
            </view>

            <!-- 模特实体图 -->
            <view
                class="model-show"
                :style="{ transform: 'scale(' + touch.new.scale + ') ' + 'translate(' + touch.new.left + 'px,' + touch.new.top + 'px)' }"
                @touchstart.stop.prevent="resizeStart($event)"
                @touchmove.stop.prevent="risizing($event)"
                @touchend.stop.prevent="resizeEnd($event)"
            >
                <image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=234634259,4236876085&fm=27&gp=0.jpg" mode=""></image>
                <!-- <image :src="currentImage" mode="aspectFill"></image> -->
            </view>
            <!-- {{ touch }} -->

            <!-- 控制器 -->
            <view class="controll">
                <view class="dircetion">
                  <image src="../../static/icon/dir.svg" mode="" class="dirction-top" @tap="offset('dyP')"></image>
                  <image src="../../static/icon/dir.svg" mode="" class="dirction-right" @tap="offset('dxR')"></image>
                  <image src="../../static/icon/dir.svg" mode="" class="dirction-left" @tap="offset('dxP')"></image>
                  <image src="../../static/icon/dir.svg" mode="" class="dirction-bottom" @tap="offset('dyR')"></image>
                </view>

                <view class="touchbar">
                  <image class="add" src="../../static/icon/add.svg" mode="" @tap="onTouchBarButton('add')"></image>
                    <!-- <view class="my-slider">
                        <view class="my-slider-background"></view>
                        <view class="my-slider-selected" :style="{ height: currentBar + 'px' }"></view>
                        <view class="my-slider-bar" :style="{ top: currentBar - 2 + 'px' }" @touchmove.stop.prevent="onChangeBar($event)" @touchend.stop.prevent="onChangeBarEnd()"></view>
                    </view> -->
                  <image class="reduce" src="../../static/icon/reduce.svg" mode=""
                         @tap="onTouchBarButton('reduce')"></image>
                </view>
            </view>
        </view>

        <!-- 样式选择标题 -->
        <view class="model-select-title">
            <text>花样选择</text>
            <view class="detail">
                <text>花形详情</text>
              <image class="more" src="../../static/icon/more.png" mode=""></image>
            </view>
        </view>

        <!-- 样式选择轮播 -->
        <view class="select-style">
          <image class="before" src="../../static/icon/before.svg" mode=""></image>
            <swiper class="swiper select-style" :display-multiple-items="5">
                <swiper-item v-for="(img, index) in defaultStyle" :key="index">
                  <view :class="['swiper-item', { selected: index === currentStyle }]"
                        @tap="onStyleChange(img.id, index)">
                    <image :src="img.pattern" mode=""></image>
                    </view>
                </swiper-item>

                <!-- 上传图片 -->
               <!-- <swiper-item key="add">
                    <view class="swiper-item upload-style"><image src="../static/icon/adds.png" mode="center" @tap="popShow = true"></image></view>
                </swiper-item> -->
            </swiper>
          <image class="next" src="../../static/icon/before.svg" mode=""></image>
        </view>

        <!-- <view :class="['pop-wrap']" v-show="popShow" @touchmove.prevent.stop @tap="popShow = false">
            <view :class="['pop']" @tap.stop="chooseImg">
                <image src="../static/icon/com.png" mode="aspectFill"></image>
                <text>本地上传</text>
            </view>
        </view> -->
    </view>
</template>

<script>
import { pathToBase64, base64ToPath } from 'image-tools';

import { reqFitting, reqFittingModel, reqFittingSimilar } from "../../api/products";

export default {
    components: {},
    data() {
        return {
            // 默认模特数量,最小数量为5
          defaultModel: [],
            // 当前选中模特
            currentModel: 0,
            // 默认花纹数量,最小数量为5
            defaultStyle: [],
            // 当前样式
            currentStyle: 0,

            // 展示区图片
            currentImage: '../static/imgs/fitting/5.jpg',

            // 滑块初始位置
            barStartY: 0,

            // 当前滑块停留位置
            currentBar: 338,

            // 弹窗显示
            popShow: false,

            // 请求数据
            data_upload: {
              // image: '',
              amp: 1,
              loc: '',
              dx: 0,
              dy: 0,
              id: 192,
              modelId: 1,
              rotate: 0,
              // Rdpi: 40
            },

            // 触屏
            touch: {
                old: {
                    touchStartX1: 0,
                    touchStartY1: 0,
                    touchStartX2: 0,
                    touchStartY2: 0,
                    oldD: 0,
                    top: 0,
                    left: 0,
                    scale: 1
                },
                new: {
                    touchStartX1: 0,
                    touchStartY1: 0,
                    touchStartX2: 0,
                    touchStartY2: 0,
                    newD: 0,
                    top: 0,
                    left: 0,
                    scale: 1
                }
            },

            // 模特打开
            open: true
        };
    },
    methods: {
        resizeStart(e) {
            // console.log(e);
            this.touch.old.touchStartX1 = e.touches[0].clientX;
            this.touch.old.touchStartY1 = e.touches[0].clientY;

            // 双指
            if (e.touches[1]) {
                this.touch.old.touchStartX2 = e.touches[1].clientX;
                this.touch.old.touchStartY2 = e.touches[1].clientY;
                let oldD = Math.sqrt(
                    Math.pow(this.touch.old.touchStartX1 - this.touch.old.touchStartX2, 2) + Math.pow(this.touch.old.touchStartY1 - this.touch.old.touchStartY2, 2)
                );
                this.touch.old.oldD = oldD;
            }
        },

        risizing(e) {
            this.touch.new.touchStartX1 = e.touches[0].clientX;
            this.touch.new.touchStartY1 = e.touches[0].clientY;
            if (e.touches[1]) {
                this.touch.new.touchStartX2 = e.touches[1].clientX;
                this.touch.new.touchStartY2 = e.touches[1].clientY;

                let newD = Math.sqrt(
                    Math.pow(this.touch.new.touchStartX1 - this.touch.new.touchStartX2, 2) + Math.pow(this.touch.new.touchStartY1 - this.touch.new.touchStartY2, 2)
                );

                this.touch.new.newD = newD;
                this.touch.new.scale = (this.touch.old.scale * this.touch.new.newD) / this.touch.old.oldD;
            } else {
                this.touch.new.top = this.touch.old.top + (this.touch.new.touchStartY1 - this.touch.old.touchStartY1) / this.touch.new.scale;
                this.touch.new.left = this.touch.old.left + (this.touch.new.touchStartX1 - this.touch.old.touchStartX1) / this.touch.new.scale;
            }
        },

        resizeEnd(e) {
            this.touch.old.top = this.touch.new.top;

            // if (Math.abs(this.touch.new.left) > 300) {
            //     this.touch.new.left = 300;
            // }

            this.touch.old.left = this.touch.new.left;

            // if (this.touch.new.scale < 1) {
            //     this.touch.new.scale = 1;
            // }
            this.touch.old.scale = this.touch.new.scale;
        },

        // 请求 3d 试衣结果
        async getTextile3dmix() {
            uni.showLoading({
                title: '数据加载中...',
                mask: true
            });

          let res = await reqFitting(this.data_upload);

          if (res.error_code === 0) {
            this.currentImage = 'data:image/png;base64,' + res.image;
          }
        },

        // 更换模特
      async onModelChange(index) {
        // if (this.currentModel === this.defaultModel[0].modelId) {
        //   this.open = !this.open;
        // }

        this.currentModel = index;
        this.data_upload.modelId = index;
        // 向服务器发送请求
        this.getTextile3dmix();
      },

      // 更换花纹
      onStyleChange(id, index) {
        this.currentStyle = index;
        this.data_upload.id = id;


        // // 图片 转 base64
        // pathToBase64(imgUrl).then(async base64 => {
        //   // console.log(base64);
        //   this.data_upload.image = base64.split('base64,')[1];
        //
        //   // 向服务器发送请求
        this.getTextile3dmix();
        // });
      },

      offset(state) {
        let { dy, dx } = this.data_upload;
        console.log(state);

        switch (state) {
          case 'dyP' :
            dy += 10;
            if (dy > 90) {
              this.data_upload.dy = 90;
              return;
            } else {
              this.data_upload.dy = dy
            }
            break;
          case 'dyR':
            dy -= 10;
            if (dy < 0) {
              this.data_upload.dy = 0;
              return;
            } else {
              console.log(dy);
              this.data_upload.dy = dy
            }
            break;
          case 'dxP' :
            dx += 10;
            if (dx > 90) {
              this.data_upload.dx = 90;
              return;
            } else {
              this.data_upload.dx = dx
            }
            break;
          case 'dxR':
            dx -= 10;
            if (dx < 0) {
              this.data_upload.dx = 0;
              return;
            } else {
              this.data_upload.dx = dx
            }
            break;
        }
        this.getTextile3dmix();
      },

      onChangeBar(e) {
            let mouseY = e.changedTouches[0].pageY;
            let offsetY = 147;
            let offsetTop = e.target.offsetTop;

            let barPositon;

            barPositon = mouseY - offsetY;

            if (barPositon <= 0) {
                barPositon = 0;
            }

            if (barPositon >= 338) {
                barPositon = 338;
            }

            this.currentBar = barPositon;

            console.log(parseInt(e.changedTouches[0].pageY), e.target.offsetTop);

            // this.currentBar = e.target.offsetTop;
        },

        onChangeBarEnd() {
            let step = 9;
            let stepSize = 338 / step;
            let currentStep = Math.floor(this.currentBar / stepSize);

            this.data_upload.amp = 10 - currentStep;

            this.currentBar = currentStep * stepSize;

            // 向服务器发送请求
            this.getTextile3dmix();

            console.log(this.currentBar);
        },

        onTouchBarButton(state) {
            let step = 9;
            let stepSize = 338 / step;
            let currentStep = Math.floor(this.currentBar / stepSize);

            if (state === 'add') {
                currentStep--;
            } else {
                currentStep++;
            }

            if (currentStep > 9) {
                currentStep = 9;
            }
            if (currentStep < 0) {
                currentStep = 0;
            }

            this.data_upload.amp = 10 - currentStep;

            this.currentBar = currentStep * stepSize;

            // 向服务器发送请求
            this.getTextile3dmix();
        },

        // 展示 上传 图框

        chooseImg() {
            uni.chooseImage({
                success(res) {
                    console.log('选择图片完成', res);
                    uni.navigateTo({
                        url: '/clipper/clipper?imgUrl=' + res.tempFiles[0].path
                    });
                },
                count: 1,
                sourceType: ['album'],
                sizeType: ['original']
            });
        },


      async getModel() {
        let res = await reqFittingModel();
        if (res.code === 200) {
          this.defaultModel = res.data;
          if (this.defaultModel.length < 5) {
            this.defaultModel.length = 5
          }
        }
      },
      async getSimilar(e) {
        let res = await reqFittingSimilar(e);
        if (res.code === 200) {
          this.defaultStyle = res.data;
          if (this.defaultStyle.length < 5) {
            this.defaultStyle.length = 5
          }
        }
      }
    },

  onShow() {
  },

  onLoad(e) {
    console.log(e);
    let { orderId } = e;
    this.data_upload.id = orderId;
    this.getModel();
    this.getSimilar(orderId);
  },

  onReady() {
    this.getTextile3dmix()
  }
};
</script>

<style lang="scss">
.fitting {
    width: 750upx - 2 * $white-space;
    height: 100vh;
    overflow: hidden;
    padding: $white-space;
    .model-select-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20upx 0;
        text {
            font-family: 苹方 常规;
            color: $theme-color;
            font-weight: 300;
            font-size: 28upx;
        }
        image {
            width: 32upx;
            height: 32upx;
        }

        .detail {
            display: flex;
            align-items: center;
            text {
                font-family: 苹方 粗体, serif;
                font-weight: bold;
                font-size: 20upx;
                color: #444444;
                margin-right: 0.5em;
            }

            .more {
                width: 16upx;
                height: 14upx;
            }
        }
    }

    .model {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 1000upx;
        .select-model {
            position: relative;
            width: 120upx;
            height: 250upx;
            overflow: hidden;
            &.open {
                height: 928upx;
            }
            .before {
                z-index: 1;
                position: absolute;
                height: 14px;
                width: 14px;
                top: 90upx;
                left: 0;
                right: 0;
                margin: auto;
            }
            .next {
                z-index: 1;
                position: absolute;
                height: 14px;
                width: 14px;
                bottom: 32upx;
                left: 0;
                right: 0;
                margin: auto;
                transform: rotate(180deg);
            }
            .swiper {
                height: 850upx;
            }
            .swiper-item {
                width: 120upx - 8upx;
                height: 160upx - 8upx;
                background: #eceff0;
                border-radius: $uni-border-radius-base;

                image {
                    width: 120upx - 8upx;
                    height: 160upx - 8upx;
                }
            }
        }
        .model-show {
            position: relative;
            z-index: 999;
            width: 440upx;
            height: 928upx;
            text-align: center;
            align-self: flex-end;

            // transform: scale(3);
            image {
            }
        }

        .controll {
            .dircetion {
                position: relative;
                width: 110upx;
                height: 100upx;

                > image {
                    position: absolute;
                    width: 32upx;
                    height: 28upx;
                    margin: auto;
                }

                .dirction-top {
                    left: 0;
                    right: 0;
                    transform: rotate(180deg);
                }

                .dirction-bottom {
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                .dirction-right {
                    top: 0;
                    bottom: 0;
                    left: 0;
                    transform: rotate(90deg);
                }
                .dirction-left {
                    top: 0;
                    bottom: 0;
                    right: 0;
                    transform: rotate(-90deg);
                }
            }

            .touchbar {
                display: flex;
                align-items: center;
                flex-direction: column;
                margin: 90upx 0 0;

                image {
                    width: 34upx;
                    height: 34upx;
                }
                .add,
                .reduce {
                    margin: 16upx 0;
                }

                .my-slider {
                    position: relative;
                    width: 80upx;
                    height: 700upx;
                }

                .my-slider-background,
                .my-slider-selected {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 2upx;
                    height: 700upx;
                    background: red;
                    background: black;
                }

                .my-slider-selected {
                    background: yellow;
                    background: #eceff0;
                }

                .my-slider-bar {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 34upx;
                    height: 34upx;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0 2upx 6upx 0 rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                }
            }
        }
    }

    .select-style {
        position: relative;
        height: 100upx;
        padding-right: 0;
        .swiper-item {
            width: 120upx - 8upx;
            height: 100upx - 8upx;
            background: #eceff0;
            border-radius: $uni-border-radius-base;
            image {
                width: 120upx - 8upx;
                height: 100upx - 8upx;
            }
        }
        .before {
            z-index: 1;
            position: absolute;
            height: 14px;
            width: 14px;
            top: 0;
            bottom: 0;
            left: 8upx;
            margin: auto;
            transform: rotate(-90deg);
        }
        .next {
            z-index: 1;
            position: absolute;
            height: 14px;
            width: 14px;
            bottom: 32upx;
            top: 0;
            bottom: 0;
            right: 8upx;
            margin: auto;
            transform: rotate(90deg);
        }
    }

    .swiper-item {
        padding: 2upx;
        border: 2upx solid transparent;
        &.selected {
            border-color: $theme-color;
        }
    }

    .upload-style {
        width: 120upx;
        height: 100upx;
        border: 2upx solid #ccc;
        image {
            width: 60upx;
            height: 50upx;
        }
    }

    .pop-wrap {
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .pop {
            z-index: 99999;
            position: fixed;
            width: 750upx - 32upx * 2;
            bottom: 0;
            display: flex;
            align-items: center;
            background: #fff;
            padding: 38upx 32upx;
            border-radius: 8upx 8upx 0 0;
            overflow: hidden;

            image {
                margin-right: 26upx;
                width: 36upx;
                height: 36upx;
            }
            text {
                font-family: 苹方 中等;
                color: $uni-text-color;
                font-size: 28upx;
            }
        }
    }

    .movable {
        width: 750upx;
        height: 1200upx;
        background: transparent;
    }
}
</style>
