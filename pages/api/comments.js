import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// api/comments.js
export async function getComments(productId, limit) {
  try {
    const response = await api.get(`/products/${productId}/comments`, {
      params: {
        limit: limit,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function postComment(productId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(`/products/${productId}/comments`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function patchComment(commentId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/comments/${commentId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function deleteComment(commentId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
