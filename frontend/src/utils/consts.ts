interface IMaxLengths {
  userName: number;
  userDisplayName: number;
  userAbout: number;
  postTitle: number;
  postSlug: number;
  postSummary: number;
}

export const maxLengths: IMaxLengths = {
  userName: 20,
  userDisplayName: 40,
  userAbout: 200,
  postTitle: 100,
  postSlug: 100,
  postSummary: 300,
};

export const verificationCodeRequestTimeoutSeconds = 60;
