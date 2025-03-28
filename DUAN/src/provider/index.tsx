import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export interface IProps {
  resource: string;
  id?: number | string;
  values?: any;
}

//getListProducts
export const getList = async ({ resource = "products" }) => {
  const { data } = await axios.get(resource);
  return data;
};

//getOne
export const getOne = async ({ resource = "products", id }: IProps) => {
  if (!id) {
    return;
  }
  const { data } = await axios.get(`${resource}/${id}`);
  return data;
};
//Create
export const create = async ({ resource = "products", values }: IProps) => {
  const { data } = await axios.post(resource, values);
  return data;
};
//Update
export const update = async ({ resource = "products", id, values }: IProps) => {
  if (!id) {
    return;
  }
  const { data } = await axios.put(`${resource}/${id}`, values);
  return data;
};
export const deleteOne = async ({ resource = "products", id }: IProps) => {
  if (!id) {
    return;
  }
  const { data } = await axios.delete(`${resource}/${id}`);
  return data;
};
