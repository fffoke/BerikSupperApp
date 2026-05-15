import CategorySidebar from '../../components/UI/Product_delivery/SideBar';
import CategoryGrid from '../../components/UI/Product_delivery/CatagoryCard';
import CartSidebar from '../../components/UI/Product_delivery/CartSideBar';

export default function Main() {
    return (
        <div className="flex min-h-screen bg-white">
            <CategorySidebar />

            <main className="flex-1 min-w-0 bg-white">

                <div className="max-w-[1200px] mx-auto">
                    <CategoryGrid />
                </div>

            </main>

            <CartSidebar />
        </div>
    );
};
