<template>
    <view class="fitting">
        <!-- 模特选择轮播 -->
        <view class="model">
            <view class="select-model">
                <!-- 模特选择标题 -->
                <view class="model-select-title"><text>模特选择</text></view>
                <image class="before" src="../static/icon/before.svg" mode=""></image>
                <swiper class="swiper" vertical display-multiple-items="5" skip-hidden-item-layout>
                    <swiper-item>
                        <view :class="['swiper-item', { selected: 0 === currentModel }]" @tap="onModelChange(0)">
                            <image src="../static/imgs/fitting/241556421365_.pic_hd.jpg" mode="aspectFill"></image>
                        </view>
                    </swiper-item>
                    <swiper-item>
                        <view :class="['swiper-item', { selected: 1 === currentModel }]" @tap="onModelChange(1)">
                            <image src="../static/imgs/fitting/251556421372_.pic_hd.jpg" mode="aspectFill"></image>
                        </view>
                    </swiper-item>

                    <swiper-item>
                        <view v-for="i in 3" :key="i"><image src="" mode="aspectFill"></image></view>
                    </swiper-item>

                    <!-- <swiper-item v-for="(imgUrl, index) in defaultModel" :key="index">
                        <view :class="['swiper-item', { selected: index === currentModel }]" @tap="onModelChange(index, imgUrl)">
                            <image :src="'../' + imgUrl" mode="aspectFill"></image>
                        </view>
                    </swiper-item> -->
                    -->
                </swiper>
                <image class="next" src="../static/icon/before.svg" mode=""></image>
            </view>

            <!-- 模特实体图 -->
            <view class="model-show"><image :src="currentImage" mode="aspectFill"></image></view>

            <!-- 控制器 -->
            <view class="controll">
                <view class="dircetion">
                    <image src="../static/icon/dir.svg" mode="" class="dirction-top"></image>
                    <image src="../static/icon/dir.svg" mode="" class="dirction-right"></image>
                    <image src="../static/icon/dir.svg" mode="" class="dirction-left"></image>
                    <image src="../static/icon/dir.svg" mode="" class="dirction-bottom"></image>
                </view>

                <view class="touchbar">
                    <image class="add" src="../static/icon/add.png" mode="" @tap="onTouchBarButton('add')"></image>
                    <view class="my-slider">
                        <view class="my-slider-background"></view>
                        <view class="my-slider-selected" :style="{ height: currentBar + 'px' }"></view>
                        <view class="my-slider-bar" :style="{ top: currentBar - 2 + 'px' }" @touchmove="onChangeBar($event)" @touchend="onChangeBarEnd()"></view>
                    </view>
                    <image class="reduce" src="../static/icon/reduce.png" mode="" @tap="onTouchBarButton('reduce')"></image>
                </view>
            </view>
        </view>

        <!-- 样式选择标题 -->
        <view class="model-select-title">
            <text>花样选择</text>
            <view class="detail">
                <text>花形详情</text>
                <image class="more" src="../static/icon/more.png" mode=""></image>
            </view>
        </view>

        <!-- 样式选择轮播 -->
        <view class="select-style">
            <image class="before" src="../static/icon/before.svg" mode=""></image>
            <swiper class="swiper select-style" :display-multiple-items="5">
                <swiper-item v-for="(imgUrl, index) in defaultStyle" :key="index">
                    <view :class="['swiper-item', { selected: index === currentStyle }]" @tap="onStyleChange(index, imgUrl)">
                        <image :src="'../' + imgUrl" mode="aspectFill"></image>
                    </view>
                </swiper-item>

                <!-- 上传图片 -->
                <swiper-item key="add">
                    <view class="swiper-item upload-style"><image src="../static/icon/adds.png" mode="center" @tap="popShow = true"></image></view>
                </swiper-item>
            </swiper>
            <image class="next" src="../static/icon/before.svg" mode=""></image>
        </view>

        <view :class="['pop-wrap']" v-show="popShow" @touchmove.prevent.stop @tap="popShow = false">
            <view :class="['pop']" @tap.stop="chooseImg">
                <image src="../static/icon/com.png" mode="aspectFill"></image>
                <text>本地上传</text>
            </view>
        </view>
    </view>
</template>

<script>
import { pathToBase64, base64ToPath } from 'image-tools';
import { reqTextile3dmix } from '../static/api';

export default {
    components: {},
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
            currentImage: '../static/imgs/fitting/5.jpg',

            // 滑块初始位置
            barStartY: 0,

            // 当前滑块停留位置
            currentBar: 338,

            // 弹窗显示
            popShow: false,

            // 请求数据
            data_upload: {
                model_id: 2,
                image: '',
                loc: '',
                dx: 0,
                dy: 0,
                amp: 1,
                rotate: 0,
                Rdpi: 40
            }
        };
    },
    methods: {
        // 请求 3d 试衣结果
        async getTextile3dmix() {
            uni.showLoading({
                title: '数据加载中...',
                mask: true
            });

            let res = await reqTextile3dmix(this.data_upload);

            if (res.error_code === 0) {
                this.currentImage = 'data:image/png;base64,' + res.image;
            }
        },

        // 更换模特
        async onModelChange(index, imgUrl) {
            this.currentModel = index;
            this.data_upload.model_id = (index + 1).toString();
            // 向服务器发送请求
            this.getTextile3dmix();
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

                // 向服务器发送请求
                this.getTextile3dmix();
            });
        },

        onChangeBar(e) {
            let mouseY = e.changedTouches[0].pageY;
            let offsetY = 147;
            let offsetTop = e.target.offsetTop;

            let barPositon;

            barPositon = mouseY - offsetY;

            if (barPositon <= 0) {
                barPositon = 0;
            }

            if (barPositon >= 338) {
                barPositon = 338;
            }

            this.currentBar = barPositon;

            console.log(parseInt(e.changedTouches[0].pageY), e.target.offsetTop);

            // this.currentBar = e.target.offsetTop;
        },

        onChangeBarEnd() {
            let step = 9;
            let stepSize = 338 / step;
            let currentStep = Math.floor(this.currentBar / stepSize);

            this.data_upload.amp = 10 - currentStep;

            this.currentBar = currentStep * stepSize;

            // 向服务器发送请求
            this.getTextile3dmix();

            console.log(this.currentBar);
        },

        onTouchBarButton(state) {
            let step = 9;
            let stepSize = 338 / step;
            let currentStep = Math.floor(this.currentBar / stepSize);

            if (state === 'add') {
                currentStep--;
            } else {
                currentStep++;
            }

            if (currentStep > 9) {
                currentStep = 9;
            }
            if (currentStep < 0) {
                currentStep = 0;
            }

            this.data_upload.amp = 10 - currentStep;

            this.currentBar = currentStep * stepSize;

            // 向服务器发送请求
            this.getTextile3dmix();
        },

        // 展示 上传 图框

        chooseImg() {
            uni.chooseImage({
                success(res) {
                    console.log('选择图片完成', res);
                    uni.navigateTo({
                        url: '/pages/clipper/clipper?imgUrl=' + res.tempFiles[0].path
                    });
                },
                count: 1,
                sourceType: ['album'],
                sizeType: ['original']
            });
        }
    },

    onReady() {
        console.log(1);
        this.onStyleChange(0, this.defaultStyle[1]);
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
                font-family: 苹方 粗体, serif;
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
        align-items: flex-start;
        height: 1000upx;
        .select-model {
            position: relative;
            width: 120upx;
            height: 928upx;
            .before {
                z-index: 1;
                position: absolute;
                height: 14px;
                width: 14px;
                top: 80upx;
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
            width: 440upx;
            height: 928upx;
            text-align: center;
            align-self: flex-end;
            image {
                width: 314upx;
                height: 928upx;
            }
        }

        .controll {
            .dircetion {
                position: relative;
                width: 110upx;
                height: 100upx;

                > image {
                    position: absolute;
                    width: 32upx;
                    height: 28upx;
                    margin: auto;
                }

                .dirction-top {
                    left: 0;
                    right: 0;
                    transform: rotate(180deg);
                }

                .dirction-bottom {
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                .dirction-right {
                    top: 0;
                    bottom: 0;
                    left: 0;
                    transform: rotate(90deg);
                }
                .dirction-left {
                    top: 0;
                    bottom: 0;
                    right: 0;
                    transform: rotate(-90deg);
                }
            }

            .touchbar {
                display: flex;
                align-items: center;
                flex-direction: column;
                margin: 90upx 0 0;

                image {
                    width: 34upx;
                    height: 34upx;
                }
                .add,
                .reduce {
                    margin: 16upx 0;
                }

                .my-slider {
                    position: relative;
                    width: 80upx;
                    height: 700upx;
                }

                .my-slider-background,
                .my-slider-selected {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 2upx;
                    height: 700upx;
                    background: red;
                    background: black;
                }

                .my-slider-selected {
                    background: yellow;
                    background: #eceff0;
                }

                .my-slider-bar {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 34upx;
                    height: 34upx;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0 2upx 6upx 0 rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                }
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

    .upload-style {
        width: 120upx;
        height: 100upx;
        border: 2upx solid #ccc;
        image {
            width: 60upx;
            height: 50upx;
        }
    }

    .pop-wrap {
        z-index: 99;
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);

        .pop {
            z-index: 999;
            position: fixed;
            width: 750upx - 32upx * 2;
            bottom: 0;
            display: flex;
            align-items: center;
            background: #fff;
            padding: 38upx 32upx;
            border-radius: 8upx 8upx 0 0;
            overflow: hidden;

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
}
</style>
