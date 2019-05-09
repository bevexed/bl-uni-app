<template>
    <view class="address-book">
        <view :class="['address', { active: addressList.length === 0 }]">
            <view class="label">
                收货地址
                <text>（{{ addressList.length }}/10）</text>
            </view>
        </view>

        <!--已存在的收货地址-->
        <view :class="['select-address', { active: showMoreAddress }]">
            <view :class="['address-detail', { active: address.default }]" v-for="(address, i) in addressList" :key="i">
                <!-- <image class="gou" src="../static/icon/gou.svg" mode=""></image> -->
                <view class="header">
                    <view class="label">收件人：</view>
                    <view class="value">
                        路人甲
                        <text class="phone">139 **** 9875</text>
                    </view>
                </view>

                <view class="content">
                    <view class="label">地址：</view>
                    <view class="value">
                        浙江省 杭州市 西湖区

                        <view>西溪首座A1-1-310室</view>
                    </view>
                </view>

                <view class="footer">
                    <view class="default" v-if="address.default">默认地址</view>
                    <view class="set-default" v-else>
                        <view :class="['select', { active: address.default }]" @tap="selectAddress(i)"><view class="selected"></view></view>
                        <text>设为默认地址</text>
                    </view>
                    <view class="empty" v-else></view>
                    <view class="icon">
                        <image src="../static/icon/edit.svg" mode=""></image>
                        <image src="../static/icon/del2.svg" mode=""></image>
                    </view>
                </view>
            </view>
        </view>

        <view class="button" @tap="toAddAddress">
            <image src="../static/icon/addw.png" mode=""></image>
            <text>添加新地址</text>
        </view>
        <view class="white-space"></view>
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

            showMoreAddress: true
        };
    },
    methods: {
        selectAddress(i) {
            this.addressList.map(address => {
                address.default = false;
            });

            this.addressList[i].default = true;
        },
        toAddAddress() {
            uni.navigateTo({
                url: 'add-address'
            });
        }
    }
};
</script>

<style lang="scss">
.address-book {
    background: #f7f7f7;
    .address {
        display: flex;
        justify-content: space-between;
        padding: $white-space;

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

    .select-address {
        max-height: 270upx;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        padding: 0 $white-space;
        &.active {
            max-height: 5400upx;
        }

        .address-detail {
            position: relative;
            padding: 32upx 0 18upx 0;
            margin-bottom: 24upx;
            border-radius: 8upx;
            font-size: 24upx;
            color: #333;
            overflow: hidden;
            background: #fff;
            // border: 2upx solid #cccccc;
            box-shadow: 0upx 2upx 10upx 0 rgba(0, 0, 0, 0.1);

            //             &:before {
            //                 position: absolute;
            //                 width: 164upx;
            //                 height: 164upx;
            //                 right: -100upx;
            //                 top: -100upx;
            //                 content: '';
            //                 transform: rotate(45deg);
            //                 background: #cccccc;
            //             }
            //
            //             &.active {
            //                 &:before {
            //                     background: $theme-color;
            //                 }
            //             }

            .gou {
                z-index: 999;
                position: absolute;
                width: 32upx;
                height: 32upx;
                right: 8upx;
                top: 8upx;
                content: '';
            }
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 34upx;
            padding: 0 0 0 32upx;
        }

        .content {
            display: flex;
            margin-bottom: 34upx;
            padding: 0 0 0 32upx;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 2upx solid #eeeeee;
            padding: 16upx 0 0 32upx;
        }

        .label {
            width: 18%;
        }

        .value {
            width: 60%;
        }

        .phone {
            margin-left: 30%;
        }

        .value {
            font-weight: bold;
        }

        .icon {
            margin-right: 32upx;
            image {
                width: 32upx;
                height: 32upx;
                margin-left: 32upx;
            }
        }

        .default {
            color: $theme-color;
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

    .set-default {
        display: flex;
        text {
            margin-left: 20upx;
            color: #999;
        }
    }

    .button {
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750upx;
        height: 98upx;
        line-height: 98upx;
        text-align: center;
        font-size: 28upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #fff;
        background: $theme-color;

        image {
            width: 32upx;
            height: 32upx;
            margin-right: 20upx;
            margin-top: -4upx;
        }
    }

    .white-space {
        height: 98upx;
    }
}
</style>
