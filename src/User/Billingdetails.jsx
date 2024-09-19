import { Fragment, useRef, useState } from 'react'
import { sendSMS } from '@/Service/auth.service'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Loader = () => (
    <div className="flex justify-center items-center">
        <div className="loader"></div>
    </div>
);

export default function Billingdetails() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        file: null,
        campaignName: '',
        text: '',
        sender: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files, } = e.target;
        if (name === 'file') {
            setFormData({
                ...formData,
                file: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent further clicks if already loading
        setLoading(true);

        const { file, campaignName, text, sender } = formData;

        if (!file || !campaignName || !text || !sender) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        try {
            const response = await sendSMS(file, campaignName, text, sender);
            alert('SMS sent successfully:', response);
            setFormData({
                file: null,
                campaignName: '',
                text: '',
                sender: '',
            });
            // Clear the file input field
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Failed to send SMS:', error);
            alert('Failed to send SMS');
        }
        finally {
            setLoading(false);
        }
    };

    const handleLogoutUser = () => {
        // Ensure all relevant cookies are cleared
        Cookies.remove('token');
        navigate('/');
    };


    return (
        <Fragment>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Details</h2>
                        <button onClick={handleLogoutUser} className='bg-neutral-500 px-2 py-1 rounded text-white text-sm '>Logout</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="campaignName" className="block text-gray-700 font-medium mb-2">Campaign Name</label>
                            <input
                                type="text"
                                name="campaignName"
                                value={formData.campaignName}
                                onChange={handleChange}
                                className="w-full text-sm px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter campaign name"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Sender id</label>
                            <input
                                name="sender"
                                placeholder="Enter the sender id"
                                value={formData.sender}
                                onChange={handleChange}
                                className="w-full text-sm px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            />
                        </div>

                        <div className="mb-6 relative">
                            <label htmlFor="text" className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                name="text"
                                placeholder="Type the message here"
                                value={formData.text}
                                onChange={handleChange}
                                rows={3}
                                cols={2}
                                className="w-full text-sm px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            />
                        </div>

                        <div className="mb-6 relative">
                            <label htmlFor="text" className="block text-gray-700 font-medium mb-2">Upload files</label>
                            <input
                                type="file"
                                name="file"
                                accept=".xls,.xlsx"
                                onChange={handleChange}
                                className="w-full text-sm px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-800 font-semibold text-white py-2 rounded"
                        >Send Sms
                        </button>
                    </form>
                    <div className="mt-4">
                        {loading && <Loader />}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}