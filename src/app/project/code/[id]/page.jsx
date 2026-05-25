"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../../../../components/loading";
import { Wallet } from "lucide-react";
import Cookies from "js-cookie";
import { AppData } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import useRazorpay from "../../../../components/scriptloader";

const CheckoutPage = () => {
  const razorpayLoaded = useRazorpay();
  const { id } = useParams();

  const [code, setCode] = useState(null);

  const router = useRouter();

  const {
    isAuth,
    fetchPurchasedCodes,
    loading: userLoading,
    codes,
  } = AppData();

  React.useEffect(() => {
    if (!isAuth && !userLoading) {
      router.push("/login");
    }
  }, [isAuth, router, userLoading]);

  async function fetchCode() {
    try {
      const { data } = await axios.get("/api/code/single?codeid=" + id);
      setCode(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCode();
  }, [id]);

  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    const token = Cookies.get("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `/api/code/purchase/start?token=${token}`,
      { id },
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "RS Hub Study Material", //your business name
      description: "Premium diploma study material",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `/api/code/purchase/verify?token=${token}&codeid=${id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            }
          );
          toast.success(data.message);
          setLoading(false);
          fetchPurchasedCodes();
          router.push(`/payment/success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#1a56ff",
      },
    };
    if (!razorpayLoaded) console.log("Some thing wrong with script");
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  if (!code) return <Loading />;

  if (loading) return <Loading />;

  return (
    <div className="rs-shell min-h-screen p-4 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-gray-400 text-lg">
            Get instant access to your selected study material.
          </p>
        </div>

        <div className="rs-card p-8 flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl text-white">{code.title}</h1>
          <p className="text-xl text-white">Price - ₹{code.price}</p>

          {code &&
            (codes?.some((p) => p._id === code._id) ? (
              <button
                className="px-6 py-4 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => router.push(`/purchased-items`)}
              >
                <Wallet className="w-5 h-5" />
                You Already Own This Material
              </button>
            ) : (
              <button
                className=" px-6 py-4 bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                onClick={checkoutHandler}
              >
                <Wallet className="w-5 h-5" />
                Buy Material At ₹ {code.price} only
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
