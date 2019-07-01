<template>
  <div class="pay">
    <div class="title">选择支付方式</div>
    <div class="pay-types">
      <div class="type" @tap="changePayType('wxPay')">
        <div :class="['select', { active: payTypes.wxPay }]">
          <div class="selected"></div>
        </div>
        <text @tap="wxPay">微信支付</text>
      </div>
      <div class="type">
        <div :class="['select', { active: payTypes.bankPay }]" @tap="changePayType('bankPay')">
          <div class="selected"></div>
        </div>
        <text @tap="changePayType('bankPay')">银行转账</text>
        <div class="upload" @tap="chooseImg" :style="{color:payTypes.bankPay?'#bfa065':'#999'}">点击上传汇款凭证</div>
      </div>
    </div>
    <div class="button" @tap="payOrder(payData)">确认支付</div>
  </div>
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
            await this.wxPay(code);
            break;
          case 'bankPay':
            await this.bankPay();
            break;
        }
      },

      // fixMe:支付
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
        if (!this.payTypes.bankPay) {
          return
        }
        const that = this;
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success(res) {
            console.log(res);
            pathToBase64(res.tempFilePaths[0]).then(async base64 => {
              that.bankTransferRecord = base64.split('base64,')[1];
              // 截取20个字符串用作文件名
              that.filename = res.tempFilePaths[0].slice(-20)
            }).then(() => {
              that.bankPay();
            })
          }
        });
      }

    }
  };
</script>

<style lang="scss" scoped>
  @import "../../uni";

  .pay {
    padding: 0 $white-space;

    .title {
      font-size: upx(32);
      font-family: PingFang-SC-Bold, serif;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }

    .pay-types {
      padding: upx(20) 0;

      .type {
        display: flex;
        align-items: center;
        font-size: upx(32);
        font-weight: 400;
        padding: upx(50) 0 upx(32);
        border-top: upx(2) solid #eeeeee;

        &:last-child {
          border-bottom: upx(2) solid #eeeeee;
        }

        text {
          margin-left: upx(20);
          flex: 1;
        }
      }
    }

    .upload {
      font-size: upx(24);
      font-family: PingFang-SC-Regular, serif;
      font-weight: 400;
      color: $theme-color;
      text-decoration: underline;
    }

    .rule {
      text-align: center;
      margin-top: upx(620);
    }

    .supply {
      font-size: upx(24);
      font-family: PingFang-SC-Medium, serif;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      text-align: center;
      margin-top: upx(4);
    }

    .button {
      margin-top: upx(20);
      font-size: upx(28);
      font-family: PingFang-SC-Bold, serif;
      font-weight: bold;
      color: #fff;
      background: $theme-color;
      text-align: center;
      border-radius: upx(8);
      height: upx(80);
      line-height: upx(80);
    }

    .select {
      display: flex;
      justify-content: center;
      align-items: center;
      width: upx(30);
      height: upx(30);
      border-radius: 50%;
      border: 1px solid rgba(204, 204, 204, 1);

      &.active {
        border-color: $theme-color;

        .selected {
          width: upx(18);
          height: upx(18);
          background: $theme-color;
          border-radius: 50%;
        }
      }
    }
  }
</style>
