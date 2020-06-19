
// ** Atención: Cualquier middleware tiene que tener la misma firma (req, res, next), por ser un middleware
// Si se quire cambiar la firma para agregar más parámetros, se tiene que definir una función que reciba
// los parámetros que necesitamos y que retorne una función con la firma adecuada pero ya con los parámetros
// adicionales "incrustados" (ver uso de checkRole) en los consumidores:

exports.checkRole = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if(roles.includes(role)) {
            // Si está dentro de los roles permitidos para esta ruta, continúa con el proceso:
            return next();
        } else {
            // Si no está dentro de los roles permitidos, manda una respuesta con error 403 Forbiden y un texto:
            return res
                .status(403)
                .json({mensaje: "No tiene permisos para esta operación"});
        }
    }
}