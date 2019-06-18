<template>
    <view class="detail">
        <!-- 顶部图片 -->
        <view class="shop-pic">
            <uni-swiper-dot :info="banners" :current="current" mode="long" :dotsStyles="dotsStyles">
                <swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" loop class="banner" @change="swiperChange">
                    <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex" @tap.stop="showBig(bannerIndex)">
                        <view class="swiper-item"><image lazy-load mode="aspectFill" class="banner-img" :src="banner" alt=""></image></view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>

            <!-- 轮播图上的浮动按钮 -->
            <view class="buttons">
                <view>
                  <image src="../../static/icon/collect.png" mode=""></image>
                    <text>收藏</text>
                </view>

                <view>
                  <image src="../../static/icon/share.png" mode=""></image>
                    <text>分享</text>
                </view>
            </view>

            <view class="add" @tap="showButton = !showButton">
              <image src="../../static/icon/reduce.png" mode="" v-if="showButton"></image>
              <image src="../../static/icon/add.png" mode="" v-else></image>
                <view :class="['add-show', { active: showButton }]">
                    <view class="fit" @tap="toFit">
                      <image src="../../static/icon/3d@2x.png" mode=""></image>
                        <text>试衣</text>
                    </view>
                  <view class="simalar" @tap="toRecognition(product.id,product.imageShow)">
                      <image src="../../static/icon/s.png" mode=""></image>
                        <text>相似</text>
                    </view>
                </view>
            </view>
        </view>

      <view class="shop-name">{{ product.pno }}</view>

        <view class="shop-sales">
          <text class="sale">月销 {{ product.monthlySales }} 米</text>

            <view class="price">
              ￥{{ product.price }}
              <text>/{{ product.unit }}</text>
            </view>
        </view>

        <view class="shop-select" @tap="selectShow = true">
            <text>商品选择</text>
          <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
        </view>
        <view class="shop-detail">
            商品详情
            <view class="list">
              <view v-for="(value,key) of product.parameters" :key="key" class="item">
                {{ key }}：{{ value }}
              </view>
            </view>
        </view>

      <image
        class="ad-img"
        :src="pic"
        :key="key"
        mode="widthFix"
        v-for="(pic,key) in product.adPicture"></image>

        <view class="guess">猜您喜欢</view>

        <view class="shop-list" v-if="!selectShow">
          <view class="shop-item" v-for="(value,key) in product.similar"
                :key="key"
                @tap="toDetail(value.id)"
          >
            <image :src="value.imageShow" mode=""></image>
                <view class="shop-name">
                  <text>{{ value.pno }}</text>
                  <view class="sold">{{ value.purchaseNum }}人已购买</view>
                </view>
            </view>
        </view>

      <view class="bottom" v-if="!selectShow && product.status === 1">
            <view class="icons">
                <view class="icon" @tap="toHome">
                  <image src="../../static/icon/homepage_fill.svg" mode=""></image>
                    <text>首页</text>
                </view>
                <view class="icon" @tap="toShopCar">
                  <image src="../../static/icon/service_fill@2x.png" mode=""></image>
                    <view class="badge">1</view>
                    <text>购物车</text>
                </view>
                <view class="icon" @tap="toContact">
                  <image src="../../static/icon/phone.png" mode=""></image>
                    <text>客服</text>
                </view>
            </view>
            <view class="buttons">
                <view class="add-cart">加入购物车</view>

                <view class="buy-now">立即购买</view>
            </view>
        </view>

        <!-- // 下架按钮 -->

      <view class="sold-out" v-if="product.status === 0">该商品已下架</view>

        <view class="white-space"></view>

        <!--  弹窗 -->
        <view class="pop-wrap" v-show="selectShow" @touchmove.stop.prevent="moveHandle" @tap.stop="selectShow = false">
            <view class="my-pop" @tap.stop>
                <view class="close" @tap.stop="selectShow = false"><view class="close-button"></view></view>
                <view class="pop-header">
                    <image :src="product.imageShow" mode="widthFix"></image>
                    <view class="right">
                        <view class="name">{{ product.pno }}</view>
                        <view class="sold">月销 {{ product.monthlySales }} 米</view>

                        <view class="price">
                            ¥{{ product.price }}
                            <text>/{{ product.unit }}</text>
                        </view>
                    </view>
                </view>

                <view class="select-much">
                    <view class="title">数量选择</view>
                    <view class="rest">库存 {{ product.stock }} 米</view>
                    <uni-number-box :min="0" :max="99999" :step="1" :value="num" @change="numChange"></uni-number-box>
                    <view class="rest unit">米</view>
                </view>

                <view class="select-small">
                    <view class="title">小样选择</view>
                    <view :class="['tags']">
                        <uni-tag
                            class="tag"
                            :text="tag"
                            :type="'success'"
                            :inverted="true"
                            v-for="(tag, index) in tagsList"
                            :key="index"
                        />
                    </view>
                </view>

                <view class="button">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
  import { uniSwiperDot, uniTag } from '@dcloudio/uni-ui';
  import uniNumberBox from '../../components/uni-number-box/uni-number-box.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    components: {
      uniSwiperDot,
      uniNumberBox,
      uniTag
    },
    onLoad(query) {
      let id = query.id
      this.getProduct(id)
    },
    data() {
      return {
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

        // 轮播图 显示更过按钮
        showButton: false,

        // 弹窗
        selectShow: false,

        // 购买数量
        num: 0,

        tagsList: ['标样'],
        // 当前选中标签
        tagCurrentSelect: [],

        // 显示大图
        bigShow: -1,
      };
    },
    computed: {
      ...mapState('Products', {
        banners: state => state.product.carouselFigure,
      }),
      ...mapState('Products', ['product'])
    },
    methods: {
      ...mapActions('Products', ['getProduct']),
      swiperChange(e) {
        this.current = e.detail.current;
      },
      numChange(val) {
        console.log(val);
      },
      selectTag(currentState, tag_name) {
        // 直接修改数组会卡。。。
        if (this[currentState].includes(tag_name)) {
          return;
        } else {
          this[currentState] = [];
          this[currentState].push(tag_name);
        }

        // this[currentState][0] = tag_name;
      },

      // 放大图片
      showBig(index) {
        console.log(index);
        this.currentBig = index;
        uni.previewImage({
          current: this.banners[index],
          urls: this.banners,
          indicator: true,
          loop: true
        });
      },
      toFit() {
        uni.navigateTo({
          url: '/fitting/fitting'
        });
      },
      toRecognition(id, imgUrl) {
        uni.navigateTo({
          url: '/pages/recognition/recognition?id=' + id + '&imgUrl=' + imgUrl
        });
      },
      toHome() {
        uni.switchTab({
          url: '/pages/home/home'
        });
      },
      toShopCar() {
        uni.switchTab({
          url: '/pages/shopCar/shopCar'
        });
      },
      toContact() {
        uni.navigateTo({
          url: '/contact/contact'
        });
      },
      toDetail(id) {
        uni.navigateTo({
          url: '/pages/shop-detail/shop-detail?id=' + id
        });
      },
      moveHandle() {
      }
    }
  };
</script>

<style scoped lang="scss">
.detail {
    .shop-pic {
        position: relative;
        .banner,
        image {
            width: 750upx;
            height: 560upx;
        }
        .buttons {
            position: absolute;
            top: 0upx;
            width: 750upx;
            height: 60upx;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: white;
            font-size: 14px;
            font-family: PingFang-SC-Bold;
            background: linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.46) 100%);
            view {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                margin-top: 5upx;
                image {
                    width: 32upx;
                    height: 32upx;
                    margin-right: 20upx;
                }
            }
        }
        .add {
            position: absolute;
            right: 30upx;
            bottom: 30upx;
            width: 80upx;
            height: 80upx;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            image {
                width: 60upx;
                height: 60upx;
            }

            .add-show {
                position: absolute;
                width: 80upx;
                height: 0upx;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                background: #fff;
                border-radius: 40upx;
                overflow: hidden;
                transition: all 0.3s ease;

                &.active {
                    top: -220upx;
                    height: 206upx;
                    background: rgba(255, 255, 255, 0.8);
                }

                image {
                    width: 40upx;
                    height: 40upx;
                }

                view {
                    width: 80upx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                }

                text {
                    font-size: 16upx;
                    line-height: 2;
                }

                .fit:after {
                    position: absolute;
                    top: 100upx;
                    content: '';
                    width: 28upx;
                    height: 2upx;
                    background: #333;
                }
            }
        }
    }

    .shop-name {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #333;
        padding: $white-space $white-space 0;

      text {
        max-width: 65%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .shop-sales {
        display: flex;
        padding: 30upx $white-space;
        justify-content: space-between;
        height: 64upx;
        font-size: 20upx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #999;
        padding: 0 $white-space;
        letter-spacing: 0.01em;

        .sale {
            margin-top: 10upx;
        }
        .price {
            height: 128upx;
            font-family: DINAlternate-Bold;
            font-size: 48upx;
            color: #c50000;
            margin-top: -16upx;

            text {
                height: 128upx;
                font-family: PingFang-SC;
                font-weight: 300;
                font-size: 20upx;
                color: #999;
            }
        }
    }

    .shop-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30upx 0;
        margin: 0 $white-space;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        border-top: 2upx solid #eeeeee;
        border-bottom: 2upx solid #eeeeee;
        image {
            height: 14upx;
            width: 26upx;
            transform: rotate(-90deg);
        }
    }

    .shop-detail {
        margin: 30upx $white-space;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;

        .list {
            padding: 20upx 0;
            .item {
                font-size: 24upx;
                font-family: PingFang-SC-Medium;
                line-height: 50upx;
                color: #666;
                &:before {
                    content: '· ';
                }
            }
        }
    }

    .guess {
        padding: 20upx $white-space;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
    }

    .shop-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 750upx - 2 * $white-space;
        padding: 0 $white-space;
        .shop-item {
            font-size: 28upx;
            color: #333;
            width: 330upx;
            margin-bottom: 18upx;
            image {
                width: 330upx;
                height: 360upx;
            }
            .shop-name {
                display: flex;
                padding: 10upx 0;
                justify-content: space-between;
                align-items: center;
                .sold {
                    color: #999;
                    font-size: 20upx;
                    font-weight: 400;
                }
            }
        }
    }

    .bottom {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        width: 750upx;
        height: 98upx;
        background: #fff;
        box-shadow: 0 -2upx 6upx 0 rgba(204, 204, 204, 0.5);
        .icons {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 98upx;
            width: 312upx;
            .icon {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &:after {
                    position: absolute;
                    content: '';
                    width: 2upx;
                    height: 30upx;
                    background: #333333;
                    top: 4upx;
                    left: -32upx;
                }
                image {
                    width: 34upx;
                    height: 34upx;
                }
                text {
                    font-size: 20upx;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: #333;
                    line-height: 2;
                }
            }
        }

        .buttons {
            width: 400upx;
            height: 94upx;
            display: flex;

            border: 2upx solid $theme-color;
            border-radius: 8upx 0 0 8upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            font-size: 28upx;

            view {
                width: 50%;
                line-height: 98upx;
                text-align: center;
            }

            .add-cart {
                color: $theme-color;
                background: #fff;
            }
            .buy-now {
                color: #fff;
                background: $theme-color;
            }
        }
    }

    .white-space {
        height: 98upx;
    }

    view.badge {
        position: absolute;
        height: 20upx;
        min-width: 20upx;
        text-align: center;
        line-height: 20upx;
        top: -5upx;
        right: 5upx;
        font-size: 10upx;
        color: #fff;
        background: #c50000;
        border-radius: 10upx;
    }

    .pop-wrap {
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .my-pop {
            z-index: 99999;
            position: fixed;
            bottom: 0upx;
            width: 670upx;
            height: 620upx;
            background: #fff;
            padding: 80upx 40upx 0;
            border-radius: 8upx;

            .close {
                position: absolute;
                top: 0;
                left: 0;
                width: 750upx;
                height: 60upx;
                // background: #c50000;

                .close-button {
                    position: absolute;
                    top: 20upx;
                    left: 50%;
                    width: 48upx;
                    height: 8upx;
                    margin-left: -24upx;
                    border-radius: 4upx;
                    background: #999;
                }
            }
        }

        .pop-header {
            display: flex;
            justify-content: flex-start;

            image {
                width: 200upx;
                height: 200upx;
            }
            .right {
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                width: 480upx;
                height: 200upx;

                view {
                    margin-left: 40upx;
                    width: 440upx;
                    height: 40upx;
                }

                .name {
                    font-size: 28upx;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: #333;
                }
                .sold {
                    font-size: 20upx;
                    font-family: PingFang-SC-Medium;
                    color: #999;
                    margin-top: -20upx;
                }
                .price {
                    align-self: flex-end;
                    color: #c50000;
                    text {
                        color: #999;
                        font-size: 20upx;
                    }
                }
            }
        }

        .select-much {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 40upx;
            margin-bottom: 32upx;
            .rest {
                font-size: 20upx;
                font-family: PingFang-SC-Regular;
                color: #999;
                margin-left: 30upx;
            }

            .unit {
                margin-left: 10upx;
            }
        }

        .select-small {
            padding-top: 32upx;
            display: flex;
            align-items: center;
            border-top: 2upx solid #eee;
        }

        .button {
            $height: 80upx;
            width: 100%;
            height: $height;
            line-height: $height;
            text-align: center;
            background: $theme-color;
            font-size: 28upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: #fff;
            border-radius: 8upx;
            margin-top: 64upx;
        }
    }

    .title {
        font-size: 28upx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #333;
    }

    .tags {
        width: 75%;
        height: 64upx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-left: 30upx;
        transition: max-height 0.3s ease-in-out;

        .tag {
            margin: 0 0 30upx;
            width: 140upx;
            padding: 0;
            text-align: center;
            font-size: 24upx;
        }
    }

    .sold-out {
        width: 100%;
        height: 98upx;
        position: fixed;
        bottom: 98upx;
        line-height: 98upx;
        background: #666;
        color: #fff;
        text-align: center;
        font-size: 28upx;
    }

    .big {
        position: fixed;
        top: 0;
        background: black;
        width: 100vw;
        height: 100vh;
        .banner {
            margin-top: 90%;
        }

        .big-img {
        }
    }

  .ad-img{
    width: 100%;
  }
}
</style>
