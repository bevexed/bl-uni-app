<template>
    <view class="add-address">
        <view :class="['address', { active: addressList.length === 0 }]">
            <view class="label">
                收货地址
                <text>（{{ addressList.length }}/10）</text>
            </view>
        </view>

        <view class="form">
            <view class="item">
                <view class="label">
                    收件人姓名
                    <text>*</text>
                </view>
                <view class="value"><input type="text" value="" placeholder="请输入收件人姓名(必填)" placeholder-style="font-size:10px;color:#aaaaaa;" /></view>
            </view>

            <view class="item">
                <view class="label">
                    手机号
                    <text>*</text>
                </view>
                <view class="value"><input type="text" value="" placeholder="请输入正确的手机号码(必填)" placeholder-style="font-size:10px;color:#aaaaaa;" /></view>
            </view>

            <view class="item">
                <view class="label">
                    地址
                    <text>*</text>
                </view>
                <view class="address-picker">
                    <view>
                        <text>省</text>
                        <image src="../static/icon/arrow-bottom.svg" mode=""></image>
                    </view>
                    <view>
                        <text>市</text>
                        <image src="../static/icon/arrow-bottom.svg" mode=""></image>
                    </view>
                    <view>
                        <text>区</text>
                        <image src="../static/icon/arrow-bottom.svg" mode=""></image>
                    </view>
                </view>
                <view class="value">
                    <input type="text" value="" placeholder="请输入详细地址，并精确到街道、单元、门牌等(必填)" placeholder-style="font-size:10px;color:#aaaaaa;" />
                </view>
            </view>
        </view>

        <view class="set-default">
            <view :class="['select', { active: defaultAddress }]" @tap="defaultAddress = !defaultAddress"><view class="selected"></view></view>
            <text>设为默认地址</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 地址列表
            addressList: [
                {
                    default: true //默认地址
                },
                {
                    default: false
                },
                {
                    default: false
                },
                {
                    default: false
                },
                {
                    default: false
                }
            ],
            // 查看更多地址状态

            defaultAddress: false
        };
    }
};
</script>

<style lang="scss">
.add-address {
    padding: $white-space;
    .address {
        display: flex;
        justify-content: space-between;
        padding: $white-space 0 58upx;

        &.active {
            border-bottom: 2upx solid #eeeeee;
        }
        .label {
            font-size: 28upx;
            text {
                font-size: 20upx;
                color: #999;
            }
        }
    }

    .form {
        .label {
            font-size: 24upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 24upx;
            text {
                color: #c50000;
            }
        }

        .value {
            padding: 26upx 20upx;
            border: 2upx solid rgba(238, 238, 238, 1);
            border-radius: 8upx;
            margin-bottom: 54upx;
        }
    }

    .set-default {
        display: flex;
        align-items: center;
        text {
            font-size: 30upx;
            margin-left: 20upx;
            color: #333333;
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

    .address-picker {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10upx;
        view {
            width: 180upx;
            height: 80upx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 2upx solid #eeeeee;
            border-radius: 8upx;
            padding: 0 20upx;
        }
        text {
            font-size: 20upx;
            color: #333333;
        }
        image {
            width: 18upx;
            height: 20upx;
        }
    }
}
</style>
