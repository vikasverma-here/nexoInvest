import React, { useEffect, useState } from "react";
import { SwalError } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
import { getBannerListUser } from "../../api/user-api";
import { backendConfig } from "../../constants/content/MainContent";

const Notification = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBannerData();
    }, []);

    console.log(banners);

    const fetchBannerData = async () => {
        try {
            setLoading(true);
            const res = await getBannerListUser();
            setBanners(res?.data);
        } catch (err) {
            console.error("Error fetching banner data:", err);
            SwalError.fire({
                title: "Error",
                text:
                    err?.response?.data?.message ||
                    "Error fetching banner data.",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading && <PageLoader />}
            <div>
                {banners.map((banner, index) => {
                    return (
                        <div
                            key={index}
                            className="card"
                            style={{ width: "100%",  }}
                        >
                           <img
    src={backendConfig.origin + banner?.imageUrl}
    className="card-img-top"
    alt={banner?.title}
    style={{
        width: "100%",
        height: "50vh",
        objectFit: "cover",
        borderTopLeftRadius: "0.375rem", // optional if using Bootstrap rounded card
        borderTopRightRadius: "0.375rem", // optional
    }}
/>

                            <div className="card-body">
                                <h2 className="card-title text-[2rem]">
                                    <span className="fw-bold ">
                                        Description:
                                    </span>{" "}
                                    {banner?.title}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Notification;
