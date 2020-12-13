<script lang="ts">
import PageAddWallet from './add-wallet.vue'
import { editWalletStrategy } from '@/strategies/pageAddWalletStrategy'

export default {
  extends: PageAddWallet,

  setup() {
    return editWalletStrategy()
  },
}
</script>
