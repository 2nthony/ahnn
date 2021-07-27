<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { runMixinEvents } from './mixin-events'

export default defineComponent({
  name: 'App',
  setup() {
    runMixinEvents()
  },
})
</script>

<style lang="less" src="./styles/theme.less"></style>
<style lang="less" src="./styles/var.less"></style>
<style lang="less" src="./styles/weird.less"></style>

<style lang="less" src="./styles/global.less"></style>
