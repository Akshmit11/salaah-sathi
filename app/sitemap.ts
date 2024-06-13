import { MetadataRoute } from "next";
import { IProblem } from "../lib/database/models/problem.model";
import { getAllProblemsForSitemap } from "@/lib/actions/problem.actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://suggestsolutions.com";
  const problems = await getAllProblemsForSitemap();

  const problemUrls = problems?.data?.map((problem: IProblem) => {
    return {
      url: `${baseUrl}/problems/${problem._id}`,
      lastModified: problem.updatedAt,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...problemUrls,
  ];
}
