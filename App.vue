<script>
import { httpRequest } from "@/utils/http.js";
export default {
  onLaunch: function () {
    console.log("开始请求登录token");
    this.login();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
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
              that.$store.dispatch("user/login", res.result.accessToken);
            }
            that.code = code;
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    },
  },
};
</script>

<style>
/*每个页面公共css */
</style>
