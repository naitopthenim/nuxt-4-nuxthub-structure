export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const deleted = await useDrizzle()
    .delete(tables.users)
    .where(eq(tables.users.id, id))
    .returning()
    .get();

  if (!deleted) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return { success: true, user: deleted };
});
