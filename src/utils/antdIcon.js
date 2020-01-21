/**
 * 修改Antd 的默认加载图标，改为按需加载，减小打包体积 使用Antd默认图标之前需要在此文件引用
 * webpack alias 添加:
 * {'@ant-design/icons/lib/dist$': path.resolve(__dirname, 'src/utils/antdIcon.js')}
 */
export {
  CheckOutline,
  DownSquareOutline,
  LoadingOutline,
  DownOutline,
  SearchOutline,
  LeftOutline,
  RightOutline,
  ForkOutline,
  StarOutline,
  StarFill,
  CodeFill,
  CalendarFill,
  CloseCircleFill
} from '@ant-design/icons'
