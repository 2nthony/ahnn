<template>
  <ViewingArea>
    <img
      src="/img/illustrations/undraw_shopping_app_flsj.svg"
      alt="Get Code"
      class="h-full"
    />
  </ViewingArea>

  <Pane class="mb-gap-half">
    <Heading>非常高兴你能够有兴趣点进这里来。</Heading>
  </Pane>

  <Pane class="mb-gap-half">
    <Text
      >此应用<b>并非开源软件</b>，你可以通过微信号 ijoec123
      或者扫描二维码添加我并且<b>转账 50 元</b>来购买源码。购买后我会邀请你进
      GitHub 仓库，可享受后续所有更新。</Text
    >
    <img
      class="w-1/3 mx-auto mt-2"
      src="/img/qrcode.jpeg"
      alt="wechat: ijoec123"
    />
  </Pane>

  <Heading class="mb-gap-half text-center"
    >请你看到最后再决定是否购买！</Heading
  >

  <Pane class="mb-gap-half">
    <Text
      >此应用代码主要面向于有一定基础的前端学习者。你可以用来做毕设，或者用来练手，<b>但不得传播给任何人或有任何商业行为</b>。</Text
    >
  </Pane>

  <Pane class="mb-gap-half">
    <Text
      >此应用从设计到在线上运行均由我一人完成，有少量自己的开源库，也有修改过的其他开源库。</Text
    >
  </Pane>

  <Pane class="mb-gap-half">
    <Text>此应用自身包含了以下技术点：</Text>

    <ul>
      <li>- Vue 3</li>
      <li>- Vuex 4</li>
      <li>- Vue Router 4</li>
      <li>- TypeScript</li>
      <li>- Tailwindcss</li>
      <li>- IndexedDB （浏览器数据库</li>
      <li>- Node.js</li>
      <li>- NPM</li>
      <li>- Vue CLI （Webpack</li>
    </ul>
  </Pane>

  <Pane class="mb-gap-half">
    <Text>归纳整个项目来看，除了学习代码以外，你还可以学习到：</Text>
    <ul>
      <li>- 插件式扩展项目的 Webpack 配置</li>
      <li>- 良好的代码结构目录</li>
    </ul>
  </Pane>

  <Pane class="mb-gap-half">
    <Text
      >代码可能不是最好的，每个人有自己的代码风格，但无疑这是最适合我的。</Text
    >
  </Pane>

  <Pane>
    <Text
      >最后对于购买者，项目制作不易，希望你能尊重作者的知识，请别随意分享给任何人。🙏</Text
    >
  </Pane>

  <Tabbar></Tabbar>
</template>

<script lang="ts">
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import Text from '@app/components/ui/Text.vue'
import Pane from '@app/components/ui/Pane.vue'
import Heading from '@app/components/ui/Heading.vue'

export default {
  components: { ViewingArea, Tabbar, Text, Pane, Heading },
}
</script>

<style scoped>
li {
  font-size: 14px;
}
</style>
