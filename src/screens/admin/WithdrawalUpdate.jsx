import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { Button2 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import { getAdminInfo } from "../../api/auth-api";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { adminWithdrawalUpdate } from "../../api/admin-api";

const WithdrawalUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        min: 0.0,
        max: 0.0,
        limit: 0.0,
        dailyLimitCount: 0,
    });

    const [edit, setEdit] = useState(false);

    const [errors, setErrors] = useState(false);

    useEffect(() => {
        getAdminData();
    }, []);

    const getAdminData = async () => {
        try {
            setLoading(true);
            const response = await getAdminInfo();
            console.log(response?.data?.user);
            setPayload(response?.data?.user);
        } catch (err) {
            console.error("Error getting admin data:", err);
        } finally {
            setLoading(false);
        }
    };
    console.log(payload);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await adminWithdrawalUpdate(payload);
            SwalSuccess.fire({
                title: "Success",
                text: "Data Updated successfully.",
                confirmButtonText: "OK",
                timer: 2000,
            }).then(() => {
                getAdminData();
                setEdit(false);
            });
        } catch (err) {
            console.error("Error creating banner:", err);
            SwalError.fire({
                title: "Error",
                text: err?.response?.data?.message || "Error creating banner.",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="d-flex flex-column justify-content-start align-items-start">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h1>Withdrawal Details</h1>
                    <div>
                        <Button2
                            name={edit ? "Cancel" : "Edit"}
                            onClick={() => setEdit(!edit)}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 gap-md-5 align-items-stretch align-items-md-end w-100 mt-4">
                    <TextInput
                        labelName="Minimum withdrawal"
                        type="text"
                        onChange={(e) =>
                            setPayload({ ...payload, min: e.target.value })
                        }
                        value={payload?.min}
                        placeholder={"Minimum withdrawal"}
                        error={errors.min}
                        disabled={!edit}
                    />
                    <TextInput
                        labelName="Maximum withdrawal"
                        type="text"
                        onChange={(e) =>
                            setPayload({ ...payload, max: e.target.value })
                        }
                        value={payload?.max}
                        placeholder={"Maximum withdrawal"}
                        error={errors.max}
                        disabled={!edit}
                    />
                    <TextInput
                        labelName="Withdrawal Limit"
                        type="text"
                        onChange={(e) =>
                            setPayload({ ...payload, limit: e.target.value })
                        }
                        value={payload?.limit}
                        placeholder={"Withdrawal Limit"}
                        error={errors.limit}
                        disabled={!edit}
                    />
                    <TextInput
                        labelName="Daily Withdrawal Limit (count)"
                        type="text"
                        onChange={(e) =>
                            setPayload({
                                ...payload,
                                dailyLimitCount: e.target.value,
                            })
                        }
                        value={payload?.dailyLimitCount}
                        placeholder={"Daily Withdrawal Limit"}
                        error={errors.dailyLimitCount}
                        disabled={!edit}
                    />
                </div>
                <div className="mt-3">
                    <Button2
                        name="Update Data"
                        onClick={() => handleSubmit()}
                        className={`px-5 py-3 fs-10 ${
                            edit ? "d-inline-block" : "d-none"
                        }`}
                        disabled={!edit}
                    />
                </div>
            </div>
            <hr className="border border-secondary border-2 opacity-75" />
            <div className=" mar-top">
                {/* //     <DataTable
                //     className="SSDataTable"
                //     value={banners}
                //     tableStyle={{ minWidth: "60rem" }}
                //     paginator
                //     rows={10}
                //     // rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
                //     filterDisplay="row"
                //     // globalFilter={globalFilter}
                // >
                //     <Column field="title" header="Title" />
                //     <Column field="banner" header="Banner" body={showImage} />
                //     <Column header="Status" body={statusBodyTemplate} />
                // </DataTable> */}
            </div>
        </>
    );
};

export default WithdrawalUpdate;
