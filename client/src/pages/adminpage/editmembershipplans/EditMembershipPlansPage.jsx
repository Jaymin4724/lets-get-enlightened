import React, { useContext, useState, useEffect } from "react";
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
import "../../adminpage/TableView.css";
import toast from "react-hot-toast";
import { ThemeContext } from "../../../context/ThemeContext";
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

export default function EditMembershipPlansPage() {
  const themeContext = useContext(ThemeContext);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showAddTextarea, setShowAddTextarea] = useState(false);

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  async function fetchMembershipPlans() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/membership/getall"
      );
      setMembershipPlans(response.data);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
    }
  }

  const handleDelete = async (index) => {
    const planId = membershipPlans[index]._id;
    try {
      await axios.delete(
        `http://localhost:8000/api/membership/delete/${planId}`
      );
      const updatedMembershipPlans = [...membershipPlans];
      updatedMembershipPlans.splice(index, 1);
      setMembershipPlans(updatedMembershipPlans);
      toast.success("Membership Plan deleted successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error deleting membership plan:", error);
    }
  };

  const handleEdit = (index) => {
    handleCancel(); // Cancel add if in progress
    const membership = membershipPlans[index];
    setEditModeIndex(index);
    setEditedData({
      ...membership,
      price: membership.price.toString(),
      credit_points: membership.credit_points.toString(),
      duration: membership.duration.toString(),
    });
  };

  const handleSave = async () => {
    if (
      editedData.name.trim() === "" ||
      editedData.plan.trim() === "" ||
      editedData.price.toString().trim() === "" ||
      editedData.credit_points.toString().trim() === "" ||
      editedData.description.trim() === "" ||
      editedData.duration.toString().trim() === ""
    ) {
      toast.error("Fields should not be empty!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }

    try {
      if (showAddTextarea) {
        await axios.post(
          "http://localhost:8000/api/membership/create",
          editedData
        );
        fetchMembershipPlans(); // Fetch updated plans after adding
        toast.success("Membership Plan added successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
      }

      if (!showAddTextarea) {
        await axios.put(
          `http://localhost:8000/api/membership/update/${membershipPlans[editModeIndex]._id}`,
          editedData
        );
        const updatedMembershipPlans = [...membershipPlans];
        updatedMembershipPlans[editModeIndex] = { ...editedData };
        setMembershipPlans(updatedMembershipPlans);
        setEditModeIndex(null);
        toast.success("Membership Plan edited successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
      }
      handleCancel(); // Reset state
    } catch (error) {
      console.error("Error saving membership plan:", error);
    }
  };

  const handleCancel = () => {
    setEditedData({});
    setEditModeIndex(null);
    setShowAddTextarea(false);
  };

  const handleAddTextarea = () => {
    setShowAddTextarea(true);
    setEditedData({
      name: "",
      plan: "",
      price: "",
      credit_points: "",
      description: "",
      duration: "",
    });
  };

  const handleAddCancel = () => {
    setShowAddTextarea(false);
  };

  const currentdate = new Date();

  return (
    <AdminMiddleComp>
      <h1 className={`AdminHeading ${themeContext.theme}`}>MEMBERSHIP PLANS</h1>
      <div className={`TableContainer ${themeContext.theme}`}>
        <table width={"100%"} className="AdminTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan Type</th>
              <th>Price</th>
              <th>Credit Points</th>
              <th>Description</th>
              <th>Duration</th>
              <th colSpan={2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
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
                            MEMBERSHIP PLANS REPORT
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
                                  styles.name,
                                ]}
                              >
                                Plan Type
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  styles.headerCell,
                                  styles.no,
                                ]}
                              >
                                Price
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
                                  styles.desc,
                                ]}
                              >
                                Description
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
                            {membershipPlans.map((membershipPlan, index) => (
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
                                  {membershipPlan.name}
                                </Text>
                                <Text style={[styles.tableCell, styles.name]}>
                                  {membershipPlan.plan}
                                </Text>
                                <Text style={[styles.tableCell, styles.no]}>
                                  {membershipPlan.price}
                                </Text>
                                <Text style={[styles.tableCell, styles.no]}>
                                  {membershipPlan.credit_points}
                                </Text>
                                <Text style={[styles.tableCell, styles.desc]}>
                                  {membershipPlan.description}
                                </Text>
                                <Text style={[styles.tableCell, styles.no]}>
                                  {membershipPlan.duration === -1
                                    ? "Lifetime"
                                    : membershipPlan.duration}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="MembershipPlansReport.pdf"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className={`DownloadIcon ${themeContext.theme}`}
                      title="Export PDF"
                    />
                  </PDFDownloadLink>
                  <button
                    className={`TableAddButton ${themeContext.theme}`}
                    onClick={
                      showAddTextarea ? handleAddCancel : handleAddTextarea
                    }
                  >
                    {editModeIndex !== null || showAddTextarea ? (
                      <FontAwesomeIcon icon={faClose} className="AddIcon" />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} className="AddIcon" />
                    )}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} style={{ textAlign: 'right', padding: '10px 20px' }}>No of Membership Plans : <span>{membershipPlans.length}</span></td>
            </tr>


            {showAddTextarea && (
              <tr>
                <td>
                  <textarea
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        name: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedData.plan}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        plan: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedData.price}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        price: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedData.credit_points}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        credit_points: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedData.description}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={editedData.duration}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        duration: e.target.value,
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
            {membershipPlans.map((membership, index) => (
              <tr key={index}>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    membership.name
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.plan}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          plan: e.target.value,
                        })
                      }
                    />
                  ) : (
                    membership.plan
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.price}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    membership.price
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.credit_points}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          credit_points: e.target.value,
                        })
                      }
                    />
                  ) : (
                    membership.credit_points
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
                    membership.description
                  )}
                </td>
                <td>
                  {editModeIndex === index ? (
                    <textarea
                      value={editedData.duration}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          duration: e.target.value,
                        })
                      }
                    />
                  ) : (
                    membership.duration
                  )}
                </td>
                <td style={{ padding: "0px 20px", textAlign: "right" }}>
                  {editModeIndex === index ? (
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
                <td style={{ padding: "0px 25px" }}>
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
    width: "10%",
  },
  name: {
    width: "20%",
  },
  desc: { width: "30%" },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
