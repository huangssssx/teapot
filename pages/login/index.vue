<template>
  <div class="page">
    <!-- <div>code: {{ code || "" }}</div>
        <button @click="login">获取code</button> -->

    <!-- <button open-type="getPhoneNumber" @getphonenumber="mobileLogin">登录</button>
        <div>{{ phoneCode }}</div>
        <button open-type="contact" bindcontact="handleContact">客服</button> -->
    <!-- <button @click="getUserProfile">获取用户信息</button> -->

    <!-- <div>{{ userInfo }}</div> -->
  </div>
</template>
<script>
import { httpRequest } from "@/utils/http.js";
import { setToken } from "@/utils/storage.js";
export default {
  data() {
    return {
      phoneCode: "",
      code: "",
    };
  },
  onLoad(options) {
    this.login();
  },
  methods: {
    handleContact(e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    },
    mobileLogin(e) {
      const phoneCode = e.detail.code;
      this.phoneCode = phoneCode;
      // console.log("@@@@@@@@", phoneCode);
      // wx.login({
      //     async success(res) {
      //         const { code } = res;
      //         if (code) {
      //             const res = await httpRequest({
      //                 url: "/wx/auth/wxlogin",
      //                 method: "POST",
      //                 data: {
      //                     code: code,

      //                 },
      //             });
      //             console.log("@@@@@@@@", res.code);

      //         } else {
      //             console.log('登录失败！' + res.errMsg)
      //         }
      //     }
      // })
    },
    // getUserProfile() {
    //     uni.getUserProfile({
    //         desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //         success: (res) => {
    //             // console.log("#######", res);
    //             this.userInfo = JSON.stringify(res
    //         },
    //         fail: (err) => {
    //         }
    //     })
    // },
    async login() {
      const that = this;
      wx.login({
        async success(res) {
          const { code } = res;
          if (code) {
            const res = await httpRequest({
              url: "/buyer/passport/connect/miniProgram/auto-login",
              method: "post",
              data: {
                code: code,
              },
            });
            console.log("@@@@@@@@", res);

            if (res.code == 200) {
              setToken(res.data.token);
              // wx.switchTab({
              //     url: '/pages/index/index'
              // });
            }
            that.code = code;
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    },
    someMethod() {
      const accessToken = this.$store.state.user.token;
      console.log("Current accessToken:", accessToken);

      // 使用 accessToken 进行其他操作...
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
