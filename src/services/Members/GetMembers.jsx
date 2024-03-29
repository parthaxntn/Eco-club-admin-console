import axios from 'axios';
import { toast } from 'react-toastify';

const GetMembers = async (session, pageRoute) => {
  const ServerUrl = process.env.REACT_APP_SERVER_URL;

  try {
    const res = await axios.get(
      `${ServerUrl}/infos/${pageRoute}`
    );
    return (res.data);
  } catch (err) {
    // console.log(err);
    toast.error(err.message);
  }
}

export default GetMembers
