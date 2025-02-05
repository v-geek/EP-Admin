import dayjs from 'dayjs'

import { name, version } from '../package.json'

const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

// 将属性值为 'Boolean' 和 'Number' 的进行还原 ( 属性值默认全部为String )
function formatEnv(envObj: Recordable): ViteEnv {
  const result = {}

  for (const [key, val] of Object.entries(envObj)) {
    let realVal = val === 'true' ? true : val === 'false' ? false : val

    if (key === 'VITE_PORT') {
      realVal = Number(realVal)
    }

    result[key] = realVal

    // 将环境变量顺便放到 process.env 中
    process.env[key] = realVal
  }

  return result as ViteEnv
}

export { __APP_INFO__, formatEnv }
