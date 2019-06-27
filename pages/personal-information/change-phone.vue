<template>
  <div class="change-phone">
    <img :src="userInfo.avatar" alt="">

    <div class="phone"> {{ userInfo.phone && userInfo.phone.slice(0,3) }} **** {{ userInfo.phone && userInfo.phone.slice(7) }}</div>

    <footer>
      <input type="number" maxlength="6" placeholder="请输入验证码" v-model="code">
      <div></div>
      <text @tap="sendMsg">{{ send ? '重新获取(' + time + 's)' : '获取验证码' }}</text>
    </footer>


    <view :class="['button', { sended: send && code.length === 6 }]" @tap="to()">下一步</view>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { reqCheckVerify } from "../../api/user";
  import { SMG } from "../../unit";

  export default {
    data() {
      return {
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
      ...mapActions('User', ['getVerify']),
      async sendMsg() {

        let { send, time, timer } = this;

        if (send) {
          return;
        }

        if (timer) {
          return;
        }

        // 发送信息获取验证码
        let res = await this.getVerify(this.userInfo.phone);
        if (!res) {
          return
        }

        this.send = true;


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

      async to() {
        const { code,send } = this;
        const { phone } = this.userInfo;

        if (!send){
          return SMG('请先获取验证码');
        }
        if (!code) {
          return SMG('验证码验证错误');
        }

        let res = await reqCheckVerify({
          phone,
          verify: code
        });

        if (res.code === 200 && res.data === true) {
          uni.redirectTo({
            url: '/pages/personal-information/change-phone2'
          })
        } else {
          SMG('验证码验证错误');
        }
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
      justify-content: center;
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

  }
</style>
