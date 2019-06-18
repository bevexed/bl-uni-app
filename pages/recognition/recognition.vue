<template>
    <view class="recognition">
<!--  todo: 相似商品 图片    -->
        <view class="header">
          <image :src="imgUrl"></image>
        </view>

      <view class="similar" v-if="false">
            <view class="title">相似商品</view>

            <view :class="['tags']">
                <uni-tag
                    class="tag"
                    :text="tag"
                    :type="tagCurrentSelect.includes(tag) ? 'success' : 'primary'"
                    :inverted="true"
                    v-for="(tag, index) in tagsList"
                    :key="index"
                    @click="selectTag('tagCurrentSelect', tag)"
                />
            </view>
        </view>

        <!-- 商品列表 -->
        <view class="list">
          <view class="item" v-for="(value,key) in similar" :key="key" @tap="toDetail(value.id)">
            <image :src="value.imageShow" mode="aspectFill" lazy-load></image>
            <view class="name">{{ value.pno }}</view>
                <view class="price">
                    <text class="money">
                      ￥{{ value.price}}
                      <text class="per">/{{ value.unit }}</text>
                    </text>

                    <text class="rest">
                        仅剩
                      <text class="rest-red">{{ value.stock }}</text>
                      {{ value.unit }}
                    </text>
                </view>
            </view>
        </view>

        <custmer-phone />
    </view>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';
  import { uniDrawer, uniNavBar, uniTag, uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';

export default {
  components: {
    uniDrawer,
    uniNavBar,
    uniTag,
    uniCollapse,
    uniCollapseItem,
    CustmerPhone
  },
  onLoad(query) {
    let id = query.id;
    this.imgUrl = query.imgUrl;
    this.getSimilar(id)
  },
  data() {
    return {
      imgUrl: '',
      tagsList: ['标签一', '标签二', '标签三', '标签四', '标签五'],
      // 当前选中标签
      tagCurrentSelect: []
    };
  },
  computed: mapState('Products', ['similar']),
  methods: {
    ...mapActions('Products', ['getSimilar']),
    selectTag(currentState, tag_name) {
      if (this[currentState].includes(tag_name)) {
        this[currentState].splice(this[currentState].findIndex(item => item === tag_name), 1);
        return;
      }
      this[currentState].push(tag_name);
    },
    toDetail(id) {
      uni.navigateTo({
        url: '/pages/shop-detail/shop-detail?id=' + id
      });
    }
  }
};
</script>

<style lang="scss">
.recognition {
    .header {
        position: relative;
        height: 128upx;
        background: rgba(0, 0, 0, 0.5);
        image {
            position: absolute;
            width: 120upx;
            height: 120upx;
            left: 0;
            bottom: 0;
            right: 0;
            top: 52upx;
            margin: auto;
            box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.19);
            border-radius: 4px;
        }
    }

    .similar {
        padding: $white-space;
        .title {
            font-size: 32upx;
            padding: 32upx 0;
            color: rgb(51, 51, 51);
            font-weight: 500;
        }
        .tags {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-bottom: 4upx solid #eee;
            transition: max-height 0.3s ease-in-out;

            .tag {
                margin: 0 0 30upx;
                width: 18%;
                padding: 0;
                text-align: center;
                overflow: hidden;
                font-size: 24upx;
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
}
</style>
