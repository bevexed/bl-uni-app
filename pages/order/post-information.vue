<template>
    <view class="post-information">
        <view class="title">售后服务</view>

        <view class="list">
            <view class="item flex" @tap="">
                <text class="label">快递公司</text>
                <image class="arrow" src="../static/icon/arrow-bottom.svg" mode=""></image>
            </view>

            <view class="item flex" @tap="">
                <text class="label">快递单号</text>
                <input type="text" value="" placeholder="请输入快递单号" placeholder-style="font-size:14px;color:#999;text-align:right" />
            </view>

            <view class="item flex" @tap="">
                <text class="label">寄件人姓名</text>
                <input type="text" value="" placeholder="请输入寄件人姓名" placeholder-style="font-size:14px;color:#999;text-align:right" />
            </view>

            <view class="item flex" @tap="">
                <text class="label">寄件人电话</text>
                <input type="text" value="" placeholder="请输入寄件人电话" placeholder-style="font-size:14px;color:#999;text-align:right" />
            </view>
        </view>

        <view class="button">确定</view>
    </view>
</template>

<script></script>

<style lang="scss">
.post-information {
    .title {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding: 12upx 0;
        text-align: center;
    }
    .list {
        .item {
            border-top: 2upx solid #eeeeee;
            padding: $white-space 0;
            margin: 0 $white-space;

            &:last-child {
                border-bottom: 2upx solid #eeeeee;
            }

            .label {
                font-size: 28upx;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            .arrow {
                width: 24upx;
                height: 28upx;
                transform: rotate(270deg);
            }

            input {
                width: 228upx;
            }
        }

        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .button {
        position: fixed;
        bottom: 45px;
        width: 692upx;
        margin: $white-space;
        margin-top: 20upx;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #fff;
        background: $theme-color;
        text-align: center;
        border-radius: 8upx;
        height: 80upx;
        line-height: 80upx;
    }
}
</style>
