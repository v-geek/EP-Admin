import { defineComponent } from 'vue'
import { showDialog, closeDialog } from '@/utils/dialog'

export default defineComponent({
  name: 'imgLabel',
  setup() {
    const handleClick = () => {
      showDialog(<div onClick={closeDialog}>关闭</div>, {
        title: '标题',
        width: '500'
      })
    }
    return () => (
      <el-button type="primary" onClick={handleClick}>
        打开弹窗
      </el-button>
    )
  }
})
