import axios from "axios";
import { urlUserBase, urlWithId } from "../api/user.api";


export const getAll = async () => {

    const res = await axios.get(`${urlUserBase}`);
    return res.data;
};
export const create = async (data) => {
    const res = await axios.post
        (`${urlUserBase}`, data);
    return res.data;
};
export const update = async (id, data) => {
    const res = await axios.put(`${urlWithId(id)}`, data);
    return res.data;
};
export const remove = async (id) => {
    const res = await axios.delete(`${urlWithId(id)}`);
    return res.data;
};
export const getById = async (id) => {
    const res = await axios.get(`${urlWithId(id)}`);
    return res.data;
};