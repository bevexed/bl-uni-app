<template>
  <div class="home-page">
    <div class="title">SINOTY</div>

    <!-- 轮播图 -->
    <uni-swiper-dot :current="current" :dotsStyles="dotsStyles" :info="banners" mode="long">
      <swiper
        :autoplay="true"
        :duration="1000"
        :indicator-dots="false"
        :interval="3000"
        :style="{ height: windowHeight - 72 + 'px' }"
        @change="onChange"
        class="banner"
        loop
      >
        <swiper-item
          :key="bannerIndex"
          @tap="authenticationTo({
                url: '/pages/shop-detail/shop-detail?id=' + banner.productId,
                status:userInfo.status
              })"
          v-for="(banner, bannerIndex) in banners">
          <view class="swiper-item">
            <img
              :src="banner.url"
              :style="{ height: windowHeight - 72 + 'px' }"
              alt="" class="banner-img"
              lazy-load mode="aspectFill"/>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>

    <!-- 第二屏 -->
    <div class="picture-presentation second">
      <div class="picture-presentation-top">
        <img
          :src="second[0].url"
          @tap="authenticationTo({
            url: '/pages/shop-detail/shop-detail?id=' + second[0].productId,
            status:userInfo.status
          })"
          alt=""
          lazy-load
          mode="aspectFill"/>
      </div>
      <div class="picture-presentation-bottom">
        <div class="title">new fashion gathering place</div>
        <div class="exhibition">
          <div class="big-pic">
            <img :src="second[1].url" @tap="authenticationTo({
                url: '/pages/shop-detail/shop-detail?id=' +second[1].productId,
                status:userInfo.status
              })" alt=""
                 lazy-load
                 mode="aspectFill"/>
          </div>

          <!-- 右部预览项目 -->
          <div class="sm-pic">
            <div class="title">FASHION BRANDS</div>
            <img
              :src="second[2].url"
              @tap="authenticationTo({
                url: '/pages/shop-detail/shop-detail?id=' +second[2].productId,
                status:userInfo.status
              })"
              alt=""
              lazy-load
              mode="aspectFill"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三屏 -->
    <div class="picture-presentation third">
      <div class="picture-presentation-top">
        <img :src="third[0].url" @tap="authenticationTo({
                url: '/pages/shop-detail/shop-detail?id=' +third[0].productId,
                status:userInfo.status
              })" alt=""
             lazy-load
             mode="aspectFill"/>
      </div>
      <div class="picture-presentation-bottom">
        <div class="title">selection of high-quality item</div>
        <div class="exhibition">
          <div class="sm-pic">
            <div class="title">HOT-SALE</div>
            <img :src="third[1].url" @tap="authenticationTo({
                      url: '/pages/shop-detail/shop-detail?id=' +third[1].productId,
                      status:userInfo.status
                   })" alt=""
                 lazy-load
                 mode="aspectFill"/>

          </div>

          <!-- 右部预览项目 -->
          <div class="big-pic">
            <img :src="third[2].url"
                 @tap="authenticationTo({
                      url: '/pages/shop-detail/shop-detail?id=' +third[2].productId,
                      status:userInfo.status
                   })" alt=""
                 lazy-load
                 mode="aspectFill"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 第四屏 -->
    <div class="video">
      <div class="title">SINOTY</div>
      <video
        :direction="direction"
        class="my-video"
        loop
        poster=""
        src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni-app20190127.mp4"
      ></video>
      <div class="tel">如果您在选购中有疑问，请致电：0571-88888888</div>
    </div>

    <custmer-phone/>
  </div>
</template>

<script>
  import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
  import { uniSwiperDot } from '@dcloudio/uni-ui';
  import { mapActions, mapState } from "vuex";
  import { authenticationTo } from "../../utils";

  export default {
    components: {
      CustmerPhone,
      uniSwiperDot
    },
    data() {
      return {
        direction: 90,
        current: 0,
        dotsStyles: {
          border: 'none',
          backgroundColor: 'rgba(0,0,0,.3)',
          selectedBorder: 'none',
          selectedBackgroundColor: 'rgba(0,0,0,.3)'
        },
        windowHeight: 0
      };
    },
    onLoad() {
      let _this = this;
      uni.getSystemInfo({
        success: res => {
          _this.windowHeight = res.windowHeight;
          _this.windowWidth = res.windowWidth;
        }
      });

      // // 监听 设备方向
      // wx.startDeviceMotionListening()
      // wx.onDeviceMotionChange(res => {
      //   let beta = 0;
      //
      //   if (-20 < res.beta && res.beta <= 20) {
      //     beta = 90
      //   } else {
      //     beta = 0
      //   }
      //   console.log(1, res.beta, 2, beta);
      //
      //   _this.direction = beta;
      // })
      //
      // uni.startGyroscope({
      //   interval: "normal",
      //   success() {
      //     console.log('success')
      //   },
      //   fail() {
      //     console.log('fail')
      //   }
      // })

      this.getHomeBanner(1);
      this.getHomeBanner(2);
      this.getHomeBanner(3);
    },
    computed: {
      ...mapState('Home', {
        banners: state => state.homeData[1],
        second: state => state.homeData[2],
        third: state => state.homeData[3]
      }),
      ...mapState('User', ['userInfo'])
    },
    methods: {
      ...mapActions('Home', ['getHomeBanner']),
      authenticationTo,
      onChange(e) {
        this.current = e.detail.current;
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../uni";

  .home-page {
    .title {
      text-align: center;
      font-size: upx(72);
      font-weight: bold;
    }

    .banner {
      padding: 0 $white-space;
      margin-top: upx(40);
      height: upx(966);

      .banner-img {
        height: upx(966);
      }
    }

    .picture-presentation {
      padding: 0 $white-space;
      margin: upx(20) 0;

      .picture-presentation-top {
        width: upx(690);
        height: upx(400);
        margin: upx(30) 0;
        overflow: hidden;

        > image {
          height: upx(400);
        }
      }

      .picture-presentation-bottom {
        margin-top: upx(32);

        .title {
          color: $uni-text-color-grey;
          font-size: upx(24);
        }

        .exhibition {
          display: flex;
          justify-content: space-between;
          margin-top: upx(20);

          .big-pic,
          .sm-pic {
            width: upx(320);

            .name {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: upx(12) upx(8) 0;
              font-size: upx(32);

              .more {
                width: upx(28);
                height: upx(28);
              }
            }

            .shop-count {
              padding: upx(8);
              font-weight: lighter;
              font-size: upx(20);
              color: $uni-text-color-grey;
            }
          }

          .big-pic > image {
            height: upx(470);
          }

          .sm-pic {
            .title {
              position: relative;
              font-size: upx(32);
              color: $uni-text-color;
              font-weight: bold;

              &:after {
                position: absolute;
                width: upx(30);
                top: 2em;
                content: '';
                border-top: 6 upx solid $theme-color;
              }
            }

            > image {
              height: upx(332);
              margin-top: upx(100);
            }
          }
        }
      }
    }

    .second {
      .title {
        text-align: right;

        &:after {
          right: 0;
        }
      }
    }

    .third {
      .title {
        text-align: left;

        &:after {
          left: 0;
        }
      }
    }

    .video {
      background: #444;
      text-align: center;

      .title {
        padding: upx(48) 0 0;
        margin: 0 upx(30);
        font-size: upx(48);
        text-align: center;
        color: #fff;
        border-bottom: upx(2) solid #aaaaaa;
      }

      .my-video {
        width: upx(690);
        height: upx(386);
        margin: upx(50) 0 upx(30);
        border-radius: upx(8);
      }

      .tel {
        padding: 0 $white-space upx(34);
        font-size: upx(20);
        text-align: left;
        color: $uni-text-color-grey;
      }
    }
  }
</style>
