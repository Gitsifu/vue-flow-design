/** * 创建时间：2024/11/25 10:02 星期一 * 文件路径：src/components/FlowGraph/CustomNode/GroupNode.vue * 描述： */
<template>
  <div v-if="id" class="vue-flow__group-node" :class="{ 'high-light': data.isHighLight }">
    <strong>{{ label }}</strong>

    <NodeResizer :is-visible="isVisible" />
    <Handle id="source" type="source" :position="Position.Bottom" />
    <Handle id="target" type="target" :position="Position.Top" />
  </div>
  <div v-else>
    <el-tooltip :content="data.label" placement="top">
      <el-icon>
        <IconComponent />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Handle, Position, getNodesInside, useVueFlow, useNode, useNodeId } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import {computed, onMounted, ref, watch} from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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
    required: false
  }
});
const { onNodeDragStop, getNodes, getSelectedNodes, onNodeDrag, updateNodeData, updateNode, screenToFlowCoordinate } = useVueFlow();

const IconComponent = computed(()=>{
  return ElementPlusIconsVue[props.data.iconClass]
})

const isNodeInside = (draggedNode, node) => {
  const node1Right = draggedNode.computedPosition.x + draggedNode.dimensions.width;
  const node1Bottom = draggedNode.computedPosition.y + draggedNode.dimensions.height;

  const node2Right = node.computedPosition.x + node.dimensions.width;
  const node2Bottom = node.computedPosition.y + node.dimensions.height;

  // 判断 draggedNode 是否在 node 的边界内
  return (
    draggedNode.computedPosition.x >= node.computedPosition.x && draggedNode.computedPosition.y >= node.computedPosition.y && node1Right <= node2Right && node1Bottom <= node2Bottom
  );
};

// 最内层节点（面积最小的就是要找的节点）
const findInnermostNode = (nodes) => {
  if(nodes.length){
    // 按面积从小到大排序
    const sortedNodes = nodes.sort((a, b)=>{
      return a.dimensions.width * a.dimensions.height - b.dimensions.width * b.dimensions.height
    })
    return sortedNodes[0];
  }else {
    return null
  }
}

onMounted(() => {
  if (props.id) {
    const currentGroupNode = useNode(props.id).node;
    onNodeDrag(({ event, node, nodes }) => {
      // 如果拖动的节点不是当前节点
      if (node.id !== currentGroupNode.id) {
        // 如果当前节点在边界内，则高亮
        if (isNodeInside(node, currentGroupNode)) {
          updateNodeData(currentGroupNode.id, { isHighLight: true });
        } else {
          updateNodeData(currentGroupNode.id, { isHighLight: false });
        }
      }
    });

    onNodeDragStop(({ event, node }) => {
      // 如果拖动的节点不是当前节点
      if (node.id !== currentGroupNode.id) {
        // 过滤出所有 group 类型的节点，如果拖动的是自己，则也过滤掉。仅保留当前拖动节点的所有超集组节点（不包含当前拖动节点）
        const nodes = getNodes.value.filter(item=>{
          if(item.type === 'group' && node.id !== item.id){
            return isNodeInside(node, item)
          }
        })
        // 获取超集组节点中面积最小的节点
        const innermostNode = findInnermostNode(nodes)
        // 如果有，则设置该节点为拖动节点的父节点，并更新位置
        if (innermostNode) {
          // 仅让计算出来的真实父节点为其设置为父节点属性， 否则有多少个组节点就会执行多少次
          if(innermostNode.id === currentGroupNode.id){
            // console.log('成功分组', currentGroupNode.id)
            updateNode(node.id, {
              parentNode: innermostNode.id,
              position: {
                x: node.computedPosition.x - innermostNode.computedPosition.x,
                y: node.computedPosition.y - innermostNode.computedPosition.y
              }
            });
          }

        } else {
          // 如果没有，则取消分组

          // 仅让拖动的节点真实的父节点为其取消父节点属性, 否则有多少个组节点就会执行多少次
          if(node.parentNode === currentGroupNode.id){
            // console.log('取消分组', currentGroupNode.id)
            updateNode(node.id, {
              parentNode: undefined,
              position: {
                x: node.computedPosition.x,
                y: node.computedPosition.y
              }
            });
          }
        }
      }
    });
  }
});

const isVisible = ref(false);

watch(getSelectedNodes, (selectedNodes) => {
  if (selectedNodes.length === 1) {
    isVisible.value = props.id === selectedNodes[0].id;
  } else {
    isVisible.value = false;
  }
});
</script>

<style lang="scss" scoped>
.vue-flow__group-node {
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  height: 100%;
  border: solid 1px black;
  border-radius: 10px;
}

.high-light {
  box-shadow:
    -10px 0px 10px #bbd2ff,
    0px -10px 10px #bbd2ff,
    10px 0px 10px #bbd2ff,
    0px 10px 10px #bbd2ff;
}
</style>
