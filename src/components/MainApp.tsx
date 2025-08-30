import React, { useState } from 'react';
import { Header } from './Layout/Header';
import { Sidebar } from './Layout/Sidebar';
import { BottomNav } from './Layout/BottomNav';
import { Dashboard } from './Dashboard/Dashboard';
import { MatchingPage } from './Matching/MatchingPage';
import { SubjectsPage } from './Subjects/SubjectsPage';
import { MessagesPage } from './Messages/MessagesPage';
import { ProfilePage } from './Profile/ProfilePage';
import { ReviewsPage } from './Reviews/ReviewsPage';

export const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'matching':
        return <MatchingPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'reviews':
        return <ReviewsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          isOpen={sidebarOpen}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8 pb-20 lg:pb-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};