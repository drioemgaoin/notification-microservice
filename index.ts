'use strict';

const processType = process.env.PROCESS_TYPE

if (processType === 'web') {
  require('./web')
} else if (processType === 'notification-worker') {
  require('./worker/notification')
} else {
  throw new Error(`${processType} is an unsupported process type. Use one of: 'web', 'notification-worker'!`)
}
