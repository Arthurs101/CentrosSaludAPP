const insertarLote = "CALL AGREGAR_NUEVO_LOTE($1,$2,$3,$4)"
const restarContenido = "CALL RESTAR_CANTIDAD ($1,$2)" 
const obtnereLotes = `SELECT id_abastecimiento , id_medicamento , nombre, tipo, presentacion , fecha_vencimiento , cantidad_restante , cantidad_inicial
FROM abastecimiento_medicamento  INNER JOIN medicamento m ON id_medicamento = codigo  WHERE id_centro_salud = $1`
const obtenerMateriales = `SELECT id_abastecimiento,nombre, tipo, "descripción" ,id_materiales_medicos,cantidad_restante,cantidad_inicial
FROM abastecimiento_material_medico  INNER JOIN materiales_medicos m ON id_materiales_medicos = m.id WHERE id_centro_salud = $1`
const todosMedicamentos = "SELECT * FROM medicamento "
const todosMateriales = "SELECT * FROM materiales_medicos";
const agregarCantidadMateriales = "CALL AGREGAR_MATERIAL_MEDICO($1,$2,$3);"
const removerCantidadMateriales = "CALL RESTAR_CANTIDAD_MATERIAL($1,$2);"
const restockmaterial = "CALL RESTOCK($1,$2,$3);"
const MedicamentosAVencer = "SELECT * FROM vencimientos($1)"
const MedicamentosAgotarse = `SELECT id_abastecimiento , id_medicamento , nombre, tipo, presentacion , fecha_vencimiento , cantidad_restante , cantidad_inicial
FROM abastecimiento_medicamento  INNER JOIN medicamento m ON id_medicamento = codigo  
WHERE id_centro_salud = $1 AND Cantidad_Restante <= 0.15 * Cantidad_Inicial`
const MaterialPorAgotarse = `SELECT id_abastecimiento , id_materiales_medicos , nombre, tipo, "descripción" , cantidad_restante , cantidad_inicial
FROM abastecimiento_material_medico INNER JOIN materiales_medicos m ON id_materiales_medicos = m.id  
WHERE id_centro_salud = $1 AND Cantidad_Restante <= 0.15 * Cantidad_Inicial`
const nuevoMedicamento = `INSERT INTO medicamento(NOMBRE,TIPO,PRESENTACION) VALUES ($1,$2,$3)`
const nuevoMaterial = `INSERT INTO materiales_medicos (NOMBRE,TIPO,"descripción") VALUES ($1,$2,$3)`

module.exports = {
    insertarLote , restarContenido, obtnereLotes , obtenerMateriales, todosMedicamentos , todosMateriales , agregarCantidadMateriales ,
    removerCantidadMateriales , restockmaterial , MedicamentosAVencer , MedicamentosAgotarse , MaterialPorAgotarse , nuevoMedicamento , nuevoMaterial
}