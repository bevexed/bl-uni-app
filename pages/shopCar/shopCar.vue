<template>
    <view class="shop-car">
        <!-- 购物车不为空 -->
        <view class="has-goods" v-if="goods.length">
            <view class="menus title">
              <view class="menu" v-if="edit" @tap="cancel">取消</view>
                <view class="menu" v-else @tap="doDeleteInvalid">清空下架</view>

                <view class="menu">购物车({{ goods.length }})</view>

                <view class="menu" v-if="edit" @tap="edit = !edit">
                    <image src="../../static/icon/save.svg" mode=""></image>
                  <text>保存</text>
                </view>
                <view class="menu" v-else @tap="edit = !edit">
                    <image src="../../static/icon/edit.svg" mode=""></image>
                    <text>修改</text>
                </view>
            </view>

          <view class="white-space"></view>

            <!-- 商品 -->
            <view class="goods">
              <!--未失效-->
              <view :class="{ 'good-wrap': good.willChange && edit }" v-for="(good, i) in goods" :key="i">
                <view class="good">
                  <view :class="['select', { active: edit ? good.willDel : good.willBuy }]" @tap="selectGood(i)">
                    <view class="selected"></view>
                  </view>
                  <image class="shop-img" :src="good.imageShow" mode="" @tap="toDetail(good.productId)"></image>

                  <view class="detail">
                    <view class="detail-header">
                      <view class="shop-name">{{ good.pno }}</view>
                      <!--  删除  -->
                      <image
                        v-if="!edit" src="../../static/icon/del.svg"
                        mode=""
                        @tap="doDeleteCart({
                              ids:[good.productId]
                              })"></image>
                    </view>
                    <view class="detail-footer">
                      <!--价格-->
                      <view v-if="!edit" :class="['options']">
                        <view class="option" v-if="good.sampleType">
                          <view class="label">标样：￥{{ good.samplePrice }}</view>
                          <view class="value">*{{ good.sampleType }}</view>
                        </view>
                        <view class="option">
                          <view class="label">商品：￥{{ good.price }}/米</view>
                          <view class="value">* {{ good.shoppingNum }}</view>
                        </view>
                      </view>
                      <!--数量-->
                      <view v-else class="options del-active" @tap="selectWillChang(i)">
                        <view class="option" v-if="good.sampleType">
                          <view class="label">标样：*{{ good.sampleType }}</view>
                        </view>
                        <view class="option">
                          <view class="label">数量：*{{ good.shoppingNum }}</view>
                        </view>

                        <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
                      </view>
                      <!--总价-->
                      <view class="price">￥{{ good.price * good.shoppingNum + good.sampleType * good.samplePrice }}</view>
                    </view>
                  </view>
                </view>

                <!-- 编辑状态 -->
                <view class="select-much" v-if="good.willChange && edit">
                  <view class="title">数量选择</view>
                  <uni-number-box
                    :min="0"
                    :max="good.stock"
                    :step="1"
                    :value="good.shoppingNum"
                    @change="numChange($event,i)"></uni-number-box>
                  <view class="rest unit">米</view>
                </view>

                <view class="select-small" v-if="good.willChange && edit">
                  <view class="title">小样选择</view>
                  <view :class="['tags']">
                    <!--todo: step 接口-->
                    <uni-tag
                      class="tag"
                      :text="tag"
                      :type="good.sampleType? 'success' : 'primary'"
                      :inverted="true"
                      v-for="(tag, index) in good.tagsList"
                      :key="index"
                      @tap="changSampleType(i)"
                    />
                  </view>
                </view>
              </view>

              <!--已失效商品-->
              <view :class="{ 'good-wrap': good.willChange && edit }" v-for="(good, i) in u_goods" :key="i">
                <view class="good">
<!--                  <view :class="['select', { active: edit ? good.willDel : good.willBuy }]" @tap="selectGood(i)">-->
<!--                    <view class="selected"></view>-->
<!--                  </view>-->
                  <image class="shop-img dead" :src="good.imageShow" mode="" @tap="toDetail(good.productId)"></image>

                  <view class="detail">
                    <view class="detail-header">
                      <view class="shop-name">{{ good.pno }}</view>
                      <!--  删除  -->
                      <image
                        v-if="!edit" src="../../static/icon/del.svg"
                        mode=""
                        @tap="doDeleteCart({
                              ids:[good.productId]
                              })"></image>
                    </view>
                    <view class="detail-footer">
                      <view v-if="!edit" :class="['options']">
                        <view class="option" v-if="good.sampleType">
                          <view class="label">标样：￥{{ good.samplePrice }}</view>
                          <view class="value">*{{ good.sampleType }}</view>
                        </view>
                        <view class="option">
                          <view class="label">商品：￥{{ good.price }}/米</view>
                          <view class="value">* {{ good.shoppingNum }}</view>
                        </view>
                      </view>

                      <view v-else class="options del-active" @tap="selectWillChang(i)">
                        <view class="option" v-if="good.sampleType">
                          <view class="label">标样：*{{ good.sampleType }}</view>
                        </view>
                        <view class="option">
                          <view class="label">数量：*{{ good.shoppingNum }}</view>
                        </view>

                        <image src="../../static/icon/arrow-bottom.svg" mode=""></image>
                      </view>

                      <view class="price">￥{{ good.totalAmount }}</view>
                    </view>
                  </view>
                </view>

              </view>
            </view>
        </view>

        <!-- 购物车 为空 -->
        <view class="null" v-else>
            <view class="title">购物车(0)</view>
            <view class="tips">您的购物车内无商品</view>
          <view class="button" @tap="toLining">前往选购</view>
        </view>

      <!-- 底部按钮 -->
      <view class="shop-car-footer" v-if="goods.length">
        <view class="select-all" @tap="selectAllgoods">
          <view :class="['select', { active: currentSelect.length === goods.length }]">
            <view class="selected"></view>
          </view>
          <text>全选</text>
        </view>
        <view class="total">
          <text>总计：</text>
          ￥{{ total }}
        </view>
        <view
          v-if="edit"
          :class="['button', { 'del-active': currentSelect.length }]"
          @tap="doDeleteCart(currentSelect)"
        >删除({{ currentSelect.length }})
        </view>
        <view
          v-else
          @tap="toCreateOrder"
          :class="['button', { active: currentSelect.length  }]">
          付款({{ currentSelect.length }})
        </view>
      </view>

        <view class="white-space"></view>

        <custmer-phone />
    </view>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
  import { uniSwiperDot, uniTag } from '@dcloudio/uni-ui';
  import uniNumberBox from '../../components/uni-number-box/uni-number-box.vue';

  export default {
    components: {
      CustmerPhone,
      uniNumberBox,
      uniTag
    },
    data() {
      return {
        // 是否处于修改状态
        edit: false,
        // 当前要删除的商品
        willDelGoods: ''
      };
    },
    computed: {
      ...mapGetters('Cart', ['total']),
      //未失效 goods
      ...mapState('Cart', ['goods','u_goods']),
      currentSelect() {
        const { edit, goods } = this;
        let state = edit ? 'willDel' : 'willBuy';
        let length = goods.filter(good => good[state] === true).length;
        let data = goods.filter(good => good[state] === true);
        let ids = data.map(item => item.productId);
        this.selectProduct(data);
        return { length, ids };
      }
    },
    onShow() {
      this.getCartAll();
      this.edit = false
    },
    methods: {
      ...mapActions('Cart', ['getCartAll', 'doDeleteCart', 'doDeleteInvalid', 'selectProduct', 'putCart']),

      selectGood(i) {
        const { edit } = this;
        let state = edit ? 'willDel' : 'willBuy';
        this.goods[i][state] = !this.goods[i][state];
      },

      cancel() {
        this.getCartAll().then(
          () => {
            this.edit = false;
          }
        )
      },

      selectAllgoods() {
        const { edit, goods, currentSelect } = this;
        let state = edit ? 'willDel' : 'willBuy';
        if (currentSelect.length === goods.length) {
          // 说明已全选
          this.goods.filter(good => good.status).map(good => (good[state] = false));
          return;
        }
        this.goods.map(good => (good[state] = true));
      },

      selectWillChang(i) {
        this.goods.forEach(item => item.willChange = false);

        this.goods[i].willChange = !this.goods[i].willChange;

        this.putCart(this.goods[i])

      },


      changSampleType(i) {
        this.goods[i].sampleType = this.goods[i].sampleType === 0 ? 1 : 0;

        this.putCart(this.goods[i])
      },


      numChange(val, i) {
        console.log(val, i);
        this.goods[i].shoppingNum = val;

        this.putCart(this.goods[i])
      },

      to(url) {
        uni.navigateTo({
          url
        });
      },

      toLining() {
        uni.switchTab({
          url: '/pages/lining/lining'
        })
      },

      toCreateOrder() {
        const { currentSelect } = this;
        if (!currentSelect.length) {
          uni.showToast({
            title: '请选择要购买的商品',
            icon: "none",
            mask: true
          });
          return
        }

        uni.navigateTo({
          url: '/pages/account-cart/account-cart'
        })

      },
      toDetail(id) {
        uni.navigateTo({
          url: '/pages/shop-detail/shop-detail?id=' + id
        });
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
          z-index: 999;
          position: fixed;
          width: 686upx;
          background: #fff;
            display: flex;
            justify-content: space-between;
            .menu {
                display: flex;
                align-items: center;
                &:first-child {
                    width: 33.3%;
                }
                &:nth-child(2) {
                    width: 33.3%;
                }

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
                            position: relative;
                            width: 290upx;

                            &.del-active {
                                width: 210upx;
                                border: 2upx solid #ccc;
                                border-radius: 8upx;
                                padding: 5upx;

                                .option {
                                    margin-left: 5upx;
                                }
                            }

                            .option {
                                display: flex;
                                align-items: center;
                                margin-bottom: 5upx;
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

    .shop-car-footer {
        position: fixed;
        display: flex;
        align-items: center;
        width: 100%;
        height: 80upx;
        background: #fff;
        border-top: 2upx solid #eeeeee;
        bottom: 98upx;
        /* #ifdef MP-WEIXIN */
        bottom: 0;
        /* #endif */

        .select-all {
            width: 25%;
            display: flex;
            align-items: center;
            font-size: 28upx;
            color: #333;
            margin: 0 0 0 $white-space;
            text {
                margin-left: 16upx;
            }
        }

        .total {
            flex-grow: 1;
            font-size: 32upx;
            text {
                font-size: 28upx;
                color: #333;
            }
        }

        .button {
            width: 220upx;
            height: 80upx;
            line-height: 80upx;
            text-align: center;
            align-self: flex-end;
            font-size: 28upx;
            color: #fff;
            background: #ccc;
            &.active {
                background: $theme-color;
            }
            &.del-active {
                background: #666;
            }
        }
    }

    .white-space {
        height: 80upx;
    }

    .select-much {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 40upx;

        .title {
            padding: 0 0 0 60upx;
            border: none;
        }

        .rest {
            font-size: 20upx;
            font-family: PingFang-SC-Regular;
            color: #999;
        }

        .unit {
            margin-left: 20upx;
        }
    }

    .select-small {
        margin-top: 64upx;
        margin-bottom: 40upx;
        display: flex;
        align-items: center;

        .title {
            padding: 0 0 0 60upx;
            border: none;
        }
    }

    .tags {
        flex-grow: 1;
        height: 64upx;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-left: 30upx;
        transition: max-height 0.3s ease-in-out;

        .tag {
            margin: 0 10upx 30upx 0;
            width: 140upx;
            padding: 0;
            text-align: center;
            font-size: 24upx;
        }
    }

    .good-wrap {
        border: 0 solid #666;
        border-width: 2upx 0 2upx 0;
    }

  .white-space{
    height: 100upx;
  }

  // 失效商品样式
  .dead {
    position: relative;
    filter: grayscale(100%);

    @function upx($size) {
      @return $size + upx;
    }

    :after {
      content: '已失效';
      position: absolute;
      padding: upx(2) upx(10);
      width: 60%;
      height: upx(40);
      line-height: upx(40);
      background: rgba(0, 0, 0, .3);
      color: white;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      font-size: upx(22);
      border-radius: upx(12);
      text-align: center;
    }
  }
}
</style>
