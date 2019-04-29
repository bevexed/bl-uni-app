<script>
export default {
    onLaunch: function() {
        console.log('App Launch');
    },
    onShow: function() {
        console.log('App Show');
    },
    onHide: function() {
        console.log('App Hide');
    }
};
</script>

<style>
/*每个页面公共css */
view,
text {
    font-family: Helvetica;
}

image {
    width: 100%;
    border-radius: 8upx;
}

.placehoder {
    font-family: 苹方 常规;
    font-weight: 400;
    font-size: 24upx;
    color: #aaa;
}

/* 强行 修改 抽屉长 */
.uni-drawer__content {
    width: 80% !important;
}

/* 修改 tag*/
.uni-tag {
    width: 100%;
    padding: 0 !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.uni-numbox:after,
.uni-numbox__value:after {
    border-color: #999 !important;
}
</style>
