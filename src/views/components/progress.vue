<template>
  <div class="bg-white dark:bg-dark-1 p-4">
    <Progress isAnimate :percentage="60" />
    <br />
    <Progress isAnimate status="success" :stroke-width="20" :percentage="60" />
    <br />
    <Progress :time="5000" type="circle" isAnimate :percentage="60" />
  </div>
</template>

<script setup lang="ts">
import Progress from '@/components/Progress.vue'
</script>

<style lang="scss" scoped></style>
