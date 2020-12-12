<template>
  <div class="page-select">
    <ViewingArea :title="`选择${title}`"></ViewingArea>

    <div class="list">
      <Pane
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('item-click', index)"
        :float="3"
      >
        <RemixIcon v-if="item.icon" :icon="item.icon" class="icon" />
        <Text>{{ item.name }}</Text>
      </Pane>
    </div>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import Pane from '@/components/ui/Pane.vue'
import { setProps } from '@/utils/setProps'
import Text from '@/components/ui/Text.vue'
import RemixIcon from '@/components/RemixIcon.vue'

export default {
  components: { ViewingArea, Tabbar, Pane, Text, RemixIcon },

  props: {
    items: setProps('array', []),
    title: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: calc(50% - var(--inline-gap));
  padding: var(--gap);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: var(--gap);
  background-color: var(--ahnn-background);
  min-height: 120px;
  border-radius: var(--radius);

  & .icon {
    width: 2rem;
    height: 2rem;
    margin-bottom: 10px;
  }
}
</style>
