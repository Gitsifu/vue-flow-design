/** * 创建时间：2024/10/21 15:47 星期一 * 文件路径：src/views/demo/flow-demo/index.vue * 描述： */
<template>
  <div class="dnd-flow" @drop="onDrop">
    <NodeSidebar v-if="!preview"/>
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :nodes-draggable="!props.preview"
      :nodes-connectable="!props.preview"
      :elements-selectable="!props.preview"
      :class="{ dark }"
      class="basic-flow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      fit-view-on-init
      elevate-edges-on-select
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @edge-update="onEdgeUpdate"
      @connect="onConnect"
      @edge-update-start="onEdgeUpdateStart"
      @edge-update-end="onEdgeUpdateEnd"
      @node-mouse-enter="onNodeMouseEnter"
      @node-mouse-leave="onNodeMouseLeave"
      @node-drag-stop="nodeDragStop"
      @node-click="onNodeClick"
      @pane-click="onPaneClick"
    >
      <template #node-common="props">
        <CommonNode :id="props.id" :label="props.label" :data="props.data" />
      </template>

      <template #node-group="props">
        <GroupNode :id="props.id" :label="props.label" :data="props.data"/>
      </template>

      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver && !dark ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease'
        }"
      >
        <p v-if="isDragOver">移动到这里</p>
      </DropzoneBackground>

      <MiniMap />

      <Controls position="top-left" :showInteractive="!preview">
        <ControlButton title="重置视图" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

<!--        <ControlButton title="洗牌节点位置" @click="updatePos">-->
<!--          <Icon name="update" />-->
<!--        </ControlButton>-->

        <ControlButton title="切换深色模式" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>

        <ControlButton title="打印日志" @click="logToObject">
          <Icon name="log" />
        </ControlButton>

        <ControlButton title="保存" @click="handleSave">
          <Icon name="save" />
        </ControlButton>
      </Controls>

      <ParamsPanel @onUpdateEdge="onUpdateEdge"/>
    </VueFlow>
  </div>
</template>

<script setup lang="ts" name="FlowGraph">
import { ref } from 'vue';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ControlButton, Controls } from '@vue-flow/controls';
import Icon from './Icon.vue';

import DropzoneBackground from './DropzoneBackground.vue';
import NodeSidebar from './NodeSidebar.vue';
import useDragAndDrop from './useDnD';
import ParamsPanel from './Panel/ParamsPanel.vue';
import CommonNode from './CustomNode/CommonNode.vue';
import GroupNode from './CustomNode/GroupNode.vue';

import '@vue-flow/node-resizer/dist/style.css';

const props = defineProps({
  preview: {
    type: Boolean,
    default: false
  }
})

const { onInit, onNodeDragStop, addEdges, setViewport, toObject, updateEdge, updateNodeData, updateEdgeData } = useVueFlow();

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();

const nodes = ref(
  // []
    [{"id":"dndnode_7ARZHe","type":"common","initialized":false,"position":{"x":41.55634615044724,"y":-346.7318433696199},"data":{"iconClass":"Aim","label":"Aim","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Aim","style":{"backgroundColor":"#33C9E7","borderRadius":"50%","fontSize":"12px","height":"60px","width":"60px"}},{"id":"dndnode_dFGy8z","type":"group","initialized":false,"position":{"x":-383.82404624330354,"y":-157.09049314116575},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"240px","height":"181px"}},{"id":"dndnode_2EXtV3","type":"common","initialized":false,"position":{"x":31.863295365268925,"y":60.130489514386596},"data":{"iconClass":"Brush","label":"Brush","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Brush","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_dFGy8z"},{"id":"dndnode_scT1DO","type":"common","initialized":false,"position":{"x":138.22115536518672,"y":57.52746731935994},"data":{"iconClass":"Box","label":"Box","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Box","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_dFGy8z"},{"id":"dndnode_VRN6QB","type":"group","initialized":false,"position":{"x":-109.61028600950172,"y":-157.43079311512105},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"439px","height":"181px"}},{"id":"dndnode_71H0Ao","type":"group","initialized":false,"position":{"x":222.12456064227564,"y":32.1039404053289},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"162px","height":"115px"},"parentNode":"dndnode_VRN6QB"},{"id":"dndnode_m0E9Jr","type":"common","initialized":false,"position":{"x":76.61629674955552,"y":67.93955609946664},"data":{"iconClass":"CameraFilled","label":"CameraFilled","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"CameraFilled","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_VRN6QB"},{"id":"dndnode_PE2_DX","type":"common","initialized":false,"position":{"x":53.18909699431546,"y":29.761897239075523},"data":{"iconClass":"Box","label":"Box","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Box","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_71H0Ao"},{"id":"dndnode_i-EVhe","type":"common","initialized":false,"position":{"x":-124.51185486598625,"y":79.63148720601679},"data":{"iconClass":"Baseball","label":"Baseball","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Baseball","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"}},{"id":"dndnode_YQcza2","type":"common","initialized":false,"position":{"x":434.2110975098789,"y":-93.82405138181339},"data":{"iconClass":"Basketball","label":"Basketball","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Basketball","style":{"borderRadius":"50%","fontSize":"12px","width":"60px","height":"60px"}}]
);

const edges = ref(
  // []
    [{"id":"vueflow__edge-dndnode_7ARZHesource-dndnode_dFGy8ztarget","type":"default","source":"dndnode_7ARZHe","target":"dndnode_dFGy8z","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":71.556249774521,"sourceY":-282.73200410066835,"targetX":-263.8242133602495,"targetY":-161.09050883553232,"style":{}},{"id":"vueflow__edge-dndnode_7ARZHesource-dndnode_m0E9Jrtarget","type":"default","source":"dndnode_7ARZHe","target":"dndnode_m0E9Jr","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":71.556249774521,"sourceY":-282.73200410066835,"targetX":-2.994032677411127,"targetY":-93.49124255722779,"style":{}},{"id":"vueflow__edge-dndnode_7ARZHesource-dndnode_PE2_DXtarget","type":"default","source":"dndnode_7ARZHe","target":"dndnode_PE2_DX","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":71.556249774521,"sourceY":-282.73200410066835,"targetX":195.70332820962446,"targetY":-99.56496101229001,"style":{}},{"id":"vueflow__edge-dndnode_m0E9Jrsource-dndnode_i-EVhetarget","type":"default","source":"dndnode_m0E9Jr","target":"dndnode_i-EVhe","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":-2.994032677411127,"sourceY":-25.491424225933486,"targetX":-94.51189828345117,"targetY":75.6314816644434,"style":{}},{"id":"vueflow__edge-dndnode_7ARZHesource-dndnode_YQcza2target","type":"default","source":"dndnode_7ARZHe","target":"dndnode_YQcza2","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":71.556249774521,"sourceY":-282.73200410066835,"targetX":464.21094817549135,"targetY":-97.82405692338678,"style":{}}]
);

const dark = ref(false);

onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView();
});

onNodeDragStop(({ event, nodes, node }) => {
  // console.log('Node Drag Stop', { event, nodes, node });
});

// onConnect((connection) => {
//   addEdges(connection);
// });

const updatePos = () => {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      }
    };
  });
};

// 打印日志
const logToObject = () => {
  console.log(toObject());
};

// 重置视图
const resetTransform = () => {
  setViewport({ x: 0, y: 0, zoom: 1 });
};

// 切换深色模式
const toggleDarkMode = () => {
  dark.value = !dark.value;
};

// 保存
const handleSave = () => {
  console.log(JSON.stringify(toObject().edges));
  console.log(JSON.stringify(toObject().nodes));
};

const onEdgeUpdateStart = (edge) => {
  console.log('start update', edge);
};

const onEdgeUpdateEnd = (edge) => {
  console.log('end update', edge);
};

const onEdgeUpdate = ({ edge, connection }) => {
  updateEdge(edge, connection);
};

const onConnect = (params) => {
  addEdges([{ ...params, updatable: true }]);
};

const onUpdateEdge = ({edgeId, options}) => {
  edges.value = edges.value.map(edge => {
    if (edge.id === edgeId) {
      return {
        ...edge,
        ...options
      };
    }
    return edge;
  })
};

// 通过节点id获取目标节点id
const getTargetNodeIds = (nodeId) => {
  // 获取与给定节点 ID 相关联的目标节点 ID
  const targetIds = edges.value
    .filter(edge => edge.source === nodeId)
    .map(edge => edge.target); // 提取目标节点 ID
  // 返回所有目标节点 ID
  return targetIds;
}

// 通过节点id获取目标边
const getTargetEdges = (nodeId) => {
  // 获取与给定节点 ID 相关联的所有目标边
  const targetEdges = edges.value
    .filter(edge => edge.source === nodeId)
    // .map(edge=>edge.id);
  // 返回找到的所有目标边id
  return targetEdges;
}

// 鼠标移入节点
const onNodeMouseEnter = ({event, node}) => {
  const targetIds = getTargetNodeIds(node.id)
  // 遍历所有目标节点id，设置高亮
  targetIds.concat(node.id).map(item=>{
    updateNodeData(item, { isHighLight: true })
  })

  const targetEdges = getTargetEdges(node.id)
  // 遍历所有目标边id，设置高亮
  targetEdges.map(edge => edge.id).map(edgeId=>{
    onUpdateEdge({
      edgeId,
      options: {
        style: {
          // 线条颜色
          stroke: 'red',
          // 线条宽度
          strokeWidth: 2,
          // 动画
          transition: 'all 0.3s ease-in-out',
          // 虚线
          strokeDasharray: '5 5',
        }
    }
    })
  })
}

// 鼠标移出节点
const onNodeMouseLeave = ({event, node}) => {
  // 恢复所有节点样式
  nodes.value.map(item=>{
    updateNodeData(item.id, { isHighLight: false })
  })
  // 恢复所有边样式
  edges.value.map(item=>{
    onUpdateEdge({
      edgeId: item.id,
      options: {
        style: {}
      }
    })
  })
}

// 节点点击
const onNodeClick = ({ event, node }) => {
  console.log('节点点击')
}

// 画布点击
const onPaneClick = (event)=>{
  console.log('画布点击')
}

const nodeDragStop = ({event, node}) => {
  // console.log('nodeDragStop1', event, node)
}
</script>

<style scoped lang="scss">
.dnd-flow {
  flex-direction: column;
  display: flex;
  height: 100%;
}

@media screen and (min-width: 640px) {
  .dnd-flow {
    flex-direction: row;
  }
}
</style>
