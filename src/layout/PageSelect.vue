<template>
  <div class="page-select">
    <ViewingArea :title="`选择${title}`">
      <slot name="viewing-area" />
    </ViewingArea>

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
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import Pane from '@app/components/ui/Pane.vue'
import { setProps } from '@app/utils/setProps'
import Text from '@app/components/ui/Text.vue'
import RemixIcon from '@app/components/RemixIcon.vue'

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
  width: calc(50% - var(--geist-gap-half));
  padding: var(--geist-gap);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: var(--geist-gap);
  background-color: var(--geist-background);
  min-height: 120px;
  border-radius: var(--geist-radius);
  cursor: pointer;

  &:hover {
    background-color: var(--accents-1);
  }

  &:active {
    background-color: var(--accents-2);
  }

  & .icon {
    width: 2rem;
    height: 2rem;
    margin-bottom: 10px;
  }
}
</style>
