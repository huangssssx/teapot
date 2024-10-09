<template>
  <div class="content" ref="content">
    <uni-nav-bar dark :fixed="true" class="nav-bar" status-bar @clickLeft="back">
      <block slot="left" class="left-container">
        <image class="icon" :src="`${img_prefix}/navigate/home/img_nav_logo@1x.png`" mode="heightFix">
        </image>
      </block>
    </uni-nav-bar>
    <div class="mod">
      <div class="header" @click="goSearchPage">
        <image class="icon-search" :src="`${img_prefix}/c-home/img_0.png`" />
        <text class="search">搜索商品</text>
      </div>
      <div class="wrapper"><text class="share">分享</text></div>
      <div class="body">
        <Xsuu-swiper :swiperItems="swiperItems"></Xsuu-swiper>
      </div>
      <div class="footer">
        <div class="group">
          <div class="view" @click="goCategoryPage('最新品')">
            <image class="icon-guard" :src="`${img_prefix}/c-home/01.png`" moda="aspectFit" />
            <text class="tag">最新品</text>
          </div>
          <div class="view" @click="goCategoryPage('紫砂')">
            <image class="icon-guard" :src="`${img_prefix}/c-home/02.png`" moda="aspectFill" />
            <text class="tag">紫砂</text>
          </div>
          <div class="view" @click="goCategoryPage('茶具')">
            <image class="icon-guard" :src="`${img_prefix}/c-home/03.png`" moda="aspectFit" />
            <text class="tag">茶具</text>
          </div>
          <div class="view" @click="goCategoryPage('茶叶')">
            <image class="icon-guard" :src="`${img_prefix}/c-home/04.png`" moda="aspectFit" />
            <text class="tag">茶叶</text>
          </div>
          <div class="view" @click="goCategoryPage('养生')">
            <image class="icon-guard" :src="`${img_prefix}/c-home/05.png`" moda="aspectFit" />
            <text class="tag">养生</text>
          </div>
        </div>
      </div>
    </div>

    <ThemeBlock style="width: 100%" title="壶中天地" moreLabel="荆溪品茗" moreUrl="/pages/searchResult/index?category=荆溪品茗">
      <PotWorldPanel></PotWorldPanel>
    </ThemeBlock>

    <ThemeBlock style="width: 100%; margin-top: 16rpx" title="紫气东来" moreLabel="阳羡群贤" moreUrl="/pages/yxQx/index">
      <PurpleAirEast></PurpleAirEast>
    </ThemeBlock>

    <ThemeBlock style="width: 100%; margin-top: 16rpx" title="知壶者也" moreLabel="蜀山逸事" moreUrl="/pages/error/index">
      <KnowsPot></KnowsPot>
    </ThemeBlock>

    <ThemeBlock style="width: 100%; margin-top: 16rpx" title="洞天福地" moreLabel="壶之欲出" moreUrl="/pages/error/index">
      <Fairyland></Fairyland>
    </ThemeBlock>

    <ThemeBlock style="width: 100%; margin-top: 16rpx" title="一壶一世界" backgroundColor="#F5F7FA;">
      <APotAWorld ref="aPotAWorld"></APotAWorld>
    </ThemeBlock>

    <CartServiceFloating :items="['top','cart', 'service']"></CartServiceFloating>
  </div>
</template>

<script>
import XsuuSwiper from "@/components/Xss-swiper/Xsuu-swiper.vue";
import ThemeBlock from "./components/ThemeBlock.vue";
import PotWorldPanel from "./components/PotWorldPanel.vue";
import PurpleAirEast from "./components/PurpleAirEast.vue";
import KnowsPot from "./components/KnowsPot.vue";
import Fairyland from "./components/Fairyland.vue";
import APotAWorld from "./components/APotAWorld.vue";
import CartServiceFloating from "@/components/floating/index.vue";

import { httpRequest } from "@/utils/http.js";
export default {
  components: {
    XsuuSwiper,
    ThemeBlock,
    PotWorldPanel,
    PurpleAirEast,
    KnowsPot,
    Fairyland,
    APotAWorld,
    CartServiceFloating,
  },
  data() {
    return {
      title: "Hello",
      swiperItems: [],
      img_prefix: this.globalProperties.img_prefix,
    };
  },
  onLoad() {
    wx.login({
      success: res => {
        console.log(res)
      }
    })
  },
  onReachBottom() {
    this.$refs.aPotAWorld.requestData();
  },
  mounted() {
    this.requestBannerData();
  },
  methods: {
    goCategoryPage(category = "商品") {
      uni.navigateTo({
        url: `/pages/searchResult/index?category=${category}`,
      });
    },
    goSearchPage() {
      uni.navigateTo({
        url: "/pages/search/index",
      });
    },
    requestBannerData() {
      console.log("initBanner", httpRequest);
      httpRequest({
        url: "/bannerview",
        method: "GET",
      })
        .then((res) => {
          this.swiperItems = (res.data || []).map((item) => ({
            img: item.galleryList?.[0] || "",
            title: "",
            Subtitle: "",
            tip: "",
            url: "111",
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/vars.scss";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;

  .nav-bar {
    .icon {
      min-width: 258rpx;
      height: 100%;
      // padding: 0rpx 0rpx 14rpx 32rpx;
      margin: 0rpx 0rpx 14rpx 20rpx;
    }

    .left-container {
      position: relative;
      height: 60rpx;

      .icon {
        height: 100%;
      }
    }

    ::v-deep .uni-navbar__header-btns-left {
      width: 500rpx !important;
    }

    ::v-deep .uni-navbar__content {
      background: linear-gradient(to bottom, #ffdab9, #f5f7fa) !important;

      // background-color: red!important;
      .uni-navbar__header {
        background: transparent !important;
      }
    }
  }

  .mod {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 750rpx;
    padding: 24rpx 24rpx 0;
    background-color: rgba(245, 247, 250, 1);
    margin-bottom: 50rpx;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-self: flex-start;
      width: 558rpx;
      padding: 16rpx 24rpx;
      background-color: #ffffff;
      border-radius: 36rpx;
      box-sizing: border-box;
      margin-left: 24rpx;

      .icon-search {
        align-self: center;
        width: 28rpx;
        height: 28rpx;
        margin-left: 10rpx;
      }

      .search {
        align-self: center;
        margin-left: 12rpx;
        font-family: PingFang SC;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: rgba(147, 149, 152, 1);
        white-space: nowrap;
      }
    }

    .wrapper {
      position: absolute;
      display: flex;
      top: 24rpx;
      right: 20rpx;
      flex-direction: row;
      justify-content: flex-start;
      width: 144rpx;
      height: 72rpx;
      padding: 16rpx 24rpx;
      background-image: url(#{$img_prefix}/c-home/img_8.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-origin: padding-box;
      box-sizing: border-box;

      .share {
        align-self: flex-start;
        margin-left: 44rpx;
        font-family: PingFang SC;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: rgba(225, 86, 10, 1);
        white-space: nowrap;
      }
    }

    .body {
      position: relative;
      // display: flex;
      // flex-direction: row;
      // justify-content: flex-start;
      // align-self: center;
      // width: 702rpx;
      // margin-top: 32rpx;

      .entry-pic {
        align-self: flex-start;
        width: 702rpx;
        height: 468rpx;
      }

      .logo {
        position: absolute;
        left: 32rpx;
        bottom: 24rpx;
        width: 176rpx;
        height: 4rpx;
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-self: center;
      width: 702rpx;
      margin-top: 60rpx;

      .group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-self: center;
        width: 100%;
        height: 132rpx;
        margin-left: 4rpx;
        padding-top: 6rpx;

        .view {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: center;
          height: 166rpx;
          padding-top: 4rpx;

          .icon-guard {
            align-self: center;
            width: 96rpx;
            height: 96rpx;
          }

          .tag {
            align-self: center;
            margin-top: 30rpx;
            font-family: Source Han Serif CN, Source Han Serif CN;
            font-weight: 700;
            font-size: 28rpx;
            color: #131824;
            line-height: 40rpx;
            text-align: center;
            font-style: normal;
            text-transform: none;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
