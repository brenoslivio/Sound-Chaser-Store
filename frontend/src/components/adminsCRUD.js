import '../css/adminsCRUD.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Retrieve admins from server */
async function getAdmins() {
    const admins = await fetch("http://localhost:8000/admins", { cache: "reload" })
        .then(response => response.json());

    return admins;
}

/* Administration page */
function AdminsCRUD({ userAdmin }) {
    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const adminsPerPage = 4;

    const [showRemoveOverlay, setShowRemoveOverlay] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);

    const [selectedAdmin, setSelectedAdmin] = useState(null);

    let navigate = useNavigate(); 

    if (!userAdmin) {
        useEffect(() => {
            navigate("/admin");
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

    useEffect(() => {
        if (showEditOverlay) {
            document.getElementById("edit-admin-name").value = selectedAdmin.name;
            document.getElementById("edit-admin-email").value = selectedAdmin.email;
            document.getElementById("edit-admin-phone").value = selectedAdmin.phone;
            document.getElementById("edit-admin-password").value = selectedAdmin.password;
        }
    }, [showEditOverlay]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemoveAdminClick = (admin) => {
        if (admin.id === 0 || userAdmin.id === admin.id) {
            alert("Cannot remove main admin or yourself.");
        } else {
            setSelectedAdmin(admin);
            setShowRemoveOverlay(true);
        }
    };

    const handleCreateAdminClick = () => {
        setShowCreateOverlay(true);
    };

    const handleEditAdminClick = (admin) => {
        setSelectedAdmin(admin);
        setShowEditOverlay(true);
    };

    const handleRemoveAdminSubmit = async () => {
        try {
            await fetch(`http://localhost:8000/admins/${selectedAdmin.id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
            });
        
            console.log('Admin deleted successfully');
        
            const updatedAdmins = admins.filter((admin) => admin.id !== selectedAdmin.id);
            setAdmins(updatedAdmins);
        
            const lastPageIndex = Math.ceil(updatedAdmins.length / 4);
            if (currentPage > lastPageIndex) {
                setCurrentPage(lastPageIndex);
            }
        
            setShowRemoveOverlay(false);
        } catch (error) {
          console.error('Error deleting admin:', error);
          // Handle the error
        }
    };
      
    const handleCreateAdminSubmit = async () => {
        // Perform validation for the new admin inputs
        const name = document.getElementById("create-admin-name").value;
        const email = document.getElementById("create-admin-email").value;
        const phone = document.getElementById("create-admin-phone").value;
        const password = document.getElementById("create-admin-password").value;
    
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
    
        const lastAdminId = admins.length > 0 ? admins[admins.length - 1].id : 0;
        const newAdmin = {
            id: lastAdminId + 1,
            name: name,
            email: email,
            phone: phone,
            password: password,
        };
    
        try {
            const response = await fetch(`http://localhost:8000/admins`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAdmin),
            });
        
            if (!response.ok) {
                throw new Error('Error creating admin');
            }
        
            const data = await response.json();
            console.log('Admin created successfully:', data);
            // Handle the created admin data
        
            const updatedAdmins = [...admins, newAdmin];
            setAdmins(updatedAdmins);
        
            setShowCreateOverlay(false);
        } catch (error) {
            console.error('Error creating admin:', error);
            // Handle the error
        }
    };
      
    const handleEditAdminSubmit = async () => {
        // Perform validation for the edited admin inputs
        const name = document.getElementById("edit-admin-name").value;
        const email = document.getElementById("edit-admin-email").value;
        const phone = document.getElementById("edit-admin-phone").value;
        const password = document.getElementById("edit-admin-password").value;

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

        const updatedAdmins = [...admins];
        const index = updatedAdmins.findIndex((admin) => admin.id === selectedAdmin.id);

        updatedAdmins[index] = {
            ...selectedAdmin,
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        try {
            const response = await fetch(`http://localhost:8000/admins/${selectedAdmin.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAdmins[index]),
            });
        
            if (!response.ok) {
                throw new Error('Error updating admin');
            }
        
            const data = await response.json();
            console.log('Admin updated successfully:', data);
            // Handle the updated admin data
        
            setAdmins(updatedAdmins);
        
            setShowEditOverlay(false);
        } catch (error) {
            console.error('Error updating admin:', error);
            // Handle the error
        }
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
                    {/* Navigation in admin area */}
                    <div className="navigation-buttons">
                        <button onClick={() => navigate("/admin/products")} className="products-btn" >Products</button>
                        <button onClick={() => navigate("/admin/users")} className="users-btn" >Users</button>
                        <button onClick={() => navigate("/admin/admins")} className="admins-btn" >Admins</button>
                    </div>
                    <div className="container">
                        <div className="administration-text"> Admins </div>
                        {currentAdmins ? (currentAdmins.map((admin, index) => (
                        <div className={`admin-${index + 1}`} key={admin.id}>
                            <div className="text">
                            id: {admin.id} &emsp; &emsp; name: {admin.name}
                            </div>
                            <div className="remove-admin" onClick={() => handleRemoveAdminClick(admin)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                            </div>
                            <div className="edit-admin" onClick={() => handleEditAdminClick(admin)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#72366f" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </div>
                        </div>
                        ))) : null}
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
                        <div className="input-group">
                            <label htmlFor="create-admin-name">Name</label>
                            <input
                            type="text"
                            placeholder="Name"
                            id="create-admin-name"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-admin-email">E-mail</label>
                            <input
                            type="text"
                            placeholder="E-mail"
                            id="create-admin-email"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-admin-phone">Phone</label>
                            <input
                            type="text"
                            placeholder="Phone"
                            id="create-admin-phone"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="create-admin-password">Password</label>
                            <input
                            type="password"
                            placeholder="Password"
                            id="create-admin-password"
                            />
                        </div>
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
                        <div className="input-group">
                            <label htmlFor="edit-admin-name">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                id="edit-admin-name"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-admin-email">E-mail</label>
                            <input
                                type="text"
                                placeholder="E-mail"
                                id="edit-admin-email"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-admin-phone">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                id="edit-admin-phone"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit-admin-password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                id="edit-admin-password"
                            />
                        </div>
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
