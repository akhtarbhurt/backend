const logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    // Respond with a success message
    console.log("runninglogout")
    res.json({ message: 'Logout successful' });
  };
  

  export default logout