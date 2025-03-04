import { api } from "../configs/axiosConfig";
import { title } from "../pages/AccountPage/style";

export const createBoardApi = async (board) => await api.post(`/api/board/${board.categoryName}`, {title: board.title, contene: board.contene});
export const getCategoriesApi = async () => await api.get("/api/board/categories");