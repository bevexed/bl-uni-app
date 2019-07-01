<script>
  import { mapActions } from 'vuex'
export default {
    onLaunch: function() {
      const that = this;
      // 检验token
      // token 存在说明以前登录过
      uni.getStorage({
        key:'token',
        success(res) {
          that.getCurrentUserInfo();
          setTimeout(()=>{
            that.getRefreshToken();
          })
        },
        fail(res) {
        }
      });
    },
  onShow: function () {
  },
  onHide: function () {
  },
  methods: {
    ...mapActions('User', ['getCurrentUserInfo', 'getRefreshToken'])
  }
};
</script>

<style>
/*每个页面公共css */
view,
text {
    font-family: Helvetica,serif;
}

image {
    width: 100%;
    border-radius: 8upx;
}

.placeholder {
    font-family: 苹方 常规;
    font-weight: 400;
    font-size: 24upx;
    color: #aaa;
}

/* 强行 修改 抽屉长 */
.uni-drawer__content {
    width: 80% !important;
}

.drawer-2 .uni-drawer__content {
  width: 380upx !important;
}

/* 修改 tag*/
.uni-tag {
    width: 100%;
    padding: 0 !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
