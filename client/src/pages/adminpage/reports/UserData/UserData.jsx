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
export default function UserData() {
  const themeContext = useContext(ThemeContext);
  const [UserData, setUserData] = useState([]);
  const [ExportData, setExportData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [UserDataResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/reportsGetAll"),
      ]);
      setUserData(UserDataResponse.data);
      setExportData(UserDataResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  function FilterData() {
    const firstName = document.querySelector('input[type="text"]').value;
    const lastName = document.querySelectorAll('input[type="text"]')[1].value;
    const birthDate = document.querySelector('input[type="date"]').value;
    const regDate = document.querySelectorAll('input[type="date"]')[1].value;
    const membershipPlan = document.getElementById("membership").value;
    const gender = document.getElementById("gender").value;

    if (
      !firstName &&
      !lastName &&
      !birthDate &&
      !regDate &&
      !membershipPlan &&
      !gender
    ) {
      setExportData(UserData);
      return;
    }

    const filteredData = UserData.filter((user) => {
      let match = true;
      if (
        firstName &&
        !user.fname.toLowerCase().startsWith(firstName.toLowerCase())
      ) {
        match = false;
      }
      if (
        lastName &&
        !user.lname.toLowerCase().startsWith(lastName.toLowerCase())
      ) {
        match = false;
      }
      if (
        birthDate &&
        new Date(user.dob).toISOString().slice(0, 10) !== birthDate
      ) {
        match = false;
      }

      if (regDate && user.reg_date.slice(0, 10) !== regDate) {
        match = false;
      }
      if (
        membershipPlan &&
        user.membershipPlan.toLowerCase() !== membershipPlan.toLowerCase()
      ) {
        match = false;
      }
      if (gender && user.gender.toLowerCase() !== gender.toLowerCase()) {
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
          Joined Meditator's Data : &nbsp;
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
                      Joined Meditators in Our Website
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
                            styles.mail,
                          ]}
                        >
                          Email ID
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.dob,
                          ]}
                        >
                          DOB
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.membershipPlan,
                          ]}
                        >
                          Membership Plan
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.regDate,
                          ]}
                        >
                          Registration Date
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
                            {Meditator.fname} {Meditator.lname}
                          </Text>
                          <Text style={[styles.tableCell, styles.mail]}>
                            {Meditator.email}
                          </Text>
                          <Text style={[styles.tableCell, styles.dob]}>
                            {new Date(Meditator.dob).toLocaleDateString()}
                          </Text>
                          <Text
                            style={[styles.tableCell, styles.membershipPlan]}
                          >
                            {Meditator.membershipPlan}
                          </Text>
                          <Text style={[styles.tableCell, styles.regDate]}>
                            {new Date(Meditator.reg_date).toLocaleDateString()}
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
          onChange={FilterData}
        />
        <input
          type="text"
          placeholder="Last Name starts with..."
          style={{ flex: 1 }}
          onChange={FilterData}
        />
        <div className="DatePicker" style={{ flex: 1 }}>
          <label style={{ whiteSpace: "nowrap" }}>Date of Birth : </label>
          <input type="date" onChange={FilterData} />
        </div>
        <div className="DatePicker" style={{ flex: 1 }}>
          <label style={{ whiteSpace: "nowrap" }}>Registration Date : </label>
          <input type="date" onChange={FilterData} />
        </div>
        <select style={{ flex: 1 }} id="membership" onChange={FilterData}>
          <option value="" disabled selected>
            Select Membership Plan
          </option>
          <option value="Normal Plan">Normal Plan</option>
          <option value="Starter Pack">Starter Pack</option>
          <option value="Essential Plan">Essential Plan</option>
          <option value="Ultimate Plan">Ultimate Plan</option>
        </select>
        <select style={{ flex: 1 }} id="gender" onChange={FilterData}>
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
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
  name: {
    width: "20%",
    paddingLeft: "2px",
  },
  mail: {
    width: "25%",
    paddingLeft: "2px",
  },
  dob: {
    width: "15%",
    paddingLeft: "2px",
  },
  membershipPlan: {
    width: "20%",
    paddingLeft: "2px",
  },
  regDate: {
    width: "20%",
    paddingLeft: "2px",
  },
});
