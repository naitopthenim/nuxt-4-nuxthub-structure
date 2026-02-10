export default eventHandler(async () => {
  const users = await useDrizzle().select().from(tables.users);
  return { users };
});
