<template>
  <view class="login">
    <view class="title">手机验证登录</view>

    <view class="form">
      <view class="phone">
        <image src="../../static/icon/phone.svg" mode=""></image>
        <input type="number" v-model="phone" maxlength="11" placeholder="请输入11位电话号码" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
      </view>
      <view class="code">
        <image src="../../static/icon/AK.svg" mode=""></image>
        <input type="number" v-model="verify" placeholder="请输入验证码"
               placeholder-style="color:#cccccc;font-weight:300;font-size:16px"/>
        <view :class="['button', { active: phone.length === 11 && !send }, { sended: send }]" @tap="sendMsg">{{ send ? '重新获取(' + time + 's)' : '获取验证码' }}</view>
      </view>

      <view class="phone" v-if="custNameR">
        <image src="../../static/icon/cim.svg" mode=""></image>
        <input type="text"  v-model="custName" placeholder="公司名称" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
      </view>

      <view class="phone" v-if="jobR">
         <image src="../../static/icon/job.svg" mode=""></image>
        <input type="text" v-model="job"  placeholder="您的职务" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
      </view>

    </view>

    <view class="agreement">
      <view :class="['select', { active: agreement }]" @tap="agreement = !agreement"><view class="selected"></view></view>
      <view>
        <text class="star"></text>
        已经阅读并同意
        <text class="href" @tap="toAgreement">隐私政策</text>
      </view>
    </view>

    <button
      :class="['pay-button', { active: agreement && phone.length === 11 && verify.length >= 4 && (jobR ? job : !jobR ) && (custNameR ? custName : !custNameR)}]"
      open-type="getUserInfo"
      @getuserinfo="login"
    >注册并登录
    </button>
  </view>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { reqConfigureCollection } from "../../api/user";

  export default {
    data() {
      return {
        phone: '',
        // 是否同意
        agreement: false,
        // 验证码
        verify: '',
        // 是否 已发送 短信
        job: '',
        jobR: false,

        custName: '',
        custNameR: false,

        send: false,
        // 倒计时
        time: 60,
        // 定时器，
        timer: null
      };
    },
    async onLoad(e) {
      const { phone } = e;

      await this.getConfig();

      this.phone = phone;

    },
    methods: {
      ...mapActions('User', ['getVerify', 'doLogin']),
      async toAgreement() {
        uni.navigateTo({
          url: '/pages/agreement/agreement'
        })
      },


      async getConfig() {
        let res = await reqConfigureCollection();
        if (res.code === 200) {
          this.jobR = res.data
            .filter(item => item.fieldName === 'job').length === 0 ? false
            : res.data.filter(item => item.fieldName === 'job')[0].required;
          this.custNameR = res.data
            .filter(item => item.fieldName === 'job').length === 0 ? false
            : res.data.filter(item => item.fieldName === 'company_name')[0].required;
        }
      },

      async sendMsg() {

        let { phone, send, time, timer } = this;
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
        this.getVerify(phone);

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
      login(e) {
        console.log(e);
        if (e.detail.errMsg.includes('fail')) {
          return;
        }
        const { nickName, avatarUrl } = e.detail.userInfo;
        let { phone, verify, agreement, job, custName, jobR, custNameR } = this;
        if (agreement && phone.length === 11 && verify.length >= 4 && (jobR ? job : !jobR) && (custNameR ? custName : !custNameR)) {
          this.doLogin({ verify, phone, job, custName, avatar: avatarUrl, nickname:nickName })
        }
      }
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
