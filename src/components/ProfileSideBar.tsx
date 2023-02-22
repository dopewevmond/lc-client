import React, { useEffect, useState, useRef } from "react";
import { selectAuthId, selectAuthToken } from "../redux/authSlice";
import { useAppSelector } from "../redux/store";
import type { IUser } from "../types";
import { axiosInstance } from "../utils/axiosInstance";
import { EditableInput } from "./EditableInput";

export const ProfileSideBar = () => {
  const id = useAppSelector(selectAuthId);
  const token = useAppSelector(selectAuthToken);
  const [loadingProfileDetails, setLoadingProfileDetails] = useState(false);
  const [username, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id == null) return;
    const fetchUserData = async () => {
      setLoadingProfileDetails(true);
      try {
        const { data } = await axiosInstance.get<IUser>(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(data.username);
        setDisplayName(data.displayName);
        setBio(data.bio);
        setAvatar(data.avatar ?? null);
      } catch (_err) {
        setError("An error occurred while fetching your user details");
      } finally {
        setLoadingProfileDetails(false);
      }
    };
    fetchUserData();
  }, [id]);
  const updateField = async (field: string, value: string) => {
    await axiosInstance.patch(
      "/users/edit-profile",
      { [field]: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  if (loadingProfileDetails) return <>Loading...</>;
  if (error) return <>{error}</>;
  if (!Boolean(username))
    return <>An error occurred while loadingProfileDetails...</>;
  return (
    <>
      <div className="p-4">
        <div className="h-48 w-48 bg-primary-700 mx-auto rounded-full mb-4"></div>

        <div className="mb-3">
          <EditableInput
            updateFieldWithAPI={updateField}
            initialFieldValue={username}
            setFieldValue={setUserName}
            fieldName="username"
            label="Username"
          />
        </div>
        <div className="mb-3">
          <EditableInput
            updateFieldWithAPI={updateField}
            initialFieldValue={displayName}
            setFieldValue={setDisplayName}
            fieldName="displayName"
            label="Display Name"
          />
        </div>
        <div className="mb-3">
          <EditableInput
            updateFieldWithAPI={updateField}
            initialFieldValue={bio}
            setFieldValue={setBio}
            fieldName="bio"
            label="Bio"
          />
        </div>
      </div>
    </>
  );
};
