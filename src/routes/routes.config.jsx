import Login from "../pages/user/Auth/Login";
import Register from "../pages/user/Auth/Register";
import CourseDetail from "../pages/user/CourseDetail/CourseDetail";
import Home from "../pages/user/Home/Home";
import IndexUser from "../pages/user/IndexUser";
import PrivateRouter from "./PrivateRouter";
import CourseIndex from "../pages/admin/course-index";
import DetailCourse from "../pages/admin/detailCourse";
import HomeAdmin from "../pages/admin/home";
import CategoryManagement from "../pages/admin/category_management/CategoryManagement";
import PostManagement from "../pages/admin/posts/PostManagement";
import UserMangagement from "../pages/admin/user_management";
import LearningCourse from "../pages/user/LearningCourse/LearningCourse";
import AllCourses from "../pages/user/AllCourses/AllCourses";
import NotFound from "../pages/notfound/NotFound";
import PayMentCourse from "../pages/user/PayMent/PayMentCourse.jsx";
import ChangePassword from "../components/User/ChangePassword.jsx";
const routesConfig = [
  {
    path: "/admin",
    element: <PrivateRouter />,
    children: [
      { path: "", element: <HomeAdmin /> },
      { path: "management", element: <CourseIndex /> },
      { path: "category", element: <CategoryManagement /> },
      { path: "post", element: <PostManagement /> },
      { path: "user", element: <UserMangagement /> },
      { path: "course/:id", element: <DetailCourse /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/",
    element: <IndexUser />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/courses", element: <AllCourses /> },
      { path: "/courseDetail/:id", element: <CourseDetail /> },
      { path: "/payMentCourse/:id", element: <PayMentCourse /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/course/learn/:id", element: <LearningCourse /> },
  { path: "*", element: <NotFound /> },,
  { path: "/change-password", element: <ChangePassword /> },
];

export default routesConfig;
