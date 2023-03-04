import { axiosInstance } from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { IUser } from "../types";
import { selectAuthToken } from "../redux/authSlice";
import { useAppSelector } from "../redux/store";

export const useSearchForUser = () => {
  const [searchResults, setSearchResults] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector(selectAuthToken);
  const resetResults = () => {
    setSearchResults(null);
  };

  const makeAPICall = async (query: string) => {
    if (query === "") {
      setSearchResults(null);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post<IUser[]>(
        "/search/users",
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResults(data);
    } catch (err) {
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, makeAPICall, resetResults, loading };
};
