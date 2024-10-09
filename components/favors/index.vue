<template>
    <div class="favors-wrapper">
        <image class="icon" :src="`${img_prefix}/favors/${state}.png`" mode="widthFix" @click="toggle(item)" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            img_prefix: this.globalProperties.img_prefix,
            state: 0
        }
    },
    methods: {
        toggle() {

            if (this.state == 0) {
                this.state = 1
            } else {
                this.state = 0
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.favors-wrapper {
    width: 32rpx;
    height: 32rpx;

    .icon {
        width: 100%;
    }
}
</style>