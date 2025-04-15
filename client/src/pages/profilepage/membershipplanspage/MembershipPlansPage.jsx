import React, { useContext, useEffect, useState } from "react";
import "./MembershipPlansPage.css";
import { ThemeContext } from "../../../context/ThemeContext";
import ProfileMiddleComp from "../../../components/profilepage/ProfileMiddleComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faStar } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

const MembershipPlans = () => {
  const themeContext = useContext(ThemeContext);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  const fetchMembershipPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/membership/displayActive"
      );
      setMembershipPlans(response.data);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
    }
  };

  return (
    <ProfileMiddleComp>
      <div className={`MembershipPlansContainer ${themeContext.theme}`}>
        <h2>Choose Your Membership Plan</h2>
        <div className="MembershipPlans">
          {membershipPlans.map((type, index) => (
            <div
              key={type._id}
              className={`MembershipPlan ${themeContext.theme}`}
            >
              <div
                className="MembershipPlanType"
                style={{ textAlign: "center" }}
              >
                {type.plan}
              </div>
              <div className="MembershipPlanDesc">
                {type.description}
                <br />
                <b className={`MembershipPlanDuration ${themeContext.theme}`}>
                  {type.duration === -1 ? (
                    <>Lifetime</>
                  ) : (
                    <>{type.duration} days</>
                  )}
                </b>
              </div>
              <div className="MembershipPlanDetails">
                <div className={`MembershipPlanName ${themeContext.theme}`}>
                  {type.name}
                </div>
                <div className={`MembershipPlanPrice ${themeContext.theme}`}>
                  &#8377;{type.price}
                </div>

                <NavLink
                  to={`/paymentpage/${index}`}
                  className={`SubscribeButton ${themeContext.theme}`}
                >
                  Buy Now
                </NavLink>

                {userData.mem_id !== "65de0a84596a0d4f24ec161d" ? (
                  <>
                    <div>OR</div>
                    <div
                      className={`MembershipPlanPrice ${themeContext.theme}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      {themeContext.theme === "dark" ? (
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "black" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "white" }}
                        />
                      )}
                      {type.credit_points}
                    </div>
                    <button className={`SubscribeButton ${themeContext.theme}`}>
                      Redeem Now{" "}
                      <FontAwesomeIcon
                        icon={faCrown}
                        style={{ color: "gold" }}
                      />
                      <br />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileMiddleComp>
  );
};

export default MembershipPlans;
