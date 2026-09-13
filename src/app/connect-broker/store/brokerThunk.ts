  import { createAsyncThunk } from "@reduxjs/toolkit";


  export const ConnectToBroker = createAsyncThunk<void, string>(
    "broker/connectToBroker",
    async (endpoint) => {
      let base = 'http://localhost:4000'
      window.location.href = base+endpoint;
    }
  );