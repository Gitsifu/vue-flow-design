/** * 创建时间：2024/10/21 17:23 星期一 * 文件路径：src/views/demo/flow-demo/ParamsSidebar.vue * 描述： */
<template>
  <Panel v-if="currentElement" position="top-right">
    <EdgeParams :current-element="currentElement" @onUpdateEdge="handleOnUpdateEdge" v-if="isEdge(currentElement)"/>
    <NodeParams :current-element="currentElement" v-if="isNode(currentElement)"/>
  </Panel>
</template>

<script setup lang="ts">
import { Panel, VueFlow, useVueFlow, isNode, isEdge } from '@vue-flow/core';
import EdgeParams from './components/EdgeParams.vue';
import NodeParams from './components/NodeParams.vue';
import {ref, watch} from "vue";

const emit = defineEmits(['onUpdateEdge'])

const { updateNode, getSelectedElements, updateEdge, updateEdgeData } = useVueFlow();

const currentElement = ref(null);

const handleOnUpdateEdge = (args) => {
  emit('onUpdateEdge', args)
}

watch(getSelectedElements, (selectedElements) => {
  if (selectedElements.length === 1) {
    currentElement.value = selectedElements[0];
  } else {
    currentElement.value = null;
  }
});

</script>

<style scoped lang="scss"></style>
