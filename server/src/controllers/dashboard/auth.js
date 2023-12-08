import passport from "passport";
const db_authCtrl = {
  login: function (req, res, next) {
    passport.authenticate(
      "local_dashboard",

      (err, user, info) => {
        if (user) {
          req.login(user, (err) => {
            if (err) {
              return res.status(500).json(err); // Handle any errors during the login process
            }

            // Now req.user should be defined
            res.redirect("/api/dashboard/login/success");
          });
          return;
        }
        if (err) {
          return res.status(500).json(err);
        }
        res.status(500).json(err, user, info);
      }
    )(req, res, next);
  },
  loginSuccess: (req, res) => {
    res.status(200).json(req.user); // Assuming req.user holds the user's data after login);
  },
  loginFailure: (req, res) => {},
  verifyLogin: async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json("not auth");
        return;
      }
      console.log(req.user);
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
export default db_authCtrl;
