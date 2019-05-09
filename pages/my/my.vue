<template>
    <view class="my" :style="{ height: windowHeight - 55 + 'px' }">
        <view class="background"><image class="" src="../../static/icon/bk.png" mode="bottom"></image></view>
        <view class="header">
            <image class="avatar" src="http://qxintechoffice.f3322.net:5007/micro/1.jpg" mode=""></image>
            <view class="info">
                <view class="info-header">
                    <view class="name">Helvetica</view>
                    <view class="vip">
                        <image src="../../static/icon/reat.svg" mode=""></image>
                        <text>未激活</text>
                    </view>
                </view>
                <view class="info-bottom">
                    <view class="phone">188213123</view>
                    <image src="../../static/icon/set.png" mode="" @tap="to('/personal-information/personal-information')"></image>
                </view>
            </view>
        </view>

        <view class="set-list">
            <view class="set-item" @tap="to('/address-book/address-book')">
                <image class="icon" src="../../static/icon/adb.svg" mode=""></image>
                <text>我的地址薄</text>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="set-item" @tap="to('/order/order')">
                <image class="icon" src="../../static/icon/dd.svg" mode=""></image>
                <text>我的订单</text>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="set-item" @tap="to('/ticket/ticket')">
                <image class="icon" src="../../static/icon/kp.svg" mode=""></image>
                <text>开票信息维护</text>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="set-item" @tap="to('/my-collection/my-collection')">
                <image class="icon" src="../../static/icon/sc.svg" mode=""></image>
                <text>我的收藏</text>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="set-item">
                <image class="icon" src="../../static/icon/md.svg" mode=""></image>
                <text>在哪里找到SINOTY</text>
                <image class="arrow" src="../../static/icon/arrow-bottom.svg" mode=""></image>
            </view>
        </view>

        <view class="button">
            <image src="../../static/icon/close.svg" mode=""></image>
            <view>退出</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            windowHeight: 0
        };
    },
    methods: {
        to(url) {
            uni.navigateTo({
                url
            });
        }
    },
    onLoad() {
        let _this = this;
        uni.getSystemInfo({
            success: res => {
                console.log(res);
                _this.windowHeight = res.windowHeight;
                _this.windowWidth = res.windowWidth;
            }
        });
    }
};
</script>

<style lang="scss">
.my {
    position: relative;
    z-index: 1;
    background: #f7f7f7;
    .background {
        z-index: 2;
        position: absolute;
        top: -50upx;
        width: 750upx;
        height: 184upx;

        /* #ifdef MP-WEIXIN */
        top: 40upx;
        /* #endif */

        image {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    .header {
        z-index: 3;
        position: relative;
        display: flex;
        width: 690upx;
        height: 140upx;
        margin: 100upx auto;
        border-radius: 8upx;
        box-shadow: 0 6upx 12upx 0 rgba(109, 72, 0, 0.2);
        background: #fff;
        image.avatar {
            position: relative;
            top: -34upx;
            left: 30upx;
            width: 160upx;
            height: 160upx;
            border-radius: 80upx;
            box-shadow: 0 6upx 12upx 0 rgba(0, 0, 0, 0.4);
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 50upx;
            padding: 22upx 0 16upx;
        }

        .info-header {
            display: flex;

            .name {
                font-size: 36upx;
                color: #000;
            }
        }

        .vip {
            position: relative;
            margin-left: 20upx;

            image {
                width: 98upx;
                height: 48upx;
            }

            text {
                position: absolute;
                width: 60upx;
                left: 0;
                right: 0;
                top: 8upx;
                bottom: 0;
                margin: auto;
                font-size: 20upx;
                color: #999;
            }
        }

        .info-bottom {
            width: 450upx;
            display: flex;
            justify-content: space-between;
            height: 40upx;
            .phone {
                font-size: 28upx;
                color: #999;
                height: 40upx;
            }

            image {
                width: 32upx;
                height: 32upx;
            }
        }
    }

    .set-list {
        padding: 0 28upx;
        .set-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            padding: 28upx;
            border-radius: 8upx;
            margin-bottom: 6upx;

            .icon {
                width: 36upx;
                height: 36upx;
            }
            text {
                font-size: 32upx;
                color: #333;
                margin-left: 16upx;
                flex: 1;
            }
            .arrow {
                width: 24upx;
                height: 28upx;
                transform: rotate(270deg);
            }
        }
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 690upx;
        height: 80upx;
        border: 2upx solid $theme-color;
        border-radius: 8upx;
        margin: 146upx auto;
        image {
            width: 16px;
            height: 16px;
            margin-right: 8upx;
        }
        view {
            font-size: 28upx;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(191, 160, 101, 1);
        }
    }
}
</style>
