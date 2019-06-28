<template>
    <view class="apply-ticket">
        <view class="title">申请开票</view>
      <view class="goods">
        <view class="good" v-for="(good, i) in goods" :key="i">
          <!-- 展开 -->
          <image class="shop-img" :src="good.image" mode=""></image>

          <view class="detail">
            <view class="detail-header">
              <view class="shop-name">{{ good.productNo }}</view>
            </view>
            <view class="detail-footer">
              <view :class="['options']">
                <view class="option" v-if="good.sampleType!=='无小样'">
                  <view class="label">标样：￥0</view>
                  <view class="value">*1</view>
                </view>
                <view class="option">
                  <view class="label">商品：￥{{ good.unitAmount }}/米</view>
                  <view class="value">*{{ good.count }}</view>
                </view>
              </view>

              <!--<view class="button" v-if="good.allowAfterSale" @tap="toSaleAfter({orderId:orderDetail.orderId,itemId:good.itemId})">售后</view>-->
            </view>
          </view>
        </view>
      </view>

        <view class="list">
            <view class="item">
                <text class="label">开票金额</text>
              <text class="price">￥{{ orderDetail.amount }}</text>
<!--                <text class="bedge">(不含运费)</text>-->
            </view>

          <view class="item flex" @tap="toTicket">
            <text class="label">开票信息</text>
            <view class="flex">
              <text class="label">{{ invoiceApplyRequest.name || '请选择开票信息' }}</text>
              <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>
          </view>

          <view class="item flex" @tap="toAddress">
            <text class="label">收票地址</text>
            <view class="flex">
              <text class="label">{{ invoiceApplyRequest.address || '请选择地址'}}</text>
              <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>
            </view>
        </view>

      <view class="button" @tap="applyInvoice(orderDetail.orderId)">提交申请</view>


    </view>
</template>

<script>
  import uniNumberBox from '../../components/uni-number-box/uni-number-box.vue';
  import { uniDrawer, uniNavBar, uniTag, uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';
  import { mapActions, mapState } from "vuex";

  export default {
    components: {
      uniNumberBox,
      uniTag
    },

    computed: {
      ...mapState('Order', {
        goods: state => state.orderDetail.product,
        orderDetail: state => state.orderDetail
      }),
      ...mapState('Invoice', ['invoiceApplyRequest'])
    },
    methods: {
      ...mapActions('Order', ['getOrderDetail']),
      ...mapActions('Invoice', ['applyInvoice']),

      sureSelect() {
        this.sortShow = false;
        this.selectSaleAfterShow = false;
      },
      bindChange(e) {
        console.log(e);
        const val = e.detail.value[0];
        this.currentPickerValue = val;
      },
      cancalOrder(e) {
        this.sortShow = true;
      },
      selectSaleAfter() {
        this.selectSaleAfterShow = true;
      },
      selectChange(e) {
        console.log(e);
        const val = e.detail.value[0];
        this.currentPickerValue = val;
      },
      numChange(val) {
        console.log(val);
      },

      moveHandle() {

      },

      toTicket() {
        uni.navigateTo({
          url: '/pages/ticket/ticket?from=applyTicket'
        })
      },
      toAddress() {
        uni.navigateTo({
          url: '/pages/address-book/address-book?from=applyTicket'
        })
      }
    },
    onLoad(e) {
      const { orderId } = e;
      this.getOrderDetail(orderId);
    },

    onShow() {
    }
  };
</script>

<style lang="scss">
.apply-ticket {
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding: 12upx 0;
        text-align: center;
    }

    .goods {
        margin: 2upx $white-space;
        border-top: 2upx solid #eeeeee;
        .good {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $white-space 0;

            .shop-img {
                width: 120upx;
                height: 120upx;
                border-radius: 8upx;
            }
            .detail {
                display: flex;
                flex-wrap: wrap;
                width: 520upx;
                height: 120upx;
                margin-left: 25upx;
                .detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 40upx;
                    .shop-name {
                        color: #333;
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
                    align-self: flex-end;
                    width: 100%;
                    height: 66upx;
                    font-size: 20upx;
                    font-family: PingFang-SC-Regular;
                    color: #999;
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
                    }
                }
            }
        }

        .hr {
            height: 28upx;
        }
    }

    .list {
        .item {
            border-top: 2upx solid #eeeeee;
            padding: $white-space 0;
            margin: 0 $white-space;
            .label {
                font-size: 28upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            .price {
                font-size: 32upx;
                font-family: DINAlternate-Bold;
                font-weight: bold;
                color: rgba(197, 0, 0, 1);
                margin-left: 16upx;
            }

            .bedge {
                font-size: 20upx;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                margin-left: 20upx;
            }

            .arrow {
                width: 24upx;
                height: 28upx;
                transform: rotate(270deg);
            }

            .text-area {
                padding: 28upx;
                margin-top: 34upx;
                font-size: 12px;
            }

            .text-area-length {
                position: relative;
                top: 134upx;
                left: 600upx;
                font-size: 20upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(170, 170, 170, 1);
            }
        }

        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .button {
        position: fixed;
        bottom: 45px;
        width: 692upx;
        margin: $white-space;
        margin-top: 20upx;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #fff;
        background: $theme-color;
        text-align: center;
        border-radius: 8upx;
        height: 80upx;
        line-height: 80upx;
    }

    .custmer {
        position: fixed;
        bottom: 126px;
    }

    .pop-wrap {
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 200000upx;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .my-pop {
            position: fixed;
            bottom: 0upx;
            width: 670upx;
            height: 500upx;
            background: #fff;
            padding: 20upx 40upx;
            .pop-top {
                display: flex;
                justify-content: space-between;
                padding: 0 0 20upx 0;
                background: #fff;

                text {
                    font-size: 28upx;
                    font-weight: 300;
                    &.sure {
                        color: $theme-color;
                    }
                }
            }
        }

        .pick {
            height: 380upx;
            width: 100%;
            .selecter {
                text-align: center;
                font-size: 32upx;
                font-weight: 300;
            }
        }

        .line {
            position: absolute;
            top: 0;
            bottom: 30upx;
            margin: auto;
            width: 150upx;
            height: 1upx;
            background: #999;

            &.left {
                left: 30upx;
            }
            &.right {
                right: 30upx;
            }
        }
    }

    .pop-wrap {
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .my-pop {
            position: fixed;
            bottom: 0upx;
            height: 460upx;
            background: #fff;
            border-radius: 8upx;
        }

        .pop-header {
            display: flex;
            justify-content: flex-start;
        }

        .select-much {
            display: flex;
            align-items: center;
            margin-top: 114upx;

            .nums {
                display: flex;
                align-items: center;
                width: 340upx;
            }

            .unit {
                margin-left: 10upx;
            }
        }

        .select-small {
            margin-top: 64upx;
            display: flex;
            align-items: center;
        }

        .title {
            width: 150upx;
            font-size: 28upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            text-align: left;
        }
        .rest {
            font-size: 20upx;
            font-family: PingFang-SC-Regular;
            color: #999;
            width: 130upx;
            text-align: right;
        }
    }

    .tags {
        position: relative;
        width: 340upx;
        height: 64upx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-left: 30upx;
        transition: max-height 0.3s ease-in-out;

        .tag {
            margin: 0 0 30upx;
            width: 340upx;
            padding: 0;
            text-align: center;
            font-size: 24upx;
        }
    }
}
</style>
