<template>
  <div class="content" ref="content">
    <uni-nav-bar @clickLeft="back" :fixed="true" class="nav-bar" status-bar ref="navBar" left-icon="left"
      :border="false" height="88rpx">
    </uni-nav-bar>
    <div class="tool-bar">
      <div class="edit-name" @click="toggleMode">
        {{ mode === "default" ? "编辑" : "完成" }}
      </div>
    </div>
    <div class="body-container">
      <ShopCartItemVue :item="item" v-for="item in shopCartList" :key="item.id" :selected="isSelected(item.id)"
        @click.native="toggleSelected(item.id)"></ShopCartItemVue>
    </div>

    <div class="footer-container">
      <div class="default-footer" v-if="mode === 'default'">
        <div class="select-all" @click="toggleDefaultCheckAll">
          <div :class="defaultCheckAllStatus ? 'selected' : 'default'"></div>
          全选
        </div>
        <div class="summary">
          <div class="inner">
            <p class="selected-items">
              已选<span class="items-count">{{
                settlementIds.length || 0
                }}</span>件 合计:
              <span class="total-amount">¥{{ totalAmount }}</span>
            </p>
            <p class="total-discount">
              共优惠:
              <span class="discount-amount">¥{{ totalDiscountPrice }}</span>
            </p>
          </div>
        </div>

        <div class="settlement">
          <div class="btn">去结算</div>
        </div>
      </div>
      <div class="edit-footer" v-else>
        <div class="select-all" @click="toggleEditCheckAll">
          <div :class="editCheckAllStatus ? 'selected' : 'default'"></div>
          全选
        </div>

        <div class="settlement">
          <div class="btn">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpRequest } from "@/utils/http.js";
import ShopCartItemVue from "./components/ShopCartItem.vue";
export default {
  components: { ShopCartItemVue },
  data() {
    return {
      editCheckAllStatus: false,
      defaultCheckAllStatus: false,
      mode: "default", //edit|default
      shopCartList: [
        {
          image_url: "http://47.113.96.167/images/03.png",
          name: "紫砂壶1",
          author: "作者1",
          id: "001",
          material: "紫泥",
          capacity: "200ml",
          type: "圆器",
          discount: "9折",
          price: "1000",
          discountPrice: 400,
        },
        {
          image_url: "http://47.113.96.167/images/03.png",
          name: "紫砂壶2",
          author: "作者2",
          id: "002",
          material: "紫泥",
          capacity: "200ml",
          type: "圆器",
          discount: "9折",
          price: "2000",
          discountPrice: 300,
        },
        ...Array.from({ length: 8 }, (_, index) => ({
          image_url: `http://example.com/images/pot${index + 3}.png`, // 假设的图片URL
          name: `紫砂壶${index + 3}`,
          author: `作者${(index % 3) + 1}`, // 循环使用三个作者
          id: `00${index + 3}`,
          material: ["紫泥", "红泥", "绿泥"][index % 3], // 循环使用三种材料
          capacity: "200ml",
          type: ["圆器", "方器"][index % 2], // 循环使用两种类型
          discount: ["9折", "8折"][index % 2], // 循环使用两种折扣
          price: Math.floor(Math.random() * 5000) + 1000, // 随机生成1000到5999之间的价格
          discountPrice: Math.floor(Math.random() * 1000) + 100, // 优惠金额在100到原价减100之间
        })),
      ],
      settlementIds: [],
      editIds: [],
    };
  },
  onLoad() { },
  onReachBottom() { },
  mounted() { },
  computed: {
    totalAmount() {
      let discountedTotal = 0;
      this.settlementIds.forEach((id) => {
        const item = this.shopCartList.find((item) => item.id === id);
        if (item) {
          discountedTotal +=
            parseFloat(item.price) - parseFloat(item.discountPrice);
          console.log("@@@@@@@@@@@@@", item.price, item.discountPrice);
        }
      });
      return discountedTotal.toFixed(2);
    },
    totalDiscountPrice() {
      let discountedTotal = 0;
      this.settlementIds.forEach((id) => {
        const item = this.shopCartList.find((item) => item.id === id);
        if (item) {
          discountedTotal += parseFloat(item.discountPrice);
        }
      });
      return discountedTotal.toFixed(2);
    },
  },
  methods: {
    toggleEditCheckAll() {
      this.editCheckAllStatus = !this.editCheckAllStatus;
      if (this.editCheckAllStatus) {
        this.shopCartList.forEach((item) => {
          this.toggleItemSelection(item.id, this.editIds);
        });
      } else {
        this.editIds = [];
      }
    },
    toggleDefaultCheckAll() {
      this.defaultCheckAllStatus = !this.defaultCheckAllStatus;
      if (this.defaultCheckAllStatus) {
        this.shopCartList.forEach((item) => {
          this.toggleItemSelection(item.id, this.settlementIds);
        });
      } else {
        this.settlementIds = [];
      }
    },
    toggleSelected(id) {
      const ids = this.mode === "default" ? this.settlementIds : this.editIds;
      this.toggleItemSelection(id, ids);
    },

    toggleItemSelection(id, ids) {
      if (ids.includes(id)) {
        ids.splice(ids.indexOf(id), 1); // 使用splice直接移除元素，比filter更高效
      } else {
        ids.push(id);
      }
    },

    toggleMode() {
      this.mode = this.mode === "edit" ? "default" : "edit";
    },
    isSelected(id) {
      const ids = this.mode === "default" ? this.settlementIds : this.editIds;
      return ids.includes(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/vars.scss";
@import "~@/mixin.scss";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;

  .nav-bar {
    .icon {
      min-width: 258rpx;
      height: 100%;
      margin: 0rpx 0rpx 14rpx 20rpx;
    }
  }

  .tool-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 88rpx;
    /* background-color: red; */
    padding: 22rpx 24rpx;
    box-sizing: border-box;

    .edit-name {
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 500;
      font-size: 32rpx;
      color: #131824;
      line-height: 46rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .body-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16rpx;
    width: 100%;
    height: calc(100% - 88rpx - 88rpx - 180rpx);
    background-color: #f5f7fa;
    padding: 16rpx 24rpx 16rpx 24rpx;
    box-sizing: border-box;
    overflow: auto;
  }

  .footer-container {
    //增加阴影
    border-top: 2px solid #f8f9fa;
    background: #ffffff;
    width: 100%;
    height: 180rpx;
    overflow: hidden;

    .default-footer,
    .edit-footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 112rpx;

      .select-all {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;
        width: 166rpx;
        height: 100%;
        /* background: red; */
        @include selected;
      }

      .summary {
        display: flex;
        align-items: center;
        width: 382rpx;
        height: 100%;
        /* background: blue; */
        font-size: 16px;

        .inner {
          width: 100%;
        }

        .selected-items {
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 400;
          font-size: 24rpx;
          color: #131824;
          line-height: 34rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;

          .items-count {
            font-weight: normal;
          }

          .total-amount {
            font-weight: 700;
            font-size: 24rpx;
            color: #f64f4f;
          }
        }

        .total-discount {
          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 400;
          font-size: 24rpx;
          color: #939598;
          line-height: 34rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;

          .discount-amount {}
        }
      }

      .settlement {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 196rpx;
        height: 100%;
        /* background: green; */

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 172rpx;
          height: 88rpx;
          background: #e1560a;
          border-radius: 64rpx 64rpx 64rpx 64rpx;

          font-family: Source Han Serif CN, Source Han Serif CN;
          font-weight: 600;
          font-size: 36rpx;
          color: #ffffff;
          line-height: 52rpx;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }
}
</style>
