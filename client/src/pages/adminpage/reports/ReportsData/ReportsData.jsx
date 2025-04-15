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

export default function Payment() {
  const themeContext = useContext(ThemeContext);
  const [PaymentData, setPaymentData] = useState([]);
  const [ExportData, setExportData] = useState([]);
  const [membershipPlan, setMembershipPlan] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [PaymentResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/membershipPayment/getall"),
      ]);
      setPaymentData(PaymentResponse.data.payments);
      setExportData(PaymentResponse.data.payments);
    } catch (error) {
      console.error(error);
    }
  }

  function FilterData() {
    const userName = document.getElementById("username").value.toLowerCase();
    const paymentDate = document.getElementById("paymentDate").value;

    console.log(membershipPlan);
    if (!userName && !paymentDate && !membershipPlan) {
      setExportData(PaymentData);
      console.log("jay ho", ExportData);
      return;
    }

    const filteredData = PaymentData.filter((payment) => {
      let match = true;
      const fullName = payment.userName.toLowerCase();
      const formattedDate = new Date(payment.timestamp)
        .toISOString()
        .slice(0, 10);

      if (userName && !fullName.startsWith(userName)) {
        match = false;
      }
      if (paymentDate && formattedDate !== paymentDate) {
        match = false;
      }
      if (
        membershipPlan &&
        payment.planName.toLowerCase() !== membershipPlan.toLowerCase()
      ) {
        match = false;
      }

      return match;
    });

    setExportData(filteredData);
    console.log("Filtered Data:", filteredData);
  }

  const currentdate = new Date();

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

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
          Payment's Data : &nbsp;
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
                      Meditate, Elevate, Radiate
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
                    <Text style={styles.heading}>Payment Data</Text>
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
                          Username
                        </Text>

                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.exp,
                          ]}
                        >
                          Plan and Price
                        </Text>

                        <Text
                          style={[
                            styles.tableCell,
                            styles.headerCell,
                            styles.mtdate,
                          ]}
                        >
                          Payment Date
                        </Text>
                      </View>
                      {ExportData.map((Payment, index) => (
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
                            {Payment.userName}
                          </Text>
                          <Text style={[styles.tableCell, styles.exp]}>
                            {Payment.planName} - {Payment.price}
                          </Text>
                          <Text style={[styles.tableCell, styles.mtdate]}>
                            {formatDate(new Date(Payment.timestamp))}
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
          placeholder="User Name starts with..."
          style={{ flex: 1 }}
          id="username"
          onChange={() => FilterData()}
        />
        <div className="DatePicker" style={{ flex: 1 }}>
          <label style={{ whiteSpace: "nowrap" }}>Payment Date : </label>
          <input
            type="date"
            onChange={() => FilterData()}
            style={{ flex: 1 }}
            id="paymentDate"
          />
        </div>
        <div style={{ display: "flex", flex: "3", gap: "5px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: "3px",
              fontSize: "15px",
            }}
          >
            <input
              type="radio"
              name="membership"
              value="Basic"
              onChange={(e) => setMembershipPlan(e.target.value)}
            />{" "}
            Starter Pack
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              fontSize: "15px",
              gap: "3px",
            }}
          >
            <input
              type="radio"
              name="membership"
              value="Standard"
              onChange={(e) => setMembershipPlan(e.target.value)}
            />{" "}
            Essential Plan
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              fontSize: "15px",
              gap: "3px",
            }}
          >
            <input
              type="radio"
              name="membership"
              value="Premium"
              onChange={(e) => setMembershipPlan(e.target.value)}
            />{" "}
            Ultimate Plan
          </div>
        </div>
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
    textAlign: "center",
  },
  mtdate: {
    width: "30%",
    textAlign: "center",
  },
});
