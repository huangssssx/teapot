<template>
  <div class="waterfalls-flow-wrapper">
    <div class="waterfalls-flow-box" v-for="(item, index) in items" :key="index">
      <slot name="box" :item="item" :index="index">
        <div class="custom-box-content">
          <image class="icon" :src="item.img_url ||
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'
            " mode="widthFix" @click="imageClickHandler(item)" />

          <div class="title">{{ item.title }}</div>

          <div class="content">
            <favors :item="item" />
            <div class="saved-num">
              {{ item.saved_num || 0 }}
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import favors from "@/components/favors/index"
export default {
  components: { favors },
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
@import "~@/vars.scss";
@import "~@/mixin.scss";

.waterfalls-flow-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
}

.waterfalls-flow-box {
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  flex: 0 0 calc(50% - 7rpx); // 减去一半间距
  margin-bottom: 14rpx; // 元素之
}

.custom-box-content {
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  background-color: #fff;
  padding-bottom: 32rpx;
  box-sizing: border-box;

  .icon {
    width: 100%;
    height: auto;
  }

  .title {
    margin-left: 24rpx;
    text-align: left;
    @include title($font-size: 32rpx, $font-weight: 500, $line-height: 72rpx, $color: #131824);
  }

  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 24rpx;
    gap: 12rpx;
    margin-left: 24rpx;
    border-radius: 32px;
    min-width: 220rpx;
    height: 64rpx;

    @include title($font-size: 24rpx, $font-weight: 400, $line-height: 34rpx, $color: #939598);
    font-family: PingFang SC, PingFang SC;
  }
}
</style>
