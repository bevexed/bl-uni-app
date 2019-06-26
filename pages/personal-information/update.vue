<template>
  <div class="change-phone">

    <h1>
      修改{{ pl }}
    </h1>

    <footer class="header">
      <input type="text" :placeholder="'请输入新'+pl" v-model="value">
    </footer>

    <view class="button" @tap="change">完成</view>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { MSG_TO, SMG } from "../../static/unit";

  export default {
    data() {
      return {
        value: '',
        key: '',
        pl: ''
      }
    },
    onLoad(e) {
      const { value, pl, key } = e;
      this.value = value === 'undefined' ? '' : value;
      this.pl = pl;
      this.key = key;
    },
    computed: mapState('User', ['userInfo']),
    methods: {
      ...mapActions('User', ['changeUser']),
      async change() {

        if (!this.value) {
          SMG('输入值不能为空');
          return
        }

        let res = await this.changeUser({ [this.key]: this.value });

        if (res.code === 200) {
          uni.showToast({
            title: '修改成功',
            mask: true,
            success() {
              setTimeout(() => {
                uni.redirectTo({
                  url: 'personal-information'
                })
              }, 2000)
            }
          })
        }
      },
    }
  }
  ;
</script>


<style lang="scss">
  @function upx($size) {
    @return $size + upx
  }

  h1 {
    padding: 0 0 upx(60) 0;
  }

  .change-phone {
    text-align: center;
    padding: upx(40) 0;

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
      background: $theme-color;
      text-align: center;
      border-radius: upx(8);
      height: upx(80);
      line-height: upx(80);

      &.sended {
        color: #eee;
      }
    }

  }
</style>
