<script lang="ts">
import { editRecordStrategy } from '@/strategies/pageAddRecordStrategy'
import PageAddRecord from './add-record.vue'

export default {
  extends: PageAddRecord,

  setup: editRecordStrategy,
}
</script>
