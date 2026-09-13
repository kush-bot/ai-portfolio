import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async()=>{  
        window.location.href = 'http://localhost:4000/auth/google';
        console.log("called");
    }
)