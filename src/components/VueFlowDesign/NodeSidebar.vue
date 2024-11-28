/**
* 创建时间：2024/10/21 16:17 星期一
* 文件路径：src/views/demo/flow-demo/Sidebar.vue
* 描述：
*/
<template>
  <div class="aside">
    <div class="nodes">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础组件" name="1">
          <div>
            <el-row :gutter="20">
              <el-col v-for="item in iconList" :key="item.iconClass" :span="6" style="margin-bottom: 20px;">
                <CommonNode :data="item" :draggable="true" @dragstart="onDragStart($event, 'common', item)"/>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="功能组件" name="2">
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <GroupNode :data="groupNodeData" :draggable="true" @dragstart="onDragStart($event, 'group', groupNodeData)"/>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>
</template>

<script setup>
import useDragAndDrop from './useDnD.ts'
import CommonNode from './CustomNode/CommonNode.vue';
import GroupNode from './CustomNode/GroupNode.vue';
import {ref} from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const { onDragStart } = useDragAndDrop()

const activeNames = ref(['1', '2'])

// 组件初始化属性
const groupNodeData = {
  iconClass: 'Crop',
  label: '组',
  style: {
    fontSize: '12px',
    width: '300px',
    height: '300px'
  }
}

const style = {
  borderRadius: '50%',
  fontSize: '12px',
  width: '60px',
  height: '60px'
}

// 组件初始化属性

const iconList = Object.keys(ElementPlusIconsVue).map(icon => {
  return {
    iconClass: icon,
    label: icon,
    style
  }
}).slice(0, 36)  // 取前36个
</script>

<style scoped lang="scss">
.aside {
  width: 250px;
  padding: 10px;
  overflow-y: auto;
}
</style>
