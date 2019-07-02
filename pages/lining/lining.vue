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

    <custmer-phone/>
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

    onUnload() {
    },
    onReady() {
      this.getProducts(this.collectData());
    },
    onReachBottom() {
      this.getProducts(this.collectData());
    },

    methods: {
      ...mapActions('Products', ['getProducts', 'getCategories']),
      authenticationTo,
      toTop,
      SMG,
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
          pno: encodeURIComponent(pno),
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
          uni.createSelectorQuery()
            .selectViewport()
            .scrollOffset(res => this.appear = res.scrollTop > 100)
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
      height: upx(120);
    }

    .menus {
      z-index: 99;
      position: fixed;
      display: flex;
      width: upx(750);
      justify-content: space-around;
      align-items: center;
      padding: upx(34) 0;
      border-bottom: upx(2) solid #eee;
      background: #fff;
      font-family: 苹方 常规, serif;

      .menu {
        width: (100% / 3);
        text-align: center;
        font-size: upx(28);
        color: $uni-text-color-grey;
        border-right: upx(2) solid #eee;

        &:last-child {
          border: none;
          position: relative;

          img {
            width: upx(25);
            height: upx(40);
            position: absolute;
            top: 0;
            right: upx(60);
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
        width: upx(380);
        height: upx(72);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 60 upx $white-space;
        padding: 0 upx(20);
        background: #f5f5f5;
        border-radius: upx(8);
      }

      .search-bar {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img.search {
          width: upx(32);
          height: upx(32);
          margin-right: upx(10);
        }

        .camera {
          width: upx(46);
          height: upx(46);
          margin-right: upx(20);
          box-shadow: 0 0 upx(8) 0 rgba(204, 204, 204, 0.5);
          padding: upx(13) upx(20);
        }
      }

      .label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $uni-text-color;
        padding: 0 0 upx(46);
        font-size: upx(28);

        text {
          font-size: upx(20);
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
        padding: 0 0 upx(28);
        border-bottom: upx(2) solid #eee;

        > .input {
          text-align: center;
        }

        .hr {
          width: upx(54);
          height: upx(2);
          background-color: #ccc;
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        max-height: upx(60);
        overflow: hidden;
        padding: 0 0 upx(28);
        border-bottom: upx(2) solid #eee;
        transition: max-height 0.3s ease-in-out;

        &.active {
          max-height: upx(1200);
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
          border: upx(2) solid #CCC;
          color: #ccc;

          &.active {
            color: $theme-color;
            border: upx(2) solid rgba(191, 160, 101, 1);
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
        width: upx(536);
        height: upx(100);
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: $white-space;
        background: #fff;

        .my-button {
          $height: 60 upx;
          width: upx(240);
          height: $height;
          line-height: $height;
          text-align: center;
          border: 1px solid $theme-color;
          border-radius: upx(8);
          font-size: upx(28);
          color: #fff;
          background: $theme-color;

          &.plain {
            background: #fff;
            color: $theme-color;
          }
        }
      }

      .white-space {
        height: upx(140);
      }

      .agreement {
        display: flex;
        align-items: center;
        font-size: upx(24);
        color: #666;

        .select {
          margin-right: upx(20);
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
        width: upx(30);
        height: upx(30);
        border-radius: 50%;
        border: 1px solid rgba(204, 204, 204, 1);

        &.active {
          border-color: $theme-color;

          .selected {
            width: upx(18);
            height: upx(18);
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
        padding: $white-space;
      }

      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: upx(280);
        height: upx(40);
        font-size: 14px;
        font-family: PingFang-SC-Medium, serif;
        margin-bottom: upx(20);
        border-radius: upx(8);
        color: #999;
        padding: upx(20);
        border: upx(1) solid #BFA065;

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
          width: upx(32);
          height: upx(32);
        }
      }
    }

    .list {
      padding: upx(20) $white-space;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        width: upx(320);
        padding: upx(10) 0;

        img {
          width: upx(330);
          height: upx(360);
        }

        .name {
          padding: upx(8) 0;
          font-family: Helvetica, serif;
          font-size: upx(28);
          color: $uni-text-color;
        }

        .price {
          display: flex;
          justify-content: space-between;
          align-items: baseline;

          .money {
            font-family: DIN Alternate Bold, serif;
            font-weight: bold;
            color: $theme-red;
            font-size: upx(40);

            .per {
              font-family: 苹方 常规, serif;
              font-weight: 300;
              color: $uni-text-color-grey;
              font-size: upx(20);
            }
          }

          .rest {
            font-family: 苹方 常规, serif;
            font-weight: 300;
            font-size: upx(20);
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
      width: upx(268);
      height: upx(60);
      position: fixed;
      top: upx(226);

      /* #ifdef MP-WEIXIN */
      top: upx(226);
      /* #endif */

      left: 0;
      right: 0;
      margin: auto;
      background: rgba(0, 0, 0, 0.1);
      text-align: center;
      border-radius: upx(8);

      img {
        width: upx(40);
        height: upx(40);
        margin: upx(10) 0;
      }
    }

    .pop-wrap {
      z-index: 999;
      position: absolute;
      top: 0;
      left: 0;
      width: upx(750);
      height: upx(200000);
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);

      .my-pop {
        position: fixed;
        bottom: 0;
        width: upx(750);
        height: upx(500);
        background: #fff;
        padding: upx(20) 0;

        .pop-top {
          display: flex;
          justify-content: space-between;
          padding: 0 0 upx(20) 0;
          background: #fff;
          border-bottom: upx(2) solid #eee;

          text {
            font-size: upx(28);
            font-weight: 300;
            padding: 0 upx(40);

            &.sure {
              color: $theme-color;
            }
          }
        }
      }

      .pick {
        height: upx(380);
        width: 100%;

        .select {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: upx(32);
          font-weight: 300;
        }
      }

      .line {
        position: absolute;
        top: 0;
        bottom: upx(30);
        margin: auto;
        width: upx(150);
        height: upx(1);
        background: #999;

        &.left {
          left: upx(30);
        }

        &.right {
          right: upx(30);
        }
      }
    }

    .pop {
      z-index: 999;
      position: fixed;
      height: upx(160);
      width: upx(750);
      bottom: 0;
      background: #fff;
      padding: upx(20) 0;
      border-radius: upx(8) upx(8) 0 0;
      overflow: hidden;

      div {
        display: flex;
        align-items: center;
        height: upx(80);
        padding: 0 upx(32);

        &:first-child {
          border-bottom: upx(1) solid #eeeeee;
        }

        img {
          margin-right: upx(26);
          width: upx(36);
          height: upx(36);
        }

        text {
          font-family: 苹方 中等, serif;
          color: $uni-text-color;
          font-size: upx(28);
        }
      }
    }

    .drawer-wrap {
      max-height: 100vh;
      overflow-y: scroll;
    }

    input {
      background: #f5f5f5;
      border-radius: upx(8);
      width: upx(220);
      font-size: upx(24);
    }

    .drawer-2 {
      width: upx(100);
    }
  }
</style>
