<!-- 一壶一世界的部分 -->
<template>
  <div class="a-pot-a-world-panel-wrapper">
    <MyWaterfallsFlow
      ref="waterfallsFlowRef"
      :items="list"
      @imageClick="imageClickHandler"
    >
    </MyWaterfallsFlow>
  </div>
</template>

<script>
// import MyWaterfallsFlow from "@/components/my-waterfalls-flow/index.vue";
import MyWaterfallsFlow from "@/components/my-waterfalls-flow/flow.vue";
import { httpRequest } from "@/utils/http.js";
export default {
  components: {
    MyWaterfallsFlow: MyWaterfallsFlow,
  },
  name: "KnowsPot",
  data() {
    return {
      globalProperties: this.globalProperties,
      img_prefix: this.globalProperties.img_prefix,
      list: [],
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    handleImageLoad(event) {
      // 图片加载完成后执行
      console.log(`图片加载完成: ${JSON.stringify(event.detail)}`);
      // 其他你希望在图片加载后执行的代码
    },
    imageClickHandler(item) {
      uni.navigateTo({
        url: `/pages/mailDetail/index?id=${item.id}`,
      });
    },
    async requestData() {
      const res = await httpRequest({ url: "/limitedseries", methods: "get" });
      if (res.code === 200) {
        this.list = [...(res.data || [])];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.a-pot-a-world-panel-wrapper {
  width: 100%;
}

.custom-box-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28rpx;
  background-color: #fff;
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
