<!--个人资料-->
<template>
  <div class="person-data-wrapper">
    <div class="header">
      <div class="title">头像</div>
      <div class="content">
        <div class="icon">
          <image class="icon-guard" :src="data_infos.avatar ? data_infos.avatar : `${img_prefix}/empty.png`
            " moda="aspectFit" />
        </div>
        <div class="arrow">
          <t-icon name="chevron-right" size="24" />
        </div>
      </div>
    </div>
    <div class="infos">
      <div class="box">
        <div class="title">昵称</div>
        <div class="content">
          <div class="subtitle" :class="{
            active: !isEmptyOrUndefinedOrNull(data_infos.nickname),
          }">
            {{ data_infos.nickname ? data_infos.nickname : "未选择" }}
          </div>
          <div class="arrow">
            <t-icon name="chevron-right" size="24" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">性别</div>
        <div class="content">
          <div class="subtitle" :class="{
            active: !isEmptyOrUndefinedOrNull(data_infos.gender),
          }">
            {{
              isEmptyOrUndefinedOrNull(data_infos.gender)
                ? "未选择"
                : data_infos.gender
            }}
          </div>
          <div class="arrow">
            <t-icon name="chevron-right" size="24" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">出生日期</div>
        <div class="content">
          <div class="subtitle" :class="{
            active: !isEmptyOrUndefinedOrNull(data_infos.birthday),
          }">
            {{
              isEmptyOrUndefinedOrNull(data_infos.birthday)
                ? "未选择"
                : data_infos.birthday
            }}
          </div>
          <div class="arrow">
            <t-icon name="chevron-right" size="24" />
          </div>
        </div>
      </div>
    </div>

    <div class="phone">
      <div class="title">手机号</div>
      <div class="content">
        <div class="subtitle" :class="{
          active: !isEmptyOrUndefinedOrNull(data_infos.phone),
        }">
          {{
            isEmptyOrUndefinedOrNull(data_infos.phone)
              ? "未选择"
              : data_infos.phone
          }}
        </div>
        <div class="arrow">
          <t-icon name="chevron-right" size="24" />
        </div>
      </div>
    </div>
    <div class="others">
      <div class="box">
        <div class="title">支付密码</div>
        <div class="content">
          <div class="subtitle" :class="{
            active: !isEmptyOrUndefinedOrNull(data_infos.pay_password),
          }">
            {{
              isEmptyOrUndefinedOrNull(data_infos.pay_password)
                ? "未选择"
                : data_infos.bank_card
            }}
          </div>
          <div class="arrow">
            <t-icon name="chevron-right" size="24" />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="title">银行卡</div>
        <div class="content">
          <div class="subtitle" :class="{
            active: !isEmptyOrUndefinedOrNull(data_infos.bank_card),
          }">
            {{
              isEmptyOrUndefinedOrNull(data_infos.bank_card)
                ? "未选择"
                : data_infos.bank_card
            }}
          </div>
          <div class="arrow">
            <t-icon name="chevron-right" size="24" />
          </div>
        </div>
      </div>
    </div>

    <t-picker :visible="genderVisible" :value="data_infos.gender" data-key="gender" title="选择性别" cancelBtn="取消"
      confirmBtn="确认" usingCustomNavbar @change="onPickerChange">
      <t-picker-item :options="genders" />
    </t-picker>
  </div>
</template>
<script>
import { isEmptyOrUndefinedOrNull } from "@/utils/index";
import { httpRequest } from "@/utils/http.js";
export default {
  components: {},
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      genders: [
        { label: "男", value: "男" },
        { label: "女", value: "女" },
      ],
      genderVisible: true,
      data_infos: {
        avatar: "",
        nickname: "2",
        gender: "3",
        birthday: "4",
        phone: "5",
        pay_password: "6",
        bank_card: "7",
      },
    };
  },
  onLoad(options) {
    this.fetchDataList();
  },
  methods: {
    async fetchDataList() {
      const res = await httpRequest({
        url: "/buyer/passport/member",
        method: "get",
      });
    },
    isEmptyOrUndefinedOrNull,
    onPickerChange(e) {
      const { value } = e.detail;
      this.data_infos.gender = value;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
