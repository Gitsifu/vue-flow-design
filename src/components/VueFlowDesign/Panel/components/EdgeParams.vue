/** * 创建时间：2024/10/22 16:17 星期二 * 文件路径：src/views/demo/flow-demo/Panel/components/EdgeParams.vue * 描述： */
<template>
  <el-form>
    <el-form-item label="Label">
      <el-input v-model="edgeParams.label" @input="handleUpdate" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="edgeParams.type" @change="handleUpdate">
        <el-option label="default" value="default" />
        <el-option label="smoothstep" value="smoothstep" />
        <el-option label="step" value="step" />
        <el-option label="straight" value="straight" />
      </el-select>
    </el-form-item>
    <el-form-item label="开启动画">
      <el-checkbox v-model="edgeParams.animated" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-color-picker v-model="edgeParams.bgColor" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="edgeParams.color" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="背景透明度">
      <el-slider :min=0 :max=1 :step=0.1 v-model="edgeParams.fillOpacity" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="背景圆角">
      <el-slider :min=0 :max=50 :step=1 v-model="edgeParams.labelBgBorderRadius" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-slider :min=5 :max=24 :step=1 v-model="edgeParams.fontSize" @change="handleUpdate" />
    </el-form-item>
    <el-form-item label="字体粗细">
      <el-slider :min=500 :max=900 :step=100 v-model="edgeParams.fontWeight" @change="handleUpdate" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { isEdge, isNode, useVueFlow } from '@vue-flow/core';
import {computed} from "vue";

const { updateNode, getSelectedElements, updateEdge, updateEdgeData } = useVueFlow();

const emit = defineEmits(['onUpdateEdge'])

const props = defineProps<{
  currentElement: any
}>();

const edgeParams = computed(() =>({
  label: props.currentElement.label,
  animated: props.currentElement.animated,
  type: props.currentElement.type,
  bgColor: props.currentElement?.labelBgStyle?.fill,
  fillOpacity: props.currentElement?.labelBgStyle?.fillOpacity ?? 1,
  labelBgBorderRadius: props.currentElement?.labelBgBorderRadius ?? 4,
  color: props.currentElement?.labelStyle?.color,
  fontSize: props.currentElement?.labelStyle?.fontSize ?? 10,
  fontWeight: props.currentElement?.labelStyle?.fontWeight ?? 500,
}));


const handleUpdate = () => {
  emit('onUpdateEdge',{
    edgeId: props.currentElement.id,
    options: {
      label: edgeParams.value.label,
      type: edgeParams.value.type,
      animated: edgeParams.value.animated,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: edgeParams.value.labelBgBorderRadius,
      labelStyle: {
        fill: edgeParams.value.color,
        fontWeight: edgeParams.value.fontWeight,
        fontSize: edgeParams.value.fontSize
      },
      labelBgStyle: {
        fill: edgeParams.value.bgColor,
        fillOpacity: edgeParams.value.fillOpacity
      }
    }
  })
  // updateEdgeData(currentElement.value.id, {label: label.value})
}
</script>

<style scoped lang="scss"></style>
