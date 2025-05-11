import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser :", error);
    return null;
  }
};

export const completeOnboarding = async (formState) => {
  const res = await axiosInstance.post("/auth/onboarding", formState);
  return res.data;
};

export const getUserFriends=async()=>{
const response=await axiosInstance.get("/user/friends")
return response.data
}

export const getRecommendedUsers=async()=>{
const response=await axiosInstance.get("/user")
return response.data
}

export const getOutgoingFriendReqs=async()=>{
  const response=await axiosInstance.get("/user/outgoing-friend-requests")
  return response.data
}

export const sendFriendsRequest=async(userId)=>{
  const response=await axiosInstance.post(`/user/friend-request/${userId}`)
  return response.data
}