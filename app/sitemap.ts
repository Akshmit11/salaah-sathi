import { MetadataRoute } from "next";
import { getAllTrendingProblems } from "../lib/actions/problem.actions";
import { IProblem } from "../lib/database/models/problem.model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://suggestsolutions.com";
  const problems = await getAllTrendingProblems({
    query: "",
    category: "",
    page: 1,
    limit: 10,
  });

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
