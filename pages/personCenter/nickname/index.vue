<!--个人资料-->
<template>
  <div class="person-nickname-edit-wrapper">
    <div class="input">
      <t-input
        label="昵称"
        layout="vertical"
        placeholder="请输入昵称"
      ></t-input>
    </div>

    <div class="tips">4~20个字符，可由中英文、数字、特殊符号组成</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      img_prefix: this.globalProperties.img_prefix,
      data_infos: {},
    };
  },
  onLoad(options) {},
  methods: {},
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
