export default eventHandler(async (event) => {
  const { pathname } = getQuery(event);

  if (!pathname) {
    throw createError({
      statusCode: 400,
      message: "pathname is required",
    });
  }

  await blob().del(pathname as string);

  return {
    success: true,
  };
});
