import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import { Signup } from "../pages/Signup";
import { Signin } from "../pages/Signin";
import { Inspector } from "../pages/Inspector";
import Inshome from "../pages/Inspector/Inshome";
import Insights from "../pages/Inspector/Insights";
import Inspect from "../pages/Inspector/Inspect";
import Infrastructure from "../pages/Inspector/Infrastructure";
import BuildingAge from "../pages/Inspector/BuildingAge";
import JudgingCriteria from "../pages/Inspector/JudgingCriteria";
import LabFacalaties from "../pages/Inspector/LabFacalaties";
import Feedback from "../pages/Inspector/Feedback";
import UniGraph from "../pages/Inspector/UniGraph";
import UniRanking from "../pages/Inspector/UniRanking";
import { University } from "../pages/University";
import SingleUniversity from "../pages/SingleUniversity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "university",
        children: [
          {
            path: "",
            element: <University />
          },
          {
            path: ":id",
            element: <SingleUniversity />,
            loader: ({ params }) => fetch(`http://localhost:5000/university/${params.id}`)
          },
          {
            path: "reports",
            element: <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">University Reports</h1>
              <p>Reports page is under construction.</p>
            </div>
          },
          {
            path: "profile",
            element: <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">University Profile</h1>
              <p>Profile page is under construction.</p>
            </div>
          }
        ]
      },
      {
        path: "inspector",
        children: [
          {
            path: "",
            element: <Inspector />
          },
          {
            path: "home",
            element: <Inspector />
          },
          {
            path: "inshome",
            element: <Inshome />
          },
          {
            path: "inspect",
            element: <Inspect />
          },
          {
            path: "insights",
            element: <Insights />
          },
          {
            path: "infrastructure",
            element: <Infrastructure />
          },
          {
            path: "building-age",
            element: <BuildingAge />
          },
          {
            path: "judging-criteria",
            element: <JudgingCriteria />
          },
          {
            path: "lab-facilities",
            element: <LabFacalaties />
          },
          {
            path: "feedback",
            element: <Feedback />
          },
          {
            path: "university-graph",
            element: <UniGraph />
          },
          {
            path: "university-ranking",
            element: <UniRanking />
          }
        ]
      }
    ]
  }
]);

export default router;
