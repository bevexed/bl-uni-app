<template>
    <view class="order">
        <view class="navs">
            <view class="" v-for="(item, index) in tabList" :key="index" @tap="tabSelect(index, $event)">
                <view :class="['nav', { active: TabCur === index }]">{{ item.name }}</view>
            </view>
        </view>
        <view class="white-space"></view>

        <swiper :current="TabCur" class="swiper" :style="{ height: maxHeight + 20 + 'px' }" :circular="true" @change="swiperChange">
            <swiper-item v-for="(item, index) in tabList" :key="index">
              <view :class="['wrap', 'wrap' + index]" v-for="(order, orderIndex) in currentDataList" :key="orderIndex">
                    <view class="order-header">
                      <view class="order-num">{{tabList[TabCur].name === '售后'? '服务单号':'订单编号'}}:{{ order.orderId }}
                      </view>
                      <view class="order-state">{{ order.status }}</view>
                    </view>
                    <!-- 收起 -->
                <view class="preview" v-if="preview !== order.orderId && order.product.length >= 4">
                  <view v-for="(good, goodIndex) in order.product" :key="goodIndex">
                    <image
                      v-show="goodIndex < 4"
                      :src="good.image"
                      mode=""></image>
                  </view>
                  <image class="more" @tap="toPreview(order.orderId)" src="../static/icon/more.svg" mode=""></image>
                    </view>
                <!--展开-->
                <!--小样-->
                <view class="goods"
                      v-if="!(preview !== order.orderId && order.product.length >= 4 )">
                  <view :class="['good']" v-for="(good, goodIndex) in order.product" v-if="good.sampleType!=='无小样'"
                        :key="goodIndex">
                            <!-- 展开 -->
                        <image :class="['shop-img', { 'not-send-good': good.notSendGood }]"
                               :src="good.image"
                               mode=""
                               @tap="toDetail(good.productId)"
                        ></image>

                            <view class="detail">
                                <view class="detail-header">
                                  <view class="shop-name">{{ good.productNo }}</view>

                                </view>
                                <view class="detail-footer">
                                    <view :class="['options']">
                                      <view class="option" v-if="good.sampleType!=='无小样'">
                                            <view class="label">标样：￥{{ good.sampleAmount }}</view>
                                            <view class="value">*1</view>
                                        </view>
                                    </view>

                                  <view class="price">￥{{good.amount}}</view>
                                </view>
                            </view>
                        </view>

                      <image @tap="toPreview(-1)" class="hr" src="../static/icon/all.svg"
                             v-if="preview === order.orderId && order.product.length >= 4" mode=""></image>
                    </view>
                <!--商品-->
                <view class="goods"
                      v-if="!(preview !== order.orderId && order.product.length >= 4 )"
                >
                  <view :class="['good']" v-for="(good, goodIndex) in order.product" v-if="Number(good.count) !== 0"
                        :key="goodIndex">
                    <!-- 展开 -->
                    <image :class="['shop-img', { 'not-send-good': good.notSendGood }]"
                           :src="good.image"
                           mode=""
                           @tap="toDetail(good.productId)"
                    ></image>

                    <view class="detail">
                      <view class="detail-header">
                        <view class="shop-name">{{ good.productNo }}</view>

                        <!-- 售后状态 -->
                        <view class="shop-after" v-if="!good.allowAfterSale && good.afterSaleStatus">
                          {{ good.afterSaleStatus }}
                        </view>
                        <view class="shop-after-button"
                              v-if="good.allowAfterSale"
                              @tap="toSaleAfter({orderId:order.orderId,itemId:good.itemId})">
                          售后
                        </view>
                      </view>
                      <view class="detail-footer">
                        <view :class="['options']">
                          <view class="option" v-if="Number(good.count)">
                            <view class="label">商品：￥{{ good.unitAmount }}/米</view>
                            <view class="value">*{{ good.count }}</view>
                          </view>
                        </view>

                        <view class="price">￥{{good.amount}}</view>
                      </view>
                    </view>
                  </view>

                  <image @tap="toPreview(-1)" class="hr" src="../static/icon/all.svg"
                         v-if="preview === order.orderId && order.product.length >= 4" mode=""></image>
                </view>

                <view class="pay-detail" v-if="tabList[TabCur].name !== '售后'">
                        <view class="real-pay">
                          <view class="num">共{{ order.product.length }}件商品</view>
                            <view class="label">实付</view>
                            <view class="value">￥{{ order.amount }}</view>
                        </view>
                    </view>

                    <view class="buttons">
                      <!--待支付-->
                      <!--待支付-->
                      <view class="button cancel" v-if="order.status === '待付款'"
                            @tap="doCancalOrder(order.orderId)">取消订单
                      </view>
                      <view class="button pay" v-if="order.status === '待付款'" @tap="toPay(order.orderId,order.amount)">
                        付款
                      </view>

                      <!--交易关闭-->
                      <!--交易关闭-->
                      <view class="button  cancel" v-if="order.status === '交易关闭'">删除订单</view>
                      <view class="button  cancel" v-if="order.status === '交易关闭'"  :data-order-id="order.orderId"  @tap="toOrderDetail($event)">订单详情</view>

                      <!--待发货-->
                      <!--待发货-->
                      <view class="button  cancel" v-if="order.status === '待发货'" :data-order-id="order.orderId"
                            @tap="toBackMoney($event)">取消订单
                      </view>
                      <view class="button  cancel" v-if="order.status === '待发货'" @tap="remindOrder(order.orderId)">
                        催单
                      </view>
                      <view class="button  pay" v-if="order.status === '待收货'" @tap="doConfirmReceipt(order.orderId)">
                        确认收货
                      </view>

                      <!--售后处理-->
                      <!--售后处理-->
                      <view class="button  cancel" v-if="order.status === '售后处理'" :data-order-id="order.orderId"
                            @tap="toSaleAfterDetail($event)">售后详情
                      </view>


                      <!--交易完成-->
                      <!--交易完成-->
                      <view class="button  cancel" v-if="order.status === '交易完成'" :data-order-id="order.orderId"
                            @tap="toOrderDetail($event)">查看详情
                      </view>
                      <view
                        class="button  cancel"
                        v-if="order.status === '交易完成' && order.contractStatus === null"
                        @tap="applyContract(order.orderId)">
                        获取合同
                      </view>

                      <view
                        class="button gray"
                        v-if="order.status === '交易完成' && order.contractStatus === 0"
                        >
                        合同待上传
                      </view>

                      <view
                        class="button  cancel"
                        v-if="order.status === '交易完成' && order.contractStatus === 1"
                        @tap="toContract(order.orderId)">
                        查看合同
                      </view>

                      <view class="button  cancel"
                            v-if="order.status === '交易完成' && order.invoiceStatus === null"
                            :data-order-id="order.orderId"
                            @tap="toApplyTicket($event)">
                        申请开票
                      </view>
                      <view class="button  gray"
                            v-if="order.status === '交易完成' && order.invoiceStatus === 0"
                            :data-order-id="order.orderId">
                        发票待审批
                      </view>
                      <view class="button  gray"
                            v-if="order.status === '交易完成' && order.invoiceStatus === 1"
                            :data-order-id="order.orderId">
                        发票待寄送
                      </view>
                      <view class="button  cancel"
                            v-if="order.status === '交易完成' && order.invoiceStatus === 2"
                            :data-order-id="order.orderId"
                            @tap="signInvoice(order.orderId)"
                      >
                        签收发票
                      </view>
                      <view class="button  gray"
                            v-if="order.status === '交易完成' && order.invoiceStatus === 3"
                            :data-order-id="order.orderId">
                        发票已签收
                      </view>

                    </view>
                </view>
            </swiper-item>
        </swiper>

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

                <!-- <view class="line left"></view>
                <view class="line right"></view> -->
            </view>
        </view>
    </view>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { reqApplyContract } from "../../api/contract";
  import { reqSignInvoice } from "../../api/invoice";
  import { SHOW_MODAL } from "../../unit";

  export default {
    data() {
      return {
        // 页面最大高度
        maxHeight: '',
        tabList: [
          { name: '全部', value: 0 },
          { name: '待付款', value: 0 },
          { name: '待发货', value: 20 },
          { name: '待收货', value: 30 },
          // { name: '交易完成', value: 40 }
          { name: '售后', value: 40 }
        ],
        TabCur: 0,
        preview: -1,
        // 是否同意
        agreement: false,
        // 弹窗
        sortShow: false,
        // 退款原因
        sorts: [
          { reasonText: '买错了,不想买了', reason: 0 },
          { reasonText: '未及时发货', reason: 10 },
          { reasonText: '付款不成功', reason: 20 },
          { reasonText: '商品信息有误', reason: 30 },
          { reasonText: '其他', reason: 40 },
        ],
        // 默认退款原因
        defaultPicker: [0],
        // 当前选择退款原因
        currentPickerValue: 0,


        currentCancelOrderNum: '',
      };
    },

    computed: {
      ...mapState('Order', ['orderList', 'page',]),
      ...mapState('Sale', ['afterSaleList']),
      currentDataList() {
        let afterSaleList = this.afterSaleList
          .map(item =>
            ({
              status: '售后处理',
              orderId: item.afterSaleId,
              product: [{
                amount: item.amount || '1',
                image: item.image,
                afterSaleStatus: item.status,
                productId: item.productId,
                productNo: item.productNumber,
                count:item.afterSaleProductCount,
                sampleAmount: "0.00",
                sampleType: "无小样",
                unitAmount: item.unitAmount,
              }]
            })
          );
        return this.tabList[this.TabCur].name === '售后' ? afterSaleList : this.orderList
      }
    },

    onShow() {
      this.getAfterSaleList();

      if (this.TabCur === 0) {
        this.getOrderList({
          page: 1,
          pageSize: 10,
        }).then(() => this.height('.wrap0'));
        return
      }
      let status = this.tabList[this.TabCur].value;
      this.getOrderList({
        page: 1,
        pageSize: 10,
        status
      }).then(() => this.height('.wrap0'))
    },

    onReachBottom() {
      if (this.TabCur === 0) {
        this.getOrderList({
          page: this.page + 1,
          pageSize: 10,
        }).then(() => this.height('.wrap0'))
      } else {
        this.getOrderList({
          page: this.page + 1,
          pageSize: 10,
          status: this.tabList[this.TabCur].value
        }).then(() => this.height('.wrap0'))
      }
    },
    methods: {
      ...mapActions('Order', ['getOrderList', 'confirmReceipt', 'remindOrder', 'cancelOrder']),
      ...mapActions('Sale', ['getAfterSaleList']),
      async doConfirmReceipt(id) {
        await this.confirmReceipt(id);
        this.getData();
      },
      swiperChange(e) {
        let { current } = e.target;
        this.TabCur = current;
        this.getData()
      },

      tabSelect(index, e) {
        if (this.TabCur === index) return false;
        this.TabCur = index;
      },

      getData() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });

        if (this.TabCur === 0) {
          this.getOrderList({
            page: 1,
            pageSize: 10,
          }).then(() => this.height('.wrap0'));
          return
        }

        let status = this.tabList[this.TabCur].value;
        this.getOrderList({
          page: 1,
          pageSize: 10,
          status
        }).then(() => this.height('.wrap0'))
      },

      toPreview(id) {
        this.preview = id;
        setTimeout(() => this.height('.wrap' + this.TabCur));
      },

      bindChange(e) {
        this.currentPickerValue = e.detail.value[0];
      },
      moveHandle() {
      },

      doCancalOrder(e) {
        this.currentCancelOrderNum = e;
        this.sortShow = true;
      },

      toBackMoney(e) {
        const { orderId } = e.currentTarget.dataset;
        uni.navigateTo({
          url: 'back-money?orderId=' + orderId
        });
      },

      toOrderDetail(e) {
        const { orderId } = e.currentTarget.dataset;
        uni.navigateTo({
          url: 'order-detail?orderId=' + orderId
        });
      },

      toSaleAfter(data) {
        const { orderId, itemId } = data;
        uni.navigateTo({
          url: 'sale-after?orderId=' + orderId + '&itemId=' + itemId
        });
      },

      toSaleAfterDetail(e) {
        const { orderId } = e.currentTarget.dataset;
        uni.navigateTo({
          url: 'sale-after-detail?orderId=' + orderId
        });
      },

      toApplyTicket(e) {
        const { orderId } = e.currentTarget.dataset;
        uni.navigateTo({
          url: 'apply-ticket?orderId=' + orderId
        });
      },

      sureSelect() {
        const that = this;
        this.sortShow = false;
        uni.showModal({
          title: '取消订单',
          content: '确定取消当前订单？',
          confirmColor: '#BFA065',
          async success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              await that.cancelOrder({
                orderId: that.currentCancelOrderNum,
                reason: that.sorts[that.currentPickerValue].reason
              });
              that.getData();
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },

      toDetail(id) {
        uni.navigateTo({
          url: '/pages/shop-detail/shop-detail?id=' + id
        });
      },

      height(current) {
        let view = uni.createSelectorQuery().selectAll(current);
        setTimeout(() => {
          view.boundingClientRect(data => {
            console.log('高' + data.map(item => item.height).reduce((total, num) => total + num, 0));
            this.maxHeight = data.map(item => item.height).reduce((total, num) => total + num, 0) + data.length * 17;
            console.log(this.maxHeight);
          }).exec();
        });
      },

      async applyContract(orderId) {
        const that = this;
        let res = await reqApplyContract(orderId);
        if (res.code === 200) {
          uni.showToast({
            title: '申请成功',
            mask: true,
            success(res) {
              setTimeout(() => {
                that.getData();
              }, 2000)
            }
          })
        }
      },

      async signInvoice(orderId) {
        const that = this;
        SHOW_MODAL({
          title: '签收发票',
          content: '确定收到发票了吗?',
          confirm() {
            let res = await reqSignInvoice({ id: orderId, isPass: true });
            if (res.code === 200) {
              uni.showToast({
                title: '签收成功',
                mask: true,
                success(res) {
                  setTimeout(() => {
                    that.getData();
                  }, 2000)
                }
              })
            }
          }
        })
      },


      toContract(orderId) {
        uni.navigateTo({
          url: '/pages/contract/contract?orderId=' + orderId
        })
      },

      toPay(orderNum, amount) {
        uni.navigateTo({
          url: '/pages/pay/pay?orderNum=' + orderNum + '&amount=' + amount
        })
      }
    },


    onReady() {
      this.height('.wrap0');
    }
};
</script>
<style lang="scss">
.order {
    background: #f7f7f7;
    .white-space {
        height: 80upx;
    }
    .navs {
        z-index: 999;
        position: fixed;
        width: 750upx;
        height: 80upx;
        display: flex;
        /* #ifdef MP-WEIXIN */
        top: 0;
        /* #endif */
        justify-content: space-between;
        font-size: 28upx;
        font-weight: 300;
        padding: 20upx 48upx 10upx;
        color: #fff;
        background: #444;
        box-sizing: border-box;
        .nav {
            padding: 0 8upx 12upx;
            text-align: center;
            &.active {
                font-weight: 500;
                border-bottom: 4upx solid $theme-color;
            }
        }
    }

    .wrap {
        margin: $white-space;
        border-radius: 8upx;
        box-shadow: 0 2upx 16upx 0 rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .order-header {
        display: flex;
        justify-content: space-between;
        padding: 20upx;
        background: #fff;
        .order-num {
            font-size: 24upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }

        .order-state {
            font-size: 24upx;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
    }

    .goods {
        background: #f9f9f9;
        .good {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 20upx;
            padding: 20upx 0;
            border-bottom: 2upx solid #eee;

            .shop-img {
                position: relative;
                width: 120upx;
                height: 120upx;
                border-radius: 8upx;
                overflow: hidden;

                &.not-send-good:after {
                    position: absolute;
                    bottom: 0;
                    content: '未发货';
                    font-size: 20upx;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                    background: rgba(0, 0, 0, 0.5);
                    width: 120upx;
                    height: 30upx;
                }
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

                    .shop-after-button {
                        width: 92upx;
                        height: 42upx;
                        line-height: 42upx;
                        text-align: center;
                        font-size: 24upx;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(191, 160, 101, 1);
                        background: rgba(191, 160, 101, 0.2);
                        border-radius: 8upx;
                    }

                    .shop-after {
                        font-size: 24upx;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(191, 160, 101, 1);
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
                        max-width: 118upx;
                        font-size: 24upx;
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 40upx 20upx;

        background: #f7f7f7;

        &:after {
            position: absolute;
            content: '';
            width: 648upx;
            height: 2upx;
            background: #eee;
            top: 200upx;
        }
        image {
            width: 120upx;
            height: 120upx;
        }
        .more {
            width: 32upx;
            height: 32upx;
        }
    }

    .pay-detail {
        .real-pay {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background: #f9f9f9;
            padding: 20upx;

            .num {
                margin-right: 80upx;
            }
            .num,
            .label {
                font-size: 24upx;
                color: #333;
            }
            .value {
                font-size: 32upx;
                color: #c50000;
                margin-left: 6upx;
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

    .buttons {
        display: flex;
        justify-content: flex-end;
        padding: 20upx;
        background: #fff;
        .button {
            height: 50upx;
            width: 160upx;
            line-height: 50upx;
            text-align: center;
            font-size: 24upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            border: 2upx solid transparent;
            border-radius: 8upx;
            margin-left: 20upx;
        }
        .cancel {
            border-color: $theme-color;
            color: $theme-color;
        }
        .pay {
            border-color: $theme-color;
            color: #fff;
            background: $theme-color;
        }
      .gray{
        border-color: #999;
        color:#999;
      }
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
}
</style>
