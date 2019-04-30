<template>
    <view class="account-cart">
        <view class="title">结算付款</view>

        <!-- 地址 -->
        <view class="address">
            <view class="label">
                收货地址
                <text>（0/10）</text>
            </view>
            <view class="add-new-address">
                <image src="../static/icon/add.png" mode=""></image>
                <text>添加新地址</text>
            </view>
        </view>
        
        <!-- 商品信息 -->
        <view class="goods">
            
        </view>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.account-cart {
    padding: 0 $white-space;
    .title {
        color: #333;
        font-size: 32upx;
        font-weight: 500;
        text-align: center;
        border-bottom: 2upx solid #eeeeee;
        padding: 12upx $white-space 24upx;
    }

    .address {
        display: flex;
        justify-content: space-between;
        border-bottom: 2upx solid #eeeeee;
        padding: $white-space;
        .label {
            font-size: 28upx;
            text {
                font-size: 20upx;
                color: #999;
            }
        }

        .add-new-address {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28upx;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #333;
        }

        image {
            width: 34upx;
            height: 34upx;
            margin-right: 10upx;
        }
    }
    
    .goods{
        
    }
}
</style>
