export default eventHandler(async (event) => {
  const { key } = getQuery<{ key: string }>(event);

  if (!key) {
    throw createError({ statusCode: 400, message: "key is required" });
  }

  await kv().del(key);
  return { success: true };
});
