/**
 * 修改Antd 的默认加载图标，改为按需加载，减小打包体积 使用Antd默认图标之前需要在此文件引用
 * webpack alias 添加:
 * {'@ant-design/icons/lib/dist$': path.resolve(__dirname, 'src/utils/antdIcon.js')}
 */

export { default as CheckOutline } from "@ant-design/icons/lib/outline/CheckOutline";
export { default as DownSquareOutline } from "@ant-design/icons/lib/outline/DownSquareOutline";
export { default as LoadingOutline } from "@ant-design/icons/lib/outline/LoadingOutline";
export { default as DownOutline } from "@ant-design/icons/lib/outline/DownOutline";
export { default as SearchOutline } from "@ant-design/icons/lib/outline/SearchOutline";
export { default as LeftOutline } from "@ant-design/icons/lib/outline/LeftOutline";
export { default as RightOutline } from "@ant-design/icons/lib/outline/RightOutline";
export { default as ForkOutline } from "@ant-design/icons/lib/outline/ForkOutline";
export { default as StarOutline } from "@ant-design/icons/lib/outline/StarOutline";
export { default as StarFill } from "@ant-design/icons/lib/fill/StarFill";
export { default as CodeFill } from "@ant-design/icons/lib/fill/CodeFill";
export { default as CalendarFill } from "@ant-design/icons/lib/fill/CalendarFill";
export { default as CloseCircleFill } from "@ant-design/icons/lib/fill/CloseCircleFill";
