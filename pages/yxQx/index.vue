<template>
  <div class="page">
    <div class="group">
      <t-dropdown-menu>
        <t-dropdown-item class="honor-container" @change="honorChangeHandler" :options="honorOptions"
          :value="request.honorFilter" :label="honorSelectLabel" />
        <t-dropdown-item @change="titleChangeHandler" :options="titleOptions" :value="request.titleFilter"
          :label="titleSelectLabel" />
      </t-dropdown-menu>
      <div class="body">
        <ItemVue v-for="(item, index) in items" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>
<script>
import { httpRequest } from "@/utils/http.js";
import { removeEmptyField } from "@/utils/index.js";
import ItemVue from "./components/item.vue";
export default {
  components: {
    ItemVue,
  },
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      constants: {},
      request: {
        searchText: "",
        honorFilter: "",
        titleFilter: "",
      },
      items: [],
      honorOptions: [
        {
          value: "泥料名家",
          label: "泥料名家"
        },
        {
          value: "朱泥名家",
          label: "朱泥名家"
        },
        {
          value: "紫泥名家",
          label: "紫泥名家"
        },
        {
          value: "段泥绿泥名家",
          label: "段泥绿泥名家"
        },
        {
          value: "圆器名家",
          label: "圆器名家"
        },
        {
          value: "方器名家",
          label: "方器名家"
        },
        {
          value: "花器名家",
          label: "花器名家"
        },
        {
          value: "筋纹器名家",
          label: "筋纹器名家"
        },
        {
          value: "光素器名家",
          label: "光素器名家"
        },
        {
          value: "刻绘名家",
          label: "刻绘名家"
        }
      ],
      titleOptions: [
        {
          value: "正高级工艺美术师",
          label: "正高级工艺美术师"
        },
        {
          value: "正高级乡村振兴技艺师",
          label: "正高级乡村振兴技艺师"
        },
        {
          value: "高级工艺美术师",
          label: "高级工艺美术师"
        },
        {
          value: "高级乡村振兴技艺师",
          label: "高级乡村振兴技艺师"
        },
        {
          value: "工艺美术师",
          label: "工艺美术师"
        },
        {
          value: "乡村振兴技艺师",
          label: "乡村振兴技艺师"
        },
        {
          value: "助理工艺美术师",
          label: "助理工艺美术师"
        },
        {
          value: "助理乡村振兴技艺师",
          label: "助理乡村振兴技艺师"
        },
        {
          value: "工艺美术员",
          label: "工艺美术员"
        }
      ],
      honorSelectLabel: "荣誉称号",
      titleSelectLabel: "职称",
    };
  },
  onLoad() {
    this.searchData();
  },
  methods: {
    honorChangeHandler(event) {
      this.request.honorFilter = event.detail.value;
      this.searchData();
      this.honorSelectLabel = null;
    },
    titleChangeHandler(event) {
      this.request.titleFilter = event.detail.value;
      this.searchData();
      this.titleSelectLabel = null;
    },
    async searchData() {
      const res = await httpRequest({
        url: "/api/artistSearch",
        method: "get",
        data: this.request,
      });
      if (res.code == 200) {
        this.items = res.data;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/mixin.scss";
@import "./index.scss";


::v-deep .t-dropdown-menu__item {
  @include title($font-size: 28rpx, $font-weight: 500, $line-height: 40rpx, $color: #939598);

  .t-icon-caret-down-small:before {
    content: '\E0EA';
  }

  .t-radio__content {
    display: none;
  }
}

::v-deep .t-popup {
  .t-radio__icon {
    display: none;
  }

  .t-radio__title {
    text-align: center !important;
    @include title($font-size: 28rpx, $font-weight: 500, $line-height: 72rpx, $color: #131824);
  }

  .t-radio__title--checked {
    color: #E1560A;
  }

  .t-radio__border {
    display: none;
  }

  .t-radio--block {

    padding: 20rpx 0rpx !important;
  }

}
</style>