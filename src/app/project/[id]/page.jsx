"use client";
import React, { useState, useEffect } from "react";
import { Play, Download, Clock, Wallet, BookOpen } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import Link from "next/link";
import { AppData } from "../../../context/AppContext";

const MaterialDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const router = useRouter();

  const { id } = useParams();

  const [project, setProject] = useState(null);

  async function fetchMaterial() {
    try {
      const { data } = await axios.get("/api/project/single?id=" + id);
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const { codes } = AppData();

  const [code, setCode] = useState(null);

  useEffect(() => {
    async function fetchCode() {
      try {
        const { data } = await axios.get("/api/code/single?id=" + id);
        setCode(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCode();
  }, []);

  if (!project) return <Loading />;

  return (
    <div className="rs-shell min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div
              className={`transition-all duration-1000 opacity-100 translate-y-0 `}
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-bold text-[#f59e0b]">
                  <BookOpen size={16} />
                  {project.category || "Study Material"}
                </span>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="rs-card p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg mb-4"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap gap-4 mb-6">
                {["overview", "topics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] text-white shadow-lg"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {tab.replace("-", " ")}
                  </button>
                ))}
              </div>

              <div className="rs-card p-8">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Material Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-white/5 p-4">
                        <h4 className="font-semibold text-white mb-2">
                          Best For
                        </h4>
                        <span className="text-[#f59e0b]">
                          {project.difficulty}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <h4 className="font-semibold text-white mb-2">
                          Coverage
                        </h4>
                        <span className="text-[#1a56ff]">
                          {project.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "topics" && (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Included Topics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.technology.map((topic, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-4 flex items-center gap-3"
                        >
                          <span className="text-white font-semibold">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rs-card p-8 mb-8">
                <div className="space-y-4 mb-8">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Notes
                    </Link>
                  )}
                  {code &&
                    (codes?.some((p) => p._id === code._id) ? (
                      <button
                        className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
                        onClick={() => router.push(`/purchased-items`)}
                      >
                        <Wallet className="w-5 h-5" />
                        You Already Own This Material
                      </button>
                    ) : (
                      <Link
                        href={`/project/code/${code._id}`}
                        className="w-full px-6 py-4 bg-gradient-to-r from-[#1a56ff] to-[#7c3aed] rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-5 h-5" />
                        Buy Material At ₹ {code.price} only
                      </Link>
                    ))}

                  <Link
                    href={project.url}
                    target="_blank"
                    className="w-full px-6 py-4 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Guidance Video
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailPage;
