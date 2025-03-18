// Si estás en desarrollo, se usará localhost con el puerto 8080 (o el que uses)
// En producción, se usará la IP de tu servidor y el puerto 5000.
const hostApi = process.env.NODE_ENV === "development" 
  ? "http://localhost" 
  : "http://67.217.243.37";
  
const portApi = process.env.NODE_ENV === "development" 
  ? 8080 
  : 5000;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

export default {
  hostApi,
  portApi,
  baseURLApi,
  // Si no usas otras variables, puedes actualizar también 'remote' para que apunte a tu backend
  remote: baseURLApi,
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
