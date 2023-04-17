const mejorMedico = `WITH medicos_numerados AS (
    SELECT ROW_NUMBER() OVER (ORDER BY número_de_colegiado) AS numero, número_de_colegiado, especialidad
    FROM Médico
  ),
  personal_numerado AS (
    SELECT ROW_NUMBER() OVER (ORDER BY ID) AS numero, nombres, apellidos
    FROM Personal
  )
  SELECT M.número_de_colegiado, P.nombres, P.apellidos, M.especialidad, COUNT(*) AS pacientes_atendidos
  FROM Diagnostico D
  JOIN medicos_numerados M ON D.no_colegiado_medico = M.número_de_colegiado
  JOIN personal_numerado P ON M.numero = P.numero
  GROUP BY M.número_de_colegiado, P.nombres, P.apellidos, M.especialidad
  ORDER BY pacientes_atendidos DESC
  LIMIT 10;`
const enfermedadesLetales = `SELECT E.nombre AS enfermedad, COUNT(*) AS fallecidos
FROM Diagnostico D
JOIN Enfermedades E ON D.Enfermedad_ID = E.ID
JOIN Paciente P ON D.Paciente_ID = P.ID
WHERE P.estado = 'fallecido'
GROUP BY E.nombre
ORDER BY fallecidos desc limit 10;`

const centrosMasUsados = `SELECT C.ID, C.Nombre, COUNT(*) AS cantidad_pacientes
FROM Centro_Salud C
JOIN Diagnostico D ON C.ID = D.Centro_Salud_ID
GROUP BY C.ID, C.Nombre
ORDER BY cantidad_pacientes desc LIMIT 3;`

const medicina =  `SELECT A.ID_Abastecimiento, M.Nombre as medicamento_nombre, M.Tipo, M.Presentacion, A.Cantidad_Restante, A.Cantidad_Inicial, A.Fecha_Vencimiento, A.ID_Centro_Salud,
c.nombre as centro_salud_nombre
FROM Abastecimiento_Medicamento A
JOIN Medicamento M ON A.ID_Medicamento = M.codigo
JOIN centro_salud c on c.id = id_centro_salud 
WHERE cantidad_restante <= cantidad_inicial*0.15;`

module.exports = {medicina, centrosMasUsados , enfermedadesLetales , mejorMedico}