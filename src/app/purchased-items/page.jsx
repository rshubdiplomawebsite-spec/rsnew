"use client";

import { Download, Calendar, Package, FileText } from "lucide-react";
import { AppData } from "../../context/AppContext";
import Loading from "../../components/loading";

export default function PurchasedItems() {
  const { codes } = AppData();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDownloadName = (item) => {
    const urlName = item.code?.split("?")[0]?.split("/").pop() || "";
    const extension = urlName.includes(".") ? urlName.split(".").pop() : "pdf";
    return `${item.title}.${extension}`;
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Notes download failed. Please try again.");
    }
  };

  if (!codes) return <Loading />;

  return (
    <main className="rs-shell min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
            My Notes
          </div>
          <h1 className="font-display mb-3 text-4xl font-extrabold text-white md:text-5xl">
            Purchased Study Material
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Download and access all notes, PDFs, PYQs, and study material you
            purchased from RS Hub Study Material.
          </p>
        </div>

        {codes.length === 0 ? (
          <div className="rs-card mx-auto max-w-xl px-6 py-14 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-500" />
            <h3 className="mb-2 text-xl font-bold text-white">
              No purchased notes yet
            </h3>
            <p className="text-gray-400">
              Your purchased study material will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {codes.map((item) => (
              <article
                key={item._id}
                className="rs-card p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1a56ff]/15 text-[#f59e0b]">
                    <FileText size={23} />
                  </div>
                  <div>
                    <h3 className="line-clamp-2 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Purchased on {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Material ID
                  </p>
                  <p className="break-all font-mono text-sm text-gray-300">
                    {item.projectid}
                  </p>
                </div>

                <div className="mb-5 flex items-center justify-between rounded-lg bg-white/[0.04] px-4 py-3">
                  <span className="text-sm text-gray-400">Paid Amount</span>
                  <span className="font-bold text-white">₹{item.price}</span>
                </div>

                <button
                  onClick={() => handleDownload(item.code, getDownloadName(item))}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] px-4 py-3 font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Download Notes
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
