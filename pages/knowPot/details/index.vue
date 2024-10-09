<template>
  <div class="page">
    <div class="title">{{ requestInfo.title || "" }}</div>
    <div class="sub-title">
      <div class="author">{{ requestInfo.author || "" }}</div>
      <div class="time">{{ requestInfo.date || "" }}</div>
    </div>
    <div class="body" v-html="content || ''"></div>
  </div>
</template>
  <script>
import { httpRequest } from "@/utils/http.js";

export default {
  components: {},
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      requestInfo: {},
      content: "",
      innerImageStyle: `
        width:100%;
        border-radius: 24px;
      `,
    };
  },
  onLoad(options) {},
  mounted() {
    this.requestData();
  },
  onReachBottom() {},
  methods: {
    requestData() {
      httpRequest({
        url: "/api/knows-pot/detail",
        method: "GET",
      })
        .then((res) => {
          this.requestInfo = { ...res.data };
          this.content = (res.data.content || "").replace(
            /<img src="([^"]+)"/g,
            `<img style="${this.innerImageStyle}" src="http://$1"`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
  