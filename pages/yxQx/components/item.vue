<template>
  <div class="product-wrapper" @click="goToDetail(item.author_id)">
    <image class="product" :src="item.avatar" alt="no" />
    <text class="label">{{ item.name || "" }}</text>
    <text class="info">{{ item.honors[0] || "" }}</text>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  methods: {
    goToDetail(author_id) {
      uni.navigateTo({
        url: `/pages/masterDetail/index?author_id=${author_id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-wrapper {
  width: 342rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  padding-bottom: 32rpx;
  margin-left: 10rpx;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16rpx;

  .product {
    align-self: center;
    width: 340rpx;
    height: 340rpx;
    margin-left: 2rpx;
  }

  .label {
    align-self: flex-start;
    overflow: hidden;
    max-width: 342rpx;
    margin-top: 16rpx;
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 600;
    font-size: 36rpx;
    color: #1f1f1f;
    line-height: 52rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info {
    align-self: flex-start;
    overflow: hidden;
    max-width: 342rpx;
    margin-top: 10rpx;
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 500;
    font-size: 24rpx;
    color: #939598;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
