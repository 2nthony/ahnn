<template>
  <div class="hide-safe-area-content"></div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { hooks, collect } from './hooks'

export default defineComponent({
  name: 'App',
  setup() {
    collect()
    onBeforeMount(() => hooks.invoke('appBeforeMount'))
    onMounted(() => hooks.invoke('appMounted'))
  },
})
</script>

<style lang="less" src="./styles/theme.less"></style>
<style lang="less" src="./styles/var.less"></style>
<style lang="less" src="./styles/weird.less"></style>

<style lang="less" src="./styles/global.less"></style>
