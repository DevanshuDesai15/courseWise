import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userNameState = selector({
    key: 'userNameState',
    get: ({get}) => {
        const state = get(userState);

        return state.username;
    },
});