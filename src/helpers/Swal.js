import Swal from 'sweetalert2';
export const wrongDataAlert = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Dane które wpisałeś są nieprawidłowe!',
  });
};
