export default eventHandler(async () => {
  const { blobs } = await blob().list();
  return { blobs };
});
