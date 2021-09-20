const cron = require('cron');

module.exports = client => {
    /*let scheduledMessage = new cron.CronJob('00 * 12 * * *', () => {
        client.doDailyLoss();
    });
    let listGuild = new cron.CronJob('00 * 16 * * *', () => {
        client.doCount();
    });

    // When you want to start it, use:
    listGuild.start()
    scheduledMessage.start();*/
    client.user.setPresence({ activities: [{ name: 'Making transports' }], status: 'dnd' });
    console.log("I'm ready !");
}