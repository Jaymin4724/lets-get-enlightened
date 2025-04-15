import React, { useContext, useEffect, useState } from "react";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashAlt,
  faPlus,
  faSave,
  faTimes,
  faClose,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

export default function EditMeditationTypesPage() {
  const themeContext = useContext(ThemeContext);
  const [meditationTypes, setMeditationTypes] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    description: "",
    instructions: "",
    audio_resource: "",
    video_resource: "",
  });
  const [showAddTextarea, setShowAddTextarea] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    instructions: "",
    audio_resource: "",
    video_resource: "",
  });

  useEffect(() => {
    fetchMeditationTypes();
  });

  const fetchMeditationTypes = () => {
    axios
      .get("http://localhost:8000/api/meditation-types/getall")
      .then((response) => {
        setMeditationTypes(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Meditation Types", error);
        showErrorMessage("Failed to fetch Meditation Types");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/meditation-types/delete/${id}`)
      .then(() => {
        setMeditationTypes(meditationTypes.filter((mtype) => mtype._id !== id));
        showSuccessMessage("Meditation Type deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete Meditation Type", error);
        showErrorMessage("Failed to delete Meditation Type");
      });
  };

  const handleEdit = (index) => {
    handleAddCancel();
    const mtype = meditationTypes[index];
    setEditModeIndex(index);
    setEditedData({ ...mtype });
  };

  const handleSave = () => {
    if (isFormIncomplete()) {
      showErrorMessage("Fields should not be empty!");
      return;
    }

    if (showAddTextarea) {
      addNewMeditationType();
    } else {
      editExistingMeditationType();
    }
    handleCancel();
  };

  const handleCancel = () => {
    clearEditedData();
    clearAddFormData();
    handleAddCancel();
    setEditModeIndex(null);
  };

  const handleAddTextarea = () => {
    setShowAddTextarea(true);
  };

  const handleAddCancel = () => {
    setShowAddTextarea(false);
  };

  const isFormIncomplete = () => {
    return (
      (showAddTextarea &&
        (addFormData.name.trim() === "" ||
          addFormData.description.trim() === "" ||
          addFormData.instructions.trim() === "" ||
          addFormData.audio_resource.trim() === "" ||
          addFormData.video_resource.trim() === "")) ||
      (!showAddTextarea &&
        (editedData.name.trim() === "" ||
          editedData.description.trim() === "" ||
          editedData.instructions.trim() === "" ||
          editedData.audio_resource.trim() === "" ||
          editedData.video_resource.trim() === ""))
    );
  };

  const addNewMeditationType = () => {
    console.log(addFormData);
    axios
      .post("http://localhost:8000/api/meditation-types/create", addFormData)
      .then(() => {
        fetchMeditationTypes();
        clearAddFormData(); // Clear the form after adding
        showSuccessMessage("Meditation Type added successfully!");
      })
      .catch((error) => {
        // console.error("Failed to add Meditation Type", error);
        showErrorMessage("Failed to add Meditation Type");
      });
  };

  const editExistingMeditationType = () => {
    axios
      .put(
        `http://localhost:8000/api/meditation-types/update/${editedData._id}`,
        editedData
      )
      .then(() => {
        fetchMeditationTypes();
        showSuccessMessage("Meditation Type edited successfully!");
      })
      .catch((error) => {
        console.error("Failed to edit Meditation Type", error);
        showErrorMessage("Failed to edit Meditation Type");
      });
  };

  const clearEditedData = () => {
    setEditedData({
      name: "",
      description: "",
      instructions: "",
      audio_resource: "",
      video_resource: "",
    });
  };

  const clearAddFormData = () => {
    setAddFormData({
      name: "",
      description: "",
      instructions: "",
      audio_resource: "",
      video_resource: "",
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, toastConfig);
  };

  const showSuccessMessage = (message) => {
    toast.success(message, toastConfig);
  };

  const toastConfig = {
    duration: 3000,
    position: "top-center",
    style: {
      backgroundColor: "#333",
      color: "white",
    },
  };

  const currentdate = new Date();
  return (
    <AdminMiddleComp>
      <h1 className={`AdminHeading ${themeContext.theme}`}>MEDITATION TYPES</h1>
      <div className={`TableContainer ${themeContext.theme}`}>
        <table width={"100%"} className="AdminTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Instructions</th>
              <th>Image URL</th>
              <th>Video URL</th>
              <th colSpan={3}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <PDFDownloadLink //main apna pdf lib
                    document={
                      //structure of the pdf jisme multiple pages we can add
                      <Document>
                        {/* page have diff comps view,text and image */}
                        <Page style={styles.page}>
                          {/* view is just like <div>*/}
                          <View style={styles.horizontalLine} />
                          <view style={styles.title}>
                            <view>
                              <Image
                                style={styles.image}
                                src="https://i.ibb.co/G9M3VPt/logo-Black.png"
                              />
                            </view>
                            <view>
                              <Text style={styles.titleheading}>
                                Let's Get Enlightened
                              </Text>
                              <Text style={styles.titlesubheading}>
                                Meditate, Elevate, Rediate
                              </Text>
                            </view>
                          </view>
                          <View style={styles.horizontalLine} />
                          <view style={styles.date}>
                            <Text>{currentdate.toLocaleTimeString()}</Text>
                            <Text>{currentdate.toDateString()}</Text>
                          </view>
                          {/* text ofc used to display text */}
                          <Text style={styles.heading}>
                            MEDITATION TYPES REPORT
                          </Text>
                          <View style={styles.table}>
                            <View style={styles.tableRow}>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.no,
                                ]}
                              >
                                No.
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.name,
                                ]}
                              >
                                Name
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.desc,
                                ]}
                              >
                                Description
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.instructions,
                                ]}
                              >
                                Instructions
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.audio_resource,
                                ]}
                              >
                                Image URL
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.video_resource,
                                ]}
                              >
                                Video URL
                              </Text>
                            </View>
                            {meditationTypes.map((mtype, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  index % 2 === 0
                                    ? styles.evenRow
                                    : styles.oddRow,
                                ]}
                              >
                                <Text style={[styles.tableCell, styles.no]}>
                                  {index + 1}
                                </Text>
                                <Text style={[styles.tableCell, styles.name]}>
                                  {mtype.name}
                                </Text>
                                <Text style={[styles.tableCell, styles.desc]}>
                                  {mtype.description}
                                </Text>
                                <Text
                                  style={[
                                    styles.tableCell,
                                    styles.instructions,
                                  ]}
                                >
                                  {mtype.instructions}
                                </Text>
                                <Text
                                  style={[
                                    styles.tableCell,
                                    styles.audio_resource,
                                  ]}
                                >
                                  {mtype.audio_resource}
                                </Text>
                                <Text
                                  style={[
                                    styles.tableCell,
                                    styles.video_resource,
                                  ]}
                                >
                                  {mtype.video_resource}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="MeditationTypes.pdf"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className={`DownloadIcon ${themeContext.theme}`}
                      title="Export PDF"
                    />
                  </PDFDownloadLink>

                  <button className={`TableAddButton ${themeContext.theme}`}>
                    {editModeIndex !== null || showAddTextarea ? (
                      <FontAwesomeIcon
                        icon={faClose}
                        className="AddIcon"
                        onClick={handleCancel}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="AddIcon"
                        onClick={handleAddTextarea}
                      />
                    )}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={7}
                style={{ textAlign: "right", padding: "10px 20px" }}
              >
                No of Meditation Types : <span>{meditationTypes.length}</span>
              </td>
            </tr>

            {showAddTextarea && (
              <tr>
                <td>
                  <textarea
                    value={addFormData.name}
                    onChange={(e) =>
                      setAddFormData({ ...addFormData, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={addFormData.description}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={addFormData.instructions}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        instructions: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={addFormData.audio_resource}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        audio_resource: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={addFormData.video_resource}
                    onChange={(e) =>
                      setAddFormData({
                        ...addFormData,
                        video_resource: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faSave}
                    className={`EditDeleteIcon ${themeContext.theme}`}
                    onClick={handleSave}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`EditDeleteIcon ${themeContext.theme}`}
                    onClick={handleAddCancel}
                  />
                </td>
              </tr>
            )}
            {meditationTypes.map((mtype, index) => (
              <tr key={index}>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                    />
                  ) : (
                    mtype.name
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.description}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    mtype.description
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.instructions}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          instructions: e.target.value,
                        })
                      }
                    />
                  ) : (
                    mtype.instructions
                  )}
                </td>
                <td style={{ wordBreak: "break-all" }}>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.audio_resource}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          audio_resource: e.target.value,
                        })
                      }
                    />
                  ) : (
                    mtype.audio_resource
                  )}
                </td>
                <td style={{ wordBreak: "break-all" }}>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.video_resource}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          video_resource: e.target.value,
                        })
                      }
                    />
                  ) : (
                    mtype.video_resource
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {editModeIndex === index ? (
                    <FontAwesomeIcon
                      icon={faSave}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={handleSave}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleEdit(index)}
                    />
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={handleCancel}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleDelete(mtype._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminMiddleComp>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 8,
    display: "flex",
    flexDirection: "row-reverse",
    gap: "2px",
    margin: "2px",
  },
  page: {
    padding: 20,
    backgroundColor: "white",
    color: "black",
  },
  title: {
    alignSelf: "flex-start",
    padding: "5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
  },
  image: {
    width: "45px",
    height: "45px",
  },
  titleheading: {
    fontSize: 18,
  },
  titlesubheading: {
    fontSize: 8,
  },
  heading: {
    fontSize: 18,
    margin: "25 10 5 10",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid black",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    width: "100%",
  },
  tableCell: {
    padding: 5,
    fontSize: 8,
  },
  headerCell: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
  },
  oddRow: {
    color: "white",
    backgroundColor: "#333",
  },
  evenRow: {
    color: "#333",
    backgroundColor: "whitesmoke",
  },
  no: {
    textAlign: "center",
    width: "5%",
  },
  name: {
    width: "10%",
  },
  desc: {
    width: "10%",
  },
  instructions: {
    width: "30%",
  },
  audio_resource: {
    width: "25%",
  },
  video_resource: { width: "20%" },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
