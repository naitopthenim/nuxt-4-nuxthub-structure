export default eventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form || !form[0]) {
    throw createError({ statusCode: 400, message: "No file uploaded" });
  }

  const file = form[0];
  const blob_result = await blob().put(file.filename || "file", file.data, {
    addRandomSuffix: true,
    contentType: file.type,
  });

  return { blob: blob_result };
});
