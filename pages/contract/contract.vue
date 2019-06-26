<template>
  <view class="home-page">
    <view class="title">合同</view>

    <!-- 轮播图 -->
    <swiper
      class="banner"
      :style="{ height: windowHeight - 72 + 'px' }"
      @change="swiperChange"
    >

      <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex">
        <view class="swiper-item">
          <image :style="{ height: windowHeight - 72 + 'px' }" lazy-load mode="" class="banner-img"
                 :src="banner" alt=""></image>
        </view>
      </swiper-item>
    </swiper>

    <view class="bot">
      {{ current+ 1 + '/'+ banners.length }}
    </view>
  </view>
</template>

<script>

  import { reqContractDetail } from "../../api/contract";

  export default {

    data() {
      return {
        title: 'SINOTY',
        banners: [1, 2, 3],
        // 当前 swiper 索引
        current: 0,
        // banner高度
        windowHeight: 0
      };
    },
    onLoad(e) {
      const { orderId } = e;
      this.contractDetail(orderId);
      let _this = this;
      uni.getSystemInfo({
        success: res => {
          console.log(res);
          _this.windowHeight = res.windowHeight;
          _this.windowWidth = res.windowWidth;
        }
      });
    },

    methods: {
      swiperChange(e) {
        this.current = e.detail.current;
      },
      async contractDetail(orderId) {
        let res = await reqContractDetail(orderId);
        if (res.code === 200) {
          this.banners = res.data.contract.split(',');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-page {
    .title {
      text-align: center;
      font-style: Helvetica Bold;
      font-size: 72 upx;
      font-weight: bold;
    }

    .banner {
      padding: 0 $white-space;
      margin-top: 40 upx;
      height: 966 upx;

      .banner-img {
        height: 966 upx;
      }
    }

    .bot {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
</style>
