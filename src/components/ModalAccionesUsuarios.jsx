import React from "react";
import Modal from "react-modal";

const ModalAccionesUsuarios = ({
  isOpen,
  toggleModal,
  form,
  onChange,
  isUpdate,
  handleSubmit,
}) => {
  const customStyles = {
    content: {
      width: "500px",
      height: "500px",
      margin: "auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    "@media (max-width: 600px)": {
      content: {
        width: "90vw",
        height: "80vh",
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={toggleModal} style={customStyles}>
      <div className="container">
        <header style={{ textAlign: "center" }}>
          {" "}
          <h2>{isUpdate ? "Actualizar Usuario" : "Crear Usuario"}</h2>
        </header>

        <main style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Nombre
                <input
                  value={form.nombre}
                  name="nombre"
                  placeholder="ingrese un nombre"
                  onChange={(e) => onChange(e)}
                />
              </label>
            </fieldset>

            <input type="submit" value={isUpdate ? "Actualizar" : "Crear"} />
            <input
              type="button"
              className="secondary"
              onClick={toggleModal}
              value="Cerrar"
            />
          </form>
        </main>
      </div>
    </Modal>
  );
};

export default ModalAccionesUsuarios;
