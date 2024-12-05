import Comment from "../models/comment.model.js";
import { commentErrorCodes } from "../utils/errorCodes/comment.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const saveComment = async (comment, userId) => {
  try {
    const newComment = new Comment({ ...comment, userId: userId });
    if (!newComment)
      throw new ServiceError(
        "Comment not created",
        commentErrorCodes.COMMENT_NOT_CREATED
      );
    await newComment.save();
    return newComment;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || commentErrorCodes.COMMENT_NOT_FOUND
    );
  }
};

export const getComments = async (undertakingId) => {
  try {
    const comments = await Comment.find({
      undertakingId: undertakingId,
    }).populate("userId", "name");

    if (!comments)
      throw new ServiceError(
        "Comments not found",
        commentErrorCodes.COMMENT_NOT_FOUND
      );
    return comments || [];
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || commentErrorCodes.COMMENT_NOT_FOUND
    );
  }
};

export const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment)
      throw new ServiceError(
        "Comment not found",
        commentErrorCodes.COMMENT_NOT_FOUND
      );
    return comment;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || commentErrorCodes.COMMENT_NOT_FOUND
    );
  }
};

export const updateComment = async (commentId, description) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { description },
      { new: true }
    );
    if (!comment)
      throw new ServiceError(
        "Comment not found",
        commentErrorCodes.COMMENT_NOT_FOUND
      );
    return comment;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || commentErrorCodes.COMMENT_NOT_FOUND
    );
  }
};
