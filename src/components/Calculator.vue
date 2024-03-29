<template>
  <div class="calculator">
    <div class="flex">
      <div class="button flex-2 button-2x">{{ input }}</div>
      <div class="button flex-1" @click="inputBackspace">
        <RemixIcon :icon="'delete-back-2'" />
      </div>
      <div
        class="button operator flex-1"
        @click="inputOperator(operators.divide)"
      >
        <RemixIcon :icon="'divide'" />
      </div>
    </div>
    <div class="flex">
      <div class="button flex-1" @click="inputNumber('7')">7</div>
      <div class="button flex-1" @click="inputNumber('8')">8</div>
      <div class="button flex-1" @click="inputNumber('9')">9</div>
      <div class="button flex-1" @click="inputOperator(operators.multiply)">
        <RemixIcon :icon="'close'" />
      </div>
    </div>
    <div class="flex">
      <div class="button flex-1" @click="inputNumber('4')">4</div>
      <div class="button flex-1" @click="inputNumber('5')">5</div>
      <div class="button flex-1" @click="inputNumber('6')">6</div>
      <div class="button flex-1" @click="inputOperator(operators.minus)">
        <RemixIcon :icon="'subtract'" />
      </div>
    </div>
    <div class="flex">
      <div class="button flex-1" @click="inputNumber('1')">1</div>
      <div class="button flex-1" @click="inputNumber('2')">2</div>
      <div class="button flex-1" @click="inputNumber('3')">3</div>
      <div class="button flex-1" @click="inputOperator(operators.plus)">
        <RemixIcon :icon="'add'" />
      </div>
    </div>
    <div class="flex">
      <div class="button flex-2 button-2x" @click="inputNumber('0')">0</div>
      <div class="button flex-1" @click="inputNumber('.')">.</div>
      <div class="button flex-1" @click="inputEqual">=</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import RemixIcon from './RemixIcon.vue'
import { stringMath } from '@app/utils/stringMath'
import { toRound } from '@app/utils'

export default defineComponent({
  components: { RemixIcon },

  setup(_props, { emit }) {
    const input = ref<string>('')

    watch(input, (val) => {
      // 当为正常数字时发送结果
      // 在 `inputNumber` 限制小数点个数
      const firstInputNumber = (/^([\d.])+/.exec(val) || [''])[0]
      emit('result', Number(firstInputNumber || 0))
    })

    const operators = {
      plus: '+',
      minus: '-',
      multiply: '*',
      divide: '/',
    }

    const inputNumber = (val: string) => {
      const lastInput = input.value[input.value.length - 1]

      // 禁止存在多个 .
      if (val === '.') {
        if (lastInput === val || (input.value.match(/\./g) || []).length >= 1) {
          return
        }

        if (!input.value) {
          input.value = '0'
        }
      }

      input.value += val
    }

    const inputOperator = (val: string) => {
      const lastInput = input.value[input.value.length - 1]
      let isExistOperator = false
      for (let i = 0; i < input.value.length; i++) {
        if (Object.values(operators).indexOf(input.value[i]) !== -1) {
          isExistOperator = true
          break
        }
      }

      if (Object.values(operators).indexOf(lastInput) !== -1) {
        input.value = input.value.slice(0, input.value.length - 1)
      } else if (isExistOperator) {
        inputEqual()
      }

      if (!input.value) {
        input.value = '0'
      }

      input.value += val
    }

    const inputBackspace = () => {
      input.value = input.value.slice(0, input.value.length - 1)
    }

    const inputEqual = () => {
      try {
        const res = stringMath(input.value)
        if (res) {
          input.value = '' + toRound(res)
        }
      } catch (e) {
        console.error(e)
      }
    }

    return {
      input,
      inputNumber,
      inputBackspace,
      inputEqual,
      inputOperator,

      operators,
    }
  },
})
</script>

<style lang="less" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  font-size: 1.25rem;
  background-color: var(--accents-1);
  color: var(--geist-foreground);
  cursor: pointer;
  border-radius: var(--geist-radius);

  &:not(:last-child) {
    margin-right: var(--geist-space);
  }

  &.button-2x {
    padding-right: var(--geist-space);
  }

  &:active {
    background-color: var(--accents-2);
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.flex:not(:last-child) {
  margin-bottom: var(--geist-space);
}
</style>
