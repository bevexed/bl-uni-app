<template>
    <div class="order">
        <view class="navs">
            <view class="" v-for="(item, index) in tabList" :key="index" @tap="tabSelect(index, $event)">
                <view :class="['nav', { active: TabCur === index }]">{{ item.name }}</view>
            </view>
        </view>
        <view class="white-space"></view>

        <swiper :current="TabCur" class="swiper" :circular="true" @change="swiperChange">
            <swiper-item v-for="(item, index) in tabList" :key="index">
                <view class="wrap">
                    <view class="order-header">
                        <view class="order-num">订单编号：952738179214</view>
                        <view class="order-state">待付款</view>
                    </view>
                    <!-- 收起 -->
                    <view class="preview" v-if="preview && goods.length >= 4">
                        <image v-for="(good, i) in goods" :key="i" v-show="i < 4" src="../static/imgs/fitting/1.jpg" mode=""></image>
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

                        <image @tap="preview = true" class="hr" src="../static/icon/all.svg" v-if="preview && goods.length >= 4" mode=""></image>
                    </view>

                    <view class="pay-detail">
                        <view class="real-pay">
                            <view class="num">共4件商品</view>
                            <view class="label">实付</view>
                            <view class="value">￥6050.00</view>
                        </view>
                    </view>

                    <view class="buttons">
                        <view class="button cancel">取消订单</view>
                        <view class="button pay">付款</view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabList: [{ name: '全部' }, { name: '待付款' }, { name: '待发货' }, { name: '待收货' }, { name: '售后' }],
            TabCur: 0,
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

    computed: {},

    methods: {
        swiperChange(e) {
            let { current } = e.target;
            this.TabCur = current;
        },
        tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.TabCur = index;
        }
    },

    onReady() {}
};
</script>
<style lang="scss">
.order {
    .white-space {
        height: 80upx;
    }
    .navs {
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

    .swiper {
        min-height: 100000upx;
    }

    .wrap {
        margin: $white-space;
        padding: 20upx;
        border-radius: 8upx;
        box-shadow: 0 2upx 16upx 0 rgba(0, 0, 0, 0.3);
    }

    .order-header {
        display: flex;
        justify-content: space-between;
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
            width: 120upx;
            height: 120upx;
        }
        .more {
            width: 32upx;
            height: 32upx;
        }
    }

    .pay-detail {
        padding: 0 0 32upx 0;

        .real-pay {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 9upx 0;

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
}
</style>
