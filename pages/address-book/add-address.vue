<template>
  <view class="add-address">
    <view :class="['address', { active: addressList.length === 0 }]">
      <view class="label">
        收货地址
        <text>（{{ addressList.length }}/10）</text>
      </view>
    </view>

    <view class="form">
      <view class="item">
        <view class="label">
          收件人姓名
          <text>*</text>
        </view>
        <view class="value">
          <input
            maxlength="20"
            placeholder="请输入收件人姓名(必填)"
            placeholder-style="font-size:10px;color:#aaaaaa;"
            type="text"
            v-model="addressee"/></view>
      </view>

      <view class="item">
        <view class="label">
          手机号
          <text>*</text>
        </view>
        <view class="value">
          <input
            maxlength="11"
            placeholder="请输入正确的手机号码(必填)"
            placeholder-style="font-size:10px;color:#aaaaaa;"
            type="number"
            v-model="phone"
          /></view>
      </view>

      <view class="uni-title uni-common-pl">地区选择器</view>


      <view class="item">
        <view class="label">
          地址
          <text>*</text>
        </view>

        <picker
          @cancel=""
          @change="bindPickerChange"
          mode="region"
        >
          <view class="address-picker">
            <view>
              <text>{{ addressDataList[0] || '省'}}</text>
              <image mode="" src="../../static/icon/arrow-bottom.svg"></image>
            </view>
            <view>
              <text>{{ addressDataList[1]|| '市' }}</text>
              <image mode="" src="../../static/icon/arrow-bottom.svg"></image>
            </view>
            <view>
              <text>{{ addressDataList[2] || '区'}}</text>
              <image mode="" src="../../static/icon/arrow-bottom.svg"></image>
            </view>
          </view>
        </picker>

        <view class="value">
          <input
            maxlength="120"
            placeholder="请输入详细地址，并精确到街道、单元、门牌等(必填)"
            placeholder-style="font-size:10px;color:#aaaaaa;"
            type="text"
            v-model="other"
          />
        </view>
      </view>
    </view>

    <view @tap="defaultAddress = !defaultAddress" class="set-default">
      <view :class="['select', { active: defaultAddress }]">
        <view class="selected"></view>
      </view>
      <text>设为默认地址</text>
    </view>

    <view class="buttons">
      <view @tap="back" class="cancel">取消</view>

      <view @tap="doChange" class="save">保存
      </view>
    </view>
  </view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { SHOW_MODAL } from "../../utils";

  export default {
    data() {
      return {
        addressee: '',
        phone: '',
        other: '',
        // 查看更多地址状态
        addressDataList: '',
        defaultAddress: false,

        olderData: {}
      };
    },
    computed: mapGetters('Address', ['addressList']),
    onLoad(query) {
      console.log(query);
      let { id } = query;
      this.id = id;
      if (id !== 'null') {
        let { addressee, phone, other, city, county, isMain, province } = this.addressList.filter(item => item.id === Number(id))[0];
        this.addressee = addressee;
        this.phone = phone;
        this.other = other;
        this.defaultAddress = isMain;
        this.addressDataList = [province, city, county];

        this.olderData = { addressee, phone, city, county, province, isMain, other }
      }
    },
    methods: {
      ...mapActions('Address', ['addAddress', 'changeAddress']),
      collectData() {
        let { addressee, phone, other, defaultAddress, addressDataList } = this;
        return {
          addressee,
          phone,
          city: addressDataList[1],
          county: addressDataList[2],
          province: addressDataList[0],
          isMain: defaultAddress,
          other
        };
      },

      compareData() {
        return JSON.stringify(this.olderData) === JSON.stringify(this.collectData())
      },

      back() {
        const { id, compareData, doChange } = this;
        if (id !== 'null' && !compareData()) {
          return SHOW_MODAL({
            title: '编辑地址',
            content: '是否保存本次编辑结果？',
            confirm() {
              doChange()
            },
            cancel() {
              uni.navigateBack({ delta: 1 })
            }
          })
        }
        uni.navigateBack({ delta: 1 })
      },

      doChange() {
        const { id, addAddress, changeAddress, collectData } = this;
        id === 'null' ? addAddress(data) : changeAddress({ ...collectData(), id })
      },

      bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value);
        this.addressDataList = e.target.value
      },
    }
  };
</script>

<style lang="scss">
  @import "../../uni";

  .add-address {
    padding: $white-space;

    .address {
      display: flex;
      justify-content: space-between;
      padding: $white-space 0 upx(58);

      /*&.active {*/
      /*    border-bottom: 2upx solid #eeeeee;*/
      /*}*/
      .label {
        font-size: upx(28);

        text {
          font-size: upx(20);
          color: #999;
        }
      }
    }

    .form {
      .label {
        font-size: upx(24);
        font-family: PingFang-SC-Regular, serif;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: upx(24);

        text {
          color: #c50000;
        }
      }

      .value {
        padding: upx(26) upx(20);
        border: upx(2) solid rgba(238, 238, 238, 1);
        border-radius: upx(8);
        margin-bottom: upx(54);
      }
    }

    .set-default {
      display: flex;
      align-items: center;

      text {
        font-size: upx(30);
        margin-left: upx(20);
        color: #333333;
      }
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

    .address-picker {
      display: flex;
      justify-content: space-between;
      margin-bottom: upx(10);

      view {
        width: upx(180);
        height: upx(80);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: upx(2) solid #eeeeee;
        border-radius: upx(8);
        padding: 0 upx(20);
      }

      text {
        font-size: upx(20);
        color: #333333;
      }

      image {
        width: upx(18);
        height: upx(20);
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 122px;

      > view {
        width: upx(326);
        height: upx(80);
        line-height: upx(80);
        text-align: center;
        font-size: upx(28);
        font-family: PingFang-SC-Medium, serif;
        font-weight: 500;
        border-radius: upx(8);
      }

      .cancel {
        border: upx(2) solid $theme-color;
        color: $theme-color;
      }

      .save {
        border: upx(2) solid transparent;
        color: #fff;
        background: $theme-color;
      }
    }
  }
</style>
