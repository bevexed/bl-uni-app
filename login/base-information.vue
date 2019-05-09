<template>
    <view class="base-information">
        <view class="title">基本信息填写</view>
        <view class="form">
            <input type="text" v-model="name" placeholder="真实姓名" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
            <input type="text" v-model="company" placeholder="公司名称" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
            <input type="text" v-model="occupation" placeholder="您的职务" placeholder-style="color:#aaaaaa;font-weight:300;font-size:16px" />
        </view>

        <view class="agreement">
            <view :class="['select', { active: agreement }]" @tap="agreement = !agreement"><view class="selected"></view></view>
            <view>
                <text class="star"></text>
                已阅读并同意购物条款并了解
                <text class="href">隐私政策</text>
            </view>
        </view>

        <view :class="['pay-button', { active: agreement && name.length > 0 && occupation.length > 0 && company.length > 0 }]" @click="toHome">确认</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            company: '',
            occupation: '',
            // 是否同意
            agreement: false
        };
    },
    methods: {
        toHome() {
            let { name, company, occupation, agreement } = this;
            if (agreement && name.length > 0 && occupation.length > 0 && company.length > 0) {
                uni.switchTab({
                    url: '../pages/home/home'
                });
            }
        }
    }
};
</script>

<style lang="scss">
.base-information {
    padding: 20upx 40upx;
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    .form {
        margin-top: 256upx;
    }

    input {
        display: flex;
        align-items: center;
        margin-top: 90upx;
        padding: 14upx 0;
        border-bottom: 2upx solid #eeeeee;
    }

    .agreement {
        display: flex;
        align-items: center;
        font-size: 20upx;
        color: #666;
        margin-top: 28upx;
        .select {
            margin-right: 20upx;
        }
        .star {
            font-weight: bold;
            color: #c50000;
        }

        .href {
            color: #333;
            font-weight: 500;
            text-decoration: underline;
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

    .pay-button {
        $height: 80upx;
        height: $height;
        line-height: $height;
        width: 692upx;
        margin: 226upx auto 68upx;
        text-align: center;
        background: #cccccc;
        border-radius: 8upx;
        color: #fff;
        font-size: 28upx;
        &.active {
            background: $theme-color;
        }
    }
}
</style>
