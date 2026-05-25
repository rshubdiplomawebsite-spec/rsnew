"use client";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/me?token=" + Cookies.get("token"));

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  const [projects, setProjects] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [latest, setLatest] = useState(null);

  async function fetchProjects() {
    try {
      const { data } = await axios.get(
        `/api/project/all?search=${search}&category=${category}&page=${page}`
      );
      setProjects(data.projects);
      setTotalPages(data.totalPages);
      setLatest(data.latest);
    } catch (error) {
      console.log(error);
    }
  }

  const [codes, setCodes] = useState(null);

  async function fetchPurchasedCodes() {
    try {
      const { data } = await axios.get(
        `/api/code/purchase/mypurchase?token=${Cookies.get("token")}`
      );

      setCodes(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPurchasedCodes();
  }, []);
  useEffect(() => {
    fetchProjects();
  }, [search, category, page]);
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        isAuth,
        setIsAuth,
        setUser,
        projects,
        search,
        category,
        page,
        setPage,
        setSearch,
        setCategory,
        totalPages,
        codes,
        fetchPurchasedCodes,
        latest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppData = () => useContext(AppContext);
