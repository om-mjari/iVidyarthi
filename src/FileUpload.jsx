import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov'];
      if (!allowedTypes.includes(file.type)) {
        setUploadStatus('❌ Invalid file type. Only images and videos are allowed.');
        return;
      }
      
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        setUploadStatus('❌ File too large. Maximum size is 50MB.');
        return;
      }

      setSelectedFile(file);
      setUploadStatus('');
    }
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('❌ Please select a file first.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('📤 Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadStatus('✅ File uploaded successfully!');
        setUploadProgress(100);
        
        // Add to uploaded files list
        setUploadedFiles(prev => [...prev, {
          id: result.fileId,
          name: result.filename,
          size: result.size,
          type: result.mimetype,
          uploadedAt: new Date().toISOString()
        }]);
        
        // Reset form
        setSelectedFile(null);
        document.getElementById('fileInput').value = '';
      } else {
        setUploadStatus(`❌ Upload failed: ${result.message}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Upload error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Load uploaded files on component mount
  React.useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/files`);
      const result = await response.json();
      
      if (result.success) {
        setUploadedFiles(result.data.map(file => ({
          id: file._id,
          name: file.filename,
          size: file.length,
          type: file.metadata?.mimetype || 'unknown',
          uploadedAt: file.uploadDate
        })));
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    return '📄';
  };

  // Delete file
  const handleDelete = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
        setUploadStatus('✅ File deleted successfully!');
      } else {
        setUploadStatus(`❌ Delete failed: ${result.message}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Delete error: ${error.message}`);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <h2>📁 File Upload Manager</h2>
        <p>Upload videos and images for your courses</p>
        
        <div className="upload-form">
          <div className="file-input-wrapper">
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="fileInput" className="file-input-label">
              📎 Choose File
            </label>
          </div>
          
          {selectedFile && (
            <div className="selected-file">
              <div className="file-info">
                <span className="file-icon">{getFileIcon(selectedFile.type)}</span>
                <div className="file-details">
                  <div className="file-name">{selectedFile.name}</div>
                  <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                </div>
              </div>
              
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="upload-btn"
              >
                {isUploading ? '⏳ Uploading...' : '🚀 Upload'}
              </button>
            </div>
          )}
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          
          {uploadStatus && (
            <div className={`upload-status ${uploadStatus.includes('✅') ? 'success' : 'error'}`}>
              {uploadStatus}
            </div>
          )}
        </div>
      </div>

      <div className="files-section">
        <h3>📚 Uploaded Files ({uploadedFiles.length})</h3>
        
        {uploadedFiles.length === 0 ? (
          <div className="no-files">
            <p>No files uploaded yet. Upload your first file above!</p>
          </div>
        ) : (
          <div className="files-grid">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-header">
                  <span className="file-icon">{getFileIcon(file.type)}</span>
                  <button 
                    onClick={() => handleDelete(file.id)}
                    className="delete-btn"
                    title="Delete file"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="file-content">
                  <div className="file-name" title={file.name}>
                    {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                  </div>
                  <div className="file-size">{formatFileSize(file.size)}</div>
                  <div className="file-date">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="file-actions">
                  <a 
                    href={`${API_BASE_URL}/files/${file.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    👁️ View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
