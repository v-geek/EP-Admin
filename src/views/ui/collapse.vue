<template>
  <div class="bg-white dark:bg-dark-1 p-4">
    <Collapse v-model="openedValue">
      <CollapseItem name="a" title="Consistency">
        <div>11111111111</div>
        <div>11111111111</div>
        <div>11111111111</div>
      </CollapseItem>

      <CollapseItem name="b" title="Feedback">
        <div>2222222222222</div>
        <div>2222222222222</div>
        <div>2222222222222</div>
      </CollapseItem>

      <CollapseItem name="c" title="Efficiency" disabled>
        <div>33333333333333</div>
        <div>33333333333333</div>
        <div>33333333333333</div>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collapse, CollapseItem } from 'pear-view'

defineOptions({
  name: 'Collapse'
})

const openedValue = ref(['a'])
</script>

<style lang="scss" scoped></style>
