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
import { ProblemFormDefaultValues, categoryEnum } from "@/constants";
import { createProblem, updateProblem } from "@/lib/actions/problem.actions";
import { IProblem } from "@/lib/database/models/problem.model";
import { problemFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import Dropdown from "./Dropdown";

type PropertyFormProps = {
  userId: string;
  type: "Upload" | "Update";
  problem?: IProblem;
  problemId?: string;
};

const ProblemForm = ({
  userId,
  type,
  problem,
  problemId,
}: PropertyFormProps) => {
  const categories = categoryEnum.Enum;
  const router = useRouter();

  const initialValues =
    problem && type === "Update"
      ? {
          title: problem.title,
          description: problem.description,
          category:
            problem.category as typeof ProblemFormDefaultValues.category,
        }
      : ProblemFormDefaultValues;

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
          path: "/profile",
        });
        if (newProblem) {
          form.reset();
          router.push(`/problems/${newProblem._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(values)
    if (type === "Update") {
      if (!problemId) {
        router.back();
        return;
      }
      try {
        const updatedProblem = await updateProblem({
          userId,
          problem: { ...values, _id: problemId },
          path: `/problems/${problemId}`,
        });

        if (updatedProblem) {
          form.reset();
          router.push(`/problems/${updatedProblem._id}`);
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
                    defaultValue={initialValues.category}
                    update={type === "Update" ? true : false}
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
          {form.formState.isSubmitting
            ? `Processing...`
            : `${type === "Upload" ? `Submit` : `Edit`} Problem`}
        </Button>
      </form>
    </Form>
  );
};

export default ProblemForm;
