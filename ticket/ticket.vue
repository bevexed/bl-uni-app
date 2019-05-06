<template>
    <view class="ticket">
        <view :class="['ticket', { active: ticketList.length === 0 }]">
            <view class="label">
                已存信息
                <text>（{{ ticketList.length }}/10）</text>
            </view>
        </view>

        <!--已存在的收货地址-->
        <view :class="['select-ticket', { active: showMoreticket }]">
            <view :class="['ticket-detail', { active: ticket.default }]" v-for="(ticket, i) in ticketList" :key="i">
                <!-- <image class="gou" src="../static/icon/gou.svg" mode=""></image> -->
                <view class="header">
                    <view class="label">企业名称：</view>
                    <view class="value">千讯智能科技有限公司</view>
                    <text class="type">普票</text>
                </view>

                <view class="content">
                    <view class="label">企业税号：</view>
                    <view class="value">QYSH9473725596743839</view>
                </view>
                
                 <view class="content">
                    <view class="label">注册电话：</view>
                    <view class="value">158 **** 8888</view>
                </view>

                <view class="footer">
                    <view class="default" v-if="ticket.default">默认信息</view>
                    <view class="set-default" v-else>
                        <view :class="['select', { active: ticket.default }]" @tap="selectticket(i)"><view class="selected"></view></view>
                        <text>设为默认信息</text>
                    </view>
                    <view class="empty" v-else></view>
                    <view class="icon">
                        <image src="../static/icon/edit.svg" mode=""></image>
                        <image src="../static/icon/del2.svg" mode=""></image>
                    </view>
                </view>
            </view>
        </view>

        <view class="button" @tap="toAddticket">
            <image src="../static/icon/addw.png" mode=""></image>
            <text>添加开票信息</text>
        </view>
        <view class="white-space"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 列表
            ticketList: [
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
            // 查看更多状态
            showMoreticket: true
        };
    },
    methods: {
        selectticket(i) {
            this.ticketList.map(ticket => {
                ticket.default = false;
            });

            this.ticketList[i].default = true;
        },
        toAddticket() {
            uni.navigateTo({
                url: 'add-ticket'
            });
        }
    }
};
</script>

<style lang="scss">
.ticket {
    padding: $white-space;
    .ticket {
        display: flex;
        justify-content: space-between;
        padding: $white-space 0;

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

    .select-ticket {
        margin: 17upx 0;
        max-height: 270upx;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        &.active {
            max-height: 5400upx;
        }

        .ticket-detail {
            position: relative;
            padding: 32upx 0 18upx 32upx;
            margin-bottom: 24upx;
            border-radius: 8upx;
            font-size: 24upx;
            color: #333;
            overflow: hidden;
            box-shadow: -2upx 4upx 20upx 0 rgba(0, 0, 0, 0.2);

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
        }

        .content {
            display: flex;
            margin-bottom: 34upx;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 2upx solid #eeeeee;
            padding-top: 16upx;
        }

        .label {
            width: 22%;
        }

        .value {
            flex-grow: 1;
        }

        .type {
            color: $theme-color;
            margin-right: 30upx;
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
