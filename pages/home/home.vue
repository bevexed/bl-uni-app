<template>
    <view class="home-page">
        <view class="title">SINOTY</view>

        <!-- 轮播图 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="banner">
            <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex">
                <view class="swiper-item"><img class="banner-img" :src="banner" alt="" /></view>
            </swiper-item>

            <!-- 第二屏 -->
            <view class="exhibition"><img src="" alt="" /></view>
        </swiper>
    </view>
</template>

<script>
import search from '../../components/mehaotian-search/mehaotian-search.vue';

export default {
    components: {
        search
    },
    data() {
        return {
            title: 'SINOTY',
            banners: ['../../static/imgs/home/banner.png', '../../static/imgs/home/banner.png', '../../static/imgs/home/banner.png']
        };
    },
    onLoad() {
        this.getdata();
    },
    methods: {
        toSearch(e, val) {
            console.log(e, val);
            this['val' + val] = e;
        },
        getdata() {
            uni.request({
                url: 'http://admin.xingyiguan.cn/api/login/get_user', //仅为示例，并非真实接口地址。
                method: 'post',
                data: {
                    name: 'name',
                    age: 18
                },
                success(res) {
                    console.log(res.data);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.home-page {
    padding: 32upx;
    .title {
        text-align: center;
        font-style: Helvetica Bold;
        font-size: 72upx;
        font-weight: bold;
    }

    .banner {
        margin-top: 40upx;
        height: 966upx;
        .banner-img {
            width: 100%;
        }
    }

    .exhibition {
        width: 690upx;
        height: 400upx;
        overflow: hidden;
        img {
            
        }
    }
}
</style>
