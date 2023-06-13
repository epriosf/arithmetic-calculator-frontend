<script setup lang="ts">
import { computed, ref } from 'vue'
import MathButton from '@/components/UI/MathButton.vue'
import TheScreen from '@/components/UI/TheScreen.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import Toast from 'primevue/toast'
import { getMathResult } from '@/services/MathOperatorService'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const severity = ref({
  number: 'primary',
  operator: 'info',
  clear: 'danger'
})
const operators = {
  addition: '+',
  subtraction: '-',
  multiplication: '*',
  division: '/',
  squareRoot: 'sqrt',
  openParenthesis: '(',
  closeParenthesis: ')',
  equal: '=',
  clear: 'Clear'
}
const numbers = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  dot: '.'
}
const inputMathExpression = ref('')
const isLoading = ref(false)
const errorMathCalculation = ref('')

const authStore = useAuthStore()
const user = computed(() => authStore.userDetail)

const addOperationInput = (val) => {
  inputMathExpression.value += val.target.textContent
}
const clearScreen = () => {
  inputMathExpression.value = ''
}
const calculateResult = async () => {
  if (inputMathExpression.value.trim()) {
    const mathExpression = inputMathExpression.value
    inputMathExpression.value = ''
    isLoading.value = true
    errorMathCalculation.value = ''
    try {
      const res = await getMathResult({
        mathExpression,
        username: user.value.username
      })
      inputMathExpression.value = res.result.toString()
    } catch (error) {
      errorMathCalculation.value =
        error.message || 'The operation could not be finished. Please try it again later'
      toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: errorMathCalculation.value,
        life: 3000
      })
    }
    isLoading.value = false
  } else {
    toast.add({
      severity: 'warn',
      summary: 'Warn Message',
      detail: 'Please, enter valid values',
      life: 3000
    })
  }
}
</script>
<template>
  <h1 class="text-center">Calculator</h1>
  <Toast position="top-center" />
  <div class="grid">
    <div class="col-3"></div>
    <div class="col-6">
      <BaseCard>
        <template #title>
          <TheScreen :enteredInput="inputMathExpression" :isLoading="isLoading" />
        </template>
        <template #content>
          <div class="text-center">
            <div class="grid">
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.one"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.two"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.three"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.addition"
                  @click="addOperationInput"
                />
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.four"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.five"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.six"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.subtraction"
                  @click="addOperationInput"
                />
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.seven"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.eight"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.nine"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.multiplication"
                  @click="addOperationInput"
                />
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.zero"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.number"
                  :label="numbers.dot"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.clear"
                  :label="operators.clear"
                  @click="clearScreen"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.division"
                  @click="addOperationInput"
                />
              </div>
            </div>
            <div class="grid">
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.openParenthesis"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.closeParenthesis"
                  @click="addOperationInput"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.equal"
                  @click="calculateResult"
                />
              </div>
              <div class="col">
                <MathButton
                  :severity="severity.operator"
                  :label="operators.squareRoot"
                  @click="addOperationInput"
                />
              </div>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
    <div class="col-3"></div>
  </div>
</template>
