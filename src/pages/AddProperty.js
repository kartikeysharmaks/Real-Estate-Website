import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  id: "",
  type: "",
  category: "",
  description: "",
  price: "",
  address: "",
  bathrooms: "",
  bedrooms: "",
  country: "",
  surface: "",
  year: "",
};

const AddProperty = () => {
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);
  const [data, setData] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    name,
    description,
    id,
    type,
    category,
    country,
    surface,
    address,
    price,
    bathrooms,
    bedrooms,
    year,
  } = data;

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);  
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    await addDoc(collection(db, "properties"),{
      ...data,
      timestamp : serverTimestamp(),
    });
    navigate("/fav")
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white my-6">
      {message?.msg && (
        <div
          className={`w-[370px] p-[15px] m-[5px] text-lg ${
            message.error ? "bg-red-500" : "bg-green-500"
          }  text-white rounded-[5px] text-center`}
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <h1 className="text-4xl my-6 text-center">
            Add Your<span className="text-purple-600"> Favourite </span>Property
            Here
          </h1>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Property Name"
              value={name}
              name="name"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Property Description"
              value={description}
              name="description"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Property ID"
              value={id}
              name="id"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Property Category"
              value={category}
              name="category"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Property Country Location"
              value={country}
              name="country"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Property Address"
              value={address}
              name="address"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Number of Bedrooms"
              value={bedrooms}
              name="bedrooms"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Number of Bathrooms"
              value={bathrooms}
              name="bathrooms"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Property Price"
              value={price}
              name="price"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Property Area"
              value={surface}
              name="surface"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <input
              type="text"
              placeholder="Property Year"
              value={year}
              name="year"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Property type"
              value={type}
              name="type"
              required
              className="outline-none border-none sm:w-[370px] p-[15px] rounded-[10px] bg-[#edf5f3] m-[5px] text-lg"
              onChange={handleChange}
            />
          </div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-5"
          />
          <button
            disabled={progress !== null && progress < 100}
            className={`${progress !== null && progress < 100 ? "bg-gray-300" : "bg-violet-700  hover:bg-violet-800"} text-white text-base px-4 py-2 rounded-lg transition my-5`}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
