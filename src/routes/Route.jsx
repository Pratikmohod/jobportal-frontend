import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import AddToJob from "../components/jobPost/AddToJob";
import HomePage from "../pages/homePage/HomePage";
import MyProfile from "../pages/myProfile/MyProfile";
import ViewSingleJob from "../components/jobPost/ViewSingleJob";
import Companies from "../pages/companies/Companies";
import CompanyJobs from "../pages/companies/CompanyJobs";
import JobPost from "../pages/JobPost/JobPost";
import EditProfile from "../pages/myProfile/EditProfile";
import Mynetwork from "../pages/Mynetwork/Mynetwork";
import MyApplications from "../pages/myapplications/MyApplications";
import RecruiterApplications from "../pages/myapplications/RecruiterApplications";
import Notifications from "../pages/notifications/Notifications";
let Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addToJob",
        element: <AddToJob />,
      },
      {
        path: "/homePage",
        element: <HomePage />,
      },
      {
        path: "/myProfile",
        element: <MyProfile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/singleJob/:id",
        element: <ViewSingleJob />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/company/:companyName",
        element: <CompanyJobs />,
      },
      {
        path: "/jobPost",
        element: <JobPost />,
      },
      {
        path: "/mynetwork",
        element: <Mynetwork />,
      },
      {
        path: "/my-applications",
        element: <MyApplications />,
      },
      {
        path: "/received-applications",
        element: <RecruiterApplications />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
]);

export default Route;
