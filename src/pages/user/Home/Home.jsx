import ShareKnowledge from "../../../layouts/user/ShareKnowledge/ShareKnowledge";
import Banner from "../../../layouts/user/Banner/Banner";
import Blogs from "../../../layouts/user/Blogs/Blogs";
import Companies from "../../../layouts/user/Companies/Companies";
import Instructors from "../../../layouts/user/Instructors/Instructors";
import MasterSkill from "../../../layouts/user/MasterSkill/MasterSkill";
import NewCourses from "../../../layouts/user/NewCourses.jsx/NewCourses";
import TopCategory from "../../../layouts/user/TopCategory/TopCategory";
import TrendingCourse from "../../../layouts/user/TrendingCourse/TrendingCourse";
import UserLove from "../../../layouts/user/UserLove/UserLove";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAPI } from "../../../redux/reducer/courseSlice";
import { useEffect } from "react";
export default function Home() {
  //#region redux
  const allCourses = useSelector((state) => state.courseSlice.courses);
  const isLoading = useSelector((state) => state.courseSlice.loading);
  const dispatch = useDispatch();
  //#endregion
  useEffect(() => {
    dispatch(getAllCoursesAPI({ page: 0, size: 6, home: "home" }));
  }, []);
  return (
    <>
      <Banner />
      <TopCategory />
      <NewCourses allCourses={allCourses} isLoading={isLoading} />
      <MasterSkill />
      <TrendingCourse allCourses={allCourses} isLoading={isLoading} />
      <Companies />
      <ShareKnowledge />
      <UserLove />
      <Instructors />
      <Blogs />
    </>
  );
}
