<!-- 个人中心 -->
<template>
  <div class="person-wrapper">
    <uni-nav-bar
      :fixed="true"
      class="nav-bar"
      status-bar
      @clickLeft="back"
      :border="false"
    >
    </uni-nav-bar>

    <div class="avatar-container">
      <div class="content">
        <div class="avatar">
          <image
            class="icon favorite_active"
            :src="`${img_prefix}/cartServiceFloating/${
              favorite ? 'favorite_active' : 'favorite'
            }.png`"
            mode="aspectFit"
          />
        </div>
        <div class="block">
          <div class="name">{{ userInfo.username || "" }}</div>
          <div class="level-container">
            <image
              class="icon"
              :src="`${img_prefix}/person-center/lv-0${userInfo.membershipLevel}.png`"
              mode="aspectFit"
            />
            <div class="level">
              {{ user_levels[userInfo.membershipLevel || 3] }}
            </div>
            <t-icon name="chevron-right" size="16" color="#E1560A"></t-icon>
          </div>
        </div>
      </div>

      <t-icon name="chevron-right" size="16" color="#939598"></t-icon>
    </div>

    <div class="balance-points-card">
      <div class="inner-container">
        <div class="box">
          <div class="title">余额</div>
          <div class="num">{{ accountStats.balance || 0 }}</div>
          <div class="description">余额明细</div>
        </div>
        <div class="box">
          <div class="title">积分</div>
          <div class="num">{{ accountStats.points || 0 }}</div>
          <div class="description">积分明细</div>
        </div>
      </div>
    </div>

    <div class="order-card">
      <div class="inner-container">
        <div class="title-container">
          <div class="title">订单</div>

          <div class="option">
            订单中心
            <t-icon name="chevron-right" size="16" color="#E1560A"></t-icon>
          </div>
        </div>
        <div class="content-container">
          <div class="order-item" :key="index" v-for="(item, index) in orders">
            <div class="icon">
              <image :src="item.img" mode="aspectFit"></image>
            </div>
            <div class="name">{{ item.name || "" }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="more-service-card">
      <div class="inner-container">
        <div class="title-container">
          <div class="title">更多服务</div>
        </div>
        <div class="content-container">
          <div
            class="service-item"
            :key="index"
            v-for="(item, index) in services"
          >
            <div class="icon">
              <image :src="item.img" mode="aspectFit"></image>
            </div>
            <div class="name">{{ item.name || "" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { user_levels } from "@/utils/enum.js";
export default {
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      userInfo: {
        username: "浩辰设计",
        membershipLevel: "1",
        avatarUrl: "http://47.113.96.167/images/03.png",
      },
      accountStats: {
        balance: 2000.0,
        points: 2000.0,
      },
      orders: [
        {
          img: `${this.globalProperties.img_prefix}/person-center/order/1.png`,
          name: "待付款",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/order/2.png`,
          name: "等发货",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/order/3.png`,
          name: "待收货",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/order/4.png`,
          name: "待评价",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/order/6.png`,
          name: "退/换货",
        },
      ],
      services: [
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/1.png`,
          name: "积分商城",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/2.png`,
          name: "优惠券",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/3.png`,
          name: "我的收藏",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/4.png`,
          name: "我的地址",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/5.png`,
          name: "在线客服",
        },
        {
          img: `${this.globalProperties.img_prefix}/person-center/service/6.png`,
          name: "关于我们",
        },
      ],
      user_levels,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/mixin.scss";
@import "~@/vars.scss";

.person-wrapper {
  height: 100vh;
  background: #f5f7fa;
  box-sizing: border-box;

  .nav-bar {
    .icon {
      min-width: 258rpx;
      height: 100%;
      // padding: 0rpx 0rpx 14rpx 32rpx;
      margin: 0rpx 0rpx 14rpx 20rpx;
    }

    .left-container {
      position: relative;
      height: 60rpx;

      .icon {
        height: 100%;
      }
    }

    ::v-deep .uni-navbar__header-btns-left {
      width: 500rpx !important;
    }

    ::v-deep .uni-navbar__content {
      background: linear-gradient(to bottom, #ffe5d6, #f5f7fa),
        radial-gradient(circle at right, #fff8d670, rgba(255, 248, 214, 0));
      background-blend-mode: multiply;
      background-size: 100% 200%;
      background-position: top;

      // background-color: red!important;
      .uni-navbar__header {
        background: transparent !important;
      }
    }
  }

  .avatar-container {
    @include flex(space-between, center);
    width: 100%;
    height: 172rpx;
    background: linear-gradient(to bottom, #ffe5d6, #f5f7fa),
      radial-gradient(circle at right, #fff8d670, rgba(255, 248, 214, 0));
    background-blend-mode: multiply;
    background-size: 100% 200%;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    background-position: bottom;
    @include box-size($padding: 0rpx 24rpx);

    .content {
      width: fit-content;
      height: 108rpx;
      @include flex(flex-start, center, 32rpx);

      .avatar {
        width: 108rpx;
        height: 108rpx;
        border-radius: 50%;
        background-color: #d3d3d3;
        /* border: 1px solid red; */

        image {
          width: 100%;
          height: 100%;
        }
      }

      .block {
        height: 100%;
        width: fit-content;
        @include flex(center, flex-start, 12rpx, column);

        .name {
          min-width: 160rpx;
          height: 58rpx;
          @include title(40rpx);
          color: #1c2123;
        }

        .level-container {
          @include flex(flex-start, center);
          width: fit-content;
          height: 40rpx;
          background: rgba(225, 85, 10, 0.1);
          border-radius: 20rpx 20rpx 20rpx 20rpx;

          padding: 0rpx 16rpx;
          box-sizing: border-box;

          .icon {
            opacity: 1;
            @include size();
          }

          .level {
            @include title(24rpx, 400, 34rpx);
            color: #e1560a;
          }

          .right-arrow {
          }
        }
      }
    }
  }

  .balance-points-card {
    position: relative;
    top: 0rpx;
    @include box-size(0rpx 24rpx);
    @include size(100%, 262rpx);
    background-clip: content-box;
    border-radius: 20rpx;

    .inner-container {
      @include flex(space-between, center, $gap: 32rpx);
      @include size(100%, 100%);
      @include box-size(24rpx 32rpx 65rpx 32rpx);
      background-color: $color_brown;
      border-radius: 20rpx;

      .box {
        @include flex(space-between, flex-start, $flex-direction: column);
        flex: 1;
        height: 100%;

        .title {
          @include title(
            $font-size: 28rpx,
            $font-weight: 400,
            $line-height: 40rpx
          );
          color: $color_white;
        }

        .num {
          @include title(
            $font-size: 40rpx,
            $font-weight: 700,
            $line-height: 48rpx
          );
          color: $color_white;
        }

        .description {
          @include title(
            $font-size: 28rpx,
            $font-weight: 400,
            $line-height: 40rpx
          );
          color: $color_white;
        }
      }

      .box:nth-child(1) {
        position: relative;
        @include split_line(
          $mt: 5rpx,
          $width: 2rpx,
          $color: rgba(255, 255, 255, 0.2)
        );
      }
    }
  }

  .order-card,
  .more-service-card {
    position: relative;
    top: -40rpx;
    @include size(100%, 272rpx);
    @include box-size(0rpx 24rpx);

    .inner-container {
      @include size(100%, 100%);
      background: $color_white;
      border-radius: 24rpx 24rpx 24rpx 24rpx;

      .title-container {
        @include flex(space-between, center);
        @include size(100%, 104rpx);
        @include box-size(0rpx 24rpx 0rpx 48rpx);
        /* background: red; */

        .title {
          position: relative;
          min-width: 0rpx;
          @include title($font-size: 32rpx, $line-height: 40rpx);
          color: #131824;
          @include split_line(
            $mt: 5rpx,
            $width: 8rpx,
            $height: 32rpx,
            $color: #e1560a,
            $position: left,
            $gap: -20rpx
          );
        }

        .option {
          @include flex;
          @include title($line-height: 40rpx);
          color: #e1560a;
        }
      }

      .content-container {
        @include flex(space-between, center);
        @include size(100%, 120rpx);

        .order-item {
          @include flex($flex-direction: column);
          @include size(144rpx);
        }

        .icon {
          @include size(64rpx);

          image {
            @include size(100%, 100%);
          }
        }

        .name {
          @include size(100%, 40rpx);
          @include title(
            $font-size: 28rpx,
            $font-weight: 400,
            $line-height: 40rpx,
            $color: #131824
          );
          text-align: center;
        }
      }
    }
  }

  .more-service-card {
    top: -20rpx;

    .inner-container {
      height: fit-content !important;
      padding-bottom: 32rpx !important;
    }

    .content-container {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: auto;
      row-gap: 48rpx !important;
      height: auto !important;
    }

    .service-item {
      @include flex($flex-direction: column);
      @include size(144rpx);

      .icon {
        width: 72rpx !important;
        height: 72rpx !important;
      }
    }
  }
}
</style>