"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppData } from "../../context/AppContext";
import moment from "moment";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BookOpen, LogOut, Mail, User, ArrowLeft } from "lucide-react";
import Loading from "../../components/loading";

const ProfilePage = () => {
  const router = useRouter();
  const { user, isAuth, setIsAuth, setUser, loading, codes } = AppData();

  React.useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  const handleLogout = () => {
    router.push("/login");
    Cookies.set("token", "");
    setIsAuth(false);
    setUser(null);
    toast.success("Logged out successfully");
  };

  if (!user) return <Loading />;

  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            Student Account
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            My Profile
          </h1>
        </div>

        <section className="rs-card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="border-b border-white/10 p-8 text-center lg:border-b-0 lg:border-r">
              <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#f59e0b]/30 bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] shadow-2xl">
                <span className="text-5xl font-extrabold text-white">
                  {user?.name?.slice(0, 1).toUpperCase()}
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                {user?.name || "Student"}
              </h2>
              <p className="text-sm text-gray-400">
                Member since {moment(user.createdAt).format("DD MMM YYYY")}
              </p>
              <div className="mx-auto mt-6 max-w-xs rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-gray-400">Purchased Material</p>
                <p className="mt-1 font-display text-3xl font-bold text-white">
                  {codes?.length || 0}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <User className="h-5 w-5 text-[#f59e0b]" />
                    Personal Info
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-white">
                        {user?.name || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Email</p>
                      <p className="flex items-center gap-2 break-all font-semibold text-white">
                        <Mail className="h-4 w-4 text-gray-500" />
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="mb-4 text-lg font-bold text-white">
                    Quick Actions
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => router.push("/purchased-items")}
                      className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-5 py-4 font-bold text-white transition hover:-translate-y-0.5"
                    >
                      <BookOpen className="h-5 w-5" />
                      My Notes
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 font-bold text-red-100 transition hover:-translate-y-0.5 hover:bg-red-500/20"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
