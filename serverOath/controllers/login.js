export const userSuccess = async (req, res) => {
    res.cookie("user", req.user.id, {expires: new Date(Date.now() + 6048000)});
    res.redirect('http://localhost:3000/auth');
}