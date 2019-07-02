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
                  type="text"
                  maxlength="20"
                  placeholder="请输入收件人姓名(必填)"
                  placeholder-style="font-size:10px;color:#aaaaaa;"
                  v-model="addressee"/></view>
            </view>

            <view class="item">
                <view class="label">
                    手机号
                    <text>*</text>
                </view>
              <view class="value">
                <input
                  type="text"
                  placeholder="请输入正确的手机号码(必填)"
                  placeholder-style="font-size:10px;color:#aaaaaa;"
                  v-model="phone"
                  maxlength="11"
                /></view>
            </view>

          <view class="uni-title uni-common-pl">地区选择器</view>


          <view class="item">
            <view class="label">
              地址
              <text>*</text>
            </view>

            <picker
              @change="bindPickerChange"
              mode="region"
              @cancel=""
            >
              <view class="address-picker">
                <view>
                  <text>{{ addressDataList[0] || '省'}}</text>
                  <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
                <view>
                  <text>{{ addressDataList[1]|| '市' }}</text>
                  <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
                <view>
                  <text>{{ addressDataList[2] || '区'}}</text>
                  <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
              </view>
            </picker>

            <view class="value">
              <input
                type="text"
                maxlength="120"
                placeholder="请输入详细地址，并精确到街道、单元、门牌等(必填)"
                placeholder-style="font-size:10px;color:#aaaaaa;"
                v-model="other"
              />
            </view>
          </view>
        </view>

        <view class="set-default" @tap="defaultAddress = !defaultAddress">
            <view :class="['select', { active: defaultAddress }]" ><view class="selected"></view></view>
            <text>设为默认地址</text>
        </view>

        <view class="buttons">
          <view class="cancel" @tap="back">取消</view>

          <view class="save" @tap="doChange">保存
          </view>
          </view>
        </view>
    </view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        addressee: '',
        phone: '',
        other: '',
        // 查看更多地址状态
        addressDataList: '',
        defaultAddress: false,

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
      }
    },
    methods: {
      ...mapActions('Address', ['addAddress', 'changeAddress']),
      back() {
        uni.navigateBack({ delta: 1 })
      },
      doChange() {
        let { addressee, phone, other, defaultAddress, id, addressDataList } = this;
        let data = {
          addressee,
          city: addressDataList[1],
          county: addressDataList[2],
          province: addressDataList[0],
          phone,
          isMain: defaultAddress,
          other,
        };
        if (id === 'null') {
          // 新增 地址
          this.addAddress(data)
        } else {
          // 修改地址
          this.changeAddress({ ...data, id })
        }
      },
      bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.target.value);
        this.addressDataList = e.target.value
      },
    }
};
</script>

<style lang="scss">
.add-address {
    padding: $white-space;
    .address {
        display: flex;
        justify-content: space-between;
        padding: $white-space 0 58upx;

        /*&.active {*/
        /*    border-bottom: 2upx solid #eeeeee;*/
        /*}*/
        .label {
            font-size: 28upx;
            text {
                font-size: 20upx;
                color: #999;
            }
        }
    }

    .form {
        .label {
            font-size: 24upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 24upx;
            text {
                color: #c50000;
            }
        }

        .value {
            padding: 26upx 20upx;
            border: 2upx solid rgba(238, 238, 238, 1);
            border-radius: 8upx;
            margin-bottom: 54upx;
        }
    }

    .set-default {
        display: flex;
        align-items: center;
        text {
            font-size: 30upx;
            margin-left: 20upx;
            color: #333333;
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

    .address-picker {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10upx;
        view {
            width: 180upx;
            height: 80upx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 2upx solid #eeeeee;
            border-radius: 8upx;
            padding: 0 20upx;
        }
        text {
            font-size: 20upx;
            color: #333333;
        }
        image {
            width: 18upx;
            height: 20upx;
        }
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 122px;

        > view {
            width: 326upx;
            height: 80upx;
            line-height: 80upx;
            text-align: center;
            font-size: 28upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            border-radius: 8upx;
        }

        .cancel {
            border:2upx solid $theme-color;
            color: $theme-color;
        }

        .save {
            border: 2upx solid transparent;
            color: #fff;
            background: $theme-color;
        }
    }
}
</style>
