import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, deleteOne, getList, getOne, IProps, update } from "../provider";
import { message } from "antd";

export const useList = ({resource = "products"}:IProps) => {
    return useQuery({
        queryKey: [resource],
        queryFn: ()=> getList({resource}),
    })
};

// useOne->getOne 
export const useOne = ({resource = "products",id} :IProps)=>{
    return useQuery({
        queryKey: [resource,id],
        queryFn: ()=>getOne({resource,id})
    })
}
// useCreate->create
export const useCreate = ({resource = "products"}:IProps)=>{
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ resource, values }:IProps)=> create({resource,values}),
        onSuccess: ()=>{
            alert("Successfully");
            qc.invalidateQueries({queryKey: [resource]})
        }
    })
}
//useUpdate
export const useUpdate = ({resource = "products"}:IProps)=>{
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({id,values}: IProps) => update({ resource, id,values}),
      onSuccess: () => {
        message.success("Sửa thanh cong");
        qc.invalidateQueries({ queryKey: [resource] });
      },
    });
}
// useDelete -> deleteOne
export const useDelete = ({ resource = "products" }: IProps) => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id?: string | number) => deleteOne({ resource, id }),
      onSuccess: () => {
        message.success("Xoa thanh cong");
        qc.invalidateQueries({ queryKey: [resource] });
      },
    });
  };