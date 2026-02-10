export default eventHandler(async (event) => {
  const { key } = getQuery<{ key: string }>(event);

  if (!key) {
    throw createError({ statusCode: 400, message: "key is required" });
  }

  await useStorage("cache").removeItem(key);
  return { success: true };
});
