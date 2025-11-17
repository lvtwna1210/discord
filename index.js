require("./server.js");

const { Client, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const distube = new DisTube(client, {
  searchSongs: 1,
  emitNewSongOnly: true
});

client.once("ready", () => {
  console.log(`🎵 Bot đã online: ${client.user.tag}`);
});

client.on("messageCreate", async message => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (!message.member.voice.channel)
    return message.reply("❗ Vào kênh voice trước đã!");

  if (cmd === "play") distube.play(message.member.voice.channel, args.join(" "), { message });
  if (cmd === "skip") distube.skip(message);
  if (cmd === "stop") distube.stop(message);
  if (cmd === "pause") distube.pause(message);
  if (cmd === "resume") distube.resume(message);
  if (cmd === "queue") {
    const q = distube.getQueue(message);
    if (!q) return message.reply("📭 Danh sách trống.");
    message.reply("🎶 Queue:\n" + q.songs.map((s, i) => `${i+1}. ${s.name}`).join("\n"));
  }
});

client.login(process.env.TOKEN);
