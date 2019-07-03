<template>
    <view class="login">
        <view class="title">手机验证登录</view>

        <view class="form">
            <view class="phone">
                <image src="../../static/icon/phone.svg" mode=""></image>
              <input type="number" v-model="phone" maxlength="11" placeholder="请输入11位电话号码"
                     placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px"/>
            </view>
            <view class="code">
                <image src="../../static/icon/AK.svg" mode=""></image>
                <input type="number" v-model="code" maxlength="6" placeholder="请输入验证码" placeholder-style="color:#cccccc;font-weight:300;font-size:16px" />
                <view :class="['button', { active: phone.length === 11 && !send }, { sended: send }]" @tap="sendMsg">{{ send ? '重新获取(' + time + 's)' : '获取验证码' }}</view>
            </view>
        </view>


      <view :class="['pay-button', { active: phone.length === 11 && code.length >= 4 }]" @tap="toHome">
        登录
      </view>
    </view>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { TO } from "../../utils";

  export default {
    data() {
      return {
        // 是否同意
        agreement: false,
        // 电话号
        phone: '',
        // 验证码
        code: '',
        // 是否 已发送 短信
        send: false,
        // 倒计时
        time: 60,
        // 定时器，
        timer: null
      };
    },
    computed: mapState('User', ['exist']),
    methods: {
      ...mapActions('User', ['getVerify', 'getIsExist', 'doLogin']),
      async sendMsg() {

        let { phone, send, time, timer, exist } = this;
        let result = await this.getIsExist(this.phone);
        if (!result) {
          return
        }

            if (!phone) {
                return;
            }

            if (phone.length < 11) {
                return;
            }

            if (send) {
                return;
            }

            if (timer) {
                return;
            }

            this.send = true;

        // 发送信息获取验证码
        let res = await this.getVerify(phone);
        if (!res) {
          return
        }

        this.timer = setInterval(() => {
          time--;
          this.time = time;
          if (time === 0) {
            this.time = 60;
            this.send = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
        },

      async toHome() {
        let { phone, code } = this;
        if (phone.length === 11 && code.length >= 4) {
          await this.doLogin({ phone, verify: code });
        }
      },

    }
};
</script>

<style lang="scss" scoped>
.login {
    padding: $white-space;
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    .form {
        margin-top: 256upx;
    }

    .phone,
    .code {
        display: flex;
        align-items: center;
        margin-top: 100upx;
        padding: 14upx 0;
        border-bottom: 2upx solid #eeeeee;
    }

    input {
        flex: 1;
    }

    .button {
        width: 162upx;
        height: 52upx;
        line-height: 52upx;
        background: rgba(170, 170, 170, 0.3);
        color: #fff;
        font-size: 24upx;
        border-radius: 8upx;
        text-align: center;
        border: 2upx solid transparent;
        padding: 0 12upx;
        &.active {
            background: $theme-color;
        }

        &.sended {
            background: #fff;
            color: $theme-color;
            border: 2upx solid $theme-color;
        }
    }

    image {
        width: 36upx;
        height: 36upx;
        margin-right: 20upx;
    }

    .agreement {
        display: flex;
        align-items: center;
        font-size: 20upx;
        color: #666;
        margin-top: 28upx;
        .select {
            margin-right: 20upx;
        }
        .star {
            font-weight: bold;
            color: #c50000;
        }

        .href {
            color: #333;
            font-weight: 500;
            text-decoration: underline;
        }
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

    .pay-button {
        $height: 80upx;
        height: $height;
        line-height: $height;
        width: 692upx;
        margin: 226upx auto 68upx;
        text-align: center;
        background: #cccccc;
        border-radius: 8upx;
        color: #fff;
        font-size: 28upx;
        &.active {
            background: $theme-color;
        }
    }
}
</style>
