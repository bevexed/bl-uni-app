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
                <view :class="['wrap', 'wrap' + index]" v-for="(order, orderIndex) in orderList[index]" :key="orderIndex">
                    <view class="order-header">
                        <view class="order-num">订单编号：952738179214</view>
                        <view class="order-state">{{ order.state }}</view>
                    </view>
                    <!-- 收起 -->
                    <view class="preview" v-if="preview !== order.id && order.goodList.length >= 4">
                        <view v-for="(good, goodIndex) in order.goodList" :key="goodIndex"><image v-show="goodIndex < 4" src="http://qxintechoffice.f3322.net:5007/micro/1.jpg" mode=""></image></view>
                        <image class="more" @tap="toPreview(order.id)" src="../static/icon/more.svg" mode=""></image>
                    </view>

                    <view class="goods" v-else>
                        <view :class="['good']" v-for="(good, goodIndex) in order.goodList" :key="goodIndex">
                            <!-- 展开 -->
                            <image :class="['shop-img', { 'not-send-good': good.notSendGood }]" src="http://qxintechoffice.f3322.net:5007/micro/1.jpg" mode=""></image>

                            <view class="detail">
                                <view class="detail-header">
                                    <view class="shop-name">ML2395730185473123</view>

                                    <!-- 售后状态 -->
                                    <view class="shop-after" v-if="order.state === '交易完成' && good.afterState === '处理中'">处理中</view>
                                    <view class="shop-after-button" v-if="order.state === '交易完成' && good.afterState !== '处理中'" @tap="toSaleAfter">售后</view>

                                    <view class="shop-after" v-if="order.state === '售后处理' && good.afterState === '审核中'">审核中</view>
                                    <view class="shop-after" v-if="order.state === '售后处理' && good.afterState === '已审核'">已审核</view>
                                    <view class="shop-after" v-if="order.state === '售后处理' && good.afterState === '退款中'">退款中</view>
                                </view>
                                <view class="detail-footer">
                                    <view :class="['options']">
                                        <view class="option">
                                            <view class="label">标样：￥0</view>
                                            <view class="value">*1</view>
                                        </view>
                                        <view class="option">
                                            <view class="label">商品：￥50/米</view>
                                            <view class="value">*40</view>
                                        </view>
                                    </view>

                                    <view class="price">￥2000.00</view>
                                </view>
                            </view>
                        </view>

                        <image @tap="toPreview(-1)" class="hr" src="../static/icon/all.svg" v-if="preview === order.id && order.goodList.length >= 4" mode=""></image>
                    </view>

                    <view class="pay-detail">
                        <view class="real-pay">
                            <view class="num">共{{ order.goodList.length }}件商品</view>
                            <view class="label">实付</view>
                            <view class="value">￥6050.00</view>
                        </view>
                    </view>

                    <view class="buttons">
                        <view class="button cancel" v-if="order.state === '待付款'" :data-order-id="order.id" @tap="cancalOrder($event)">取消订单</view>
                        <view class="button pay" v-if="order.state === '待付款'">付款</view>

                        <view class="button  cancel" v-if="order.state === '交易关闭'">删除订单</view>
                        <view class="button  cancel" v-if="order.state === '交易关闭'">订单详情</view>

                        <view class="button  cancel" v-if="order.state === '待发货'" :data-order-id="order.id" @tap="toBackMoney($event)">取消订单</view>
                        <view class="button  cancel" v-if="order.state === '待发货'">催单</view>

                        <view class="button  pay" v-if="order.state === '待收货'">确认收货</view>

                        <view class="button  cancel" v-if="order.state === '售后处理'" :data-order-id="order.id" @tap="toSaleAfterDetail($event)">查看详情</view>

                        <view class="button  cancel" v-if="order.state === '交易完成'" :data-order-id="order.id" @tap="toOrderDetail($event)">查看详情</view>
                        <view class="button  cancel" v-if="order.state === '交易完成'">获取合同</view>
                        <view class="button  cancel" v-if="order.state === '交易完成'" :data-order-id="order.id" @tap="toApplyTicket($event)">申请开票</view>
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
                            <view class="value">{{ sort }}</view>
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
export default {
    data() {
        return {
            // 页面最大高度
            maxHeight: '',
            tabList: [{ name: '全部', value: 0 }, { name: '待付款', value: 1 }, { name: '待发货', value: 2 }, { name: '待收货', value: 3 }, { name: '售后', value: 4 }],
            TabCur: 0,
            // 商品 列表
            orderList: [
                // 全部订单
                [
                    { id: 100, state: '待付款', goodList: [{}, {}, {}, {}, {}] },
                    {
                        id: 2,
                        state: '交易关闭',
                        goodList: [{}, {}, {}]
                    },
                    {
                        id: 3,
                        state: '待发货',
                        goodList: [{}, {}, {}, {}]
                    },
                    {
                        id: 4,
                        state: '待收货',
                        goodList: [{}, {}]
                    },
                    {
                        id: 5,
                        state: '交易完成',
                        goodList: [
                            {
                                afterState: '处理中'
                            },
                            {
                                afterState: '处理中'
                            },
                            {}
                        ]
                    }
                ],
                [
                    { id: 1, state: '待付款', goodList: [{}, {}, {}] },
                    {
                        id: 2,
                        state: '待付款',
                        goodList: [{}, {}, {}, {}]
                    },
                    {
                        id: 3,
                        state: '待付款',
                        goodList: [{}]
                    },
                    {
                        id: 4,
                        state: '待付款',
                        goodList: [{}, {}]
                    }
                ],
                [
                    { id: 1, state: '待发货', goodList: [{
                        notSendGood: true
                    }, {}] },
                    {
                        id: 2,
                        state: '待发货',
                        goodList: [
                            {
                                notSendGood: true
                            },
                            {},
                            {}
                        ]
                    },
                    {
                        id: 3,
                        state: '待发货',
                        goodList: [{}, {}, {}, {}]
                    },
                    {
                        id: 4,
                        state: '待发货',
                        goodList: [{}, {}]
                    }
                ],
                [
                    { id: 1, state: '待收货', goodList: [{}, {}] },
                    {
                        id: 2,
                        state: '待收货',
                        goodList: [{}, {}, {}, {}, {}, {}]
                    },
                    {
                        id: 3,
                        state: '待收货',
                        goodList: [{}, {}, {}, {}]
                    },
                    {
                        id: 4,
                        state: '待收货',
                        goodList: [{}, {}]
                    }
                ],
                [
                    {
                        id: 1,
                        state: '售后处理',
                        goodList: [{}]
                    },
                    {
                        id: 2,
                        state: '售后处理',
                        goodList: [
                            {
                                afterState: '审核中'
                            },
                            {
                                afterState: '已审核'
                            },
                            {
                                afterState: '退款中'
                            },
                            {},
                            {},
                            {}
                        ]
                    },
                    {
                        id: 3,
                        state: '售后处理',
                        goodList: [{}, {}, {}, {}]
                    },
                    {
                        id: 4,
                        state: '售后处理',
                        goodList: [{}, {}]
                    }
                ]
            ],
            // 是否 预览 通过 当前订单id来判断 当前订单是否处于 预览状态
            preview: -1,
            // 是否同意
            agreement: false,
            // 弹窗
            sortShow: false,
            // 退款原因
            sorts: ['退款原因1', '退款原因2', '退款原因3', '退款原因4', '退款原因5', '退款原因6', '退款原因7'],
            // 默认退款原因
            defaultPicker: [2],
            // 当前选择退款原因
            currentPickerValue: 2
        };
    },

    computed: {},

    methods: {
        swiperChange(e) {
            let { current } = e.target;
            this.TabCur = current;
            this.height('.wrap' + current);
        },
        tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.TabCur = index;
            this.height('.wrap' + index);
        },

        toPreview(id) {
            this.preview = id;
            setTimeout(() => this.height('.wrap' + this.TabCur));
        },

        bindChange(e) {
            console.log(e);
            const val = e.detail.value[0];
            this.currentPickerValue = val;
        },
        moveHandle() {},

        cancalOrder(e) {
            const { orderId } = e.currentTarget.dataset;
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

        toSaleAfter() {
            uni.navigateTo({
                url: 'sale-after'
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
            this.sortShow = false;
        },

        height(current) {
            let view = uni.createSelectorQuery().selectAll(current);
            setTimeout(() => {
                view.boundingClientRect(data => {
                    console.log('高' + data.map(item => item.height).reduce((total, num) => total + num, 0));
                    this.maxHeight = data.map(item => item.height).reduce((total, num) => total + num, 0) + data.length * 20;
                    console.log(this.maxHeight);
                }).exec();
            });
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
