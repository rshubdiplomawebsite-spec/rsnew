"use client";

import axios from "axios";
import Cookies from "js-cookie";
import {
  BookOpen,
  IndianRupee,
  PackageCheck,
  Pencil,
  Plus,
  ReceiptText,
  Save,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import { AppData } from "../../context/AppContext";

const emptyMaterialForm = {
  title: "",
  description: "",
  image: "",
  technology: "",
  category: "",
  url: "",
  github: "",
  difficulty: "",
  duration: "",
  isFree: false,
};

const emptyPaidForm = {
  projectid: "",
  title: "",
  price: "",
  code: "",
};

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function inputClass() {
  return "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#1a56ff]/60";
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuth, loading } = AppData();
  const [activeTab, setActiveTab] = useState("materials");
  const [dashboard, setDashboard] = useState(null);
  const [saving, setSaving] = useState(false);
  const [materialForm, setMaterialForm] = useState(emptyMaterialForm);
  const [paidForm, setPaidForm] = useState(emptyPaidForm);
  const [editingMaterialId, setEditingMaterialId] = useState("");
  const [editingPaidId, setEditingPaidId] = useState("");

  const isAdmin = user?.role === "admin";

  const codesByProject = useMemo(() => {
    const map = new Map();
    dashboard?.codes?.forEach((item) => {
      map.set(String(item.projectid), item);
    });
    return map;
  }, [dashboard]);

  async function fetchDashboard() {
    const token = Cookies.get("token");
    const { data } = await axios.get(`/api/admin/dashboard?token=${token}`);
    setDashboard(data);
  }

  useEffect(() => {
    if (!loading && (!isAuth || !isAdmin)) {
      return;
    }

    if (isAdmin) {
      fetchDashboard().catch((error) => {
        toast.error(error.response?.data?.message || "Unable to load dashboard");
      });
    }
  }, [loading, isAuth, isAdmin]);

  const setMaterialField = (field, value) => {
    setMaterialForm((prev) => ({ ...prev, [field]: value }));
  };

  const setPaidField = (field, value) => {
    setPaidForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetMaterialForm = () => {
    setMaterialForm(emptyMaterialForm);
    setEditingMaterialId("");
  };

  const resetPaidForm = () => {
    setPaidForm(emptyPaidForm);
    setEditingPaidId("");
  };

  const submitMaterial = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const token = Cookies.get("token");
      const payload = {
        ...materialForm,
        technology: materialForm.technology
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingMaterialId) {
        await axios.put(`/api/project/edit?token=${token}`, {
          id: editingMaterialId,
          ...payload,
        });
        toast.success("Study material updated");
      } else {
        await axios.post(`/api/project/new?token=${token}`, payload);
        toast.success("Study material added");
      }

      resetMaterialForm();
      await fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save material");
    } finally {
      setSaving(false);
    }
  };

  const submitPaidMaterial = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const token = Cookies.get("token");
      const payload = {
        ...paidForm,
        price: Number(paidForm.price),
      };

      if (editingPaidId) {
        await axios.put(`/api/code/edit?token=${token}`, {
          id: editingPaidId,
          ...payload,
        });
        toast.success("Paid material updated");
      } else {
        await axios.post(`/api/code/new?token=${token}`, payload);
        toast.success("Paid material added");
      }

      resetPaidForm();
      await fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save paid material");
    } finally {
      setSaving(false);
    }
  };

  const editMaterial = (material) => {
    setEditingMaterialId(material._id);
    setMaterialForm({
      title: material.title || "",
      description: material.description || "",
      image: material.image || "",
      technology: material.technology?.join(", ") || "",
      category: material.category || "",
      url: material.url || "",
      github: material.github || "",
      difficulty: material.difficulty || "",
      duration: material.duration || "",
      isFree: Boolean(material.isFree),
    });
    setActiveTab("materials");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editPaidMaterial = (item) => {
    setEditingPaidId(item._id);
    setPaidForm({
      projectid: item.projectid || "",
      title: item.title || "",
      price: item.price || "",
      code: item.code || "",
    });
    setActiveTab("materials");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;

  if (!isAuth || !isAdmin) {
    return (
      <main className="rs-shell flex min-h-screen items-center justify-center px-5 pt-20">
        <section className="rs-card max-w-lg p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 h-14 w-14 text-[#f59e0b]" />
          <h1 className="mb-3 font-display text-3xl font-extrabold text-white">
            Admin Access Only
          </h1>
          <p className="mb-6 text-gray-400">
            You need an admin account to manage study material, users, orders,
            and sales.
          </p>
          <button
            onClick={() => router.push(isAuth ? "/" : "/login")}
            className="rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-6 py-3 font-bold text-white"
          >
            {isAuth ? "Back to Home" : "Student Login"}
          </button>
        </section>
      </main>
    );
  }

  if (!dashboard) return <Loading />;

  const statCards = [
    {
      label: "Total Sales",
      value: `₹${dashboard.stats.totalSales}`,
      icon: IndianRupee,
    },
    {
      label: "Orders",
      value: dashboard.stats.totalOrders,
      icon: ReceiptText,
    },
    {
      label: "Users",
      value: dashboard.stats.totalUsers,
      icon: Users,
    },
    {
      label: "Materials",
      value: dashboard.stats.totalMaterials,
      icon: BookOpen,
    },
  ];

  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
              Admin Dashboard
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
              Manage Study Material
            </h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              Add, edit, and review material, purchases, users, and sales from
              one place.
            </p>
          </div>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rs-card p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a56ff]/15 text-[#f59e0b]">
                  <Icon size={22} />
                </div>
                <p className="text-sm text-gray-400">{card.label}</p>
                <p className="mt-1 font-display text-3xl font-bold text-white">
                  {card.value}
                </p>
              </div>
            );
          })}
        </section>

        <div className="mb-6 flex flex-wrap gap-3">
          {[
            ["materials", "Materials"],
            ["orders", "Orders"],
            ["users", "Users"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`rounded-lg px-5 py-3 font-bold transition ${
                activeTab === id
                  ? "bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] text-white"
                  : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "materials" && (
          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <form onSubmit={submitMaterial} className="rs-card p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {editingMaterialId ? "Edit Material" : "Add Material"}
                  </h2>
                  {editingMaterialId && (
                    <button
                      type="button"
                      onClick={resetMaterialForm}
                      className="text-sm font-semibold text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid gap-3">
                  <input
                    className={inputClass()}
                    placeholder="Title"
                    value={materialForm.title}
                    onChange={(e) => setMaterialField("title", e.target.value)}
                    required
                  />
                  <textarea
                    className={`${inputClass()} min-h-28 resize-y`}
                    placeholder="Description"
                    value={materialForm.description}
                    onChange={(e) => setMaterialField("description", e.target.value)}
                    required
                  />
                  <input
                    className={inputClass()}
                    placeholder="Image URL"
                    value={materialForm.image}
                    onChange={(e) => setMaterialField("image", e.target.value)}
                    required
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      className={inputClass()}
                      placeholder="Category"
                      value={materialForm.category}
                      onChange={(e) => setMaterialField("category", e.target.value)}
                    />
                    <input
                      className={inputClass()}
                      placeholder="Best for"
                      value={materialForm.difficulty}
                      onChange={(e) => setMaterialField("difficulty", e.target.value)}
                    />
                  </div>
                  <input
                    className={inputClass()}
                    placeholder="Topics, subjects, chapters"
                    value={materialForm.technology}
                    onChange={(e) => setMaterialField("technology", e.target.value)}
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      className={inputClass()}
                      placeholder="Coverage"
                      value={materialForm.duration}
                      onChange={(e) => setMaterialField("duration", e.target.value)}
                    />
                    <input
                      className={inputClass()}
                      placeholder="Video URL"
                      value={materialForm.url}
                      onChange={(e) => setMaterialField("url", e.target.value)}
                    />
                  </div>
                  <input
                    className={inputClass()}
                    placeholder="Free download URL"
                    value={materialForm.github}
                    onChange={(e) => setMaterialField("github", e.target.value)}
                  />
                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white">
                    <input
                      type="checkbox"
                      checked={materialForm.isFree}
                      onChange={(e) => setMaterialField("isFree", e.target.checked)}
                      className="h-4 w-4 accent-[#1a56ff]"
                    />
                    Free material
                  </label>
                  <button
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-5 py-3 font-bold text-white disabled:opacity-60"
                  >
                    {editingMaterialId ? <Save size={18} /> : <Plus size={18} />}
                    {editingMaterialId ? "Update Material" : "Add Material"}
                  </button>
                </div>
              </form>

              <form onSubmit={submitPaidMaterial} className="rs-card p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {editingPaidId ? "Edit Paid File" : "Add Paid File"}
                  </h2>
                  {editingPaidId && (
                    <button
                      type="button"
                      onClick={resetPaidForm}
                      className="text-sm font-semibold text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                <div className="grid gap-3">
                  <select
                    className={inputClass()}
                    value={paidForm.projectid}
                    onChange={(e) => setPaidField("projectid", e.target.value)}
                    required
                  >
                    <option value="" className="bg-[#050510]">
                      Select material
                    </option>
                    {dashboard.projects.map((project) => (
                      <option key={project._id} value={project._id} className="bg-[#050510]">
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputClass()}
                    placeholder="Paid file title"
                    value={paidForm.title}
                    onChange={(e) => setPaidField("title", e.target.value)}
                    required
                  />
                  <input
                    className={inputClass()}
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={paidForm.price}
                    onChange={(e) => setPaidField("price", e.target.value)}
                    required
                  />
                  <input
                    className={inputClass()}
                    placeholder="Download file URL"
                    value={paidForm.code}
                    onChange={(e) => setPaidField("code", e.target.value)}
                    required
                  />
                  <button
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-5 py-3 font-bold text-white disabled:opacity-60"
                  >
                    {editingPaidId ? <Save size={18} /> : <PackageCheck size={18} />}
                    {editingPaidId ? "Update Paid File" : "Add Paid File"}
                  </button>
                </div>
              </form>
            </div>

            <div className="rs-card overflow-hidden">
              <div className="border-b border-white/10 p-5">
                <h2 className="font-display text-2xl font-bold text-white">
                  All Study Material
                </h2>
              </div>
              <div className="divide-y divide-white/10">
                {dashboard.projects.map((material) => {
                  const paid = codesByProject.get(String(material._id));
                  return (
                    <article key={material._id} className="p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#f59e0b]">
                            {material.category || "Study Material"}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-white">
                            {material.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-400">
                            {material.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(material.technology || []).slice(0, 4).map((topic) => (
                              <span
                                key={topic}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-sm text-gray-400">
                            {material.isFree ? "Free" : "Paid"} material
                            {paid ? ` | ₹${paid.price}` : ""}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => editMaterial(material)}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>
                          {paid && (
                            <button
                              onClick={() => editPaidMaterial(paid)}
                              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
                            >
                              <IndianRupee size={16} />
                              Price
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="rs-card overflow-hidden">
            <div className="border-b border-white/10 p-5">
              <h2 className="font-display text-2xl font-bold text-white">
                Order Details
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Transaction</th>
                    <th className="px-5 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {dashboard.orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">
                          {order.userDetails?.name || "Unknown"}
                        </p>
                        <p className="text-gray-400">{order.userDetails?.email || "-"}</p>
                      </td>
                      <td className="px-5 py-4 text-white">
                        {order.materialDetails?.title || order.paidMaterial?.title || "-"}
                      </td>
                      <td className="px-5 py-4 font-bold text-white">
                        ₹{order.paidMaterial?.price || 0}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-gray-300">
                        {order.transectionid}
                      </td>
                      <td className="px-5 py-4 text-gray-300">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "users" && (
          <section className="rs-card overflow-hidden">
            <div className="border-b border-white/10 p-5">
              <h2 className="font-display text-2xl font-bold text-white">
                Users Data
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="px-5 py-4">User</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {dashboard.users.map((item) => (
                    <tr key={item._id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className="font-semibold text-white">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-300">{item.email}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white">
                          {item.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-300">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
