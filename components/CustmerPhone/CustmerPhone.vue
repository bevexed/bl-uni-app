<template>
    <view class="custmer-phone"><image @click="link('/pages/contact/contact')" src="/static/icon/phone.png" mode=""></image></view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        link(url) {
            uni.navigateTo({ url });
        }
    }
};
</script>

<style lang="scss" scoped>
.custmer-phone {
    z-index: 9;
    position: fixed;
    right: 48upx;
    bottom: 160upx;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    width: 74upx;
    height: 74upx;
    box-shadow: 0 4upx 8upx 0 rgba(0, 0, 0, 0.15);
    image {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        width: 40upx;
        height: 40upx;
        opacity: 1;
    }
}
</style>
