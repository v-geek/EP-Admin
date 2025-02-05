import dayjs from 'dayjs'

import { name, version } from '../package.json'

const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export { __APP_INFO__ }
