<template>
    <view class="contact">
        <view class="title">
            CONTACT
            <text>US</text>
            <view class="contact-us">联系我们</view>
        </view>

        <view class="contact-type">
            <text>A：扫码关注公众号，掌握我们最新的信息</text>
            <image src="../static/imgs/contact/1555926754105.jpg"></image>

            <text>B：您还可以通过以下方式联系我们</text>

            <view class="contact-detail">
                <view>
                    <text class="label">电话：</text>
                    <text class="value">0571-88888888</text>
                </view>
                <view>
                    <text class="label">QQ：</text>
                    <text class="value">123123123</text>
                </view>
                <view>
                    <text class="label">官网：</text>
                    <text class="value">www.123123.com</text>
                </view>
                <view>
                    <text class="label">地址：</text>
                    <text class="value">杭州文一西路中节能西溪首 座A1-1 310室</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.contact {
    text-align: center;
    .title {
        margin: 50upx 0 70upx;
        font-family: Helvetica Bold;
        font-size: 48upx;
        font-weight: bold;
        text {
            margin-left: 0.5em;
            color: $theme-color;
        }
        .contact-us {
            font-size: 40upx;
            font-family: 苹方 特细;
            font-weight: 100;
        }
    }

    .contact-type {
        text-align: center;
        > text {
            font-family: 平方 粗体;
            font-weight: bold;
            font-size: 28upx;
            color: $uni-text-color;
        }

        image {
            display: block;
            margin: 60upx auto 120upx;
            width: 294upx;
            height: 294upx;
        }

        .contact-detail {
            width: 420upx;
            margin: 46upx auto;
            text-align: left;
            view {
                display: flex;
                justify-content: space-around;
                font-size: 28upx;
                .label {
                    width: 90upx;
                    font-family: 苹方 常规;
                    color: $uni-text-color-grey;
                }
                .value {
                    width: 300upx;
                    color: $uni-text-color;
                }
            }
        }
    }
}
</style>
