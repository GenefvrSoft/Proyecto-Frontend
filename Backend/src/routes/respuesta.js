const express = require("express");
const router = express.Router();
const crearRespuesta = require("./controllers/rest-controller");
const { registroController } = require("./controllers/registroController");
const { loginValidator } = require("../validators/loginValidator");
const { registroValidator } = require("../validators/registroValidator");

/**
 * @swagger
 * components:
 *  schemas:
 *      usuario:
 *          type: object
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              username:
 *                  type: string
 *                  description: username del usuario
 *              password:
 *                  type: string
 *                  description: conttraseña del usuario
 *          required:
 *              - correo
 *              - username
 *              - password
 *          example:
 *              correo: correoejemplo@gmail.com
 *              username: Nombre Random
 *              password: ContraseñaRandom
 *      login:
 *          type: object
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              password:
 *                  type: string
 *                  description: conttraseña del usuario
 *          required:
 *              - correo
 *              - password
 *          example:
 *              correo: correoejemplo@gmail.com
 *              password: ContraseñaRandom
 */

//Por hacer documentación

// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", async (req, res) => {
    await crearRespuesta(req, res);
});


/**
 * @swagger
 * /api/registrar_usuario:
 *  post:
 *      summary: Registrar Usuario
 *      tags: [Registrar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          201:
 *              description: Nuevo Usuario Creado!
 *          409:
 *              description: Ya existe una cuenta con este correo!
 *          500:
 *              description: Ocurrió un error al registrar al usuario!
 */

router.post('/registrar_usuario', registroValidator, registroController.registrarUsuario);


/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Entrar a la Sesión
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          200:
 *              description: El inicio de sesión ha sido exitoso. Bienvenido!
 *          401:
 *              description: El usuario no está registrado. Por favor, regístrese para poder accede!
 *          500:
 *              description: Ha ocurrido un error en el inicio de sesión. Por favor inténtelo de nuevo más tarde!
 */


router.post('/login', loginValidator, registroController.inicioSesion);


//Por hacer.

router.post('/logout', registroController.cerrarSesion);


//  Codigo de prueba para ver si funciona la creacion de la cookie

// router.get('/logout', (req, res) => {
//     console.log(req.cookies.token)
//     if (!req.cookies.token) {
//         return res.send('No hay usuario con sesión iniciada.');
//     }
//     else {
//         res.send(`El usuario esta conectado`)
//     }
// })

module.exports = router;
