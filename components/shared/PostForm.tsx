"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PostFormDefaultValues, categoryEnum } from "@/constants";
import { IPost } from "@/lib/database/models/post.model";
import { useUploadThing } from "@/lib/uploadthing";
import { postFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import VideoUploader from "./VideoUploader";
import { createPost, updatePost } from "@/lib/actions/post.actions";

type PostFormProps = {
  userId: string;
  expertId: string;
  type: "Upload" | "Update";
  post?: IPost;
  postId?: string;
};

const PostForm = ({ userId, expertId, type, post, postId }: PostFormProps) => {
  const categories = categoryEnum.Enum;
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const initialValues =
    postId && type === "Update"
      ? {
          ...post,
        }
      : PostFormDefaultValues;

  const { startUpload } = useUploadThing("uploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    let uploadedImageUrls = values?.imageUrls || []; // Change to handle array
    let uploadedVideoUrls = values?.videoUrls || []; // Change to handle array

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrls = uploadedImages.map((image) => image.url); // Collect all URLs into an array
    }

    if (videos.length > 0) {
      const uploadedVideos = await startUpload(videos);
      if (!uploadedVideos) {
        return;
      }
      uploadedVideoUrls = uploadedVideos.map((video) => video.url); // Collect all URLs into an array
    }

    // combine two string array
    let uploadedFiles: any = [...uploadedImageUrls, ...uploadedVideoUrls];

    if (type === "Upload") {
      try {
        const newPost = await createPost({
          post: { ...values, fileUrls: uploadedFiles },
          userId,
          expertId,
          path: "/experts",
        });
        if (newPost) {
          form.reset();
          router.push(`/experts/posts/${newPost._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!postId) {
        router.back();
        return;
      }
      try {
        const updatedPost = await updatePost({
          userId,
          expertId,
          post: { ...values, _id: postId, fileUrls: uploadedFiles },
          path: `/experts/posts/${postId}`,
        });
        if (updatedPost) {
          form.reset();
          router.push(`/experts/posts/${updatedPost._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Describe Your Post"
                    {...field}
                    className="h-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* TODO: Image URLS Form */}
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrls={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* TODO: Video URLS Form */}
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="videoUrls"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <VideoUploader
                    onFieldChange={field.onChange}
                    videoUrls={field.value}
                    setVideos={setVideos}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="sm:w-fit sm:flex sm:self-end"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? `Processing...`
            : `${type === "Upload" ? `Post` : `Edit`}`}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
