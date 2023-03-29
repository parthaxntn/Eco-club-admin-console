import React, { useContext, useState } from "react";
import CreateMembers from "../services/Members/CreateMembers";
import Loader from "../components/loader";
import StateCon from "./Context/CreateContext";

const MemberCreate = ({ addMember, setAddMember, reloadReq, setReloadReq }) => {
  const [name, setName] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState();
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [dataTransfer, setDataTransfer] = useState(false);
  const {pageRoute} = useContext(StateCon)

  function handleSubmit(e) {
    const sendForm = new FormData();
    sendForm.set("name", name);
    sendForm.set("subtitle", subTitle);
    sendForm.set("designation", designation);
    sendForm.set("desc", role);
    sendForm.set("avatar", image);
    setDataTransfer(true);
    const members = CreateMembers(
      sendForm,
      setDataTransfer,
      reloadReq,
      setReloadReq,
      pageRoute
    );
  }

  return (
    <div className="createPage">
      {dataTransfer && (
        <div className="dataTransfer">
          <Loader />
        </div>
      )}
      <p className="btn close" onClick={() => setAddMember(!addMember)}>
        X
      </p>
      <label htmlFor="name">Title/Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        accept="image"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="subtitle">SubTitle</label>
      <input
        type="text"
        name="subtitle"
        id="name"
        value={subTitle}
        accept="image"
        onChange={(e) => setSubTitle(e.target.value)}
      />
      <label htmlFor="image">Picture</label>
      <input
        type="file"
        name="image"
        id="image"
        title="Uploaded Image"
        onChange={(e) => {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          console.log({ reader });
          reader.addEventListener("load", (e) => {
            const image = document.querySelector(".imageUpload");
            image.attributes.src.value = e.target.result;
          });
          setImage(e.target.files[0]);
        }}
      />
      <label htmlFor="role">Desc</label>
      <textarea
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <label htmlFor="session">Designation</label>
      <input
        type="text"
        name="designation"
        id="session"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <img className="imageUpload" src="" alt="" />
      <button className="btn" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default MemberCreate;
