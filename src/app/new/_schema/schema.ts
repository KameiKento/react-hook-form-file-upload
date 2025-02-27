import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg"];
const IMAGE_SIZE_LIMIT = 5000000;

export const uploadFormSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => 0 < files.length, {
      message: "画像ファイルの添付は必須です",
    })
    .refine((files) => 0 < files.length && files.length < 2, {
      message: "添付できる画像ファイルは1枚までです",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => {
          console.log(file);
          return file.size < IMAGE_SIZE_LIMIT;
        }),
      { message: "添付できる画像ファイルは5MBまでです" }
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
      { message: "添付できる画像ファイルはjpegかpngです" }
    ),
});

export type UploadFormSchemaType = z.infer<typeof uploadFormSchema>;
