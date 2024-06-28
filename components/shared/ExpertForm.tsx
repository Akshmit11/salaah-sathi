"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExpertFormDefaultValues, categoryEnum } from "@/constants";
import { IExpert } from "@/lib/database/models/expert.model";
import { useUploadThing } from "@/lib/uploadthing";
import { expertFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import ExpertFileUploader from "./ExpertFileUploader";
import { createExpert, updateExpert } from "@/lib/actions/experts.actions";

type ExpertFormProps = {
  userId: string;
  type: "Upload" | "Update";
  expert?: IExpert;
  expertId?: string;
};

const ExpertForm = ({ userId, type, expert, expertId }: ExpertFormProps) => {
  const categories = categoryEnum.Enum;
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    expert && type === "Update"
      ? {
          ...expert,
          category: expert.category as typeof ExpertFormDefaultValues.category,
          // TODO: update for expert image urls
          // files: expert.imageUrls
        }
      : ExpertFormDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof expertFormSchema>>({
    resolver: zodResolver(expertFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof expertFormSchema>) {
    let uploadedProfilePhoto = values.profilePhoto;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedProfilePhoto = uploadedImages[0].url;
    }

    if (type === "Upload") {
      try {
        const newExpert = await createExpert({
          expert: {...values, profilePhoto: uploadedProfilePhoto},
          userId,
          path: "/experts",
        });

        if (newExpert) {
          form.reset();
          router.push(`/experts/${newExpert._id}`);
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (type === "Update") {
        if (!expertId) {
          router.back();
          return;
        }
        try {
          const updatedExpert = await updateExpert({
            userId,
            expert: { ...values, _id: expertId, profilePhoto: uploadedProfilePhoto },
            path: `/experts/${expertId}`,
          });
          if (updatedExpert) {
            form.reset();
            router.push(`/experts/${updatedExpert._id}`);
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
        {/* fullname + phonenumber */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        {/* country + state */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* city + category */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Enter City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    categories={categories}
                    defaultValue={initialValues.category}
                    update={type === "Update" ? true : false}
                    categoryFor={"expert"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* description */}
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="About Yourself"
                    {...field}
                    className="h-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* profile photo */}
        <div className="flex flex-col w-full md:w-72 border rounded-md">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ExpertFileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage className="ml-2 pb-1" />
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
            : `${type === "Upload" ? `Register` : `Edit`}`}
        </Button>
      </form>
    </Form>
  );
};

export default ExpertForm;
