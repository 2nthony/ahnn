<template>
  <div class="appreance">
    <ViewingArea title="外观"></ViewingArea>

    <Group>
      <Cell
        v-for="appreance in appreances"
        :key="appreance.value"
        :title="appreance.title"
        @click="handleSwitchAppreance(appreance.value)"
      >
        <template #right-text v-if="appreance.value === preference.appreance">
          <RemixIcon :icon="'check'" />
        </template>
      </Cell>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@app/components/ViewingArea.vue'
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import Tabbar from '@app/components/Tabbar.vue'
import RemixIcon from '@app/components/RemixIcon.vue'
import { useStore } from '@app/store'
import { computed } from 'vue'
import { Appreance, AppreanceCNText, Appreances } from '@app/model/Preference'
import { switchAppreance } from '@app/utils/preference/switchAppreance'
import { setPreference } from '@app/db/preference'

export default {
  components: { ViewingArea, Group, Cell, Tabbar, RemixIcon },
  setup() {
    const store = useStore()
    const preference = computed(() => store.getters.preference)

    const appreances = [Appreances.auto, Appreances.light, Appreances.dark].map(
      (val) => ({
        title: AppreanceCNText[val],
        value: val,
      }),
    )

    const handleSwitchAppreance = (type: Appreance) => {
      if (type === preference.value.appreance) return

      switchAppreance(type)
      store.commit('setPreference', { appreance: type })
      setPreference(preference.value)
    }

    return { appreances, preference, handleSwitchAppreance }
  },
}
</script>
