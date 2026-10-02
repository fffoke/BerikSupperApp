import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import type { linkList } from "../../type/linkList"


type Props = {
    linkList: linkList
}

export default function Loyalt({ linkList }: Props) {

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header linkList={linkList} />

                <main className="flex-1 relative z-0">
                    <Outlet />
                </main>

                {linkList.appName !== 'Food Delivery' && <Footer />}
            </div>
        </>
    )

}
