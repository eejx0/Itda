import instance from "../axios";
import { LoginData } from "./type";

const FIREBASE_BASE_URL = 'https://itda-69d0a.firebaseio.com';

export const Login = async (data: LoginData) => {
    await instance.post(`${FIREBASE_BASE_URL}/login`, data);
}