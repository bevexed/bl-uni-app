<template>
    <view class="back-money">
        <view class="title">售后服务</view>

        <view class="goods">
            <view class="good" v-for="(good, i) in goods" v-if="good.itemId == itemId" :key="i">
                <!-- 展开 -->
              <image class="shop-img" :src="good.image" mode=""></image>

              <view class="detail">
                <view class="detail-header"><view class="shop-name">{{ good.productNo }}</view></view>
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
                </view>
              </view>
            </view>
        </view>

        <view class="list">
            <view class="item">
                <text class="label">退款金额</text>
                <text class="price">￥2050.00</text>
                <text class="bedge">(不含运费)</text>
            </view>

            <view class="item flex" @tap="selectSaleAfter">
                <text class="label">售后服务类型</text>
                <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view :class="['item', 'flex']" @tap="selectNum">
                <text :class="['label', { 'current-picker': currentSelectSaleAfterShow !== 1 }]">退货数量</text>
                <!-- <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image> -->
            </view>

            <view class="item flex" @tap="selectReason">
                <text class="label">退款原因</text>
                <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="item">
                <text class="label">退款说明</text>
                <text class="bedge">(选填)</text>
                <textarea
                    class="text-area"
                    v-if="!selectNumShow&&!selectReasonShow&&!selectSaleAfterShow"
                    auto-height
                    maxlength="200"
                    placeholder-style="font-size:12px;color:#999;"
                    v-model="textArea"
                    placeholder="请描述您的问题，以便我们尽快为您服务"
                />
                <view class="text-area" :style="{fontSize:12+'px',color:'#999'}" v-else>{{textArea || "请描述您的问题，以便我们尽快为您服务"}}</view>
                <text class="text-area-length">{{ textArea.length }}/200</text>
            </view>
        </view>

        <view class="button">提交申请</view>
        <custmer-phone class="custmer" />

        <!-- 退款 原因 弹窗 -->
        <view class="pop-wrap" v-show="selectReasonShow" @touchmove.stop.prevent="moveHandle" @tap.self="selectReasonShow = false">
            <view class="my-pop">
                <view class="pop-top">
                    <text @tap.stop.prevent="selectReasonShow = false">取消</text>
                    <text class="sure" @tap.stop.prevent="sureSelect">选择</text>
                </view>

                <picker-view class="pick" indicator-style="height: 40px;" :value="defaultPicker" @change="selectChange">
                    <picker-view-column>
                        <view class="selecter" v-for="(sort, index) in sorts" :key="index">
                            <view class="value">{{ sort }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>

                <!-- <view class="line left"></view>
                <view class="line right"></view> -->
            </view>
        </view>

        <!-- 售后 服务类型 弹窗-->
        <view class="pop-wrap" v-show="selectSaleAfterShow" @touchmove.stop.prevent="moveHandle" @tap.self="selectReasonShow = false">
            <view class="my-pop">
                <view class="pop-top">
                    <text @tap.stop.prevent="selectSaleAfterShow = false">取消</text>
                    <text class="sure" @tap.stop.prevent="sureSelect">选择</text>
                </view>

                <picker-view class="pick" indicator-style="height: 40px;" :value="defaultSelectSaleAfterShow" @change="bindChange">
                    <picker-view-column>
                        <view class="selecter"><view class="value">仅退款</view></view>
                        <view class="selecter"><view class="value">退货退款</view></view>
                    </picker-view-column>
                </picker-view>

                <!-- <view class="line left"></view>
                <view class="line right"></view> -->
            </view>
        </view>

        <!-- 数量 选择 弹窗 -->
        <view class="pop-wrap" v-show="selectNumShow" @touchmove.stop.prevent="moveHandle" @tap.stop="selectNumShow = false">
            <view class="my-pop" @tap.stop>
                <view class="pop-top">
                    <text @tap.stop.prevent="selectNumShow = false">取消</text>
                    <text class="sure" @tap.stop.prevent="sureSelect">选择</text>
                </view>

                <view class="select-much">
                    <view class="title">退货数量</view>
                    <view class="rest">已购 3000 米</view>
                    <view class="nums">
                        <uni-number-box :min="0" :max="99999" :step="1" :value="num" @change="numChange"></uni-number-box>
                        <view class="rest unit">米</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
import uniNumberBox from '../../components/uni-number-box/uni-number-box.vue';
import { uniDrawer, uniNavBar, uniTag, uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CustmerPhone,
    uniNumberBox,
    uniTag
  },

  data() {
    return {
      itemId: '',
      // 用户反馈信息
      textArea: '',
      selectReasonShow: false,
      // 退款原因
      sorts: ['退款原因1', '退款原因2', '退款原因3', '退款原因4', '退款原因5', '退款原因6', '退款原因7'],
      // 默认退款原因
      defaultPicker: [2],
      // 当前选择退款原因
      currentPickerValue: 1,
      // 售后服务类型弹窗
      selectSaleAfterShow: false,
      // 默认售后类型
      defaultSelectSaleAfterShow: [0],
      // 当前选择类型
      currentSelectSaleAfterShow: 0,

      // 数量 选择 弹窗
      selectNumShow: false,

      // 购买数量
      num: 0,

      tagsList: ['码样'],
      // 当前选中标签
      tagCurrentSelect: []
    };
  },
  computed: mapState('Order', {
    goods: state => state.orderDetail.product,
    orderDetail: state => state.orderDetail
  }),
  methods: {
    ...mapActions('Order', ['getOrderDetail']),
    sureSelect() {
      this.selectReasonShow = false;
      this.selectSaleAfterShow = false;
      this.selectNumShow = false;
    },
    selectChange(e) {
      this.currentPickerValue = e.detail.value[0];
    },
    selectNum() {
      if (this.currentSelectSaleAfterShow !== 1) {
        return;
      }
      this.selectNumShow = true;
    },
    selectReason(e) {
      this.selectReasonShow = true;
    },
    selectSaleAfter() {
      this.selectSaleAfterShow = true;
    },
    bindChange(e) {
      console.log('sale-after-type', e);
      const val = e.detail.value[0];
      this.currentSelectSaleAfterShow = val;
    },
    numChange(val) {
      console.log(val);
    },
    selectTag(currentState, tag_name) {
      if (this[currentState].includes(tag_name)) {
        this[currentState].splice(this[currentState].findIndex(item => item === tag_name), 1);
        return;
      }
      this[currentState].push(tag_name);
    },
    moveHandle() {
    }
  },
  onLoad(e) {
    const { orderId, itemId } = e;
    this.itemId = itemId;
    this.getOrderDetail(orderId);
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
                width: 630upx;
                min-height: 230upx;
                margin-top: 34upx;
                font-size: 12px;
                background: #f9f9f9;
            }

            .text-area-length {
                position: relative;
                top: -60upx;
                left: 600upx;
                /* #ifdef MP-WEIXIN */
                left: 600upx;
                /* #endif */
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
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 200000upx;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .my-pop {
            z-index: 999;
            position: fixed;
            bottom: 0upx;
            width: 750upx;
            height: 250upx;
            background: #fff;
            padding: 20upx 0;
            .pop-top {
                display: flex;
                justify-content: space-between;
                padding: 0 0 20upx 0;
                background: #fff;
                border-bottom: 1px solid #eee;

                text {
                    font-size: 28upx;
                    font-weight: 300;
                    padding: 0 40upx;
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
                justify-content: center;
                align-items: center;
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
            height: 500upx;
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
            margin: 114upx 40upx 0;

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
            display: flex;
            align-items: center;
            margin: 64upx 40upx 0;
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

    .current-picker {
        color: #999 !important;
    }
}
</style>
