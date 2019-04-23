<template>
    <view class="lining">
        <!-- 切换 按钮 -->
        <view class="menus">
            <view :class="['menu', { active: index === menuCurrentSelect }]" v-for="(menu, index) in menuData" :key="index" @click="changeMenu(index)">
                {{ menu }}
                <image v-if="index === 2" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>
        </view>

        <!-- 抽屉 -->
        <uni-drawer :visible="drawerShow" mode="right" @close="onDrawerClose" class="drawer">
            <view class="search-bar">
                <image class="search" src="../../static/icon/search.svg" mode=""></image>
                <input type="text" value="" placeholder="搜索商品编码" confirm-type="search" placeholder-class="placehoder" />
                <image class="camera" src="../../static/icon/camera.svg" mode=""></image>
            </view>

            <view class="weigh">
                <view class="label">
                    克重
                    <text>（克/立方米）</text>
                </view>

                <view class="value">
                    <input class="input" type="number" placeholder="最小值" placeholder-class="placehoder" placeholder-style="text-align:center" />
                    <view class="hr"></view>
                    <input class="input" type="number" placeholder="最大值" placeholder-class="placehoder" placeholder-style="text-align:center" />
                </view>
            </view>

            <view class="color">
                <view class="label">颜色</view>
                <view class="tags"><uni-tag text="标签" type="primary" :inverted="true" v-for="i in 4"></uni-tag></view>
            </view>
        </uni-drawer>

        <!-- 商品列表 -->
        <view class="list">
            <view class="item" v-for="i in 30">
                <image src="../../static/imgs/home/right.png" mode="aspectFill" lazy-load></image>
                <view class="name">G2560817</view>
                <view class="price">
                    <text class="money">
                        ￥69
                        <text class="per">/米</text>
                    </text>

                    <text class="rest">
                        仅剩
                        <text class="rest-red">600</text>
                        米
                    </text>
                </view>
            </view>
        </view>

        <custmer-phone />
    </view>
</template>

<script>
import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
import { uniDrawer, uniNavBar, uniTag } from '@dcloudio/uni-ui';

export default {
    components: {
        uniDrawer,
        uniNavBar,
        uniTag,
        CustmerPhone
    },
    data() {
        return {
            menuData: ['全部', '筛选', '排序'],
            // 当前选中 按钮
            menuCurrentSelect: 0,
            // 抽屉 显示控制
            drawerShow: true,
            // 商品列表
            shopList: [{}],
            // 标签列表
        };
    },
    methods: {
        /* 方法说明
         * @method 改变按钮样式
         * @for
         * @param{number} index 当前按钮 索引
         * @return {null}
         */
        changeMenu(index) {
            // 改变 当前 按钮 样式
            this.menuCurrentSelect = index;

            // 如果点了 筛选 则 弹出抽屉
            if (index === 1) {
                this.drawerShow = true;
            }
        },

        /* 方法说明
         * @method 抽屉关闭
         * @for
         * @param{null}
         * @return {null}
         */
        onDrawerClose() {
            // 重新 设置 抽屉状态
            this.drawerShow = false;
            //重置 按钮 状态
            this.menuCurrentSelect = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
.lining {
    .menus {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 34upx 0;
        border-bottom: 2upx solid #eee;
        font-family: 苹方 常规;

        .menu {
            width: (100% / 3);
            text-align: center;
            font-size: 28upx;
            color: $uni-text-color-grey;
            border-right: 2upx solid #eee;
            &:last-child {
                border: none;
                position: relative;
                image {
                    width: 25upx;
                    height: 40upx;
                    position: absolute;
                    top: 0;
                    right: 60upx;
                }
            }

            &.active {
                color: $theme-color;
                font-weight: bold;
            }
        }
    }
    .drawer {
        .search-bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 60upx $white-space;
            image.search {
                width: 32upx;
                height: 32upx;
                margin-right: 10upx;
            }

            .camera {
                width: 46upx;
                height: 46upx;
                margin-right: 20upx;
            }
        }

        .label {
            color: $uni-text-color;
            padding: 0 0 46upx;
            font-size: 28upx;
            text {
                font-size: 20upx;
                color: $uni-text-color-grey;
            }
        }

        .value {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 0 28upx;
            border-bottom: 4upx solid #eee;
            > .input {
               text-align: center;
            }
            .hr {
                width: 54upx;
                height: 2upx;

                background-color: #ccc;
            }
        }

        .tags {
            display: flex;
            justify-content: space-between;
        }

        .weigh {
            padding: $white-space;
        }

        .color {
            padding: $white-space;
        }
    }

    .list {
        padding: 60upx $white-space;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
            width: 320upx;
            padding: 10upx 0;
            image {
                width: 330upx;
                height: 360upx;
            }
            .name {
                padding: 8upx 0;
                font-family: Helvetica;
                font-size: 28upx;
                color: $uni-text-color;
            }

            .price {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                .money {
                    font-family: DIN Alternate Bold;
                    font-weight: bold;
                    color: $theme-red;
                    font-size: 40upx;
                    .per {
                        font-family: 苹方 常规;
                        font-weight: 300;
                        color: $uni-text-color-grey;
                        font-size: 20upx;
                    }
                }

                .rest {
                    font-family: 苹方 常规;
                    font-weight: 300;
                    font-size: 20upx;
                    color: $uni-text-color-grey;
                }
            }
        }
    }
}
</style>
