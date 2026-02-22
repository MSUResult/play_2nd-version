export async function uploadAvatar(file) {
  if (!file || file.size == 0) return null;
  const bytes = await file.arrayBuffer(); // file in binary
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatar" }, //organize image

      (error, result) => {
        if (error) reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });

  return result.secure_url;
}
