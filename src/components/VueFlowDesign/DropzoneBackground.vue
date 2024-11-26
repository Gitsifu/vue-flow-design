/**
* 创建时间：2024/10/21 16:15 星期一
* 文件路径：src/views/demo/flow-demo/DropzoneBackground.vue
* 描述：
*/
<script lang="ts" setup>
import { Background } from '@vue-flow/background'
import '@vue-flow/minimap/dist/style.css';
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="20" pattern-color="#BDBDBD" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>


<style scoped lang="scss">
.dropzone-background {
  position: relative;
  height: 100%;
  width: 100%;
}

.dropzone-background .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}
</style>
