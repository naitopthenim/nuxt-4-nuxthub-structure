export default defineCachedEventHandler(
  async () => {
    const users = await useDrizzle().select().from(tables.users);
    return { users, fetchedAt: new Date().toISOString() };
  },
  {
    maxAge: 60,
    getKey: () => "users-list",
  },
);
