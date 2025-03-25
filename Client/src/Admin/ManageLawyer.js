import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for API requests
import withAuthProtection from "../utils/withAuthProtection";
import withRoleProtection from "../utils/withRoleProtection";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "../Style/ManageUsers.css";
import withAutoLogout from "../utils/withAutoLogout";

function ManageLawyer() {
  document.title = "Manage Lawyers";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const [reason, setReason] = useState("");
  const [banDuration, setBanDuration] = useState(""); // New state for ban duration

  // Fetch all users with role "user" using POST method
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/admin/fetch-users",
          { role: "lawyer" }
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === "ban") {
        await axios.post("http://localhost:5000/api/admin/ban-user", {
          userId: selectedUser._id,
          reason,
          banDuration,
        });
        toast.warning(`User Access Suspended`);
      } else if (actionType === "remove") {
        await axios.post("http://localhost:5000/api/admin/delete-user", {
          userId: selectedUser._id,
          reason: reason || "No reason provided", // Default reason
        });
        toast.success(`User removed successfully`);
      } else if (actionType === "unban") {
        await axios.post("http://localhost:5000/api/admin/unban-user", {
          userId: selectedUser._id,
        });
        toast.success(`Account Restriction Lifted`);
      }

      const response = await axios.post(
        "http://localhost:5000/api/admin/fetch-users",
        { role: "user" }
      );
      setUsers(response.data);
    } catch (err) {
      console.error(
        `Error during ${actionType}:`,
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || `Failed to ${actionType} user`);
      toast.error(
        err.response?.data?.message || `Error during ${actionType} action`
      );
    } finally {
      setReason("");
      setBanDuration("");
      setSelectedUser(null);
      setActionType("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <AdminSidebar />
        <div className="manage-users-container container-fluid mt-4">
          <div className="row">
            <div className="col-12 col-md-9 offset-md-0 manage-users-content">
              <div className="card manage-users-card">
                <div className="card-header manage-users-header">
                  <h4>Manage Lawyers</h4>
                </div>
                <div className="card-body manage-users-body table-responsive">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="text-danger">{error}</p>
                  ) : (
                    <table className="table table-bordered table-striped manage-users-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </td>
                            <td>
                              {!user.isBanned ? (
                                <button
                                  className="btn btn-warning btn-sm mx-1 manage-users-ban-btn"
                                  onClick={() => handleAction(user, "ban")}
                                >
                                  Ban
                                </button>
                              ) : (
                                <button
                                  className="btn btn-secondary btn-sm mx-1 manage-users-unban-btn"
                                  onClick={() => handleAction(user, "unban")}
                                >
                                  Unban
                                </button>
                              )}
                              <button
                                className="btn btn-danger btn-sm mx-1 manage-users-remove-btn"
                                onClick={() => handleAction(user, "remove")}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedUser && (
          <div
            className="manage-users-modal modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
          >
            <div className="modal-dialog manage-users-modal-dialog">
              <div className="modal-content manage-users-modal-content">
                <div className="modal-header manage-users-modal-header">
                  <h5 className="modal-title">
                    {actionType === "ban"
                      ? "Ban User"
                      : actionType === "remove"
                      ? "Remove User"
                      : "Unban User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedUser(null)}
                  ></button>
                </div>
                <div className="modal-body manage-users-modal-body">
                  {actionType === "unban" ? (
                    <p>
                      Are you sure you want to unban{" "}
                      <strong>{selectedUser.username}</strong>?
                    </p>
                  ) : (
                    <>
                      <p>
                        Provide a reason for{" "}
                        {actionType === "ban" ? "banning" : "removing"}{" "}
                        <strong>{selectedUser.username}</strong>:
                      </p>
                      <textarea
                        className="form-control manage-users-textarea"
                        rows="4"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason..."
                      ></textarea>

                      {actionType === "ban" && (
                        <div className="mt-3">
                          <label htmlFor="banDuration">
                            Ban Duration (in minutes):
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="banDuration"
                            value={banDuration}
                            onChange={(e) => setBanDuration(e.target.value)}
                            placeholder="Enter ban duration in minutes"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="modal-footer manage-users-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary manage-users-cancel-btn"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary manage-users-confirm-btn"
                    onClick={handleConfirmAction}
                    disabled={
                      actionType === "unban"
                        ? false
                        : !reason.trim() ||
                          (actionType === "ban" && !banDuration.trim())
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default withAutoLogout(
  withAuthProtection(withRoleProtection(ManageLawyer, ["admin"]))
);
