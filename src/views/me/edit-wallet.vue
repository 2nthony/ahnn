<script lang="ts">
import PageAddWallet from './add-wallet.vue'
import { editWalletStrategy } from '@/strategies/walletStrategy'

export default {
  extends: PageAddWallet,

  setup() {
    return editWalletStrategy()
  },
}
</script>
