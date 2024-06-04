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
import { ProblemFormDefaultValues, categoryEnum } from "@/constants";
import { problemFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { createProblem } from "@/lib/actions/problem.actions";

type PropertyFormProps = {
  userId: string;
  type: "Upload" | "Update";
};

const ProblemForm = ({ userId, type }: PropertyFormProps) => {
  const categories = categoryEnum.Enum;
  const router = useRouter();

  const initialValues = ProblemFormDefaultValues;
  const [selectedCategory, setSelectedCategory] = useState(
    ProblemFormDefaultValues.category
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof problemFormSchema>>({
    resolver: zodResolver(problemFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof problemFormSchema>) {
    if (type === "Upload") {
      try {
        const newProblem = await createProblem({
          problem: values,
          userId,
          path: "/profile"
        })
        if (newProblem) {
          form.reset();
          router.push(`/problems/${newProblem._id}`);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Write Your Problem Title" {...field} />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Problem Desciption"
                    {...field}
                    className="h-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="sm:w-fit sm:flex sm:self-end"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? `Processing...` : `${type === "Upload" ? `Submit` : `Edit`} Problem`}
        </Button>
      </form>
    </Form>
  );
};

export default ProblemForm;
