import axios from "axios";
import jwt from "jsonwebtoken";

export const getTokenId = (token: string): string | null => {
  try {
    const decodedToken: any = jwt.decode(token);
    return decodedToken?.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const fetchDataWithTokenId = async (token: string): Promise<any> => {
  const id = getTokenId(token);
  if (!id) {
    throw new Error("Invalid token");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
