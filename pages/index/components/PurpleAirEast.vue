<!-- 紫气东来的部分 -->
<template>
  <div class="purple-air-east-panel-wrapper">
    <div
      class="wrapper-item-0"
      v-for="(item, index) in items"
      :key="index"
      @click="goToDetail(item.id)"
    >
      <div class="group-3">
        <div class="overlayer" />
        <image
          class="logo"
          mode="aspectFit"
          :src="item.goodsGalleryList[0] || ''"
        />
      </div>
      <div class="group-4">
        <text class="label-5">{{ item.teapotName }}</text>
        <text class="tag-6">{{ item.author || "" }}</text>
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
      url: "/hotteapot",
      methods: "get",
    }).then((res) => {
      console.log("紫气东来：", res);
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
.purple-air-east-panel-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .wrapper-item-0 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: center;
    height: 314rpx;

    .group-3 {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-self: center;
      width: 212rpx;

      .overlayer {
        align-self: flex-start;
        width: 212rpx;
        height: 212rpx;
        background-color: rgba(245, 247, 250, 1);
        border-radius: 16rpx;
      }

      .logo {
        position: absolute;
        left: 50%;
        bottom: 18rpx;
        width: 248rpx;
        height: 166rpx;
        transform: translateX(-50%);
      }
    }

    .group-4 {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: center;
      margin: 16rpx 4rpx 0 0;

      .label-5 {
        align-self: center;
        font-family: SourceHanSerifCN-SemiBold;
        font-size: 32rpx;
        font-weight: 400;
        line-height: 46rpx;
        color: rgba(19, 24, 36, 1);
        white-space: nowrap;
      }

      .tag-6 {
        align-self: center;
        overflow: hidden;
        max-width: 96rpx;
        margin-top: 10rpx;
        font-family: SourceHanSerifCN-Medium;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 34rpx;
        color: rgba(147, 149, 152, 1);
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>