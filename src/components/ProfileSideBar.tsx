import React, { useEffect } from "react";
import { selectAuthId, selectAuthToken } from "../redux/authSlice";
import {
  fetchUserData,
  selectBio,
  selectDisplayName,
  selectError,
  selectLoadingProfileDetails,
  selectUsername,
  setUsername,
} from "../redux/profileSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { axiosInstance } from "../utils/axiosInstance";
import { EditableInput } from "./EditableInput";

export const ProfileSideBar = () => {
  const id = useAppSelector(selectAuthId);
  const token = useAppSelector(selectAuthToken);
  const loadingProfileDetails = useAppSelector(selectLoadingProfileDetails);
  const username = useAppSelector(selectUsername);
  const displayName = useAppSelector(selectDisplayName);
  const bio = useAppSelector(selectBio);
  const error = useAppSelector(selectError);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id == null || token == null) return;
    dispatch(fetchUserData({ token, id }));
  }, [id, token]);

  const updateField = async (field: string, value: string) => {
    await axiosInstance.patch(
      "/users/edit-profile",
      { [field]: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const setUserName: any = (username: string) =>
    dispatch(setUsername(username));
  const setDisplayName: any = (displayName: string) =>
    dispatch(setDisplayName(displayName));
  const setBio: any = (bio: string) => dispatch(setBio(bio));

  if (loadingProfileDetails) return <>Loading...</>;
  if (error) return <>{error}</>;
  if (!Boolean(username))
    return (
      <div className="p-4">
        An error occurred while loading profile details...
      </div>
    );
  return (
    <>
      <div className="p-4">
        <div className="h-48 w-48 bg-primary-700 mx-auto rounded-full mb-4"></div>

        <div className={""}>
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
      </div>
    </>
  );
};
