<template>
    <view class="post-information">
        <view class="title">快递单信息</view>

        <view class="list">
          <picker
            mode="selector"
            :range="postList"
            range-key="key"
            :value="value"
            @change="changePost"
          >
            <view class="item flex" @tap="">
              <text class="label">快递公司</text>
              <view class="flex">
                <view class="label">{{ postList[value].key }}</view>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
              </view>
            </view>
          </picker>


          <view class="item flex" @tap="">
                <text class="label">快递单号</text>
            <input type="text" value="" placeholder="请输入快递单号" v-model="trackNum"
                   placeholder-style="font-size:14px;color:#999;text-align:right"/>
            </view>

            <view class="item flex" @tap="">
                <text class="label">寄件人姓名</text>
              <input type="text" value="" placeholder="请输入寄件人姓名" v-model="senderName"
                     placeholder-style="font-size:14px;color:#999;text-align:right"/>
            </view>

            <view class="item flex" @tap="">
                <text class="label">寄件人电话</text>
              <input type="number" value="" placeholder="请输入寄件人电话" v-model="senderPhone" maxlength="11"
                     placeholder-style="font-size:14px;color:#999;text-align:right"/>
            </view>
        </view>

      <view
        :class="['pay-button', { active:postList[value].key && senderName && senderPhone.length === 11 && trackNum }]"
        @tap="fillExpressInfo">
        确定
      </view>
    </view>
</template>

<script>
  import { reqFillExpressInfo } from "../../api/sale";
  import { MSG_BACK, SMG } from "../../utils";

  export default {
    data() {
      return {
        afterSaleId: "",
        expressCompany: '',
        senderName: "",
        senderPhone: "",
        trackNum: "",

        value: '',
        postList: [
          { value: '', key: '' },
          { value: 0, key: '顺丰快递' },
          { value: 10, key: '韵达快递' },
          { value: 20, key: '圆通快递' },
          { value: 30, key: '中通快递' },
          { value: 40, key: '申通快递' },
          { value: 50, key: '中国邮政' },
          { value: 60, key: '其他快递' }
        ]
      }
    },
    onLoad(e) {
      this.afterSaleId = e.afterSaleId
    },
    methods: {
      changePost(e) {
        this.value = e.detail.value;
      },

      async fillExpressInfo() {
        if (this.postList[this.value].value === '') {
          return SMG('请完整填写快递单信息')
        }

        if (!this.senderName) {
          return SMG('请完整填写快递单信息')
        }

        let p = /^1[0-9]{10}$/;
        if (!p.test(this.senderPhone)) {
          return SMG('请完整填写快递单信息')
        }

        if (!this.trackNum) {
          return SMG('请完整填写快递单信息')
        }

        let res = await reqFillExpressInfo({
          afterSaleId: this.afterSaleId,
          expressCompany: this.postList[this.value].value,
          senderName: this.senderName,
          senderPhone: this.senderPhone,
          trackNum: this.trackNum
        })

        if (res.code === 200) {
          MSG_BACK({
            title: '地址上传成功',
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../uni";
.post-information {
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding: 12upx 0;
        text-align: center;
    }
    .list {
        .item {
            border-top: 2upx solid #eeeeee;
            padding: $white-space 0;
            margin: 0 $white-space;

            &:last-child {
                border-bottom: 2upx solid #eeeeee;
            }

            .label {
                font-size: 28upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            .arrow {
                width: 24upx;
                height: 28upx;
                transform: rotate(270deg);
            }

            input {
                width: 228upx;
              text-align: right;
            }
        }

        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .button {
        position: fixed;
        bottom: 45px;
        width: 692upx;
        margin: $white-space;
        margin-top: 20upx;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #fff;
        background: $theme-color;
        text-align: center;
        border-radius: 8upx;
        height: 80upx;
        line-height: 80upx;
    }

  .pay-button {
    position: fixed;
    bottom: upx(100);
    left: 0;
    right: 0;
    $height: upx(80);
    height: $height;
    line-height: $height;
    width: upx(692);
    margin: upx(226) auto upx(68);
    text-align: center;
    background: #cccccc;
    border-radius: upx(8);
    color: #fff;
    font-size: upx(28);

    &.active {
      background: $theme-color;
    }
  }
}
</style>
