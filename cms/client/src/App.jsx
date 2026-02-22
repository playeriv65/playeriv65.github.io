import React, { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear().toString(),
    titleEn: '',
    titleZh: '',
    descriptionEn: '',
    descriptionZh: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Saving event...' });

    try {
      let uploadedImageName = null;
      
      // Upload image first if present
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imgData,
        });
        
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadJson = await uploadRes.json();
        uploadedImageName = uploadJson.filename;
      }

      // Submit event data
      const eventRes = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: uploadedImageName
        }),
      });

      if (!eventRes.ok) {
        throw new Error('Failed to save event data');
      }

      setStatus({ type: 'success', message: 'Event successfully published to Timeline!' });
      
      // Reset form
      setFormData({
        year: new Date().getFullYear().toString(),
        titleEn: '',
        titleZh: '',
        descriptionEn: '',
        descriptionZh: ''
      });
      setImageFile(null);
      e.target.reset(); // clear file input visually
      
      // Refresh list
      fetchEvents();

    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Timeline CMS</h1>
        <p className="mt-2 text-lg text-gray-600">Local dashboard to manage static Markdown events</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Event</h2>
          
          {status.message && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${
              status.type === 'error' ? 'bg-red-50 text-red-800' : 
              status.type === 'success' ? 'bg-green-50 text-green-800' : 
              'bg-blue-50 text-blue-800'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input required type="number" name="year" value={formData.year} onChange={handleInputChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                <input required type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Launched App" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (ZH)</label>
                <input required type="text" name="titleZh" value={formData.titleZh} onChange={handleInputChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="例如: 发布应用" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
              <textarea name="descriptionEn" value={formData.descriptionEn} onChange={handleInputChange} rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Detailed description in English..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (ZH)</label>
              <textarea name="descriptionZh" value={formData.descriptionZh} onChange={handleInputChange} rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="中文详细描述..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>

            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md">
              Publish to Timeline
            </button>
          </form>
        </div>

        {/* Existing Events Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col h-[700px]">
          <h2 className="text-xl font-bold mb-6 text-gray-900 flex justify-between items-center">
            Existing Events
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{events.length} total</span>
          </h2>
          
          <div className="overflow-y-auto flex-1 pr-2 space-y-4">
            {events.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No events found in src/content/timeline/</div>
            ) : (
              events.map((event, idx) => (
                <div key={idx} className="p-4 border border-gray-100 hover:border-gray-300 bg-gray-50 rounded-xl transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{event.title.en}</h3>
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.year}</span>
                  </div>
                  <h4 className="text-sm text-gray-600 mb-2">{event.title.zh}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{event.description.en || event.description.zh}</p>
                  {event.image && (
                    <div className="mt-3 inline-flex items-center text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {event.image.split('/').pop()}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
