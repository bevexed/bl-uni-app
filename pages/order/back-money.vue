<template>
    <view class="back-money">
        <view class="title">退款服务</view>

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
                          <view class="option" v-if="good.sampleType !== '无小样'">
                                <view class="label">标样：￥0</view>
                                <view class="value">*1</view>
                            </view>
                            <view class="option">
                              <view class="label">商品：￥{{ good.unitAmount }}/米</view>
                              <view class="value">*{{ good.count }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="list">
            <view class="item">
                <text class="label">退款金额</text>
              <text class="price">￥{{ current[0].amount }}</text>
                <text class="bedge"></text>
            </view>
            <view class="item flex" @tap="cancalOrder">
                <text class="label">退款原因</text>
                <view class="label flex">
                  {{ sorts[currentPickerValue].reasonText }} <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>
            <view class="item">
                <text class="label">退款说明</text>
                <text class="bedge">(选填)</text>
                <textarea
                  class="text-area"
                  auto-height
                  maxlength="200"
                  placeholder-style="font-size:12px;color:#999;"
                  v-model="reasonText"
                  placeholder="请描述您的问题，以便我们尽快为您服务"
                ></textarea>
              <text class="text-area-length">{{ reasonText.length }}/200</text>
            </view>
        </view>

      <view class="button" @tap="cancelOrder({
        orderId,
        reasonText,
        reason:sorts[currentPickerValue].reason,
        })">提交申请
      </view>
        <custmer-phone class="custmer" />

        <!-- 退款 原因 弹窗 -->
        <view class="pop-wrap" v-show="sortShow" @touchmove.stop.prevent="moveHandle" @tap.self="sortShow = false">
            <view class="my-pop">
                <view class="pop-top">
                    <text @tap="sortShow = false">取消</text>
                    <text class="sure" @tap="sureSelect">选择</text>
                </view>

                <picker-view class="pick" indicator-style="height: 40px;" :value="defaultPicker" @change="bindChange">
                    <picker-view-column>
                        <view class="selecter" v-for="(sort, index) in sorts" :key="index">
                          <view class="value">{{ sort.reasonText }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>

            </view>
        </view>
    </view>
</template>

<script>
  import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
  import { mapActions, mapState } from "vuex";

export default {
  components: {
    CustmerPhone
  },
  data() {
    return {
      // 商品 列表
      orderId: '',
      current: [],
      goods: [],
      // 用户反馈信息
      reasonText: '',
      sortShow: false,
      // 退款原因
      sorts: [
        { reasonText: '', reason: '' },
        { reasonText: '买错了,不想买了', reason: 0 },
        { reasonText: '未及时发货', reason: 10 },
        { reasonText: '商品信息有误', reason: 20 },
        { reasonText: '其他', reason: 30 },
      ],
      // 默认退款原因
      defaultPicker: [0],
      // 当前选择退款原因
      currentPickerValue: 0
    };
  },
  computed: mapState('Order', ['orderList']),
  methods: {
    ...mapActions('Order', ['cancelOrder']),
    sureSelect() {
      this.sortShow = false;
    },
    bindChange(e) {
      this.currentPickerValue = e.detail.value[0];
    },
    cancalOrder(e) {
      this.sortShow = true;
    },
    moveHandle() {
    },
  },
  onLoad(e) {
    let { orderId } = e;
    this.orderId = orderId;
    this.current = this.orderList.filter(item => item.orderId === orderId);
    this.goods = this.current[0].product;
    console.log(this.goods);
  }
};
</script>

<style lang="scss">
.back-money {
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
              display: flex;
              align-items: center;
              justify-content: center;
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
}
</style>
