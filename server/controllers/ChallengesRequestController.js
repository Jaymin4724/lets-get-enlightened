import Request from "../models/CHALLENGE_REQ_TBL.js";
import names from "../models/REGISTRATION_TBL.js";
import chName from "../models/CHALLENGES_TBL.js";

export const create = async (req, res) => {
  try {
    const RequestData = new Request(req.body);
    if (!RequestData) {
      return res.status(404).json({ msg: "Request not found" });
    }
    const savedData = await RequestData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const requests = await Request.find();

    if (!requests) {
      return res.status(404).json({ msg: "Requests not found" });
    }

    const requestData = await Promise.all(
      requests.map(async (request) => {
        const sender = await names.findById(request.sender_id);
        const receiver = await names.findById(request.receiver_id);
        const challenge = await chName.findById(request.ch_id);

        return {
          _id: request._id,
          sender_id: request.sender_id,
          sender: sender ? `${sender.fname} ${sender.lname}` : "Unknown",
          receiver_id: request.receiver_id,
          receiver: receiver
            ? `${receiver.fname} ${receiver.lname}`
            : "Unknown",
          ch_id: request.ch_id,
          ch_name: challenge ? challenge.name : "Unknown",
          timestamp: request.timestamp,
        };
      })
    );

    res.status(200).json(requestData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getMessagesForUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const requests = await Request.find({
      receiver_id: userId,
      status_id: "65ae694a4f100d519f1ea238",
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ msg: "Requests not found" });
    }

    const uniqueRequests = {};

    requests.forEach((request) => {
      const key = `${request.receiver_id}-${request.sender_id}-${request.ch_id}`;
      if (!uniqueRequests[key]) {
        uniqueRequests[key] = {
          sender_id: request.sender_id,
          receiver_id: request.receiver_id,
          ch_id: request.ch_id,
          timestamp: request.timestamp,
        };
      }
    });

    const requestData = await Promise.all(
      Object.values(uniqueRequests).map(async (uniqueRequest) => {
        const sender = await names.findById(uniqueRequest.sender_id);
        const receiver = await names.findById(uniqueRequest.receiver_id);
        const challenge = await chName.findById(uniqueRequest.ch_id);

        return {
          sender_id: uniqueRequest.sender_id,
          sender: sender ? `${sender.fname} ${sender.lname}` : "Unknown",
          receiver_id: uniqueRequest.receiver_id,
          receiver: receiver
            ? `${receiver.fname} ${receiver.lname}`
            : "Unknown",
          ch_id: uniqueRequest.ch_id,
          ch_name: challenge ? challenge.name : "Unknown",
          timestamp: uniqueRequest.timestamp,
        };
      })
    );

    res.status(200).json(requestData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const requestAccept = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const requestDecline = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
