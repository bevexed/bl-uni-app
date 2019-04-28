<template>
    <view class="detail">
        <!-- 顶部图片 -->
        <view class="shop-pic">
            <uni-swiper-dot :info="banners" :current="current" mode="long" :dotsStyles="dotsStyles">
                <swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" loop class="banner" @change="swiperChange">
                    <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex">
                        <view class="swiper-item"><image lazy-load mode="aspectFill" class="banner-img" :src="banner" alt=""></image></view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>

            <!-- 轮播图上的浮动按钮 -->
            <view class="buttons">
                <view>
                    <image src="../../static/icon/collect.png" mode=""></image>
                    <text>收藏</text>
                </view>

                <view>
                    <image src="../../static/icon/share.png" mode=""></image>
                    <text>分享</text>
                </view>
            </view>

            <view class="add"><image src="../../static/icon/add.png" mode=""></image></view>
        </view>

        <view class="shop-name">BL245685837265854</view>

        <view class="shop-sales">
            <text>月销 3000 米</text>

            <view class="price">
                ￥300
                <text>/米</text>
            </view>
        </view>

        <view class="shop-select">
            <text>商品选择</text>
            <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
        </view>

        <view class="shop-detail">
            商品详情
            <view class="list">
                <view class="item">面料成分：100%Cotton</view>
                <view class="item">面料门幅：159CM</view>
                <view class="item">面料克重：5000g/m</view>
                <view class="item">干磨/湿磨：Lv.5/Lv.5</view>
                <view class="item">顶破强度：500N</view>
                <view class="item">质量等级：国家一等品</view>
                <view class="item">疵点率：2/100M</view>
                <view class="item">备注提示：</view>
            </view>
        </view>
    </view>
</template>

<script>
import { uniSwiperDot } from '@dcloudio/uni-ui';
export default {
    components: {
        uniSwiperDot
    },
    data() {
        return {
            title: 'SINOTY',
            // 当前 swiper 索引
            current: 0,
            // 轮播图 指示器样式
            dotsStyles: {
                border: 'none',
                backgroundColor: 'rgba(0,0,0,.3)',
                selectedBorder: 'none',
                selectedBackgroundColor: 'rgba(0,0,0,.3)'
            },
            // banner数据
            banners: ['../../static/imgs/home/banner.png', '../../static/imgs/home/banner.png', '../../static/imgs/home/banner.png']
        };
    },
    methods: {
        swiperChange(e) {
            this.current = e.detail.current;
        }
    }
};
</script>

<style scoped lang="scss">
.detail {
    .shop-pic {
        position: relative;
        .banner,
        image {
            width: 750upx;
            height: 560upx;
        }
        .buttons {
            position: absolute;
            top: 10upx;
            width: 750upx;
            height: 60upx;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: white;
            font-size: 14px;
            font-family: PingFang-SC-Bold;

            view {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                image {
                    width: 32upx;
                    height: 32upx;
                    margin-right: 20upx;
                }
            }
        }
        .add {
            position: absolute;
            right: 30upx;
            bottom: 30upx;
            width: 60upx;
            height: 60upx;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            image {
                width: 40upx;
                height: 40upx;
            }
        }
    }

    .shop-name {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #333;
        padding: $white-space $white-space 0;
    }

    .shop-sales {
        display: flex;
        justify-content: space-between;
        height: 28upx;
        font-size: 20upx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #999;
        padding: 0 $white-space;
        letter-spacing: 0.01em;
        .price {
            font-family: DINAlternate-Bold;
            font-size: 48upx;
            color: #c50000;

            text {
                font-family: PingFang-SC;
                font-weight: 300;
                font-size: 20upx;
                color: #999;
            }
        }
    }

    .shop-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 60upx $white-space;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        image {
            height: 14upx;
            width: 26upx;
            transform: rotate(-90deg);
        }
    }

    .shop-detail {
        padding: 10upx $white-space;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;

        .list {
            padding: 20upx 0;
            .item {
                font-size: 24upx;
                font-family: PingFang-SC-Medium;
                line-height: 50upx;
                color: #666;
                &:before {
                    content: '· ';
                }
            }
        }
    }
}
</style>
