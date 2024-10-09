<template>
  <div class="shop-cart-item-wrapper">
    <div class="select-container">
      <div :class="selected ? 'selected' : 'default'"></div>
    </div>
    <div class="icon-container">
      <image :src="item.image_url" class="icon" mode="widthFix" />
    </div>
    <div class="content-container">
      <div class="title">{{ item.name || "" }}</div>
      <div class="subtitle">
        {{ item.id || "" }} | {{ item.material || "" }} |
        {{ item.capacity || "" }} | {{ item.type || "" }}
      </div>
      <div class="coupon">{{ item.discount || "" }}</div>
      <div class="price">￥{{ item.price || "" }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        image_url: "",
        name: "",
        author: "",
        id: "",
        material: "",
        capacity: "",
        type: "",
        discount: "",
        price: "",
      }),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/mixin.scss";
.shop-cart-item-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  width: 702rpx;
  height: 252rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  .select-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 96rpx;
    height: 100%;
    /* background-color: #000000; */
    border-radius: 16rpx 0rpx 0rpx 16rpx;

    .default {
      width: 40rpx;
      height: 40rpx;
      border: 2rpx solid #c2c3c5;
      border-radius: 50%;
    }

    .selected {
      width: 40rpx;
      height: 40rpx;
      background-color: #d35400; /* 圆形背景颜色 */
      border-radius: 50%; /* 圆形 */
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .selected::before {
      content: "";
      width: 8rpx;
      height: 17rpx;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      position: absolute;
      top: 8rpx;
    }
  }
  .icon-container {
    width: 204rpx;
    height: 204rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    /* background-color: #00ff00; */
    .icon {
      width: 100%;
      height: 100%;
    }
  }
  .content-container {
    width: 400rpx;
    height: 100%;
    border-radius: 0rpx 16rpx 16rpx 0rpx;
    /* background-color: #0000ff; */
    padding: 24rpx 24rpx 24rpx 20rpx;
    box-sizing: border-box;
    background-clip: content-box;

    .title {
      @include mail-title;
      margin-bottom: 5rpx;
    }

    .subtitle {
      @include mail-subtitle;
      margin-bottom: 16rpx;
    }

    .coupon {
      @include mail-coupon;
      margin-bottom: 16rpx;
      display: inline-block;
    }

    .price {
      @include mail-price;
    }
  }
}
</style>