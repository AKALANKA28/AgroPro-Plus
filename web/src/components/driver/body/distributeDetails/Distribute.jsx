import React, { useEffect, useState } from "react";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { BlobProvider } from "@react-pdf/renderer";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import DistributeForm from "./DistributeForm";
import DistributeReport from "./DistributeReport";
import "./Distribute.css";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
//import Map from "./Map"; 

axios.defaults.baseURL = "http://127.0.0.1:8070";

function Distribute() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedDistribute, setSelectedDistribute] = useState(null);
  const [filter, setFilter] = useState('Today');

  const [filteredDataList, setFilteredDataList] = useState([]); 

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Distribute/");
      setDataList(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };


  // const locations = filteredDataList.map(item => ({
  //   name: item.situated_place,
  //   lat: parseFloat(item.latitude),
  //   lng: parseFloat(item.longitude)
  // }));
  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((Distribute) => {
      const searchFields = [
        "business_name",
        "registation_no",
        "situated_place",
        "Owner_name",
        "email",
        "phone_no"
        
      ];
      return searchFields.some((field) => {
        const fieldValue = Distribute[field];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(query.toLowerCase());
        }
        // If fieldValue is not a string (like current_status), convert it to string and then check for inclusion
        return String(fieldValue).toLowerCase().includes(query.toLowerCase());
      });
    });
    setFilteredDataList(filteredList);
  };
  

  const handleRefreshClick = () => {
    getFetchData();
    
  };

  const generateExcelFile = () => {
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(dataList);
  
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Distribute Report");
  
    // Generate the Excel file
    writeFile(wb, "Distribute_report.xlsx");
  };
  
  const handleButtonClick = () => {
    getFetchData(); // Fetch the latest data if needed
    generateExcelFile();
  };
  

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (Distribute) => {
    setSelectedDistribute(Distribute);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
 
  // toast.success("Distribute Details Added");
  // handleAddModalClose();
  // getFetchData();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Distribute/delete/${id}`);
      toast.success("Successfully Deleted");
      // handleDeleteModalClose();
      getFetchData();
    } catch (err) {
      toast.error(err.message);
    }
    // try {
    //   await axios.delete(`/Distribute/delete/${id}`);
    //   toast.success("Distribute Details successfully deleted");
    //   handleEditModalClose();
    //   getFetchData();
    // } catch (err) {
    //   alert(err.message);
    // }
  };
const handleAddSubmit = async (formData) => {
  try {
    console.log("Form Data being submitted:", formData); // Log formData before the request
    
    const response = await axios.post("/Distribute/add", formData);
    
    console.log("Server response:", response); // Log the server response
    
    toast.success("Distribute Details Added");
    handleAddModalClose();
    getFetchData();
  } catch (err) {
    console.error("Error occurred:", err.message); // Log the error message
    toast.error(err.message);
  }
};

  const handleEditSubmit = async (formData) => {
    try {
      await axios.patch(`/Distribute/update/${formData._id}`, formData);
      toast.success("Distribute Details Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const [showReportModal, setShowReportModal] = useState(false);

  const handleCloseReportModal = () => setShowReportModal(false);
  const handleShowReportModal = () => setShowReportModal(true);

  return (
    <div className="main">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div class="add-item d-flex">
              <div class="card-title">
              Distribute Details<span>| {filter}</span>

                <h6>Manage Distribute</h6>
              </div>
            </div>
            <ul class="table-top-head">
            <li>
            <BlobProvider
                        document={<DistributeReport dataList={dataList} />}
                        fileName="Distribute_Report.pdf"
                      >
                        {({ url, blob }) => (
                          <div className="button-container">
                            <a href={url} target="_blank">
                              <img src={Pdf} alt="Pdf Icon" className="icon" />
                            </a>
                          </div>
                        )}
                      </BlobProvider>
      </li>
              <li>
                <div className="button-container"> 
                  <a  onClick={handleButtonClick}>
                    <img src={Excel} alt="Excel Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleRefreshClick}>
                    <img src={Refresh} alt="Refresh Icon" className="icon" />
                  </a>
                </div>
              </li>
            </ul>
            <div class="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add Distribute
              </button>
            </div>
          </div>

          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Distribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DistributeForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Distribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DistributeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedDistribute}
              />
            </Modal.Body>
          </Modal>

          <div className="table-container">
          <SearchBar onSearch={handleSearch} />
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">Business Name</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Situated Place</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredDataList.length ? (
                  filteredDataList.map((Distribute) => (
                    <tr key={Distribute._id}>
                      <td>{Distribute.business_name}</td>
                      <td>{Distribute.registation_no}</td>
                      <td>{Distribute.situated_place}</td>
                      <td>{Distribute.Owner_name}</td>
                      <td>{Distribute.email}</td>
                      <td>{Distribute.phone_no}</td>
                      
                      <td className="action">
                        <div className="buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditModalOpen(Distribute)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(Distribute._id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
      />
    </div>
  );
}

export default Distribute;
