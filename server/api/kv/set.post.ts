export default eventHandler(async (event) => {
  const { key, value } = await readBody(event);

  if (!key || !value) {
    throw createError({
      statusCode: 400,
      message: "key and value are required",
    });
  }

  await kv().set(key, value);
  return { success: true };
});
