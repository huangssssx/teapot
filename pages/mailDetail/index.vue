<template>
  <div class="page">
    <div class="group">
      <div class="row">
        <text class="tag">{{ item.teapotName || "" }}</text>
        <text class="tag-1" @click="jumpToAuthPage">「{{ item.author || "" }}」</text>
      </div>
      <!-- <div class="submain" /> -->
      <div class="main">
        <div class="sub-container">
          <text class="word">编号</text>
          <text class="num">{{ item.id || "" }}</text>
        </div>

        <div class="sub-container">
          <text class="word">泥料</text>
          <text class="num">{{ item.material || "" }}</text>
        </div>

        <div class="sub-container">
          <text class="word">容量</text>
          <text class="num">{{ item.capacity || "" }}</text>
        </div>

        <div class="sub-container">
          <text class="word">壶型</text>
          <text class="num">{{ item.teapotType || "" }}</text>
        </div>
        <!-- <div class="container-1">
          <div class="wrapper">
            <div class="group-1">
              <text class="word">编号</text>
              <text class="num">{{ item.id || "" }}</text>
            </div>
            <div class="group-2">
              <div class="view">
                <text class="label">泥料</text>
                <text class="word-1">{{ item.material || "" }}</text>
              </div>
              <image
                class="dot"
                :src="`${img_prefix}/c-home/mailDetail/img_3.png`"
              />
              <div class="view-1">
                <text class="word-2">容量</text>
                <text class="tag-2">{{ item.capacity || "" }}</text>
              </div>
            </div>
          </div>
          <image
            class="dot-1"
            :src="`${img_prefix}/c-home/mailDetail/img_4.png`"
          />
        </div>
        <div class="container-2">
          <text class="label-1">壶型</text>
          <div class="wrapper-1">
            <text class="word-3">{{ item.teapotType || "" }}</text>
            <image
              class="dot-2"
              :src="`${img_prefix}/c-home/mailDetail/img_5.png`"
            />
          </div>
        </div> -->
      </div>
    </div>
    <XsuuSwiper class="entry-pic" height="750" :swiperItems="swiperItems" :button="0" :dotHeight="-100" :DotPosition="3"
      SelectBG="rgba(19,24,36,0.1)" UncheckedBG="#131824"></XsuuSwiper>
    <div class="group-3">
      <div class="body-1">
        <div class="container-3">
          <!-- <div class="wrapper-2">
            <div class="horizontal-line-item-0" />
            <div class="horizontal-line-item-1" />
            <div class="horizontal-line-item-2" />
            <div class="horizontal-line-item-3" />
          </div> -->
          <!-- <image
            class="icon-up"
            :src="`${img_prefix}/c-home/mailDetail/img_7.png`"
          />
          <image
            class="icon-up-1"
            :src="`${img_prefix}/c-home/mailDetail/img_8.png`"
          />
          <text class="info">上滑查看详情</text> -->
        </div>
        <!-- <div class="container-4">
          <image
            class="icon"
            :src="`${img_prefix}/c-home/mailDetail/img_9.png`"
          />
          <image
            class="icon-star"
            :src="`${img_prefix}/c-home/mailDetail/img_10.png`"
          />
          <div class="wrapper-3"><text class="num-1">1</text></div>
        </div> -->
        <!-- <div class="horizontal-line" />
        <image
          class="icon-cart"
          :src="`${img_prefix}/c-home/mailDetail/img_11.png`"
        /> -->
      </div>
      <div class="footer">
        <div class="container-5">
          <div class="customer-container">
            <image class="icon" :src="`${img_prefix}/c-home/mailDetail/img_13.png`" />
            <text class="label-2">客服</text>
          </div>
          <div class="share-container">
            <image class="icon" :src="`${img_prefix}/c-home/mailDetail/img_12.png`" />
            <text class="share">分享</text>
          </div>

          <div class="btn-container">
            <div class="empty-2">加入购物车</div>
            <div class="group-6">
              <text class="label-3">{{
                item.price > 5000 ? "立即询价" : `￥${item.price}`
                }}</text>
              <text class="tag-3">{{ item.price > 5000 ? "中五位" : "立即购买" }}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CartAndFavoriteFloating :items="['cart', 'favorite']" />
  </div>
</template>
<script>
import { httpRequest } from "@/utils/http.js";
import XsuuSwiper from "@/components/Xss-swiper/Xsuu-swiper.vue";
import CartAndFavoriteFloating from "@/components/floating/index.vue";
export default {
  components: { XsuuSwiper, CartAndFavoriteFloating },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      constants: {},
      teapotId: "",
      item: {},
      swiperItems: [],
    };
  },
  onLoad(options) {
    console.log(options);
    this.teapotId = options.id;
    this.fetchData(this.teapotId);
  },
  methods: {
    jumpToAuthPage() {
      uni.navigateTo({
        url: `/pages/masterDetail/index?author_id=${this.item.authorId}`,
      });
    },
    fetchData(teapotId) {
      httpRequest({
        url: "/api/teapotInfo",
        method: "GET",
        data: {
          teapotId,
        },
      })
        .then((res) => {
          this.item = res.data?.[0] || {};
          const custom_Items =
            this.item.goodsGalleryList.map((img_url) => ({
              img: img_url || "",
              title: "",
              Subtitle: "",
              tip: "",
              url: "111",
            })) || [];
          this.swiperItems = [custom_Items[0], custom_Items[0]];
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
