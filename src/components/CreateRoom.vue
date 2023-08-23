<template>
  <n-card title="带封面的卡片">
    <template #cover>
      <h1 class="px:16px py:8px">Waiting Room</h1>
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
    </template>
    卡片内容
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>