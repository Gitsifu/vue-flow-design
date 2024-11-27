/** * 创建时间：2024/10/22 9:56 星期二 * 文件路径：src/views/demo/flow-demo/CustomNode/CommonNode.vue * 描述： */
<template>
  <div v-if="id" class="common-box" :class="{'high-light': data.isHighLight}" :style="{backgroundColor: data?.style?.backgroundColor}">
    <div class="icon-box">
      <el-icon>
        <IconComponent />
      </el-icon>
    </div>
    <span>
      {{ label }}
    </span>
    <NodeResizer :is-visible="isVisible" />
    <Handle id="source" type="source" :position="Position.Bottom" />
    <Handle id="target" type="target" :position="Position.Top" />
  </div>
  <div v-else class="node">
    <el-tooltip :content="data.label" placement="top">
      <el-icon>
        <IconComponent />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import {computed, ref, watch} from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const { getSelectedElements, getSelectedNodes } = useVueFlow();
const props = defineProps({
  id: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  data: {
    type: Object,
    required: false,
    default: () => ({
      iconClass: 'database',
      isHighLight: false
    })
  }
});

const IconComponent = computed(()=>{
  return ElementPlusIconsVue[props.data.iconClass]
})

const isVisible = ref(false);

watch(getSelectedNodes, (selectedNodes) => {
  if (selectedNodes.length === 1) {
    isVisible.value = props.id === selectedNodes[0].id;
  } else {
    isVisible.value = false;
  }
});
</script>

<style scoped lang="scss">
.high-light{
  box-shadow:
    -10px 0px 10px #BBD2FF,
    0px -10px 10px #BBD2FF,
    10px 0px 10px #BBD2FF,
    0px 10px 10px #BBD2FF;
}
.common-box {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;


  .icon-box {
    box-sizing: content-box;
    //border: 1px solid #ccc;
    border-radius: 50%;
    padding: 5px;
  }
}

.node {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
