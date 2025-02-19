import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ApiClient } from "../../api/apiClient";
import { AuctionDto } from "./useAuctionDetail";

export type PagedResult<T> = {
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  size: number;
  totalPages: number;
  content: T[];
};

export const AUCTIONS = "Auctions";

const fetchAuctions = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<
  PagedResult<AuctionDto>
> => {
  const searchParams = new URLSearchParams(queryKey[1]);

  const serachTerm = searchParams.get("SearchTerm") || "";
  const categories = searchParams.get("Categories") || "";
  const orderBy = searchParams.get("OrderBy") || "";

  return await ApiClient.get(
    `api/catalog?SearchTerm=${serachTerm}&Categories=${
      categories === "All categories" ? "" : categories
    }&OrderBy=${orderBy}`
  );
};

export const usePaginatedAuctions = (searchParams: string) => {
  return {
    ...useQuery([AUCTIONS, searchParams], fetchAuctions, {
      keepPreviousData: true,
    }),
  };
};
