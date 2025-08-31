import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    courseComplete: true,
    quizResults: true,
    weeklyProgress: false,
    newFeatures: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: false,
    achievementsVisible: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    autoplay: true,
    emailDigest: 'weekly'
  });

  const [showPassword, setShowPassword] = useState(false);

  const settingSections = [
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-400">
                  {key === 'courseComplete' && 'Get notified when you complete a course'}
                  {key === 'quizResults' && 'Receive quiz score notifications'}
                  {key === 'weeklyProgress' && 'Weekly learning progress summary'}
                  {key === 'newFeatures' && 'Updates about new platform features'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Privacy & Security',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium">Profile Visibility</h4>
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <button
                  onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <h4 className="text-white font-medium mb-4">Change Password</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter new password"
                />
              </div>
              <button className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Preferences',
      icon: <Palette className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-4">Theme</h4>
            <div className="grid grid-cols-2 gap-3">
              {['dark', 'light'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setPreferences(prev => ({ ...prev, theme }))}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.theme === theme
                      ? 'border-emerald-500 bg-emerald-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-full h-8 rounded mb-2 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}></div>
                  <span className="text-white capitalize">{theme}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Language</h4>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Email Digest</h4>
            <select
              value={preferences.emailDigest}
              onChange={(e) => setPreferences(prev => ({ ...prev, emailDigest: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-play Videos</h4>
              <p className="text-sm text-gray-400">Automatically play videos when opening courses</p>
            </div>
            <button
              onClick={() => setPreferences(prev => ({ ...prev, autoplay: !prev.autoplay }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.autoplay ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.autoplay ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Data & Storage',
      icon: <Download className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-4">Export Data</h4>
            <p className="text-gray-400 mb-4">Download your learning data and course materials</p>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Export Course Data
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Export Progress Report
              </button>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h4 className="text-white font-medium mb-4">Storage Usage</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Courses</span>
                <span className="text-white">{courses.length} items</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Storage Used</span>
                <span className="text-white">2.4 MB / 100 MB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full w-[2.4%]"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h4 className="text-red-400 font-medium mb-4">Danger Zone</h4>
            <div className="space-y-3">
              <button className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Reset All Progress</span>
              </button>
              <button className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-xl text-gray-300">Customize your learning experience</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-emerald-400">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              {section.content}
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <Save className="w-5 h-5" />
            <span>Save All Settings</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;