import React, { useEffect, useState, useContext } from "react";
import "./PaymentPage.css";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

export default function PaymentPage() {
  const { index } = useParams();
  const { userData, setUserData } = useContext(AuthContext); // Use setUserData from AuthContext
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();
  const [membershipPlans, setMembershipPlans] = useState([]);

  useEffect(() => {
    fetchMembershipPlans();
  });

  const fetchMembershipPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/membership/displayActive"
      );
      setMembershipPlans(response.data[index]);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
    }
  };

  const handleCardNumberChange = (event) => {
    // Format the card number with spaces every 4 digits
    const input = event.target.value;
    const formattedCardNumber = input
      .replace(/\s/g, "") // Remove any existing spaces
      .replace(/[^0-9]/g, "") // Remove any non-numeric characters
      .slice(0, 16) // Limit the length to 16 characters (max for card number)
      .match(/.{1,4}/g) // Split the number into groups of 4 digits
      ?.join(" "); // Join the groups with spaces
    setCardNumber(formattedCardNumber || "");
  };

  const handleExpiryChange = (event) => {
    // Format the input to MM/YY format
    const input = event.target.value;
    const formattedExpiry = input
      .replace(/\s/g, "") // Remove any white spaces
      .replace(/[^0-9]/g, "") // Remove any non-numeric characters
      .slice(0, 4) // Limit the length to 4 characters (MMYY)
      .replace(/(\d{2})(\d{2})/, "$1/$2"); // Add a slash between MM and YY
    setExpiry(formattedExpiry);
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        u_id: userData._id,
        plan_id: membershipPlans._id,
        price: membershipPlans.price,
      };
      await axios.post(
        "http://localhost:8000/api/membershipPayment/create",
        paymentData
      );

      // Update the mem_id in the userData object
      const updatedUserData = { ...userData, mem_id: membershipPlans._id };
      setUserData(updatedUserData);

      toast.success("Payment Successful!!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "white",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error("Payment failed. Please try again later.");
    }
  };

  return (
    <div className="PaymentPageParent">
      <div className="PaymentPage">
        <div className="ContactInfo">
          <h5>Contact Information</h5>
          <input
            type="text"
            placeholder="Email: e.g. abc@gmail.com"
            style={{ width: "100%", marginTop: "5px" }}
          />
        </div>

        <div className="PaymentMethod">
          <h5>Payment Method</h5>

          <div className="CardInfo">
            <label>Card Information</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
              style={{ marginBottom: "10px", marginTop: "5px" }}
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <input type="text" placeholder="CVC" />
              <input
                type="text"
                placeholder=" MM / YY"
                value={expiry}
                onChange={handleExpiryChange}
              />
            </div>
          </div>

          <div className="CardHolderName">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="Full name on card"
              style={{ marginTop: "5px" }}
            />
          </div>
        </div>

        <div className="TotalPayment">
          <div>Total Amount :</div>
          <div>
            <b>Rs. {membershipPlans.price}</b>
          </div>
        </div>

        <button style={{ width: "100%" }} onClick={handlePayment}>
          Purchase {membershipPlans.plan}
        </button>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import "./PaymentPage.css";
// import { toast } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// export default function PaymentPage() {
//   const { index } = useParams();
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const navigate = useNavigate();
//   const [membershipPlans, setMembershipPlans] = useState([]);

//   useEffect(() => {
//     fetchMembershipPlans();
//   }, []);

//   const fetchMembershipPlans = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/membership/displayActive"
//       );
//       setMembershipPlans(response.data[index]);
//     } catch (error) {
//       console.error("Error fetching membership plans:", error);
//     }
//   };

//   const handleCardNumberChange = (event) => {
//     // Format the card number with spaces every 4 digits
//     const input = event.target.value;
//     const formattedCardNumber = input
//       .replace(/\s/g, "") // Remove any existing spaces
//       .replace(/[^0-9]/g, "") // Remove any non-numeric characters
//       .slice(0, 16) // Limit the length to 16 characters (max for card number)
//       .match(/.{1,4}/g) // Split the number into groups of 4 digits
//       ?.join(" "); // Join the groups with spaces
//     setCardNumber(formattedCardNumber || "");
//   };

//   const handleExpiryChange = (event) => {
//     // Format the input to MM/YY format
//     const input = event.target.value;
//     const formattedExpiry = input
//       .replace(/\s/g, "") // Remove any white spaces
//       .replace(/[^0-9]/g, "") // Remove any non-numeric characters
//       .slice(0, 4) // Limit the length to 4 characters (MMYY)
//       .replace(/(\d{2})(\d{2})/, "$1/$2"); // Add a slash between MM and YY
//     setExpiry(formattedExpiry);
//   };

//   function handlePayment() {
//     toast.success("Payment Successfull!!", {
//       duration: 3000,
//       position: "top-center",
//       style: {
//         backgroundColor: "#333",
//         color: "white",
//       },
//     });
//     setTimeout(() => {
//       navigate("/");
//     }, 3000);
//   }

//   return (
//     <div className="PaymentPageParent">
//       <div className="PaymentPage">
//         <div className="ContactInfo">
//           <h5>Contact Information</h5>
//           <input
//             type="text"
//             placeholder="Email:   e.g. abc@gmail.com"
//             style={{ width: "100%", marginTop: "5px" }}
//           />
//         </div>

//         <div className="PaymentMethod">
//           <h5>Payment Method</h5>

//           <div className="CardInfo">
//             <label>Card Information</label>
//             <input
//               type="text"
//               placeholder="0000 0000 0000 0000"
//               value={cardNumber}
//               onChange={handleCardNumberChange}
//               style={{ marginBottom: "10px", marginTop: "5px" }}
//             />
//             <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
//               <input type="text" placeholder="CVC" />
//               <input
//                 type="text"
//                 placeholder=" MM / YY"
//                 value={expiry}
//                 onChange={handleExpiryChange}
//               />
//             </div>
//           </div>

//           <div className="CardHolderName">
//             <label>Cardholder Name</label>
//             <input
//               type="text"
//               placeholder="Full name on card"
//               style={{ marginTop: "5px" }}
//             />
//           </div>
//         </div>

//         <div className="TotalPayment">
//           <div>Total Amount :</div>
//           <div>
//             <b>Rs. {membershipPlans.price}</b>
//           </div>
//         </div>

//         <button style={{ width: "100%" }} onClick={handlePayment}>
//           Purchase {membershipPlans.plan}
//         </button>
//       </div>
//     </div>
//   );
// }
