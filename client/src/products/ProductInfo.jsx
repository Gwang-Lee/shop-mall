import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const ProductInfo = () => {
    // URL의 경로 추출(받기)
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

    // db에서 해당 id에 해당하는 상품 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            }catch(error){
                console.log("상품 상세 조회 에러: ", error);
            }
        }
        fetchProduct();
    })

    return(
        <div className="product-info">
            <h2>상품 정보</h2>
            {product && (<div className="detail">
                            <p>상품명: {product.product_name}</p>
                            <p>가격: {product.price}원</p>
                            <p>: {product.created_at}원</p>
                        </div>)}
            <div>
                <button onClick={() => {navigate('/products')}}>목록 보기</button>
            </div>
        </div>
    )
}

export default ProductInfo;