import { useVueFlow } from '@vue-flow/core';
import { ref, watch } from 'vue';
import { nanoid } from 'nanoid';

/**
 * @returns {string} - A unique id.
 */
function getId() {
  return `dndnode_${nanoid(6)}`;
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false)
};

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state;

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode, getNodes, updateNodeData } = useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : '';
  });

  function onDragStart(event, type, data) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type);
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('currentDragData', JSON.stringify(data));
    }

    draggedType.value = type;
    isDragging.value = true;

    document.addEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event) {
    event.preventDefault();

    if (draggedType.value) {
      isDragOver.value = true;

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    }

    //  处理组节点高亮和节点父节点属性问题
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY
    });
    // 只要鼠标在组节点内部，就高亮该组节点
    const groupNodes = getNodes.value
      .filter((node) => {
        const pointInnerNode =
          node.computedPosition.x <= position.x &&
          node.computedPosition.y <= position.y &&
          node.computedPosition.x + node.dimensions.width >= position.x &&
          node.computedPosition.y + node.dimensions.height >= position.y;
        return node.type === 'group' && pointInnerNode;
      })
      .sort((a, b) => {
        return a.dimensions.width * a.dimensions.height - b.dimensions.width * b.dimensions.height;
      });
    if (groupNodes.length) {
      updateNodeData(groupNodes[0].id, (node) => {
        return {
          isHighLight: true
        };
      });
      // 清除其他节点高亮
      getNodes.value
        .filter((node) => node.id !== groupNodes[0].id)
        .forEach((node) => {
          updateNodeData(node.id, (node) => {
            return {
              isHighLight: false
            };
          });
        });
    } else {
      // 清除所有节点高亮
      getNodes.value.forEach((node) => {
        updateNodeData(node.id, (node) => {
          return {
            isHighLight: false
          };
        });
      });
    }
  }

  function onDragLeave() {
    isDragOver.value = false;
  }

  function onDragEnd() {
    isDragging.value = false;
    isDragOver.value = false;
    draggedType.value = null;
    document.removeEventListener('drop', onDragEnd);
  }

  /**
   * 判断当前拖拽的节点鼠标坐标是否在节点内部
   * @param draggedNode
   * @param node
   * @returns {boolean}
   */
  const isNodeInside = (draggedNode, node) => {
    const node1Right = draggedNode.computedPosition.x;
    const node1Bottom = draggedNode.computedPosition.y;

    const node2Right = node.computedPosition.x + node.dimensions.width;
    const node2Bottom = node.computedPosition.y + node.dimensions.height;
    // 判断 draggedNode 是否在 node 的边界内
    return (
      draggedNode.computedPosition.x >= node.computedPosition.x &&
      draggedNode.computedPosition.y >= node.computedPosition.y &&
      node1Right <= node2Right &&
      node1Bottom <= node2Bottom
    );
  };

  /**
   * 查找当前节点的父节点
   * @param draggedNode
   * @returns {null}
   */
  function findInnermostNode(draggedNode) {
    const groupNodes = getNodes.value
      .filter((node) => {
        return node.type === 'group' && node.id !== draggedNode.id && isNodeInside(draggedNode, node);
      })
      .sort((a, b) => {
        return a.dimensions.width * a.dimensions.height - b.dimensions.width * b.dimensions.height;
      });
    if (groupNodes.length) {
      return groupNodes[0];
    } else {
      return null;
    }
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event) {
    const currentDragData = JSON.parse(event.dataTransfer.getData('currentDragData'));
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY
    });

    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type: draggedType.value,
      label: currentDragData?.label,
      position,
      style: currentDragData.style,
      data: {
        ...currentDragData
      }
    };

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => {
        // 处理节点父节点属性问题
        const innermostNode = findInnermostNode(node);
        if (innermostNode) {
          return {
            parentNode: innermostNode.id,
            position: {
              x: node.computedPosition.x - innermostNode.computedPosition.x - node.dimensions.width / 2,
              y: node.computedPosition.y - innermostNode.computedPosition.y - node.dimensions.height / 2
            }
          };
        } else {
          return {
            position: {
              x: node.position.x - node.dimensions.width / 2,
              y: node.position.y - node.dimensions.height / 2
            }
          };
        }
      });

      off();
    });

    addNodes(newNode);
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop
  };
}
