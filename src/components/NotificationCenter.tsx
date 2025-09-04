import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, Award, BookOpen, TrendingUp } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'info' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon?: React.ReactNode;
}

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'achievement',
      title: 'Course Completed!',
      message: 'You completed "Introduction to Machine Learning"',
      time: '2 minutes ago',
      unread: true,
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'success',
      title: 'Quiz Score Improved',
      message: 'Your average quiz score increased by 15%',
      time: '1 hour ago',
      unread: true,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'info',
      title: 'New Course Available',
      message: 'Check out the latest React course in your dashboard',
      time: '3 hours ago',
      unread: false,
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Learning Reminder',
      message: 'You haven\'t studied today. Keep your streak going!',
      time: '1 day ago',
      unread: false,
      icon: <Clock className="w-5 h-5" />
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-emerald-400';
      case 'achievement': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      case 'reminder': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">No notifications yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg mb-2 transition-all cursor-pointer ${
                        notification.unread 
                          ? 'bg-white/10 border border-emerald-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${getNotificationColor(notification.type)} mt-1`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              notification.unread ? 'text-white' : 'text-gray-300'
                            }`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-white/20">
                <button className="w-full text-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;