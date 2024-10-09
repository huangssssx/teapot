<template>
  <div class="content" ref="content">

    <uni-nav-bar dark :fixed="true" class="nav-bar" status-bar @clickLeft="back" ref="navBar">
      <block slot="left" class="left-container">
        <image class="icon" :src="`${img_prefix}/navigate/home/img_nav_logo@1x.png`" mode="heightFix">
        </image>
      </block>
    </uni-nav-bar>
    <div class="mod" ref="mod">
      <div class="header" @click="goSearchPage">
        <image class="icon-search" :src="`${img_prefix}/c-home/img_0.png`" />
        <text class="search">搜索商品</text>
      </div>
      <div class="wrapper"><text class="share">分享</text></div>
    </div>

    <div class="body" ref="bodyWrapper" id="bodyWrapper">
      <div class="collapse">
        <t-collapse :defaultValue="[currentLv1Index]" expandMutex :expandIcon="false" @change="collapsChangeHandler">
          <t-collapse-panel :header="item_lv1.name" :value="index" :expandIcon="false" :key="index"
            v-for="(item_lv1, index) in categorys">
            <div v-if="currentLv1Index == index" slot="header-left-icon" class="header-left-icon"></div>
            <div :data-lv1="item_lv1.name" :data-index="index" class="category-lv2" :key="index"
              v-for="(item, index) in item_lv1.subcategories" @click="scrollToContent">
              {{ item.name }}
            </div>
          </t-collapse-panel>
        </t-collapse>
      </div>
      <scroll-view scroll-y scroll-with-animation :scroll-into-view="target" class="box-container"
        :style="{ height: bodyWrapperHeight + 'px' }">
        <div class="box-panel" :id="`box-${index}`" :key="index" v-for="(item, index) in bodyData">
          <div class="box-title" :id="`box-title-${index}`">
            {{ item.name }}
          </div>
          <div class="box-inner-container">
            <div class="box-item" :data-SearchType="item2.Searchtype" :key="index"
              v-for="(item2, index) in item.subcategories" @click="() => jumpToSearchResultPage(item2)">
              <span class="box-item-name">{{ item2.name }}</span>
              <image class="box-item-image" :src="item2.image_url"></image>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { httpRequest } from "@/utils/http.js";
export default {
  components: {},
  data() {
    return {
      currentLv1Index: 0,
      target: "box-title-0",
      bodyWrapperHeight: 0,
      title: "Hello",
      swiperItems: [],
      img_prefix: this.globalProperties.img_prefix,
      categorys: [
        // {
        //   name: "紫砂壶",
        //   subcategories: [
        //     {
        //       name: "壶型",
        //       subcategories: [
        //         {
        //           name: "圆器",
        //           image_url: "http://47.113.96.167/images/03.png",
        //         },
        //         {
        //           name: "方器花器",
        //           image_url: "http://47.113.96.167/images/03.png",
        //         },
        //         {
        //           name: "提梁",
        //           image_url: "http://47.113.96.167/images/03.png",
        //         },
        //         {
        //           name: "仿古",
        //           image_url: "http://47.113.96.167/images/03.png",
        //         },
        //         {
        //           name: "树瘿壶",
        //           image_url: "http://47.113.96.167/images/03.png",
        //         },
        //       ],
        //     },

      ],

      bodyData: [],
    };
  },
  async onLoad() {

  },
  onReachBottom() { },
  async mounted() {
    // this.bodyWrapperHeight = window.innerHeight - this.$refs.navBar.height -

    const res = await httpRequest({
      url: "/api/categories",
      method: "GET",
    });

    this.categorys = res?.data?.data?.categories || [];
    const query = wx.createSelectorQuery();
    query.select("#bodyWrapper").boundingClientRect();
    query.exec((res) => {
      const bodyWrapperHeight = res[0].height;
      this.bodyWrapperHeight = bodyWrapperHeight;
    });
    this.getLv2(this.categorys[0].name);
  },
  methods: {
    jumpToSearchResultPage(item) {
      const { Searchtype, name } = item;
      uni.navigateTo({
        url: `/pages/searchResult/index?searchType=${Searchtype}&searchField=${name}`,
      });
    },
    goSearchPage() {
      uni.navigateTo({
        url: "/pages/search/index",
      });
    },
    scrollToContent(event) {
      const { index, lv1 } = event.currentTarget.dataset;
      if (this.currentLv1 !== lv1) {
        this.currentLv1 = lv1;
        this.getLv2(lv1);
      }

      this.target = `box-title-${index}`;
    },
    getLv2(lv1) {
      if (!this.categorys || this.categorys.length === 0) {
        return [];
      }

      const lv2Content = this.categorys.find((item) => item.name === lv1);

      this.bodyData = lv2Content.subcategories || [];
    },
    getContentId(parentIndex, subcategoryIndex) {
      return `content-${parentIndex}-${subcategoryIndex}`;
    },
    collapsChangeHandler(value) {
      this.currentLv1Index = value.detail?.value[0] || 0;
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
  /* background: #f5f7fa; */
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;

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
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: 50rpx;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-self: flex-start;
      width: 558rpx;
      padding: 16rpx 24rpx;
      background-color: rgba(245, 247, 250, 1);
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

  .body {
    display: flex;
    flex-direction: row;
    flex: 1;
    width: 100%;

    .collapse {
      width: 250rpx;
      height: 100%;
      background: #f5f7fa;
      --td-collapse-panel-bg-color: #f5f7fa;

      .header-left-icon {
        position: absolute;
        width: 6rpx;
        height: 32rpx;
        background: #e1560a;
      }

      .category-lv1 {
        font-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 500;
        font-size: 28rpx;
        color: #131824;
        line-height: 88rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;

        width: 6rpx;
        height: 32rpx;
        background: #e1560a;
      }

      .category-lv2 {
        font-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 500;
        font-size: 28rpx;
        color: #131824;
        line-height: 88rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .box-container {
      overflow-y: auto;
      width: calc(100% - 250rpx);
      height: 100%;
      padding: 0 16rpx 0 16rpx;
      box-sizing: border-box;
      /* background-color:red; */

      .box-panel {
        width: 100%;
        margin-bottom: 24rpx;

        .box-title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0rpx 24rpx;
          box-sizing: border-box;
          width: 100%;
          height: 88rpx;
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 600;
          font-size: 28rpx;
          color: #939598;
          line-height: 40rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .box-inner-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16rpx;
          width: 100%;

          .box-item {
            position: relative;
            width: 236rpx;
            height: 236rpx;
            background: #f5f7fa;
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            box-sizing: border-box;

            .box-item-name {
              position: absolute;
              top: 24rpx;
              left: 32rpx;
              z-index: 1;
              writing-mode: vertical-lr;
              text-orientation: upright;
              font-family: Source Han Serif CN;
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
              letter-spacing: 5px;
              /* 调整字间距为 5px */
              /* font-variation-settings: "opsz" auto;
              font-feature-settings: "kern" on; */
              color: #131824;
              /* text-combine-upright: all; */
            }

            .box-item-image {
              z-index: 0;
              position: absolute;
              bottom: 0;
              right: 0;
              width: 192rpx;
              height: 192rpx;
            }
          }
        }
      }
    }
  }
}
</style>
