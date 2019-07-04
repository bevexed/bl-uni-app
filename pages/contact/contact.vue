<template>
  <view class="contact">
    <view class="title">
      CONTACT
      <text>US</text>
      <view class="contact-us">联系我们</view>
    </view>

    <view class="contact-type">
      <text>A：扫码关注公众号，掌握我们最新的信息</text>
      <img alt="" show-menu-by-longpress src="../../static/imgs/contact/1555926754105.jpg"/>

      <text>B：您还可以通过以下方式联系我们</text>

      <view class="contact-detail">
        <view @longtap="copy({data:'0571-88888888',title:'电话号已复制'})">
          <text class="label">电话：</text>
          <text class="value">0571-88888888</text>
        </view>
        <view @longtap="copy({data:'123123123',title:'QQ已复制'})">
          <text class="label">QQ：</text>
          <text class="value">123123123</text>
        </view>
        <view @longtap="copy({data:'www.123123.com',title:'官网已复制'})">
          <text class="label">官网：</text>
          <text class="value">www.123123.com</text>
        </view>
        <view @longtap="copy({data:'杭州文一西路中节能西溪首 座A1-1 310室',title:'地址已复制'})">
          <text class="label">地址：</text>
          <text class="value">杭州文一西路中节能西溪首 座A1-1 310室</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { copy } from "../../utils";

  export default {
    data() {
      return {};
    },
    methods: {

      copy,

      scan() {
        uni.scanCode({
          success: function (res) {
            console.log('条码类型：' + res.scanType);
            console.log('条码内容：' + res.result);
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../uni";

  .contact {
    text-align: center;

    .title {
      margin: upx(50) 0 upx(70);
      font-size: upx(48);
      font-weight: bold;

      text {
        margin-left: 0.5em;
        color: $theme-color;
      }

      .contact-us {
        font-size: upx(40);
        font-family: 苹方 特细, serif;
        font-weight: 100;
      }
    }

    .contact-type {
      width: 262px;
      text-align: left;
      margin: 0 auto;

      > text {
        font-family: 平方 粗体, serif;
        font-weight: bold;
        font-size: upx(28);
        color: $uni-text-color;
      }

      img {
        display: block;
        margin: upx(60) auto upx(120);
        width: upx(294);
        height: upx(294);
      }

      .contact-detail {
        width: upx(420);
        margin: upx(46) 0 0 upx(40);
        text-align: left;

        view {
          display: flex;
          justify-content: space-around;
          font-size: upx(28);
          margin-bottom: upx(32);

          .label {
            width: upx(90);
            font-family: 苹方 常规, serif;
            color: $uni-text-color-grey;
          }

          .value {
            width: upx(300);
            color: $uni-text-color;
          }
        }
      }
    }
  }
</style>
