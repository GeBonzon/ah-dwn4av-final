import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "Api de mangas",
        description: "Esta es una api de mangas para el Parcial 2"
    },
    host: "localhost:3333",
    basePath: "/api",
    schemes: ["http"]
}

const endpointsFiles = [
    "./api/routes/mangas.routes.js",
    "./api/routes/autores.routes.js",
    "./api/routes/categorias.routes.js",
    "./api/routes/generos.routes.js",
    "./api/routes/tipos.routes.js",
    "./api/routes/usuarios.routes.js"
]

const swagger = swaggerAutogen()
swagger( "swagger.json", endpointsFiles, doc )
