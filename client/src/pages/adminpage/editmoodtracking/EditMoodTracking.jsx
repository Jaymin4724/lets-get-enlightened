import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AdminMiddleComp from "../../../components/adminpage/AdminMiddleComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faPenToSquare,
  faSave,
  faEyeSlash,
  faTimes,
  faClose,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "../../adminpage/TableView.css";
import toast from "react-hot-toast";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { ThemeContext } from "../../../context/ThemeContext";

export default function EditmembershipPlansPage() {
  const themeContext = useContext(ThemeContext);
  const [moodTrackingQuestions, setMoodTrackingQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [visibility, setVisibility] = useState([]);
  const [showAddTextarea, setShowAddTextarea] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/mood/getall")
      .then((response) => {
        const questions = response.data;
        const newVisibility = questions.map(
          (que) => que.s_id === "65ae6d7937e1e60e7c1b0097"
        );
        setMoodTrackingQuestions(questions);
        setVisibility(newVisibility);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleAdd = () => {
    setShowAddTextarea(true);
    setEditIndex(null);
    setEditedQuestion("");
  };

  const handleEdit = (index) => {
    setShowAddTextarea(false);
    setEditIndex(index);
    setEditedQuestion(moodTrackingQuestions[index].que_txt);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedQuestion("");
    setShowAddTextarea(false);
  };

  const handleSave = (index) => {
    if (editedQuestion.trim() === "") {
      toast.error("Question should not be empty!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    if (editIndex !== null) {
      // Editing existing question
      const updatedQuestions = [...moodTrackingQuestions];
      updatedQuestions[index].que_txt = editedQuestion;

      axios
        .put(
          `http://localhost:8000/api/mood/update/${updatedQuestions[index]._id}`,
          { que_txt: editedQuestion }
        )
        .then((response) => {
          setMoodTrackingQuestions(updatedQuestions);
          setEditIndex(null);
          setEditedQuestion("");
          toast.success("Mood Tracking Question edited successfully!", {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error updating question:", error);
        });
    } else {
      // Adding new question
      const newQuestion = {
        que_txt: editedQuestion,
        s_id: "65ae6d7937e1e60e7c1b0097",
      };

      // Set visibility to true for new question
      const newVisibility = [...visibility];
      newVisibility[index] = true;
      setVisibility(newVisibility);

      axios
        .post("http://localhost:8000/api/mood/create", newQuestion)
        .then((response) => {
          setMoodTrackingQuestions([...moodTrackingQuestions, response.data]);
          setEditIndex(null);
          setEditedQuestion("");
          setShowAddTextarea(false);
          toast.success("New Mood Tracking Question added successfully!", {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "white",
            },
          });
        })
        .catch((error) => {
          console.error("Error adding new question:", error);
        });
    }
  };

  const toggleVisibility = (index) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);

    const newSId = newVisibility[index]
      ? "65ae6d7937e1e60e7c1b0097"
      : "65ae6d7a37e1e60e7c1b009a";
    axios
      .put(
        `http://localhost:8000/api/mood/update/${moodTrackingQuestions[index]._id}`,
        { s_id: newSId }
      )
      .then((response) => {
        toast.success("Question visibility updated successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating question visibility:", error);
      });
  };

  const currentdate = new Date();
  return (
    <AdminMiddleComp>
      <h1 className={`AdminHeading ${themeContext.theme}`}>
        MOOD TRACKING QUESTIONS
      </h1>
      <div className={`TableContainer ${themeContext.theme}`}>
        <table width={"100%"} className="AdminTable">
          <thead>
            <tr>
              <th style={{ padding: "0px 10px" }}>Questions</th>
              <th colSpan={2} style={{ textAlign: "center" }}>
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
                            MOOD TRACKING QUESTIONS REPORT
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
                                Mood Tracking Questions
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.status,
                                ]}
                              >
                                Status
                              </Text>
                            </View>
                            {moodTrackingQuestions.map(
                              (moodTrackingQuestion, index) => (
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
                                    {moodTrackingQuestion.que_txt}
                                  </Text>
                                  <Text
                                    style={[styles.tableCell, styles.status]}
                                  >
                                    {moodTrackingQuestion.s_id ===
                                    "65ae6d7937e1e60e7c1b0097"
                                      ? "Activated"
                                      : "Deactivated"}
                                  </Text>
                                </View>
                              )
                            )}
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="MoodTrackingQuestionReport.pdf"
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
                  <button
                    className={`TableAddButton ${themeContext.theme}`}
                    onClick={() =>
                      !showAddTextarea ? handleAdd() : handleCancel()
                    }
                  >
                    <FontAwesomeIcon
                      icon={showAddTextarea ? faClose : faPlus}
                      className="AddIcon"
                    />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={3}
                style={{ textAlign: "right", padding: "10px 53px 10px 20px" }}
              >
                No of Questions : <span>{moodTrackingQuestions.length}</span>
              </td>
            </tr>
            {showAddTextarea && (
              <tr>
                <td>
                  <textarea
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>
                <td colSpan={2}>
                  <div
                    style={{
                      display: "flex",
                      gap: "25px",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleSave(moodTrackingQuestions.length)}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={handleCancel}
                    />
                  </div>
                </td>
              </tr>
            )}
            {moodTrackingQuestions.map((que, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <textarea
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                      style={{ width: "100%", paddingLeft: "5px" }}
                    />
                  ) : (
                    <div
                      style={{ color: visibility[index] ? "black" : "gray" }}
                    >
                      {que.que_txt}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: "right" }}>
                  {editIndex === index ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        className={`EditDeleteIcon ${themeContext.theme}`}
                        onClick={() => handleSave(index)}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={`EditDeleteIcon ${themeContext.theme}`}
                        onClick={handleCancel}
                      />
                    </div>
                  ) : (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className={`EditDeleteIcon ${themeContext.theme}`}
                      onClick={() => handleEdit(index)}
                    />
                  )}
                </td>
                <td style={{ textAlign: "left" }}>
                  <FontAwesomeIcon
                    icon={visibility[index] ? faEye : faEyeSlash}
                    className={`EditDeleteIcon ${themeContext.theme}`}
                    onClick={() => toggleVisibility(index)}
                  />
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
    width: "10%",
    textAlign: "center",
  },
  text: {
    width: "70%",
  },
  status: {
    width: "20%",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
