import mongoose from 'mongoose';

export async function destroyAllActiveSessionsForUser(userId: string) {
  const regex = new RegExp('^' + userId);
  // access collection created by passport
  await mongoose.connection.db
    .collection('sessions')
    .deleteMany({ _id: regex });
}
