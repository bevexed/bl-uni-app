<template>
  <div class="lining" @touchmove="toTopShow">
    <!-- 切换 按钮 -->
    <div class="to-top" v-show="appear" @tap="toTop">
      <img src="../../static/icon/top.png" mode="" alt="">
    </div>

    <div class="menus">
      <div :class="['menu', { active: index === menuCurrentSelect }]"
           v-for="(menu, index) in menuData" :key="index"
           @touchend="changeMenu(index)">
        {{ menu }}
      </div>
    </div>

    <div class="white-space"></div>

    <!-- 抽屉 -->
    <uni-drawer :visible="drawerShow" mode="right" @close="onDrawerClose" class="drawer">
      <scroll-view scroll-y class="drawer-wrap">
        <div class="search-bar">
          <div class="left">
            <img class="search" src="../../static/icon/search.svg" mode="" alt="">
            <input v-model="pno" type="text" value="" placeholder="搜索商品编码" confirm-type="search"
                   placeholder-class="placeholder"/>
          </div>

          <img
            class="camera"
            src="../../static/icon/camera.svg"
            mode=""
            @tap="SMG('图像识别功能待开发，敬请期待！')"
            alt=""/>
        </div>

        <!-- 克重-->
        <div class="weigh">
          <div class="label">
            克重
            <text>（克/立方米）</text>
          </div>

          <div class="value">
            <input class="input" v-model="weightMin" type="number" placeholder="最小值"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
            <div class="hr"></div>
            <input class="input" v-model="weightMax" type="number" placeholder="最大值"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
          </div>
        </div>

        <!-- 幅宽-->
        <div class="weigh">
          <div class="label">
            幅宽
            <text>（厘米）</text>
          </div>

          <div class="value">
            <input class="input" v-model="widthMin" type="number" placeholder="最小值"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
            <div class="hr"></div>
            <input class="input" v-model="widthMax" type="number" placeholder="最大值"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
          </div>
        </div>

        <div class="color">
          <div class="label" @touchend="showColorMore = !showColorMore">
            分类
            <img :class="{ active: showColorMore }" src="../../static/icon/arrow-bottom.svg" mode="" alt=""/>
          </div>
          <ul :class="['tags', { active: showColorMore }]">
            <li
              :class="['tag',{ 'active' : categoryId === category.id}]"
              v-for="(category, index) in categories"
              :key="index"
              @click="selectTag(category.id)"
            >{{ category.name }}
            </li>
          </ul>
        </div>

        <div class="price">
          <div class="label">
            价格
            <text>（元/米）</text>
          </div>

          <div class="value">
            <input class="input" v-model="priceMin" type="number" placeholder="最低价"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
            <div class="hr"></div>
            <input class="input" v-model="priceMax" type="number" placeholder="最高价"
                   placeholder-class="placeholder" placeholder-style="text-align:center"/>
          </div>
        </div>

        <div class="price agreement">
          <div :class="['select', { active: agreement }]" @tap="agreement = !agreement">
            <div class="selected"></div>
          </div>
          <div>
            <text class="star"></text>
            仅显示有库存
          </div>
        </div>

        <div class="white-space"></div>
      </scroll-view>
      <div class="buttons">
        <div class="my-button plain" @tap="reset()">重置</div>

        <div class="my-button" @tap="doSearch">确定</div>
      </div>
    </uni-drawer>

    <!-- 抽屉2 -->
    <uni-drawer :visible="menuCurrentSelect === 2 && sortPageShow" mode="right" @close="onDrawerClose"
                class="drawer drawer-2">
      <scroll-view scroll-y class="drawer-wrap">
        <!-- 排序 -->
        <div class="sort">
          <div class="options">
            <div :class="['option', { active: currentSortState === index }]" v-for="(option, index) in sortList"
                 :key="index" @tap="selectSortType(index)">
              <text>{{ option.text }}</text>
              <img v-show="currentSortState === index" src="../../static/icon/select.png" mode="" alt=""/>
            </div>
          </div>
        </div>
        </scroll-view>
    </uni-drawer>

    <!-- 商品列表 -->
    <div class="list">
      <div class="item"
           v-for="(product,index) in productList" :key="index"
           @tap="authenticationTo({
              status: userInfo.status,
              url: '/pages/shop-detail/shop-detail?id=' + product.id
           })">
        <img :src="product.imageShow" mode="aspectFill" lazy-load alt=""/>
        <div class="name">{{ product.pno }}</div>
        <div class="price">
          <text class="money">
            ￥{{ product.price }}
            <text class="per">/ {{ product.unit }}</text>
          </text>

          <text class="rest">
            仅剩
            <text class="rest-red">{{ product.stock }}</text>
            {{ product.unit }}
          </text>
        </div>
      </div>
    </div>

      <custmer-phone />
  </div>
</template>

<script>
  import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
  import { mapActions, mapState } from 'vuex'
  import { uniDrawer, uniNavBar, uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';
  import { authenticationTo, toTop, SMG } from "../../utils";

  let observer = null;

  export default {
    components: {
      uniDrawer,
      uniNavBar,
      uniCollapse,
      uniCollapseItem,
      CustmerPhone
    },
    computed: {
      ...mapState('Products', ['productList', 'total', 'page', 'categories']),
      ...mapState('User', ['userInfo'])
    },
    onUnload() {
    },
    onReady() {
      this.getProducts(this.collectData());
    },
    onReachBottom() {
      this.getProducts(this.collectData());
    },
    data() {
      return {
        menuData: ['全部', '筛选', '排序'],
        // 当前选中 按钮
        menuCurrentSelect: 0,
        // 抽屉 显示控制
        drawerShow: false,
        // 显示更多颜色
        showColorMore: false,
        // 当前选分类
        categoryId: '',
        // 显示更多颜色
        showTagsMore: false,
        // 返回顶部显示
        appear: false,
        // 排序
        sortList: [
          { text: '综合', value: 'composite_desc' },
          { text: '最新上架', value: 'shelves_desc' },
          { text: '按销量', value: 'sale_desc' },
          { text: '价格从高到底', value: 'price_desc' },
          { text: '价格从低到高', value: 'price_asc' }],
        // 当前选择排序方式
        currentSortState: 0,

        sortPageShow: false,

        agreement: false,

        pno: '',
        weightMin: '',
        weightMax: '',
        widthMin: '',
        widthMax: '',
        priceMin: '',
        priceMax: ''
      };
    },

    methods: {
      ...mapActions('Products', ['getProducts', 'getCategories']),
      authenticationTo, toTop, SMG,
      async changeMenu(index) {
        if (this.userInfo.status !== 2) return authenticationTo({ status: this.userInfo.status });

        // 改变 当前 按钮 样式
        this.menuCurrentSelect = index;
        if (index === 0) {
          await this.reset();
          await this.doSearch();
          this.toTop()
        }

        // 如果点了 筛选 则 弹出抽屉
        if (index === 1) {

          this.drawerShow = true;
          this.getCategories();
        }

        if (index === 2) {
          this.sortPageShow = true;
        }
      },

      /**
       * @function 重置页面状态
       */
      reset() {
        this.categoryId = '';
        this.agreement = false;
        this.pno = '';
        this.weightMin = '';
        this.weightMax = '';
        this.widthMin = '';
        this.widthMax = '';
        this.priceMin = '';
        this.priceMax = '';
        this.currentSortState = 0;
      },

      /**
       * @function 收集数据
       */

      collectData() {
        let { page, categoryId, agreement, pno, weightMin, weightMax, widthMin, widthMax, priceMin, priceMax, currentSortState } = this;
        return {
          page,
          pageSize: 10,
          pno,
          categoryId,
          hasStock: agreement,
          status: this.userInfo.status || '',
          weight: weightMin + ',' + weightMax,
          width: widthMin + ',' + widthMax,
          price: priceMin + ',' + priceMax,
          sort: this.sortList[currentSortState].value,
        }
      },

      /**
       * @function 筛选
       * @returns {Promise<boolean|*>}
       */
      async doSearch() {
        let res = await this.getProducts({
          ...this.collectData(),
          page: 1,
          reset: true
        });

        if (res) {
          this.drawerShow = false;
          toTop()
        }

        return res

      },

      selectTag(index) {
        if (this.categoryId === index) {
          return this.categoryId = ''
        }
        this.categoryId = index

      },

      onDrawerClose() {
        // 重新 设置 抽屉状态
        this.drawerShow = false;
        //重置 按钮 状态
        this.menuCurrentSelect = 0;
      },


      // 监听 toTop 显示
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


      async selectSortType(index) {
        this.currentSortState = index;
        let res = await this.doSearch();
        if (res) {
          this.toTop();
          this.sortPageShow = false
        }
      },

    },

  };
</script>

<style lang="scss" scoped>
  @import "../../uni";
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
                img {
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
            img.search {
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
            img {
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
              margin: 0 upx(4) upx(30) 0;
              border-radius: upx(8);
              height: upx(60);
              line-height: upx(60);
              width: 23%;
              padding: 0;
              text-align: center;
              overflow: hidden;
              font-size: upx(24);
              border:upx(2) solid #CCC;
              color: #ccc;
              &.active{
                color: $theme-color;
                border:upx(2) solid rgba(191,160,101,1);
              }
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

    .sort {
        .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding:  $white-space;
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
            border-radius: 8upx;
            color: #999;
            padding: 20upx;
          border: 1upx solid #BFA065;

            &.active {
                color: $theme-color;
                background: rgba(191, 160, 101, 0.2);
                font-weight: 500;
              border: none;
            }

            text {
                width: 70%;
            }

            img {
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
            img {
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
        img {
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

      div {
            display: flex;
            align-items: center;
            height: 80upx;
            padding: 0 32upx;
            &:first-child {
                border-bottom: 1upx solid #eeeeee;
            }
            img {
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

  .drawer-2{
    width: 100upx;
  }
}
</style>
