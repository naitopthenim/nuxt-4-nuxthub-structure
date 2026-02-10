export default eventHandler(async (event) => {
  const { key } = getQuery<{ key: string }>(event);

  if (!key) {
    throw createError({ statusCode: 400, message: "key is required" });
  }

  const value = await kv().get(key);
  return { key, value };
});
