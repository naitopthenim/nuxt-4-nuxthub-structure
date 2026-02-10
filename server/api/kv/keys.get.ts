export default eventHandler(async () => {
  const keys = await kv().keys();
  return { keys };
});
