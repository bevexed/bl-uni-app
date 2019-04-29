<template>
    <view class="shop-car">
        <!-- // 购物车 为空 -->
        <view class="null">
            <view class="title">购物车(0)</view>
            <view class="tips">您的购物车内无商品</view>
            <view class="button">前往选购</view>
        </view>

        <!-- 购物车不为空 -->
        <view class="has-goods">
            <view class="menus title">
                <view class="menu">清空下架</view>
                <view class="menu">购物车(2)</view>
                <view class="menu">
                    <image src="../../static/icon/edit.svg" mode=""></image>
                    <text>修改</text>
                </view>
            </view>

            <view class="goods">
                <view class="good" v-for="(v,i) in [1,2,3,4,5]" :key="i">
                    <view :class="['select', { active: currentSelect.includes(i) }]" @tap="selectGood(i)"><view class="selected"></view></view>

                    <image class="shop-img" src="../../static/imgs/fitting/5.jpg" mode=""></image>

                    <view class="detail">
                        <view class="detail-header">
                            <view class="shop-name">ML2395730185473123</view>
                            <image src="../../static/icon/del.svg" mode=""></image>
                        </view>
                        <view class="detail-footer">
                            <view class="options">
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
            </view>
        </view>

        <custmer-phone />
    </view>
</template>

<script>
import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';

export default {
    components: {
        CustmerPhone
    },
    data() {
        return {
            // 当前选中商品
            currentSelect: []
        };
    },
    methods: {
        selectGood(i) {
            if (this.currentSelect.includes(i)) {
                this.currentSelect.splice(this.currentSelect.findIndex(item => item === i), 1);
                return
            }
            this.currentSelect.push(i)
            
        }
    }
};
</script>

<style lang="scss" scoped>
.shop-car {
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        padding: 24upx 30upx;
        border-bottom: 2upx solid #eeeeee;
    }

    .null {
        text-align: center;
        .tips {
            font-size: 28upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-top: 364upx;
        }
        .button {
            width: 352upx;
            height: 80upx;
            border-radius: 8upx;
            border: 1px solid $theme-color;
            color: $theme-color;
            font-size: 28upx;
            line-height: 80upx;
            margin: 62upx auto;
        }
    }

    .has-goods {
        .menus {
            display: flex;
            justify-content: space-between;
            .menu {
                display: flex;
                align-items: center;
                image {
                    width: 26upx;
                    height: 26upx;
                    margin-right: 8upx;
                }
            }
        }

        .goods {
            padding: 0 $white-space;
            .good {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: $white-space 0;
                border-bottom: 2upx solid #eeeeee;
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
                .shop-img {
                    width: 128upx;
                    height: 160upx;
                    border-radius: 8upx;
                }
                .detail {
                    display: flex;
                    flex-wrap: wrap;
                    width: 455upx;
                    height: 160upx;
                    margin-left: 25upx;
                    .detail-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        height: 40upx;
                        .shop-name {
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
                            width: 290upx;

                            .option {
                                display: flex;
                                align-items: center;
                                margin-bottom: 5upx;
                                .label {
                                    width: 70%;
                                }
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
        }
    }
}
</style>
