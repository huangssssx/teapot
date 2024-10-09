<template>
  <div class="grap-text-wrapper">
    <div class="banner-container">
      <image
        class="icon"
        :src="`${grapTextData.banner.img_url}`"
        mode="widthFix"
      >
      </image>

      <div class="title">{{ grapTextData.banner.title }}</div>
      <div class="sub-title">
        <div>{{ grapTextData.banner.author }}</div>
        |
        <div class="date">{{ grapTextData.banner.create_time }}</div>
      </div>
    </div>

    <div class="list-container">
      <div
        class="list-item"
        v-for="(item, index) in grapTextData.date_list"
        :key="index"
      >
        <image class="icon" :src="`${item.img_url}`" mode="aspectFill"></image>
        <div class="content">
          <div class="title">{{ item.title || "" }}</div>
          <div class="account">{{ item.account || "" }}</div>
          <div class="sub-title">
            <div>{{ item.author }}</div>
            |
            <div class="date">{{ item.create_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grap-text",
  props: {
    grapTextData: {
      type: Object,
      default: () => {},
    },
  },
  created() {},
  components: {},
  computed: {},
  methods: {},
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/vars.scss";
@import "~@/mixin.scss";
.grap-text-wrapper {
  width: 100%;
  @include flex(
    $justify: center,
    $align: center,
    $gap: 16rpx,
    $flex-direction: column
  );
}
.banner-container {
  background-color: #ffffff;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  /* @include box-size(0rpx 24rpx); */
  @include size($width: 100%, $height: 518rpx);
  @include flex(
    $justify: center,
    $align: flex-start,
    $gap: 16rpx,
    $flex-direction: column
  );

  .icon {
    width: 100%;
    height: 380rpx;
  }

  .title {
    margin-left: 32rpx;
    @include title(
      $font-size: 32rpx,
      $font-weight: 600,
      $line-height: 52rpx,
      $color: #131824
    );
  }

  .sub-title {
    margin-left: 32rpx;
    @include flex(
      $justify: center,
      $align: center,
      $gap: 16rpx,
      $flex-direction: row
    );

    @include title(
      $font-size: 24rpx,
      $font-weight: 400,
      $line-height: 34rpx,
      $color: #939598
    );
    /* .author: {
    }
    .date: {
    } */
  }
  overflow: hidden;
}

.list-container {
  width: 100%;
  @include flex(
    $justify: center,
    $align: center,
    $gap: 16rpx,
    $flex-direction: column
  );
}
.list-item {
  @include size($width: 100%, $height: 216rpx);
  @include box-size(24rpx);
  @include flex(
    $justify: space-between,
    $align: center,
    $gap: 16rpx,
    $flex-direction: row
  );
  background: #ffffff;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  .icon {
    width: 224rpx;
    height: 168rpx;
  }

  .content {
    width: calc(100% - 250rpx);
    height: 100%;
    @include flex(
      $justify: center,
      $align: flex-start,
      $gap: 16rpx,
      $flex-direction: column
    );
    .account {
      width: 100%;
      @include title(
        $font-size: 28rpx,
        $font-weight: 400,
        $line-height: 40rpx,
        $color: #131824
      );
      @include ellipsis();
    }
    .sub-title {
      @include flex($justify: center, $align: flex-start, $gap: 16rpx);
      @include title(
        $font-size: 24rpx,
        $font-weight: 400,
        $line-height: 34rpx,
        $color: #939598
      );
    }
  }
}
</style>