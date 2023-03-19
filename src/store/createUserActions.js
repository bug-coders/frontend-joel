import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
import { login } from '../components/auth/service';

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ name, password, rememberMe }, { rejectWithValue }) => {
    try {
      const token = await login({ name, password, rememberMe });

      return token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await client.post(`/register`, { name, email, password }, config);
      const rememberMe = true;
      const token = await login({ email, password, rememberMe });
      return token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
