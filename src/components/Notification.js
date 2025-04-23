import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

const VARIANTS = {
  success: {
    icon: FiCheck,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-400',
    iconColor: 'text-green-400'
  },
  error: {
    icon: FiAlertCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-400',
    iconColor: 'text-red-400'
  },
  warning: {
    icon: FiAlertCircle,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-400',
    iconColor: 'text-yellow-400'
  },
  info: {
    icon: FiInfo,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400',
    iconColor: 'text-blue-400'
  }
};

export const Notification = ({
  type = 'info',
  message,
  description,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const variant = VARIANTS[type];

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const Icon = variant.icon;

  return (
    <div className={`rounded-md p-4 border ${variant.bgColor} ${variant.borderColor}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${variant.iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${variant.textColor}`}>{message}</h3>
          {description && (
            <div className={`mt-2 text-sm ${variant.textColor}`}>{description}</div>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${variant.textColor}`}
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
          >
            <span className="sr-only">Close</span>
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const NotificationContainer = ({ notifications = [], onClose }) => {
  return (
    <div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="max-w-sm w-full pointer-events-auto"
          >
            <Notification {...notification} onClose={() => onClose(notification.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}; 