import { FETCH_ACCOUNT, FETCH_BALANCE, FETCH_USER, FETCH_CONTRACT} from "./types";
import { fetchAccount, connectAccount, disconnect, fetchBalance, connectForBalance, fetchContract } from "../web3Connections";
import axios from 'axios';

//fetch data here, if fetch from server-side, use axios
export const getAccount = () => async (dispatch) => {
  const account = await fetchAccount();
  try {
    dispatch({
        type: FETCH_ACCOUNT,
        payload: account,
    });
  } catch (err) {
      console.log(err)
  }
};

export const grabAccount = () => async (dispatch) => {
  const account = await connectAccount();
  try {
    dispatch({
        type: FETCH_ACCOUNT,
        payload: account,
    });
  } catch (err) {
      console.log(err)
  }
};

export const disconnectAccount = () => async (dispatch) => {
  const account = await disconnect();
  try {
    dispatch({
      type: FETCH_ACCOUNT,
      payload: account,
    });
  } catch (err) {
      console.log(err)
  }
}

export const getBalance = () => async (dispatch) => {
  const balance = await fetchBalance();
  try {
    dispatch({
      type: FETCH_BALANCE,
      payload: balance,
    });
  } catch (err) {
      console.log(err)
  }
};

export const grabBalance = () => async (dispatch) => {
  const balance = await connectForBalance();
  try {
    dispatch({
      type: FETCH_BALANCE,
      payload: balance,
    });
  } catch (err) {
      console.log(err)
  }
};

export const fetchMintpassContract = () => async (dispatch) => {
  const contract = await fetchContract();
  try {
    dispatch({
      type: FETCH_CONTRACT,
      payload: contract,
    });
  } catch (err) {
      console.log(err)
  }
}
// export const fetchUser = () => async (dispatch) => {
//   const account = await fetchAccount();
//   const res = await axios.get('/api/users/', { 
//     params:
//     { 
//       account
//     }
//   })
//   // console.log(res.data)
//   try {
//     dispatch({
//       type: FETCH_USER,
//       payload: res.data.users
//     });
//   } catch (err) {
//       console.log(err)
//   }
// };

export const postUser = () => async (dispatch) => {
  const account = await fetchAccount();
  const res = await axios.post('/api/users/', { 
    wallet: account
  })
    try {
      dispatch({
        type: FETCH_USER,
        payload: res.data
      });
    } catch (err) {
        console.log(err)
    }
}
