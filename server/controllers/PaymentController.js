import MembershipPayment from "../models/MEMBERSHIP_PAYMENT_TBL.js";
import Membership from "../models/MEMBERSHIP_TBL.js";
import Registration from "../models/REGISTRATION_TBL.js";

export const createMembershipPayment = async (req, res) => {
  try {
    const { u_id, plan_id, price } = req.body;

    // Find the membership plan based on the plan_id
    const membershipPlan = await Membership.findById(plan_id);

    if (!membershipPlan) {
      return res.status(404).json({ error: "Membership plan not found" });
    }

    // Calculate the new last_date by adding the duration of the plan to the current date
    let newLastDate = null;
    if (membershipPlan.duration !== -1) {
      const durationInMilliseconds =
        membershipPlan.duration * 24 * 60 * 60 * 1000;
      newLastDate = new Date(Date.now() + durationInMilliseconds);
    }

    // Update the mem_id field in the REGISTRATION_TBL table
    const user = await Registration.findById(u_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.mem_id = plan_id;
    await user.save();

    const membershipPayment = new MembershipPayment({
      u_id,
      plan_id,
      price,
      last_date: newLastDate,
    });

    await membershipPayment.save();

    res.status(201).json({
      message: "Membership payment created successfully",
      data: membershipPayment,
    });
  } catch (error) {
    console.error("Error creating membership payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMembershipPayments = async (req, res) => {
  try {
    // Find all membership payments
    const allPayments = await MembershipPayment.find();

    // Fetch additional information for each payment
    const paymentsWithData = await Promise.all(
      allPayments.map(async (payment) => {
        try {
          // Fetch user's first name and last name
          const user = await Registration.findById(payment.u_id);
          const userName = user ? `${user.fname} ${user.lname}` : null;

          // Fetch plan name
          const plan = await Membership.findById(payment.plan_id);
          const planName = plan ? plan.name : null;

          return {
            ...payment.toObject(),
            userName,
            planName,
          };
        } catch (error) {
          console.error("Error fetching user or plan data:", error);
          // Return null for this payment if user or plan is not found
          return null;
        }
      })
    );

    // Filter out null payments
    const validPayments = paymentsWithData.filter(
      (payment) => payment !== null && payment.userName !== null
    );

    // Calculate the sum of all received money
    const totalReceived = validPayments.reduce(
      (total, payment) => total + payment.price,
      0
    );

    res.status(200).json({ payments: validPayments, totalReceived });
  } catch (error) {
    console.error("Error getting membership payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
