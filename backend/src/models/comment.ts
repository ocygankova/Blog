import { InferSchemaType, model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    blogPostId: { type: Schema.Types.ObjectId, required: true },
    parentCommentId: { type: Schema.Types.ObjectId },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
  },

  { timestamps: true }
);

type Comment = InferSchemaType<typeof commentSchema>;

export default model<Comment>('Comment', commentSchema);
