import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function CategoryCard({item}) {
    const formattedPrice = (price) => Number(price).toLocaleString('vi-VN');

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser || null;
    });

    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);
    return (
        <Link to={user ? `/courseDetail/${item.id}` : '/login'}>
            <div className="feature-box text-center">
                <div className="feature-bg">
                    <div className="feature-header">
                        <div className="feature-icon">
                            <img src={"http://localhost:8080/img/" + item.image} alt=""/>
                        </div>
                        <div className="feature-cont">
                            <div className="feature-text">{item.title}</div>
                        </div>
                    </div>
                    <p className="priceplu">{item.price ? formattedPrice(item.price)+'đ' : "Miễn phí"} </p>
                </div>
            </div>
        </Link>
    );
}
