<template>
    <view class="clipper">
        <canvas canvas-id="clipper" disable-scroll="true" class="canvas" @touchstart="start" @touchmove="move" @touchend="end" @touchcancel=""></canvas>
        <view class="title">Coordinates: ({{ mouseX }}, {{ mouseY }})</view>

        <view class="sure" @tap="upload">确认图片</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 画布

            // 视口
            windowWidth: 0,
            windowHeight: 0,

            // 鼠标
            mouseX: 0,
            mouseY: 0,

            // 图片距离鼠标距离
            offsetX: 0,
            offsetY: 0,

            // 图片
            imgUrl: '',
            realHeight: 0,
            realWidth: 0,
            imgWidth: 0,
            imgHeight: 0,

            // 选择 区域
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 100,
            width: 0,
            height: 0,

            // 选择器
            // 两侧留白
            margin: 8,
            // 长短
            long: 30,

            // 是否允许改变大小
            onSizeChange: false,
            // 单一控制 可以改变大小的控制器
            leftTop: false,
            rightTop: false,
            leftBottom: false,
            rightBottom: false,

            hidden: false
        };
    },
    methods: {
        back() {
            uni.redirectTo({
                url: '../fitting/fitting'
            });
        },
        // 获取 图片信息
        getImageInfo(imgUrl) {
            return new Promise(resolve => {
                uni.getImageInfo({
                    src: imgUrl,
                    success(res) {
                        resolve(res);
                    }
                });
            });
        },

        async init(e) {
            // 获取图像路径
            this.imgUrl = '/static/imgs/fitting/8.jpg';

            this.context = uni.createCanvasContext('clipper');

            // 设置画布宽高
            let _this = this;
            uni.getSystemInfo({
                success: res => {
                    _this.windowHeight = res.windowHeight;
                    _this.windowWidth = res.windowWidth;
                }
            });

            // 绘制
            this.clearRect();
            await this.drawImg(this.imgUrl);
            this.drawRect();
            this.drawSelect();

            // 绘制 选择 区域
            console.log(this.imgWidth, this.imgHeight, this.windowWidth, this.windowHeight);
            this.context.draw();
        },

        // 绘制图片
        async drawImg(imgUrl) {
            // 获取 原图像 数据
            let imgInfo = await this.getImageInfo(imgUrl);
            let { height, width } = imgInfo;
            this.realWidth = width;
            this.realHeight = height;
            // 计算 图片 宽高
            // 宽相等 结果越大 说明 height 越小
            if (width / height > this.windowWidth / this.windowHeight) {
                this.imgWidth = this.windowWidth;
                this.imgHeight = (this.windowWidth * height) / width;
            } else {
                this.imgHeight = this.windowHeight;
                this.imgWidth = (this.windowHeight * width) / height;
            }

            // 绘制图片
            this.context.drawImage(imgUrl, 0, 0, this.imgWidth, this.imgHeight);
        },

        // 绘制选择 区域
        async drawRect() {
            let { x1, y1, x2, y2, windowWidth, windowHeight, context, imgUrl, imgHeight, imgWidth, realWidth, realHeight } = this;
            // 绘制灰色区域
            context.setFillStyle('rgba(0,0,0,.3)');
            context.fillRect(0, 0, 10000, 10000);

            // 绘制 选择 区域
            this.context.drawImage(
                imgUrl,
                (x1 * realWidth) / imgWidth,
                (y1 * realHeight) / imgHeight,
                realWidth * ((x2 - x1) / imgWidth),
                realHeight * ((y2 - y1) / imgHeight),
                x1,
                y1,
                x2 - x1,
                y2 - y1
            );
        },

        // 绘制 大小控制器

        drawSelect() {
            let { context, x1, x2, y1, y2, margin, long } = this;

            context.setLineWidth(5);
            context.setLineCap('round');
            context.setStrokeStyle('white');
            context.setLineJoin('round');

            // 左上
            context.beginPath();
            context.moveTo(x1 + long, y1 - margin);
            context.lineTo(x1 - margin, y1 - margin);
            context.lineTo(x1 - margin, y1 + long);
            context.stroke();

            // 右上
            context.beginPath();
            context.moveTo(x2 - long, y1 - margin);
            context.lineTo(x2 + margin, y1 - margin);
            context.lineTo(x2 + margin, y1 + long);
            context.stroke();

            // 左下
            context.beginPath();
            context.moveTo(x1 + long, y2 + margin);
            context.lineTo(x1 - margin, y2 + margin);
            context.lineTo(x1 - margin, y2 - long);
            context.stroke();

            // 右下
            context.beginPath();
            context.moveTo(x2 - long, y2 + margin);
            context.lineTo(x2 + margin, y2 + margin);
            context.lineTo(x2 + margin, y2 - long);
            context.stroke();
        },

        // 清除 绘画
        clearRect() {
            let { x1, y1, x2, y2, windowWidth, windowHeight } = this;
            // 绘制灰色区域
            this.context.clearRect(0, 0, 10000, 10000);
        },

        async start(e) {
            let { x1, y1, x2, y2, windowWidth, windowHeight, margin, onSizeChange, leftTop } = this;
            this.mouseX = e.touches[0].x;
            this.mouseY = e.touches[0].y;

            // 检测 鼠标位置
            if (x1 < this.mouseX && this.mouseX < x2 && (y1 < this.mouseY && this.mouseY < y2)) {
                // 此时 鼠标在 选则区域内
                this.offsetX = this.mouseX - x1;
                this.offsetY = this.mouseY - y1;
                this.width = x2 - x1;
                this.height = y2 - y1;
                return;
            }

            // 鼠标在 左上选择框内
            if (x1 - margin * 2 < this.mouseX && this.mouseX < x1 && y1 - margin * 2 < this.mouseY && this.mouseY < y1) {
                this.onSizeChange = true;
                this.leftTop = true;
                return;
            }

            // 鼠标在 右上选择框内
            if (x2 < this.mouseX && this.mouseX < x2 + margin * 2 && y1 - margin * 2 < this.mouseY && this.mouseY < y1) {
                this.onSizeChange = true;
                this.rightTop = true;
                return;
            }

            // 鼠标在 左下选择框内
            if (x1 - margin * 2 < this.mouseX && this.mouseX < x1 && y2 + margin * 2 > this.mouseY && this.mouseY > y2) {
                this.onSizeChange = true;
                this.leftBottom = true;
                return;
            }

            // 鼠标在 右下选择框内
            if (x2 < this.mouseX && this.mouseX < x2 + margin * 2 && y2 + margin * 2 > this.mouseY && this.mouseY > y2) {
                this.onSizeChange = true;
                this.rightBottom = true;
                return;
            }
        },
        async move(e) {
            let {
                x1,
                y1,
                x2,
                y2,
                windowWidth,
                windowHeight,
                offsetX,
                offsetY,
                width,
                height,
                long,
                margin,
                onSizeChange,
                leftTop,
                rightTop,
                leftBottom,
                rightBottom,
                mouseX,
                mouseY
            } = this;
            this.mouseX = e.touches[0].x;
            this.mouseY = e.touches[0].y;

            // 检测 鼠标位置
            // 鼠标在 选则区域内
            if (!onSizeChange && x1 < this.mouseX && this.mouseX < x2 && (y1 < this.mouseY && this.mouseY < y2)) {
                this.x1 = this.mouseX - offsetX;
                this.x2 = this.x1 + width;

                this.y1 = this.mouseY - offsetY;
                this.y2 = this.y1 + height;

                //                 // 限制 选取 位置
                //                 // 左
                //                 if (x1 < 2 * margin) {
                //                     this.x1 = 2 * margin;
                //                     this.x2 = this.x1 + width;
                //                     if (this.mouseX > mouseX) {
                //                         return;
                //                     }
                //                 }
                //                 // 右
                //                 if (x2 > windowWidth + 2 * margin) {
                //                     this.x2 = windowWidth - 2 * margin;
                //                     this.x1 = this.x2 - width;
                //                     if (this.mouseX < mouseX) {
                //                         return;
                //                     }
                //                 }
                //
                //                 // 上
                //                 if (y1 < 2 * margin) {
                //                     this.y1 = 2 * margin;
                //                     this.y2 = this.y1 + height;
                //                     if (this.mouseY > mouseY) {
                //                         return;
                //                     }
                //                 }
                //                 // 下
                //                 if (y2 > windowHeight + 2 * margin) {
                //                     this.y2 = windowHeight - 2 * margin;
                //                     this.y1 = this.y2 - height;
                //                     if (this.mouseY < mouseY) {
                //                         return;
                //                     }
                //                 }
            }

            // 鼠标在选择框内
            // 左上
            if (leftTop) {
                this.x1 = this.mouseX;
                this.y1 = this.mouseY;
            }
            // 右上
            if (rightTop) {
                this.x2 = this.mouseX;
                this.y1 = this.mouseY;
            }

            // 左下
            if (leftBottom) {
                this.x1 = this.mouseX;
                this.y2 = this.mouseY;
            }

            // 右下
            if (rightBottom) {
                this.x2 = this.mouseX;
                this.y2 = this.mouseY;
            }

            // 限制 选取大小
            if (x2 - x1 < 2 * long || y2 - y1 < 2 * long || x1 < 0 || x2 > windowWidth || y1 < 0 || y2 > windowHeight) {
                this.onSizeChange = false;
            }

            await this.drawImg(this.imgUrl);
            this.drawRect();
            this.drawSelect();
            this.context.draw();
        },
        async end(e) {
            this.onSizeChange = false;
            this.leftTop = false;
            this.rightTop = false;
            this.leftBottom = false;
            this.rightBottom = false;
        },

        upload() {
            let {
                x1,
                y1,
                x2,
                y2,
                windowWidth,
                windowHeight,
                offsetX,
                offsetY,
                width,
                height,
                long,
                margin,
                onSizeChange,
                leftTop,
                rightTop,
                leftBottom,
                rightBottom,
                mouseX,
                mouseY
            } = this;
            
            uni.canvasToTempFilePath({
                x: x1,
                y: y1,
                width: x2-x1,
                height: y2-y1,
                destWidth: x2-x1,
                destHeight: y2-y1,
                canvasId: 'clipper',
                success: function(res) {
                    console.log(res.tempFilePath);
                }
            });
        }
    },

    onReady: function(e) {
        this.init();
    }
};
</script>

<style lang="scss">
.clipper {
    .canvas {
        width: 750upx;
        height: 100vh;
    }

    .sure {
        position: fixed;
        bottom: 90upx;
        text-align: center;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 700upx;
        height: 80upx;
        border-radius: 8upx;
        line-height: 80upx;
        color: #fff;
        font-size: 28upx;
        background: rgba(255, 255, 255, 0.3);
    }
}
</style>
