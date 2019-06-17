<template>
    <view class="lining" @touchmove="toTopShow">
        <!-- 切换 按钮 -->
        <view class="to-top" v-show="appear" @tap="toTop"><image src="../../static/icon/top.png" mode=""></image></view>

        <view class="menus">
            <view :class="['menu', { active: index === menuCurrentSelect }]" v-for="(menu, index) in menuData" :key="index" @touchend="changeMenu(index)">
                {{ menu }}
                <image v-if="index === 2" :src="index === menuCurrentSelect ? '../../static/icon/arrow-top.svg' : '../../static/icon/arrow-bottom.svg'" mode=""></image>
            </view>
        </view>

        <view class="white-space"></view>

        <!-- 抽屉 -->
        <uni-drawer :visible="drawerShow" mode="right" @close="onDrawerClose" class="drawer">
            <scroll-view scroll-y class="drawer-wrap">
                <view class="search-bar">
                    <view class="left">
                        <image class="search" src="../../static/icon/search.svg" mode=""></image>
                        <input type="text" value="" placeholder="搜索商品编码" confirm-type="search" placeholder-class="placehoder" />
                    </view>

                    <image
                        class="camera"
                        src="../../static/icon/camera.svg"
                        mode=""
                        @tap="
                            drawerShow = false;
                            sortShow = true;
                        "
                    ></image>
                </view>


                <!-- 克重-->
                <!-- 克重-->
                <!-- 克重-->
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

                <!-- 幅宽-->
                <!-- 幅宽-->
                <!-- 幅宽-->
                <view class="weigh">
                    <view class="label">
                      幅宽
                        <text>（厘米）</text>
                    </view>

                    <view class="value">
                        <input class="input" type="number" placeholder="最小值" placeholder-class="placehoder" placeholder-style="text-align:center" />
                        <view class="hr"></view>
                        <input class="input" type="number" placeholder="最大值" placeholder-class="placehoder" placeholder-style="text-align:center" />
                    </view>
                </view>

                <view class="color">
                    <view class="label" @touchend="showColorMore = !showColorMore">
                        分类
                        <image :class="{ active: showColorMore }" src="../../static/icon/arrow-bottom.svg" mode=""></image>
                    </view>
                    <view :class="['tags', { active: showColorMore }]">
                        <uni-tag
                            class="tag"
                            :text="color"
                            :type="colorCurrentSelect.includes(color) ? 'success' : 'primary'"
                            :inverted="true"
                            v-for="(color, index) in colorList"
                            :key="index"
                            @click="selectTag('colorCurrentSelect', color)"
                        />
                    </view>
                </view>

                <view class="price">
                    <view class="label">
                        价格
                        <text>（元/米）</text>
                    </view>

                    <view class="value">
                        <input class="input" type="number" placeholder="最低价" placeholder-class="placehoder" placeholder-style="text-align:center" />
                        <view class="hr"></view>
                        <input class="input" type="number" placeholder="最高价" placeholder-class="placehoder" placeholder-style="text-align:center" />
                    </view>
                </view>

              <view class="price agreement">
                <view :class="['select', { active: agreement }]" @tap="agreement = !agreement"><view class="selected"></view></view>
                <view>
                  <text class="star"></text>
                  仅显示有库存
                </view>
              </view>

                <view class="white-space"></view>
            </scroll-view>
            <view class="buttons">
                <view class="my-button plain">重置</view>

                <view class="my-button">确定</view>
            </view>
        </uni-drawer>

        <!-- 商品列表 -->
        <view class="list" v-if="menuCurrentSelect !== 2">
            <view class="item" v-for="(product,index) in productList" :key="index" @tap="toDetail(product.id)">
                <image :src="product.imageShow" mode="aspectFill" lazy-load></image>
                <view class="name">{{ product.pno }}</view>
                <view class="price">
                    <text class="money">
                        ￥{{ product.price }}
                        <text class="per">/ {{ product.unit }}</text>
                    </text>

                    <text class="rest">
                        仅剩
                        <text class="rest-red">{{ product.stock }}</text>
                        {{ product.unit }}
                    </text>
                </view>
            </view>
        </view>

        <!-- 排序 -->
        <view class="sort" v-if="menuCurrentSelect === 2">
            <view class="options">
                <view :class="['option', { active: currentSortState === index }]" v-for="(option, index) in sortList" :key="index" @tap="selectSortType(index)">
                    <text>{{ option }}</text>
                    <image v-show="currentSortState === index" src="../../static/icon/select.png" mode=""></image>
                </view>
            </view>
        </view>

        <!-- 选择 分类 弹窗 -->
        <view class="pop-wrap" v-show="sortShow" @touchmove.stop.prevent="moveHandle" @tap.self="sortShow = false">
            <view class="my-pop">
                <view class="pop-top">
                    <text @tap="sortShow = false">取消</text>
                    <text class="sure" @tap="sureSelect">选择</text>
                </view>

                <picker-view class="pick" indicator-style="height: 40px;" :value="defaultPicker" @change="bindChange">
                    <picker-view-column>
                        <view class="select" v-for="(sort, index) in sorts" :key="index">
                            <view class="value">{{ sort }}</view>
                        </view>
                    </picker-view-column>
                </picker-view>

                <!--              <view class="line left"></view>
                <view class="line right"></view> -->
            </view>
        </view>

        <!-- 相机拍照 我的相册 弹窗 -->
        <view class="pop-wrap" v-show="popShow" @touchmove.stop.prevent="moveHandle" @tap="popShow = false">
            <view class="pop" @tap.stop="chooseImg">
                <view @tap.stop="chooseImg('camera')">
                    <image src="../../static/icon/photo.png"></image>
                    <text>照相拍照</text>
                </view>
                <view @tap.stop="chooseImg('album')">
                    <image src="../../static/icon/pic.png"></image>
                    <text>我的相册</text>
                </view>
            </view>
        </view>

        <custmer-phone />
    </view>
</template>

<script>
import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
import { mapActions,mapState } from 'vuex'
import { uniDrawer, uniNavBar, uniTag, uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';

let observer = null;

export default {
    components: {
        uniDrawer,
        uniNavBar,
        uniTag,
        uniCollapse,
        uniCollapseItem,
        CustmerPhone
    },
  computed: {
    ...mapState('Products', ['productList', 'total', 'page']),
    ...mapState('User', ['userInfo'])
  },
  onReady() {
    this.getProducts({
      page: this.page,
      pageSize: 10,
      companyId: 4,

      status: this.userInfo.status
    });

    this.getCategories();
  },
  onReachBottom() {
    this.getProducts({
      page: this.page,
      pageSize: 10,
      companyId: 4,

      status: this.userInfo.status
    })
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
            // 显示更多颜色
            showColorMore: false,
            // 颜色标签列表
            colorList: [
                '红色',
                '黄色',
                '蓝色',
                '黑色',
                '白色',
                '湖蓝',
                '藏青',
                '杨红',
                '红色',
                '黄色',
                '蓝色',
                '黑色',
                '白色',
                '湖蓝',
                '藏青',
                '杨红',
                '红色',
                '黄色',
                '蓝色',
                '黑色',
                '白色',
                '湖蓝',
                '藏青',
                '杨红',
                '红色',
                '黄色',
                '蓝色',
                '黑色',
                '白色',
                '湖蓝',
                '藏青',
                '杨红'
            ],
            // 当前选中颜色
            colorCurrentSelect: [],
            // 显示更多颜色
            showTagsMore: false,
            // 颜色标签列表
            tagsList: ['标签一', '标签二', '标签三', '标签四', '标签一', '标签一', '标签一', '标签一'],
            // 当前选中标签
            tagCurrentSelect: [],
            // 返回顶部显示
            appear: false,
            // 分类弹窗
            sortShow: false,
            // 相机弹窗
            popShow: false,
            // 分类 - 弹出框
            sorts: ['分类-名称', '分类-名称', '分类-名称', '分类-名称', '分类-名称', '分类-名称'],
            // 当前分类值
            defaultPicker: [2],
            // 当前选择分类值
            currentPickerValue: 2,
            // 排序
            sortList: ['综合', '最新上架', '仅显示有库存', '按销量', '价格从高到底', '价格从低到高'],
            // 当前选择排序方式
            currentSortState: 0,
            agreement:false
        };
    },

  methods: {
      ...mapActions('Products', ['getProducts','getCategories']),

    /** 方法说明
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

      /**
       *  方法说明
         * @method 抽屉关闭
         */
        onDrawerClose() {
            // 重新 设置 抽屉状态
            this.drawerShow = false;
            //重置 按钮 状态
            this.menuCurrentSelect = 0;
        },

        selectTag(currentState, tag_name) {
            if (this[currentState].includes(tag_name)) {
                this[currentState].splice(this[currentState].findIndex(item => item === tag_name), 1);
                return;
            }
            this[currentState].push(tag_name);
        },

        // 返回顶部
        toTop() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 300
            });
        },

        // 监听 totop 显示
        toTopShow() {
            observer = setInterval(() => {
                let view = uni.createSelectorQuery().select('.lining');
                uni.createSelectorQuery()
                    .selectViewport()
                    .scrollOffset(res => {
                        if (res.scrollTop > 100) {
                            this.appear = true;
                        } else {
                            this.appear = false;
                        }
                    })
                    .exec();
            }, 300);
        },
        hidePopup() {},
        bindChange(e) {
            console.log(e);
            const val = e.detail.value[0];
            this.currentPickerValue = val;
        },
        moveHandle() {},
        sureSelect() {
            this.popShow = true;
            this.sortShow = false;
        },
        chooseImg(sourceType) {
            uni.chooseImage({
                success(res) {
                    console.log('选择图片完成', res);
                    // uni.navigateTo({
                    //     url: '/clipper/clipper?imgUrl=' + res.tempFiles[0].path + '&path=lining'
                    // });
                },
                count: 1,
                sourceType: [sourceType],
                sizeType: ['original']
            });
        },
        selectSortType(index) {
            this.currentSortState = index;
        },
        toDetail() {
            uni.navigateTo({
                url: '/shop-detail/shop-detail'
            });
        }
    },

};
</script>

<style lang="scss" scoped>
.lining {
    .white-space {
        height: 120upx;
    }
    .menus {
        z-index: 99;
        position: fixed;
        display: flex;
        width: 750upx;
        justify-content: space-around;
        align-items: center;
        padding: 34upx 0;
        border-bottom: 2upx solid #eee;
        background: #fff;
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
        .left {
            width: 380upx;
            height: 72upx;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 60upx $white-space;
            padding: 0 20upx;
            background: #f5f5f5;
            border-radius: 8upx;
        }
        .search-bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            image.search {
                width: 32upx;
                height: 32upx;
                margin-right: 10upx;
            }

            .camera {
                width: 46upx;
                height: 46upx;
                margin-right: 20upx;
                box-shadow: 0px 0px 8px 0px rgba(204, 204, 204, 0.5);
                padding: 13upx 20upx;
            }
        }

        .label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $uni-text-color;
            padding: 0 0 46upx;
            font-size: 28upx;

            text {
                font-size: 20upx;
                color: $uni-text-color-grey;
            }
            image {
                width: 16px;
                height: 16px;
                transition: transform 0.5s ease;
                &.active {
                    transform: rotate(180deg);
                }
            }
        }

        .value {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 0 28upx;
            border-bottom: 2upx solid #eee;
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
            flex-wrap: wrap;
            max-height: 60upx;
            overflow: hidden;
            padding: 0 0 28upx;
            border-bottom: 2upx solid #eee;
            transition: max-height 0.3s ease-in-out;
            &.active {
                max-height: 1200upx;
            }
            .tag {
                margin: 0 0 30upx;
                width: 24%;
                padding: 0;
                text-align: center;
                overflow: hidden;
                font-size: 24upx;
            }
        }

        .weigh {
            padding: $white-space;
        }

        .color {
            padding: $white-space;
        }

        .price {
            padding: $white-space;
        }

        .real-tags {
            padding: $white-space;
        }

        .buttons {
            z-index: 999;
            position: fixed;
            width: 536upx;
            height: 100upx;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            padding: $white-space;
            background: #fff;
            .my-button {
                $height: 60upx;
                width: 240upx;
                height: $height;
                line-height: $height;
                text-align: center;
                border: 1px solid $theme-color;
                border-radius: 8upx;
                font-size: 28upx;
                color: #fff;
                background: $theme-color;
                &.plain {
                    background: #fff;
                    color: $theme-color;
                }
            }
        }

        .white-space {
            height: 140upx;
        }
    }

    .sort {
        .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0 $white-space;
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

    .list {
        padding: 20upx $white-space;
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

                    .rest-red {
                        color: #c50000;
                    }
                }
            }
        }
    }

    .to-top {
        z-index: 999;
        width: 268upx;
        height: 60upx;
        position: fixed;
        top: 226upx;

        /* #ifdef MP-WEIXIN */
        top: 140upx;
        /* #endif */

        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.1);
        text-align: center;
        border-radius: 8upx;
        image {
            width: 40upx;
            height: 40upx;
            margin: 10upx 0;
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
            width: 750upx;
            height: 500upx;
            background: #fff;
            padding: 20upx 0;
            .pop-top {
                display: flex;
                justify-content: space-between;
                padding: 0 0 20upx 0;
                background: #fff;
                border-bottom: 2upx solid #eee;

                text {
                    font-size: 28upx;
                    font-weight: 300;
                    padding: 0 40upx;
                    &.sure {
                        color: $theme-color;
                    }
                }
            }
        }

        .pick {
            height: 380upx;
            width: 100%;

            .select {
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

    .pop {
        z-index: 999;
        position: fixed;
        height: 160upx;
        width: 750upx;
        bottom: 0;
        background: #fff;
        padding: 20upx 0;
        border-radius: 8upx 8upx 0 0;
        overflow: hidden;

        view {
            display: flex;
            align-items: center;
            height: 80upx;
            padding: 0 32upx;
            &:first-child {
                border-bottom: 1upx solid #eeeeee;
            }
            image {
                margin-right: 26upx;
                width: 36upx;
                height: 36upx;
            }
            text {
                font-family: 苹方 中等;
                color: $uni-text-color;
                font-size: 28upx;
            }
        }
    }

    .drawer-wrap {
        max-height: 100vh;
        overflow-y: scroll-y;
    }

    input {
        background: #f5f5f5;
        border-radius: 8upx;
        width: 220upx;
        font-size: 24upx;
    }

  .agreement {
    display: flex;
    align-items: center;
    font-size: 24upx;
    color: #666;
    .select {
      margin-right: 20upx;
    }
    .star {
      font-weight: bold;
      color: #c50000;
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
}
</style>
