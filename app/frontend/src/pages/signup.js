import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit", formData);
        const response = await fetch('https://app-backend-1-0-0.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
            console.log(result.message);
            window.location.reload();
        } else {
            console.log("Error!!!!!!");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Change", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} />
            <input type="email" name="email" onChange={handleChange} />
            <input type="password" name="password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;