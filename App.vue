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
</style>
