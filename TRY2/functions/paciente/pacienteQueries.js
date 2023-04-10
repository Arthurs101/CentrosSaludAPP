const addPaciente = "INSERT INTO PACIENTE (nombres,apellidos,edad,altura,masa,estado) VALUES ($1,$2,$3,$4,$5,$6)"
const getAll = "SELECT * FROM PACIENTE";
const getPacientID = "SELECT * FROM PACIENTE WHERE ID = $1";
const getPacienteFullName = "SELECT * FROM PACIENTE WHERE nombres LIKE $1 AND apellidos LIKE $2";
const getPacienteName = "SELECT * FROM PACIENTE WHERE nombres LIKE $1";
const getPacienteLastName = "SELECT * FROM PACIENTE WHERE apellidos LIKE $1";
const updatePaciente = ` UPDATE PACIENTE SET nombres = $1 ,apellidos = $2 ,edad = $3 ,altura $4,masa = $5 , estado = $6
WHERE id = $7`
const getSurgery = `SELECT a.ID as id_cirujia, d.nombres as nombre_medico , d.apellidos as apellidos_medico,
b."teléfono" as telefono_medico , b.especialidad as especialidad_medico, fecha_inicio,estado,fecha_finalizada,
c.nombre as centro_salud
FROM public."cirujía" a INNER JOIN public."médico" b ON no_colegiado_medico_encargado = "número_de_colegiado" 
INNER JOIN public.personal d  ON b.id_personal = d.id
INNER JOIN public.centro_salud c ON a.id_centro_salud = c.id
WHERE id_paciente = $1`
const getExams = `SELECT a.ID as id_examen,a.tipo as tipo_examen,
a.observaciones_adicionales,
d.nombres as nombre_medico_referente , 
d.apellidos as apellidos_medico_referente,
b."teléfono" as telefono_medico , b.especialidad as especialidad_medico,
c.nombre as centro_salud_realizado
FROM public.examen a INNER JOIN public."médico" b 
ON  no_colegiado_medico_referente = "número_de_colegiado" 
INNER JOIN public.personal d  ON b.id_personal = d.id
INNER JOIN public.centro_salud c ON a.id_centro_realizado = c.id
WHERE id_paciente = $1`
const getEvolucionSurgeries = `SELECT id as id_entrada , "observación" , fecha FROM public."evolucion_cirujía" WHERE "cirujía_id" = $1`
const getTreatments = `SELECT a.ID as id_tratamiento ,estado,
"diagnóstico_id" as id_diagnostico,
d.nombres as nombre_medico_referente , 
d.apellidos as apellidos_medico_referente,
b."teléfono" as telefono_medico , b.especialidad as especialidad_medico
FROM public.tratamiento a INNER JOIN public."médico" b 
ON  "no_colegiado_médico_encargado" = "número_de_colegiado" 
INNER JOIN public.personal d  ON b.id_personal = d.id
where "diagnóstico_id" = $1`
const getMedicamentos = `select tratamiento_id,medicamento_id,cantidad_suministrada,nombre,tipo"descripción"
from public.medicamento_suministrado_tratamiento
inner join public.medicamento
on medicamento_id = "código"
where tratamiento_id = $1`
const getTratamientoEvolcuion = `SELECT * FROM public.evolucion_tratamiento WHERE tratamiento_id = $1`
const getAdicciones = `SELECT enfermedad_id, nombre as nombre_adiccion , observaciones
FROM public.diagnostico INNER JOIN
public.enfermedades e ON enfermedad_id = e.id
WHERE tipo = 'ADICCION' AND paciente_id = $1`
const getGeneticas = `SELECT enfermedad_id, nombre as nombre_enfermedadGenetica , observaciones
FROM public.diagnostico INNER JOIN
public.enfermedades e ON enfermedad_id = e.id
WHERE tipo = 'GENETICA' AND paciente_id = $1`
const getDiagnosticos =  `SELECT 
enfermedad_id, e.nombre as nombre_enfermedad , e.tipo as tipo_enfermedad,
observaciones , "número_de_colegiado" as no_colegiado , nombres as nombres_medico,
apellidos as apellidos_medico, c.nombre as centro_salud
FROM public.diagnostico INNER JOIN
public.enfermedades e ON enfermedad_id = e.id
INNER JOIN public."médico" m ON 
no_colegiado_medico = "número_de_colegiado"
INNER JOIN public.personal p ON id_personal = p.id
INNER JOIN public.centro_salud c ON centro_salud_id = c.id
WHERE e.tipo != 'ADICCION' AND e.tipo != 'GENETICA' AND paciente_id = $1`
module.exports = {
    addPaciente,
    getAll,
    getPacientID ,
    getPacienteFullName,
    getPacienteName ,
    getPacienteLastName ,
    updatePaciente ,
    getSurgery ,
    getExams , 
    getEvolucionSurgeries ,
    getTreatments ,
    getMedicamentos,
    getTratamientoEvolcuion,
    getAdicciones ,
    getGeneticas,
    getDiagnosticos
}