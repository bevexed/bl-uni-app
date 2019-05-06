<template>
    <view class="my-collection">
        <view class="menu">
            <view class="state">
                <text>全部状态</text>
                <image src="../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="preview"><image src="../static/icon/sc.jpg" mode=""></image></view>
        </view>

        <!-- 平铺展示 -->
        <view class="tile">
            <view class="list">
                <view class="item" v-for="(good, i) in goodList" :key="i">
                    <image src="../static/imgs/fitting/3.jpg" mode=""></image>
                    <view :class="['badge', { unefficacy: good.badge === '失效' }]">{{ good.badge }}</view>
                </view>
            </view>
        </view>

        <view class="guess">猜您喜欢</view>

        <view class="shop-list">
            <view class="shop-item" v-for="i in 10" :key="i">
                <image src="../static/imgs/fitting/2.jpg" mode=""></image>
                <view class="shop-name">
                    <text>G2560817</text>
                    <view class="sold">98人已购买</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            goodList: [{ badge: '失效' }, { badge: '降价' }, { badge: '低库存' }, { badge: '低库存' }, { badge: '失效' }, { badge: '失效' }, { badge: '失效' }]
        };
    }
};
</script>

<style lang="scss">
.my-collection {
    padding: $white-space;
    .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        .state {
            display: flex;
            align-items: center;
            image {
                width: 24upx;
                height: 24upx;
                margin-left: 14upx;
            }
        }

        .preview {
            image {
                width: 32upx;
                height: 32upx;
            }
        }
    }

    .tile {
        margin-top: 64upx;
        .list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .item {
                position: relative;
                border-radius: 8upx;
                margin-bottom: 20upx;
                image {
                    width: 216upx;
                    height: 234upx;
                    border-radius: 8upx;
                }

                .badge {
                    position: absolute;
                    left: 0;
                    bottom: 6upx;
                    min-width: 40upx;
                    height: 40upx;
                    line-height: 40upx;
                    padding: 0 20upx;
                    font-size: 24upx;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    background: $theme-color;
                    text-align: center;
                    border-bottom-left-radius: 8upx;
                    border-top-right-radius: 8upx;

                    &.unefficacy {
                        background: #cccccc;
                    }
                }
            }
        }
    }

    .guess {
        padding: 74upx 0 24upx;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
    }

    .shop-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 750upx - 2 * $white-space;
        .shop-item {
            font-size: 28upx;
            color: #333;
            width: 330upx;
            margin-bottom: 18upx;
            image {
                width: 330upx;
                height: 360upx;
            }
            .shop-name {
                display: flex;
                padding: 10upx 0;
                justify-content: space-between;
                align-items: center;
                .sold {
                    color: #999;
                    font-size: 20upx;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>
