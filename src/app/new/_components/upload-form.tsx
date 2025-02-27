"use client";

import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFormSchema, UploadFormSchemaType } from "../_schema/schema";
import { useState } from "react";

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormSchemaType>({
    resolver: zodResolver(uploadFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: UploadFormSchemaType) => console.log(data);

  const [previewSource, setPreviewSource] = useState("");

  const generateImageSource = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSource(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) {
      setPreviewSource("");
      return;
    }

    generateImageSource(files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl">画像アップロードフォーム</h1>

      <label
        htmlFor="image-upload"
        className="flex justify-center items-center max-h-[400px] aspect-video border border-dashed rounded-xl cursor-pointer"
      >
        {previewSource ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSource}
            alt="preview"
            className="h-full object-contain object-center"
          />
        ) : (
          <>
            <Upload size={30} />
            <span className="ml-2 text-xl">画像をアップロード</span>
          </>
        )}
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/png, image/jpeg"
        hidden
        {...register("image", {
          onChange: onChange,
        })}
      />
      {errors.image && <div>{errors.image.message}</div>}
      <button className="px-3 py-2 bg-zinc-600 rounded" type="submit">
        送信
      </button>
    </form>
  );
}
