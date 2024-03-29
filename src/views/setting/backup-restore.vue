<template>
  <div class="page-backup">
    <ViewingArea title="备份还原">
      <img
        src="/img/illustrations/undraw_file_sync_ot38.svg"
        alt="Backup-Restore"
        class="h-full"
      />
    </ViewingArea>

    <Note :type="'error'" class="mb-gap">
      <template #title>还原将会抹除所有本地数据</template>
      这意味着会先丢掉目前已存在的数据，随后再以导入的数据为起点。
    </Note>

    <div class="mb-gap">
      <Button class="w-full" @click="handleBackup">备份：保存数据到本地</Button>
    </div>

    <div>
      <Button class="w-full" @click="handleRestore"
        >还原：恢复保存的数据</Button
      >
    </div>
  </div>

  <div class="hidden">
    <input type="file" ref="fileSelectEl" @input="onFileSelected" />
    <a
      ref="downloadEl"
      :href="`data:text/plain;charset=utf-8,${backupJSON}`"
      download="ahnn-data.json"
    ></a>
  </div>

  <Tabbar></Tabbar>
</template>

<script lang="ts">
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import Button from '@app/components/ui/Button.vue'
import { clearRecord, readRecords, setRecord } from '@app/db/record'
import { nextTick, ref } from 'vue'
import { Record } from '@app/model/Record'
import { createToast } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'
import { useStore } from '@app/store'
import Note from '@app/components/Note.vue'

export default {
  components: { ViewingArea, Tabbar, Button, Note },

  setup() {
    const store = useStore()
    const backupJSON = ref('')
    const downloadEl = ref<HTMLElement | null>(null)
    const fileSelectEl = ref<HTMLInputElement | null>(null)

    function handleBackup() {
      const json: any = {}
      Promise.all([readRecords()]).then(([records]) => {
        json.records = records
        backupJSON.value = encodeURI(JSON.stringify(json))

        nextTick(() => {
          downloadEl.value?.click()
        })
      })
    }
    function handleRestore() {
      fileSelectEl.value?.click()
    }
    async function onFileSelected(e: any) {
      const files = e.target?.files
      if (!files.length) return

      const data = await readFile(files[0])

      // All from the backup data
      await Promise.all([clearRecord()])

      Promise.all([
        ...(data.records as Record[]).map((record) => {
          delete record.id
          return setRecord(record)
        }),
      ]).then(() => {
        createToast('数据已经全部导入完毕', {
          type: 'success',
          timeout: 3000,
        })
        store.dispatch('readRecordsByQueryDate')
      })
    }

    return {
      backupJSON,
      downloadEl,
      fileSelectEl,

      handleBackup,
      handleRestore,
      onFileSelected,
    }
  },
}

function readFile(file: Blob): Promise<any> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.readAsText(file, 'utf8')
    fileReader.onload = () => {
      resolve(JSON.parse(fileReader.result as string))
    }
  })
}
</script>
