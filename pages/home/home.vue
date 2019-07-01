<template>
    <view class="home-page">
        <view class="title">SINOTY</view>

        <!-- 轮播图 -->
        <uni-swiper-dot :info="banners" :current="current" mode="long" :dotsStyles="dotsStyles">
            <swiper
                :indicator-dots="false"
                :autoplay="true"
                :interval="3000"
                :duration="1000"
                loop
                class="banner"
                :style="{ height: windowHeight - 72 + 'px' }"
                @change="swiperChange"
            >
              <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex"
                           @tap="toDetail(banner.productId)">
                  <view class="swiper-item">
                    <image :style="{ height: windowHeight - 72 + 'px' }" lazy-load mode="aspectFill" class="banner-img"
                           :src="banner.url" alt=""></image>
                  </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>

        <!-- 第二屏 -->
        <view class="picture-presentation second">
            <!-- 顶部图片 -->
          <view class="picture-presentation-top">
            <image lazy-load mode="aspectFill" :src="second[0].url" @tap="toDetail(second[0].productId)" alt=""></image>
          </view>
            <!-- 底部展示区 -->
            <view class="picture-presentation-bottom">
                <!-- 小字title -->
              <view class="title">new fashion gathering place</view>
                <!-- 图片展示 -->
                <view class="exhibition">
                    <!-- 左部预览项目 -->
                    <view class="big-pic">
                        <!-- 商品图片 -->
                      <image lazy-load mode="aspectFill" :src="second[1].url" @tap="toDetail(second[1].productId)"
                             alt=""></image>
                    </view>

                    <!-- 右部预览项目 -->
                    <view class="sm-pic">
                      <view class="title">FASHION BRANDS</view>
                      <image lazy-load mode="aspectFill" :src="second[2].url" @tap="toDetail(second[2].productId)"
                             alt=""></image>

                    </view>
                </view>
            </view>
        </view>

        <!-- 第三屏 -->
        <view class="picture-presentation third">
            <!-- 顶部图片 -->
          <view class="picture-presentation-top">
            <image lazy-load mode="aspectFill" :src="third[0].url" @tap="toDetail(third[0].productId)" alt=""></image>
          </view>
            <!-- 底部展示区 -->
            <view class="picture-presentation-bottom">
                <!-- 小字title -->
              <view class="title">selection of high-quality item</view>
                <!-- 图片展示 -->
                <view class="exhibition">
                    <!-- 左部预览项目 -->
                    <view class="sm-pic">
                      <view class="title">HOT-SALE</view>
                      <image lazy-load mode="aspectFill" :src="third[1].url" @tap="toDetail(third[1].productId)"
                             alt=""></image>

                    </view>

                    <!-- 右部预览项目 -->
                    <view class="big-pic">
                        <!-- 商品图片 -->
                      <image lazy-load mode="aspectFill" :src="third[2].url" @tap="toDetail(third[2].productId)"
                             alt=""></image>
                    </view>
                </view>
            </view>
        </view>

        <!-- 第四屏 -->
        <view class="video">
            <view class="title">SINOTY</view>
            <video
              :direction="direction"
              class="my-video"
              poster=""
              src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni-app20190127.mp4"
              controls
              loop
            ></video>
            <view class="tel">如果您在选购中有疑问，请致电：0571-88888888</view>
        </view>

        <custmer-phone />
    </view>
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
        title: 'SINOTY',
        // 当前 swiper 索引
        current: 0,
        // 轮播图 指示器样式
        dotsStyles: {
          border: 'none',
          backgroundColor: 'rgba(0,0,0,.3)',
          selectedBorder: 'none',
          selectedBackgroundColor: 'rgba(0,0,0,.3)'
        },
        // banner高度
        windowHeight: 0
      };
    },
    onLoad() {
      let _this = this;
      uni.getSystemInfo({
        success: res => {
          console.log(res);
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
      toDetail(id) {
        authenticationTo({
          url: '/pages/shop-detail/shop-detail?id=' + id,
          status:this.userInfo.status
        });
      },
      swiperChange(e) {
        this.current = e.detail.current;
      },
      toSearch(e, val) {
        console.log(e, val);
        this['val' + val] = e;
      },

    }
  };
</script>

<style lang="scss" scoped>
.home-page {
    .title {
        text-align: center;
        font-style: Helvetica Bold;
        font-size: 72upx;
        font-weight: bold;
    }

    .banner {
        padding: 0 $white-space;
        margin-top: 40upx;
        height: 966upx;
        .banner-img {
            height: 966upx;
        }
    }

    .picture-presentation {
        padding: 0 $white-space;
        margin: 20upx 0;
        .picture-presentation-top {
            width: 690upx;
            height: 400upx;
            margin: 30upx 0;
            overflow: hidden;
            > image {
                height: 400upx;
            }
        }

        .picture-presentation-bottom {
            margin-top: 32upx;
            .title {
                color: $uni-text-color-grey;
                font-size: 24upx;
            }

            .exhibition {
                display: flex;
                justify-content: space-between;
                margin-top: 20upx;
                .big-pic,
                .sm-pic {
                    width: 320upx;
                    .name {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12upx 8upx 0;
                        font-size: 32upx;
                        .more {
                            width: 28upx;
                            height: 28upx;
                        }
                    }
                    .shop-count {
                        padding: 8upx;
                        font-weight: lighter;
                        font-size: 20upx;
                        color: $uni-text-color-grey;
                    }
                }

                .big-pic > image {
                    height: 470upx;
                }

                .sm-pic {
                    .title {
                        position: relative;
                        font-size: 32upx;
                        color: $uni-text-color;
                        font-weight: bold;
                        &:after {
                            position: absolute;
                            width: 30upx;
                            top: 2em;
                            content: '';
                            border-top: 6upx solid $theme-color;
                        }
                    }
                    > image {
                        height: 332upx;
                        margin-top: 100upx;
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
            padding: 48upx 0 0;
            margin: 0 30upx;
            font-size: 48upx;
            text-align: center;
            color: #fff;
            border-bottom: 2upx solid #aaaaaa;
        }
        .my-video {
            margin: 0 auto;
            width: 690upx;
            height: 386upx;
            margin: 50upx 0 30upx;
            border-radius: 8upx;
        }
        .tel {
            padding: 0 $white-space 34upx;
            font-size: 20upx;
            text-align: left;
            color: $uni-text-color-grey;
        }
    }
}
</style>
