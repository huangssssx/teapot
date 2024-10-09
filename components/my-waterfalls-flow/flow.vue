<template>
  <div class="waterfalls-flow-wrapper">
    <div class="waterfalls-flow-box" v-for="(item, index) in items" :key="index">
      <slot name="box" :item="item" :index="index">
        <div class="custom-box-content" @click="imageClickHandler(item)">
          <image
            class="icon"
            :src="
              item.goodsGalleryList[0] ||
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'
            "
            mode="widthFix"
          />

          <div class="title">{{ item.teapotName }}「{{ item.author }}」</div>
          <div class="discount" v-if="discount">{{ item.discount }}</div>

          <div class="buy-btn">
            {{ item.price > 5000 ? "立即询价" : "￥" + item.price }}
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  options: {
    multipleSlots: true,
  },
  name: "WaterfallsFlow",
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    imageClickHandler(item) {
      this.$emit("imageClick", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.waterfalls-flow-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* 瀑布流容器的样式 */
  /* column-count: 2; 假设有三列 */
  /* column-gap: 10rpx; 列间距 */
  /* padding: 0rpx 16rpx; 添加内边距，以免内容与容器边缘过于接近 */
  box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
  /* column-gap: 14rpx; */
}

.waterfalls-flow-box {
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  /* 瀑布流中每一项的样式 */
  flex: 0 0 calc(50% - 7rpx); // 减去一半间距
  margin-bottom: 14rpx; // 元素之
}

.box-content {
  /* box内容的默认样式 */
  /* 其他样式... */
}

.custom-box-content {
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28rpx;
  background-color: #fff;
  padding-bottom: 32rpx;
  box-sizing: border-box;
  .icon {
    width: 100%;
    height: auto;
  }

  .title {
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 600;
    font-size: 32rpx;
    color: #1f1f1f;
    line-height: 46rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .discount {
    width: 230rpx;
    height: 40rpx;
    background: rgba(228, 193, 92, 0.1);
    border-radius: 64rpx 64rpx 64rpx 64rpx;
    text-align: center;
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 400;
    font-size: 24rpx;
    color: #e1560a;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .buy-btn {
    border-radius: 32px;
    min-width: 220rpx;
    height: 64rpx;
    background: #e1560a;

    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 600;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 64rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
