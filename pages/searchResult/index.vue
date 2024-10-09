<template>
  <div class="page">
    <div class="group">
      <div class="body">
        <!-- <div class="block-1">
          <div class="container-1">
            <image
              class="icon-circle"
              :src="`${img_prefix}/c-home/searchResult/img_3.png`"
            />
            <image
              class="dot"
              :src="`${img_prefix}/c-home/searchResult/img_4.png`"
            />
            <input
              class="search"
              v-model="keyword"
              type="text"
              placeholder="搜索商品"
            />
          </div>
          <div class="container-2">
            <image
              class="icon-circle-1"
              :src="`${img_prefix}/c-home/searchResult/img_5.png`"
            />
            <image
              class="dot-1"
              :src="`${img_prefix}/c-home/searchResult/img_6.png`"
            />
            <text class="share">分享</text>
          </div>
        </div> -->
        <MailFilter
          @orderChange="orderChangeHandler"
          @confirmFilters="confirmFiltersHandler"
        />
        <MyWaterfallsFlow
          ref="mwff"
          v-if="items && items.length > 0"
          :items="items"
          @imageClick="imageClickHandler"
        >
        </MyWaterfallsFlow>
        <Empty v-else />

        <div class="no-more" v-if="loadEnd">没有更多了</div>
      </div>
    </div>
  </div>
</template>
<script>
import MyWaterfallsFlow from "@/components/my-waterfalls-flow/flow.vue";
import MailFilter from "@/components/mail-filter/index";
import { httpRequest } from "@/utils/http.js";
import Empty from "@/components/empty/index";
import {
  queryParamsFromObject,
  queryParamsFromArray,
} from "@/utils/queryParams.js";
import {
  convertToRange,
  removeEmptyField,
  convertPriceToRangeArray,
} from "@/utils/index.js";
export default {
  components: { MailFilter, MyWaterfallsFlow, Empty },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      // keyword: "",
      filters: {
        keyword: "", // 关键字
        availability: "", // 服务/折扣
        clay_types: "", // 泥料
        volumes: "", // 容量
        artist: "", // 名家
        category: "商品", // 分类
        Price: "", // 价格 入门|高货|收藏|馆藏
        page: 0, //页数
        orderBy: "",
        sortOrder: "",
      },

      items: [],
      pageSize: 5,
      loadEnd: true,
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.keyword) {
      this.filters.keyword = options.keyword || "";
    }

    if (options.category) {
      this.filters.category = options.category;
      uni.setNavigationBarTitle({
        title: this.filters.category,
      });
    }

    if (options.searchType) {
      const { searchType, searchField } = options;
      this.filters[searchType] = searchField;
    }
    this.searchData(true);
  },
  onReachBottom() {
    this.searchData(true);
  },
  methods: {
    confirmFiltersHandler(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.searchData(false);
    },
    loadMore() {
      this.searchData(true);
    },
    imageClickHandler(item) {
      uni.navigateTo({
        url: `/pages/mailDetail/index?id=${item.id}`,
      });
    },
    orderChangeHandler(order) {
      this.filters.orderBy = order.orderBy;
      this.filters.sortOrder = order.sortOrder;
      this.searchData(false);
    },

    processPriceRange(request) {
      if (request.Price) {
        const priceRange = convertPriceToRangeArray(request.Price) || [];
        return {
          ...request,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          Price: undefined,
        };
      }
      return request;
    },

    processVolumeRange(request) {
      if (request.volumes) {
        return {
          ...request,
          volumes: convertToRange(request.volumes),
        };
      }
      return request;
    },

    sendRequest(url, method, params) {
      return httpRequest({
        url,
        method,
        params,
      })
        .then((res) => res.data || [])
        .catch((err) => {
          this.handleError(err);
          return [];
        });
    },

    handleError(err) {
      console.error("An error occurred:", err);
    },
    async searchData(isPull = false) {
      let request = { ...this.filters };
      request = this.processVolumeRange(request);
      request = this.processPriceRange(request);

      if (isPull) {
        request.page += 1;
      }

      const noEmptyFilters = removeEmptyField(request);

      try {
        const data = await this.sendRequest(
          "/api/products/search",
          "GET",
          noEmptyFilters
        );

        if (data === "no result") {
          this.items = [];
          return;
        }

        if (isPull) {
          if (data.length === 0) {
            this.loadEnd = true;
            return;
          }
          this.items.push(...data);
          this.filters.page = request.page;
        } else {
          this.items = [...data];
        }
      } catch (error) {
        // 处理请求失败的情况
        console.error("请求失败:", error);
        // 可以在这里设置一些错误处理逻辑，比如显示错误信息给用户
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
