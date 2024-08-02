import deleteIcon from "../assets/deleteIcon.svg"; // Importa el icono de eliminación

// Componente de tabla genérico que acepta columnas, datos y funciones de eliminación y edición como props
const Table = ({ columns, data, onDelete}) => {
  const totalRows = 7; // Define el número total de filas para mostrar
  const numEmptyRows = totalRows - (data.length > 0 ? data.length : 1); // Calcula el número de filas vacías para llenar la tabla

  return (
    <table id="users" className="styled-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th> // Mapea y muestra los encabezados de las columnas
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          // Si no hay datos, muestra un mensaje indicando que no se encontraron resultados
          <tr>
            <td colSpan={columns.length} className="no-data">
              No se encontraron resultados.
            </td>
          </tr>
        ) : (
          // Mapea y muestra las filas de datos
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>
                  {col === "Acción" ? (
                    // Si la columna es de acciones, muestra los iconos de edición y eliminación
                    <>
                      <img
                        src={deleteIcon}
                        alt="Eliminar"
                        style={{
                          cursor: "pointer",
                          width: "24px",
                          height: "24px",
                        }}

                        onClick={() => onDelete(row._id ||row.Rut || row.id)} 
                      />
                    </>
                  ) : (
                    row[col] // Muestra el valor de la columna
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
        {Array.from({ length: numEmptyRows }).map((_, index) => (
          // Rellena la tabla con filas vacías si es necesario
          <tr key={`empty-${index}`} className="empty-row">
            {columns.map((col) => (
              <td key={`${col}-empty-${index}`}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
