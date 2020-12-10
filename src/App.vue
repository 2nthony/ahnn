<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { hooks } from './utils/hooks'

export default defineComponent({
  name: 'App',
  setup() {
    onBeforeMount(() => hooks.invoke('appBeforeMount'))
    onMounted(() => hooks.invoke('appMounted'))
  },
})
</script>

<style lang="less" src="./styles/theme.less"></style>
<style lang="less" src="./styles/var.less"></style>
<style lang="less" src="./styles/weird.less"></style>

<style lang="less" src="./styles/global.less"></style>
