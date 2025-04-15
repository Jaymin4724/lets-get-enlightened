import React, { useContext, useEffect, useState } from "react";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faPlus,
  faSave,
  faTimes,
  faClose,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

export default function EditChallengesPage() {
  const themeContext = useContext(ThemeContext);
  const [challenges, setChallenges] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [editedChallenge, setEditedChallenge] = useState({
    name: "",
    description: "",
    image: "",
    credit_points: 0, // Initialize as 0
    duration: 0, // Initialize as 0
  });
  const [showAddTextarea, setShowAddTextarea] = useState(false);

  useEffect(() => {
    fetchChallenges();
  });

  const fetchChallenges = () => {
    axios
      .get("http://localhost:8000/api/challenges/getall")
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Challenges", error);
        showErrorMessage("Failed to fetch Challenges");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/challenges/delete/${id}`)
      .then(() => {
        setChallenges(challenges.filter((challenge) => challenge._id !== id));
        showSuccessMessage("Challenge deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete Challenge", error);
        showErrorMessage("Failed to delete Challenge");
      });
  };

  const handleEdit = (index) => {
    handleCancel(); // Cancel add if in progress
    const challenge = challenges[index];
    setEditModeIndex(index);
    setEditedChallenge({
      name: challenge.name,
      description: challenge.description,
      image: challenge.image,
      credit_points: challenge.credit_points,
      duration: challenge.duration,
    });
  };

  const handleSave = () => {
    if (
      editedChallenge.name.trim() === "" ||
      editedChallenge.description.trim() === "" ||
      editedChallenge.image.trim() === "" ||
      editedChallenge.credit_points === 0 ||
      editedChallenge.duration === 0
    ) {
      showErrorMessage("Fields should not be empty!");
      return;
    }

    if (showAddTextarea) {
      axios
        .post("http://localhost:8000/api/challenges/create", editedChallenge)
        .then(() => {
          fetchChallenges();
          showSuccessMessage("Challenge added successfully!");
        })
        .catch((error) => {
          console.error("Failed to add Challenge", error);
          showErrorMessage("Failed to add Challenge");
        });
    } else {
      axios
        .put(
          `http://localhost:8000/api/challenges/update/${challenges[editModeIndex]._id}`,
          editedChallenge
        )
        .then(() => {
          fetchChallenges();
          showSuccessMessage("Challenge edited successfully!");
        })
        .catch((error) => {
          console.error("Failed to edit Challenge", error);
          showErrorMessage("Failed to edit Challenge");
        });
    }
    handleCancel(); // Reset state
  };

  const handleCancel = () => {
    setEditedChallenge({
      name: "",
      description: "",
      image: "",
      credit_points: 0,
      duration: 0,
    });
    setEditModeIndex(null);
    setShowAddTextarea(false);
  };

  const handleAddTextarea = () => {
    setShowAddTextarea(true);
  };

  const handleAddCancel = () => {
    setShowAddTextarea(false);
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "#333",
        color: "white",
      },
    });
  };

  const showSuccessMessage = (message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "#333",
        color: "white",
      },
    });
  };

  const currentdate = new Date();
  return (
    <AdminMiddleComp>
      <h1 className={`AdminHeading ${themeContext.theme}`}>CHALLENGES</h1>
      <div className={`TableContainer ${themeContext.theme}`}>
        <table width={"100%"} className="AdminTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image URL</th>
              <th>Credit Points</th>
              <th>Duration</th>
              <th colSpan={3}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
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
                            MEDITATION CHALLENGES REPORT
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
                                  styles.ImageURL,
                                ]}
                              >
                                Image URL
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.no,
                                ]}
                              >
                                Credit Points
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.no,
                                ]}
                              >
                                Duration
                              </Text>
                            </View>
                            {challenges.map((challenge, index) => (
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
                                  {challenge.name}
                                </Text>
                                <Text style={[styles.tableCell, styles.desc]}>
                                  {challenge.description}
                                </Text>
                                <Text
                                  style={[styles.tableCell, styles.ImageURL]}
                                >
                                  {challenge.image}
                                </Text>
                                <Text style={[styles.tableCell, styles.no]}>
                                  {challenge.credit_points}
                                </Text>
                                <Text style={[styles.tableCell, styles.no]}>
                                  {challenge.duration}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="ChallengeReport.pdf"
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
                No of Challenges : <span>{challenges.length}</span>
              </td>
            </tr>

            {showAddTextarea && (
              <tr>
                <td>
                  <textarea
                    value={editedChallenge.name}
                    onChange={(e) =>
                      setEditedChallenge({
                        ...editedChallenge,
                        name: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedChallenge.description}
                    onChange={(e) =>
                      setEditedChallenge({
                        ...editedChallenge,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedChallenge.image}
                    onChange={(e) =>
                      setEditedChallenge({
                        ...editedChallenge,
                        image: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedChallenge.credit_points}
                    onChange={(e) =>
                      setEditedChallenge({
                        ...editedChallenge,
                        credit_points: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedChallenge.duration}
                    onChange={(e) =>
                      setEditedChallenge({
                        ...editedChallenge,
                        duration: Number(e.target.value),
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
            {challenges.map((challenge, index) => (
              <tr key={index}>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedChallenge.name}
                      onChange={(e) =>
                        setEditedChallenge({
                          ...editedChallenge,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    challenge.name
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedChallenge.description}
                      onChange={(e) =>
                        setEditedChallenge({
                          ...editedChallenge,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    challenge.description
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedChallenge.image}
                      onChange={(e) =>
                        setEditedChallenge({
                          ...editedChallenge,
                          image: e.target.value,
                        })
                      }
                    />
                  ) : (
                    challenge.image
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedChallenge.credit_points}
                      onChange={(e) =>
                        setEditedChallenge({
                          ...editedChallenge,
                          credit_points: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    challenge.credit_points
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedChallenge.duration}
                      onChange={(e) =>
                        setEditedChallenge({
                          ...editedChallenge,
                          duration: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    challenge.duration
                  )}
                </td>
                <td>
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
                      icon={faTrashCan}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleDelete(challenge._id)}
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
    width: "50px",
    height: "50px",
  },
  titleheading: {
    fontSize: 20,
  },
  titlesubheading: {
    fontSize: 10,
  },
  heading: {
    fontSize: 20,
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
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
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
    width: "8%",
  },
  name: {
    width: "16%",
  },
  desc: { width: "35%" },
  ImageURL: {
    width: "25%",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
