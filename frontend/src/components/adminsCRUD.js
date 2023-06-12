import '../css/adminsCRUD.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* Retrieve admins from server */
async function getAdmins() {
    const admins = await fetch("http://localhost:8000/admins", { cache: "reload" })
        .then(response => response.json());

    return admins;
}

/* Administration page */
function AdminsCRUD({ admin }) {
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const adminsPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [password, setPassword] = useState('');
    const [adminIdToRemove, setAdminIdToRemove] = useState(null);

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [editAdminName, setEditAdminName] = useState('');
    const [editAdminEmail, setEditAdminEmail] = useState('');
    const [editAdminPhone, setEditAdminPhone] = useState('');
    const [editAdminPassword, setEditAdminPassword] = useState('');
    const [showEditOverlay, setShowEditOverlay] = useState(false);

    let navigate = useNavigate();

    if (!admin) {
        useEffect(() => {
            navigate("/");
        });
        return;
    }

    useEffect(() => {
        getAdmins()
            .then(administrators => { setAdmins(administrators) })
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

    if (admins.length === 0) {
        return (
            <div className="adminsCRUD-page">
                <div className="layer">
                    <div className="adminsCRUD-container">
                        <div className="title"> Administration </div>
                        <div className="container"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveAdminClick = (adminId) => {
        if (adminId === 0 || admin.id === adminId) {
            alert("Cannot remove main admin or yourself.");
        } else {
            setAdminIdToRemove(adminId);
            setShowRemoveOverlay(true);
        }
    };

    const handleCreateAdminClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditAdminClick = (admin) => {
        setSelectedAdmin(admin);
        setEditAdminName(admin.name);
        setEditAdminEmail(admin.email);
        setEditAdminPhone(admin.phone);
        setEditAdminPassword(admin.password);
        setShowEditOverlay(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRemoveAdminSubmit = () => {

        if (admin.password === password) {
            const updatedAdmins = admins.filter((admin) => admin.id !== adminIdToRemove);
            setAdmins(updatedAdmins);
            setShowRemoveOverlay(false);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    const handleCreateAdminSubmit = () => {
        // Perform validation for the new admin inputs
        if (
            editAdminName.trim() === '' ||
            editAdminEmail.trim() === '' ||
            editAdminPhone.trim() === '' ||
            editAdminPassword.trim() === ''
        ) {
            alert('Please fill in all the fields.');
            return;
        }

        const newAdmin = {
            id: admins.length,
            name: editAdminName,
            email: editAdminEmail,
            phone: editAdminPhone,
            password: editAdminPassword,
        };

        const updatedAdmins = [...admins, newAdmin];
        setAdmins(updatedAdmins);

        setEditAdminName('');
        setEditAdminEmail('');
        setEditAdminPhone('');
        setEditAdminPassword('');

        setShowCreateOverlay(false);
    };

    const handleEditAdminNameChange = (event) => {
        setEditAdminName(event.target.value);
    };

    const handleEditAdminEmailChange = (event) => {
        setEditAdminEmail(event.target.value);
    };

    const handleEditAdminPhoneChange = (event) => {
        setEditAdminPhone(event.target.value);
    };

    const handleEditAdminPasswordChange = (event) => {
        setEditAdminPassword(event.target.value);
    };

    const handleEditAdminSubmit = () => {
        // Perform validation for the edited admin inputs
        if (
            editAdminName.trim() === '' ||
            editAdminEmail.trim() === '' ||
            editAdminPhone.trim() === '' ||
            editAdminPassword.trim() === ''
        ) {
            alert('Please fill in all the fields.');
            return;
        }

        const updatedAdmins = [...admins];
        const index = updatedAdmins.findIndex((admin) => admin.id === selectedAdmin.id);

        updatedAdmins[index] = {
            ...selectedAdmin,
            name: editAdminName,
            email: editAdminEmail,
            phone: editAdminPhone,
            password: editAdminPassword,
        };

        setAdmins(updatedAdmins);

        setEditAdminName('');
        setEditAdminEmail('');
        setEditAdminPhone('');
        setEditAdminPassword('');

        setShowEditOverlay(false);
    };

    // Logic for displaying admins
    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

    return (
        <div className="adminsCRUD-page">
            <div className="layer">
                <div className="adminsCRUD-container">
                    <div className="title">Administration</div>
                    <div className="container">
                        <div className="administration-text"> Admins </div>
                        {currentAdmins.map((admin, index) => (
                        <div className={`admin-${index + 1}`} key={admin.id}>
                            <div className="text" onClick={() => handleEditAdminClick(admin)}>
                            id: {admin.id}, name: {admin.name}, e-mail: {admin.email}
                            </div>
                            <div className="remove-admin" onClick={() => handleRemoveAdminClick(admin.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                            </div>
                        </div>
                        ))}
                        <div className="create-admin-button" onClick={handleCreateAdminClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                        {/* Pagination system for multiple admins */}
                        <div className="pagination">
                        {Array.from({ length: Math.ceil(admins.length / adminsPerPage) }, (_, i) => (
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
                        <h2>Remove Admin</h2>
                        <p>Are you sure you want to remove this admin?</p>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="button-group">
                            <button onClick={handleRemoveAdminSubmit}>Confirm</button>
                            <button onClick={() => setShowRemoveOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Create Admin</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={handleEditAdminNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={handleEditAdminEmailChange}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            onChange={handleEditAdminPhoneChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handleEditAdminPasswordChange}
                        />
                        <div className="button-group">
                            <button onClick={handleCreateAdminSubmit}>Create</button>
                            <button onClick={() => setShowCreateOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit Admin</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editAdminName}
                            onChange={handleEditAdminNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={editAdminEmail}
                            onChange={handleEditAdminEmailChange}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={editAdminPhone}
                            onChange={handleEditAdminPhoneChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={editAdminPassword}
                            onChange={handleEditAdminPasswordChange}
                        />
                        <div className="button-group">
                            <button onClick={handleEditAdminSubmit}>Save</button>
                            <button onClick={() => setShowEditOverlay(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminsCRUD;
