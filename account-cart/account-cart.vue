<template>
    <view class="account-cart">
        <view class="title">结算付款</view>

        <!-- 地址 -->
        <view class="address">
            <view class="label">
                收货地址
                <text>（0/10）</text>
            </view>
            <view class="add-new-address">
                <image src="../static/icon/add.png" mode=""></image>
                <text>添加新地址</text>
            </view>
        </view>

        <!-- 商品信息 -->
        <view class="goods-title title">商品信息</view>
        <!-- 收起 -->
        <view class="preview" v-if="preview">
            <image v-for="(good, i) in goods" v-show="i < 4" src="../static/imgs/fitting/1.jpg" mode=""></image>
            <image class="more" @tap="preview = false" src="../static/icon/more.svg" mode=""></image>
        </view>

        <view class="goods" v-else>
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

                        <view class="price">￥2000.00</view>
                    </view>
                </view>
            </view>

            <image @tap="preview = true" class="hr" src="../static/icon/all.svg" mode=""></image>
        </view>

        <view class="pay-detail">
            <view class="pay-total">
                <view class="label">商品总金额</view>
                <view class="value">￥6100.00</view>
            </view>

            <view class="express">
                <view class="label">运费</view>
                <view class="value">￥0.00</view>
            </view>

            <view class="real-pay">
                <view class="label">实付款</view>
                <view class="value">￥6050.00</view>
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

        <view :class="['pay-button', { active: agreement }]">立即支付</view>
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
                },
                {
                    num: 0 // 购买数量，
                },
                {
                    num: 0 // 购买数量，
                },
                {
                    num: 0 // 购买数量，
                },
                {
                    num: 0 // 购买数量，
                }
            ],
            // 是否 预览
            preview: true,
            // 是否同意
            agreement: false
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.account-cart {
    padding: 0 $white-space;
    .title {
        color: #333;
        font-size: 32upx;
        font-weight: 500;
        text-align: center;
        border-bottom: 2upx solid #eeeeee;
        padding: 12upx $white-space 24upx;
    }

    .address {
        display: flex;
        justify-content: space-between;
        border-bottom: 2upx solid #eeeeee;
        padding: $white-space 0;
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
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #333;
        }

        image {
            width: 34upx;
            height: 34upx;
            margin-right: 10upx;
        }
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
        justify-content: space-between;
        align-items: center;
        padding: 40upx 0;
        image {
            width: 128upx;
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
        margin: 226upx auto 68upx;
        text-align: center;
        background: #CCCCCC;
        border-radius: 8upx;
        color: #fff;
        font-size: 28upx;
        &.active{
           background: $theme-color; 
        }
    }
}
</style>
