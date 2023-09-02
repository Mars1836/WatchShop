import passport from "passport";
const authCtrl = {
  login: passport.authenticate("local_dashboard", {
    // This middleware will be called after successful authentication
    successRedirect: "/api/dashboard/login-success",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginSuccess: (req, res) => {
    res.status(200).json({
      user: req.user, // Assuming req.user holds the user's data after login
    });
  },
  verifyLogin: async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json("not auth");
        return;
      }

      res.status(200).json(req.user);
    } catch (error) {
      res.status(500).json({ error: error?.message || error });
    }
  },
  logout: async (req, res) => {
    req.logout(function (error) {
      if (error) {
        res.status(500).json({ error: error?.message || error });
      }
      return;
    });
    res.status(200).json({ message: "Logout success!" });
  },
};
export default authCtrl;
