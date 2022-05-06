const cron = require('cron');

module.exports = client => {
    client.user.setPresence({ activities: [{ name: 'Making transports' }], status: 'dnd' });
    console.log("I'm ready !");
}