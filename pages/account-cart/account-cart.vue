<template>
    <view class="account-cart">
        <view class="title">结算付款</view>

        <!-- 地址 -->
        <view :class="['address', { active: addressList.length === 0 }]">
            <view class="label">
                收货地址
                <text>（{{ addressList.length }}/10）</text>
            </view>
          <view
            @tap="TO('/pages/address-book/add-address?id=null')"
            class="add-new-address"
            v-if="addressList.length<10">
                <image src="../../static/icon/add.png" mode=""></image>
                <text>添加新地址</text>
            </view>
        </view>

        <!--已存在的收货地址-->
        <view :class="['select-address', { active: showMoreAddress }]">
          <view
            :class="['address-detail', { active: address.id === curAddress }]"
            :key="i"
            v-for="(address, i) in curAddressList"
          >
            <image @tap="selectAddress(address.id)"
                   class="gou"
                   mode=""
                   src="../../static/icon/gou.svg"></image>
            <view @tap="selectAddress(address.id)" class="header">
                    <view class="label">收件人：</view>
                    <view class="value">
                      {{ address.addressee }}
                      <text class="phone">{{ address.phone.slice(0,3) }} **** {{ address.phone.slice(7) }}</text>
                    </view>
                </view>

            <view @tap="selectAddress(address.id)" class="content">
                    <view class="label">地址：</view>
                    <view class="value">
                      {{ address.province }} {{ address.city }} {{ address.county }}

                      <view>{{ address.other }}</view>
                    </view>
                </view>

                <view class="footer">
                    <view class="default" v-if="address.default">默认地址</view>
                    <view class="empty" v-else></view>
                    <view class="icon">
                      <image
                        @tap="TO( '/pages/address-book/add-address?id=' + address.id)"
                        mode=""
                        src="../../static/icon/edit.svg"></image>
                        <image src="../../static/icon/del2.svg" mode=""  @tap="deleteAddress(address.id)"></image>
                    </view>
                </view>
            </view>
        </view>

        <!-- 收起更多地址 -->
        <view class="show-more-address" v-if="addressList.length > 1" @tap="showMoreAddress = !showMoreAddress">
            <image :class="{ active: showMoreAddress }" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            <text v-if="showMoreAddress">收起更多地址</text>
            <text v-else>展开更多地址</text>
        </view>

        <image v-if="addressList.length > 1" class="split" src="../../static/icon/1557025928925.jpg" mode=""></image>

        <!-- 商品信息 -->
        <view class="goods-title title">商品信息</view>
        <!-- 收起 -->
        <view class="preview" v-if="preview">
            <image v-for="(good, i) in goods" :key="i" v-show="i < 4" :src="good.imageShow" mode=""></image>
            <image class="more" @tap="preview = false" src="../../static/icon/more.svg" mode=""></image>
        </view>

      <!--fixMe：总价-->
        <view class="goods" v-else>
            <view class="good" v-for="(good, i) in goods" :key="i">
                <!-- 展开 -->
              <image
                :src="good.imageShow"
                @tap="TO('/pages/shop-detail/shop-detail?id=' + good.productId)"
                class="shop-img"
                mode=""></image>

                <view class="detail">
                    <view class="detail-header"><view class="shop-name">{{ good.pno }}</view></view>
                    <view class="detail-footer">
                        <view :class="['options']">
                            <view class="option"  v-if="good.sampleType">
                                <view class="label">标样：￥0</view>
                                <view class="value">*{{ good.sampleType }}</view>
                            </view>
                            <view class="option">
                                <view class="label">商品：￥{{ good.price }}/米</view>
                                <view class="value">*{{ good.shoppingNum }}</view>
                            </view>
                        </view>

                        <view class="price">￥{{ good.totalAmount }}</view>
                    </view>
                </view>
            </view>

            <image @tap="preview = true" class="hr" src="../../static/icon/all.svg" mode=""></image>
        </view>

        <view class="pay-detail">
            <view class="pay-total">
                <view class="label">商品总金额</view>
                <view class="value">￥{{ total }}</view>
            </view>

            <view class="express">
                <view class="label">运费</view>
              <view class="value">￥{{ shipCost }}</view>
            </view>

            <view class="real-pay">
                <view class="label">实付款</view>
              <view class="value">￥{{ (Number(total) + Number(shipCost)).toFixed(2) }}</view>
            </view>
        </view>

        <view class="agreement">
            <view :class="['select', { active: agreement }]" @tap="agreement = !agreement"><view class="selected"></view></view>
            <view>
                <text class="star">*</text>
                我已经阅读并同意接受相关的
                <text class="href">销售条款</text>
            </view>
        </view>

      <view :class="['pay-button', { active: agreement }]" @click="toPay(total)">立即支付</view>
    </view>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import { SMG, TO } from "../../utils";

  export default {
    data() {
      return {
        // 查看更多地址状态
        showMoreAddress: false,
        // 是否 预览
        preview: false,
        // 是否同意
        agreement: false,


        curAddress: '',

        curAddressList: []
      };
    },

    computed: {
      ...mapState('Cart', {
        goods: state => state.item
      }),
      ...mapGetters('Cart', ['total']),
      ...mapGetters('Address', ['addressList']),
      ...mapState('Order', ['shipCost'])
    },
    async onShow() {
      await this.getAllAddress();
      await this.doShipCost();
      this.preview = this.goods.length >= 4;
      this.curAddress = this.addressList.filter(item => item.isMain).length === 0 ? '' : this.addressList.filter(item => item.isMain)[0].id;
      this.curAddressList = this.addressList
    },
    methods: {
      ...mapActions('Address', ['getAllAddress', 'deleteAddress', 'defaultAddress']),
      ...mapActions('Order', ['createOrder', 'getShipCost']),
      TO,

      collectData() {
        let { goods, addressList, curAddress, agreement } = this;
        let item = goods.map(item => ({
          count: item.shoppingNum,
          productId: item.productId,
          sampleType: item.sampleType === 0 ? 0 : 10
        }));
        let addressId = curAddress ? curAddress : addressList.filter(item => item.isMain).length === 0 ? '' : addressList.filter(item => item.isMain)[0].id;
        return { addressId, item, agreement }
      },

      async doShipCost() {
        let { addressId, item } = this.collectData();

        if (!addressId) {
          return SMG('请选择收货地址');
        }

        await this.getShipCost({ addressId, item: JSON.stringify(item) });
      },

      selectAddress(data) {
        this.curAddress = data;
        this.curAddressList = [...this.addressList.filter(item => item.id === data), ...this.addressList.filter(item => item.id !== data)];
        this.doShipCost();
      },

      async toPay(amount) {
        const { addressId, item, agreement } = this.collectData();
        if (!addressId) {
          return SMG('请选择收货地址');
        }
        if (agreement) {
          await this.createOrder({ addressId, item: JSON.stringify(item), amount });
        }
      },
    }
  }
  ;
</script>

<style lang="scss" scoped>
  @import "../../uni";
.account-cart {
    padding: 0 $white-space 64upx;
    .title {
        color: #333;
      font-size: upx(32);
        font-weight: 500;
        text-align: center;
      border-bottom: upx(2) solid #eeeeee;
        padding: 12upx $white-space 24upx;
    }

    .address {
        display: flex;
        justify-content: space-between;
        padding: $white-space 0;

        &.active {
          border-bottom: upx(2) solid #eeeeee;
        }
        .label {
            font-size: 28upx;
            text {
                font-size: 20upx;
                color: #999;
            }
        }

        .add-new-address {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28upx;
          font-family: PingFang-SC-Regular, serif;
            font-weight: 400;
            color: #333;
        }

        image {
            width: 34upx;
            height: 34upx;
            margin-right: 10upx;
        }
    }

    .select-address {
        margin: 17upx 0;
        max-height: 290upx;
        overflow: hidden;
        // transition: all 0.3s ease-in-out;
        &.active {
            max-height: 5400upx;
        }

        .address-detail {
            box-sizing: border-box;
            position: relative;
            padding: 32upx 0 0 0;
            margin-bottom: 24upx;
            border: 2upx solid #cccccc;
            border-radius: 8upx;
            font-size: 24upx;
            color: #333;
            overflow: hidden;

            &:before {
                position: absolute;
                width: 164upx;
                height: 164upx;
                right: -100upx;
                top: -100upx;
                content: '';
                transform: rotate(45deg);
                background: #cccccc;
            }

            &.active {
                &:before {
                    background: $theme-color;
                }
            }

            .gou {
                z-index: 999;
                position: absolute;
                padding: 20upx;
                width: 32upx;
                height: 32upx;
                right: -10upx;
                top: -10upx;
                content: '';
            }
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 34upx;
            padding-left: 32upx;
        }

        .content {
            display: flex;
            padding-bottom: 34upx;
            padding-left: 32upx;
            border-bottom: 2upx solid #eee;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18upx 0 18upx 32upx;
        }

        .label {
            width: 18%;
        }

        .value {
            width: 60%;
        }

        .phone {
            margin-left: 30%;
        }

        .value {
            font-weight: bold;
        }

        .icon {
            margin-right: 32upx;
            image {
                width: 32upx;
                height: 32upx;
                margin-left: 32upx;
            }
        }

        .default {
            color: $theme-color;
        }
    }

    .show-more-address {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4upx 0;

        image {
            width: 16upx;
            height: 16upx;
            margin-right: 16upx;
            transition: all 0.3s ease;
        }

        .active {
            transform: rotate(180deg);
        }

        text {
            font-size: 20upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: #333;
        }
    }

    .split {
        width: 100%;
        height: 8upx;
    }

    .goods-title {
        text-align: left;
        border: none;
        padding: 30upx 0 0 0;
    }

    .goods {
        .good {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $white-space 0;

            .shop-img {
                width: 128upx;
                height: 160upx;
                border-radius: 8upx;
            }
            .detail {
                display: flex;
                flex-wrap: wrap;
                width: 520upx;
                height: 160upx;
                margin-left: 25upx;
                .detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 40upx;
                    .shop-name {
                        font-size: 28upx;
                    }
                    image {
                        width: 24upx;
                        height: 26upx;
                    }
                }

                .detail-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    align-self: flex-end;
                    width: 100%;
                    height: 66upx;
                    font-size: 20upx;
                    font-family: PingFang-SC-Regular;
                    color: rgba(102, 102, 102, 1);
                    .options {
                        position: relative;
                        width: 290upx;

                        .option {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10upx;
                            .label {
                                width: 70%;
                            }
                        }

                        image {
                            position: absolute;
                            width: 26upx;
                            height: 26upx;
                            top: 0;
                            bottom: 0;
                            right: 16upx;
                            margin: auto;
                        }
                    }
                    .price {
                        font-size: 36upx;
                        font-family: DINAlternate-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
        }

        .hr {
            height: 28upx;
        }
    }

    .preview {
        display: flex;
        align-items: center;
        padding: 40upx 0;
        image {
          margin-right: upx(30);

          width: upx(172);
            height: 162upx;
        }
        .more {
            width: 32upx;
            height: 32upx;
        }
    }

    .pay-detail {
        padding: 0 0 32upx 0;
        border-bottom: 2upx solid #eeeeee;
        > view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9upx 0;
        }
        .label {
            font-size: 24upx;
            color: #333;
        }
        .value {
            font-size: 30upx;
            color: #333;
            font-weight: 500;
        }

        .real-pay {
            .label {
                font-size: 28upx;
                font-weight: 500;
            }
            .value {
                font-size: 40upx;
                color: #c50000;
            }
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

    .agreement {
        display: flex;
        align-items: center;
        font-size: 20upx;
        color: #666;
        margin-top: 22upx;
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

    .pay-button {
        $height: 80upx;
        height: $height;
        line-height: $height;
        width: 692upx;
        margin: 226upx auto 0;
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
