<template>
    <view class="information">
        <view class="list">
            <view class="item">
                <view class="label">我的头像</view>
                <view class="value"><image class="avatar" src="../static/imgs/fitting/3.jpg" mode=""></image></view>
            </view>

            <view class="item">
                <view class="label">我的会员</view>
                <view class="value"><text class="vip-num">SINOTY0278</text></view>
            </view>

            <view class="item">
                <view class="label">绑定手机号</view>
                <view class="value">
                    <text class="phone">CCTV9527</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">我的昵称</view>
                <view class="value">
                    <text class="name">139 **** 1234</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">性别</view>
                <view class="value">
                    <text class="pick-male">请选择性别</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">生日</view>
                <view class="value">
                    <text class="pick-birth">1900-01-01</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">企业名称</view>
                <view class="value">
                    <text class="name">淘淘淘服装有限公司</text>
                    <view class="bedge">已授权</view>
                </view>
            </view>

            <view class="item">
                <view class="label">我的职位</view>
                <view class="value">
                    <text class="name">职员</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>

            <view class="item">
                <view class="label">我的邮箱</view>
                <view class="value">
                    <text class="name">491291234@qq.com</text>
                    <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// to-fix 底部导航
export default {};
</script>

<style lang="scss">
.information {
    .list {
        padding: $white-space;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 68upx;
            .label {
                height: 38upx;
                font-size: 32upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .value {
                display: flex;
                align-items: center;
                height: 38upx;

                .avatar {
                    width: 100upx;
                    height: 100upx;
                    border-radius: 100upx;
                }

                .vip-num {
                    font-size: 28upx;
                    color: #888888;
                }

                .name,
                .phone {
                    font-size: 28upx;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }

                .bedge {
                    width: 98upx;
                    height: 38upx;
                    border: 2upx solid $theme-color;
                    border-radius: 8upx;
                    font-size: 20upx;
                    color: $theme-color;
                    text-align: center;
                    line-height: 38upx;
                    margin-left: 6upx;
                }

                .pick-birth,
                .pick-male {
                    font-size: 28upx;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(170, 170, 170, 1);
                }

                .arrow {
                    margin-left: 10upx;
                    width: 20upx;
                    height: 20upx;
                    transform: rotate(270deg);
                }
            }
        }
    }
}
</style>
