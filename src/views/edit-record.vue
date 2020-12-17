<script lang="ts">
import { editRecordStrategy } from '@/strategies/pageAddRecordStrategy'
import PageAddRecord from './add-record.vue'
import { toFixed } from '@/utils'

export default {
  extends: PageAddRecord,

  setup() {
    return {
      ...editRecordStrategy(),
      toFixed,
    }
  },
}
</script>
