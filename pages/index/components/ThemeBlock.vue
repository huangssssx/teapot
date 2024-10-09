<template>
  <div class="theme-block-wrapper" :style="{ backgroundColor: backgroundColor }">
    <div class="header-container">
      <text class="tag">{{ title }}</text>
      <div class="primary" @click="more" v-if="moreLabel != ''">
        <text class="organization">{{ moreLabel }}</text>
        <image
          mode="height-fit"
          class="icon-right"
          :src="`${globalProperties.img_prefix}/c-home/theme-block/img_0.png`"
        />
      </div>
    </div>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeBlock",
  props: {
    title: {
      type: String,
      default: "",
    },
    moreLabel: {
      type: String,
      default: "",
    },
    moreUrl: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {
      globalProperties: this.globalProperties,
    };
  },
  methods: {
    more() {
      uni.navigateTo({
        url: this.moreUrl,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-block-wrapper {
  width: 100%;
  background-color: #ffffff;
  padding: 24rpx;
  box-sizing: border-box;
  border-radius: 16rpx;

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 88rpx;
    padding: 24rpx;
    box-sizing: border-box;
    background-image: linear-gradient(
      90deg,
      rgba(225, 86, 10, 0) 0%,
      rgba(225, 86, 10, 1) 100%
    );
    background-size: 128rpx 8rpx;
    background-repeat: no-repeat;
    background-position: 24rpx 54rpx;

    .tag {
      align-self: center;
      margin-bottom: 7rpx;
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 700;
      font-size: 32rpx;
      color: #131824;
      line-height: 46rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .primary {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-self: center;
      min-width: 118rpx;
      height: 40rpx;
      margin-right: 8rpx;
      gap: 10rpx;

      .organization {
        align-self: center;
        font-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 500;
        font-size: 28rpx;
        color: #e1560a;
        line-height: 40rpx;
        text-align: right;
        font-style: normal;
        text-transform: none;
      }

      .icon-right {
        align-self: center;
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
}
</style>
