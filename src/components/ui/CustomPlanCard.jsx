/* eslint-disable react/prop-types */
import { Button2 } from "./Buttons";

const CustomPlanCard = ({ data, sureConfirmation }) => {
    return (
        <>
            <div className="MatrimonyCustomOfferCard ss-card">
                {data?.status && (
                    <div className="popularTag fill">Purchased</div>
                )}

                <div className="center">
                    <div className="planValues">
                        {/* <h6 className="planName">{data?.packageName}</h6> */}
                        <h6 className="price">${data?.price}</h6>
                    </div>

                    <Button2
                        onClick={() => sureConfirmation(data)}
                        // className={`${!data?.next ? "disabledBtn" : ""}`}
                        // disabled={!data?.next}
                        name="Choose Plan"
                    />
                </div>
            </div>
        </>
    );
};

export default CustomPlanCard;
