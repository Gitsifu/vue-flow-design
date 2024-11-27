/** * 创建时间：2024/10/22 16:22 星期二 * 文件路径：src/views/demo/flow-demo/Panel/components/NodeParams.vue * 描述： */
<template>
  <el-form>
    <el-form-item label="Label">
      <el-input v-model="nodeParams.label" @input="handleUpdate" />
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-color-picker v-model="nodeParams.data.backgroundColor" @change="handleUpdateData" />
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="nodeParams.color" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="nodeParams.fontSize" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="高度">
      <el-input-number v-model="nodeParams.height" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="宽度">
      <el-input-number v-model="nodeParams.width" @change="handleUpdate" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { isEdge, isNode, useVueFlow } from '@vue-flow/core';
import {computed} from "vue";

const { updateNode, getSelectedElements, updateNodeData, updateEdgeData } = useVueFlow();

const props = defineProps({
  currentElement: Object
});

const nodeParams = computed(() => {
  return {
    label: props.currentElement.label,
    backgroundColor: props.currentElement.style?.backgroundColor,
    color: props.currentElement.style?.color,
    fontSize: props.currentElement.style?.fontSize ? Number(props.currentElement.style?.fontSize?.replace('px', '')) : 12,
    height: props.currentElement.style?.height ? Number(props.currentElement.style?.height?.replace('px', '')) : 60,
    width: props.currentElement.style?.width ? Number(props.currentElement.style?.width?.replace('px', '')) : 60,
    data: {
      backgroundColor: props.currentElement?.data?.style?.backgroundColor,
    }
  }
});

// const {label, bgColor, color} = toRefs(nodeParams);

function handleUpdate() {
  // node默认优先使用data中的label进行渲染
  // updateNodeData(props.currentElement.id, { label: nodeParams.value.label })
  updateNode(props.currentElement.id, {
    label: nodeParams.value.label,
    style: {
      backgroundColor: nodeParams.value.backgroundColor,
      color: nodeParams.value.color,
      fontSize: nodeParams.value.fontSize + 'px',
      height: nodeParams.value.height + 'px',
      width: nodeParams.value.width + 'px'
    }
  });
}

const handleUpdateData = ()=>{
  updateNodeData(props.currentElement.id, {
    style: {
      backgroundColor: nodeParams.value.data.backgroundColor
    }
  });
}
</script>

<style scoped lang="scss"></style>
