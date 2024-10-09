<!-- 知壶者也的部分 -->
<template>
  <div class="knows-pot-panel-wrapper">
    <div
      class="wrapper-6"
      v-for="(item, index) in items"
      :key="index"
      @click="goToDetail(items.id)"
    >
      <div v-if="index < 2">
        <div class="image-bg">
          <image class="entry-pic-1" mode="aspectFit" :src="item.goodsGalleryList[0]" />
        </div>

        <div class="group-9">
          <text class="desc">{{ item.title }}</text>
          <text class="tag-7">{{ formatDateTime(item.created_at) }}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpRequest } from "@/utils/http.js";
import { formatDateTime } from "@/utils/date.js";
export default {
  name: "KnowsPot",
  data() {
    return {
      globalProperties: this.globalProperties,
      items: [],
      formatDateTime,
    };
  },
  mounted() {
    httpRequest({
      url: "/teapotknowledge",
      methods: "get",
    }).then((res) => {
      console.log("知壶者也：", res?.data);
      this.items = res.data || [];
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
.knows-pot-panel-wrapper {
  display: flex;
  gap: 26rpx;
}

.wrapper-6 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  height: 360rpx;

  .image-bg {
    background: #f5f7fa;

    .entry-pic-1 {
      align-self: center;
      width: 322rpx;
      height: 216rpx;
      margin-left: 2rpx;
    }
  }

  .group-9 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    margin-top: 16rpx;

    .desc {
      align-self: center;
      overflow: hidden;
      width: 308rpx;
      height: 88rpx;
      font-family: SourceHanSerifCN-Medium;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 44rpx;
      color: rgba(19, 24, 36, 1);
      text-align: left;
      white-space: normal;
      text-overflow: ellipsis;
      webkit-line-clamp: 2;
      webkit-box-orient: vertical;
    }

    .tag-7 {
      align-self: flex-start;
      overflow: hidden;
      max-width: 308rpx;
      margin-top: 8rpx;
      font-family: SourceHanSerifCN-Regular;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      color: rgba(147, 149, 152, 1);
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
