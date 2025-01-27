export const signUpController = (authServices) => async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkEmail = await authServices.getUserFromEmail(email);
        if (checkEmail) {
            return res.status(400).json({ message: "User Already Exists", success: false });
        }
        const data = { name, email, password };
        await authServices.signUpUserService(data);
        res.status(200).json({ message: "User registered successfully", success: true });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};

export const logInController = (authServices) => async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkEmail = await authServices.getUserFromEmail(email);
        if (!checkEmail) {
            return res.status(400).json({ message: "User Does Not Exist", success: false });
        }
        const data = { email, password };
        const loggedInData = await authServices.loginService(data, checkEmail);
        res.status(201).json({ message: "Logged in successfully", success: true, data: loggedInData });
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};
