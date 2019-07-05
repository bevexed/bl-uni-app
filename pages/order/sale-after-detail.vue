<template>
    <view class="sale-after-detail">
      <view class="header">服务单号：{{ good.afterSaleId }}</view>

        <view class="goods">
          <view :class="['good']">
                <!-- 展开 -->
                <view class="good-header">
                  <image class="shop-img" :src="good.image" mode=""></image>

                    <view class="detail">
                        <view class="detail-header">
                          <view class="shop-name">{{ good.productNumber }}</view>

                          <view class="shop-after">{{ good.status }}</view>

                        </view>
                        <view class="detail-footer">
                            <view :class="['options']">

                                <view class="option">
                                  <view class="label">单价：￥{{ good.unitAmount }}/米</view>
                                  <view class="value" v-if=" good.afterSaleProductCount">*{{ good.afterSaleProductCount
                                    }}
                                  </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="good-footer">
                    <view class="item">
                        <view class="label">售后类型：</view>
                      <view class="value">{{ good.type }}</view>
                    </view>
                  <view class="item" v-if="good.reason">
                        <view class="label">审核原因：</view>
                    <view class="value">{{ good.reason }}</view>
                    </view>
                    <view class="item">
                        <view class="label">退款金额：</view>
                      <view class="value">￥{{ good.amount }}</view>
                    </view>
                    <view class="item">
                        <view class="label">申请时间：</view>
                      <view class="value">{{ good.createTime }}</view>
                    </view>
                </view>

            <view class="buttons">
                  <view class="button" v-if="good.status === '审核中'"  @tap="cancelAfterSale">
                    <image src="../../static/icon/calord.svg" mode=""></image>
                        <text>取消申请</text>
                    </view>

                  <view class="button" v-if="good.status === '待寄回' && good.statusCode === 20" @tap="toPostInformation">
                    <image src="../../static/icon/edit.svg" mode=""></image>
                    <text>填写快递信息</text>
                  </view>

                  <view class="button" v-if="good.status === '退款中' && good.statusCode === 40 && good.trackNum">
                    <text>已上传快递信息</text>
                  </view>
                </view>
            </view>
        </view>

        <view class="total">
            <view class="label">退款总金额</view>
          <view class="value">¥{{ good.amount }}</view>
        </view>

      <view
        @tap="TO('/pages/contact/contact')"
        class="contact"
      >
            <text>联系客服</text>
        </view>
        <view class="white-space"></view>
    </view>
</template>

<script>
  import { reqCancelAfterSale, reqAfterSaleDetail } from "../../api/sale";
  import { SHOW_MODAL } from "../../utils";
  import { TO } from "../../utils";

  export default {
    data() {
      return {
        // 商品 列表
        good: {},
        afterSaleId: ''

      }
    },

    computed: {},

   async onShow(){
      await this.getAfterSaleDetail(this.afterSaleId);
    },

    async onLoad(e) {
      const { orderId } = e;
      this.afterSaleId = orderId;
    },

    methods: {
      TO,
      async getAfterSaleDetail(afterSaleId) {
        let res = await reqAfterSaleDetail({ afterSaleId });
        if (res.code === 200) {
          this.good = res.data;
        }
      },

      async cancelAfterSale() {
        const _this = this;
        const { afterSaleId } = this;
        SHOW_MODAL({
          title: '取消售后',
          content: '确定取消申请?',
          async confirm() {
            let res = await reqCancelAfterSale({ afterSaleId });
            if (res.code === 200) {
              let result = await reqAfterSaleDetail({ afterSaleId });
              if (result.code === 200) {
                _this.good = result.data;
                uni.showToast({
                  title: '取消成功',
                  mask: true,
                })
              }
            }
          }
        });

      },

      toPostInformation() {
        uni.navigateTo({
          url: 'post-information?afterSaleId=' + this.good.afterSaleId
        })
      }
    }


  };
</script>

<style lang="scss">
.sale-after-detail {
    padding: $white-space;
    .header {
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        padding: 12upx;
        color: rgba(51, 51, 51, 1);
        border-bottom: 2upx solid #eeeeee;
        overflow: hidden;
    }

    .goods {
        padding: 4upx 0;
        margin-top: 10upx;
        .good {
            padding: $white-space 0 0 0;
            background: #f9f9f9;
            margin-bottom: 8upx;

            .good-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2upx dashed #eeeeee;
                padding: 0 18upx 18upx;
            }

            .shop-img {
                width: 120upx;
                height: 120upx;
                border-radius: 8upx;
                margin-right: 20upx;
            }
            .detail {
                display: flex;
                flex-wrap: wrap;
                width: 520upx;
                height: 120upx;

                .detail-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 40upx;
                    .shop-name {
                        font-size: 24upx;
                        color: #333333;
                    }

                    .shop-after {
                        font-size: 24upx;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(191, 160, 101, 1);
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
                    color: #999999;
                    .options {
                        position: relative;
                        width: 290upx;

                        .option {
                            display: flex;
                            align-items: center;
                            .label {
                                width: 70%;
                            }
                        }
                    }
                }
            }
        }
        .good-footer {
            font-size: 20upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            padding: 20upx 18upx;
            color: rgba(153, 153, 153, 1);
            .item {
                display: flex;
                padding: 16upx 0 0 0;
            }
        }

        .buttons {
            margin-top: 18upx;
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 686upx;

                text-align: center;
                font-size: 24upx;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                background: #f0f0f0;
                height: 82upx;
                line-height: 82upx;
                image {
                    width: 22upx;
                    height: 22upx;
                    margin-right: 8upx;
                }
            }
        }
    }

    .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8upx;
        padding: 18px 0 28upx;
        border-bottom: 2upx solid #eeeeee;
        border-top: 2upx solid #eeeeee;
        .label {
            font-size: 28upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }
        .value {
            font-size: 32upx;
            font-family: DINAlternate-Bold;
            font-weight: bold;
            color: rgba(197, 0, 0, 1);
        }
    }
    
     .contact {
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750upx;
        height: 98upx;
        line-height: 98upx;
        text-align: center;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #fff;
        background: $theme-color;

        
    }
    
    .white-space{
        height: 98upx;
    }
}
</style>
