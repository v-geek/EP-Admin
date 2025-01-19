import { ref, render } from 'vue'
import { genUUID } from 'pear-common-utils'
import { type DialogProps, ElDialog } from 'element-plus'

const dialogIds = []
const dialogRefMap = {}

export const openDialog = (Compo: any, props?: Partial<DialogProps> & Recordable) => {
  // 创建div元素
  const div = document.createElement('div')
  const id = genUUID()
  div.id = id
  document.body.appendChild(div)
  // 储存id
  dialogIds.push(id)
  // 储存组件ref
  dialogRefMap[id] = ref()

  const params = {
    modelValue: true, // 可见
    ...props
  }

  render(
    <ElDialog {...params}>
      <Compo ref={dialogRefMap[id]} />
    </ElDialog>,
    div
  )
}

export const closeDialog = () => {
  const id = dialogIds[dialogIds.length - 1]
  const div = document.getElementById(id)
  if (!div) return
  render(null, div)
  div.parentNode?.removeChild(div)
  dialogIds.pop()
}
