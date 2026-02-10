export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody<{ name?: string; email?: string }>(event);

  const user = await useDrizzle()
    .update(tables.users)
    .set(body)
    .where(eq(tables.users.id, id))
    .returning()
    .get();

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return { user };
});
