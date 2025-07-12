import React, { useState } from 'react';

const UploadForm = () => {
    // State to manage all form data
    const [formData, setFormData] = useState({
        outfitImage: null, // Stores the File object for upload
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        tags: [],        // Array to store multiple tags
        isAvailable: true, // Default value as per schema
        points: 100,      // Default value as per schema
        // Owner, isApproved, swapRequestedBy, redeemedBy will be handled by the backend
    });

    // State for the individual tag input field
    const [tagInput, setTagInput] = useState('');

    // Handles changes for all text, number, select, and checkbox inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            // For checkboxes, use 'checked' value; otherwise, use 'value'
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handles file input change specifically for the OutfitImage
    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            outfitImage: e.target.files[0] // Get the first selected file
        }));
    };

    // Handles adding tags when the user presses Enter in the tag input field
    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault(); // Prevent form submission
            const newTag = tagInput.trim();
            // Add tag only if it's not a duplicate
            if (!formData.tags.includes(newTag)) {
                setFormData(prevData => ({
                    ...prevData,
                    tags: [...prevData.tags, newTag] // Add new tag to the tags array
                }));
                setTagInput(''); // Clear the tag input field
            }
        }
    };

    // Handles removing an existing tag
    const handleRemoveTag = (tagToRemove) => {
        setFormData(prevData => ({
            ...prevData,
            tags: prevData.tags.filter(tag => tag !== tagToRemove) // Filter out the tag to be removed
        }));
    };

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send both text data and the file
        const dataToSend = new FormData();

        // Append file if selected
        if (formData.outfitImage) {
            dataToSend.append('outfitImage', formData.outfitImage);
        }

        // Append all other form fields
        dataToSend.append('title', formData.title);
        dataToSend.append('description', formData.description);
        dataToSend.append('category', formData.category);
        dataToSend.append('type', formData.type);
        dataToSend.append('size', formData.size);
        dataToSend.append('condition', formData.condition);
        // Stringify the tags array as FormData doesn't directly handle arrays
        dataToSend.append('tags', JSON.stringify(formData.tags));
        dataToSend.append('isAvailable', formData.isAvailable);
        dataToSend.append('points', formData.points);

        // Owner ID will typically be added by the backend from the authenticated user's session/token.
        // For demonstration, if you wanted to include a static owner for testing:
        // dataToSend.append('owner', 'someStaticOwnerId123');

        // Log FormData content for debugging (won't show file content directly)
        console.log('--- Form Data to be sent (FormData object) ---');
        for (let pair of dataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        console.log('-------------------------------------------');


        // *** MERN Stack Integration (Example Fetch API Call) ***
        try {
            // Replace '/api/items' with your actual backend API endpoint for creating items
            const response = await fetch('/api/items', {
                method: 'POST',
                body: dataToSend, // FormData is automatically handled by fetch for 'multipart/form-data'
                // Do NOT set 'Content-Type': 'multipart/form-data' header manually
                // as fetch with FormData handles it automatically, including the boundary.
            });

            if (response.ok) {
                const result = await response.json();
                alert('Item uploaded successfully!');
                console.log('Upload success:', result);
                // Optionally clear the form after successful submission
                setFormData({
                    outfitImage: null,
                    title: '',
                    description: '',
                    category: '',
                    type: '',
                    size: '',
                    condition: '',
                    tags: [],
                    isAvailable: true,
                    points: 100,
                });
                setTagInput(''); // Clear tag input
            } else {
                const errorData = await response.json();
                alert(`Failed to upload item: ${errorData.message || 'Unknown error'}`);
                console.error('Upload error:', errorData);
            }
        } catch (error) {
            console.error('Network or submission error:', error);
            alert('An error occurred during submission. Please check your network connection.');
        }
    };

    return (
        // Main container with lemon green background and centered content
        <div className="min-h-screen bg-lime-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Form card with white background and rounded corners */}
            <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-xl my-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Upload New Item</h2>
                <form onSubmit={handleSubmit}>
                    {/* OutfitImage */}
                    <div className="mb-6">
                        <label htmlFor="outfitImage" className="block text-gray-800 text-sm font-semibold mb-2">
                            Outfit Image <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="file"
                            id="outfitImage"
                            name="outfitImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5 text-sm
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-md file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-indigo-50 file:text-indigo-700
                                       hover:file:bg-indigo-100"
                            required
                        />
                        <p className="text-gray-600 text-xs mt-1">Upload a clear image of the item.</p>
                    </div>

                    {/* Owner (Read-only, backend will populate) */}
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-semibold mb-2">Owner ID</label>
                        <input
                            type="text"
                            value="Will be populated by backend (Logged-in User ID)"
                            readOnly
                            disabled
                            className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <p className="text-gray-600 text-xs mt-1">This field is automatically populated by your user ID upon upload.</p>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-800 text-sm font-semibold mb-2">
                            Title <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Stylish Blue Denim Jacket"
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <p className="text-gray-600 text-xs mt-1">A short, descriptive title for your item.</p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-800 text-sm font-semibold mb-2">
                            Description <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="e.g., Worn twice, no visible flaws. Perfect for a casual spring look with jeans or a dress."
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                            required
                        ></textarea>
                        <p className="text-gray-600 text-xs mt-1">Provide a detailed description of the item, including any notable features or conditions.</p>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-gray-800 text-sm font-semibold mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Outerwear, Casual Wear"
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-gray-600 text-xs mt-1">General category (e.g., Clothing, Accessories, Footwear).</p>
                    </div>

                    {/* Type */}
                    <div className="mb-6">
                        <label htmlFor="type" className="block text-gray-800 text-sm font-semibold mb-2">Type</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="e.g., shirt, jeans, dress"
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-gray-600 text-xs mt-1">Specific type of item (e.g., T-shirt, Jeans, Sneakers).</p>
                    </div>

                    {/* Size */}
                    <div className="mb-6">
                        <label htmlFor="size" className="block text-gray-800 text-sm font-semibold mb-2">Size</label>
                        <select
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option value="">Select Size</option>
                            <option value="xs">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                            <option value="one size">One Size</option>
                        </select>
                        <p className="text-gray-600 text-xs mt-1">Select the size of the item.</p>
                    </div>

                    {/* Condition */}
                    <div className="mb-6">
                        <label htmlFor="condition" className="block text-gray-800 text-sm font-semibold mb-2">
                            Condition <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="condition"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                        >
                            <option value="">Select Condition</option>
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                        <p className="text-gray-600 text-xs mt-1">How would you describe the item's condition?</p>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                        <label htmlFor="tagsInput" className="block text-gray-800 text-sm font-semibold mb-2">Tags (Press Enter to add)</label>
                        <div className="flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 rounded-lg min-h-[40px] items-center">
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex items-center bg-lime-100 text-lime-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                                    <span>{tag}</span>
                                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-lime-800 hover:text-lime-900 focus:outline-none text-base">
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                id="tagsInput"
                                className="flex-grow min-w-[100px] bg-transparent outline-none text-gray-900 placeholder-gray-400"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="e.g., summer, vintage, cotton"
                            />
                        </div>
                        <p className="text-gray-600 text-xs mt-1">Add keywords to make your item easily searchable.</p>
                    </div>

                    {/* isApproved (Admin only, disabled for user input) */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="isApproved"
                            name="isApproved"
                            checked={false} // Always false from user side
                            disabled // Users cannot approve items
                            className="h-4 w-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500 cursor-not-allowed"
                        />
                        <label htmlFor="isApproved" className="ml-2 text-gray-700 text-sm font-medium">Item Approved (Admin Only)</label>
                        <p className="text-gray-600 text-xs mt-1 ml-6">This status is set by an administrator after review.</p>
                    </div>

                    {/* isAvailable */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            className="h-4 w-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
                        />
                        <label htmlFor="isAvailable" className="ml-2 text-gray-700 text-sm font-medium">Item Available for Swap/Redeem</label>
                        <p className="text-gray-600 text-xs mt-1 ml-6">Uncheck if the item is temporarily unavailable.</p>
                    </div>

                    {/* Points */}
                    <div className="mb-8">
                        <label htmlFor="points" className="block text-gray-800 text-sm font-semibold mb-2">
                            Points Value <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"
                            id="points"
                            name="points"
                            value={formData.points}
                            onChange={handleChange}
                            min="1"
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <p className="text-gray-600 text-xs mt-1">The point value for this item (minimum 1).</p>
                    </div>

                    {/* SwapRequestedBy & RedeemedBy (System managed, no user input) */}
                    <div className="mb-8">
                        <label className="block text-gray-800 text-sm font-semibold mb-2">Swap Requests & Redemption Status</label>
                        <p className="text-gray-600 text-xs">These fields are updated automatically by the system when swaps are requested or items are redeemed.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Upload Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;