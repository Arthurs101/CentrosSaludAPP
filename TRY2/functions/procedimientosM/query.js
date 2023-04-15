const addDiagnostico = "INSERT INTO diagnostico (no_colegiado_medico,paciente_id,enfermedad_id,centro_salud_id) VALUES ($1,$2,$3)"
const addTratamiento = 'INSERT INTO tratamiento ("no_colegiado_médico_encargado","diagnóstico_id", estado ) VALUES ($1,$2,$3)'
const addTratamientoEv = 'INSERT INTO public.evolucion_tratamiento (tratamiento_id,"observación",fecha) VALUES ($1,$2,$3)'
const addExamen = 'INSERT INTO EXAMEN (no_colegiado_medico_referente,id_paciente,tipo,fecha_realizado,observaciones_adicionales,id_centro_realizado) VALUES ($1,$2,$3,$4,$5,$6)'
const addCirujia = 'INSERT INTO public."cirujía" (no_colegiado_medico_encargado,id_paciente,fecha_inicio,estado,fecha_finalizada,id_centro_salud) VALUES ($1,$2,$3,$4,$5,$6)'
const addCirujiaEv= 'INSERT INTO public."evolucion_cirujía" ("cirujía_id","cirujía_id",fecha) VALUES ($1,$2,$3)'
const getDiagnosticos = `SELECT a.id as id_diagnostico, paciente_id ,(d.nombres|| ' ' || d.apellidos) as nombre_paciente , (c.nombres|| ' ' || c.apellidos) as nombre_medico ,
no_colegiado_medico , estado , e.id as id_enfermedad , e.nombre as enfermedad
FROM public.diagnostico a INNER JOIN public."médico" b on "número_de_colegiado" = no_colegiado_medico 
INNER JOIN public.personal c ON c.id = b.id_personal INNER JOIN public.paciente d ON paciente_id = d.id
INNER JOIN enfermedades e ON e.id = enfermedad_id WHERE a.centro_salud_id = $1`
const getTratamientos = `SELECT a.id as id_tratamiento, a.estado as estado_tratamiento, paciente_id , f.id as id_diagnostico,
(d.nombres|| ' ' || d.apellidos) as nombre_paciente , (c.nombres|| ' ' || c.apellidos) as nombre_medico ,
no_colegiado_medico , e.id as id_enfermedad , e.nombre as enfermedad
FROM tratamiento a INNER JOIN public."médico" b on "número_de_colegiado" = "no_colegiado_médico_encargado"
INNER JOIN public.diagnostico f ON f.id ="diagnóstico_id"
INNER JOIN public.personal c ON c.id = b.id_personal 
INNER JOIN public.paciente d ON paciente_id = d.id
INNER JOIN enfermedades e ON e.id = enfermedad_id WHERE f.centro_salud_id = $1`
const getCirujias = `SELECT a.id as id_cirujia, a.estado as estado_cirujia, id_paciente as paciente_id ,
(d.nombres|| ' ' || d.apellidos) as nombre_paciente , (c.nombres|| ' ' || c.apellidos) as nombre_medico ,
no_colegiado_medico_encargado as no_colegiado_medico ,fecha_inicio , fecha_finalizada
FROM public."cirujía" a INNER JOIN public."médico" b on "número_de_colegiado" = no_colegiado_medico_encargado
INNER JOIN public.personal c ON c.id = b.id_personal 
INNER JOIN public.paciente d ON id_paciente = d.id
WHERE a.id_centro_salud = $1`
const getExamenes = `SELECT a.id as id_examen,a.tipo as tipo_examen,  id_paciente as paciente_id ,
(d.nombres|| ' ' || d.apellidos) as nombre_paciente , (c.nombres|| ' ' || c.apellidos) as nombre_medico ,
no_colegiado_medico_referente as no_colegiado_medico ,fecha_realizado , observaciones_adicionales
FROM examen a INNER JOIN public."médico" b on "número_de_colegiado" = no_colegiado_medico_referente
INNER JOIN public.personal c ON c.id = b.id_personal 
INNER JOIN public.paciente d ON id_paciente = d.id
WHERE a.id_centro_realizado = $1`
const getTratamientoEv = 'SELECT * FROM public.evolucion_tratamiento WHERE tratamiento_id = $1'
const getCirujiaEv = 'SELECT * FROM public."evolucion_cirujía" WHERE "cirujía_id" = $1'
const updateTratamiento = 'UPDATE tratamiento set estado = $1 WHERE id = $2'
const updateCirujiaDetails = 'UPDATE public."cirujía" SET estado = $1 ,fecha_finalizada = $2 WHERE id = $3'
const addMedicamentoSuministrado = 'INSERT INTO public.medicamento_suministrado_tratamiento VALUES ($1, $2, $3)'
module.exports = {
    addDiagnostico ,
    addTratamiento,
    addTratamientoEv,
    addExamen  ,
    addCirujia ,
    addCirujiaEv,
    getDiagnosticos ,
    getTratamientos,
    getCirujias ,
    getExamenes ,
    getTratamientoEv ,
    getCirujiaEv ,
    updateTratamiento ,
    updateCirujiaDetails ,
    addMedicamentoSuministrado
}