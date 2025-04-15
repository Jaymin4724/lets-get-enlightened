import { React, useContext, useState, useEffect } from "react";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
import axios from "axios";
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
import "../../adminpage/TableView.css";
import toast from "react-hot-toast";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const EditAffirmationsPage = () => {
  const themeContext = useContext(ThemeContext);
  const [affirmations, setAffirmations] = useState([]);

  const [isNew, SetIsNew] = useState(false);
  const [newAffirmationText, setNewAffirmationText] = useState("");

  const [editIndex, setEditIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");

  async function fetchAffirmations() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/affirmations/getall"
      );
      setAffirmations(response.data);
    } catch (error) {
      console.error("Error fetching affirmations:", error);
    }
  }

  useEffect(() => {
    fetchAffirmations();
  }, []);

  function handleAddAffirmation() {
    SetIsNew(true);
    const newAffirmations = [...affirmations];
    const newAffirmation = { text: newAffirmationText };
    newAffirmations.unshift(newAffirmation);
    setAffirmations(newAffirmations);
    setEditIndex(0);
    setEditedText("");
    setNewAffirmationText(""); // Clear the newAffirmationText state
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditedText(affirmations[index].text);
  }

  function handleSave(index) {
    if (editedText.trim() === "") {
      toast.error("Affirmation text can't be empty!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }
    const updatedAffirmations = [...affirmations];
    if (isNew) {
      const newAffirmation = { text: editedText };
      updatedAffirmations.unshift(newAffirmation);
      setAffirmations(updatedAffirmations);
      setEditIndex(0);
      setEditedText("");
      setNewAffirmationText("");

      // Send a POST request to save the new affirmation to the database
      axios
        .post("http://localhost:8000/api/affirmations/create", newAffirmation)
        .then((response) => {
          toast.success("Affirmation added successfully!", {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "white",
            },
          });
          fetchAffirmations();
          handleCancel();
        })
        .catch((error) => {
          console.error("Error adding affirmation:", error);
        });
    } else {
      updatedAffirmations[index].text = editedText;
      setAffirmations(updatedAffirmations);
      setEditIndex(-1);

      // Send a PUT request to update the affirmation in the database
      axios
        .put(
          `http://localhost:8000/api/affirmations/update/${updatedAffirmations[index]._id}`,
          { text: editedText }
        )
        .then((response) => {
          toast.success("Affirmation edited successfully!", {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error editing affirmation:", error);
        });
    }
  }

  function handleCancel() {
    setEditIndex(-1);
    if (isNew === true) {
      const updatedAffirmations = [...affirmations];
      updatedAffirmations.splice(0, 1);
      setAffirmations(updatedAffirmations);
      SetIsNew(false);
    }
  }

  function handleDelete(index) {
    const affirmationId = affirmations[index]._id;
    const updatedAffirmations = [...affirmations];
    updatedAffirmations.splice(index, 1);
    setAffirmations(updatedAffirmations);

    // Send a DELETE request to remove the affirmation from the database
    axios
      .delete(`http://localhost:8000/api/affirmations/delete/${affirmationId}`)
      .then((response) => {
        toast.success("Affirmation deleted successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
      })
      .catch((error) => {
        console.error("Error deleting affirmation:", error);
      });
  }

  const currentdate = new Date();
  return (
    <AdminMiddleComp>
      <h1 className={`AdminHeading ${themeContext.theme}`}>AFFIRMATIONS</h1>
      <div className={`TableContainer ${themeContext.theme}`}>
        <table width={"100%"} className="AdminTable">
          <thead>
            <tr>
              <th style={{ padding: "0px 20px", fontSize: "large" }}>
                Affirmation Text
              </th>
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
                            AFFIRMATIONS REPORT
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
                                  styles.text,
                                ]}
                              >
                                Affirmation Text
                              </Text>
                            </View>
                            {affirmations.map((affirmation, index) => (
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
                                <Text style={[styles.tableCell, styles.text]}>
                                  {affirmation.text}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="AffirmationsReport.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <FontAwesomeIcon
                          icon={faDownload}
                          className={`DownloadIcon ${themeContext.theme}`}
                          title="Export PDF"
                        />
                      )
                    }
                  </PDFDownloadLink>

                  {!isNew ? (
                    <button
                      title="Add Affirmation"
                      className={`TableAddButton ${themeContext.theme}`}
                      onClick={() => {
                        handleAddAffirmation();
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} className="AddIcon" />
                    </button>
                  ) : (
                    <button
                      title="Cancel"
                      className={`TableAddButton ${themeContext.theme}`}
                      onClick={() => {
                        handleCancel();
                      }}
                    >
                      <FontAwesomeIcon icon={faClose} className="AddIcon" />
                    </button>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} style={{ textAlign: 'right', padding: '10px 20px' }}>No of Affirmations : <span>{affirmations.length}</span></td>
            </tr>
            {affirmations.map((affirmation, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      style={{ width: "100%", paddingLeft: "10px" }}
                    />
                  ) : (
                    <div style={{ padding: "2px 10px", textAlign: "justify" }}>
                      {affirmation.text}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: "right" }}>
                  {editIndex === index ? (
                    <FontAwesomeIcon
                      icon={faSave}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleSave(index)}
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
                  {editIndex === index ? (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={handleCancel}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleDelete(index)}
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
};

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
    width: "5%",
    textAlign: "center",
  },
  text: {
    width: "95%",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});

export default EditAffirmationsPage;
