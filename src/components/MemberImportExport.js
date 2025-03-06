import React, { useState, useRef } from 'react';
import { FaTimes, FaFileImport, FaFileExport, FaDownload, FaUpload, FaCheck } from 'react-icons/fa';
import Papa from 'papaparse';

const MemberImportExport = ({ members, onClose, onImport }) => {
  const [importedData, setImportedData] = useState([]);
  const [importStep, setImportStep] = useState(1);
  const [fieldMappings, setFieldMappings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const requiredFields = ['name', 'email', 'status'];
  const optionalFields = ['phone', 'address', 'joinDate', 'lastDonation', 'totalDonations', 'notes', 'birthday'];
  const allFields = [...requiredFields, ...optionalFields];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setImportedData(results.data);
        
        // Auto-map fields with matching names
        const mappings = {};
        const headers = results.meta.fields || [];
        
        headers.forEach(header => {
          const normalizedHeader = header.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          allFields.forEach(field => {
            if (normalizedHeader === field.toLowerCase() || 
                normalizedHeader === field.toLowerCase().replace(/[^a-z0-9]/g, '')) {
              mappings[field] = header;
            }
          });
        });
        
        setFieldMappings(mappings);
        setImportStep(2);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the format and try again.');
        setIsLoading(false);
      }
    });
  };

  const handleMappingChange = (field, headerValue) => {
    setFieldMappings({
      ...fieldMappings,
      [field]: headerValue,
    });
  };

  const handleImport = () => {
    // Check if all required fields are mapped
    const missingRequiredFields = requiredFields.filter(field => !fieldMappings[field]);
    
    if (missingRequiredFields.length > 0) {
      alert(`Please map the following required fields: ${missingRequiredFields.join(', ')}`);
      return;
    }
    
    setIsLoading(true);
    
    // Transform imported data based on field mappings
    const transformedData = importedData.map(row => {
      const member = {};
      
      // Map fields according to user's mapping
      Object.keys(fieldMappings).forEach(field => {
        const sourceField = fieldMappings[field];
        if (sourceField) {
          member[field] = row[sourceField];
        }
      });
      
      // Set default values for unmapped fields
      if (!member.status) member.status = 'active';
      if (!member.tagIds) member.tagIds = [];
      
      return member;
    });
    
    // Filter out rows with empty name or email
    const validData = transformedData.filter(member => member.name && member.email);
    
    // Simulate API call
    setTimeout(() => {
      onImport(validData);
      setSuccess(true);
      setIsLoading(false);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setImportStep(1);
        setImportedData([]);
        setFieldMappings({});
        setSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleExport = () => {
    // Prepare data for export
    const dataToExport = members.map(member => {
      // Convert tagIds to tag names for better readability in export
      return {
        Name: member.name,
        Email: member.email,
        Status: member.status,
        Phone: member.phone || '',
        Address: member.address || '',
        'Join Date': member.joinDate || '',
        'Last Donation': member.lastDonation || '',
        'Total Donations': member.totalDonations || '',
        Notes: member.notes || '',
        Birthday: member.birthday || '',
      };
    });
    
    // Convert to CSV
    const csv = Papa.unparse(dataToExport);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `members_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Import/Export Members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaFileImport className="mr-2 text-blue-500" />
                Import Members
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Import members from a CSV file. The file should have columns for member information.
              </p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <FaUpload className="mr-2" />
                Select CSV File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaFileExport className="mr-2 text-green-500" />
                Export Members
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Export all members to a CSV file that can be opened in Excel or other spreadsheet software.
              </p>
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <FaDownload className="mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          {importStep === 2 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Map CSV Columns to Member Fields</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please match the columns from your CSV file to the appropriate member fields.
                <span className="text-red-500 font-medium"> * Required fields</span>
              </p>
              
              <div className="space-y-4 mb-6">
                {requiredFields.map(field => (
                  <div key={field} className="grid grid-cols-3 gap-4 items-center">
                    <label className="font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={fieldMappings[field] || ''}
                      onChange={(e) => handleMappingChange(field, e.target.value)}
                      className="col-span-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select CSV Column --</option>
                      {importedData.length > 0 && 
                        Object.keys(importedData[0]).map(header => (
                          <option key={header} value={header}>{header}</option>
                        ))
                      }
                    </select>
                  </div>
                ))}
                
                <div className="border-t my-4"></div>
                
                {optionalFields.map(field => (
                  <div key={field} className="grid grid-cols-3 gap-4 items-center">
                    <label className="font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <select
                      value={fieldMappings[field] || ''}
                      onChange={(e) => handleMappingChange(field, e.target.value)}
                      className="col-span-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select CSV Column --</option>
                      {importedData.length > 0 && 
                        Object.keys(importedData[0]).map(header => (
                          <option key={header} value={header}>{header}</option>
                        ))
                      }
                    </select>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setImportStep(1)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={isLoading || success}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : success ? (
                    <FaCheck className="mr-2" />
                  ) : (
                    <FaFileImport className="mr-2" />
                  )}
                  {success ? 'Import Successful!' : 'Import Members'}
                </button>
              </div>
            </div>
          )}
          
          {importStep === 1 && importedData.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p>Processing file...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberImportExport; 