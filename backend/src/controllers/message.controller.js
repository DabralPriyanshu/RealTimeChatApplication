import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in get all contacts controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat },
        { senderId: userToChat, receiverId: myId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get message by user id controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send message controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //find all the messages in which  sender is logggedInUser or receiver is loggedInUser
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];
    console.log(chatPartnerIds);
    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");
    console.log(chatPartners);

    return res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in get chat partners controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
