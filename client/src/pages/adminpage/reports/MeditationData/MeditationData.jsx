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
export default function MeditationData() {
  const themeContext = useContext(ThemeContext);
  const [MeditationData, setMeditationData] = useState([]);
  const [ExportData, setExportData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [MeditationDataResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/meditationActivity/ReportsgetAll"),
      ]);

      setMeditationData(MeditationDataResponse.data);
      setExportData(MeditationDataResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  function FilterData() {
    const firstName = document.getElementById("firstname").value.toLowerCase();
    const lastName = document.getElementById("lastname").value.toLowerCase();
    const dateofmed = document.getElementById("dateofmeditation").value;
    const meditationtype = document
      .getElementById("meditationtype")
      .value.toLowerCase();

    if (!firstName && !lastName && !dateofmed && !meditationtype) {
      setExportData(MeditationData);
      return;
    }

    const filteredData = MeditationData.filter((item) => {
      let match = true;
      const timestamp = item.timestamp.split("T")[0];

      if (
        firstName &&
        item.user &&
        !item.user.fname.toLowerCase().startsWith(firstName)
      ) {
        match = false;
      }

      if (
        lastName &&
        item.user &&
        !item.user.lname.toLowerCase().startsWith(lastName)
      ) {
        match = false;
      }

      if (dateofmed && timestamp !== dateofmed) {
        match = false;
      }

      if (
        meditationtype &&
        item.meditationType.name.toLowerCase() !== meditationtype
      ) {
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
          Meditation Data : &nbsp;
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
                      Meditator's Meditation Data
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
                            styles.meditationType,
                          ]}
                        >
                          Meditation Type
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.dom,
                          ]}
                        >
                          Date of Meditation
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
                          <Text style={[styles.tableCell, styles.name]}>
                            {Meditator.user !== null
                              ? Meditator.user.fname
                              : null}{" "}
                            {Meditator.user !== null
                              ? Meditator.user.lname
                              : null}
                          </Text>
                          <Text
                            style={[styles.tableCell, styles.meditationType]}
                          >
                            {Meditator.meditationType.name}
                          </Text>
                          <Text style={[styles.tableCell, styles.dom]}>
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
        <input
          type="text"
          placeholder="First Name starts with..."
          style={{ flex: 1 }}
          id="firstname"
          onChange={FilterData}
        />
        <input
          type="text"
          placeholder="Last Name starts with..."
          style={{ flex: 1 }}
          id="lastname"
          onChange={FilterData}
        />
        <div className="DatePicker" style={{ flex: 1 }}>
          <label style={{ whiteSpace: "nowrap" }}>Date of Meditation : </label>
          <input
            type="date"
            id="dateofmeditation"
            onChange={FilterData}
            style={{ flex: 1 }}
          />
        </div>
        <select style={{ flex: 1 }} id="meditationtype" onChange={FilterData}>
          <option value="" disabled selected>
            Select Meditation Type
          </option>
          <option value="Mantra Meditation">Mantra Meditation</option>
          <option value="Fire Meditation">Fire Meditation</option>
          <option value="Drumming Calmness Meditation">
            Drumming Calmness Meditation
          </option>
          <option value="Mindfulness Meditation">Mindfulness Meditation</option>
          <option value="Flute Meditation">Flute Meditation</option>
          <option value="Zen Meditation">Zen Meditation</option>
          <option value="Sleeping Meditation (Guided)">
            Sleeping Meditation (Guided)
          </option>
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
    width: "10%",
    textAlign: "center",
  },
  name: {
    width: "30%",
    paddingLeft: "2px",
  },
  meditationType: {
    width: "30%",
    paddingLeft: "2px",
  },
  dom: {
    width: "30%",
    paddingLeft: "2px",
  },
});
