<template>
    <view class="information">
        <view class="list">
            <view class="item">
                <view class="label">我的头像</view>
              <view class="value">
                <image class="avatar" :src="userInfo.avatar" mode=""></image>
              </view>
            </view>

            <view class="item">
                <view class="label">我的会员</view>
              <view class="value">
                <text class="vip-num">{{ userInfo.memberId }}</text>
              </view>
            </view>

            <view class="item">
                <view class="label">绑定手机号</view>
                <view class="value">
                  <text class="phone" v-if="userInfo && userInfo.phone">
                    {{ userInfo.phone && userInfo.phone.slice(0,3) }} **** {{ userInfo.phone && userInfo.phone.slice(7) }}
                  </text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">我的昵称</view>
                <view class="value">
                  <text class="name">{{ userInfo.username }}</text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">性别</view>
              <picker
                @change="changeSex"
                mode='selector'
                :value="sex"
                :range="sexList"
              >
                <view class="value">
                  <text class="pick-male">{{ sexList[userInfo.sex] || sexList[sex] || '请选择性别' }}</text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
              </picker>

            </view>

            <view class="item">
              <view class="label">生日</view>
              <picker
                @change="changeBirth"
                mode="date"
                @cancel=""
              >
                <view class="value">
                  <text class="pick-birth">{{ userInfo.birthday || birthday }}</text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
              </picker>
            </view>

            <view class="item">
                <view class="label">企业名称</view>
                <view class="value">
                  <text class="name">{{ userInfo.custName }}</text>
                    <view class="bedge">已授权</view>
                </view>
            </view>

            <view class="item">
                <view class="label">我的职位</view>
                <view class="value">
                  <text class="name">{{ userInfo.job }}</text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">我的邮箱</view>
                <view class="value">
                    <text class="name">491291234@qq.com</text>
                  <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { mapActions, mapState } from "vuex";

// todo:修改手机号，昵称，职位，邮箱

export default {
  data() {
    return {
      birthday: '1990-01-01',
      sexList: ['女', '男'],
      sex: 0
    }
  },
  computed: mapState('User', ['userInfo']),
  methods: {
    ...mapActions('User', ['changeUser']),
    changeBirth(e) {
      console.log('picker发送选择改变，携带值为', e.target.value);
      this.birthday = e.target.value;
      this.changeUser({ birthday: this.birthday })
    },
    changeSex(e) {
      console.log('picker发送选择改变，携带值为', e.target.value);
      this.sex = e.target.value;
      this.changeUser({ sex: Number(this.sex) })
    },
  }
};
</script>

<style lang="scss">
.information {
    padding: 20upx 0;
    .list {
        .item {
            padding: 42upx $white-space;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2upx solid #eee;
            .label {
                height: 38upx;
                font-size: 32upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .value {
                display: flex;
                align-items: center;
                height: 38upx;

                .avatar {
                    width: 100upx;
                    height: 100upx;
                    border-radius: 100upx;
                }

                .vip-num {
                    font-size: 28upx;
                    color: #888888;
                }

                .name,
                .phone {
                    font-size: 28upx;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }

                .bedge {
                    width: 98upx;
                    height: 38upx;
                    border: 2upx solid $theme-color;
                    border-radius: 8upx;
                    font-size: 20upx;
                    color: $theme-color;
                    text-align: center;
                    line-height: 38upx;
                    margin-left: 6upx;
                }

                .pick-birth,
                .pick-male {
                    font-size: 28upx;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(170, 170, 170, 1);
                }

                .arrow {
                    margin-left: 10upx;
                    width: 20upx;
                    height: 20upx;
                    transform: rotate(270deg);
                }
            }
        }
    }
}
</style>
