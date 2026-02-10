export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const user = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, id))
    .get();

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return { user };
});
