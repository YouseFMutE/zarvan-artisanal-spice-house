import React from "react";
import { fetchExperienceBootstrap } from "@/lib/fallbackData";
import ZarvanExperienceClient from "@/components/ZarvanExperienceClient";

export default async function HomePage() {
  const { data, isLiveApi } = await fetchExperienceBootstrap();

  return (
    <ZarvanExperienceClient
      initialData={data}
      initialIsLiveApi={isLiveApi}
    />
  );
}
