const Announcement = require("../../../models/Announcement");
const Class = require("../../../models/Class");
const mongoose = require("mongoose");
const {
  INVALID_CLASS_ID,
  INTERNAL_SERVER_ERROR,
} = require("../../../utils/Constants");

module.exports.createAnnouncement = async (req, res) => {
  try {
    //fetch content from request body
    const { content } = req.body;

    //fetch class id in which announcement is to be created
    const classId = req.params.classId;

    //create a new announcement
    const newAnnouncement = await Announcement.create({
      user: req.user._id,
      classId,
      content,
    });

    //also push the new announcement to the class schema
    const requestedClass = await Class.findById(classId);
    requestedClass.announcements.push(newAnnouncement);
    await requestedClass.save();

    res.json({
      message: "SUCCESS",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.fetchAnnouncements = async (req, res) => {
  try {
    //fetch class id in which announcements are to be fetched
    const classId = req.params.classId;

    //check if the class id is a valid object id
    const isValidClassId = mongoose.Types.ObjectId.isValid(classId);

    if (!isValidClassId) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = "404";
      throw error;
    }

    //fetch announcements for thr given class id

    const announcements = await Class.findById(classId)
      .select("announcements")
      .populate([
        {
          path: "announcements",
          populate: { path: "user", select: "id name email picture" },
        },
      ]);

    if (!announcements) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = 404;
      throw error;
    }
    //sort the announcements in descending order
    announcements.announcements.sort((a, b) => {
      if (
        new Date(a.createdAt).toISOString() >
        new Date(b.createdAt).toISOString()
      )
        return -1;
      else return 1;
    });

    res.json({
      data: {
        announcements: announcements.announcements,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else res.status(500).send(INTERNAL_SERVER_ERROR);
    console.log(error);
  }
};
