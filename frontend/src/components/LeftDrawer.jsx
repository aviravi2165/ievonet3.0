import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from '../utils/api';

const DrawerContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.isOpen ? '280px' : '0px'};
  height: 100vh;
  background: ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'};
  border-right: 1px solid ${props => props.isDark ? '#404040' : '#e0e0e0'};
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 999;
  padding-top: 70px;

  @media (max-width: 768px) {
    box-shadow: ${props => props.isOpen ? '0 0 10px rgba(0,0,0,0.3)' : 'none'};
  }
`;

const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ModuleList = styled.div`
  padding: 0;
`;

const ModuleItem = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.isDark ? '#404040' : '#e8e8e8'};
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.isDark ? '#3a3a3a' : '#efefef'};
  }
`;

const ModuleLabel = styled.div`
  font-weight: 600;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
`;

const ModuleIcon = styled.span`
  font-size: 18px;
  width: 20px;
  text-align: center;
`;

const ToggleButton = styled.div`
  cursor: pointer;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: ${props => props.isDark ? '#b0b0b0' : '#666'};
  transition: transform 0.2s ease;
  transform: ${props => props.isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)'};
`;

const MenuItemList = styled.div`
  max-height: ${props => props.isExpanded ? '500px' : '0px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: ${props => props.isDark ? '#252525' : '#ffffff'};
`;

const MenuItem = styled.div`
  padding: 8px 40px 8px 48px;
  cursor: pointer;
  color: ${props => props.isDark ? '#c0c0c0' : '#555'};
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border-left: 2px solid transparent;

  &:hover {
    background: ${props => props.isDark ? '#323232' : '#f5f5f5'};
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
    border-left-color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }
`;

const MenuItemIcon = styled.span`
  font-size: 14px;
`;

const IconMap = {
  dashboard: '🏠',
  home: '🏠',
  users: '👥',
  list: '📋',
  settings: '⚙️',
  cog: '⚙️',
  chart: '📊',
  'chart-bar': '📊',
  lock: '🔒',
  shield: '🛡️',
  analytics: '📈',
};

function LeftDrawer({ isOpen, isDark, onClose }) {
  const [modules, setModules] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/modules');
      setModules(response.data.modules || []);
      const initialExpanded = {};
      response.data.modules?.forEach((module, index) => {
        initialExpanded[module.id] = index === 0;
      });
      setExpandedModules(initialExpanded);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getIcon = (iconName) => {
    return IconMap[iconName] || '📁';
  };

  const handleMenuItemClick = (path) => {
    if (path) {
      window.location.href = path;
    }
    onClose();
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <DrawerContainer isOpen={isOpen} isDark={isDark}>
        <ModuleList>
          {loading ? (
            <ModuleItem isDark={isDark}>
              <ModuleLabel isDark={isDark}>Loading...</ModuleLabel>
            </ModuleItem>
          ) : modules.length === 0 ? (
            <ModuleItem isDark={isDark}>
              <ModuleLabel isDark={isDark}>No modules available</ModuleLabel>
            </ModuleItem>
          ) : (
            modules.map(module => (
              <div key={module.id}>
                <ModuleItem isDark={isDark}>
                  <ModuleLabel isDark={isDark}>
                    {module.menu_items && module.menu_items.length > 0 && (
                      <ToggleButton 
                        isExpanded={expandedModules[module.id]}
                        onClick={() => toggleModule(module.id)}
                      >
                        ▼
                      </ToggleButton>
                    )}
                    <ModuleIcon>{getIcon(module.icon)}</ModuleIcon>
                    <span onClick={() => toggleModule(module.id)}>
                      {module.label}
                    </span>
                  </ModuleLabel>
                </ModuleItem>
                {module.menu_items && (
                  <MenuItemList 
                    isExpanded={expandedModules[module.id]}
                    isDark={isDark}
                  >
                    {module.menu_items.map(item => (
                      <MenuItem
                        key={item.id}
                        isDark={isDark}
                        onClick={() => handleMenuItemClick(item.path)}
                      >
                        <MenuItemIcon>{getIcon(item.icon)}</MenuItemIcon>
                        <span>{item.label}</span>
                      </MenuItem>
                    ))}
                  </MenuItemList>
                )}
              </div>
            ))
          )}
        </ModuleList>
      </DrawerContainer>
    </>
  );
}

export default LeftDrawer;
