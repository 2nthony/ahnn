<template>
  <div class="calculator">
    <div class="row">
      <div class="button flex-2">{{ input }}</div>
      <div class="button" @click="inputBackspace"><delete-icon></delete-icon></div>
      <div class="button operator" @click="inputOperator(operators.divide)"><divide-icon></divide-icon></div>
    </div>
    <div class="row">
      <div class="button" @click="inputNumber('7')">7</div>
      <div class="button" @click="inputNumber('8')">8</div>
      <div class="button" @click="inputNumber('9')">9</div>
      <div class="button operator" @click="inputOperator(operators.multiply)"><x-icon></x-icon></div>
    </div>
    <div class="row">
      <div class="button" @click="inputNumber('4')">4</div>
      <div class="button" @click="inputNumber('5')">5</div>
      <div class="button" @click="inputNumber('6')">6</div>
      <div class="button operator" @click="inputOperator(operators.minus)"><minus-icon></minus-icon></div>
    </div>
    <div class="row">
      <div class="button" @click="inputNumber('1')">1</div>
      <div class="button" @click="inputNumber('2')">2</div>
      <div class="button" @click="inputNumber('3')">3</div>
      <div class="button operator" @click="inputOperator(operators.plus)"><plus-icon></plus-icon></div>
    </div>
    <div class="row">
      <div class="button flex-2" @click="inputNumber('0')">0</div>
      <div class="button" @click="inputNumber('.')">.</div>
      <div class="button operator" @click="inputEqual">=</div>
    </div>
  </div>
</template>

<script lang="ts">
import { evaluate } from 'mathjs'
import DivideIcon from '../feather/divide.svg'
import XIcon from '../feather/x.svg'
import MinusIcon from '../feather/minus.svg'
import PlusIcon from '../feather/plus.svg'
import DeleteIcon from '../feather/delete.svg'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: { DivideIcon, XIcon, MinusIcon, PlusIcon, DeleteIcon },

  setup(_props, { emit }) {
    const input = ref<string>('')

    watch(input, val => {
      // 当为正常数字时发送结果
      // 在 `inputNumber` 限制小数点个数
      if (/^[\d.]+$/.test(input.value)) {
        emit('result', Number(val))
      } else {
        emit('result', 0)
      }
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
        const res = evaluate(input.value)
        if (res) {
          input.value = '' + res
        }
      } catch(e) {
        console.error(e)
      }
    }

    return {
      input,
      inputNumber,
      inputBackspace,
      inputEqual,
      inputOperator,

      operators
    }
  }
})
</script>

<style lang="less" scoped>
.calculator {
  --shadow-top: inset 0 1px var(--border-color-default);
  --shadow-right: inset -1px 0 var(--border-color-default);

  width: 100%;

  & .row {
    display: flex;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 3rem;
  font-size: 1.25rem;
  background-color: var(--calculator-number-bg-color);
  color: #fff;
  box-shadow: var(--shadow-top), var(--shadow-right);
  cursor: pointer;

  &.operator {
    background-color: var(--calculator-operator-bg-color);
  }

  & svg {
    transform: scale(.75);
  }
}

// 清除顶部和右边阴影
.row:first-child {
  & .button {
    box-shadow: var(--shadow-right);

    &:last-child {
      box-shadow: none;
    }
  }
}
.button:last-child {
  box-shadow: var(--shadow-top);
}

.flex-2 {
  flex: 2;
}
</style>
