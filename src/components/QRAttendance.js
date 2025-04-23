import React, { useState, useEffect } from 'react';
import { FaTimes, FaQrcode, FaDownload, FaPrint, FaUserCheck } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const QRAttendance = ({ events, members, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [attendanceMode, setAttendanceMode] = useState('generate'); // 'generate' or 'record'
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventName, setEventName] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [simulateScan, setSimulateScan] = useState('');

  // Helper to generate a unique event ID
  const generateEventId = () => {
    return `event_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  useEffect(() => {
    // When selectedEvent changes, update QR code data
    if (selectedEvent) {
      const event = events.find(e => e.id.toString() === selectedEvent.toString());
      if (event) {
        setQrCodeData(`event:${event.id}:${event.name}`);
      }
    } else if (eventName) {
      // For custom events
      const eventId = generateEventId();
      setQrCodeData(`event:${eventId}:${eventName}`);
    } else {
      setQrCodeData('');
    }
  }, [selectedEvent, eventName, events]);

  const handleGenerateQRCodes = () => {
    if (!qrCodeData) return;

    // Generate individual QR codes for each member for the selected event
    const codes = members.map(member => ({
      memberId: member.id,
      memberName: member.name,
      qrData: `${qrCodeData}:member:${member.id}:${member.name}`,
      memberPhotoUrl: member.photoUrl
    }));

    setGeneratedCodes(codes);
  };

  const handleDownloadQRCode = (qrData, memberName) => {
    const canvas = document.getElementById(`qr-${memberName.replace(/\s+/g, '')}`);
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${memberName.replace(/\s+/g, '-')}-qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrintAllQRCodes = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Codes - ${eventName || 'Event'}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .qr-container { 
              display: inline-block; 
              margin: 10px; 
              padding: 15px; 
              border: 1px solid #ccc; 
              text-align: center;
              page-break-inside: avoid;
            }
            .qr-name { 
              margin-top: 10px; 
              font-weight: bold; 
            }
            .qr-event {
              margin-top: 5px;
              font-size: 12px;
              color: #666;
            }
            .page-break {
              page-break-after: always;
              height: 0;
              display: block;
            }
            @media print {
              .qr-container {
                width: 45%;
                box-sizing: border-box;
              }
              body {
                margin: 0;
                padding: 15px;
              }
            }
          </style>
        </head>
        <body>
          <h2 style="text-align: center;">${eventName || 'Event'} - QR Check-in Codes</h2>
          <p style="text-align: center;">${new Date().toLocaleDateString()}</p>
          <div style="text-align: center;">
    `);
    
    generatedCodes.forEach((code, index) => {
      printWindow.document.write(`
        <div class="qr-container">
          <img src="${document.getElementById('qr-' + code.memberName.replace(/\s+/g, '')).toDataURL()}" />
          <div class="qr-name">${code.memberName}</div>
          <div class="qr-event">${eventName || 'Event'}</div>
        </div>
      `);
      
      // Add page break every 8 QR codes
      if ((index + 1) % 8 === 0) {
        printWindow.document.write('<div class="page-break"></div>');
      }
    });
    
    printWindow.document.write(`
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for images to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Simulate scanning a QR code (for demo purposes)
  const handleSimulateScan = () => {
    if (!simulateScan) return;
    
    const member = members.find(m => m.id.toString() === simulateScan);
    if (!member) return;
    
    const eventDetails = eventName || 
      (selectedEvent ? events.find(e => e.id.toString() === selectedEvent.toString())?.name : 'Unknown Event');
    
    const newScan = {
      id: Date.now(),
      memberId: member.id,
      memberName: member.name,
      memberPhotoUrl: member.photoUrl,
      eventName: eventDetails,
      timestamp: new Date().toISOString(),
      eventId: selectedEvent || generateEventId()
    };
    
    setScanResult(newScan);
    setRecentScans([newScan, ...recentScans]);
    setSimulateScan('');
    
    // Auto-clear the scan result after 5 seconds
    setTimeout(() => {
      setScanResult(null);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <FaQrcode className="mr-2" />
            QR Code Attendance
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setAttendanceMode('generate')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                attendanceMode === 'generate' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Generate QR Codes
            </button>
            <button
              onClick={() => setAttendanceMode('record')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                attendanceMode === 'record' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Record Attendance
            </button>
          </div>

          {attendanceMode === 'generate' ? (
            // QR Code Generation Panel
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => {
                      setSelectedEvent(e.target.value);
                      setEventName(''); // Clear custom event name when selecting an existing event
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Create Custom Event --</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name} ({event.date})
                      </option>
                    ))}
                  </select>
                </div>
                
                {!selectedEvent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Event Name</label>
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="e.g., Sunday Service, Bible Study"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <button
                  onClick={handleGenerateQRCodes}
                  disabled={!qrCodeData}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Generate QR Codes for Members
                </button>
              </div>

              {generatedCodes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Generated QR Codes</h3>
                    <button
                      onClick={handlePrintAllQRCodes}
                      className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <FaPrint className="mr-1" />
                      Print All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                    {generatedCodes.map(code => (
                      <div key={code.memberId} className="p-3 border rounded-lg text-center">
                        <QRCode
                          id={`qr-${code.memberName.replace(/\s+/g, '')}`}
                          value={code.qrData}
                          size={120}
                          level={"H"}
                          includeMargin={true}
                          renderAs={"canvas"}
                        />
                        <div className="mt-2 font-medium truncate">{code.memberName}</div>
                        <button
                          onClick={() => handleDownloadQRCode(code.qrData, code.memberName)}
                          className="mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center mx-auto"
                        >
                          <FaDownload className="mr-1" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Attendance Recording Panel
            <div>
              <div className="mb-6">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Event for Attendance</label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => {
                      setSelectedEvent(e.target.value);
                      setEventName('');
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Create Custom Event --</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name} ({event.date})
                      </option>
                    ))}
                  </select>
                </div>
                
                {!selectedEvent && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Event Name</label>
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="e.g., Sunday Service, Bible Study"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-3">Scan QR Code</h3>
                <p className="text-sm text-gray-600 mb-4">
                  In a real implementation, this would activate your device's camera to scan a member's QR code.
                  For demonstration purposes, please select a member from the dropdown to simulate a scan.
                </p>
                
                <div className="flex space-x-2">
                  <select
                    value={simulateScan}
                    onChange={(e) => setSimulateScan(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Member to Simulate Scan</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSimulateScan}
                    disabled={!simulateScan || (!selectedEvent && !eventName)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                  >
                    <FaUserCheck className="mr-1" />
                    Record
                  </button>
                </div>
              </div>

              {/* Scan result notification */}
              {scanResult && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center">
                  {scanResult.memberPhotoUrl ? (
                    <img 
                      src={scanResult.memberPhotoUrl} 
                      alt={scanResult.memberName}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mr-4">
                      <FaUserCheck className="text-green-700" size={20} />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-green-800">Attendance Recorded!</div>
                    <div className="text-sm text-green-700">
                      {scanResult.memberName} checked in to {scanResult.eventName} at {new Date(scanResult.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent scans */}
              {recentScans.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Recent Check-ins</h3>
                  <div className="bg-white border rounded-lg divide-y max-h-64 overflow-y-auto">
                    {recentScans.map(scan => (
                      <div key={scan.id} className="p-3 flex items-center">
                        {scan.memberPhotoUrl ? (
                          <img 
                            src={scan.memberPhotoUrl} 
                            alt={scan.memberName}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <FaUserCheck className="text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{scan.memberName}</div>
                          <div className="text-sm text-gray-500">
                            {scan.eventName} • {new Date(scan.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRAttendance; 