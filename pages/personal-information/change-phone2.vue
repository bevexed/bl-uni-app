<template>
  <div class="change-phone">

    <footer class="header">
      <input type="number" maxlength="11" placeholder="请输入新手机号" v-model="phone">
    </footer>

    <footer>
      <input type="number" maxlength="6" placeholder="请输入验证码" v-model="code">
      <div></div>
      <text @tap="sendMsg">{{ send ? '重新获取(' + time + 's)' : '获取验证码' }}</text>
    </footer>


    <view
      :class="['button', { sended: send && code.length === 6 && phone.length ===11 }]"
      @tap="changePhone({phone,verify:code})">完成
    </view>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { SMG } from "../../unit";

  export default {
    data() {
      return {
        phone: '',
        // 验证码
        code: '',
        // 是否 已发送 短信
        send: false,
        // 倒计时
        time: 60,
        // 定时器，
        timer: null
      }
    },
    computed: mapState('User', ['userInfo']),
    methods: {
      ...mapActions('User', ['getVerify', 'getIsExist', 'doLogin', 'changePhone']),
      async sendMsg() {

        let { send, time, timer, phone } = this;

        let p = /^1[0-9]{10}$/;

        if (!p.test(phone)) {
          SMG('请检测手机号');
          return
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

      to() {
        uni.redirectTo({
          url: '/pages/personal-information/change-phone2'
        })
      }
    }
  };
</script>


<style lang="scss">
  @function upx($size) {
    @return $size + upx
  }

  .change-phone {
    text-align: center;
    padding: upx(40) 0;

    img {
      width: upx(120);
      height: upx(120);
      margin-top: upx(76);
    }

    .phone {
      padding: upx(40);
      font-size: upx(28);
      font-family: PingFang-SC-Bold, serif;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

    footer {
      display: flex;

      align-items: center;

      font-size: upx(32);
      font-family: PingFang-SC-Regular, serif;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);

      width: upx(640);
      height: upx(100);
      border: upx(1) solid #EEE;

      margin: 0 auto;
      padding: 0 upx(20);
      border-radius: upx(8);

      input {
        width: upx(380);
        text-align: left;
        flex: 1;
      }

      div {
        width: upx(4);
        height: upx(32);
        background: #eee;
        margin: 0 upx(20);
      }

      text {
        color: $theme-color;
      }
    }

    .button {
      position: fixed;
      bottom: upx(80);
      left: 0;
      right: 0;
      margin: auto;

      width: upx(690);
      font-size: upx(28);
      font-family: PingFang-SC-Bold, serif;
      font-weight: bold;
      color: #fff;
      background: #eee;
      text-align: center;
      border-radius: upx(8);
      height: upx(80);
      line-height: upx(80);

      &.sended {
        color: white;
        background: $theme-color;
      }
    }

    .header {
      margin-bottom: upx(30);
    }

  }
</style>
