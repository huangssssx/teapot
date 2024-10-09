<template>
  <div class="page">
    <div class="group">
      <uni-nav-bar :fixed="true" class="nav-bar" status-bar background-color="#BF8444" color="#ffffff" :border="false"
        left-icon="left" @clickLeft="backHandler">
        <div class="title">名家介绍</div>
      </uni-nav-bar>
      <div class="body">
        <div class="container">
          <div class="wrapper-1">
            <div class="group-2">
              <text class="tag-1">{{ item.name || "" }}</text>
              <text class="location">{{ item.location || "" }}</text>
              <text class="desc" v-for="title in item.titles" :key="title">· {{ title }}</text>
            </div>
            <image class="image" :src="item.avatar || ''" />
          </div>
        </div>
        <div class="center-container">
          <div class="container-1">
            <div class="wrapper-2">
              <div class="vertical-line" />
              <text class="word">简介</text>
            </div>
            <text class="summary">{{ item.description || "" }}</text>
          </div>
          <div class="container-2">
            <div class="vertical-line-1" />
            <text class="label">成绩及荣誉</text>
          </div>
          <div class="container-3">
            <div class="section-wrapper-item-0" v-for="achievement in item.achievements" :key="achievement">
              <text class="section">{{ achievement || "" }}</text>
            </div>
          </div>
          <div class="container-4">
            <div class="vertical-line-2" />
            <text class="word-1">相关推荐</text>
          </div>

          <div class="panel-wrapper">
            <MyWaterfallsFlow ref="waterfallsFlowRef" :items="relatedDatas" @imageClick="goToDetailPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { httpRequest } from "@/utils/http.js";
import MyWaterfallsFlow from "@/components/my-waterfalls-flow/flow.vue";
export default {
  components: { MyWaterfallsFlow },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      author_id: "",
      item: {
        name: "",
        location: "",
        titles: [],
        description: "",
        author_id: "1",
        achievements: [],
        honors: [],
      },
      relatedDatas: [],
    };
  },
  async onLoad(options) {
    this.author_id = options.author_id;
    await this.fetchData(options.author_id);
    await this.fetchRelatedData(options.author_id);
  },
  methods: {
    backHandler() {
      uni.navigateBack({
        delta: 1,
      });
    },
    goToDetailPage(mail) {
      uni.navigateTo({
        url: `/pages/mailDetail/index?id=${mail.id}`,
      });
    },
    async fetchData(author_id) {
      const res = await httpRequest({
        url: "/api/authors",
        method: "GET",
        data: { author_id },
      });

      this.item = res.data[0] || {};
    },

    //相关推荐数据获取
    async fetchRelatedData(author_id) {
      const res = await httpRequest({
        url: "/api/masterRecommendations",
        method: "GET",
        data: { masterId: author_id },
      });

      const data = res.data || [];

      //数据格式转换
      this.relatedDatas = (data || []).map((item) => ({
        image:
          item.goodsGalleryList?.[0] ||
          "http://8.138.147.253:80/teapot/c-home/pot-world/img_1.png",
        title: item.name || "",
        id: item.goodsId,
        price: item.price || 0,
      }));
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
