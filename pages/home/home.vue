<template>
    <view class="home-page">
        <view class="title">SINOTY</view>

        <!-- 轮播图 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="banner">
            <swiper-item v-for="(banner, bannerIndex) in banners" :key="bannerIndex">
                <view class="swiper-item"><image mode="aspectFill" class="banner-img" :src="banner" alt=""></image></view>
            </swiper-item>
        </swiper>

        <!-- 第二屏 -->
        <view class="picture-presentation second">
            <!-- 顶部图片 -->
            <view class="picture-presentation-top"><image mode="aspectFill" src="../../static/imgs/home/second-top.png" alt=""></image></view>
            <!-- 底部展示区 -->
            <view class="picture-presentation-bottom">
                <!-- 小字title -->
                <view class="title">3th March 2019</view>
                <!-- 图片展示 -->
                <view class="exhibition">
                    <!-- 左部预览项目 -->
                    <view class="big-pic">
                        <!-- 商品图片 -->
                        <image mode="aspectFill" src="../../static/imgs/home/left.png" alt=""></image>
                        <!-- 商品名称 -->
                        <view class="name">
                            <text>Gyms Wome</text>
                            <image mode="aspectFill" class="more" src="../../static/imgs/home/more.png" alt=""></image>
                        </view>
                        <!-- 商品号 -->
                        <view class="shop-count">z100587</view>
                    </view>

                    <!-- 右部预览项目 -->
                    <view class="sm-pic">
                        <view class="title">FASHION BRANFDS</view>
                        <image mode="aspectFill" src="../../static/imgs/home/right.png" alt=""></image>

                        <!-- 商品名称 -->
                        <view class="name">
                            <text>Sexy Dres</text>
                            <image class="more" src="../../static/imgs/home/more.png" alt=""></image>
                        </view>
                        <!-- 商品号 -->
                        <view class="shop-count">z100846</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 第三屏 -->
        <view class="picture-presentation third">
            <!-- 顶部图片 -->
            <view class="picture-presentation-top"><image mode="aspectFill" src="../../static/imgs/home/1555916144469.jpg" alt=""></image></view>
            <!-- 底部展示区 -->
            <view class="picture-presentation-bottom">
                <!-- 小字title -->
                <view class="title">15th February 2019</view>
                <!-- 图片展示 -->
                <view class="exhibition">
                    <!-- 左部预览项目 -->
                    <view class="sm-pic">
                        <view class="title">WOVEN FABIC</view>
                        <image mode="aspectFill" src="../../static/imgs/home/1555917371557.jpg" alt=""></image>

                        <!-- 商品名称 -->
                        <view class="name">
                            <text>Men T-shirt</text>
                            <image class="more" src="../../static/imgs/home/more.png" alt=""></image>
                        </view>
                        <!-- 商品号 -->
                        <view class="shop-count">z100112314</view>
                    </view>

                    <!-- 右部预览项目 -->
                    <view class="big-pic">
                        <!-- 商品图片 -->
                        <image mode="aspectFill" src="../../static/imgs/home/1555917485604.jpg" alt=""></image>
                        <!-- 商品名称 -->
                        <view class="name">
                            <text>Beauty Dres</text>
                            <image class="more" src="../../static/imgs/home/more.png" alt=""></image>
                        </view>
                        <!-- 商品号 -->
                        <view class="shop-count">z100812367</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 第四屏 -->
        <view class="video">
            <view class="title">SINOTY</view>
            <video class="my-video" poster="../../static/imgs/home/1555917485604.jpg" src="" controls loop></video>
            <view class="tel">如果您在选购中有疑问，请致电：0571-88888888</view>
        </view>

        <custmer-phone />
    </view>
</template>

<script>
import CustmerPhone from '../../components/CustmerPhone/CustmerPhone.vue';

export default {
    components: {
        'custmer-phone': CustmerPhone
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

<style lang="scss" scoped>
.home-page {
    .title {
        text-align: center;
        font-style: Helvetica Bold;
        font-size: 72upx;
        font-weight: bold;
    }

    .banner {
        padding: 0 $white-space;
        margin-top: 40upx;
        height: 966upx;
        .banner-img {
            height: 966upx;
        }
    }

    .picture-presentation {
        padding:0 $white-space;
        margin: 20upx 0;
        .picture-presentation-top {
            width: 690upx;
            height: 400upx;
            margin: 30upx 0;
            overflow: hidden;
            > image {
                height: 400upx;
            }
        }

        .picture-presentation-bottom {
            margin-top: 32upx;
            .title {
                color: $uni-text-color-grey;
                font-size: 24upx;
            }

            .exhibition {
                display: flex;
                justify-content: space-between;
                margin-top: 20upx;
                .big-pic,
                .sm-pic {
                    width: 320upx;
                    .name {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12upx 8upx 0;
                        font-size: 32upx;
                        .more {
                            width: 28upx;
                            height: 28upx;
                        }
                    }
                    .shop-count {
                        padding: 8upx;
                        font-weight: lighter;
                        font-size: 20upx;
                        color: $uni-text-color-grey;
                    }
                }

                .big-pic > image {
                    height: 470upx;
                }

                .sm-pic {
                    .title {
                        position: relative;
                        font-size: 32upx;
                        color: $uni-text-color;
                        font-weight: bold;
                        &:after {
                            position: absolute;
                            width: 30upx;
                            top: 2em;
                            content: '';
                            border-top: 6upx solid $theme-color;
                        }
                    }
                    > image {
                        height: 332upx;
                        margin-top: 100upx;
                    }
                }
            }
        }
    }

    .second {
        .title {
            text-align: right;
            &:after {
                right: 0;
            }
        }
    }

    .third {
        .title {
            text-align: left;
            &:after {
                left: 0;
            }
        }
    }

    .video {
        background: #444;
        text-align: center;
        .title {
            padding: 48upx 0 0;
            margin: 0 30upx;
            font-size: 48upx;
            text-align: center;
            color: #fff;
            border-bottom: 2upx solid #aaaaaa;
        }
        .my-video {
            margin: 0 auto;
            width: 690upx;
            height: 386upx;
            margin: 50upx 0 30upx;
            border-radius: 8upx;
        }
        .tel {
            padding: 0 $white-space 34upx;
            font-size: 20upx;
            text-align: left;
            color: $uni-text-color-grey;
        }
    }
}
</style>
