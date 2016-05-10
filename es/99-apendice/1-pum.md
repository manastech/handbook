## PUM!
El PUM! (Principios Unificados de Manas) es un intento de plasmar las buenas prácticas que hemos reunido para el desarrollo de proyectos a lo largo de todos estos años. Al igual que todo lo demás en Manas y en este handbook, no está grabado en piedra y es totalmente dinámico; si tenés una sugerencia sobre cómo mejorar el proceso, enviá un pull request con los cambios.

El formato del PUM! es una serie de checklists que el lead de un proyecto y los desarrolladores deben verificar en distintas fases de la vida del mismo. Para asegurarnos su incorporación a la cultura de trabajo, nos proponemos recordarnos estos items mutuamente tanto como sea posible.

### Artifacts

_Deberían estar disponibles desde el día cero del proyecto, y mantenerse actualizados como parte del cierre de cada issue._

#### Repositorio de código
* Usar git-flow como política de branching y tagging
* Seguir las guidelines de las [repository rules](./2-repository-rules.md)
* Recolectar devtools y scripts útiles para el proyecto: armar una carpeta `/tools` e insistir en commitearlos ahí. Agregar una línea de comentario con el objetivo y uso si no lo tuviera.

#### Archivos iniciales del repositorio
* CHANGELOG.MD: al cerrar cada issue mantener un [changelog](http://keepachangelog.com/), pensada en que un usuario del sistema pueda entender los cambios en cada versión.
* README.md: Incluir una explicación mínima de qué es el proyecto (recordar que es lo primero que ve alguien al llegar al repositorio), cómo correrlo en modo development, y una descripción mínima de arquitectura.
* LICENSE: especificar licencia del proyecto.

#### Issue tracker
* Estados en el ciclo de vida de tickets y cuáles son los action items que implican la transición entre los estados.
* Milestones: mantener una serie de futuros releases con una noción del objetivo o los epics que incluiría. Puede (y casi que debe) cambiar a medida que avanza el proyecto. Actúa como Roadmap del proyecto.
* Mantener política de versionado siguiendo las repository rules.

#### Repositorio de diseño
* Crear un proyecto en InVision (o similar) para subir los diseños.
* Crear diseños por milestones: luego de diseñar el target final para un major, trabajar con el equipo de diseño para generar los diseños de los pasos intermedios que vayan a ir a producción o ser vistos por audiencias cuya impresión es importante; asociar esas versiones de UX intermedias a los milestones del roadmap y usar como punto de partida el estado actual para no caer en idealismos.
* Armar un catálogo de idioms de diseño para una aplicación (mostrando cómo filtrar, cómo navegar, cómo se ven los botones, etc), de modo que se pueda usar como fuente cuando un desarrollador necesite agregar una nueva funcionalidad relacionada.

#### Continuous Integration
* Hacer visible el estado y reforzar el concepto de que es importante mantenerlo andando.
* Si hay binary artifacts que generar, integrarlos como parte del CI para evitar inconsistencias entre los ambientes de desarrollo.
* Opciones preferidas: Travis, Circle.

#### Provisioning & Deployment
* Script reproducible: una persona sin contexto puede meterse en la documentación, seguir las instrucciones, correr los scripts y tener un entorno andando.
* Mantener versiones fijas de todas las dependencias para evitar que el proyecto se rompa cuando salen nuevas versiones.
* Al cerrar cada issue, si hay un impacto en el provisioning, asegurarse de reflejarlo.

#### Mantenimiento de servidores
* Backups scheduleados en todos los servers.
* Testear restaurabilidad del backup periódicamente.
* Mantener los secrets del proyecto en un lugar seguro y accesible.
* Mantener un inventario de todos los servers asociados en un doc compartido.
* Monitoring de servidores usando NewRelic.
* Monitoring de todos los servicios corriendo en los servers usando Monit o similar.

#### Entornos
* Nightly (opcional, ideal para sistemas grandes y complejos)
* Staging (cambiando versiones según sea necesario)
* Demo (opcional, para hacer demos con algo estable antes de llegar a producción)
* Producción (estable)

#### Testing
* Listado de casos de prueba.
* Mantener datasets usados para pruebas.

#### Documentación
* Usar Google Drive para documentos y archivos del proyecto, creando una subcarpeta para el proyecto en `Manas.Projects` en [man.as/docs](http://man.as/docs). Evitar compartir documentos 1:1.
* Incluir esta misma lista para el proyecto en su carpeta de Drive, indicando brevemente cómo se implementa cada item en ese proyecto, a partir del template disponible en `Manas.Projects`.

#### Vault
* Crear un Vault de 1password para todos los secrets del proyecto y compartirlo via Dropbox con quienes corresponda.
* Mantener la clave del vault en un lugar seguro (ej vault personal).

### Tareas

_Checklist de tareas a realizar en distintos momentos del proyecto._

#### Al iniciar el proyecto
* Crear el repositorio de código con los archivos iniciales e issue tracker
* Crear repositorio de Invision si corresponde
* Crear canal de Slack y definir keyword en Brium
* Crear el vault de 1pass
* Crear una carpeta para el proyecto en el Drive compartido [Manas.Projects](http://man.as/docs)
* Crear en dicha carpeta un documento maestro (usando el template en `Manas.Projects`) que linkee a todos los artifacts del proyecto y actúe como índice

#### Ante el primer deployment
* Configurar el CI si aún no lo está
* Armar script de provisioning y deployment
* Crear los entornos usando dicho script
* Asegurarse de tener mecanismos de monitoreo funcionando en dichos entornos
* Asegurar y compartir los secrets para cada entorno

#### Al cerrar un issue
* Respetar el formato de mensaje de commit según las repository rules
* Pensar el _por qué_ del commit y menos en el _qué_ al escribirlo
* Linkear al issue correspondiente en cada commit
* Dejar mínima documentación acerca de decisiones de diseño asociadas en el issue, incluyendo hints sobre cómo testearlo
* Realizar pedidos de diseño dentro del issue en caso de ser necesario
* Actualizar el CHANGELOG
* Plasmar cambios que afecten a cualquier otro artifact arriba mencionado
* Realizar una code review en caso de que la complejidad lo amerite

#### Al cerrar un milestone
* Taggear según la política establecida
* Actualizar el roadmap según hayan cambiado los futuros releases
* Actualizar el CHANGELOG agregando el nuevo milestone
* Revisar si hay que introducir cambios a cualquier artifact que no se hayan realizado al cerrar el issue correspondiente
* Realizar una design review con Diseño y QA para evaluar el diseño implementado y revisar usabilidad, en caso de que haya features que lo ameriten

#### Semanalmente
* Verificar que el presupuesto restante en horas asignado en el keyword de Brium alcance para 1 semana de laburo de todo el equipo por cada dev que lo componga. Ejemplo: si el equipo tiene 6 personas, cuando nos quedan horas para menos de 6 semanas de laburo de todos, tenemos que sacar 1 persona.

#### Mensualmente
* Actualizar (usando algo como gemnasium) las versiones de los componentes, estar al día con los patches y chequear si hay security vulnerabilities que ameriten resolver incompatibilidades. Levantar un aviso al cliente si hay un end-of-life cercano de alguna versión de un componente.

#### Cuatrimestralmente
* Realizar un setup del development environment desde cero
* Realizar un setup del entorno de producción desde cero
* Restore desde cero de un entorno de producción a partir de un backup
