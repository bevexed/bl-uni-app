<template>
    <view class="my-collection">
        <view class="menu">
            <view class="state" @tap="sortState = !sortState">
                <text>全部状态</text>
                <image :class="['arrow', { active: sortState }]" src="../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="preview" @tap="preview = !preview">
                <image src="../static/icon/sc.jpg" mode="" v-if="preview"></image>
                <image src="../static/icon/det.jpg" mode="" v-else></image>
            </view>
        </view>

        <!-- 排序 -->
        <view class="sort" v-if="sortState">
            <view class="options">
                <view :class="['option', { active: currentSortState === index }]" v-for="(option, index) in sortList" :key="index" @tap="selectSortType(index)">
                    <text>{{ option }}</text>
                    <image v-show="currentSortState === index" src="../static/icon/select.png" mode=""></image>
                </view>
            </view>
        </view>

        <!-- 平铺展示 -->
        <view class="tile" v-if="preview && !sortState">
            <view class="list">
                <view class="item" v-for="(good, i) in goodList" :key="i">
                    <image src="../static/imgs/fitting/3.jpg" mode=""></image>
                    <view :class="['badge', { unefficacy: good.badge === '失效' }]">{{ good.badge }}</view>
                </view>
            </view>
        </view>

        <!-- 详情展示 -->
        <view class="detail" v-if="!preview && !sortState">
            <view class="list">
                <view class="item" v-for="(good, i) in goodList" :key="i">
                    <image src="../static/imgs/fitting/3.jpg" mode=""></image>
                    <view class="shop-detail">
                        <view class="shop-name">HJGF123123457876541</view>

                        <view class="collect">210人收藏</view>

                        <view class="bottom">
                            <view class="price">
                                ￥300
                                <text class="per">/米</text>
                            </view>
                            <image src="../static/icon/del.svg" mode=""></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="guess" v-if="!sortState">猜您喜欢</view>

        <view class="shop-list" v-if="!sortState">
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
            // 预览模式
            preview: false,
            // 收藏商品列表
            goodList: [{ badge: '失效' }, { badge: '降价' }, { badge: '低库存' }, { badge: '低库存' }, { badge: '失效' }, { badge: '失效' }, { badge: '失效' }],
            // 排序是否显示
            sortState: false,
            // 排序
            sortList: ['全部状态', '降价中', '低库存', '失效'],
            // 当前选择排序方式
            currentSortState: 0
        };
    },
    methods: {
        selectSortType(index) {
            this.currentSortState = index;
        }
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
            .arrow {
                width: 24upx;
                height: 24upx;
                margin-left: 14upx;
                transition: all 0.6s ease;
                &.active {
                    transform: rotate(180deg);
                }
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

    .detail {
        margin-top: 64upx;
        .list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .item {
                display: flex;
                width: 750upx - 2 * $white-space;
                justify-content: space-between;
                position: relative;
                border-radius: 8upx;
                margin-bottom: 30upx;
                image {
                    width: 280upx;
                    height: 306upx;
                    border-radius: 8upx;
                }

                .shop-detail {
                    display: flex;
                    flex-direction: column;
                    width: 380upx;
                    height: 306upx;
                    .shop-name {
                        font-size: 32upx;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }
                    .collect {
                        flex-grow: 1;
                        font-size: 24upx;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        margin-top: 14upx;
                        color: rgba(153, 153, 153, 1);
                    }

                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                    }

                    .price {
                        width: 380upx;
                        font-size: 48upx;
                        font-family: DINAlternate-Bold;
                        font-weight: bold;
                        color: rgba(197, 0, 0, 1);
                    }

                    .per {
                        font-size: 20upx;
                        color: #999999;
                        margin-left: 4upx;
                    }

                    image {
                        width: 30upx;
                        height: 32upx;
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

    .sort {
        margin-top: 60upx;
        .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 280upx;
            height: 40upx;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            margin-bottom: 20upx;
            background: #eee;
            border-radius: 8upx;
            color: #999;
            padding: 20upx;

            &.active {
                color: $theme-color;
                background: rgba(191, 160, 101, 0.2);
                font-weight: 500;
            }

            text {
                width: 70%;
            }

            image {
                width: 32upx;
                height: 32upx;
            }
        }
    }
}
</style>
