import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Style/AdminDashboard.css';
import withAuthProtection from '../utils/withAuthProtection';
import withRoleProtection from '../utils/withRoleProtection';
import withAutoLogout from '../utils/withAutoLogout';
import { ChevronDown, ChevronUp } from 'lucide-react';

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showRecentActivity, setShowRecentActivity] = useState(true);
    const [showCharts, setShowCharts] = useState(true);

    document.title = 'Dashboard - LawSync';

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSection = (section) => {
        if (section === 'activity') {
            setShowRecentActivity(!showRecentActivity);
        } else if (section === 'charts') {
            setShowCharts(!showCharts);
        }
    };

    const filteredActivities = [
        { date: '2025-01-01', activity: 'New Client Registered', details: 'John Doe' },
        { date: '2025-01-03', activity: 'Payment Received', details: '$3,000' },
        { date: '2025-01-04', activity: 'Case Updated', details: 'Case #102' },
    ].filter(activity =>
        activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className='edit-profile-container'>
                <AdminSidebar />
                <div className="dashboard-content">
                    <h1>Admin Dashboard</h1>
                    <div className="dashboard-cards">
                        {/* Cards */}
                        <div className="admin-card">
                            <h3 className='admin-h3'>Total Lawyers</h3>
                            <p className='admin-p'>50</p>
                        </div>
                        <div className="admin-card">
                            <h3 className='admin-h3'>Total Clients</h3>
                            <p className='admin-p'>120</p>
                        </div>
                        <div className="admin-card">
                            <h3 className='admin-h3'>Ongoing Cases</h3>
                            <p className='admin-p'>35</p>
                        </div>
                        <div className="admin-card">
                            <h3 className='admin-h3'>Pending Payments</h3>
                            <p className='admin-p'>₹ 12,000</p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="recent-activity">
                        <h2 onClick={() => toggleSection('activity')} style={{ cursor: 'pointer' }}>
                            Recent Activity {showRecentActivity ? <ChevronDown /> : <ChevronUp />}
                        </h2>
                        {showRecentActivity && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="search-bar"
                                />
                                <table className='admin-table'>
                                    <thead className='admin-thead'>
                                        <tr className='admin-tr'>
                                            <th className='admin-th'>Date</th>
                                            <th className='admin-th'>Activity</th>
                                            <th className='admin-th'>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredActivities.map((activity, index) => (
                                            <tr key={index} className='admin-tr'>
                                                <td className='admin-td'>{activity.date}</td>
                                                <td className='admin-td'>{activity.activity}</td>
                                                <td className='admin-td'>{activity.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>

                    {/* Charts or Notifications */}
                    <div className="charts-and-notifications">
                        <h2 onClick={() => toggleSection('charts')}>
                            Charts or Notifications {showCharts ? <ChevronDown /> : <ChevronUp />}
                        </h2>
                        {showCharts && (
                            <>
                                <div className="chart-placeholder">
                                    <h3 className='admin-h3'>Case Status Chart</h3>
                                    <p className='admin-p'>Chart placeholder (e.g., bar or pie chart).</p>
                                </div>
                                <div className="notifications">
                                    <h3 className='admin-h3'>Notifications</h3>
                                    <ul className='admin-ul'>
                                        <li className='admin-li'>Client payment due: Client XYZ</li>
                                        <li className='admin-li'>Upcoming hearing: Case #102</li>
                                        <li className='admin-li'>New lawyer application pending approval.</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withAutoLogout(withAuthProtection(withRoleProtection(Dashboard, ["admin"])));
