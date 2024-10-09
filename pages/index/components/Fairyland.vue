<!-- 洞天福地的部分 -->
<template>
  <div class="fairy-land-panel-wrapper">
    <!-- <div class="wrapper-10">
            <text class="word-10">玉瓢</text>
            <div class="group-17">
                <text class="tag-10">「孔小明」</text>
                <image class="tag-11" moda="aspectFit"
                    src="http://8.138.147.253:80/teapot/c-home/pot-world/img_2.png" />
            </div>
        </div> -->
    <div
      class="mod"
      v-for="(item, index) in items"
      :key="index"
      @click="goToDetail(item.id)"
    >
      <text class="label">{{ item.teapotName }}</text>
      <div class="main">
        <text class="tag">{{ item.author }}</text>
        <image class="badge" :src="item.goodsGalleryList[0]" mode="aspectFit" />
      </div>
    </div>
  </div>
</template>

<script>
import { httpRequest } from "@/utils/http.js";
export default {
  name: "KnowsPot",
  data() {
    return {
      globalProperties: this.globalProperties,
      expiration_time: "",
      items: [],
    };
  },
  mounted() {
    httpRequest({
      url: "/flashsale",
      methods: "get",
    }).then((res) => {
      console.log("洞天福地：", res?.data);
      this.expiration_time = res?.data?.expiration_time;
      this.items = res?.data?.teapotList || [];
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
.fairy-land-panel-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;

  .mod {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 328rpx;
    height: 172rpx;
    padding: 24rpx 10rpx 32rpx;
    background-color: rgba(245, 247, 250, 1);
    border-radius: 16rpx;

    .label {
      align-self: flex-start;
      overflow: hidden;
      max-width: 284rpx;
      margin-left: 12rpx;
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 600;
      font-size: 32rpx;
      color: #131824;
      line-height: 46rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .main {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-self: center;
      width: 308rpx;
      margin-top: 2rpx;

      .tag {
        align-self: flex-start;
        margin-top: 6rpx;
        font-family: Source Han Serif CN, Source Han Serif CN;
        font-weight: 500;
        font-size: 24rpx;
        color: #939598;
        line-height: 34rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
        white-space: nowrap;
      }

      .badge {
        position: absolute;
        bottom: 0rpx;
        right: 0rpx;
        width: 230rpx;
        height: 230rpx;
      }
    }
  }
}
</style>
