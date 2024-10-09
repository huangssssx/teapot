<template>
  <div class="content" ref="content">
    <uni-nav-bar
      dark
      :fixed="true"
      class="nav-bar"
      status-bar
      @clickLeft="back"
      ref="navBar"
    >
      <block slot="left" class="left-container">
        <image
          class="icon"
          :src="`${img_prefix}/navigate/home/img_nav_logo@1x.png`"
          mode="heightFix"
        >
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
    <liuyuno-tabs
      :tabData="tabs"
      :blw="24"
      :defaultIndex="defaultIndex"
      @tabClick="tabClick"
      style="height: 90rpx"
    />
    <div class="body" ref="bodyWrapper" id="bodyWrapper">
      <MyWaterfallsFlow
        class="waterfalls-flow-wrapper"
        :items="tabDatas[0]"
        @imageClick="goToDetailPage"
        v-show="tabIndex === 0"
      >
      </MyWaterfallsFlow>
      <GrapText
        v-show="tabIndex === 1"
        class="grap-text"
        :grapTextData="tabDatas[1]"
      ></GrapText>
    </div>
  </div>
</template>

<script>
import MyWaterfallsFlow from "./components/my-waterfalls-flow/index.vue";
import GrapText from "./components/grap-text/index.vue";
export default {
  components: { MyWaterfallsFlow, GrapText },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      tabs: ["上新推荐", "紫砂壶", "茶叶", "茶杯茶碗", "装饰摆件"],
      tabIndex: 1,
      tabDatas: [
        [
          {
            img_url: "http://47.113.96.167/images/01.png",
            title: "hello",
            author: "",
            doc_id: "1",
            saved: false,
            saved_num: 999,
          },
          {
            img_url: "http://47.113.96.167/images/01.png",
            title: "",
            author: "",
            doc_id: "",
            saved: false,
            saved_num: 999,
          },
        ],
        {
          banner: {
            img_url: "http://47.113.96.167/teapot/c-home/pot-world/img_0.png",
            title: "历史文化中的茶壶",
            author: "张三",
            doc_id: "123",
            create_time: "2024-04-12 12:00:00",
          },
          date_list: [
            {
              img_url: "http://47.113.96.167/images/02.png",
              title: "古老茶壶的故事",
              account: "古老茶壶的故事古老茶壶的故事古老茶壶的故事",
              author: "李四",
              doc_id: "456",
              create_time: "2024-04-12 12:00:00",
            },
            {
              img_url: "http://47.113.96.167/images/03.png",
              title: "传统茶壶工艺",
              account: "古老茶壶的故事古老茶壶的故事古老茶壶的故事",
              author: "王五",
              doc_id: "789",
              create_time: "2024-04-12 12:00:00",
            },
          ],
        },
      ],
    };
  },
  async onLoad() {},
  onReachBottom() {},
  async mounted() {},
  methods: {
    tabClick(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/vars.scss";
@import "~@/mixin.scss";
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #f5f7fa; */

  min-height: 100vh;
  width: auto;
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
    margin-bottom: 50rpx;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-self: flex-start;
      width: 558rpx;
      padding: 16rpx 24rpx;
      background-color: rgba(255, 255, 255, 1);
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
    margin-top: 24rpx;
    @include box-size($padding: 0rpx 24rpx);

    display: flex;
    flex-direction: row;
    flex: 1;
    width: 100%;

    .waterfalls-flow-wrapper {
      width: 100%;
    }
    .grap-text {
      width: 100%;
    }
  }
}
</style>
