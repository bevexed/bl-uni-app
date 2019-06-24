<template>
    <view class="add-ticket">
        <view class="title">开票状态</view>
        <view class="wrap">
            <view class="state" v-for="(state, i) in stateList" @tap="changeState(i)" :key="i">
                <view :class="['select', { active: currentState === i }]"><view class="selected"></view></view>
                <text :class="[{ active: currentState === i }]">{{ state.label }}</text>
            </view>
        </view>

        <view class="title">企业名称</view>
      <input type="text" v-model="companyName" placeholder="请输入企业名称" placeholder-style="font-size:12px;color:#999"/>

        <view class="title">企业税号</view>
      <input type="text" v-model="companyTax" placeholder="请输入企业税号" placeholder-style="font-size:12px;color:#999"/>

        <!-- 专票 -->
        <view class="special" v-if="currentState === 0">
            <view class="title">注册电话</view>
          <input type="number" v-model="phone" maxlength="11" placeholder="请输入注册电话"
                 placeholder-style="font-size:12px;color:#999"/>

            <view class="title">注册地址</view>
          <picker
            @change="bindPickerChange"
            mode="region"
            @cancel=""
          >
            <view class="address">
              <view>
                <view>{{ addressDataList[0] || '请选择' }}</view>
                <text>省，</text>
              </view>
              <view>
                <view>{{ addressDataList[1] || '请选择' }}</view>
                <text>市，</text>
              </view>
              <view>
                <view>{{ addressDataList[2] || '请选择' }}</view>
                <text>区，</text>
              </view>
              <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>
          </picker>
          <input type="text" v-model="address" placeholder="请输入详细地址" placeholder-style="font-size:12px;color:#999"/>

            <view class="title">开户银行</view>
            <view class="bank">
              <input type="text" v-model="bank" placeholder="请填写开户银行"
                     placeholder-style="font-size:12px;color:#999"/>
<!--              <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>-->
            </view>

            <view class="title">开户账号</view>
          <input type="text" v-model="account" placeholder="请输入开户账号" placeholder-style="font-size:12px;color:#999"/>
        </view>

        <view class="wrap">
            <view class="state" @tap="setDefault = !setDefault">
                <view :class="['select', { active: setDefault }]"><view class="selected"></view></view>
                <text>设置为默认信息</text>
            </view>
        </view>

      <view
        class="save"
        @tap="addInvoice({
          account,
          address,
          bank,
          city: addressDataList[1],
          companyName,
          companyTax,
          county:addressDataList[2],
          isDefault:setDefault,
          phone,
          province: addressDataList[0],
          type:stateList[currentState].label,
          userId
        })">保存
      </view>

        <view class="white-space"></view>
    </view>
</template>

<script>
  import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      account: '',
      address: '',
      bank: '',
      city: '',
      companyName: '',
      companyTax: '',
      county: '',
      phone: '',
      province: '',
      addressDataList: '',
      //开票状态
      stateList: [
        {
          label: '专票'
        },
        {
          label: '普票'
        }
      ],
      // 当前开票状态
      currentState: 0,

      // 是否默认
      setDefault: false
    };
  },
  computed: {
    ...mapState('User', {
      userId: state => state.userInfo.id
    })
  },
  methods: {
    ...mapActions('Invoice', ['addInvoice']),
    changeState(i) {
      this.currentState = i;
    },
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.target.value);
      this.addressDataList = e.target.value
    },
  }
};
</script>

<style lang="scss">
.add-ticket {
    padding: $white-space;
    .title {
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
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
    .wrap {
        display: flex;
        margin-top: 30upx;
        margin-bottom: 34upx;
    }

    .state {
        width: 40%;
        display: flex;
        align-items: center;
        font-size: 28upx;
        text {
            margin-left: 20upx;
            color: #999;
            &.active {
                color: #333;
            }
        }
    }

    input {
        margin-top: 16upx;
        margin-bottom: 38upx;
        border-bottom: 2upx solid #eeeeee;
        font-size: 24upx;
    }

    .address {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 22upx 0 42upx;
        > view {
            display: flex;
            width: 30%;
            font-size: 24upx;

            > view {
                width: 178upx;
                border-bottom: 2upx solid #eeeeee;
                color: #333;
            }
            text {
                color: #999;
            }
        }
    }

    .bank {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40upx;

        border-bottom: 2upx solid #eee;
        margin: 20upx 0;
        input {
            margin-top: 15px;
            border: none;
        }
    }

    .save {
        position: fixed;
        bottom: 22px;
        width: 692upx;
        height: 80upx;
        line-height: 80upx;
        background: $theme-color;
        text-align: center;
        border-radius: 8upx;
        color: #fff;
        font-size: 28upx;
    }

    .white-space {
        height: 140upx;
    }

    .arrow {
        width: 24upx;
        height: 20upx;
        transform: rotate(270deg);
    }
}
</style>
