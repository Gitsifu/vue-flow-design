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
      [{"id":"dndnode_RW4iT3","type":"common","initialized":false,"position":{"x":26.12239079711523,"y":42.54422297529706},"data":{"iconClass":"AddLocation","label":"AddLocation","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"AddLocation","style":{"fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_a8s-jL"},{"id":"dndnode_a8s-jL","type":"group","initialized":false,"position":{"x":-102.87184518268407,"y":258.10157770942124},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"218px","height":"142px"}},{"id":"dndnode_r8XdFz","type":"common","initialized":false,"position":{"x":123.28918277600101,"y":45.63049264732771},"data":{"iconClass":"Aim","label":"Aim","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Aim","style":{"fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_a8s-jL"},{"id":"dndnode_Fvfe6J","type":"common","initialized":false,"position":{"x":255.88160720349015,"y":33.50454030826469},"data":{"iconClass":"AlarmClock","label":"AlarmClock","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"AlarmClock","style":{"fontSize":"12px","width":"60px","height":"60px"}},{"id":"dndnode_ygKI3G","type":"common","initialized":false,"position":{"x":658.2633381575465,"y":284.5870169146789},"data":{"iconClass":"ArrowLeftBold","label":"ArrowLeftBold","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"ArrowLeftBold","style":{"fontSize":"12px","width":"60px","height":"60px"}},{"id":"dndnode_X9C1wz","type":"common","initialized":false,"position":{"x":57.04656141519479,"y":59.44128014947216},"data":{"iconClass":"Burger","label":"Burger","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Burger","style":{"fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_89G5Zq"},{"id":"dndnode_89G5Zq","type":"group","initialized":false,"position":{"x":163.93573174763617,"y":238.91120718112268},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"433px","height":"168px"}},{"id":"dndnode_kwV7rX","type":"group","initialized":false,"position":{"x":178.19198856189058,"y":26.398813120280067},"data":{"iconClass":"Crop","label":"组","style":{"fontSize":"12px","width":"300px","height":"300px"},"isHighLight":false},"label":"组","style":{"fontSize":"12px","width":"159px","height":"126px"},"parentNode":"dndnode_89G5Zq"},{"id":"dndnode_jcG3ln","type":"common","initialized":false,"position":{"x":58.0729990561008,"y":36.67874608911603},"data":{"iconClass":"Cellphone","label":"Cellphone","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Cellphone","style":{"fontSize":"12px","width":"60px","height":"60px"},"parentNode":"dndnode_kwV7rX"},{"id":"dndnode_OnWUuc","type":"common","initialized":false,"position":{"x":94.13947975238042,"y":454.60690474213794},"data":{"iconClass":"Bowl","label":"Bowl","style":{"fontSize":"12px","width":"60px","height":"60px"},"isHighLight":false},"label":"Bowl","style":{"fontSize":"12px","width":"60px","height":"60px"}}]
);

const edges = ref(
  // []
      [{"id":"vueflow__edge-dndnode_Fvfe6Jsource-dndnode_a8s-jLtarget","type":"default","source":"dndnode_Fvfe6J","target":"dndnode_a8s-jL","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":285.881666761445,"sourceY":97.50470820601083,"targetX":6.127777301445761,"targetY":254.10157410827753,"style":{}},{"id":"vueflow__edge-dndnode_Fvfe6Jsource-dndnode_ygKI3Gtarget","type":"default","source":"dndnode_Fvfe6J","target":"dndnode_ygKI3G","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":285.881666761445,"sourceY":97.50470820601083,"targetX":688.2633977155014,"targetY":280.5870010082444,"style":{}},{"id":"vueflow__edge-dndnode_Fvfe6Jsource-dndnode_89G5Zqtarget","type":"default","source":"dndnode_Fvfe6J","target":"dndnode_89G5Zq","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":285.881666761445,"sourceY":97.50470820601083,"targetX":380.43498211358326,"targetY":234.9112287557599,"style":{}},{"id":"vueflow__edge-dndnode_X9C1wzsource-dndnode_OnWUuctarget","type":"default","source":"dndnode_X9C1wz","target":"dndnode_OnWUuc","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":250.9823527207858,"sourceY":362.352622352939,"targetX":124.13941504458126,"targetY":450.6069263167752,"style":{}},{"id":"vueflow__edge-dndnode_Fvfe6Jsource-dndnode_X9C1wztarget","type":"default","source":"dndnode_Fvfe6J","target":"dndnode_X9C1wz","sourceHandle":"source","targetHandle":"target","updatable":true,"data":{},"label":"","sourceX":285.881666761445,"sourceY":97.50470820601083,"targetX":250.9823527207858,"targetY":294.35247142416034,"style":{}}]
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
