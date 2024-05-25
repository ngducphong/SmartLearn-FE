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
import {useDispatch, useSelector} from "react-redux";
import {getAllCoursesAPI} from "../../../redux/reducer/courseSlice";
import {useEffect, useState} from "react";
import {getAllCourses, getCourseFavourite, getCourseMostRegistered} from "../../../api/courseAPIs.js";

export default function Home() {
    //#region redux
    // const allCourses = useSelector((state) => state.courseSlice.courses);
    // const isLoading = useSelector((state) => state.courseSlice.loading);
    // const dispatch = useDispatch();
    // //#endregion
    // useEffect(() => {
    //     dispatch(getAllCoursesAPI({page: 0, size: 6, home: "home"}));
    // }, []);


    // lấy page được nhiều người đăng ký nhất
    const [mostRegistered, setMostRegistered] = useState([]);
    const [isLoadingNewCourses, setIsLoadingNewCourses] = useState();
    const getListCourses = async () => {
        setIsLoadingNewCourses(true)
        const data = await getCourseMostRegistered(0, 6);
        setMostRegistered(data.content);
        setIsLoadingNewCourses(false)
    }
    useEffect(() => {
        getListCourses();
    }, []);

    // lấy page được nhiều người yêu thích nhất
    const [courseFavourite, setCourseFavourite] = useState([]);
    const [isLoadingCourseFavourite, setIsLoadingCourseFavourite] = useState();
    const getListCoursesFavourite = async () => {
        setIsLoadingCourseFavourite(true)
        const data = await getCourseFavourite(0, 6);
        setCourseFavourite(data.content);
        setIsLoadingCourseFavourite(false)
    }
    useEffect(() => {
        getListCoursesFavourite();
    }, []);

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser || null;
    });

    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);
    return (
        <>
            <Banner/>
            <TopCategory/>
            <NewCourses allCourses={mostRegistered} isLoading={isLoadingNewCourses} user={user}/>
            <MasterSkill/>
            <TrendingCourse allCourses={courseFavourite} isLoading={isLoadingCourseFavourite} user={user}/>
            <Companies/>
            <ShareKnowledge/>
            <UserLove/>
            <Instructors/>
            <Blogs/>
        </>
    );
}
