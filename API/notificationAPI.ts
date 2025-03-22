import axios from "axios"; 

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/v1/notification`;

export const getUserNotifications = async (uid: string): Promise<any[]> => {
    try {
        
      const response = await axios.get(`${API_URL}/noti`, {
        params: { uid },
      });
      return response.data.notifications || [];
    } catch (error) {
      console.error("Error fetching notifications from API:", error);
      throw error;
    }
  };

  export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}/markNoti`, { notificationId });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  };