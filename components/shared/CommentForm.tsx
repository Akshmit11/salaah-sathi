"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentFormDefaultValues } from "@/constants";
import { commentFormSchema } from "@/lib/validator";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/lib/actions/comment.actions";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  userId: string;
  problemId: string;
};

const CommentForm = ({ userId, problemId }: CommentFormProps) => {
  const router = useRouter();
  const initialValues = CommentFormDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    // console.log(values);
    try {
      const newComment = await createComment({
          comment: values.comment,
          problemId: problemId,
          userId: userId,
          path: '/profile'
        });

        if (newComment) {
          form.reset();
          router.refresh();
        }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit">
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea placeholder="Enter your solution here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"sm"}
              className="sm:w-fit sm:flex sm:float-end sm:self-"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? `Processing...` : `Submit`}
            </Button>
          </div>
        </form>
      </Form>
  );
};

export default CommentForm;
