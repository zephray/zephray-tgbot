exports = module.exports = {};

let mongo = require('./mongo');

const getCommand = (text) => {
  let command = text.split(' ');
  command.shift();

  return command.join(' ');
}
exports.getCommand = getCommand;

const verify = (msg) => {
  if (msg.from.id !== config.userId) {
    throw new Error('🌚');
  }
}
exports.verify = verify;

const getLatestMessages = async (chatId) => {
  await mongo.prepare();
  let latestMessages = await mongo.message.aggregate([
    { $match: { 'chat.id': chatId } },
    { $sort: { date: -1 } },
    { $limit: 1 }
  ]).toArray();
  console.log(latestMessages)
  return latestMessages[0];
};
exports.getLatestMessages = getLatestMessages;

const sendMessage = async (msg) => {
  if (msg.response) {
    let sentMessage = await msg.bot.sendMessage(msg.chat.id, '```\n' + msg.response + '```\n', {
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id
    });
    await mongo.message.insertOne(sentMessage);
    await mongo.message.deleteMany({
      date: { $lt: parseInt(Date.now() / 1000) - 60 * 60 * 24 * 2 } // 消息保留两天
    })
  }
}
exports.sendMessage = sendMessage;

const alarmToString = (alarm) => {
  if (alarm.alarmTime.minute < 10 && alarm.alarmTime.minute.length < 2) {
    alarm.alarmTime.minute = '0' + alarm.alarmTime.minute;
  }
  return [
    `id:   ${alarm._id}`,
    `label ${alarm.label}`,
    `time: ${alarm.alarmTime.hour}:${alarm.alarmTime.minute}`,
    `mode: ${alarm.check.mode}-${alarm.check.time}`
  ].join('\n');
}
exports.alarmToString = alarmToString;