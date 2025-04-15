import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import "../Reports.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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
export default function MoodData() {
  const themeContext = useContext(ThemeContext);
  const [MoodData, setMoodData] = useState([]);
  const [ExportData, setExportData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [MoodDataResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/mood/reportGetAll"),
      ]);
      console.log(MoodDataResponse.data);
      setMoodData(MoodDataResponse.data);
      setExportData(MoodDataResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  function FilterData() {
    const moodDate = document.getElementById("moodDate").value;
    const moodStars = document.getElementById("moodStars").value;

    if (!moodDate && !moodStars) {
      setExportData(MoodData);
      return;
    }
    const filteredData = MoodData.filter((user) => {
      let match = true;
      if (
        moodDate &&
        new Date(user.timestamp).toISOString().slice(0, 10) !== moodDate
      ) {
        match = false;
      }
      if (moodStars && Math.round(user.result) !== parseInt(moodStars)) {
        match = false;
      }
      return match;
    });
    setExportData(filteredData);
  }

  const currentdate = new Date();

  return (
    <div className={`report ${themeContext.theme}`}>
      <div
        className="title"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3px",
          marginBottom: "10px",
        }}
      >
        <h6 style={{ margin: "0", padding: "0", fontSize: "large" }}>
          Mood Tracking Data : &nbsp;
        </h6>

        <PDFDownloadLink
          document={
            <Document>
              <Page style={styles.page}>
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
                <View>
                  <View>
                    <Text style={styles.heading}>
                      Meditator's Mood Tracking Data
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
                            styles.uid,
                          ]}
                        >
                          Meditator's UID
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.exp,
                          ]}
                        >
                          Meditator's Experience
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.result,
                          ]}
                        >
                          Result
                        </Text>

                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.mtdate,
                          ]}
                        >
                          Mood Tracking Date
                        </Text>
                      </View>
                      {ExportData.map((Meditator, index) => (
                        <View
                          key={index}
                          style={[
                            styles.tableRow,
                            index % 2 === 0 ? styles.evenRow : styles.oddRow,
                          ]}
                        >
                          <Text style={[styles.tableCell, styles.no]}>
                            {index + 1}
                          </Text>
                          <Text style={[styles.tableCell, styles.uid]}>
                            {Meditator._id}
                          </Text>
                          <Text style={[styles.tableCell, styles.exp]}>
                            {Meditator.exp_share}
                          </Text>
                          <Text style={[styles.tableCell, styles.result]}>
                            {Math.round(Meditator.result) === 0
                              ? "Terrible"
                              : Math.round(Meditator.result) === 1
                              ? "Bad"
                              : Math.round(Meditator.result) === 2
                              ? "Okay"
                              : Math.round(Meditator.result) === 3
                              ? "Good"
                              : Math.round(Meditator.result) === 4
                              ? "Great"
                              : Math.round(Meditator.result) === 5
                              ? "Excellent"
                              : null}
                          </Text>
                          <Text style={[styles.tableCell, styles.mtdate]}>
                            {new Date(Meditator.timestamp).toLocaleDateString()}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          }
          fileName="DynamicReport.pdf"
        >
          <button className="DownloadReport">
            Export PDF&nbsp;
            <FontAwesomeIcon icon={faDownload} title="Export PDF" />
          </button>
        </PDFDownloadLink>
      </div>
      <div className="ReportDetails">
        <div className="DatePicker" style={{ flex: 1 }}>
          <label style={{ whiteSpace: "nowrap" }}>Mood Tracking Date : </label>
          <input
            type="date"
            id="moodDate"
            onChange={() => FilterData()}
            style={{ flex: 1 }}
          />
        </div>
        <select
          style={{ flex: 1 }}
          id="moodStars"
          onChange={() => FilterData()}
        >
          <option value="" disabled selected>
            Select Mood Results
          </option>
          <option value="0">Terrible</option>
          <option value="1">Bad</option>
          <option value="2">Okay</option>
          <option value="3">Good</option>
          <option value="4">Great</option>
          <option value="5">Excellent</option>
        </select>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 8,
    display: "flex",
    flexDirection: "row-reverse",
    gap: "5px",
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
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  no: {
    width: "5%",
    textAlign: "center",
  },
  uid: {
    width: "30%",
    textAlign: "center",
  },
  exp: {
    width: "35%",
  },
  result: {
    width: "10%",
    textAlign: "center",
  },
  mtdate: {
    width: "20%",
  },
});
