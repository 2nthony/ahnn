<template>
  <div class="page-test">
    <div>
      <div>record</div>

      <Button @click="addRecord">add</Button>
      <Button @click="removeRecord">remove</Button>
      <Button @click="readRecord">read</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../components/ui/Button.vue'
import { HomeRecords } from '../mocks/home'
import { openDB } from '../utils/db'

export default defineComponent({
  components: { Button },
  setup() {
    const addRecord = async () => {
      const db = await openDB()
      db.add('record', HomeRecords[0])
    }

    const removeRecord = async () => {
      const db = await openDB()
      db.delete('record', 1)
    }

    const readRecord = async () => {
      const db = await openDB()
      const res = await db.getAll('record')
      console.log(res)
    }

    return {
      addRecord,
      removeRecord,
      readRecord
    }
  }
})
</script>
