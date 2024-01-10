export default {
  fync: {
    auth: {
      register: {
        url: "https://fync.in/oauth2/login",
      },
      token: {
        method: "POST",
        url: "https://fync.in/api/oauth/token",
      },
    },
    me: {
      url: "https://api.fync.in/users/me",
    },
  },
};
