<template>
  <div class="search-bar">
    <div class="category-container" @click="toggerCategoryFilterHandler">
      <text class="category-label">综合</text>
      <div class="category-indicator" :style="{ opacity: filterStep === 0 ? 1 : 0 }" />
    </div>
    <div class="price-container" @click="toggerPriceFilterHandler">
      <text class="price-label">价格</text>
      <div class="price-sort-icons">
        <image class="icon-price-up" :class="{ 'arrow-active': filterStep === 1.0 }"
          :src="`${img_prefix}/c-home/searchResult/img_7.png`" />
        <image class="icon-price-down" :class="{ 'arrow-active': filterStep === 1.1 }"
          :src="`${img_prefix}/c-home/searchResult/img_8.png`" />
      </div>
    </div>
    <div class="new-arrival-container" @click="toggerNewFilterHandler">
      <text class="new-arrival-label">上新</text>
      <div class="new-arrival-sort-icons">
        <image class="icon-new-arrival-up" :src="`${img_prefix}/c-home/searchResult/img_9.png`"
          :class="{ 'arrow-active': filterStep === 2.0 }" />
        <image class="icon-new-arrival-down" :src="`${img_prefix}/c-home/searchResult/img_10.png`"
          :class="{ 'arrow-active': filterStep === 2.1 }" />
      </div>
    </div>
    <div class="filter-container" @click="showDrawer">
      <text class="filter-label">筛选</text>
      <!-- <image
        class="icon-filter"
        :src="`${img_prefix}/c-home/searchResult/img_11.png`"
        mode="widthFix"
      /> -->
      <div class="icon-filter"></div>
      <uni-drawer width="640rpx" ref="showRight" mode="right" :mask-click="true" class="drawer-box">
        <view class="scroll-view">
          <scroll-view class="scroll-view-box" scroll-y="true">
            <div class="primary">
              <div class="category-wrapper">
                <!-- 服务/折扣 -->
                <div class="category-container">
                  <div class="wrapper-1">
                    <div class="vertical-line" />
                    <text class="marketing">服务/折扣</text>
                  </div>
                  <div class="tag-container">
                    <div class="tag-wrapper-1" v-for="item in filterData.availability" :key="item"
                      @click="selectAvailability(item)" :class="{
                        selected: result.availability === item,
                      }">
                      <text class="tag-3">{{ item }}</text>
                    </div>
                  </div>
                </div>

                <!-- 泥料 -->
                <div class="category-container">
                  <div class="wrapper-1">
                    <div class="vertical-line" />
                    <text class="marketing">泥料</text>
                  </div>
                  <div class="tag-container">
                    <div class="tag-wrapper-1" v-for="item in filterData.clay_types" :key="item"
                      @click="selectClayType(item)" :class="{ selected: result.clay_types === item }">
                      <text class="tag-3">{{ item }}</text>
                    </div>
                  </div>
                </div>

                <!-- 容量 -->
                <div class="category-container">
                  <div class="wrapper-1">
                    <div class="vertical-line" />
                    <text class="marketing">容量</text>
                  </div>
                  <div class="tag-container">
                    <div class="tag-wrapper-1" v-for="item in filterData.volumes" :key="item"
                      @click="selectVolume(item)" :class="{ selected: result.volumes === item }">
                      <text class="tag-3">{{ item }}</text>
                    </div>
                  </div>
                </div>

                <!-- 名家 -->
                <div class="category-container">
                  <div class="wrapper-1">
                    <div class="vertical-line" />
                    <text class="marketing">名家</text>
                  </div>
                  <div class="tag-container">
                    <div class="tag-wrapper-1" v-for="item in filterData.artists" :key="item"
                      @click="selectArtist(item)" :class="{ selected: result.artist === item }">
                      <text class="tag-3">{{ item }}</text>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapper-6">
                <div class="tag-wrapper-3" @click="resetFilters">
                  <text class="tag-18">重置</text>
                </div>
                <div class="group-3" @click="confirmFilters">
                  <text class="confirm">确定</text>
                </div>
              </div>
            </div>
          </scroll-view>
        </view>
      </uni-drawer>
    </div>
  </div>
</template>
<script>
import { httpRequest } from "@/utils/http.js";
export default {
  data() {
    return {
      filterStep: 0, //当前筛选步骤
      img_prefix: this.globalProperties.img_prefix,
      filterData: {},
      result: {
        availability: null, // 服务/折扣
        clay_types: null, // 泥料
        volumes: null, // 容量
        artist: null, // 名家
      },
    };
  },
  mounted() {
    this.fetchFilterOptions();
  },
  methods: {
    selectAvailability(item) {
      this.result.availability = item;
    },
    selectClayType(item) {
      this.result.clay_types = item;
    },
    selectVolume(item) {
      this.result.volumes = item;
    },
    selectArtist(item) {
      this.result.artist = item;
    },
    resetFilters() {
      // 重置所有选中的分类
      this.result.availability = null;
      this.result.clay_types = null;
      this.result.volumes = null;
      this.result.artist = null;
    },
    confirmFilters() {
      console.log("Selected Availability:", this.result.availability);
      console.log("Selected Clay Type:", this.result.clay_types);
      console.log("Selected Volume:", this.result.volumes);
      console.log("Selected Artist:", this.result.artist);
      this.$emit("confirmFilters", this.result);
      this.closeDrawer();
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    async fetchFilterOptions() {
      const res = await httpRequest({
        url: "/api/filter-options",
        method: "GET",
      });

      this.filterData = res.data || {};
      console.log("##########################搜索条件：", this.filterData);
    },
    toggerCategoryFilterHandler() {
      this.filterStep = 0;
      this.$emit("orderChange", { orderBy: "category", sortOrder: "ASC" });
    },
    toggerPriceFilterHandler(event) {
      event.stopPropagation();
      if (parseInt(this.filterStep) !== 1 || this.filterStep === 1.1) {
        this.filterStep = 1.0;
        this.$emit("orderChange", { orderBy: "price", sortOrder: "ASC" });
      } else if (this.filterStep === 1.0) {
        this.filterStep = 1.1;
        this.$emit("orderChange", { orderBy: "price", sortOrder: "DESC" });
      }
    },
    toggerNewFilterHandler(event) {
      event.stopPropagation();
      if (parseInt(this.filterStep) !== 2 || this.filterStep === 2.1) {
        this.filterStep = 2.0;
        this.$emit("orderChange", { orderBy: "newest", sortOrder: "ASC" });
      } else if (this.filterStep === 2.0) {
        this.filterStep = 2.1;
        this.$emit("orderChange", { orderBy: "newest", sortOrder: "DESC" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/vars.scss";

.search-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: center;
  width: 750rpx;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0;

  .category-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 192rpx;
    height: 88rpx;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0;
    box-sizing: border-box;

    .category-label {
      align-self: center;
      overflow: hidden;
      max-width: 136rpx;
      margin-right: 4rpx;
      font-family: SourceHanSerifCN-Bold;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: rgba(19, 24, 36, 1);
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .category-indicator {
    opacity: 1;
    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: 0rpx;
    width: 24rpx;
    height: 4rpx;
    background-color: rgba(225, 86, 10, 1);
    border-radius: 0;
    position: absolute;
    bottom: 0rpx;
    width: 24rpx;
    height: 4rpx;
    background-color: rgba(225, 86, 10, 1);
    border-radius: 0;
  }

  .price-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 192rpx;
    height: 88rpx;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0;
    box-sizing: border-box;

    .price-label {
      align-self: center;
      margin-left: 24rpx;
      font-family: SourceHanSerifCN-Medium;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      color: rgba(147, 149, 152, 1);
      white-space: nowrap;
    }

    .price-sort-icons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: center;
      height: 38rpx;
      padding: 5rpx 0px 0rpx 0rpx;
      margin-left: 14rpx;

      .icon-price-up {
        align-self: center;
        width: 16rpx;
        height: 8rpx;
      }

      .icon-price-down {
        align-self: center;
        width: 16rpx;
        height: 8rpx;
        margin-top: 8rpx;
      }
    }
  }

  .new-arrival-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 192rpx;
    height: 88rpx;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0;
    box-sizing: border-box;

    .new-arrival-label {
      align-self: center;
      margin-left: 24rpx;
      font-family: SourceHanSerifCN-Medium;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      color: rgba(147, 149, 152, 1);
      white-space: nowrap;
    }

    .new-arrival-sort-icons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: center;
      height: 38rpx;
      padding: 5rpx 0rpx 0rpx 0rpx;
      margin-left: 14rpx;

      .icon-new-arrival-up {
        align-self: center;
        width: 16rpx;
        height: 8rpx;
      }

      .icon-new-arrival-down {
        align-self: center;
        width: 16rpx;
        height: 8rpx;
        margin-top: 8rpx;
      }
    }
  }

  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 174rpx;
    height: 88rpx;

    .filter-label {
      align-self: center;
      margin-left: 32rpx;
      font-family: SourceHanSerifCN-Medium;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
      color: rgba(147, 149, 152, 1);
      white-space: nowrap;
    }

    .icon-filter {
      align-self: center;
      width: 20rpx !important;
      height: 25rpx !important;
      margin: 0rpx 0 0 12rpx;
      /* ${img_prefix}/c-home/searchResult/img_11.png` */
      background-image: url(#{$img_prefix}/c-home/searchResult/img_11.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-origin: padding-box;
      opacity: 0.5;
    }
  }

  .sort-icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow-active {
    filter: invert(32%) sepia(90%) saturate(1522%) hue-rotate(2deg) brightness(94%) contrast(92%);
  }
}

.scroll-view {
  /* #ifndef APP-NVUE */
  width: 100%;
  height: 100%;
  /* #endif */
  flex: 1;
}

// 处理抽屉内容滚动
.scroll-view-box {
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.primary {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  padding: 0rpx 0rpx 0rpx 20rpx;
  box-sizing: border-box;

  .category-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 200rpx);
    overflow-y: auto;
    overflow-x: hidden;

    .category-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
      width: 100%;
      height: auto;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 0;

      .wrapper-1 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-self: center;
        width: 100%;
        padding: 20rpx 18rpx 24rpx;
        margin-top: 12rpx;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0;

        .vertical-line {
          align-self: center;
          width: 8rpx;
          height: 32rpx;
          margin-top: 4rpx;
          background-color: rgba(225, 86, 10, 1);
          border-radius: 0;
        }

        .marketing {
          align-self: center;
          margin-left: 6rpx;
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 700;
          font-size: 32rpx;
          color: #131824;
          line-height: 46rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }

      .tag-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-self: center;
        gap: 24rpx;
        width: 100%;
        padding: 20rpx 0rpx 24rpx 0rpx;
        box-sizing: border-box;
        margin-top: 12rpx;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0;

        .tag-wrapper-1 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          min-width: 176rpx;
          padding: 8rpx 24rpx 10rpx;
          background-color: rgba(245, 247, 250, 1);
          border-radius: 64rpx;
          box-sizing: border-box;

          .tag-3 {
            align-self: flex-start;
            overflow: hidden;
            max-width: 128rpx;
            font-family: PingFangSC-Regular;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(19, 24, 36, 1);
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .selected {
          background-color: rgba(225, 86, 10, 0.1);

          .tag-3 {
            color: rgba(225, 86, 10, 1);
          }
        }
      }
    }
  }

  .wrapper-6 {
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 25rpx;
    width: 100%;
    height: 200rpx;
    padding: 0 32rpx;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0;
    box-sizing: border-box;

    .tag-wrapper-3 {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 88rpx;
      border: 2rpx solid rgba(194, 195, 197, 1);
      border-radius: 64rpx;
      box-sizing: border-box;

      .tag-18 {
        overflow: hidden;
        max-width: 142rpx;
        ont-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 400;
        font-size: 36rpx;
        color: #131824;
        line-height: 52rpx;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }

    .group-3 {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex: 2;
      height: 88rpx;
      padding: 12rpx 24rpx 20rpx;
      background-color: rgba(225, 86, 10, 1);
      border-radius: 64rpx;
      box-sizing: border-box;

      .confirm {
        overflow: hidden;
        max-width: 286rpx;
        font-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 700;
        font-size: 36rpx;
        color: #ffffff;
        line-height: 52rpx;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
</style>
