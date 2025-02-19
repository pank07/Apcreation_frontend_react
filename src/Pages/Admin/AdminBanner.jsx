import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../UrlHelper/baseUrl";

function AdminBanner({ onImagesUploaded }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([null, null, null]);
  const { loading } = useSelector((state) => state.allUsers);
  const handleFileChange = (index, event) => {
    const files = [...images];
    files[index] = event.target.files[0];
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    // Create FormData object and append images
    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image); // Adjust index to start from 1
      }
    });

    try {
      // POST request to upload images

      const response = await axios.post(`${baseUrl}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      toast.success("Banner Created Successfully");
      if(response){

        navigate("/admin/banner");
      }
      // Pass uploaded images URLs to parent component
      onImagesUploaded(response.data.images);

      // Reset file inputs
      setImages([null, null, null]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  //fetch image
  const [imag, setImag] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get(`${baseUrl}/banner`);
      
        setImag(...imag,response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  // delete banner
  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`${baseUrl}/banner/${imageId}`);
      toast.error("Banner delete Successfully");
      setImag(imag.filter((image) => image._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
         
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form
                  onSubmit={handleSubmit}
                  className="bg-light p-4 rounded shadow-sm"
                >
                  <h4 className="mb-3 text-center">Upload Banners</h4>

                  <div className="mb-3">
                    {/* File input for each image */}
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => handleFileChange(0, e)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info w-100"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imag.map((image, index) => (
                      <tr key={image._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={image.image1}
                            alt={`Image ${index}`}
                            style={{ width: "100px", height: "70px" }}
                          />
                        </td>
                        <td>
                          <Button style={{backgroundColor:"red"}} onClick={() => handleDelete(image._id)}>
                            <FaTrash /> 
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminBanner;
