import { useEffect, useState } from "react";
import TitleHeader from "./components/TitleHeader";
import * as userService from "./service/user.service";
import { ToastContainer, toast } from "react-toastify";
import { useModal } from "./hook/useModal";
import Swal from "sweetalert2";

import ModalAccionesUsuarios from "./components/ModalAccionesUsuarios";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    id: null,
  });
  const modalUsuario = useModal();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    setForm({ nombre: "" });
    setIsUpdate(false);
    modalUsuario.toggleModal();
  };

  const handleUpdate = (user) => {
    setIsUpdate(true);
    setForm(user);
    modalUsuario.toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = form.id;
    const data = {
      nombre: form.nombre,
    };

    if (isUpdate) {
      userService.update(id, data).then((res) => {
        if (res.success) {
          toast.success(res.message || "se actualizó el usuario correctamente");
          getUser();
          modalUsuario.toggleModal();
        }
      });
    } else {
      userService.create(data).then((res) => {
        if (res.success) {
          toast.success(res.message || "se creó el usuario correctamente!");
          getUser();
          modalUsuario.toggleModal();
        }
      });
    }
  };

  const getUser = () => {
    userService.getAll().then((res) => {
      if (res.success) {
        setUsersData(res.data);
      } else {
        setUsersData([]);
        toast.error(
          res.message || "no se pudo recuperar la información de usuarios"
        );
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        userService.remove(id).then((res) => {
          if (res.success) {
            toast.success(res.message || "se eliminó el usuario correctamente");
            getUser();
          }
        });
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <main style={{ width: "700px", marginTop: "2rem", marginInline: "auto" }}>
      <TitleHeader>Crud de usuario</TitleHeader>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginBottom: "1rem",
        }}
      >
        <button onClick={() => handleCreate()}>Crear usuario</button>
      </div>
      <div class="overflow-auto">
        <table class="striped">
          <thead data-theme="dark">
            <tr>
              <th>Nombre</th>
              <th style={{ textAlign: "end" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td style={{ display: "flex", gap: 4, justifyContent: "end" }}>
                  <button onClick={() => handleUpdate(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {modalUsuario.isOpen && (
        <ModalAccionesUsuarios
          isOpen={modalUsuario.isOpen}
          toggleModal={modalUsuario.toggleModal}
          form={form}
          onChange={onChange}
          isUpdate={isUpdate}
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
