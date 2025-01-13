import axiosInstance from "./APILayerConfig";
import { ContactedUsers } from "@/components/custom/MainLayout";


export const MessageAPI = {
  getallusrsfor_a_user: async (token: string): Promise<ContactedUsers[]> => {    
    const response = await axiosInstance.request({
      method: "GET",
      url: "user/contacts",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    
    return response.data.contacts;
  },

 
};