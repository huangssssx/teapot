<template>
  <div class="cart-service-floating">
    <div
      class="cart-service-floating__icon"
      @click="scrollToTop"
      v-if="items.includes('top')"
    >
      <image
        class="icon"
        :src="`${img_prefix}/cartServiceFloating/02.png`"
        mode="aspectFit"
      />
    </div>
    <div
      class="cart-service-floating__favorite"
      v-if="items.includes('favorite')"
      @click="favoriteClickHandler"
    >
      <image
        class="icon favorite_active"
        :src="`${img_prefix}/cartServiceFloating/${
          favorite ? 'favorite_active' : 'favorite'
        }.png`"
        mode="aspectFit"
      />
    </div>
    <div class="cart-service-floating__cart" v-if="items.includes('cart')">
      <image
        class="icon"
        :src="`${img_prefix}/cartServiceFloating/03.png`"
        mode="aspectFit"
      />
    </div>
    <div
      class="cart-service-floating__service"
      v-if="items.includes('service')"
    >
      <image
        class="icon"
        :src="`${img_prefix}/cartServiceFloating/01.png`"
        mode="aspectFit"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      favorite: false,
    };
  },
  mounted() {},
  onLoad() {},
  onShow() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {},
  methods: {
    favoriteClickHandler() {
      this.favorite = !this.favorite;
    },
    scrollToTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 800,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-service-floating {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 112rpx;
  min-height: 0rpx;
  background: #ffffff;
  box-shadow: 16rpx 16rpx 32rpx 0rpx rgba(0, 0, 0, 0.1);
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  position: fixed;
  bottom: 32rpx;
  right: 32rpx;
  .cart-service-floating__icon,
  .cart-service-floating__favorite,
  .cart-service-floating__cart,
  .cart-service-floating__service {
    position: relative;
    width: 100%;
    height: 110rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 48rpx;
      height: 48rpx;
      margin: 0 auto;
      display: block;
    }
  }

  [class^="cart-service-floating__"]:nth-child(1)::after,
  [class^="cart-service-floating__"]:nth-child(2)::after,
  [class^="cart-service-floating__"]:nth-child(3)::after {
    content: " ";
    position: absolute;
    bottom: 0rpx;
    width: 80rpx;
    height: 2rpx;
    background: #e5e7ea;
  }
}
</style>