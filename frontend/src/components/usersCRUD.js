import '../css/usersCRUD.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Retrieve users from server */
async function getUsers() {
    const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                            .then(response => response.json());

    return users;
}

/* Admininistration page */
function UsersCRUD({ userAdmin }){

    const [users, setUsers] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    
    let navigate = useNavigate(); 

    if (!userAdmin) {
        useEffect(() => {
            navigate("/admin");
        });
        return;
    }

    useEffect(() => {
        getUsers()
        .then(customers => {setUsers(customers)})
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const overlayContent = document.querySelector('.overlay-content');
            if (overlayContent && !overlayContent.contains(e.target)) {
                setShowRemoveOverlay(false);
                setShowCreateOverlay(false);
                setShowEditOverlay(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showRemoveOverlay, showCreateOverlay, showEditOverlay]);

    useEffect(() => {
        if (showEditOverlay) {
            document.getElementById("edit-user-name").value = selectedUser.name;
            document.getElementById("edit-user-email").value = selectedUser.email;
            document.getElementById("edit-user-phone").value = selectedUser.phone;
            document.getElementById("edit-user-password").value = selectedUser.password;
        }
    }, [showEditOverlay]);

    const handleRemoveUserClick = (user) => {
        setSelectedUser(user);
        setShowRemoveOverlay(true);
    };

    const handleCreateUserClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditUserClick = (user) => {
        setSelectedUser(user);
        setShowEditOverlay(true);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveUserSubmit = () => {
        const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setShowRemoveOverlay(false);

        const lastPageIndex = Math.ceil(updatedUsers.length / 4);
        if (currentPage > lastPageIndex) {
            setCurrentPage(lastPageIndex);
        }
    };

    const handleCreateUserSubmit = () => {
        // Perform validation for the new user inputs
        const name = document.getElementById("create-user-name").value;
        const email = document.getElementById("create-user-email").value;
        const phone = document.getElementById("create-user-phone").value;
        const password = document.getElementById("create-user-password").value;

        // Validate name
        if (name.trim().length < 5 || name.trim().length > 32) {
            alert("Name must be between 5 and 32 characters.");
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Validate phone
        if (!/^\d+$/.test(phone)) {
            alert("Phone must contain only digits.");
            return;
        }
        
        // Validate password
        if (password.length < 8 || password.length > 32) {
            alert("Password must be between 8 and 32 characters.");
            return;
        }

        const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUser = {
            id: lastUserId + 1,
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);

        setShowCreateOverlay(false);
    };

    const handleEditUserSubmit = () => {
        // Perform validation for the edited user inputs
        const name = document.getElementById("edit-user-name").value;
        const email = document.getElementById("edit-user-email").value;
        const phone = document.getElementById("edit-user-phone").value;
        const password = document.getElementById("edit-user-password").value;

        // Validate name
        if (name.trim().length < 5 || name.trim().length > 32) {
            alert("Name must be between 5 and 32 characters.");
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Validate phone
        if (!/^\d+$/.test(phone)) {
            alert("Phone must contain only digits.");
            return;
        }
        
        // Validate password
        if (password.length < 8 || password.length > 32) {
            alert("Password must be between 8 and 32 characters.");
            return;
        }

        const updatedUsers = [...users];
        const index = updatedUsers.findIndex((user) => user.id === selectedUser.id);

        updatedUsers[index] = {
            ...selectedUser,
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        setUsers(updatedUsers);

        setShowEditOverlay(false);
    };

    /* Choosing which users to show within the pagination system */
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="usersCRUD-page">
            <div class="layer">
                <div class="usersCRUD-container">
                    <div class="title"> Administration </div>

                    <div className="container">
                        <div class="administration-text"> Users </div>
                        {currentUsers ? (currentUsers.map((user, index) => (
                            <div className={`user-${index + 1}`}>
                                <div className="text">
                                    id: {user.id} &emsp; &emsp; name: {user.name} 
                                </div>
                                <div className="remove-user" onClick={() => handleRemoveUserClick(user)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </div>
                                <div className="edit-user" onClick={() => handleEditUserClick(user)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </div>
                            </div>
                        ))) : null}
                        <div className="create-user-button" onClick={handleCreateUserClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                        {/* Pagination system for multiple users */}
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {showRemoveOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Remove User</h2>
                        <p>Are you sure you want to remove this user?</p>
                        <div className="button-group">
                            <button onClick={handleRemoveUserSubmit}>Confirm</button>
                            <button onClick={() => setShowRemoveOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Create User</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            id="create-user-name"
                        />
                        <input
                            type="text"
                            placeholder="E-mail"
                            id="create-user-email"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            id="create-user-phone"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="create-user-password"
                        />
                        <div className="button-group">
                            <button onClick={handleCreateUserSubmit}>Create</button>
                            <button onClick={() => setShowCreateOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit User</h2>
                        <div className="input-group">
                            <label htmlFor="edit-user-name">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                id="edit-user-name"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-user-email">E-mail</label>
                            <input
                                type="text"
                                placeholder="E-mail"
                                id="edit-user-email"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-user-phone">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                id="edit-user-phone"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-user-password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                id="edit-user-password"
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={handleEditUserSubmit}>Save</button>
                            <button onClick={() => setShowEditOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersCRUD;