import '../css/usersCRUD.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Retrieve users from server */
async function getUsers() {
    const users = await fetch("http://localhost:8000/users", {cache: "reload"})
                            .then(response => response.json());

    return users;
}

/* Admininistration page */
function UsersCRUD({ admin }){

    const [users, setUsers] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [password, setPassword] = useState('');
    const [userIdToRemove, setUserIdToRemove] = useState(null);

    const [showEditOverlay, setShowEditOverlay] = useState(false);

    let navigate = useNavigate();
    
    if (!admin) {
        useEffect(() => {
            navigate("/");
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

    if (users.length === 0) {
        return (
            <div className="usersCRUD-page">
            <div class="layer">
                <div class="usersCRUD-container">
                    <div class="title"> Administration </div>

                    <div className="container">
                        
                    </div>
                </div>
            </div>
        </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveUserClick = (productId) => {
        setUserIdToRemove(productId);
        setShowRemoveOverlay(true);
    };

    const handleCreateUserClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditUserClick = (album) => {
        setShowEditOverlay(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRemoveUserSubmit = () => {

        if (admin.password === password) {
            const updatedUsers = users.filter((user) => user.id !== userIdToRemove);
            setUsers(updatedUsers);
            setShowRemoveOverlay(false);
        } else {
            alert('Incorrect password. Please try again.');
        }
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
                        {currentUsers.map((user, index) => (
                            <div className={`user-${index + 1}`}>
                                <div className="text" onClick={() => handleEditUserClick(user.id)}>
                                    id: {user.id}, name: {user.name}, e-mail: {user.email} 
                                </div>
                                <div className="remove-user" onClick={() => handleRemoveUserClick(user.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg"fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
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
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
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
                        
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit User</h2>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersCRUD;