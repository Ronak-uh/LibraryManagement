const User = require('../models/User');

getAllUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

getUserById = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

createUser = async (request, response) => {
    try {
        const { name, username, email, password, role } = request.body;

        if (!name || !username || !email || !password) {
            return response.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({
            name,
            username,
            email,
            password,
            role
        });

        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return response.status(400).json({ message: "Username or email already exists" });
        }
        response.status(500).json({ message: error.message });
    }
};

updateUser = async (request, response) => {
    try {
        const { name, username, email, password, role } = request.body;
        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            { name, username, email, password, role },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

deleteUser = async (request, response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(request.params.id);

        if (!deletedUser) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;

        if (!username || !password) {
            return response.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return response.status(401).json({ message: "Invalid username or password" });
        }

        if (user.password !== password) {
            return response.status(401).json({ message: "Invalid username or password" });
        }

        response.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
