<template>
	<view class="index">
		<view class="first">
			<text class="title">{{ title }}</text>
			<!-- <search @search="toSearch($event, 0)" :show="false" placeholder="搜索商品名"></search> -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
				<swiper-item v-for="(banner, index) in banners">
					<view class="swiper-item" :key="index"><img :src="banner" alt=""/></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="second">
			<view class="top"><img src="../../static/1.png" alt=""/></view>

			<view class="bottom">
				<view class="title">3th March 2019</view>
				<view class="content">
					<view class="left"><img src="" alt=""/></view>
					<view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import search from '../../components/mehaotian-search/mehaotian-search.vue';

	export default {
		components: {
			search
		},
		data() {
			return {
				title: 'SINOTY',
				banners: ['../../static/1.png', '../../static/1.png', '../../static/1.png']
			};
		},
		onLoad() {
			this.getdata();
		},
		methods: {
			toSearch(e, val) {
				console.log(e, val);
				this['val' + val] = e;
			},
			getdata() {
				uni.request({
					url: 'http://admin.xingyiguan.cn/api/login/get_user', //仅为示例，并非真实接口地址。
					method: 'post',
					data: {
						name: 'name',
						age: 18
					},
					success(res) {
						console.log(res.data);
					}
				});
			}
		}
	};
</script>

<style>
	.uni-swiper-dot-active {
		width: 46 upx !important;
	}
</style>

<style lang="less" scoped>
	.index {
		margin: 0 30 upx;

		.first {
			.title {
				display: block;
				margin-top: 20 upx;
				text-align: center;
				font-size: 72 upx;
				color: #333333;
				font-weight: bold;
			}

			.swiper {
				width: 690 upx;
				margin: 40 upx auto 0;
				height: 966 upx;
				overflow: hidden;

				img {
					width: 100%;
				}
			}
		}

		.second {
			.top {
				width: 690 upx;
				height: 400 upx;
				overflow: hidden;
				margin: 40 upx auto;

				img {
					width: 100%;
				}
			}

			.bottom {
				.title {
					text-align: right;
					color: #999999;
					font-family: 'Helvetica';
					font-size: 24 upx;
				}
			}
		}
	}
</style>
