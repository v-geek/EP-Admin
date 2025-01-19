import { defineComponent } from 'vue'
import { openDialog, closeDialog } from '@/utils/dialog'

export default defineComponent({
  name: 'imgLabel',
  setup() {
    const handleClick = () => {
      openDialog(<div onClick={closeDialog}>关闭</div>, {
        title: '标题',
        width: '500',
        onClosed: () => {
          // console.log('closed')
        }
      })
    }
    return () => <div onClick={handleClick}>内容</div>
  }
})
