import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import StateCon from '../../components/Context/CreateContext';

const CreateMembers = async (sendForm, setDataTransfer, reloadReq, setReloadReq, pageRoute) => {
  const ServerUrl = process.env.REACT_APP_SERVER_URL;
  try {
    console.log(sendForm);
    const res = await axios.post(
      `${ServerUrl}/infos/${pageRoute}/new`,
      sendForm,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      }
    );
    toast.success("Members Created");
    setDataTransfer(false);
    setReloadReq(!reloadReq);
    return res.data.members
  } catch (err) {
    toast.error(err.message);
    setDataTransfer(false);
  }

}

export default CreateMembers
