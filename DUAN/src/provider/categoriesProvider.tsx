import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export interface IProps {
  resource: string;
  id?: number | string;
  values?: any;
}
//getListCategories
export const getListCategories = async ({ resource = "categories" }) => {
    const { data } = await axios.get(resource);
    return data;
};