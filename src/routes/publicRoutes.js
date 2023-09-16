const routes = {
  users: [
    // login user
    { p: "/login", m: "POST", a: "login" },
    { p: "/register", m: "POST", a: "register" },
    { p: "/verifyToken", m: "PUT", a: "verifyToken" },
  ],
  
};

module.exports = routes;
