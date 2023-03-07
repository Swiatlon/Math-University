import Swal from 'sweetalert2';
export const wrongDataAlert = (message) => {
  Swal.fire({
    icon: 'warning',
    title: `${message}`,
  });
};
