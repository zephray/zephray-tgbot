let service = require('./service');

exports = module.exports = {
  echo: {
    label: '人类的本质就是个复读机。',
    handler: service.echo
  },
  exec: {
    label: '执行Shell命令。',
    handler: service.exec
  },
  ping: {
    label: '本群日常：🤔-NO PROXY- ✈️',
    handler: service.ping
  },
  node: {
    label: '来测试一下你的 js 代码吧。',
    handler: service.node
  },
  shutup: {
    label: '让我收回我的上一句发言。',
    handler: service.shutUp
  },
  setalarm: {
    label: '设定一组闹钟。\n例如 /setalarm maid。\n目前的可选项有 maid ……呃，目前只有这一个',
    handler: service.setAlarm
  },
  listalarm: {
    label: '列出你的所有闹钟',
    handler: service.listAlarms
  },
  modifyalarm: {
    label: '修改一个闹钟的时间。\n格式为 /modifyalarm <闹钟id> <要修改到的小时:要修改到的分钟> \n可以使用 /listalarm 查看所有闹钟\n例如 /modifyalarm 123456789 17:30',
    handler: service.modifyAlarm
  },
  clearalarm: {
    label: '清空你的闹铃。\n清空所有闹铃格式为 /clearalarm all\n清空指定闹铃为 /clearalarm <闹铃id>',
    handler: service.clearAlarm
  },
  help: {
    label: '帮助手册。就是你看到的这个。也可以使用 /help xxx 显示 xxx 命令的用途',
    handler: service.help
  },
  start: {
    label: '兼容 /help。',
    handler: service.help
  }
};
