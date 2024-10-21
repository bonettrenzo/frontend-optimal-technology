import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import * as userService from "../service/user.service";


const useUser = () => {
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getUser = () => {
        setLoading(true)
        userService.getAll().then((res) => {
          if (res.success) {
            setUsersData(res.data);
          } else {
            setUsersData([]);
            toast.error(
              res.message || "no se pudo recuperar la información de usuarios"
            );
          }
          setLoading(false)
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
            setLoading(true)

            userService.remove(id).then((res) => {
              if (res.success) {
                toast.success(res.message || "se eliminó el usuario correctamente");
                getUser();
              }
            
              setLoading(false)

            });
          }
        });
      };
    
      useEffect(() => {
        getUser();
      }, []);

      return {usersData, getUser, handleDelete, isLoading}
}

export default useUser