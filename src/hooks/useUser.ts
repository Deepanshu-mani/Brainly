import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { showToast } from '../utils/toast';

export interface User {
  id: string;
  username: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: token
        }
      });

      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      // If token is invalid, remove it
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const logoutToast = showToast.loading('Logging out...');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${BACKEND_URL}/user/logout`, {}, {
          headers: {
            Authorization: token
          }
        });
      }
      showToast.dismiss(logoutToast);
      showToast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error during logout:', error);
      showToast.dismiss(logoutToast);
      showToast.error('Error during logout, but you have been signed out.');
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/signin';
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, logout, refetch: fetchUser };
}
