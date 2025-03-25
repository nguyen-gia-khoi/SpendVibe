// jest.setup.ts
import { NativeModules } from 'react-native';

// Mock SettingsManager cho Expo
NativeModules.SettingsManager = {
  getConstants: () => ({
    settings: {},
  }),
};

// Mock Appearance với kiểm tra an toàn
const mockAppearance = {
  getColorScheme: jest.fn(() => 'light'),
  addChangeListener: jest.fn(),
};

jest.spyOn(require('react-native').Appearance || {}, 'getColorScheme').mockImplementation(mockAppearance.getColorScheme);
jest.spyOn(require('react-native').Appearance || {}, 'addChangeListener').mockImplementation(mockAppearance.addChangeListener);

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const MockAntDesign = () => null;
  MockAntDesign.displayName = 'AntDesign';
  return {
    AntDesign: MockAntDesign,
    loadFont: jest.fn(),
    getImageSource: jest.fn(),
  };
});

// Mock expo-font để ngăn tải font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValue(true),
  isLoaded: jest.fn().mockReturnValue(true),
}));

// Optional: Log để debug
console.log('jest.setup.ts loaded');
console.log('VectorIcons mock:', require('@expo/vector-icons'));
console.log('ExpoFont mock:', require('expo-font'));