export default eventHandler(async (event) => {
  const { name, email } = await readBody(event);

  if (!name || !email) {
    throw createError({
      statusCode: 400,
      message: "Name and email are required",
    });
  }

  const user = await useDrizzle()
    .insert(tables.users)
    .values({ name, email })
    .returning()
    .get();

  return { user };
});
