import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import NotFoundPage from "./NotFound";
import CatalogPage from "./Auctions";
import { lazy } from "react";
import Root from "./Root";
import { useAuth } from "@/context/AuthContext";

const CreateAuctionPage = lazy(() => import("./Auctions/CreateAuction"));
const AuctionDetailPage = lazy(() => import("./Auctions/AuctionDetail"));
const UserSessionPage = lazy(() => import("./UserSession"));
const WhatIsBidwisePage = lazy(() => import("./WhatIsBidwise"));
const MyListingsPage = lazy(() => import("./MyListings"));
const MyBidsPage = lazy(() => import("./MyBids"));
const ForbiddenPage = lazy(() => import("./NeedAuthentication"));

const AuthenticatedPage = () => {
  const { loggedInUser, loading } = useAuth();

  if (!loggedInUser && !loading)
    return <Navigate to="/need-authentication" replace />;

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <CatalogPage /> },
      { path: "auctions", element: <CatalogPage /> },
      { path: "auctions/create", element: <CreateAuctionPage /> },
      { path: "auctions/:id", element: <AuctionDetailPage /> },
      { path: "forbidden", element: <ForbiddenPage /> },
      { path: "whatis", element: <WhatIsBidwisePage /> },
      {
        path: "account",
        element: <AuthenticatedPage />,
        children: [
          { path: "session", element: <UserSessionPage /> },
          { path: "listings", element: <MyListingsPage /> },
          { path: "bids", element: <MyBidsPage /> },
        ],
      },
      { path: "users/:id/listings", element: <MyListingsPage /> },
      { path: "need-authentication", element: <ForbiddenPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
