require('dotenv').config();
const redis = require('redis');
const client = redis.createClient({
  url: process.env.URL,
});
client.connect(() => {
  console.log('Redis Connected..');
});
client.on('ready', () => {
  console.log('Redis Connected and Ready to use..');
});

client.on('error', (er) => {
  console.log('Redis Error..', er.message);
});

client.on('end', () => {
  console.log('Redis Disconnected..');
});

process.on('SIGINT', () => {
  client.quit();
});
module.exports = client;
