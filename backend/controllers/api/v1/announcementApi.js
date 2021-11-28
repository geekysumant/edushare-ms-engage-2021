const Announcement = require("../../../models/Announcement");
const Class = require("../../../models/Class");
const mongoose = require("mongoose");
const {
  INVALID_CLASS_ID,
  INTERNAL_SERVER_ERROR,
  INVALID_ANNOUNCEMENT_ID,
} = require("../../../utils/Constants");

//  CONTROLLER: createAnnouncement
//  DESC.: This method creates a new announcement/post in the class
module.exports.createAnnouncement = async (req, res) => {
  try {
    //fetch content from request body
    const { content } = req.body;

    //fetch class id in which announcement is to be created
    const classId = req.params.classId;

    const isValidClassId = mongoose.Types.ObjectId.isValid(classId);
    if (!isValidClassId) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = 404;
      throw error;
    }

    //find and push the new announcement to the class schema
    const requestedClass = await Class.findById(classId);

    if (!requestedClass) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = 404;
      throw error;
    }

    //create a new announcement
    const newAnnouncement = await Announcement.create({
      user: req.user._id,
      classId,
      content,
    });

    requestedClass.announcements.push(newAnnouncement);
    await requestedClass.save();

    res.json({
      message: "SUCCESS",
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else res.status(500).send(error.message);
  }
};

//  CONTROLLER: fetchAnnouncements
//  DESC.: This method fetches all the announcements/posts in a classroom
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

    //fetch announcements for the given class id

    const announcements = await Class.findById(classId)
      .select("announcements users createdBy")
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
    if (
      !announcements.users.includes(req.user._id) &&
      !announcements.createdBy.equals(req.user._id)
    ) {
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
  }
};

//  CONTROLLER: deleteAnnouncement
//  DESC.: This method deletes an announcement requested by user
module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;
    const isValidAnnouncementId =
      mongoose.Types.ObjectId.isValid(announcementId);
    if (!isValidAnnouncementId) {
      const error = new Error(INVALID_ANNOUNCEMENT_ID);
      error.code = 404;
      throw error;
    }

    const announcementToDelete = await Announcement.findOneAndDelete({
      user: req.user._id,
      _id: announcementId,
    });
    if (!announcementToDelete) {
      const error = new Error(INVALID_ANNOUNCEMENT_ID);
      error.code = 404;
      throw error;
    }

    res.json({
      message: "SUCCESS",
    });
  } catch (error) {
    if (error.code) {
      res.send(error.code).send(error.message);
    } else res.send(500).send(INTERNAL_SERVER_ERROR);
  }
};
