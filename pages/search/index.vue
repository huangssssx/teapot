<template>
  <div class="page">
    <div class="group">
      <div class="body">
        <div class="container-1">
          <div class="wrapper-1">
            <image
              class="icon-circle"
              :src="`${img_prefix}/c-home/search/img_3.png`"
            />
            <image class="dot" :src="`${img_prefix}/c-home/search/img_4.png`" />
            <input
              class="input"
              v-model="keyword"
              type="text"
              placeholder="搜索商品"
            />
          </div>
          <div class="wrapper-2" @click="search">
            <text class="search-2">搜索</text>
          </div>
        </div>
        <div class="container-2">
          <div class="wrapper-3">
            <div class="row-container">
              <text class="search-3">历史搜索</text>
              <image
                class="del-btn"
                :src="`${img_prefix}/c-home/search/del.png`"
                mode="heightFix"
                @click="clearHistory"
              />
            </div>
            <div class="group-2">
              <div
                class="tag-wrapper"
                v-for="keyword in searchHistory"
                :key="keyword"
                @click="goSearchResultPage(keyword)"
              >
                <text class="tag">{{ keyword }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  onLoad() {
    this.searchHistory = uni.getStorageSync("searchHistory") || [];
  },
  data() {
    return {
      keyword: "",
      constants: {},
      img_prefix: this.globalProperties.img_prefix,
      searchHistory: [],
    };
  },
  methods: {
    clearHistory() {
      uni.showModal({
        title: "提示",
        content: "确定要清空历史搜索记录吗？",
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync("searchHistory");
            this.searchHistory = [];
          }
        },
      });
    },
    // 保存搜索历史
    saveSearchHistory(keyword) {
      if (!keyword.trim()) {
        return;
      }
      let history = uni.getStorageSync("searchHistory") || [];
      const index = history.indexOf(keyword);
      if (index !== -1) {
        // 如果已经存在这个搜索关键词，将其移除
        history.splice(index, 1);
      }
      // 将新的搜索关键词添加到历史记录的最前面
      history.unshift(keyword);
      // 如果历史记录超过10条，移除最旧的一条
      if (history.length > 10) {
        history.pop();
      }
      // 将历史记录保存到localStorage
      uni.setStorageSync("searchHistory", history);
    },
    search() {
      this.saveSearchHistory(this.keyword);
      this.goSearchResultPage(this.keyword);
    },
    goSearchResultPage(keyword) {
      uni.navigateTo({
        url: `/pages/searchResult/index?keyword=${keyword}`,
      });
    },
  },
};
</script>
  <style scoped lang="scss">
@import "./index.scss";
</style>
  