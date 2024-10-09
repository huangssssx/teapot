<!-- 壶中天地的部分 -->
<template>
  <div class="pot-world-panel-wrapper">
    <div class="primary" @click="goToDetail(items[0].id)">
      <text class="label">{{ items[0].teapotName }}</text>
      <text class="nick-name">{{ items[0].author }}</text>
      <image class="shop-logo" mode="aspectFit" :src="items[0].goodsGalleryList[0]" />
    </div>
    <div class="side">
      <div v-if="items[1]" class="group" @click="goToDetail(items[1].id)">
        <div class="view">
          <text class="tag">{{ items[1].teapotName }}</text>
          <text class="word">{{ items[1].author }}</text>
        </div>
        <image class="badge" mode="aspectFit" :src="items[1].goodsGalleryList[0]" />
      </div>
      <div class="group">
        <div v-if="items[2]" class="view" @click="goToDetail(items[2].id)">
          <text class="tag">{{ items[2].teapotName }}</text>
          <text class="word">{{ items[2].author }}</text>
        </div>
        <image class="badge" mode="aspectFit" :src="items[2].goodsGalleryList[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import { httpRequest } from "@/utils/http.js";
export default {
  name: "PotWorldPanel",
  data() {
    return {
      globalProperties: this.globalProperties,
      items: [],
    };
  },

  mounted() {
    httpRequest({
      url: "/teapotshow",
      methods: "get",
    }).then((res) => {
      console.log("壶中天地：", res);
      this.items = res.data;
    });
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/mailDetail/index?id=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pot-world-panel-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 14rpx;

  .primary {
    position: relative;
    width: calc(50% - 7rpx);
    height: 464rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: center;
    padding: 24rpx 16rpx 24rpx;
    background-color: #f5f7fa;
    border-radius: 16rpx;
    box-sizing: border-box;

    .label {
      align-self: flex-start;
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 700;
      font-size: 28rpx;
      color: #131824;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .nick-name {
      align-self: flex-start;
      overflow: hidden;
      min-width: 280rpx;
      margin: 8rpx 0 0 8rpx;
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 600;
      font-size: 24rpx;
      color: #939598;
      line-height: 34rpx;
      font-style: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .shop-logo {
      position: absolute;
      bottom: 0rpx;
      right: 0rpx;
      width: 250rpx;
      height: 250rpx;
      margin-top: 35rpx;
    }
  }

  .side {
    width: calc(50% - 7rpx);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: center;
    width: 342rpx;
    height: 450rpx;
    gap: 14rpx;

    .group {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: center;
      width: 100%;
      height: 225rpx;
      padding: 24rpx 18rpx 24rpx;
      box-sizing: border-box;
      background-color: #f5f7fa;
      border-radius: 16rpx;

      .view {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
        min-width: 292rpx;
        z-index: 1;

        .tag {
          align-self: flex-start;
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 700;
          font-size: 28rpx;
          color: #131824;
          line-height: 40rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .word {
          align-self: flex-start;
          overflow: hidden;
          max-width: 284rpx;
          margin: 8rpx 0 0 4rpx;
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 600;
          font-size: 24rpx;
          color: #939598;
          line-height: 34rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .badge {
        position: absolute;
        bottom: 0rpx;
        right: 0rpx;
        width: 200rpx;
        height: 200rpx;
      }
    }
  }
}
</style>
