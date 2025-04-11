import {  useQuery} from "@tanstack/react-query";
import { getListCategories } from "../provider/categoriesProvider";
import { IProps } from "../provider";

export const useListCategories = ({resource = "categories"}:IProps) => {
    return useQuery({
        queryKey: [resource],
        queryFn: ()=> getListCategories({resource}),
    })
};
