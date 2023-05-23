import {createWebHistory, createRouter} from "vue-router"
import MainPage from "@/components/MainPage";
import ProfilePage from "@/components/ProfilePage";
import LoginPage from "@/components/Login";


const routes = [
    {
        path: "/",
        name: MainPage.name,
        component: MainPage,
    },
    {
        path: "/profile/:profile_id",
        name: ProfilePage.name,
        component: ProfilePage
    },
    {
        path: "/login/",
        name: LoginPage.name,
        component: LoginPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router