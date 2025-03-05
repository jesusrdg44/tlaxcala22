const mysql = require('mysql2');
const cors = require('cors'); 
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

const app = express();

//Ruta de almacen para los informes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true 
}));
// Middleware para parsear informacion a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// MySQL Database connection setup
const db = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'Guepardo32',  
    database: 'turismodb',
    port: 3307,
  });

db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar:', err);
    } else {
      console.log('Conectado a MySQL');
      connection.release();
    }
  });

  app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
      if (err) {
        console.log('Error al filtrar los usuarios:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }
      // console.log('Usuarios Filtrados:', results);
      res.json(results);
    });
  });
  
  

// Get roles from database
app.get('/roles', (req, res) => {
  const query = 'SELECT IdRol, Nombre_Rol FROM rol';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    console.log('Roles filtrados:', results); // Log the response
    res.json(results);
  });
});

app.get('/productos' , (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err,results) =>{
    if(err){
      console.error('Error filtrar productos:', err);
      return res.status(500).json({message: 'Error de servidor'});
    }
    console.log('Productos filtrados:', results);
    res.json(results);
  });
});

app.get('/clientes', (req, res) => {
  const query = 'SELECT IdCliente, Nombre,Ap,Am FROM clientes';
  db.query(query, (err, results)=>{
    if(err){
      console.error('Error al filtrar', err);
      return res.status(500).json({message: 'Server error'});
    }
    console.log('Roles filtrados:', results);
    res.json(results);
  });

});

app.post('/register', async (req, res) => {
  const { username, password, nombre, ap, am, estatus, IdRol } = req.body;

  if (!nombre || !ap || !am || !estatus || !username || !password || !IdRol) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const checkQuery = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
      if (err) {
        console.error('Error checking username:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ message: 'Error processing the request' });
        }

        const query = 'INSERT INTO usuarios (username, password, Nombre, Ap, Am, Estatus, IdRol) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [username, hashedPassword, nombre, ap, am, estatus, IdRol], (err, results) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Server error' });
          }
          res.json({ success: true, message: 'User created successfully', user: { username, IdRol } });
        });
      });
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ message: 'Error processing the request' });
  }
});

app.post('/insertar_informes', upload.single('ruta') , async (req, res) => {
  const { titulo, generadopor, fecha} = req.body;
  const ruta = req.file ? req.file.path : null;
  console.log(" Ruta /insertar_informes ha sido llamada");
  console.log('Datos recibidos:', req.body);

  if (!titulo || !generadopor || !fecha || !ruta) {
    return res.status(400).json({ message: 'Completa los campos' });
  }

  try {
    const query = 'INSERT INTO informes (Titulo, GeneradoPor, FechaGeneracion, RutaArchivo) VALUES (?, ?, ?, ?)';
    console.log('Esta es:', query);
    db.query(query, [titulo, generadopor, fecha, ruta], (err, results) => {
      if (err) {
        console.log('Error al insertar en informes:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      res.json({ success: true, message: 'Informe creado' });
    });

  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.post('/insertar_reportes' , async (req, res) => {
  const {tituloreporte, folio, cliente,clave,tiporeporte,description,date,generadopor,estatus,situacion} = req.body;
  console.log('Datos recibidos:', req.body);

  if (!tituloreporte || !folio || !cliente || !clave || !tiporeporte || !description || !date || !generadopor || !estatus || !situacion){
      return res.status(400).json({message: 'Completa los campos'});

  }
  try{
    const query = 'INSERT INTO reportes (Nombre,Descripcion,Fecha,Generadopor,Estado_Reporte,Situacion_Resolver,Folio,IdCliente,Clave,Tipo_Reporte) VALUES (?,?,?,?,?,?,?,?,?,?)';
    console.log('Aqui esta la consulta', query);
    db.query( query , [tituloreporte,description,date,generadopor,estatus,situacion,folio,cliente,clave,tiporeporte], (err, results) => {
      if(err){
        console.log('Error al insertar reportes:', err);
        return res.status(500).json({message: 'Error en el servidor:'});
      }
      res.json({success: true, message: 'Reporte Creado'});
    });
  }catch(error){
    console.log('Error servidor:', error);
    res.status(500).json({message: 'Error en el servidor'});
  }
});

app.post('/insertar_productos', async (req, res) => {
  const {name, description,categoria,cantidad,price,date} =req.body;
  console.log('Datos recibidos:', req.body);

  if (!name || !description || !categoria || !cantidad || !price || !date ){
    return res.status(400).json({message: 'Completa los campos'});

}
try{
  const query = 'INSERT INTO productos (Nombre,Descripcion,Categoria,Cantidad,Precio,FechaCreacion) VALUES (?,?,?,?,?,?)';
  db.query(query , [name, description,categoria,cantidad,price,date] , (err,results) => {
    if(err){
      console.log('Error al insertar producto:', err);
      return res.status(500).json({message: 'Error en el servidor:'});
    }
    res.json({success: true, message: 'Producto Creado'});
  });
}catch(error){
  console.log('Error servidor:', error);
    res.status(500).json({message: 'Error en el servidor'});

}
});


//login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});



// Server listen on port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
