import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import UserLayout from "../../Layouts/UserLayout";

const ForgotPassword = () => {
    useEffect(() => {
        window.scroll(0, 0)
    })

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!email) return toast.error("Please enter email");

        const res = await dispatch(forgotPassword(email));

        if (res.meta.requestStatus === "fulfilled") {
            setTimeout(() => {
                window.location.href = `/verify-otp?email=${email}`;
            }, 800);
        }
    };

    return (
        <UserLayout>
            <div className="flex items-center justify-center h-screen bg-gray-100">

                <div className="bg-white p-6 rounded-xl w-full max-w-md shadow">
                    <div className="text-center mb-6">
                        <a href="/" className="inline-block">
                            <img
                                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                                alt="Logo"
                                className="h-15"
                            />
                        </a>
                    </div>


                    <h2 className="text-2xl font-bold mb-5 text-center">Forgot Password</h2>

                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default ForgotPassword;
