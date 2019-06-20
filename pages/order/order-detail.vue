<template>
    <view class="order-detail">
        <view class="header">
            <view>
                交易完成
                <view class="sm">再去商城逛一逛吧</view>
            </view>
            <image src="../static/icon/over.svg" mode=""></image>
        </view>

        <view class="address">
            <image src="../static/icon/loca.svg" mode=""></image>
            <view class="detail">
                <view class="top">
                    <text class="name">路人甲</text>
                    <text class="phone">158 **** 7984</text>
                </view>
                <view class="address-detail">地址：浙江省杭州市拱墅区西溪首座A1-1 310</view>
            </view>
        </view>

        <view class="goods">
            <view class="good" v-for="(good, i) in goods" :key="i">
                <!-- 展开 -->
                <image class="shop-img" src="../static/imgs/fitting/5.jpg" mode=""></image>

                <view class="detail">
                    <view class="detail-header"><view class="shop-name">ML2395730185473123</view></view>
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

                        <view class="button" @tap="toSaleAfter">售后</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="price">
            <view class="item">
                <view class="label">商品总金额</view>
                <view class="value">￥20000.00</view>
            </view>
            <view class="item">
                <view class="label">运费</view>
                <view class="value">￥0.00</view>
            </view>
            <view class="item">
                <view class="real-pay">实付款</view>
                <view class="real-value">￥19500.00</view>
            </view>
        </view>

        <view class="order">
            <view class="item">
                <view class="label">订单编号</view>
                <view class="time">12314686954682</view>
            </view>
            <view class="item">
                <view class="label">下单时间</view>
                <view class="time">2019.04.25 12:30:35</view>
            </view>
            <view class="item">
                <view class="label">发货时间</view>
                <view class="time">2019.04.25 12:30:35</view>
            </view>
        </view>

        <view class="state">
            <view class="item">
                <view class="label">开票状态</view>
                <view class="label">未开票</view>
            </view>
        </view>

        <view class="state">
            <view class="item">
                <view class="label">合同状态</view>
                <view class="label">未申请</view>
            </view>
        </view>

        <view class="button-bottom">
            <text>联系客服</text>
        </view>
        <view class="white-space"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 商品 列表
            goods: [
                {
                    num: 0 // 购买数量，
                }
            ]
        };
    },
    methods: {
        toSaleAfter(){
            uni.navigateTo({
                url:'sale-after'
            })
        }
    },
    onLoad(e) {
        console.log(e);
    }
};
</script>

<style lang="scss">
.order-detail {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 28upx 60upx;
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(270deg, rgba(155, 113, 93, 1) 0%, rgba(198, 171, 155, 1) 100%);
        > view {
            height: 100upx;
        }
        .sm {
            font-size: 20upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-top: 12upx;
        }

        image {
            width: 100upx;
            height: 100upx;
        }
    }

    .address {
        padding: 24upx $white-space;
        display: flex;
        align-items: center;
        border-bottom: 2upx solid #eeeeee;
        image {
            width: 40upx;
            height: 40upx;
            margin-right: 10px;
        }
        .detail {
            display: flex;
            flex-wrap: wrap;
            font-size: 24upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            .top {
                .phone {
                    margin-left: 120upx;
                }
            }
            .address-detail {
                margin-top: 6px;
            }
        }
    }

    .goods {
        padding: 2upx $white-space;
        .good {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: $white-space 0;
            border-bottom: 2upx solid #eeeeee;

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

                    .button {
                        width: 120upx;
                        height: 60upx;
                        line-height: 60upx;
                        text-align: center;
                        border: 2upx solid $theme-color;
                        border-radius: 8upx;
                        text-align: center;
                        color: $theme-color;
                        font-size: 28upx;
                    }
                }
            }
        }

        .hr {
            height: 28upx;
        }
    }

    .state,
    .order,
    .price {
        margin: 20upx $white-space 10upx;
        border-bottom: 2upx solid #eeeeee;
        .item {
            display: flex;
            justify-content: space-between;
            margin: 20upx 0;
            .label {
                font-size: 24upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .value {
                font-size: 30upx;
                font-family: DINAlternate-Bold;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }

            .real-pay {
                font-size: 28upx;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }

            .real-value {
                font-size: 40upx;
                font-family: DINAlternate-Bold;
                font-weight: bold;
                color: rgba(197, 0, 0, 1);
            }

            .time {
                font-size: 24upx;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }
        }
    }

    .button-bottom {
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

        image {
            width: 32upx;
            height: 32upx;
            margin-right: 20upx;
            margin-top: -4upx;
        }
    }

    .white-space {
        height: 98upx;
    }
}
</style>
