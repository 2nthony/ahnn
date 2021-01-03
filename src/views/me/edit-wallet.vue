<script lang="ts">
import PageAddWallet from './add-wallet.vue'
import { editWalletStrategy } from '@app/strategies/pageAddWalletStrategy'

export default {
  extends: PageAddWallet,

  setup() {
    return editWalletStrategy()
  },
}
</script>
