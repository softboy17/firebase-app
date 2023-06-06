import Chat from "./component/Chat";
import Login from "./component/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/const";

export const publicRoutes = [
    {
        page: LOGIN_ROUTE,
        Component: Login
    }
]
export const privateRoutes = [
    {
        page: CHAT_ROUTE,
        Component: Chat
    }
]