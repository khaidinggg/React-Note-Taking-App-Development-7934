import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../context/NotificationContext';

const { FiCheck, FiX, FiAlertCircle, FiInfo } = FiIcons;

const NotificationItem = ({ notification }) => {
  const { removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return FiCheck;
      case 'error':
        return FiX;
      case 'warning':
        return FiAlertCircle;
      default:
        return FiInfo;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`
      flex items-center p-4 rounded-lg border shadow-lg min-w-80
      ${getColors(notification.type)}
    `}>
      <SafeIcon 
        icon={getIcon(notification.type)} 
        className="w-5 h-5 mr-3 flex-shrink-0" 
      />
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button
        onClick={() => removeNotification(notification.id)}
        className="ml-3 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
      >
        <SafeIcon icon={FiX} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItem;