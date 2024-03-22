import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientsView.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate (mejor que usenavigate) para manejar la redirección

const ClientsView = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredNotes] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    cif_cliente: "",
    nombre: "",
    direccion: "",
    poblacion: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients-view");
        setClients(response.data);
        setFilteredNotes(response.data);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterNotes = () => {
    const filteredData = clients.filter((client) =>
      Object.keys(searchInputs).every((key) =>
        client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
      )
    );
    setFilteredNotes(filteredData);
  };

  useEffect(() => {
    filterNotes();
  }, [searchInputs]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [noteToDelete, setnoteToDelete] = useState(null);
  const [noteToEdit, setnoteToEdit] = useState(null);

  const handleEditClick = (client) => {
    console.log("Cliente seleccionado para editar:", client);
    navigate(`/update-client/${client.cif_cliente}`, {
      state: { noteData: client },
    });
    setShowModal(true);
  };

  const handleDeleteClick = (client) => {
    setnoteToDelete(client);
    setShowModal(true); // Aquí asegúrate de que showModal se establezca en true
    setModalMessage(
      `¿Seguro que quieres eliminar al cliente ${client.cif_cliente} ${client.nombre}?`
    );
  };

  const handleConfirmAction = () => {
    if (noteToDelete) {
      axios
        .delete(
          `http://localhost:3000/clients-view/${noteToDelete.cif_cliente}`
        )
        .then((response) => {
          const updatedClients = clients.filter(
            (client) => client.cif_cliente !== noteToDelete.cif_cliente
          );
          setClients(updatedClients);
          setFilteredNotes(updatedClients);
          setnoteToDelete(null);
          setClientDeleted(true);
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
        });
    } else if (clientToEdit) {
      // Redirige a la página de edición con los detalles del cliente
      navigate(`/update-client/${clientToEdit.cif_cliente}`, {
        clientData: clientToEdit,
      });
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setnoteToDelete(null);
    setnoteToEdit(null);
  };

  const handleCreateUserClick = () => {
    navigate("/create-client");
  };

  return (
    <div>
      <h1 className="text-center mb-4">Clientes</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  name="cif_cliente"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="CIF Cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="nombre"
                  value={searchInputs.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="direccion"
                  value={searchInputs.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="poblacion"
                  value={searchInputs.poblacion}
                  onChange={handleInputChange}
                  placeholder="Población"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="provincia"
                  value={searchInputs.provincia}
                  onChange={handleInputChange}
                  placeholder="Provincia"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="pais"
                  value={searchInputs.pais}
                  onChange={handleInputChange}
                  placeholder="País"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="codigo_postal"
                  value={searchInputs.codigo_postal}
                  onChange={handleInputChange}
                  placeholder="Código Postal"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="telefono"
                  value={searchInputs.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="email"
                  value={searchInputs.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="half-size-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.cif_cliente}>
                <td className="table-data">{client.cif_cliente}</td>
                <td className="table-data">{client.nombre}</td>
                <td className="table-data">{client.direccion}</td>
                <td className="table-data">{client.poblacion}</td>
                <td className="table-data">{client.provincia}</td>
                <td className="table-data">{client.pais}</td>
                <td className="table-data">{client.codigo_postal}</td>
                <td className="table-data">{client.telefono}</td>
                <td className="table-data">{client.email}</td>
                <td className="table-data">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(client)}
                  >
                    🖋️
                  </Button>
                </td>
                <td className="table-data">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(client)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientToDelete && (
            <p>
              ¿Seguro que quieres eliminar al cliente{" "}
              {clientToDelete.cif_cliente} {clientToDelete.nombre}?
            </p>
          )}
          {clientToEdit && (
            <p>
              ¿Seguro que quieres editar al cliente {clientToEdit.cif_cliente}{" "}
              {clientToEdit.nombre}?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="text-center">
        <Button variant="success" onClick={handleCreateUserClick}>
          Crear Nuevo Usuario
        </Button>
      </div>
    </div>
  );
};

export default ClientsView;