import { MetadataRoute } from "next";
import { getAllTrendingProblems } from "../lib/actions/problem.actions";
import { IProblem } from "../lib/database/models/problem.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://suggestsolutions.com";
  const problems = await getAllTrendingProblems({
    query: "",
    category: "",
    page: 0,
    limit: 0,
  });

  const problemUrls = problems?.data?.map((problem: IProblem) => {
    return {
      url: `${baseUrl}/problems/${problem._id}`,
      lastModified: problem.updatedAt.toISOString(),
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
