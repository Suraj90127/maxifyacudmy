import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTPAndReset } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import UserLayout from "../../Layouts/UserLayout";

const VerifyAndReset = () => {
    useEffect(() => {
        window.scroll(0, 0)
    })

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const query = new URLSearchParams(window.location.search);
    const email = query.get("email");

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) return toast.error("Enter valid 6 digit OTP");

        if (password !== confirmPass)
            return toast.error("Passwords do not match");

        const res = await dispatch(
            verifyOTPAndReset({
                email,
                otp,
                newPassword: password,
            })
        );

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Password reset successfully!");

            setTimeout(() => {
                window.location.href = "/login";
            }, 800);
        }
    };

    return (
        <UserLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

                <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                    <div className="text-center mb-6">
                        <a href="/" className="inline-block">
                            <img
                                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                                alt="Logo"
                                className="h-15"
                            />
                        </a>
                    </div>


                    <h2 className="text-2xl font-bold text-center mb-5">
                        Verify OTP & Reset Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* OTP Field */}
                        <div>
                            <label className="block text-gray-600 mb-1">Enter OTP</label>
                            <input
                                type="text"
                                maxLength="6"
                                className="w-full px-3 py-2 border rounded text-center tracking-widest"
                                placeholder="------"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-gray-600 mb-1">New Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-gray-600 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Confirm password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded"
                        >
                            {loading ? "Processing..." : "Verify & Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default VerifyAndReset;
