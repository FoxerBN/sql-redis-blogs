import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  });

redis.on('error', (error) => console.error('Redis error:', error));

redis.info("memory").then(info => {
  const lines = info.split("\n");
  const usedMemoryLine = lines.find(line => line.startsWith("used_memory:"));
  if (usedMemoryLine) {
    const usedMemory = parseInt(usedMemoryLine.split(":")[1], 10);
    console.log(`Redis používa ${Math.round(usedMemory / 1024 / 1024 )} MB RAM`);
  }
});
