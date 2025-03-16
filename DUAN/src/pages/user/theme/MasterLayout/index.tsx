import Header from "../header";
import Footer from "../footer";
import { ReactNode } from "react";
interface MasterLayoutProps {
    children: ReactNode;
    [key: string]: any; // Cho phép các props khác mà không cần khai báo riêng lẻ
}
const MasterLayout = ({children,...props}: MasterLayoutProps) =>{
    return (
        <div {...props}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
export default MasterLayout;