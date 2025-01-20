import { ref, render } from 'vue'
import { genUUID } from 'pear-common-utils'
import { type DialogProps, ElDialog, ElButton } from 'element-plus'

/**
 * 弹窗不显示时, 弹窗内的生命周期不会执行
 * 关闭时, 弹窗的 状态/数据 会被重置
 * onClosed 事件失效
 */

const dialogIds = []
const dialogRefMap = {}

export const closeDialog = () => {
  const id = dialogIds[dialogIds.length - 1]
  const div = document.getElementById(id)
  if (!div) return
  render(null, div)
  div.parentNode?.removeChild(div)
  dialogIds.pop()
}

const handleClose = async () => {
  let result = true
  const id = dialogIds[dialogIds.length - 1]

  if (dialogRefMap[id].value?.onCancel) {
    result = await dialogRefMap[id].value.onCancel()
  }
  result && closeDialog()
}

export const showDialog = (Compo: any, props?: Partial<DialogProps> & Recordable) => {
  // 创建div元素
  const div = document.createElement('div')
  const id = genUUID()
  div.id = id
  document.body.appendChild(div)
  // 储存id
  dialogIds.push(id)
  // 储存组件ref
  dialogRefMap[id] = ref()

  const loading = ref(false)

  const params = {
    modelValue: true, // 可见
    onConfirm: async () => {
      loading.value = true
      let result = true
      const id = dialogIds[dialogIds.length - 1]

      if (dialogRefMap[id].value?.handleSubmit) {
        result = await dialogRefMap[id].value.handleSubmit()
      }

      if (!result) return
      loading.value = false
      closeDialog()
    },
    beforeClose: handleClose, // 点击关闭按钮或者对话框的遮罩区域时被调用
    onCancel: handleClose, // 点击取消按钮时被调用
    ...props
  }

  render(
    <ElDialog {...params}>
      {{
        default: () => <Compo ref={dialogRefMap[id]} />,
        footer: () => (
          <div class="dialog-footer">
            <ElButton onClick={params.onCancel}>取消</ElButton>
            <ElButton type="primary" onClick={params.onConfirm} loading={loading.value}>
              确定
            </ElButton>
          </div>
        )
      }}
    </ElDialog>,
    div
  )
}
