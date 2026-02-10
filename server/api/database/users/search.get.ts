import { like } from "drizzle-orm";

export default eventHandler(async (event) => {
  const { q } = getQuery<{ q?: string }>(event);
  const db = useDrizzle();

  const users = q
    ? await db
        .select()
        .from(tables.users)
        .where(
          or(
            like(tables.users.name, `%${q}%`),
            like(tables.users.email, `%${q}%`),
          ),
        )
    : await db.select().from(tables.users).orderBy(tables.users.createdAt);

  return { users };
});
