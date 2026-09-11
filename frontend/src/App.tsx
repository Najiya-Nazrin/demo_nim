import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './modules/Dashboard';
import { SalesAgent } from './modules/SalesAgent';
import { CustomerSupport } from './modules/CustomerSupport';
import { Marketing } from './modules/Marketing';
import { CEOAssistant } from './modules/CEOAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesAgent />;
      case 'support':
        return <CustomerSupport />;
      case 'marketing':
        return <Marketing />;
      case 'ceo':
        return <CEOAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
