<template>
    <view class="sale-after-detail">
        <view class="header">服务单号：FW12317475947347394543</view>

        <view class="goods">
            <view :class="['good']" v-for="(good, goodIndex) in goodList" :key="goodIndex">
                <!-- 展开 -->
                <view class="good-header">
                    <image class="shop-img" src="../static/imgs/fitting/5.jpg" mode=""></image>

                    <view class="detail">
                        <view class="detail-header">
                            <view class="shop-name">ML2395730185473123</view>

                            <view class="shop-after" v-if="good.afterState === '审核中'">审核中</view>
                            <view class="shop-after" v-if="good.afterState === '已审核'">已审核</view>
                            <view class="shop-after" v-if="good.afterState === '退款中'">退款中</view>
                            <view class="shop-after" v-if="good.afterState === '待寄回'">待寄回</view>
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
                        </view>
                    </view>
                </view>

                <view class="good-footer">
                    <view class="item">
                        <view class="label">售后类型：</view>
                        <view class="value">退货退款</view>
                    </view>
                    <view class="item">
                        <view class="label">审核原因：</view>
                        <view class="value">质量问题</view>
                    </view>
                    <view class="item">
                        <view class="label">退款金额：</view>
                        <view class="value">￥2050.00</view>
                    </view>
                    <view class="item">
                        <view class="label">申请时间：</view>
                        <view class="value">2019/03/30 12：31</view>
                    </view>
                </view>

                <view class="buttons">
                    <view class="button" v-if="good.afterState === '审核中'">
                        <image src="../static/icon/calord.svg" mode=""></image>
                        <text>取消申请</text>
                    </view>
                    <view class="button" v-if="good.afterState === '待寄回'" @tap="toPostInformation">
                        <image src="../static/icon/edit.svg" mode=""></image>
                        <text>填写快递信息</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="total">
            <view class="label">退款总金额</view>
            <view class="value">¥4100.00</view>
        </view>
        
         <view class="contact">
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
                {
                    afterState: '待寄回'
                }
            ]
        };
    },

    computed: {},
    
    methods:{
        toPostInformation(){
            uni.navigateTo({
                url:'post-information'
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
