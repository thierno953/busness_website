import { useEffect } from "react";
import './checkoutSuccess.css';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../../../features/cartSlice";


const CheckoutSuccess = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    return (
        <div className="container">
            <div className="checkoutSuccess">
                <div className="checkoutSuccess_flex">
                    <h1>Checkout Successful !</h1>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;

