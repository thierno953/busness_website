import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../features/cartSlice";
import { useGetAllProductsQuery } from "../../../features/productsApi";

const RecentCard = () => {
    const { items: products, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetAllProductsQuery();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    return (
        <>
            <div className='content grid3 mtop'>
                {status === "success" ? (
                    <>
                        {data &&
                            data?.map((product) => (
                                <div className='box shadow' key={product.id} >
                                    <div className='img'>
                                        <img src={product.image} alt='' />
                                    </div>
                                    <div className='text'>
                                        <div className='category flex'>
                                            <span>{product.brand}</span>
                                            <div>
                                                <button className='btn2'>€{product.price}</button>
                                            </div>
                                        </div>
                                        <h4>{product.name}</h4>
                                        <p>
                                            <i className='fa fa-location-dot'></i> {product.desc}
                                        </p>
                                    </div>
                                    <div className='button flex'>
                                        <button onClick={() => handleAddToCart(product)}>
                                            Add To Cart
                                        </button>
                                        <span>{product.type}</span>
                                    </div>
                                </div>
                            ))}
                    </>
                ) : status === "pending" ? (
                    <p>Loading...</p>
                ) : (
                    <p>Unexpected error occured...</p>
                )}
            </div>
        </>
    )
}

export default RecentCard
