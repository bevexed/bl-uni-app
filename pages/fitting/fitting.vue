<template>
    <view class="fitting">
        <!-- 模特选择轮播 -->
        <view class="model">
            <view class="select-model">
                <!-- 模特选择标题 -->
                <view class="model-select-title"><text>模特选择</text></view>
                <image class="before" src="../../static/icon/before.svg" mode=""></image>
                <swiper class="swiper" vertical display-multiple-items="5" skip-hidden-item-layout>
                    <swiper-item v-for="(imgUrl, index) in defaultModel" :key="index">
                        <view :class="['swiper-item', { selected: index === currentModel }]" @tap="onModelChange(index, imgUrl)">
                            <image :src="'../../' + imgUrl" mode="aspectFill"></image>
                        </view>
                    </swiper-item>
                </swiper>
                <image class="next" src="../../static/icon/before.svg" mode=""></image>
            </view>

            <!-- 模特实体图 -->
            <view class="model-show"><image :src="currentImage" mode="aspectFill"></image></view>
        </view>

        <!-- 样式选择标题 -->
        <view class="model-select-title">
            <text>花样选择</text>
            <view class="detail">
                <text>花形详情</text>
                <image class="more" src="../../static/icon/more.png" mode=""></image>
            </view>
        </view>

        <!-- 样式选择轮播 -->
        <view class="select-style">
            <image class="before" src="../../static/icon/before.svg" mode=""></image>
            <swiper class="swiper select-style" :display-multiple-items="5">
                <swiper-item v-for="(imgUrl, index) in defaultStyle" :key="index">
                    <view :class="['swiper-item', { selected: index === currentStyle }]" @tap="onStyleChange(index, imgUrl)">
                        <image :src="'../../' + imgUrl" mode="aspectFill"></image>
                    </view>
                </swiper-item>
            </swiper>
            <image class="next" src="../../static/icon/before.svg" mode=""></image>
        </view>
    </view>
</template>

<script>
import { pathToBase64, base64ToPath } from 'image-tools';
import { myImage } from '../../static/unit';
import { textile3dmix } from '../../static/api';

export default {
    data() {
        return {
            // 默认模特数量,最小数量为5
            defaultModel: [
                'static/imgs/fitting/1.jpg',
                'static/imgs/fitting/2.jpg',
                'static/imgs/fitting/3.jpg',
                'static/imgs/fitting/4.jpg',
                'static/imgs/fitting/5.jpg',
                'static/imgs/fitting/6.jpg',
                'static/imgs/fitting/7.jpg',
                'static/imgs/fitting/8.jpg'
            ],
            // 当前选中模特
            currentModel: 0,
            // 默认花纹数量,最小数量为5
            defaultStyle: [
                'static/imgs/fitting/1.jpg',
                'static/imgs/fitting/2.jpg',
                'static/imgs/fitting/3.jpg',
                'static/imgs/fitting/4.jpg',
                'static/imgs/fitting/5.jpg',
                'static/imgs/fitting/6.jpg',
                'static/imgs/fitting/7.jpg',
                'static/imgs/fitting/8.jpg'
            ],
            // 当前样式
            currentStyle: 0,

            // 展示区图片
            currentImage: '',

            // 请求数据
            data_upload: {
                model_id: 2,
                image: '',
                loc: '',
                dx: 0,
                dy: 0,
                amp: 2,
                rotate: 0,
                Rdpi: 40
            }
        };
    },
    methods: {
        // 更换模特
        async onModelChange(index, imgUrl) {
            this.currentModel = index;
            this.data_upload.model_id = (index + 1).toString();
            textile3dmix(this.data_upload);
        },

        // 更换花纹
        onStyleChange(index, imgUrl) {
            this.currentStyle = index;

            // 自封装 图片转 base64
            // myImage(imgUrl).then(res => {
            //     console.log(res);
            // });

            // 图片 转 base64
            pathToBase64(imgUrl).then(async base64 => {
                // console.log(base64);
                this.data_upload.image = base64.split('base64,')[1];

                uni.showLoading({
                    title: '数据加载中...'
                });

                // 向服务器发送请求
                let res = await textile3dmix(this.data_upload);

                if (res.error_code === 0) {
                    this.currentImage = 'data:image/png;base64,' + res.image;
                }
            });
        },

        mounted() {
            console.log(1);
            this.onStyleChange(0, this.defaultStyle[1]);
        }
    }
};
</script>

<style lang="scss">
.fitting {
    padding: $white-space;
    .model-select-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin: 20upx 0;
        text {
            font-family: 苹方 常规;
            color: $theme-color;
            font-weight: 300;
            font-size: 28upx;
        }
        image {
            width: 32upx;
            height: 32upx;
        }

        .detail {
            display: flex;
            align-items: center;
            text {
                font-family: 苹方 粗体;
                font-weight: bold;
                font-size: 20upx;
                color: #444444;
                margin-right: 0.5em;
            }

            .more {
                width: 16upx;
                height: 14upx;
            }
        }
    }

    .model {
        display: flex;
        justify-content: space-between;
        .select-model {
            position: relative;
            width: 120upx;
            height: 852upx;
            .before {
                z-index: 1;
                position: absolute;
                height: 14px;
                width: 14px;
                top: 12upx;
                left: 0;
                right: 0;
                margin: auto;
            }
            .next {
                z-index: 1;
                position: absolute;
                height: 14px;
                width: 14px;
                bottom: 32upx;
                left: 0;
                right: 0;
                margin: auto;
                transform: rotate(180deg);
            }
            .swiper {
                height: 850upx;
            }
            .swiper-item {
                width: 120upx - 8upx;
                height: 160upx - 8upx;
                background: #eceff0;
                border-radius: $uni-border-radius-base;

                image {
                    width: 120upx - 8upx;
                    height: 160upx - 8upx;
                }
            }
        }
        .model-show {
            width: 500upx;
            height: 928upx;
            text-align: center;
            image {
                width: 314upx;
                height: 928upx;
            }
        }
    }

    .select-style {
        position: relative;
        height: 100upx;
        padding-right: 0;
        .swiper-item {
            width: 120upx - 8upx;
            height: 100upx - 8upx;
            background: #eceff0;
            border-radius: $uni-border-radius-base;
            image {
                width: 120upx - 8upx;
                height: 100upx - 8upx;
            }
        }
        .before {
            z-index: 1;
            position: absolute;
            height: 14px;
            width: 14px;
            top: 0;
            bottom: 0;
            left: 8upx;
            margin: auto;
            transform: rotate(-90deg);
        }
        .next {
            z-index: 1;
            position: absolute;
            height: 14px;
            width: 14px;
            bottom: 32upx;
            top: 0;
            bottom: 0;
            right: 8upx;
            margin: auto;
            transform: rotate(90deg);
        }
    }

    .swiper-item {
        padding: 2upx;
        border: 2upx solid transparent;
        &.selected {
            border-color: $theme-color;
        }
    }
}
</style>
