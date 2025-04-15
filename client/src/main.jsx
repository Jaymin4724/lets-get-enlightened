import React, { useContext } from "react";

import NavbarComp from "./components/homepage/NavbarComp";
import HomePage from "./pages/homepage/HomePage";

import NotFound from "./pages/errorpage/NotFound";

import LoginPage from "../src/pages/loginpage/LoginPage";
import ForgotPasswordPage from "../src/pages/loginpage/forgotpasswordpage/ForgotPasswordPage";
import RegistrationPage from "../src/pages/registrationpage/RegistrationPage";

import BreathingExercisePage from "./pages/otherspage/breathingexercisepage/BreathingExcercisePage";
import CustomizedMeditationPage from "./pages/otherspage/customizedmeditationpage/CustomizedMeditationPage";
import StressManagementPage from "./pages/otherspage/stressmanagementpage/StressManagementPage";

import ProfileMenuBar from "./components/profilepage/ProfileMenuBar";
import EditProfilePage from "./pages/profilepage/editprofile/EditProfilePage";
import ChangePasswordPage from "./pages/profilepage/changepassword/ChangePasswordPage";
import LeaderboardBoardPage from "./pages/profilepage/leaderboard/LeaderBoardPage";
import InsightsPage from "./pages/profilepage/insights/InsightsPage";
import MembershipPlansPage from "./pages/profilepage/membershipplanspage/MembershipPlansPage";
import MessageBox from "./pages/profilepage/messageboxpage/MessageBox";
import PaymentPage from "./pages/profilepage/payment/PaymentPage";

import AdminMenuBar from "./components/adminpage/AdminMenuBar";
import DashboardPage from "./pages/adminpage/dashboard/DashboardPage";
import EditAffirmationsPage from "./pages/adminpage/editaffirmations/EditAffirmationsPage";
import EditChallengesPage from "./pages/adminpage/editchallenges/EditChallengesPage";
import EditMeditationTypePage from "./pages/adminpage/editmeditationtypes/EditMeditationTypesPage";
import EditMembershipPlansPage from "./pages/adminpage/editmembershipplans/EditMembershipPlansPage";
import EditMoodTracking from "./pages/adminpage/editmoodtracking/EditMoodTracking";
import Reports from "./pages/adminpage/reports/Reports";

import StartMeditationPage from "./pages/startmeditationpage/StartMeditationPage";
import MoodTrackingPage from "./pages/moodtrackingpage/MoodTrackingPage";

import StartChallengePage from "./pages/startchallengepage/StartChallengePage";
import ChallengeMeditatorPage from "./pages/startchallengepage/challengemeditatiorpage/ChallengeMeditatorPage";

import { Route, Routes } from "react-router-dom";
import { NavbarContext } from "./context/NavbarContext";
export default function Main() {
  const { isNavbarVisible } = useContext(NavbarContext);
  return (
    <>
      {isNavbarVisible && <NavbarComp />}
      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<HomePage />} />
        <Route path="/startmeditation/:id" element={<StartMeditationPage />} />
        <Route path="/startchallenge/:id" element={<StartChallengePage />} />
        <Route
          path="/challengemeditator/:id"
          element={<ChallengeMeditatorPage />}
        />
        {/* LOGIN & REGISTRATION PAGE */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        {/* PROFILE PAGE */}
        <Route
          path="/profile/*"
          element={
            <>
              <ProfileMenuBar />
              <Routes>
                <Route index path="edit" element={<EditProfilePage />} />
                <Route path="changepassword" element={<ChangePasswordPage />} />
                <Route path="leaderboard" element={<LeaderboardBoardPage />} />
                <Route path="insights" element={<InsightsPage />} />
                <Route
                  path="membershipplans"
                  element={<MembershipPlansPage />}
                />
                <Route path="messagebox" element={<MessageBox />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          }
        />

        <Route path="/paymentpage/:index" element={<PaymentPage />} />

        {/* ADMIN PAGE */}
        <Route
          path="/admin/*"
          element={
            <>
              <AdminMenuBar />
              <Routes>
                <Route index path="dashboard" element={<DashboardPage />} />
                <Route
                  path="editaffirmations"
                  element={<EditAffirmationsPage />}
                />
                <Route
                  path="editmeditationtypes"
                  element={<EditMeditationTypePage />}
                />
                <Route path="editchallenges" element={<EditChallengesPage />} />
                <Route
                  path="editmembershipplans"
                  element={<EditMembershipPlansPage />}
                />
                <Route path="editmoodtracking" element={<EditMoodTracking />} />
                <Route path="reports" element={<Reports />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          }
        />
        {/* MOOD TRACKING PAGE */}
        <Route path="/moodtracking" element={<MoodTrackingPage />} />
        {/* OTHERS PAGE */}
        <Route
          path="/customizedmeditation"
          element={<CustomizedMeditationPage />}
        />
        <Route path="/breathingexercise" element={<BreathingExercisePage />} />
        <Route path="/stressmanagement" element={<StressManagementPage />} />
        {/* ERROR PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
