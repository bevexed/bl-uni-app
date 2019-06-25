<template>
    <view class="pay">
        <view class="title">选择支付方式</view>
        <view class="pay-types">
          <view class="type" @tap="changePayType('wxPay')">
            <view :class="['select', { active: payTypes.wxPay }]">
              <view class="selected"></view>
            </view>
                <text @tap="wxPay">微信支付</text>
            </view>
            <view class="type">
              <view :class="['select', { active: payTypes.bankPay }]" @tap="changePayType('bankPay')">
                <view class="selected"></view>
              </view>
              <text @tap="changePayType('bankPay')">银行转账</text>
              <view class="upload" @tap="chooseImg">点击上传汇款凭证</view>
            </view>
        </view>

      <!--        <view class="rule upload">账户规则</view>-->
      <!--        <view class="supply">本服务由新天元财富提供</view>-->
      <view class="button" @tap="payOrder(payData)">确认支付</view>
    </view>
</template>

<script>
  import { pathToBase64, base64ToPath } from 'image-tools';

  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        payTypes: { wxPay: false, bankPay: false },
        orderNum: '',
        amount: '',

        bankTransferRecord: '',
        filename: '',
        payData: {}
      };
    },

    onLoad(e) {
      const { orderNum, amount } = e;
      this.orderNum = orderNum;
      this.amount = amount;


    },

    methods: {
      ...mapActions('Order', ['payOrder']),
      ...mapActions('User', ['getCode']),

      async changePayType(cur) {
        let { payTypes } = this;
        Object.entries(payTypes).map(([key, value]) => {
          this.payTypes[key] = false;
        });
        this.payTypes[cur] = true;

        // 准备数据
        switch (cur) {
          case 'wxPay':
            await this.wxPay();
            break;
          case 'bankPay':
            await this.bankPay();
            break;
        }
      },

      async wxPay() {
        let { orderNum, amount } = this;

        const code = await this.getCode();

        this.payData = {
          orderNum,
          code,
          amount,
          paymentMethod: 10,
        };
      },

      bankPay() {
        let { orderNum, bankTransferRecord, filename } = this;
        this.payData = {
          orderNum,
          paymentMethod: 0,
          bankTransferRecord,
          filename
        };
      },


      chooseImg() {
        const that = this;
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success(res) {
            console.log(res);
            pathToBase64(res.tempFilePaths[0]).then(async base64 => {
              that.bankTransferRecord = base64;
              that.filename = base64.slice(100, 106);
            })
          }
        });
      }

    }
  };
</script>

<style lang="scss" scoped>
.pay {
    padding: 0 $white-space;
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
    }

    .pay-types {
        padding: 20upx 0;

        .type {
            display: flex;
            align-items: center;
            font-size: 32upx;
            font-weight: 400;
            padding: 50upx 0 32upx;
            border-top: 2upx solid #eeeeee;

            &:last-child {
                border-bottom: 2upx solid #eeeeee;
            }
            text {
                margin-left: 20upx;
                flex: 1;
            }
        }
    }

    .upload {
        font-size: 24upx;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: $theme-color;
        text-decoration: underline;
    }

    .rule {
        text-align: center;
        margin-top: 620upx;
    }

    .supply {
        font-size: 24upx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        margin-top: 4upx;
    }

    .button {
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

    .select {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30upx;
        height: 30upx;
        border-radius: 50%;
        border: 1px solid rgba(204, 204, 204, 1);
        &.active {
            border-color: $theme-color;
            .selected {
                width: 18upx;
                height: 18upx;
                background: $theme-color;
                border-radius: 50%;
            }
        }
    }
}
</style>
