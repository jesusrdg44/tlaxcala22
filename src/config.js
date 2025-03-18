// config.js
const baseURLApi = "http://67.217.243.37:5000";

export default {
  baseURLApi,
  remote: baseURLApi,
  // Otras configuraciones...
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: 'admin@flatlogic.com',
    password: 'password'
  },
  app: {
    colors: {
      dark: "#323232",
      light: "#FFFFFF",
    },
    themeColors: {
      warning: '#FEBE69',
      danger: '#FF7769',
      success: '#81D4BB',
      info: '#4DC7DF'
    }
  }
};
